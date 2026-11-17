export const STORAGE_KEY='light-checkin-v1';
export const HABITS=[['food','饮食有节奏','规律三餐，少油炸和含糖饮料','◒'],['protein','每餐有蛋白质','鸡蛋、奶、鱼肉或豆制品','◇'],['walk','今天走一走','第一周 20 分钟，第二周 30 分钟','↗'],['strength','力量练习','每周 2 次，每次约 20 分钟','⌁'],['break','给久坐按暂停','每坐 60 分钟，活动 3～5 分钟','◷'],['rest','好好睡一觉','目标 7～9 小时','☾']];
export function dateKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function shiftDay(key,n){const [y,m,d]=key.split('-').map(Number);return dateKey(new Date(y,m-1,d+n,12));}
export function validDate(v){return typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&dateKey(new Date(`${v}T12:00:00`))===v;}
export const toKg=(n,unit)=>unit==='jin'?n/2:n;
export const toDisplay=(n,unit)=>Math.round(n*(unit==='jin'?2:1)*10)/10;
export function freshState(){return {version:1,profile:{height:173,start:72.5,target:65,unit:'jin',startDate:dateKey()},records:{}};}
export const emptyRecord=()=>({weight:null,checks:{},minutes:0,sleep:null,note:''});
function range(v,a,b){return typeof v==='number'&&Number.isFinite(v)&&v>=a&&v<=b;}
export function validateBackup(s,today=dateKey()){
 const fail=()=>{throw new Error('备份格式或数值无效，请选择本应用导出的 JSON 文件。');};
 if(!s||s.version!==1||!s.profile||!s.records||Array.isArray(s.records)||typeof s.records!=='object') fail();
 const p=s.profile;
 if(!range(p.height,100,230)||!range(p.start,30,250)||!range(p.target,30,250)||!['kg','jin'].includes(p.unit)||!validDate(p.startDate)||p.startDate>today) fail();
 if(Object.keys(s.records).length>36500) fail();
 const clean={version:1,profile:{height:p.height,start:p.start,target:p.target,unit:p.unit,startDate:p.startDate},records:{}};
 for(const [day,r] of Object.entries(s.records)){
  if(!validDate(day)||day>today||!r||typeof r!=='object'||!(r.weight===null||range(r.weight,30,250))||!range(r.minutes,0,600)||!(r.sleep===null||range(r.sleep,0,24))||typeof r.note!=='string'||r.note.length>500||!r.checks||typeof r.checks!=='object'||Array.isArray(r.checks)) fail();
  const checks={};for(const [key] of HABITS){if(r.checks[key]!==undefined&&typeof r.checks[key]!=='boolean')fail();checks[key]=r.checks[key]===true;}
  clean.records[day]={weight:r.weight,minutes:r.minutes,sleep:r.sleep,note:r.note,checks};
 }
 return clean;
}
export function weekStats(records,today=dateKey()){
 const mean=(start,end)=>{const v=Object.entries(records).filter(([d,r])=>d>=start&&d<=end&&r.weight!==null).map(([,r])=>r.weight);return {value:v.length?v.reduce((a,b)=>a+b,0)/v.length:null,count:v.length};};
 const a=mean(shiftDay(today,-6),today),b=mean(shiftDay(today,-13),shiftDay(today,-7));
 return {average:a.value,previous:b.value,change:a.value!==null&&b.value!==null?a.value-b.value:null,count:a.count};
}
export function loadState(storage){const raw=storage.getItem(STORAGE_KEY);return raw?validateBackup(JSON.parse(raw)):freshState();}
export function saveState(storage,state){storage.setItem(STORAGE_KEY,JSON.stringify(validateBackup(state)));}
export function mutateState(storage,change){const next=loadState(storage);change(next);saveState(storage,next);return next;}
