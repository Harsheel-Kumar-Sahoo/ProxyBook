import {API_URL} from './config.js';
const $=s=>document.querySelector(s),M=$('#main'),esc=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const P={'file-text':'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',inbox:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
'book-open':'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
'log-out':'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
check:'<path d="M20 6 9 17l-5-5"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',plus:'<path d="M5 12h14M12 5v14"/>',minus:'<path d="M5 12h14"/>',send:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',trash:'<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
done:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',up:'<path d="M7 7h10v10M7 17 17 7"/>',down:'<path d="M17 17H7V7M17 7 7 17"/>',right:'<path d="m9 18 6-6-6-6"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"/>',moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'};
const ic=(n,s=20)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
document.querySelectorAll('[data-ic]').forEach(e=>e.insertAdjacentHTML('afterbegin',ic(e.dataset.ic)));
const theme=()=>document.documentElement.dataset.theme==='dark'?'dark':'light';
function setTheme(t,save){const d=t==='dark',h=document.documentElement;if(save){h.classList.add('theme-fade');setTimeout(()=>h.classList.remove('theme-fade'),300);try{localStorage.pb_theme=t}catch{}}
 h.dataset.theme=d?'dark':'light';$('meta[name=theme-color]').content=d?'#0E1020':'#3B5BFF';
 document.querySelectorAll('[data-a=theme]').forEach(b=>{b.innerHTML=ic(d?'sun':'moon');b.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode');b.title=d?'Light mode':'Dark mode'})}
setTheme(theme());
const unorm=s=>String(s||'').trim().replace(/^@/,'').toLowerCase();
const uerr=u=>!u?'Enter a username.':u.length<3?'Use at least 3 characters.':u.length>20?'Use 20 characters or fewer.':!/^[a-z0-9_]+$/.test(u)?'Use only letters, numbers and underscores.':'';
const ubox=(name,label,o={})=>`<div class="fld"><label class="fl" for="u-${name}">${label}</label><div class="ubox"><span class="w"><span class="at" aria-hidden="true">@</span><input id="u-${name}" name="${name}" value="${esc(o.value||'')}" autocomplete="${o.ac||'off'}" autocapitalize="none" autocorrect="off" spellcheck="false" maxlength="21"${o.list?` list="${o.list}"`:''}${o.req?' required':''}></span><button type="button" class="btn" data-a="chk" data-f="${name}" data-m="${o.mode||'avail'}">${o.mode==='find'?'Find':'Check'}</button></div><p class="err" data-for="${name}" role="alert"></p><p class="ok" data-ok="${name}"></p></div>`;
// Check a username. mode "avail": must be free (signup / change). mode "find": must exist (send a proxy / add a friend).
async function chk(root,name,mode){const i=root.querySelector(`[name=${name}]`),e=root.querySelector(`[data-for=${name}]`),o=root.querySelector(`[data-ok=${name}]`),b=root.querySelector(`[data-a=chk][data-f=${name}]`),u=unorm(i.value),me=ST&&ST.U&&ST.U.username;
 i.value=u;e.textContent=o.textContent='';delete i.dataset.found;const m=uerr(u);if(m){e.textContent=m;i.focus();return false}
 if(mode==='find'&&u===me){e.textContent='That is your own username.';return false}
 if(mode!=='find'&&u===me){o.textContent='That is already your username.';return true}
 const t=b.textContent;b.disabled=true;b.textContent='Checking…';
 try{if(mode==='find'){const r=await api('lookupUser',{username:u});if(r&&(r.found||r.exists)){i.dataset.found=r.name||'';o.textContent=r.name?`Found ${r.name} (@${u}).`:`Found @${u}.`;
   const nm=root.querySelector('[name=name]');if(nm&&!nm.value.trim()&&r.name)nm.value=r.name;return true}e.textContent=`No one uses @${u}. Check the spelling.`;return false}
  const r=await api('checkUsername',{username:u});if(r&&r.available){o.textContent=`@${u} is available.`;return true}e.textContent=`@${u} is taken. Try another.`;return false}
 catch(x){e.textContent=x.message;return false}finally{b.disabled=false;b.textContent=t}}
document.addEventListener('input',e=>{const i=e.target;if(i.name&&i.closest('.ubox')){const r=i.closest('form');r.querySelector(`[data-ok=${i.name}]`).textContent='';r.querySelector(`[data-for=${i.name}]`).textContent=''}});
let ST=null,fresh=0,last=0,busy=0;try{ST=localStorage.pb_token?JSON.parse(localStorage.pb_st||'null'):null}catch{}
const today=()=>{const d=new Date();return new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10)};
const toast=m=>{const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,3500)};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function clear(){localStorage.removeItem('pb_token');localStorage.removeItem('pb_st');ST=null}
const RO=['boot','listProxies','checkUsername','lookupUser'];
async function api(action,payload,retry){const c=new AbortController(),t=setTimeout(()=>c.abort(),30000);let j;
 try{const r=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,token:localStorage.pb_token,payload}),signal:c.signal});j=await r.json()}
 catch(e){if(e.name!=='AbortError'&&!retry&&RO.includes(action)){clearTimeout(t);return api(action,payload,1)}throw{message:e.name==='AbortError'?'The server took too long to respond. Check your connection and try again.':'Could not reach the server. Check API_URL in config.js and your connection.'}}
 finally{clearTimeout(t)}
 if(!j.ok){if(j.error.code==='session'){clear();sessionStorage.msg=j.error.message;location.hash='#/login'}throw j.error}return j.data}
