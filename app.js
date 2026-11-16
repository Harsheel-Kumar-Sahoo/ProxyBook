import {API_URL} from './config.js';
const $=s=>document.querySelector(s),M=$('#main'),esc=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
let U=null,SUM=null,fresh=0;
const today=()=>{const d=new Date();return new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10)};
const toast=m=>{const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,3500)};
const theme=t=>{if(t&&t!=='system')document.documentElement.dataset.theme=t;else delete document.documentElement.dataset.theme};
async function api(action,payload){const c=new AbortController(),t=setTimeout(()=>c.abort(),20000);let j;
 try{const r=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,token:localStorage.pb_token,payload}),signal:c.signal});j=await r.json()}
 catch(e){throw{message:e.name==='AbortError'?'The server took too long to respond. Check your connection and try again.':'Could not reach the server. Check API_URL in config.js and your connection.'}}
 finally{clearTimeout(t)}
 if(!j.ok){if(j.error.code==='session'){localStorage.removeItem('pb_token');U=null;sessionStorage.msg=j.error.message;location.hash='#/login'}throw j.error}
 return j.data}
const skel=()=>'<div class="list">'+'<div class="sk"></div>'.repeat(4)+'</div>';
const chip=b=>b>0?`<span class="chip pos">+${b} owed</span>`:b<0?`<span class="chip neg">You owe ${-b}</span>`:'<span class="chip">Settled</span>';
const dchip=d=>`<span class="chip ${d>0?'pos':d<0?'neg':''}">${d>0?'+':'−'}${Math.abs(d)}</span>`;
const day=d=>new Date(String(d).length===10?d+'T12:00':d).toLocaleDateString('en',{weekday:'long'});
const empty=(t,b='')=>`<div class="empty"><p>${t}</p>${b}</div>`;
const sum=async()=>SUM=await api('getSummary');
function rng(s){return()=>{s=(s+0x6D2B79F5)|0;let t=Math.imul(s^s>>>15,1|s);t^=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function tally(n){n=Math.min(n,100);let o='';for(let g=0;g*5<n;g++){let p='';for(let k=0;k<5&&g*5+k<n;k++){const i=g*5+k,r=rng(i*7919+13),j=()=>r()*3-1.5,c=i>=n-fresh?' class="new"':'';
 p+=k<4?`<path${c} pathLength="1" d="M${7+k*11+j()} ${5+j()}L${7+k*11+j()*1.5} ${49+j()}"/>`:`<path${c} pathLength="1" d="M${1+j()} ${42+j()}L${51+j()} ${11+j()}"/>`}
 o+=`<svg viewBox="0 0 54 56" width="54" height="56" aria-hidden="true">${p}</svg>`}
 $('#tally').innerHTML=o;fresh=0}
const frow=f=>`<details data-id="${f.friend_id}"><summary><span class="av">${esc(f.name[0].toUpperCase())}</span><span class="grow"><b>${esc(f.name)}</b><small>${f.last?'Last activity: '+day(f.last):'No activity yet'}</small></span>${chip(f.balance)}</summary><div class="hist"></div><div class="acts">${f.balance>0?`<button class="btn" data-a="nudge" data-id="${f.friend_id}">Nudge</button>`:''}${f.balance?`<button class="btn" data-a="settle" data-id="${f.friend_id}">Settle</button>`:''}</div></details>`;
const arow=p=>`<div class="ai"><span class="grow"><b>${esc(p.friend_name)}</b><small>${esc(p.type==='settlement'?'Settled up':p.type==='reversal'?'Undone':p.subject||'Proxy')} on ${esc(p.class_date)}</small></span>${dchip(p.delta)}</div>`;
const noFriends=empty('Add your first friend to start a ledger.','<p><a class="btn pri" style="text-decoration:none;display:inline-block" href="#/friends">Add a friend</a></p>');
function modal(h){const d=document.createElement('dialog');d.innerHTML=h;document.body.append(d);d.addEventListener('close',()=>d.remove());d.showModal();return d}
function ask(t,p,label,fn){const d=modal(`<h2 style="margin-top:0">${esc(t)}</h2><p>${esc(p)}</p><div class="row"><button class="btn" id="c">Cancel</button><button class="btn pri" id="o">${esc(label)}</button></div>`);
 d.querySelector('#c').onclick=()=>d.close();d.querySelector('#o').onclick=async()=>{try{await fn()}catch(x){toast(x.message)}d.close()}}
async function nudge(f){const m=`Hey ${f.name}, quick reminder: you owe me ${f.balance} ${f.balance>1?'proxies':'proxy'}. Can we settle up this week?`;
 if(f.phone)open('https://wa.me/'+f.phone.replace(/\D/g,'')+'?text='+encodeURIComponent(m),'_blank','noopener');
 else try{await navigator.clipboard.writeText(m);toast('No phone number saved, so the message is copied. Paste it into your chat.')}catch{toast('Could not copy the message. Add a phone number to this friend to use WhatsApp.')}}
function logModal(d){const fs=SUM.friends;if(!fs.length){toast('Add a friend first.');location.hash='#/friends';return}
 const m=modal(`<h2 style="margin-top:0">${d>0?'I did a proxy':'They did a proxy'}</h2><form><label>Friend<select name="fr">${fs.map(f=>`<option value="${f.friend_id}">${esc(f.name)}</option>`).join('')}</select></label><label>Class or subject (optional)<input name="sub"></label>
 <label>Number of classes<div class="step"><button type="button" class="btn" data-s="-1" aria-label="Fewer classes">−</button><input name="n" type="number" min="1" max="20" value="1"><button type="button" class="btn" data-s="1" aria-label="More classes">+</button></div></label>
 <label>Date<input name="dt" type="date" value="${today()}"></label><label>Note (optional)<input name="note"></label><p class="err" role="alert"></p><button class="btn pri">Save proxy</button></form>`);
 const f=m.querySelector('form');
 f.onclick=e=>{const s=e.target.dataset.s;if(s){const i=f.n;i.value=Math.max(1,Math.min(20,(+i.value||1)+ +s))}};
 f.onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(f)),n=Math.max(1,Math.min(20,+v.n|0)),b=f.querySelector('.pri');b.disabled=true;
  try{await api('addProxy',{friend_id:v.fr,delta:d*n,subject:v.sub,note:v.note,class_date:v.dt});const nm=fs.find(x=>x.friend_id===v.fr).name;m.close();fresh=d>0?n:0;
   toast(d>0?`Saved. ${nm} owes you ${n} more.`:`Saved. You owe ${nm} ${n} more.`);route()}catch(x){f.querySelector('.err').textContent=x.message;b.disabled=false}}}
