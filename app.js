import {API_URL} from './config.js';
const $=s=>document.querySelector(s),M=$('#main'),esc=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const P={home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',inbox:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
'book-open':'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
'log-out':'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
check:'<path d="M20 6 9 17l-5-5"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',plus:'<path d="M5 12h14M12 5v14"/>',minus:'<path d="M5 12h14"/>',send:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',trash:'<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
done:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',up:'<path d="M7 7h10v10M7 17 17 7"/>',down:'<path d="M17 17H7V7M17 7 7 17"/>',right:'<path d="m9 18 6-6-6-6"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'};
const ic=(n,s=20)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
document.querySelectorAll('[data-ic]').forEach(e=>e.insertAdjacentHTML('afterbegin',ic(e.dataset.ic)));
let ST=null,fresh=0,last=0,busy=0;try{ST=localStorage.pb_token?JSON.parse(localStorage.pb_st||'null'):null}catch{}
const today=()=>{const d=new Date();return new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10)};
const toast=m=>{const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,3500)};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function clear(){localStorage.removeItem('pb_token');localStorage.removeItem('pb_st');ST=null}
async function api(action,payload){const c=new AbortController(),t=setTimeout(()=>c.abort(),30000);let j;
 try{const r=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,token:localStorage.pb_token,payload}),signal:c.signal});j=await r.json()}
 catch(e){throw{message:e.name==='AbortError'?'The server took too long to respond. Check your connection and try again.':'Could not reach the server. Check API_URL in config.js and your connection.'}}
 finally{clearTimeout(t)}
 if(!j.ok){if(j.error.code==='session'){clear();sessionStorage.msg=j.error.message;location.hash='#/login'}throw j.error}return j.data}
function apply(b){if(!b||!b.summary)return;if(ST&&b.summary.owed>ST.SUM.owed)fresh=b.summary.owed-ST.SUM.owed;ST={U:b.user,SUM:b.summary,REQ:b.requests};localStorage.pb_st=JSON.stringify(ST);
 const n=ST.REQ.incoming.length;$('#bn').textContent=n;$('#bn').hidden=!n;$('#sn').textContent=ST.U.name;$('#se').textContent=ST.U.email;$('#av').textContent=ST.U.name[0].toUpperCase()}
async function sync(force){if(busy||!force&&Date.now()-last<15000)return;busy=1;try{const b=await api('boot'),ch=!ST||JSON.stringify([b.summary,b.requests])!==JSON.stringify([ST.SUM,ST.REQ]);apply(b);last=Date.now();return ch}finally{busy=0}}
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
const frow=f=>`<details data-id="${f.friend_id}"><summary>${av(f.name)}<span class="grow"><b>${esc(f.name)}</b><small>${f.last?'Last activity: '+day(f.last):'No activity yet'}${f.linked?' · Synced':''}</small></span>${chip(f.balance)}</summary><div class="hist"></div><div class="acts">${f.balance>0?`<button class="btn sm" data-a="nudge" data-id="${f.friend_id}">${ic('send',16)}Nudge</button>`:''}${f.balance?`<button class="btn sm" data-a="settle" data-id="${f.friend_id}">${ic('done',16)}Settle</button>`:''}</div></details>`;
const arow=p=>`<div class="ai"><span class="grow"><b>${esc(p.friend_name)}</b><small>${esc(p.type==='settlement'?'Settled up':p.type==='reversal'?'Undone':p.subject||'Proxy')} on ${esc(p.class_date)}</small></span>${dchip(p.delta)}</div>`;
const noFriends=empty('Add your first friend to start a ledger.',`<p><a class="btn pri" style="text-decoration:none" href="#/friends">${ic('plus',16)}Add a friend</a></p>`);
function modal(h){const d=document.createElement('dialog');d.innerHTML=h;document.body.append(d);d.addEventListener('close',()=>d.remove());d.showModal();return d}
function ask(t,p,label,fn){const d=modal(`<h2 style="margin-top:0">${esc(t)}</h2><p>${esc(p)}</p><div class="row"><button class="btn" id="c">Cancel</button><button class="btn pri" id="o">${esc(label)}</button></div>`);
 d.querySelector('#c').onclick=()=>d.close();d.querySelector('#o').onclick=async()=>{try{await fn()}catch(x){toast(x.message)}d.close()}}