function paint(){const n=ST.REQ.incoming.length;$('#bn').textContent=n;$('#bn').hidden=!n;$('#sn').textContent=ST.U.name;$('#se').textContent=(ST.U.username?'@'+ST.U.username+' · ':'')+ST.U.email;$('#av').textContent=ST.U.name[0].toUpperCase()}
function apply(b){if(!b||!b.summary)return;if(ST&&b.summary.owed>ST.SUM.owed)fresh=b.summary.owed-ST.SUM.owed;ST={U:b.user,SUM:b.summary,REQ:b.requests};localStorage.pb_st=JSON.stringify(ST);paint()}
const HC=new Map();
async function sync(force){if(busy||!force&&Date.now()-last<15000)return;busy=1;try{const b=await api('boot'),ch=!ST||JSON.stringify([b.summary,b.requests])!==JSON.stringify([ST.SUM,ST.REQ]);if(ch)HC.clear();apply(b);last=Date.now();return ch}finally{busy=0}}
const pal=[['#FFE3D6','#B8400F'],['#DDF5E8','#0F7B55'],['#FFF1BF','#8A6500'],['#F6E1FF','#8A2BB0'],['#D9F3F8','#0E6C80'],['#E6EBFF','#2A3FD0']];
const av=n=>{const c=pal[[...n].reduce((s,x)=>s+x.charCodeAt(0),0)%pal.length];return `<span class="av" style="background:${c[0]};color:${c[1]}">${esc(n[0].toUpperCase())}</span>`};
const skel=()=>'<div class="list">'+'<div class="sk"></div>'.repeat(4)+'</div>';
const chip=b=>b>0?`<span class="chip pos">+${b} owed</span>`:b<0?`<span class="chip neg">You owe ${-b}</span>`:'<span class="chip">Settled</span>';
const dchip=d=>`<span class="chip ${d>0?'pos':d<0?'neg':''}">${d>0?'+':'−'}${Math.abs(d)}</span>`;
const day=d=>new Date(String(d).length===10?d+'T12:00':d).toLocaleDateString('en',{weekday:'long'});
const pr=n=>`${n} ${n>1?'proxies':'proxy'}`;
const empty=(t,b='')=>`<div class="empty"><p>${t}</p>${b}</div>`;
const mark=s=>`<img class="lg" src="logo.png" width="${s}" height="${s}" alt="" onerror="this.remove()"><svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v18M12 16l5-8"/></svg>`;
function rng(s){return()=>{s=(s+0x6D2B79F5)|0;let t=Math.imul(s^s>>>15,1|s);t^=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function tally(n){n=Math.min(n,100);let o='';for(let g=0;g*5<n;g++){let p='';for(let k=0;k<5&&g*5+k<n;k++){const i=g*5+k,r=rng(i*7919+13),j=()=>r()*3-1.5,c=i>=n-fresh?' class="new"':'';
 p+=k<4?`<path${c} pathLength="1" d="M${7+k*11+j()} ${5+j()}L${7+k*11+j()*1.5} ${49+j()}"/>`:`<path${c} pathLength="1" d="M${1+j()} ${42+j()}L${51+j()} ${11+j()}"/>`}
 o+=`<svg viewBox="0 0 54 56" width="54" height="56" aria-hidden="true">${p}</svg>`}$('#tally').innerHTML=o;fresh=0}
const frow=f=>`<details data-id="${f.friend_id}"><summary>${av(f.name)}<span class="grow"><b>${esc(f.name)}</b><small>${f.username?'@'+esc(f.username)+' · ':''}${f.last?'Last activity: '+day(f.last):'No activity yet'}${f.linked?' · Synced':''}</small></span>${chip(f.balance)}</summary><div class="hist"></div><div class="acts">${f.balance>0?`<button class="btn sm" data-a="nudge" data-id="${f.friend_id}">${ic('send',16)}Nudge</button>`:''}${f.balance?`<button class="btn sm" data-a="settle" data-id="${f.friend_id}">${ic('done',16)}Settle</button>`:''}</div></details>`;
const arow=p=>`<div class="ai"><span class="grow"><b>${esc(p.friend_name)}</b><small>${esc(p.type==='settlement'?'Settled up':p.type==='reversal'?'Undone':p.subject||'Proxy')} on ${esc(p.class_date)}</small></span>${dchip(p.delta)}</div>`;
const noFriends=empty('Add your first friend to start a ledger.',`<p><a class="btn pri" style="text-decoration:none" href="#/friends">${ic('plus',16)}Add a friend</a></p>`);
function modal(h){const d=document.createElement('dialog');d.innerHTML=h;document.body.append(d);d.addEventListener('close',()=>d.remove());d.showModal();return d}
function ask(t,p,label,fn){const d=modal(`<h2 style="margin-top:0">${esc(t)}</h2><p>${esc(p)}</p><div class="row"><button class="btn" id="c">Cancel</button><button class="btn pri" id="o">${esc(label)}</button></div>`);
 d.querySelector('#c').onclick=()=>d.close();d.querySelector('#o').onclick=async()=>{try{await fn()}catch(x){toast(x.message)}d.close()}}
async function nudge(f){const m=`Hey ${f.name}, quick reminder: you owe me ${pr(f.balance)}. Can we settle up this week?`;
 if(f.phone)open('https://wa.me/'+f.phone.replace(/\D/g,'')+'?text='+encodeURIComponent(m),'_blank','noopener');
 else try{await navigator.clipboard.writeText(m);toast('No phone number saved, so the message is copied. Paste it into your chat.')}catch{toast('Could not copy the message. Add a phone number to this friend to use WhatsApp.')}}
const redraw=()=>draw(location.hash.slice(2)||'home');
function logModal(d){const lf=ST.SUM.friends.filter(f=>f.username);
 const m=modal(`<h2 style="margin-top:0">${d>0?'I did a proxy':'They did a proxy'}</h2><form novalidate>${ubox('username','Their username',{mode:'find',list:'fu',req:1})}<datalist id="fu">${lf.map(f=>`<option value="${esc(f.username)}">${esc(f.name)}</option>`).join('')}</datalist>
 <p class="mut">${d>0?'They get a request to confirm you did it.':'They get a request to confirm they did it.'} It counts once they accept.</p>
 <label>Class or subject (optional)<input name="sub"></label><label>Number of classes<div class="step"><button type="button" class="btn" data-s="-1" aria-label="Fewer classes">${ic('minus')}</button><input name="n" type="number" min="1" max="20" value="1"><button type="button" class="btn" data-s="1" aria-label="More classes">${ic('plus')}</button></div></label>
 <label>Date<input name="dt" type="date" value="${today()}"></label><label>Note (optional)<input name="note"></label><p class="err" data-for="form" role="alert"></p><div class="row"><button type="button" class="btn" id="cx">Cancel</button><button class="btn pri" id="sv">${ic('send',16)}Send request</button></div></form>`);
 const f=m.querySelector('form'),fe=f.querySelector('[data-for=form]');m.querySelector('#cx').onclick=()=>m.close();f.username.focus();
 f.onclick=e=>{const s=e.target.closest('[data-s]');if(s){const i=f.n;i.value=Math.max(1,Math.min(20,(+i.value||1)+ +s.dataset.s))}};
 f.onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(f)),u=unorm(v.username),n=Math.max(1,Math.min(20,+v.n|0)),b=$('#sv'),ue=f.querySelector('[data-for=username]');fe.textContent='';
  const bad=uerr(u)||(u===ST.U.username?'That is your own username.':'');if(bad){ue.textContent=bad;return}b.disabled=true;
  try{const fr=lf.find(x=>x.username===u),r=await api('addProxy',{username:u,friend_id:fr&&fr.friend_id,delta:d*n,subject:v.sub,note:v.note,class_date:v.dt}),nm=f.username.dataset.found||(fr&&fr.name)||'@'+u;HC.clear();m.close();apply(r);
   toast(r.pending===false?(d>0?`Saved. ${nm} owes you ${n} more.`:`Saved. You owe ${nm} ${n} more.`):`Request sent to ${nm}. It counts once they confirm.`);redraw()}catch(x){(/username|user/i.test(x.message)?ue:fe).textContent=x.message;b.disabled=false}}}