async function home(){M.innerHTML=skel();await sum();const s=SUM;
 M.innerHTML=`<p class="lbl">Total proxies owed to you</p><div class="big">${s.owed}</div><div id="tally" role="img" aria-label="${s.owed} tally marks"></div><p class="mut">You owe ${s.owing} ${s.owing===1?'class':'classes'} to friends</p>
 <div class="row"><button class="btn pri" data-a="log" data-d="1">I did a proxy</button><button class="btn" data-a="log" data-d="-1">They did a proxy</button></div><h2>Proxy ledger</h2>
 ${s.friends.length?'<div class="list">'+s.friends.slice(0,5).map(frow).join('')+'</div>':noFriends}`;tally(s.owed)}
async function ledger(){M.innerHTML=skel();await sum();const fs=SUM.friends;
 M.innerHTML=`<h1>Ledger</h1>${fs.length?`<label>Search friends<input id="q" type="search"></label><div id="ll" class="list"></div>`:noFriends}`;
 const draw=()=>{const q=($('#q').value||'').toLowerCase(),r=fs.filter(f=>f.name.toLowerCase().includes(q));$('#ll').innerHTML=r.length?r.map(frow).join(''):empty('No friend matches that search.')};
 if(fs.length){$('#q').oninput=draw;draw()}}
async function activity(){M.innerHTML=skel();await sum();
 M.innerHTML=`<h1>Activity</h1><label>Filter by friend<select id="fl"><option value="">All friends</option>${SUM.friends.map(f=>`<option value="${f.friend_id}">${esc(f.name)}</option>`).join('')}</select></label><div id="al"></div>`;
 const load=async()=>{const id=$('#fl').value,it=await api('listProxies',{friend_id:id});
  $('#al').innerHTML=(!id&&it[0]&&it[0].type!=='reversal'?'<p><button class="btn" data-a="undo">Undo last entry</button></p>':'')+(it.length?'<div class="list">'+it.map(arow).join('')+'</div>':empty('Nothing logged yet. Your first proxy will show up here.'))};
 $('#fl').onchange=()=>load().catch(x=>toast(x.message));await load()}