async function nudge(f){const m=`Hey ${f.name}, quick reminder: you owe me ${pr(f.balance)}. Can we settle up this week?`;
 if(f.phone)open('https://wa.me/'+f.phone.replace(/\D/g,'')+'?text='+encodeURIComponent(m),'_blank','noopener');
 else try{await navigator.clipboard.writeText(m);toast('No phone number saved, so the message is copied. Paste it into your chat.')}catch{toast('Could not copy the message. Add a phone number to this friend to use WhatsApp.')}}
const redraw=()=>draw(location.hash.slice(2)||'home');
function logModal(d){const fs=ST.SUM.friends;if(!fs.length){toast('Add a friend first.');location.hash='#/friends';return}
 const m=modal(`<h2 style="margin-top:0">${d>0?'I did a proxy':'They did a proxy'}</h2><form><label>Friend<select name="fr">${fs.map(f=>`<option value="${f.friend_id}">${esc(f.name)}${f.linked?' (synced)':''}</option>`).join('')}</select></label><p class="mut" id="hint"></p>
 <label>Class or subject (optional)<input name="sub"></label><label>Number of classes<div class="step"><button type="button" class="btn" data-s="-1" aria-label="Fewer classes">${ic('minus')}</button><input name="n" type="number" min="1" max="20" value="1"><button type="button" class="btn" data-s="1" aria-label="More classes">${ic('plus')}</button></div></label>
 <label>Date<input name="dt" type="date" value="${today()}"></label><label>Note (optional)<input name="note"></label><p class="err" role="alert"></p><button class="btn pri" id="sv"></button></form>`);
 const f=m.querySelector('form'),lk=()=>fs.find(x=>x.friend_id===f.fr.value).linked,
 hint=()=>{$('#hint').textContent=lk()?(d>0?'This friend is synced. They get a request to confirm you did it.':'This friend is synced. They get a request to confirm they did it.'):'';$('#sv').textContent=lk()?'Send request':'Save proxy'};hint();f.fr.onchange=hint;
 f.onclick=e=>{const s=e.target.closest('[data-s]');if(s){const i=f.n;i.value=Math.max(1,Math.min(20,(+i.value||1)+ +s.dataset.s))}};
 f.onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(f)),n=Math.max(1,Math.min(20,+v.n|0)),b=$('#sv');b.disabled=true;
  try{const r=await api('addProxy',{friend_id:v.fr,delta:d*n,subject:v.sub,note:v.note,class_date:v.dt}),nm=fs.find(x=>x.friend_id===v.fr).name;m.close();apply(r);
   toast(r.pending?`Request sent to ${nm}. It counts once they confirm.`:d>0?`Saved. ${nm} owes you ${n} more.`:`Saved. You owe ${nm} ${n} more.`);redraw()}catch(x){f.querySelector('.err').textContent=x.message;b.disabled=false}}}
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
async function activity(){M.innerHTML=skel();M.innerHTML=`<h1>Activity</h1><label>Filter by friend<select id="fl"><option value="">All friends</option>${ST.SUM.friends.map(f=>`<option value="${f.friend_id}">${esc(f.name)}</option>`).join('')}</select></label><div id="al">${skel()}</div>`;
 const load=async()=>{const id=$('#fl').value,it=await api('listProxies',{friend_id:id});
  $('#al').innerHTML=(!id&&it[0]&&it[0].type!=='reversal'?`<p><button class="btn" data-a="undo">${ic('undo',16)}Undo last entry</button></p>`:'')+(it.length?'<div class="list">'+it.map(arow).join('')+'</div>':empty('Nothing logged yet. Your first proxy will show up here.'))};
 $('#fl').onchange=()=>load().catch(x=>toast(x.message));await load()}
function friends(){const fs=ST.SUM.friends;
 M.innerHTML=`<h1>Friends</h1><form class="panel" id="af"><label>Name<input name="name" required></label><label>Phone (optional, with country code)<input name="phone" type="tel"></label><label>Email (optional)<input name="email" type="email"></label><p class="mut">If the email belongs to a ProxyBook user, you become synced and confirm each other's proxies.</p><p class="err" role="alert"></p><button class="btn pri">${ic('plus',16)}Add friend</button></form>
 ${fs.length?'<div class="list">'+fs.map(f=>`<div class="ai">${av(f.name)}<span class="grow"><b>${esc(f.name)}</b><small>${esc(f.phone||'No phone saved')}</small></span>${f.linked?'<span class="chip pos">Synced</span>':''}<button class="btn sm dng" data-a="delf" data-id="${f.friend_id}" data-n="${esc(f.name)}" aria-label="Delete ${esc(f.name)}">${ic('trash',16)}</button></div>`).join('')+'</div>':empty('No friends yet. Add one above to start a ledger.')}`;
 $('#af').onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(e.target));try{const r=await api('addFriend',v);apply(r);toast(r.linked?`${v.name} added and synced.`:`${v.name} added.`);redraw()}catch(x){e.target.querySelector('.err').textContent=x.message}}}
