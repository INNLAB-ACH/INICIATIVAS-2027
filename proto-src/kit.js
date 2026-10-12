/* ===== Kit de prototipos ACH: router por hash, registro, panel del moderador, estados ===== */
var K=(function(){
'use strict';
var cfg,S,SID,cur=null,enteredAt=0,tok=0,retryFn=null,lastFocus=null,shell=null,root,screenEl,ovEl;

/* ---------- Utilidades ---------- */
function $(s){return document.querySelector(s);}
function money(n){var neg=n<0;return (neg?'-':'')+'$'+String(Math.round(Math.abs(n))).replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function pad(n){return String(n).padStart(2,'0');}
function fdate(d){return pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear();}
function ftime(d){return pad(d.getHours())+':'+pad(d.getMinutes());}
function pct(x,dec){return (x*100).toFixed(dec==null?1:dec).replace('.',',')+' %';}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function norm(s){return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();}
function rnd(n){var s='';for(var i=0;i<n;i++)s+=Math.floor(Math.random()*10);return s.replace(/^0/,'7');}
function plural(n,a,b){return n===1?a:b;}

/* ---------- Íconos ---------- */
var I={
  back:'<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  lock:'<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  ok:'<svg width="68" height="68" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="#E3F1E8"/><path d="M14 25l7 7 13-15" fill="none" stroke="#1E7A46" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  alert:'<svg width="68" height="68" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="#FDF0D5"/><path d="M24 13v14" stroke="#7A4F00" stroke-width="3.5" stroke-linecap="round"/><circle cx="24" cy="34" r="2.4" fill="#7A4F00"/></svg>',
  close:'<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  check:'<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  info:'<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 11v6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="7.5" r="1.4" fill="currentColor"/></svg>',
  download:'<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  doc:'<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z M14 3v4h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  bell:'<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4z M10 21h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  chev:'<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  fp:'<svg class="fp" viewBox="0 0 64 64" width="92" height="92" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 28a20 20 0 0 1 40 0"/><path d="M19 44c-2-4-3-8-3-12a16 16 0 0 1 32 0c0 2 0 3-.2 5"/><path d="M25 49c-2-5-3-10-3-16a10 10 0 0 1 20 0c0 5-.5 10-2 14"/><path d="M32 33c0 7-1 13-4 18"/><path d="M37 35c0 6-1 11-3 16"/><path d="M46 42c-.4 3-1 6-2 9"/></g></svg>'
};
function mark(txt,bg,fg){return '<span class="avatar" aria-hidden="true" style="width:34px;height:34px;font-size:14px;'+(bg?'background:'+bg+';':'')+(fg?'color:'+fg+';':'')+'">'+esc(txt)+'</span>';}
function row(k,v,strong){return '<div class="row"><span class="k">'+k+'</span><span class="v'+(strong?' strong':'')+'">'+v+'</span></div>';}

/* ---------- Parámetros de URL y estado ---------- */
function readParams(){
  var q=new URLSearchParams(location.search),p={};
  (cfg.params||[]).forEach(function(d){
    var v=q.get(d.k);v=v==null?d.def:v;
    var ok=d.opts.some(function(o){return String(o[0]).toLowerCase()===String(v).toLowerCase();});
    if(ok){d.opts.forEach(function(o){if(String(o[0]).toLowerCase()===String(v).toLowerCase())v=o[0];});}else v=d.def;
    p[d.k]=v;
  });
  return p;
}
function freshState(prev){
  var s={p:readParams(),forceErr:prev?prev.forceErr:false,failed:{},task:{t0:0,screens:0,errors:0,done:false}};
  if(cfg.state){var x=cfg.state(s.p);for(var k in x)s[k]=x[k];}
  return s;
}
function startRoute(){return cfg.start(S.p);}
function vlabel(){var p=S.p,o=[];for(var k in p)o.push(k+'='+p[k]);return o.join('&')||'-';}

/* ---------- Registro de eventos ---------- */
var COLS=['ts','sesion','variante','pantalla','accion','detalle'];
function code(r){return (cfg.codes&&cfg.codes[r])||String(r||'').toUpperCase();}
function log(accion,detalle,pantalla){
  var e={ts:new Date().toISOString(),sesion:SID,variante:vlabel(),pantalla:pantalla||code(cur),accion:accion,
    detalle:detalle==null?'':(typeof detalle==='string'?detalle:JSON.stringify(detalle))};
  window.__log.push(e);
  try{localStorage.setItem(cfg.ls,JSON.stringify(window.__log));}catch(_){}
  if($('#logp')&&!$('#logp').hidden)renderLog();
}
function vErr(campos){S.task.errors++;log('error_validacion',{campos:campos});}
function complete(det){
  if(S.task.t0&&!S.task.done){S.task.done=true;log('tarea_completada',Object.assign({ms:Date.now()-S.task.t0,pantallas:S.task.screens,errores:S.task.errors},det||{}));}
}

/* ---------- Estructura (marco de teléfono o escritorio) ---------- */
var OVS='<div id="ov" class="overlay" hidden></div><div id="sheetWrap" hidden><div class="backdrop" data-act="closeSheet"></div><div class="sheet" id="sheet" role="dialog" aria-modal="true"></div></div><div id="sms" class="sms" hidden role="status" aria-live="polite"></div><div id="toast" class="toast" hidden role="status" aria-live="polite"></div>';
function buildShell(l){
  var band='<div class="band" id="band" role="note">Prototipo de investigación · datos ficticios</div>';
  var vb=cfg.views?'<div class="vbar" id="vbar" role="group" aria-label="Vista del prototipo">'+cfg.views.map(function(v,i){return '<button data-act="'+(v.act||'nav')+'" data-to="'+v.to+'" data-vi="'+i+'" aria-pressed="false">'+esc(v.label)+'</button>';}).join('')+'</div>':'';
  root.className=cfg.views?'hasv':'';
  root.innerHTML=vb+(l==='phone'?
    '<div class="stage"><div class="phone" id="phone">'+band+'<main class="screen" id="screen"></main>'+OVS+'</div></div>':
    '<div class="desk" id="phone">'+band+'<main class="screen" id="screen"></main>'+OVS+'</div>');
  shell=l;screenEl=$('#screen');ovEl=$('#ov');
  var taps=[];
  $('#band').addEventListener('click',function(){var n=Date.now();taps=taps.filter(function(x){return n-x<2000;});taps.push(n);if(taps.length>=5){taps=[];toggleMod();}});
}
function syncViews(r){
  if(!cfg.views)return;
  var act=-1;cfg.views.forEach(function(v,i){if(act<0&&(v.on?v.on(r):new RegExp(v.re).test(r)))act=i;});
  root.querySelectorAll('#vbar button').forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.vi===act));});
}

