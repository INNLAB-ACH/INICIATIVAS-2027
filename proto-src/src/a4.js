/* A4 · Seguridad del pago — autenticación actual vs reutilizable + Zona Segura (celular) */
var esc=K.esc,money=K.money,I=K.I;
var PSE='<span class="pse" aria-hidden="true">PSE</span>';
var MER={aurora:{n:'Tienda Aurora',ref:'Pedido AUR-5521 · 3 artículos',amt:235000,ic:'A'},condor:{n:'Aerolínea Cóndor',ref:'Vuelo 482 Cali–Bogotá · 1 adulto',amt:689000,ic:'C'}};
var BANK='Banco Andino';
var DEV=[['d1','Este celular','Android · último uso hoy'],['d2','Computador de casa','Windows · último uso hace 12 días']];
var timer=null;

function fresh(){return {m:'aurora',bio:false,otp:null,otpTries:0,resend:0,t0:0,zT0:0,firstRule:false,
  rules:{monto:{on:false,max:1000000},disp:{on:false,trusted:{d1:true,d2:true}},hora:{on:false,ini:6,fin:22}},z6:null,txn:null};}
function hh(n){return (n<10?'0':'')+n+':00';}
function bar(back,title,cls,mark){
  var menu='<button class="iconbtn" data-act="menu" aria-label="Menú"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>';
  return K.appbar({back:back,title:title,cls:cls,mark:mark||PSE,right:menu});
}
function activeCount(){var R=K.S.rules,n=0;if(R.monto.on)n++;if(R.disp.on)n++;if(R.hora.on)n++;return n;}
function stopTimer(){if(timer){clearInterval(timer);timer=null;}}
function mer(){return MER[K.S.m];}