function settings(){M.innerHTML=`<h1>Settings</h1>
 <form class="panel" id="sp"><label>Name<input name="name" value="${esc(ST.U.name)}" required></label><button class="btn pri">Save name</button></form>
 <form class="panel" id="sc"><label>Current password<input name="old" type="password" autocomplete="current-password"></label><label>New password (8 characters or more)<input name="new" type="password" autocomplete="new-password"></label><p class="err" role="alert"></p><button class="btn pri">Change password</button></form>
 <p><button class="btn" data-a="logout">${ic('log-out',16)}Log out</button></p>
 <div class="panel"><h2 style="margin-top:0">Delete account</h2><p>This removes your account, friends and history. Type DELETE to confirm.</p><input id="dc" aria-label="Type DELETE"><p style="margin-top:12px"><button class="btn dng" id="dd" disabled>${ic('trash',16)}Delete account</button></p></div>`;
 $('#sp').onsubmit=async e=>{e.preventDefault();try{apply(await api('updateProfile',{name:e.target.name.value}));toast('Name saved.')}catch(x){toast(x.message)}};
 $('#sc').onsubmit=async e=>{e.preventDefault();const f=e.target;try{await api('changePassword',{old:f.old.value,new:f.new.value});f.reset();f.querySelector('.err').textContent='';toast('Password changed.')}catch(x){f.querySelector('.err').textContent=x.message}};
 $('#dc').oninput=e=>$('#dd').disabled=e.target.value!=='DELETE';
 $('#dd').onclick=async()=>{try{await api('deleteAccount',{confirm:'DELETE'});clear();location.hash='#/login'}catch(x){toast(x.message)}}}
function forgot(){M.innerHTML=`<div class="auth"><h1>Forgot password</h1><p>Password reset is coming soon. For now, ask the person who runs your ProxyBook sheet to reset it.</p><a href="#/login">Back to log in</a></div>`}
function splash(msg,sub){const d=document.createElement('div');d.id='splash';
 d.innerHTML=`<svg width="120" height="64" viewBox="0 0 120 64" aria-hidden="true">${[0,1,2,3].map(i=>`<path class="t" pathLength="1" style="animation-delay:${.15+i*.15}s" d="M${14+i*22} 8L${16+i*22} 52"/>`).join('')}<path class="t" pathLength="1" style="animation-delay:.8s" d="M4 44L104 14"/></svg><div class="brand">${mark(36)}ProxyBook</div><h1>${esc(msg)}</h1><p>${esc(sub)}</p>`;document.body.append(d);return d}
async function enter(d,isNew){localStorage.pb_token=d.token;apply(d);last=Date.now();const f=d.user.name.split(' ')[0],sp=splash(isNew?`You're in, ${f}.`:`Good to see you, ${f}.`,isNew?'Your register is open.':'Your ledger is ready.');
 location.hash='#/home';await wait(1700);sp.classList.add('out');setTimeout(()=>sp.remove(),350)}
function auth(r){const su=r==='signup',fld=(n,l,t,ac)=>`<label>${l}<input name="${n}" type="${t}" autocomplete="${ac}"></label><p class="err" data-for="${n}"></p>`;
 M.innerHTML=`<div class="auth"><div class="brand">${mark(36)}ProxyBook</div><p class="mut">Every proxy, on the record.</p><h1 style="margin-top:32px">${su?'Start your register':'Log in'}</h1>
 <form novalidate>${su?fld('name','Name','text','name'):''}${fld('email','Email','email','email')}${fld('pw','Password','password',su?'new-password':'current-password')}${su?fld('pw2','Confirm password','password','new-password'):''}<p class="err" data-for="form" role="alert">${esc(sessionStorage.msg||'')}</p><button class="btn pri">${su?'Sign up':'Log in'}</button></form>
 <p style="margin-top:16px">${su?'Already have an account? <a href="#/login">Log in</a>':'New here? <a href="#/signup">Sign up</a> or <a href="#/forgot">forgot password</a>'}</p></div>`;sessionStorage.removeItem('msg');
 const rules={name:v=>su&&!v.name.trim()&&'Enter your name.',email:v=>!/^\S+@\S+\.\S+$/.test(v.email.trim())&&'Enter a valid email address.',pw:v=>su?v.pw.length<8&&'Use at least 8 characters.':!v.pw&&'Enter your password.',pw2:v=>su&&v.pw2!==v.pw&&'Passwords do not match.'};
 M.querySelector('form').onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(e.target));let bad=0;
  for(const k in rules){const m=rules[k](v)||'',el=M.querySelector(`[data-for=${k}]`);if(el)el.textContent=m;bad|=!!m}
  if(bad)return;const fe=M.querySelector('[data-for=form]'),b=e.target.querySelector('.pri');fe.textContent='';b.disabled=true;b.textContent=su?'Creating account…':'Logging in…';
  try{await enter(await api(su?'signup':'login',{name:v.name,email:v.email,password:v.pw}),su)}catch(x){fe.textContent=x.message;b.disabled=false;b.textContent=su?'Sign up':'Log in'}}}