function home(){const s=ST.SUM,rq=ST.REQ.incoming.length;
 M.innerHTML=`${rq?`<a class="ban" href="#/requests">${ic('inbox',24)}<span class="grow"><b>${rq>1?rq+' requests need':'1 request needs'} your OK</b><small>Friends are waiting for you to confirm.</small></span>${ic('right')}</a>`:''}
 <section class="hero"><p>Total proxies owed to you</p><div class="big">${s.owed}</div><div id="tally" role="img" aria-label="${s.owed} tally marks"></div><p>You owe ${s.owing} ${s.owing===1?'class':'classes'} to friends</p></section>
 <div class="row"><button class="btn pri" data-a="log" data-d="1">${ic('up',18)}I did a proxy</button><button class="btn" data-a="log" data-d="-1">${ic('down',18)}They did a proxy</button></div><h2>Proxy ledger</h2>
 ${s.friends.length?'<div class="list">'+s.friends.slice(0,5).map(frow).join('')+'</div>':noFriends}`;tally(s.owed)}
function requests(){const q=ST.REQ,w=r=>`${esc(r.subject||'No subject')} on ${esc(r.class_date)}${r.note?'. '+esc(r.note):''}`;
 const inc=r=>`<div class="ai">${av(r.from_name)}<span class="grow"><b>${esc(r.from_name)} says ${r.doer_is_me?'you did':'they did'} ${pr(r.count)} for ${r.doer_is_me?'them':'you'}</b><small>${w(r)}</small><small>${r.doer_is_me?'They will owe you '+r.count+'.':'You will owe them '+r.count+'.'}</small></span><span class="acts" style="padding:0"><button class="btn sm pri" data-a="resp" data-ok="1" data-id="${r.request_id}">${ic('check',16)}Accept</button><button class="btn sm" data-a="resp" data-ok="0" data-id="${r.request_id}" aria-label="Decline">${ic('x',16)}</button></span></div>`;
 const out=r=>`<div class="ai">${ic('clock')}<span class="grow"><b>Waiting for ${esc(r.to_name)}</b><small>${r.doer_is_me?'You did':'They did'} ${pr(r.count)} for ${r.doer_is_me?'them':'you'}. ${w(r)}</small></span><button class="btn sm" data-a="cancel" data-id="${r.request_id}">Cancel</button></div>`;
 M.innerHTML=`<h1>Requests</h1><h2 style="margin-top:0">Needs your OK</h2>${q.incoming.length?'<div class="list">'+q.incoming.map(inc).join('')+'</div>':empty('Nothing waiting. When a synced friend logs a proxy with you, it shows up here.')}
 <h2>Waiting on friends</h2>${q.outgoing.length?'<div class="list">'+q.outgoing.map(out).join('')+'</div>':empty('No pending requests from you.')}`}