async function friends(){M.innerHTML=skel();const fs=await api('listFriends');
 M.innerHTML=`<h1>Friends</h1><form class="panel" id="af"><label>Name<input name="name" required></label><label>Phone (optional, with country code)<input name="phone" type="tel"></label><label>Email (optional)<input name="email" type="email"></label><p class="err" role="alert"></p><button class="btn pri">Add friend</button></form>
 ${fs.length?'<div class="list">'+fs.map(f=>`<div class="ai"><span class="av">${esc(f.name[0].toUpperCase())}</span><span class="grow"><b>${esc(f.name)}</b><small>${esc(f.phone||'No phone saved')}</small></span>${f.linked?'<span class="chip pos">Synced</span>':''}<button class="btn dng" data-a="delf" data-id="${f.friend_id}" data-n="${esc(f.name)}">Delete</button></div>`).join('')+'</div>':empty('No friends yet. Add one above to start a ledger.')}`;
 $('#af').onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(e.target));try{const f=await api('addFriend',v);toast(f.linked?`${f.name} added and synced.`:`${f.name} added.`);friends()}catch(x){e.target.querySelector('.err').textContent=x.message}}}
function settings(){M.innerHTML=`<h1>Settings</h1>
 <form class="panel" id="sp"><label>Name<input name="name" value="${esc(U.name)}" required></label><button class="btn pri">Save name</button></form>
 <form class="panel" id="sc"><label>Current password<input name="old" type="password" autocomplete="current-password"></label><label>New password (8 characters or more)<input name="new" type="password" autocomplete="new-password"></label><p class="err" role="alert"></p><button class="btn pri">Change password</button></form>
 <div class="panel"><label>Theme<select id="th">${['system','light','dark'].map(t=>`<option ${U.theme===t?'selected':''}>${t}</option>`).join('')}</select></label><button class="btn" data-a="logout">Log out</button></div>
 <div class="panel"><h2 style="margin-top:0">Delete account</h2><p>This removes your account, friends and history. Type DELETE to confirm.</p><input id="dc" aria-label="Type DELETE"><p><button class="btn dng" id="dd" disabled>Delete account</button></p></div>`;
 const up=async p=>{U=await api('updateProfile',p);theme(U.theme);hdr()};
 $('#sp').onsubmit=async e=>{e.preventDefault();try{await up({name:e.target.name.value});toast('Name saved.')}catch(x){toast(x.message)}};
 $('#th').onchange=e=>up({theme:e.target.value}).catch(x=>toast(x.message));
 $('#sc').onsubmit=async e=>{e.preventDefault();const f=e.target;try{await api('changePassword',{old:f.old.value,new:f.new.value});f.reset();f.querySelector('.err').textContent='';toast('Password changed.')}catch(x){f.querySelector('.err').textContent=x.message}};
 $('#dc').oninput=e=>$('#dd').disabled=e.target.value!=='DELETE';
 $('#dd').onclick=async()=>{try{await api('deleteAccount',{confirm:'DELETE'});localStorage.removeItem('pb_token');U=null;location.hash='#/login'}catch(x){toast(x.message)}}}
function forgot(){M.innerHTML=`<div class="auth"><h1>Forgot password</h1><p>Password reset is coming soon. For now, ask the person who runs your ProxyBook sheet to reset it.</p><a href="#/login">Back to log in</a></div>`}
function auth(r){const su=r==='signup',fld=(n,l,t,ac)=>`<label>${l}<input name="${n}" type="${t}" autocomplete="${ac}"></label><p class="err" data-for="${n}"></p>`;
 M.innerHTML=`<div class="auth"><div class="brand"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v18M12 16l5-8"/></svg>ProxyBook</div><p class="mut">Every proxy, on the record.</p><h1 style="margin-top:32px">${su?'Create your account':'Log in'}</h1>
 <form novalidate>${su?fld('name','Name','text','name'):''}${fld('email','Email','email','email')}${fld('pw','Password','password',su?'new-password':'current-password')}${su?fld('pw2','Confirm password','password','new-password'):''}<p class="err" data-for="form" role="alert">${esc(sessionStorage.msg||'')}</p><button class="btn pri">${su?'Sign up':'Log in'}</button></form>
 <p>${su?'Already have an account? <a href="#/login">Log in</a>':'New here? <a href="#/signup">Sign up</a> or <a href="#/forgot">forgot password</a>'}</p></div>`;sessionStorage.removeItem('msg');
 const rules={name:v=>su&&!v.name.trim()&&'Enter your name.',email:v=>!/^\S+@\S+\.\S+$/.test(v.email.trim())&&'Enter a valid email address.',pw:v=>su?v.pw.length<8&&'Use at least 8 characters.':!v.pw&&'Enter your password.',pw2:v=>su&&v.pw2!==v.pw&&'Passwords do not match.'};
 M.querySelector('form').onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(e.target));let bad=0;
  for(const k in rules){const m=rules[k](v)||'',el=M.querySelector(`[data-for=${k}]`);if(el)el.textContent=m;bad|=!!m}
  if(bad)return;const fe=M.querySelector('[data-for=form]');fe.textContent='';
  try{const d=await api(su?'signup':'login',{name:v.name,email:v.email,password:v.pw});localStorage.pb_token=d.token;U=null;location.hash='#/home';if(location.hash==='#/home')route()}catch(x){fe.textContent=x.message}}}