/* ---------- Pago ---------- */
function co(){
  var S=K.S,m=mer(),B=S.p.v==='B';
  return {bar:bar(null,'Pago en '+m.n,'',K.mark(m.ic)),body:
    '<h1>Resumen de tu compra</h1><div class="card"><strong>'+m.n+'</strong><p class="muted small" style="margin:2px 0 0">'+m.ref+'</p></div><div class="card total"><span class="muted">Total a pagar</span><span class="amount">'+money(m.amt)+'</span></div>'+
    '<div class="pm">'+PSE+'<div class="grow"><strong>Pagar con PSE</strong><div class="small muted">'+(B&&S.bio?'Pago rápido con tu huella o rostro':'Débito desde tu cuenta bancaria')+'</div></div></div>',
    foot:'<button class="btn btn-primary" data-act="pagar">'+(B&&S.bio?'Pagar con un toque':'Pagar con PSE')+'</button>'};
}
function bank(){
  var S=K.S;
  return {bar:K.appbar({back:'co',title:BANK,cls:'bank',mark:'<span class="bmark" aria-hidden="true">B</span>'}),body:
    '<h1>Ingresa a tu banco</h1><p class="muted">Pago de '+money(mer().amt)+' a '+mer().n+'.</p><label for="u">Usuario</label><input type="text" id="u" autocomplete="off" data-inp="clr"><p class="err" id="e-u" role="alert"></p><label for="c">Clave</label><input type="password" id="c" autocomplete="off" data-inp="clr"><p class="hint">Escribe cualquier clave. Es una simulación.</p><p class="err" id="e-c" role="alert"></p>',
    foot:'<button class="btn btn-bank" data-act="login">Ingresar</button>'};
}
function otp(){
  var S=K.S;
  return {bar:K.appbar({back:'bank',title:BANK,cls:'bank',mark:'<span class="bmark" aria-hidden="true">B</span>'}),body:
    '<h1>Código de verificación</h1><p class="muted">Enviamos un código de 6 dígitos por SMS al celular •••• 4821.</p><label for="otp">Código</label><input type="text" id="otp" class="otp" inputmode="numeric" maxlength="6" autocomplete="one-time-code" data-inp="otp"><p class="err" id="e-otp" role="alert"></p>'+
    '<p class="small muted" id="otp-t" aria-live="polite"></p><button class="link" id="resend" data-act="reenviar" disabled>Reenviar código</button>',
    foot:'<button class="btn btn-bank" data-act="confotp">Confirmar</button>',
    after:function(){startOtp();}};
}
function startOtp(){
  var S=K.S;stopTimer();S.otp=String(Math.floor(100000+Math.random()*900000));K.sms(K.esc(BANK)+': tu código de verificación es <strong class="code">'+S.otp+'</strong>. No lo compartas con nadie.');
  var left=60;
  function tick(){var t=document.getElementById('otp-t'),b=document.getElementById('resend');if(!t||K.cur!=='otp'){stopTimer();return;}
    if(left>0){t.textContent='Puedes pedir un código nuevo en 0:'+(left<10?'0':'')+left;if(b)b.disabled=true;left--;}else{t.textContent='¿No te llegó el código?';if(b)b.disabled=false;stopTimer();}}
  tick();timer=setInterval(tick,1000);
}
function act(){
  return {bar:K.appbar({back:null,title:BANK,cls:'bank',mark:'<span class="bmark" aria-hidden="true">B</span>'}),body:
    '<div class="center"><div class="fp-ring" style="margin:6px 0 10px">'+I.fp+'</div><h1>Activa el pago con tu huella o rostro</h1><p class="muted">Para tus próximos pagos PSE, sin usuario, clave ni códigos por SMS.</p></div>'+
    '<div class="notice">La verificación se hace en tu celular. Puedes desactivarla cuando quieras desde Seguridad.</div><button class="link" data-act="queSeGuarda">¿Qué se guarda y dónde?</button>',
    foot:'<button class="btn btn-bank" data-act="activar">Activar con huella o rostro</button><button class="btn btn-secondary" data-act="ahoranot">Ahora no</button>'};
}
function ok(){
  var S=K.S,B=S.p.v==='B',first=B&&S.bio&&S.justEnabled;
  var other=S.m==='aurora'?'condor':'aurora';
  return {bar:bar(null,'Pago aprobado'),body:
    '<div class="center">'+I.ok+'<h1>Pago exitoso</h1><p class="muted">'+money(mer().amt)+' a '+mer().n+'</p></div><div class="card">'+K.row('Número de transacción',S.txn)+K.row('Banco',BANK)+K.row('Fecha','12/10/2026 · 10:32 a. m.')+K.row('Verificación',B&&S.bio?'Huella o rostro':'Usuario, clave y código SMS')+'</div>'+
    (first?'<div class="notice"><strong>Listo.</strong> La próxima vez pagarás con un solo toque.</div>':''),
    foot:(S.m==='aurora'?'<button class="btn btn-primary" data-act="irPago" data-id="condor">Pagar ahora en Aerolínea Cóndor</button>':'<button class="btn btn-primary" data-act="irPago" data-id="aurora">Volver a Tienda Aurora</button>')+'<button class="btn btn-secondary" data-act="nav" data-to="z1">Ir a Seguridad</button>'};
}
/* ---------- Zona Segura ---------- */
function zhead(back,title){return bar(back,title,'',K.mark('Z'));}
function z1(){
  var S=K.S,R=S.rules,n=activeCount();if(!S.zT0)S.zT0=Date.now();
  function rule(id,t,d,to,on,sug){return '<div class="card"><div style="display:flex;gap:12px;align-items:center"><div class="grow"><strong>'+t+'</strong><div class="small muted">'+d+'</div></div><span class="badge '+(on?'ok':'gray')+'">'+(on?'Activa':'Inactiva')+'</span></div><button class="btn btn-secondary sm" style="margin-top:10px" data-act="nav" data-to="'+to+'">'+(on?'Cambiar':'Configurar')+'</button></div>';}
  return {bar:zhead('co','Seguridad'),body:
    '<h1>Zona Segura</h1><div class="card" style="background:'+(n?'var(--ok-bg)':'var(--warn-bg)')+';border:0"><strong>Protección: '+n+' de 3 reglas activas</strong><p class="small" style="margin:4px 0 0">'+(n===3?'Tu cuenta PSE tiene todas las reglas sugeridas.':'Activa reglas para decidir quién y cuándo puede pagar con tu PSE.')+'</p></div>'+
    '<h2>Reglas sugeridas</h2>'+rule('monto','Monto máximo por pago','Sugerido: '+money(1000000)+(R.monto.on?' · Actual: '+money(R.monto.max):''),'z2',R.monto.on)+rule('disp','Dispositivos de confianza','Solo pagos desde dispositivos que tú elijas','z3',R.disp.on)+rule('hora','Horario permitido','Sugerido: 06:00 a 22:00'+(R.hora.on?' · Actual: '+hh(R.hora.ini)+' a '+hh(R.hora.fin):''),'z4',R.hora.on),
    foot:'<button class="btn btn-primary" data-act="nav" data-to="z5">Ver resumen de reglas</button>'};
}
function z2(){
  var S=K.S,r=S.rules.monto;
  return {bar:zhead('z1','Monto máximo'),body:
    '<h1>Monto máximo por pago</h1><p class="muted">Ningún pago con tu PSE podrá superar este valor sin tu verificación extra.</p><div class="card center"><div class="amount" id="mv">'+money(r.max)+'</div></div>'+
    '<label for="sl">Ajusta el tope</label><input type="range" id="sl" min="100000" max="5000000" step="50000" value="'+r.max+'" data-inp="monto"><div class="small muted" style="display:flex;justify-content:space-between"><span>$100.000</span><span>$5.000.000</span></div>'+
    '<label for="mt">O escribe el valor</label><input type="text" id="mt" inputmode="numeric" value="'+String(r.max).replace(/\B(?=(\d{3})+(?!\d))/g,'.')+'" data-inp="montoTxt"><p class="err" id="e-mt" role="alert"></p><button class="link" data-act="sugMonto">Usar el valor sugerido ('+money(1000000)+')</button>',
    foot:'<button class="btn btn-primary" data-act="saveMonto">Activar esta regla</button>'+(r.on?'<button class="btn btn-secondary" data-act="offRule" data-id="monto">Desactivar</button>':'')};
}
function z3(){
  var S=K.S,r=S.rules.disp,list=DEV.filter(function(d){return r.trusted[d[0]];});
  return {bar:zhead('z1','Dispositivos'),body:
    '<h1>Dispositivos de confianza</h1><p class="muted">Los pagos desde otros dispositivos pedirán verificación extra.</p><div class="card" style="padding:4px 16px"><ul class="list">'+DEV.map(function(d){return '<li><div class="grow"><strong>'+d[1]+'</strong><div class="small muted">'+d[2]+'</div></div>'+(r.trusted[d[0]]?'<button class="btn btn-secondary sm" data-act="quitarDisp" data-id="'+d[0]+'">Quitar</button>':'<span class="badge gray">Quitado</span>')+'</li>';}).join('')+'</ul></div>'+
    (list.length===0?'<p class="err" role="alert">Sin dispositivos de confianza, todos los pagos pedirán verificación extra.</p>':''),
    foot:'<button class="btn btn-primary" data-act="saveDisp">Activar esta regla</button>'+(r.on?'<button class="btn btn-secondary" data-act="offRule" data-id="disp">Desactivar</button>':'')};
}
function z4(){
  var S=K.S,r=S.rules.hora;function opts(sel){var h='';for(var i=0;i<24;i++)h+='<option value="'+i+'"'+(i===sel?' selected':'')+'>'+hh(i)+'</option>';return h;}
  return {bar:zhead('z1','Horario'),body:
    '<h1>Horario permitido</h1><p class="muted">Solo podrás pagar con PSE dentro de este horario. Fuera de él se pedirá verificación extra.</p><label for="hi">Desde</label><select id="hi" data-inp="hora" data-k="ini">'+opts(r.ini)+'</select><label for="hf">Hasta</label><select id="hf" data-inp="hora" data-k="fin">'+opts(r.fin)+'</select><p class="err" id="e-h" role="alert"></p>',
    foot:'<button class="btn btn-primary" data-act="saveHora">Activar esta regla</button>'+(r.on?'<button class="btn btn-secondary" data-act="offRule" data-id="hora">Desactivar</button>':'')};
}
function z5(){
  var R=K.S.rules,n=activeCount();
  function li(on,t){return '<li><span class="badge '+(on?'ok':'gray')+'">'+(on?'Activa':'Inactiva')+'</span><span class="grow">'+t+'</span></li>';}
  return {bar:zhead('z1','Resumen'),body:
    '<h1>Tus reglas activas</h1><p class="muted">'+n+' de 3 activas.</p><div class="card" style="padding:4px 16px"><ul class="list">'+li(R.monto.on,'Monto máximo: '+(R.monto.on?money(R.monto.max):'—'))+li(R.disp.on,'Dispositivos de confianza: '+(R.disp.on?DEV.filter(function(d){return R.disp.trusted[d[0]];}).length+' de '+DEV.length:'—'))+li(R.hora.on,'Horario: '+(R.hora.on?hh(R.hora.ini)+' a '+hh(R.hora.fin):'—'))+'</ul></div>'+
    '<div class="notice">Prueba tus reglas: simula un pago de <strong>'+money(1800000)+'</strong> a las <strong>11:10 p. m.</strong> desde este celular.</div>',
    foot:'<button class="btn btn-primary" data-act="probar">Simular el pago de $1.800.000</button>'};
}
function evalRules(){
  var R=K.S.rules,why=[];
  if(R.monto.on&&1800000>R.monto.max)why.push(['Monto máximo por pago','Superó tu tope de '+money(R.monto.max)+'.']);
  if(R.hora.on&&!(23>=R.hora.ini&&23<R.hora.fin))why.push(['Horario permitido','Son las 11:10 p. m. y tu horario es de '+hh(R.hora.ini)+' a '+hh(R.hora.fin)+'.']);
  if(R.disp.on&&!R.disp.trusted.d1)why.push(['Dispositivos de confianza','Este celular ya no está en tu lista de dispositivos de confianza.']);
  return why;
}
function z6(){
  var S=K.S,why=evalRules(),res=S.z6;
  if(res==='aut')return {bar:zhead('z5','Pago'),body:'<div class="center">'+I.ok+'<h1>Pago autorizado por esta vez</h1><p class="muted">Verificaste que eras tú. Tus reglas siguen activas.</p></div>',foot:'<button class="btn btn-primary" data-act="nav" data-to="z5">Volver al resumen</button>'};
  if(res==='can')return {bar:zhead('z5','Pago'),body:'<div class="center">'+I.alert+'<h1>Pago cancelado</h1><p class="muted">No se descontó nada de tu cuenta.</p></div>',foot:'<button class="btn btn-primary" data-act="nav" data-to="z5">Volver al resumen</button>'};
  if(!why.length)return {bar:zhead('z5','Pago'),body:'<div class="center">'+I.ok+'<h1>Pago realizado</h1><p class="muted">'+money(1800000)+' a las 11:10 p. m. Ninguna regla lo detuvo.</p></div><div class="notice warn">Con tus reglas actuales este pago pasa. Si quieres protegerte de pagos grandes o de madrugada, activa una regla en Zona Segura.</div>',foot:'<button class="btn btn-primary" data-act="nav" data-to="z1">Configurar reglas</button>'};
  return {bar:zhead('z5','Pago bloqueado'),body:
    '<div class="center">'+I.alert+'<h1>Bloqueamos este pago</h1><p class="muted">'+money(1800000)+' · 11:10 p. m. · desde este celular</p></div>'+
    '<div class="card"><strong>Qué regla lo bloqueó</strong><ul style="margin:6px 0 0;padding-left:18px">'+why.map(function(w){return '<li><strong>'+w[0]+'.</strong> '+w[1]+'</li>';}).join('')+'</ul></div>',
    foot:'<button class="btn btn-primary" data-act="zAut">Autorizar por esta vez con verificación extra</button><button class="btn btn-secondary" data-act="zCan">Cancelar el pago</button>'};
}