function ledger(){const fs=ST.SUM.friends;M.innerHTML=`<h1>Ledger</h1>${fs.length?`<label>Search friends<input id="q" type="search"></label><div id="ll" class="list"></div>`:noFriends}`;
 const dr=()=>{const q=$('#q').value.toLowerCase(),r=fs.filter(f=>f.name.toLowerCase().includes(q));$('#ll').innerHTML=r.length?r.map(frow).join(''):empty('No friend matches that search.')};if(fs.length){$('#q').oninput=dr;dr()}}
async function activity(){M.innerHTML=`<h1>Activity</h1><label>Filter by friend<select id="fl"><option value="">All friends</option>${ST.SUM.friends.map(f=>`<option value="${f.friend_id}">${esc(f.name)}</option>`).join('')}</select></label><div id="al">${skel()}</div>`;
 const show=(id,it)=>{if($('#fl').value!==id)return;$('#al').innerHTML=(!id&&it[0]&&it[0].type!=='reversal'?`<p><button class="btn" data-a="undo">${ic('undo',16)}Undo last entry</button></p>`:'')+(it.length?'<div class="list">'+it.map(arow).join('')+'</div>':empty('Nothing logged yet. Your first proxy will show up here.'))};
 const load=async()=>{const id=$('#fl').value;if(HC.has('a'+id))show(id,HC.get('a'+id));else $('#al').innerHTML=skel();const it=await api('listProxies',{friend_id:id});HC.set('a'+id,it);show(id,it)};
 $('#fl').onchange=()=>load().catch(x=>toast(x.message));await load()}