const R={home,requests,ledger,activity,friends,settings,login:auth,signup:auth,forgot};
function draw(r){try{(R[r]||home)(r)}catch(e){M.innerHTML=empty(`<b>Could not show this screen.</b> ${esc(e.message)}`,'<p><button class="btn" data-a="retry">Try again</button></p>')}}
const live=()=>!$('dialog[open]')&&!/INPUT|SELECT/.test(document.activeElement.tagName)&&['home','requests','ledger','friends'].includes(location.hash.slice(2)||'home');
const isOpen=()=>document.body.classList.contains('open');
function nav(o){document.body.classList.toggle('open',o);const h=$('#hb');h.setAttribute('aria-expanded',o);h.setAttribute('aria-label',o?'Close menu':'Open menu');(o?$('#side a'):h).focus()}
async function route(){const r=location.hash.slice(2)||'home',pub=['login','signup','forgot'].includes(r),tk=localStorage.pb_token;
 if(!pub&&!tk){location.hash='#/login';return}
 if(pub&&tk&&r!=='forgot'){location.hash='#/home';return}
 document.body.classList.toggle('authed',!pub);
 if(!pub&&!ST){M.innerHTML=skel();try{await sync(1)}catch(e){if(e.code!=='session')M.innerHTML=empty(`<b>Could not load your ledger.</b> ${esc(e.message)}`,'<p><button class="btn" data-a="retry">Try again</button></p>');return}}
 if(!pub)apply(ST);
 document.querySelectorAll('#side a').forEach(a=>a.hash==='#/'+r?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
 if(isOpen())nav(false);draw(r);scrollTo(0,0);
 if(!pub)sync().then(ch=>{if(ch&&live())draw(r)}).catch(()=>{})}
M.addEventListener('toggle',async e=>{const d=e.target;if(!d.open||!d.dataset.id)return;const h=d.querySelector('.hist');h.innerHTML='<div class="sk"></div>';
 try{const r=await api('listProxies',{friend_id:d.dataset.id});h.innerHTML=r.length?r.slice(0,10).map(arow).join(''):'<p class="mut">No history yet.</p>'}catch(x){h.textContent=x.message}},true);
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b)return;const{a,id,d,n,ok}=b.dataset,f=ST&&ST.SUM.friends.find(x=>x.friend_id===id),run=async(act,pl,msg)=>{apply(await api(act,pl));toast(msg);redraw()};
 try{
  if(a==='log')logModal(+d);
  else if(a==='nudge')nudge(f);
  else if(a==='settle')ask(`Settle up with ${f.name}?`,'This adds a settlement entry that brings the balance to zero. Your history stays.','Settle up',()=>run('settleFriend',{friend_id:id},`Settled up with ${f.name}.`));
  else if(a==='undo')await run('undoLast',{},'Last entry undone.');
  else if(a==='resp')await run('respondRequest',{request_id:id,accept:ok==='1'},ok==='1'?'Accepted. Your ledger is updated.':'Request declined.');
  else if(a==='cancel')await run('cancelRequest',{request_id:id},'Request cancelled.');
  else if(a==='delf')ask(`Delete ${n}?`,'This removes the friend and all history with them.','Delete friend',()=>run('deleteFriend',{friend_id:id},'Friend deleted.'));
  else if(a==='logout'){await api('logout').catch(()=>{});clear();document.body.classList.remove('open');location.hash='#/login'}
  else if(a==='retry')route();
 }catch(x){toast(x.message)}});
$('#hb').onclick=()=>nav(!isOpen());$('#bd').onclick=()=>nav(false);
addEventListener('keydown',e=>{if(!isOpen())return;if(e.key==='Escape')nav(false);
 if(e.key==='Tab'){const f=[...$('#side').querySelectorAll('a,button')],a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
addEventListener('hashchange',route);route();