/* ---------- Barras reutilizables ---------- */
function appbar(o){
  var back=o.back?'<button class="back" data-act="back" data-to="'+o.back+'">'+I.back+'<span>Atrás</span></button>':'<span class="back-sp"></span>';
  return '<header class="appbar'+(o.cls?' '+o.cls:'')+'">'+back+'<div class="brand">'+(o.mark||'')+'<span>'+o.title+'</span></div>'+(o.right||'')+'</header>';
}
function dhead(o){
  var nav=(o.nav||[]).map(function(n){return '<button data-act="nav" data-to="'+n.to+'"'+(n.cur?' aria-current="page"':'')+'>'+esc(n.label)+'</button>';}).join('');
  return '<header class="dhead"><div class="in"><div class="brand">'+(o.mark||'')+'<span>'+o.title+'</span></div>'+(nav?'<nav aria-label="Secciones">'+nav+'</nav>':'')+'<span class="sp"></span>'+(o.right||'')+'</div></header>';
}

/* ---------- Router ---------- */
function go(r){if(location.hash==='#'+r)render();else location.hash=r;}
function rerender(){render(true);}
function render(re){
  var r=location.hash.slice(1);
  if(!cfg.routes[r]){r=startRoute();history.replaceState(null,'',location.pathname+location.search+'#'+r);}
  tok++;
  if(!re){
    if(cur&&cur!==r)log('tiempo_pantalla',{ms:Date.now()-enteredAt},code(cur));
    if(!S.task.t0||S.task.done){S.task={t0:Date.now(),screens:0,errors:0,done:false};S.failed={};log('inicio_tarea',{desde:code(r)},code(r));}
    S.task.screens++;cur=r;enteredAt=Date.now();
  }
  var y0=window.scrollY,st0=screenEl?screenEl.scrollTop:0;
  var d=cfg.routes[r](r);
  var l=d.layout||cfg.layout||'phone';
  if(l!==shell)buildShell(l);
  hideOverlay();closeSheet(true);hideSms();syncViews(r);
  var wrap=d.wrap||(l==='phone'?'content':'wrapd');
  var body=wrap==='none'?d.body:'<div class="'+wrap+'">'+d.body+'</div>';
  screenEl.innerHTML=(d.bar||'')+body+(d.foot?'<div class="footer">'+d.foot+'</div>':'');
  if(!re){screenEl.scrollTop=0;window.scrollTo(0,0);log('entrada_pantalla',null,code(r));}
  else{screenEl.scrollTop=st0;window.scrollTo(0,y0);}
  if(d.after)d.after();
  var h=re?null:screenEl.querySelector('h1');if(h){h.setAttribute('tabindex','-1');try{h.focus({preventScroll:true});}catch(_){h.focus();}}
}