function friends(){const fs=ST.SUM.friends;
 M.innerHTML=`<h1>Friends</h1><form class="panel" id="af"><label>Name<input name="name" required></label>${ubox('username','Username (optional)',{mode:'find'})}<p class="mut">Add their ProxyBook username to sync. You then confirm each other's proxies.</p><label>Phone (optional, with country code)<input name="phone" type="tel"></label><p class="err" data-for="form" role="alert"></p><button class="btn pri">${ic('plus',16)}Add friend</button></form>
 ${fs.length?'<div class="list">'+fs.map(f=>`<div class="ai">${av(f.name)}<span class="grow"><b>${esc(f.name)}</b><small>${f.username?'@'+esc(f.username)+' · ':''}${esc(f.phone||'No phone saved')}</small></span>${f.linked?'<span class="chip pos">Synced</span>':''}<button class="btn sm dng" data-a="delf" data-id="${f.friend_id}" data-n="${esc(f.name)}" aria-label="Delete ${esc(f.name)}">${ic('trash',16)}</button></div>`).join('')+'</div>':empty('No friends yet. Add one above to start a ledger.')}`;
 $('#af').onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(e.target)),fe=e.target.querySelector('[data-for=form]');v.username=unorm(v.username);fe.textContent='';
  if(v.username){const m=uerr(v.username)||(v.username===ST.U.username?'That is your own username.':'');if(m){e.target.querySelector('[data-for=username]').textContent=m;return}}
  try{const r=await api('addFriend',v);HC.clear();apply(r);toast(r.linked?`${v.name} added and synced.`:`${v.name} added.`);redraw()}catch(x){fe.textContent=x.message}}}
