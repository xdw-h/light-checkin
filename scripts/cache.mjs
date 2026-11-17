import {readdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
async function walk(dir){let out=[];for(const f of await readdir(dir,{withFileTypes:true})){const path=`${dir}/${f.name}`;out.push(...(f.isDirectory()?await walk(path):[path]));}return out;}
const files=(await walk('dist')).filter(p=>!p.endsWith('/sw.js'));
const hash=createHash('sha256');for(const f of files)hash.update(await readFile(f));
hash.update(await readFile('scripts/cache.mjs'));
const version=hash.digest('hex').slice(0,12);
const resources=files.map(p=>'./'+p.slice(5));
await writeFile('dist/sw.js',`const CACHE='lightly-${version}';const FILES=${JSON.stringify(resources)};self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));});self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('lightly-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(caches.open(CACHE).then(async cache=>{const key=e.request.mode==='navigate'?new URL('./index.html',self.registration.scope):e.request;const hit=await cache.match(key,{ignoreVary:true});return hit||fetch(e.request);}));});`);
console.log('Offline cache generated:',version,files.length,'files');