/* ---------- Estados: carga, error, avisos ---------- */
function ov(html){ovEl.innerHTML=html;ovEl.hidden=false;}
function hideOverlay(){if(ovEl){ovEl.hidden=true;ovEl.innerHTML='';}}
function busy(msg,ms){var t=tok;
  ov('<div class="spinner" aria-hidden="true"></div><p class="ov-t" role="status">'+msg+'</p><p class="muted small">Esto toma solo unos segundos.</p>');
  return new Promise(function(res){setTimeout(function(){if(t!==tok){res(false);return;}hideOverlay();res(true);},ms||1200);});}
function maybeFail(k){if(S.forceErr&&!S.failed[k]){S.failed[k]=true;return true;}return false;}
function showError(title,msg,retry,label){
  S.task.errors++;log('error_sistema',{mensaje:title});retryFn=retry||null;
  ov(I.alert+'<h2 class="ov-t" role="alert">'+title+'</h2><p class="muted">'+msg+'</p><button class="btn btn-primary" data-act="ovRetry">'+(label||'Intentar de nuevo')+'</button>');
  var b=ovEl.querySelector('button');if(b)b.focus();
}
function fingerprint(){var t=tok;
  ov('<div class="fp-ring">'+I.fp+'</div><p class="ov-t" role="status">Pon tu dedo en el sensor</p><p class="muted small">Verificación biométrica simulada</p>');
  return new Promise(function(res){setTimeout(function(){if(t!==tok){res(false);return;}hideOverlay();res(true);},1500);});}
