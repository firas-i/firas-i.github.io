// Tiny static preview server: node build/serve.js [port]
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),port=+process.argv[2]||4173;
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.mp3':'audio/mpeg','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
http.createServer((q,r)=>{
  let p=path.normalize(decodeURIComponent(q.url.split('?')[0]));
  let f=path.join(root,p); if(!f.startsWith(root)){r.writeHead(403);return r.end();}
  if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');
  if(!fs.existsSync(f)){r.writeHead(404,{'content-type':types['.html']});return r.end(fs.existsSync(path.join(root,'404.html'))?fs.readFileSync(path.join(root,'404.html')):'404');}
  r.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream','accept-ranges':'bytes'});fs.createReadStream(f).pipe(r);
}).listen(port,()=>console.log('http://localhost:'+port));
