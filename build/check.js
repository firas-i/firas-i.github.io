// Link + content check. Run: node build/check.js
const fs=require('fs'),path=require('path');const root=path.join(__dirname,'..');
const files=[];(function w(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f);if(f==='build'||f==='.git'||f==='node_modules')continue;fs.statSync(p).isDirectory()?w(p):p.endsWith('.html')&&files.push(p);}})(root);
let links=0,bad=[],banned=[];
for(const f of files){const s=fs.readFileSync(f,'utf8');
  if(!f.includes(path.sep+'layan'+path.sep)){for(const w of ['Hakeem','MOH','EHS','lorem','undefined','—'])if(s.includes(w))banned.push(path.relative(root,f)+': '+w);}
  for(const m of s.matchAll(/(?:href|src)="([^"]+)"/g)){let u=m[1];if(/^(https?:|mailto:|tel:|#|data:)/.test(u))continue;links++;
    u=u.split('#')[0].split('?')[0];let t=u.startsWith('/')?path.join(root,u):path.resolve(path.dirname(f),u);
    if(fs.existsSync(t)&&fs.statSync(t).isDirectory())t=path.join(t,'index.html');
    if(!fs.existsSync(t))bad.push(path.relative(root,f)+' -> '+m[1]);}}
console.log(files.length+' pages, '+links+' internal links, '+bad.length+' broken, '+banned.length+' banned-word hits');
bad.concat(banned).forEach(x=>console.log('  '+x));process.exit(bad.length+banned.length?1:0);