const R={home,ledger,activity,friends,settings,login:auth,signup:auth,forgot};
const isOpen=()=>document.body.classList.contains('open');
function nav(o){document.body.classList.toggle('open',o);const h=$('#hb');h.setAttribute('aria-expanded',o);h.setAttribute('aria-label',o?'Close menu':'Open menu');(o?$('#side a'):h).focus()}
function hdr(){$('#sn').textContent=U.name;$('#se').textContent=U.email;$('#av').textContent=U.name[0].toUpperCase()}
async function route(){const r=location.hash.slice(2)||'home',pub=['login','signup','forgot'].includes(r);
 if(!pub&&!localStorage.pb_token){location.hash='#/login';return}
 if(!U&&localStorage.pb_token)try{U=await api('me');theme(U.theme)}catch{return}
 if(pub&&U&&r!=='forgot'){location.hash='#/home';return}
 document.body.classList.toggle('authed',!!U&&!pub);if(U&&!pub)hdr();
 document.querySelectorAll('#side a').forEach(a=>a.hash==='#/'+r?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
 if(isOpen())nav(false);
 try{await(R[r]||home)(r)}catch(e){if(e.code==='session')return;M.innerHTML=empty(`<b>Could not load this screen.</b> ${esc(e.message)}`,'<p><button class="btn" data-a="retry">Try again</button></p>')}
 scrollTo(0,0)}
M.addEventListener('toggle',async e=>{const d=e.target;if(!d.open||!d.dataset.id)return;const h=d.querySelector('.hist');h.innerHTML='<div class="sk"></div>';
 try{const r=await api('listProxies',{friend_id:d.dataset.id});h.innerHTML=r.length?r.slice(0,10).map(arow).join(''):'<p class="mut">No history yet.</p>'}catch(x){h.textContent=x.message}},true);
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b)return;const{a,id,d,n}=b.dataset,f=SUM&&SUM.friends.find(x=>x.friend_id===id);
 try{
  if(a==='log')logModal(+d);
  else if(a==='nudge')nudge(f);
  else if(a==='settle')ask(`Settle up with ${f.name}?`,'This adds a settlement entry that brings the balance to zero. Your history stays.','Settle up',async()=>{await api('settleFriend',{friend_id:id});toast(`Settled up with ${f.name}.`);route()});
  else if(a==='undo'){await api('undoLast');toast('Last entry undone.');route()}
  else if(a==='delf')ask(`Delete ${n}?`,'This removes the friend and all history with them.','Delete friend',async()=>{await api('deleteFriend',{friend_id:id});toast('Friend deleted.');route()});
  else if(a==='logout'){await api('logout').catch(()=>{});localStorage.removeItem('pb_token');U=null;SUM=null;document.body.classList.remove('open');location.hash='#/login'}
  else if(a==='retry')route();
 }catch(x){toast(x.message)}});
$('#hb').onclick=()=>nav(!isOpen());$('#bd').onclick=()=>nav(false);$('#bell').onclick=()=>toast('No notifications yet.');
addEventListener('keydown',e=>{if(!isOpen())return;if(e.key==='Escape')nav(false);
 if(e.key==='Tab'){const f=[...$('#side').querySelectorAll('a,button')],a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
addEventListener('hashchange',route);route();