function tutorial(){const src='tutorial.pdf',inline=navigator.pdfViewerEnabled!==false&&!matchMedia('(pointer:coarse)').matches;
M.innerHTML=`<h1>Tutorial</h1><p style="color:var(--mut);margin:0 0 14px">A short guide to logging, confirming and settling proxies.</p>
<p class="pdfbar"><a class="btn pri" href="${src}" target="_blank" rel="noopener">${ic('file-text',16)}Open full screen</a><a class="btn" href="${src}" download="ProxyBook-User-Guide.pdf">${ic('down',16)}Download PDF</a></p>
${inline?`<iframe class="pdf" src="${src}#view=FitH" title="ProxyBook tutorial (PDF)"></iframe>`:`<div class="panel"><b>Tap Open full screen to read the guide.</b><p style="color:var(--mut);margin:6px 0 0">Your browser cannot show PDFs inside the page, so the guide opens in its own tab.</p></div>`}`}
function settings(){M.innerHTML=`<h1>Settings</h1>
 <form class="panel" id="sp"><label>Name<input name="name" value="${esc(ST.U.name)}" required></label><button class="btn pri">Save name</button></form>
 <form class="panel" id="su" novalidate>${ubox('username','Username',{value:ST.U.username||''})}<p class="mut">Friends use this to send you proxy requests.</p><button class="btn pri">Save username</button></form>
 <form class="panel" id="sc"><label>Current password<input name="old" type="password" autocomplete="current-password"></label><label>New password (8 characters or more)<input name="new" type="password" autocomplete="new-password"></label><p class="err" role="alert"></p><button class="btn pri">Change password</button></form>
 <p><button class="btn" data-a="logout">${ic('log-out',16)}Log out</button></p>
 <div class="panel"><h2 style="margin-top:0">Delete account</h2><p>This removes your account, friends and history. Type DELETE to confirm.</p><input id="dc" aria-label="Type DELETE"><p style="margin-top:12px"><button class="btn dng" id="dd" disabled>${ic('trash',16)}Delete account</button></p></div>`;
 $('#sp').onsubmit=async e=>{e.preventDefault();try{apply(await api('updateProfile',{name:e.target.name.value}));toast('Name saved.')}catch(x){toast(x.message)}};
 $('#su').onsubmit=async e=>{e.preventDefault();const f=e.target,u=unorm(f.username.value),er=f.querySelector('[data-for=username]');er.textContent='';const m=uerr(u);if(m){er.textContent=m;return}if(u===ST.U.username){toast('That is already your username.');return}
  try{await saveUsername(u);toast('Username saved.');redraw()}catch(x){er.textContent=x.message}};
 $('#sc').onsubmit=async e=>{e.preventDefault();const f=e.target;try{await api('changePassword',{old:f.old.value,new:f.new.value});f.reset();f.querySelector('.err').textContent='';toast('Password changed.')}catch(x){f.querySelector('.err').textContent=x.message}};
 $('#dc').oninput=e=>$('#dd').disabled=e.target.value!=='DELETE';
 $('#dd').onclick=async()=>{try{await api('deleteAccount',{confirm:'DELETE'});clear();location.hash='#/login'}catch(x){toast(x.message)}}}
async function saveUsername(u){const r=await api('setUsername',{username:u});if(r&&r.summary)apply(r);else{ST.U.username=u;localStorage.pb_st=JSON.stringify(ST);paint()}}
let asked=0;
function needName(){if(asked||!ST||ST.U.username)return;asked=1;
 const m=modal(`<h2 style="margin-top:0">Choose your username</h2><p>Friends use your username to send you proxy requests. Pick one to continue.</p><form novalidate>${ubox('username','Username',{req:1})}<button class="btn pri" id="us">Save username</button></form>`);
 m.addEventListener('cancel',e=>e.preventDefault());const f=m.querySelector('form');f.username.focus();
 f.onsubmit=async e=>{e.preventDefault();const u=unorm(f.username.value),er=f.querySelector('[data-for=username]'),b=$('#us');er.textContent='';const x=uerr(u);if(x){er.textContent=x;return}b.disabled=true;
  try{await saveUsername(u);m.close();toast(`You are @${u}.`);redraw()}catch(y){er.textContent=y.message;b.disabled=false}}}
function forgot(){M.innerHTML=`<div class="auth"><h1>Forgot password</h1><p>Password reset is coming soon. For now, ask the person who runs your ProxyBook sheet to reset it.</p><a href="#/login">Back to log in</a></div>`}
function splash(msg,sub){const d=document.createElement('div');d.id='splash';
 d.innerHTML=`<svg width="120" height="64" viewBox="0 0 120 64" aria-hidden="true">${[0,1,2,3].map(i=>`<path class="t" pathLength="1" style="animation-delay:${.05+i*.07}s" d="M${14+i*22} 8L${16+i*22} 52"/>`).join('')}<path class="t" pathLength="1" style="animation-delay:.35s" d="M4 44L104 14"/></svg><div class="brand">${mark(36)}ProxyBook</div><h1>${esc(msg)}</h1><p>${esc(sub)}</p>`;document.body.append(d);return d}