function finish(){
  var S=K.S;S.txn=K.rnd(10);
  if(S.t0){K.log('autenticacion_tiempo',{ms:Date.now()-S.t0,variante:S.p.v,otp_incorrectos:S.otpTries,reenvios:S.resend,comercio:S.m});S.t0=0;}
  K.complete({comercio:S.m});K.go('ok');
}
K.run({
  id:'a4',title:'A4 · Seguridad del pago',layout:'phone',
  params:[{k:'v',label:'Variante de autenticación',def:'A',opts:[['A','A · Actual: redirección, usuario y clave, código SMS'],['B','B · Reutilizable: huella o rostro (passkey)']]}],
  state:fresh,start:function(){return 'co';},
  codes:{co:'P1-COMERCIO',bank:'P2-BANCO',otp:'P3-OTP',act:'P2B-ACTIVAR',ok:'P4-EXITO',z1:'Z1',z2:'Z2',z3:'Z3',z4:'Z4',z5:'Z5',z6:'Z6'},
  labels:{co:'Pago en el comercio',bank:'Ingreso al banco (A y primer pago B)',otp:'Código SMS (A)',act:'Activar biometría (B)',ok:'Pago exitoso',z1:'Z1 Estado de protección',z2:'Z2 Monto máximo',z3:'Z3 Dispositivos',z4:'Z4 Horario',z5:'Z5 Resumen',z6:'Z6 Pago bloqueado'},
  groups:[['Pago',['co','bank','otp','act','ok']],['Zona Segura',['z1','z2','z3','z4','z5','z6']]],
  routes:{co:co,bank:bank,otp:otp,act:act,ok:ok,z1:z1,z2:z2,z3:z3,z4:z4,z5:z5,z6:z6},
  acts:{
    menu:function(){K.openSheet(K.sheetHead('Menú')+'<div class="jumps" style="grid-template-columns:1fr"><button data-act="irPago" data-id="aurora">Pagar en Tienda Aurora ($235.000)</button><button data-act="irPago" data-id="condor">Pagar en Aerolínea Cóndor ($689.000)</button><button data-act="irSeg">Seguridad · Zona Segura</button></div>');},
    irPago:function(el){K.closeSheet();var S=K.S;S.m=el.dataset.id;S.t0=0;S.justEnabled=false;K.go('co');},
    irSeg:function(){K.closeSheet();K.go('z1');},
    pagar:function(){
      var S=K.S;S.t0=Date.now();S.otpTries=0;S.resend=0;K.log('pago_iniciado',{comercio:S.m,variante:S.p.v});
      if(S.p.v==='B'&&S.bio){K.fingerprint().then(function(o){if(o)finish();});return;}
      K.go('bank');
    },
    login:function(){
      var u=document.getElementById('u'),c=document.getElementById('c'),bad=[];
      if(!u.value.trim()){K.setErr('e-u','Escribe tu usuario.','u');bad.push('usuario');}
      if(!c.value.trim()){K.setErr('e-c','Escribe cualquier clave para continuar.','c');bad.push('clave');}
      if(bad.length){K.vErr(bad);return;}
      if(K.maybeFail('login')){K.showError('El banco no respondió','Fue un problema temporal. Intenta de nuevo.',function(){});return;}
      K.busy('Verificando tus datos…',1200).then(function(o){if(!o)return;K.go(K.S.p.v==='B'?'act':'otp');});
    },
    reenviar:function(){var S=K.S;S.resend++;K.log('otp_reenvio',{n:S.resend});startOtp();},
    confotp:function(){
      var S=K.S,i=document.getElementById('otp'),v=i.value.trim();
      if(!/^\d{6}$/.test(v)){K.setErr('e-otp','Escribe los 6 dígitos del código.','otp');K.vErr(['otp_formato']);return;}
      if(v!==S.otp){S.otpTries++;K.setErr('e-otp','El código no es correcto. Revisa el SMS e intenta de nuevo.','otp');K.log('otp_incorrecto',{n:S.otpTries});return;}
      stopTimer();K.hideSms();K.busy('Confirmando tu pago…',1200).then(function(o){if(o)finish();});
    },
    queSeGuarda:function(){K.openSheet(K.sheetHead('¿Qué se guarda y dónde?')+'<ul><li><strong>Qué:</strong> una llave de acceso (passkey) que identifica a este celular. Tu huella o rostro nunca salen del dispositivo.</li><li><strong>Dónde:</strong> en la seguridad de tu celular. Ni el comercio ni ACH ven tu huella.</li><li><strong>Cómo desactivarlo:</strong> desde Seguridad en tu perfil PSE, cuando quieras.</li></ul><button class="btn btn-primary" data-act="closeSheet">Entendido</button>');},
    activar:function(){var S=K.S;K.fingerprint().then(function(o){if(!o)return;S.bio=true;S.justEnabled=true;K.log('biometria_aceptada',{aceptada:true});finish();});},
    ahoranot:function(){K.log('biometria_aceptada',{aceptada:false});K.S.justEnabled=false;finish();},
    sugMonto:function(){K.S.rules.monto.max=1000000;K.rerender();},
    saveMonto:function(){var S=K.S;if(S.rules.monto.max<100000){K.setErr('e-mt','El tope mínimo es $100.000.','mt');K.vErr(['monto']);return;}S.rules.monto.on=true;ruleSaved('monto',{tope:S.rules.monto.max});K.toast('Regla activada');K.go('z1');},
    saveDisp:function(){var S=K.S;S.rules.disp.on=true;ruleSaved('dispositivos',{confiables:Object.keys(S.rules.disp.trusted).filter(function(k){return S.rules.disp.trusted[k];}).length});K.toast('Regla activada');K.go('z1');},
    saveHora:function(){var S=K.S,r=S.rules.hora;if(r.fin<=r.ini){K.setErr('e-h','La hora final debe ser posterior a la inicial.');K.vErr(['horario']);return;}r.on=true;ruleSaved('horario',{desde:r.ini,hasta:r.fin});K.toast('Regla activada');K.go('z1');},
    offRule:function(el){K.S.rules[el.dataset.id].on=false;K.log('regla_desactivada',{regla:el.dataset.id});K.toast('Regla desactivada');K.go('z1');},
    quitarDisp:function(el){K.S.rules.disp.trusted[el.dataset.id]=false;K.log('dispositivo_quitado',{id:el.dataset.id});K.rerender();},
    probar:function(){var S=K.S;S.z6=null;S.t0z=Date.now();K.log('simula_pago_bloqueable',{reglas_activas:activeCount(),bloqueos:evalRules().map(function(w){return w[0];}).join('|')});K.go('z6');},
    zAut:function(){K.fingerprint().then(function(o){if(!o)return;K.S.z6='aut';K.log('decision_bloqueo',{decision:'autorizar_una_vez',ms:Date.now()-K.S.t0z});K.complete({decision:'autorizar'});K.rerender();});},
    zCan:function(){K.S.z6='can';K.log('decision_bloqueo',{decision:'cancelar',ms:Date.now()-K.S.t0z});K.complete({decision:'cancelar'});K.rerender();}
  },
  inps:{
    clr:function(el){var m={u:'e-u',c:'e-c'}[el.id];if(m&&el.value)K.setErr(m,'',el.id);},
    otp:function(el){el.value=el.value.replace(/\D/g,'');if(el.value)K.setErr('e-otp','','otp');},
    monto:function(el){var S=K.S;S.rules.monto.max=+el.value;K.setTxt('mv',money(S.rules.monto.max));var t=document.getElementById('mt');if(t)t.value=String(S.rules.monto.max).replace(/\B(?=(\d{3})+(?!\d))/g,'.');},
    montoTxt:function(el){var v=+String(el.value).replace(/\D/g,'')||0;K.S.rules.monto.max=v;K.setTxt('mv',money(v));K.setErr('e-mt','','mt');var s=document.getElementById('sl');if(s&&v>=100000&&v<=5000000)s.value=v;},
    hora:function(el,ty){if(ty!=='change')return;K.S.rules.hora[el.dataset.k]=+el.value;K.setErr('e-h','');}
  }
});
function ruleSaved(r,det){
  var S=K.S;K.log('regla_activada',Object.assign({regla:r},det));
  if(!S.firstRule){S.firstRule=true;K.log('primera_regla_configurada',{regla:r,ms:Date.now()-(S.zT0||Date.now())});}
}