function toast(msg){var el=$('#toast');if(!el)return;el.textContent=msg;el.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(function(){el.hidden=true;},2600);}
function sms(html){var el=$('#sms');el.innerHTML='<div class="sms-h"><strong>Mensajes · SMS simulado</strong><span>ahora</span></div><p>'+html+'</p><button class="link" data-act="hideSms">Cerrar aviso</button>';el.hidden=false;}
function hideSms(){var e=$('#sms');if(e)e.hidden=true;}
function openSheet(html){lastFocus=document.activeElement;$('#sheet').innerHTML=html;$('#sheetWrap').hidden=false;var f=$('#sheet').querySelector('input,button');if(f)f.focus();}
function closeSheet(silent){var w=$('#sheetWrap');if(!w||w.hidden)return;w.hidden=true;$('#sheet').innerHTML='';if(!silent&&lastFocus&&lastFocus.focus)lastFocus.focus();}
function sheetHead(t){return '<div class="sheet-h"><h2 id="sh-t">'+t+'</h2><button class="iconbtn" data-act="closeSheet" aria-label="Cerrar">'+I.close+'</button></div>';}
function html(id,h){var e=document.getElementById(id);if(e)e.innerHTML=h;}
function copy(t,msg){function ok(){toast(msg||'Copiado');}if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,function(){fallbackCopy(t);ok();});}else{fallbackCopy(t);ok();}}
function notesBox(t){var v='';try{v=localStorage.getItem(cfg.ls+'_notes')||'';}catch(_){}return '<div class="note-side"><h3>'+(t||'Notas del entrevistador')+'</h3><textarea data-inp="_note" aria-label="Notas del entrevistador">'+esc(v)+'</textarea><p class="hint"><button class="link" data-act="copyNotes">Copiar notas</button> · se guardan solo en este navegador</p></div>';}
function setTxt(id,t){var e=document.getElementById(id);if(e)e.textContent=t;}
function setErr(id,msg,inputId){setTxt(id,msg);if(inputId){var i=document.getElementById(inputId);if(i)i.setAttribute('aria-invalid',msg?'true':'false');}}
function download(name,text,mime){
  log('descarga',{archivo:name});
  try{var b=new Blob([text],{type:mime||'text/plain;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);}catch(_){}
}

/* ---------- Panel del moderador (tecla M) ---------- */
function groups(){return typeof cfg.groups==='function'?cfg.groups(S.p):cfg.groups||[];}
function renderMod(){
  function r(name,val,lab,chk){return '<label class="opt"><input type="radio" name="'+name+'" value="'+esc(val)+'"'+(chk?' checked':'')+'> '+lab+'</label>';}
  var ps=(cfg.params||[]).map(function(d){return '<fieldset><legend>'+d.label+'</legend>'+d.opts.map(function(o){return r('mp_'+d.k,o[0],o[1],String(S.p[d.k])===String(o[0]));}).join('')+'</fieldset>';}).join('');
  var links=(cfg.params||[]).map(function(d){return d.opts.map(function(o){return '<span class="kbd">?'+d.k+'='+esc(o[0])+'</span>';}).join(' · ');}).join(' · ');
  $('#mod').innerHTML='<div class="pbox" role="dialog" aria-modal="true" aria-labelledby="mod-t">'+
  '<div class="ph"><h2 id="mod-t">Panel del moderador</h2><button class="iconbtn" data-act="closeMod" aria-label="Cerrar">'+I.close+'</button></div>'+
  '<p class="small muted">'+esc(cfg.title)+' · Sesión '+SID+' · '+esc(vlabel())+'</p>'+ps+
  '<label class="opt" style="margin-top:12px"><input type="checkbox" id="m-err"'+(S.forceErr?' checked':'')+'> Simular un error recuperable la primera vez en cada paso crítico</label>'+
  '<button class="btn btn-primary" data-act="modStart" style="margin-top:6px">Aplicar e iniciar desde el principio</button>'+
  groups().map(function(g){return '<h3>'+g[0]+'</h3><div class="jumps">'+g[1].map(function(k){return '<button data-act="jump" data-r="'+k+'">'+esc((cfg.labels&&cfg.labels[k])||k)+' <span class="muted">#'+k+'</span></button>';}).join('')+'</div>';}).join('')+
  '<div class="pactions" style="margin-top:16px"><button class="btn btn-secondary sm" data-act="openLog">Ver registro</button><button class="btn btn-secondary sm" data-act="reset">Reiniciar prototipo</button></div>'+
  '<p class="small muted">Atajos: <span class="kbd">M</span> este panel · <span class="kbd">Shift+L</span> registro · <span class="kbd">Shift+R</span> reiniciar · <span class="kbd">Esc</span> cerrar. En celular: toca 5 veces seguidas la banda superior.</p>'+
  (links?'<p class="small muted">Enlaces directos: '+links+'</p>':'')+'</div>';
}
function toggleMod(){var m=$('#mod');if(m.hidden){renderMod();m.hidden=false;var f=m.querySelector('input:checked');if(f)f.focus();}else m.hidden=true;}
function modStart(){
  var q=new URLSearchParams(location.search);
  (cfg.params||[]).forEach(function(d){var c=document.querySelector('input[name="mp_'+d.k+'"]:checked');if(c)q.set(d.k,c.value);});
  var fe=$('#m-err');var force=fe?fe.checked:S.forceErr;
  history.replaceState(null,'',location.pathname+'?'+q.toString()+location.hash);
  log('moderador_aplica',{variante:'(nueva)'});
  S=freshState({forceErr:force});S.forceErr=force;SID='S'+Date.now().toString(36).toUpperCase();cur=null;
  $('#mod').hidden=true;
  history.replaceState(null,'',location.pathname+location.search+'#'+startRoute());
  render();
}

/* ---------- Registro (Shift+L) ---------- */
function toCsv(){return [COLS.join(',')].concat(window.__log.map(function(e){return COLS.map(function(c){var v=String(e[c]==null?'':e[c]);return /[",\n;]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;}).join(',');})).join('\n');}
function fallbackCopy(t){var a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy');}catch(_){}a.remove();}
function renderLog(){
  var L=window.__log,start=Math.max(0,L.length-600);
  var rows=L.slice(start).map(function(e){return '<tr>'+COLS.map(function(c){return '<td>'+esc(e[c]==null?'':e[c])+'</td>';}).join('')+'</tr>';}).join('');
  $('#logp').innerHTML='<div class="pbox wide" role="dialog" aria-modal="true" aria-labelledby="log-t">'+
  '<div class="ph"><h2 id="log-t">Registro de eventos ('+L.length+')</h2><button class="iconbtn" data-act="closeLog" aria-label="Cerrar">'+I.close+'</button></div>'+
  '<div class="pactions"><button class="btn btn-primary sm" data-act="copyCsv">Copiar CSV</button><button class="btn btn-secondary sm" data-act="dlCsv">Descargar CSV</button><button class="btn btn-secondary sm" data-act="clearLog">Borrar registro</button></div>'+
  '<p id="copyMsg" class="small" role="status" style="color:var(--ok);font-weight:600"></p>'+
  (start?'<p class="small muted">Se muestran los últimos 600 eventos; el CSV incluye todos.</p>':'')+
  '<div class="logt-wrap"><table class="logt"><thead><tr>'+COLS.map(function(c){return '<th scope="col">'+c+'</th>';}).join('')+'</tr></thead><tbody>'+rows+'</tbody></table></div></div>';
  var w=$('#logp .logt-wrap');if(w)w.scrollTop=w.scrollHeight;
}
function toggleLog(force){var p=$('#logp');if(p.hidden||force){renderLog();p.hidden=false;var b=p.querySelector('button');if(b)b.focus();}else p.hidden=true;}
function resetProto(){
  if(S.task.t0&&!S.task.done)log('abandono',{motivo:'reinicio',ms:Date.now()-S.task.t0});
  log('reinicio');
  S=freshState(S);SID='S'+Date.now().toString(36).toUpperCase();cur=null;
  $('#mod').hidden=true;$('#logp').hidden=true;
  history.replaceState(null,'',location.pathname+location.search+'#'+startRoute());
  render();toast('Prototipo reiniciado');
}

/* ---------- Acciones integradas ---------- */
var BUILTIN={
  back:function(el){log('clic_atras',{hacia:el.dataset.to||'historial'});if(el.dataset.to)go(el.dataset.to);else history.back();},
  nav:function(el){log('clic_navegacion',{hacia:el.dataset.to});go(el.dataset.to);},
  closeSheet:function(){closeSheet();},
  hideSms:function(){hideSms();},
  ovRetry:function(){hideOverlay();log('reintento');if(retryFn)retryFn();},
  closeMod:function(){$('#mod').hidden=true;},
  modStart:modStart,
  jump:function(el){$('#mod').hidden=true;log('moderador_salta',{a:el.dataset.r});S.task={t0:0,screens:0,errors:0,done:false};go(el.dataset.r);},
  openLog:function(){toggleLog(true);},
  closeLog:function(){$('#logp').hidden=true;},
  copyCsv:function(){var t=toCsv(),m=$('#copyMsg');
    function ok(){if(m)m.textContent='CSV copiado al portapapeles ('+window.__log.length+' filas).';}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,function(){fallbackCopy(t);ok();});}else{fallbackCopy(t);ok();}},
  dlCsv:function(){var b=new Blob([toCsv()],{type:'text/csv;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='registro_'+cfg.id+'.csv';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},400);},
  clearLog:function(){if(window.confirm('¿Borrar todo el registro de este navegador?')){window.__log.length=0;try{localStorage.removeItem(cfg.ls);}catch(_){}renderLog();}},
  reset:resetProto,
  scroll:function(el){var t=document.getElementById(el.dataset.to);if(t){log('clic_seccion',{a:el.dataset.to});t.scrollIntoView({behavior:'smooth',block:'start'});}},
  copyNotes:function(){var t=document.querySelector('textarea[data-inp=_note]');copy(t?t.value:'','Notas copiadas');}
};
function onClick(e){
  var el=e.target.closest&&e.target.closest('[data-act]');if(!el||el.disabled)return;
  var a=el.dataset.act;
  if(BUILTIN[a]){BUILTIN[a](el,e);return;}
  var f=cfg.acts&&cfg.acts[a];
  if(f){log('clic',{accion:a,ref:el.dataset.id||(el.textContent||'').trim().slice(0,40)});f(el,e);}
}
function onInput(e){
  var el=e.target.closest&&e.target.closest('[data-inp]');if(!el)return;
  if(el.dataset.inp==='_note'){try{localStorage.setItem(cfg.ls+'_notes',el.value);}catch(_){}if(e.type==='change')log('nota_entrevistador',{caracteres:el.value.length});return;}
  var f=cfg.inps&&cfg.inps[el.dataset.inp];if(f)f(el,e.type,e);
}
function onKey(e){
  var t=e.target,typing=t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable);
  if(e.key==='Escape'){if(!$('#logp').hidden)$('#logp').hidden=true;else if(!$('#mod').hidden)$('#mod').hidden=true;else closeSheet();return;}
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(typing&&!(t.closest&&t.closest('.panel')))return;
  var k=e.key.toLowerCase();
  if(e.shiftKey&&k==='l'){e.preventDefault();toggleLog();}
  else if(e.shiftKey&&k==='r'){e.preventDefault();resetProto();}
  else if(!e.shiftKey&&k==='m'&&!typing){e.preventDefault();toggleMod();}
}

/* ---------- Arranque ---------- */
function run(c){
  cfg=c;cfg.ls='proto_'+cfg.id+'_log';root=$('#root');
  var stored=[];try{stored=JSON.parse(localStorage.getItem(cfg.ls)||'[]');if(!Array.isArray(stored))stored=[];}catch(_){stored=[];}
  window.__log=stored;
  S=freshState();SID='S'+Date.now().toString(36).toUpperCase();
  document.addEventListener('click',onClick);
  document.addEventListener('input',onInput);
  document.addEventListener('change',onInput);
  document.addEventListener('keydown',onKey);
  window.addEventListener('hashchange',function(){render();});
  window.addEventListener('pagehide',function(){
    if(cur)log('tiempo_pantalla',{ms:Date.now()-enteredAt},code(cur));
    if(S.task.t0&&!S.task.done)log('abandono',{motivo:'salida_pagina',ms:Date.now()-S.task.t0,pantallas:S.task.screens});
  });
  if(!cfg.routes[location.hash.slice(1)])history.replaceState(null,'',location.pathname+location.search+'#'+startRoute());
  render();
}

var api={run:run,go:go,rerender:rerender,log:log,vErr:vErr,complete:complete,busy:busy,maybeFail:maybeFail,showError:showError,fingerprint:fingerprint,toast:toast,sms:sms,hideSms:hideSms,
  openSheet:openSheet,closeSheet:closeSheet,sheetHead:sheetHead,setTxt:setTxt,setErr:setErr,html:html,copy:copy,notesBox:notesBox,download:download,appbar:appbar,dhead:dhead,row:row,mark:mark,
  money:money,pad:pad,fdate:fdate,ftime:ftime,pct:pct,esc:esc,norm:norm,rnd:rnd,plural:plural,I:I,$:$,hideOverlay:hideOverlay,ov:ov,
  get S(){return S;},get tok(){return tok;},get cur(){return cur;}};
return api;
})();