function enter(d,isNew){localStorage.pb_token=d.token;asked=0;HC.clear();apply(d);last=Date.now();const f=d.user.name.split(' ')[0],sp=splash(isNew?`You're in, ${f}.`:`Good to see you, ${f}.`,isNew?'Your register is open.':'Your ledger is ready.');
 location.hash='#/home';setTimeout(()=>{sp.classList.add('out');setTimeout(()=>sp.remove(),250)},isNew?800:450)}
function auth(r){const su=r==='signup',fld=(n,l,t,ac)=>`<label>${l}<input name="${n}" type="${t}" autocomplete="${ac}"${n==='id'?' autocapitalize="none" spellcheck="false"':''}></label><p class="err" data-for="${n}"></p>`;
 M.innerHTML=`<div class="auth"><button class="ib thm" type="button" data-a="theme"></button><div class="brand">${mark(36)}ProxyBook</div><p class="mut">Every proxy, on the record.</p><h1 style="margin-top:32px">${su?'Start your register':'Log in'}</h1>
 <form novalidate>${su?fld('name','Name','text','name')+ubox('username','Choose a username',{ac:'username'}):''}${su?fld('email','Email','email','email'):fld('id','Email or username','text','username')}${fld('pw','Password','password',su?'new-password':'current-password')}${su?fld('pw2','Confirm password','password','new-password'):''}<p class="err" data-for="form" role="alert">${esc(sessionStorage.msg||'')}</p><button class="btn pri">${su?'Sign up':'Log in'}</button></form>
 <p style="margin-top:16px">${su?'Already have an account? <a href="#/login">Log in</a>':'New here? <a href="#/signup">Sign up</a> or <a href="#/forgot">forgot password</a>'}</p></div>`;sessionStorage.removeItem('msg');setTheme(theme());
 const rules={name:v=>su&&!v.name.trim()&&'Enter your name.',username:v=>su&&uerr(unorm(v.username)),email:v=>su&&!/^\S+@\S+\.\S+$/.test(v.email.trim())&&'Enter a valid email address.',id:v=>!su&&!v.id.trim()&&'Enter your email or username.',pw:v=>su?v.pw.length<8&&'Use at least 8 characters.':!v.pw&&'Enter your password.',pw2:v=>su&&v.pw2!==v.pw&&'Passwords do not match.'};
 M.querySelector('form').onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(e.target));let bad=0;
  for(const k in rules){const m=rules[k](v)||'',el=M.querySelector(`[data-for=${k}]`);if(el)el.textContent=m;bad|=!!m}
  if(bad)return;const fe=M.querySelector('[data-for=form]'),b=e.target.querySelector('.pri');fe.textContent='';b.disabled=true;b.textContent=su?'Creating account…':'Logging in…';
  const idv=(v.id||'').trim(),isE=idv.includes('@'),pl=su?{name:v.name.trim(),username:unorm(v.username),email:v.email.trim(),password:v.pw}:{email:isE?idv:'',username:isE?'':unorm(idv),login:idv,password:v.pw};
  try{enter(await api(su?'signup':'login',pl),su)}catch(x){if(su&&/username/i.test(x.message))M.querySelector('[data-for=username]').textContent=x.message;else fe.textContent=x.message;b.disabled=false;b.textContent=su?'Sign up':'Log in'}}}
const R={home,requests,ledger,activity,friends,settings,tutorial,login:auth,signup:auth,forgot};
function draw(r){try{(R[r]||home)(r)}catch(e){M.innerHTML=empty(`<b>Could not show this screen.</b> ${esc(e.message)}`,'<p><button class="btn" data-a="retry">Try again</button></p>')}}
const live=()=>!$('dialog[open]')&&!/INPUT|SELECT/.test(document.activeElement.tagName)&&['home','requests','ledger','friends'].includes(location.hash.slice(2)||'home');
const isOpen=()=>document.body.classList.contains('open');
function nav(o){document.body.classList.toggle('open',o);const h=$('#hb');h.setAttribute('aria-expanded',o);h.setAttribute('aria-label',o?'Close menu':'Open menu');(o?$('#side a'):h).focus()}
async function route(){const r=location.hash.slice(2)||'home',pub=['login','signup','forgot'].includes(r),tk=localStorage.pb_token;
 if(!pub&&!tk){location.hash='#/login';return}
 if(pub&&tk&&r!=='forgot'){location.hash='#/home';return}
 document.body.classList.toggle('authed',!pub);
 if(!pub&&!ST){M.innerHTML=skel();try{await sync(1)}catch(e){if(e.code!=='session')M.innerHTML=empty(`<b>Could not load your ledger.</b> ${esc(e.message)}`,'<p><button class="btn" data-a="retry">Try again</button></p>');return}}
 if(!pub)paint();
 document.querySelectorAll('#side a').forEach(a=>a.hash==='#/'+r?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
 if(isOpen())nav(false);draw(r);scrollTo(0,0);
 if(!pub){needName();sync().then(ch=>{if(ch&&live())draw(r);needName()}).catch(()=>{})}}
M.addEventListener('toggle',async e=>{const d=e.target;if(!d.open||!d.dataset.id)return;const h=d.querySelector('.hist'),k='f'+d.dataset.id,sh=r=>h.innerHTML=r.length?r.slice(0,10).map(arow).join(''):'<p class="mut">No history yet.</p>';
 if(HC.has(k))sh(HC.get(k));else h.innerHTML='<div class="sk"></div>';
 try{const r=await api('listProxies',{friend_id:d.dataset.id});HC.set(k,r);sh(r)}catch(x){if(!HC.has(k))h.textContent=x.message}},true);
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b)return;const{a,id,d,n,ok}=b.dataset,f=ST&&ST.SUM.friends.find(x=>x.friend_id===id),run=async(act,pl,msg)=>{const r=await api(act,pl);HC.clear();apply(r);toast(msg);redraw()},
  drop=()=>{ST.REQ.incoming=ST.REQ.incoming.filter(r=>r.request_id!==id);ST.REQ.outgoing=ST.REQ.outgoing.filter(r=>r.request_id!==id);paint();redraw()},
  opt=async(act,pl,msg)=>{drop();try{await run(act,pl,msg)}catch(x){sync(1).then(redraw).catch(()=>{});throw x}};
 try{
  if(a==='theme')setTheme(theme()==='dark'?'light':'dark',1);
  else if(a==='chk')await chk(b.closest('form'),b.dataset.f,b.dataset.m);
  else if(a==='log')logModal(+d);
  else if(a==='nudge')nudge(f);
  else if(a==='settle')ask(`Settle up with ${f.name}?`,'This adds a settlement entry that brings the balance to zero. Your history stays.','Settle up',()=>run('settleFriend',{friend_id:id},`Settled up with ${f.name}.`));
  else if(a==='undo')await run('undoLast',{},'Last entry undone.');
  else if(a==='resp')await opt('respondRequest',{request_id:id,accept:ok==='1'},ok==='1'?'Accepted. Your ledger is updated.':'Request declined.');
  else if(a==='cancel')await opt('cancelRequest',{request_id:id},'Request cancelled.');
  else if(a==='delf')ask(`Delete ${n}?`,'This removes the friend and all history with them.','Delete friend',()=>run('deleteFriend',{friend_id:id},'Friend deleted.'));
  else if(a==='logout'){const t=api('logout').catch(()=>{});clear();HC.clear();document.body.classList.remove('open');location.hash='#/login';await t}
  else if(a==='retry')route();
 }catch(x){toast(x.message)}});
$('#hb').onclick=()=>nav(!isOpen());$('#bd').onclick=()=>nav(false);
addEventListener('keydown',e=>{if(!isOpen())return;if(e.key==='Escape')nav(false);
 if(e.key==='Tab'){const f=[...$('#side').querySelectorAll('a,button')],a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
addEventListener('hashchange',route);route();
// Apps Script cold-starts; wake it while the user is still typing their credentials.
if(!localStorage.pb_token)fetch(API_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'ping'})}).catch(()=>{});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&localStorage.pb_token&&ST)sync().then(ch=>{if(ch&&live())redraw()}).catch(()=>{})});
