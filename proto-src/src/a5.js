/* A5 · Recarga nacional de movilidad — persona (celular) y empresa (escritorio) */
var esc=K.esc,money=K.money,I=K.I;
var PSE='<span class="pse" aria-hidden="true">PSE</span>';
var CITIES={Bogotá:true,Medellín:true,Cali:false,Barranquilla:true,Cartagena:false,Bucaramanga:false};
var CIUDADES=Object.keys(CITIES);
var VIAJE=3550;
var NOMBRES=['Camila','Andrés','Laura','Juan','Valentina','Santiago','Daniela','Mateo','Sara','Felipe','Paula','Esteban','Natalia','Julián','Mariana','Sebastián','Carolina','David','Luisa','Nicolás'];
var APELLIDOS=['Gómez','Rivas','Muñoz','Rentería','Ortiz','Cárdenas','Londoño','Pineda','Valencia','Salazar','Herrera','Mejía','Arango','Quintero','Bedoya','Restrepo','Zapata','Giraldo','Cano','Ospina'];

function today(){return '12/10/2026';}
function card(id,city,alias,num,saldo,mine,last){return {id:id,city:city,alias:alias,num:num,saldo:saldo,pend:0,mine:mine,last:last||'Sin recargas',auto:{on:false,paused:false,um:5000,monto:20000,tope:100000,gastado:0,cuenta:'Cuenta de ahorros •••• 4821 · Banco Andino'}};}
function fresh(){
  var e=genEmp();
  return {cards:[card('c1','Bogotá','Tarjeta Bogotá','•••• 4417',3200,true,'28/09/2026 · $10.000'),card('c2','Medellín','Tarjeta Medellín','•••• 9082',41500,true,'05/10/2026 · $50.000'),card('c3','Cali','Tarjeta Cali','•••• 2263',0,true,'Sin recargas')],
    sel:'c1',amt:20000,otro:'',hist:[['05/10/2026','Tarjeta Medellín','Manual',50000,'Disponible'],['28/09/2026','Tarjeta Bogotá','Manual',10000,'Disponible'],['14/09/2026','Tarjeta Bogotá','Manual',10000,'Disponible']],
    add:{mode:'mine'},nextId:4,last:null,
    emp:{rows:e,loaded:false,t0:0,fixed:{},excl:false,aprobado:false,paid:false,filtro:'',tFix0:0}};
}
function genEmp(){
  var rows=[],cities=[['Bogotá',38],['Medellín',20],['Cali',17],['Barranquilla',7],['Cartagena',3]],i=0,seed=11;
  function r(){seed=(seed*9301+49297)%233280;return seed/233280;}
  cities.forEach(function(c){for(var k=0;k<c[1];k++){i++;rows.push({n:i,nombre:NOMBRES[Math.floor(r()*20)]+' '+APELLIDOS[Math.floor(r()*20)]+' '+APELLIDOS[Math.floor(r()*20)],doc:String(1010000000+Math.floor(r()*89000000)),city:c[0],tarjeta:String(10000000+Math.floor(r()*89999999)),monto:i%4===0?180000:120000,err:''});}});
  rows[16].tarjeta=String(rows[16].tarjeta).slice(0,7);rows[16].err='tarjeta';
  rows[52].monto=1800000;rows[52].err='monto';
  return rows;
}
function errOf(r){
  if(!/^\d{8}$/.test(String(r.tarjeta)))return 'El número de tarjeta debe tener 8 dígitos';
  if(r.monto>300000||r.monto<10000)return 'El monto debe estar entre $10.000 y $300.000';
  return '';
}
function C(id){return K.S.cards.filter(function(c){return c.id===id;})[0];}
function cname(c){return c.alias;}
function bar(back,title){return K.appbar({back:back,title:title||'Recarga de movilidad',mark:PSE});}
function ptab(){return '';}
function cardHtml(c,extra){
  var disp=CITIES[c.city];
  return '<div class="card"><div style="display:flex;gap:10px;align-items:flex-start"><div class="grow"><strong>'+esc(c.alias)+'</strong>'+(c.mine?'':' <span class="badge plum">De otra persona</span>')+'<div class="small muted">'+c.city+' · '+c.num+'</div></div><div style="text-align:right"><div class="amount" style="font-size:22px">'+money(c.saldo)+'</div>'+(c.pend?'<span class="badge warn">+'+money(c.pend)+' por validar</span>':'')+'</div></div>'+
   '<p class="small muted" style="margin:6px 0">Última recarga: '+c.last+(c.auto.on?' · <span class="badge ok">Recarga automática '+(c.auto.paused?'en pausa':'activa')+'</span>':'')+'</p>'+(extra||'')+'</div>';
}

/* ---------- Persona ---------- */
function r1(){
  var S=K.S,B=S.p.v==='B';
  var now='<button class="btn btn-primary" data-act="irRecarga">Recargar ahora</button>';
  var auto='<button class="btn btn-secondary" data-act="nav" data-to="r4">Recarga automática</button>';
  var autoBanner='<div class="card" style="border:2px solid var(--blue);background:#F5F9FC"><strong>Nunca te quedes sin saldo</strong><p class="small muted" style="margin:4px 0 10px">Recarga automática cuando tu saldo baje del valor que elijas.</p><button class="btn btn-primary" data-act="nav" data-to="r4">Activar recarga automática</button></div>';
  var list=S.cards.map(function(c){return cardHtml(c,'<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-secondary sm" data-act="recargarTarjeta" data-id="'+c.id+'">Recargar</button><button class="link" data-act="viaje" data-id="'+c.id+'" style="font-size:13px;color:var(--muted)" title="Solo para la prueba">Simular un viaje de '+money(VIAJE)+'</button></div>');}).join('');
  return {bar:bar(null),body:'<h1>Mis tarjetas de movilidad</h1>'+(B?autoBanner:'')+list+'<div style="display:grid;gap:8px;margin-top:4px"><button class="btn btn-secondary" data-act="agregar" data-id="mine">Agregar tarjeta</button><button class="btn btn-secondary" data-act="agregar" data-id="other">Recargar la tarjeta de otra persona</button><button class="link" data-act="nav" data-to="r6">Ver historial de recargas</button></div>',foot:B?now:now+auto};
}
function add(){
  var S=K.S,o=S.add.mode==='other';
  return {bar:bar('r1',o?'Tarjeta de otra persona':'Agregar tarjeta'),body:'<h1>'+(o?'Recargar la tarjeta de otra persona':'Agregar tarjeta')+'</h1>'+(o?'<p class="muted">Guárdala con un nombre para reconocerla, por ejemplo «Mateo» o «Mamá».</p><label for="alias">Nombre de la persona</label><input type="text" id="alias" autocomplete="off" data-inp="clr"><p class="err" id="e-alias" role="alert"></p>':'')+
    '<label for="city">Ciudad de la tarjeta</label><select id="city">'+CIUDADES.map(function(c){return '<option>'+c+'</option>';}).join('')+'</select><label for="num">Número de la tarjeta (8 dígitos)</label><input type="text" id="num" inputmode="numeric" maxlength="8" autocomplete="off" data-inp="clr"><p class="hint">Está impreso en la tarjeta. Es un dato de prueba: escribe cualquier número de 8 dígitos.</p><p class="err" id="e-num" role="alert"></p>',foot:'<button class="btn btn-primary" data-act="guardarTarjeta">Agregar tarjeta</button>'};
}
function r2(){
  var S=K.S,c=C(S.sel),amts=[10000,20000,50000];
  var isOther=S.amt==='otro';
  var val=isOther?(+String(S.otro).replace(/\D/g,'')||0):S.amt;
  return {bar:bar('r1','Recargar'),body:'<h1>Recargar</h1><fieldset><legend>Tarjeta</legend>'+S.cards.map(function(x){return '<label class="opt"><input type="radio" name="tj" value="'+x.id+'" data-inp="tj"'+(x.id===S.sel?' checked':'')+'><span>'+esc(x.alias)+'<span class="d">'+x.city+' · '+x.num+' · saldo '+money(x.saldo)+'</span></span></label>';}).join('')+'</fieldset>'+
    '<fieldset><legend>¿Cuánto quieres recargar?</legend><div class="segs" style="flex-wrap:wrap">'+amts.map(function(a){return '<label class="seg" style="min-width:30%"><input type="radio" name="amt" value="'+a+'" data-inp="amt"'+(S.amt===a?' checked':'')+'><span>'+money(a)+'</span></label>';}).join('')+'<label class="seg" style="min-width:30%"><input type="radio" name="amt" value="otro" data-inp="amt"'+(isOther?' checked':'')+'><span>Otro</span></label></div></fieldset>'+
    (isOther?'<label for="otro">Valor (entre $2.000 y $200.000)</label><input type="text" id="otro" inputmode="numeric" value="'+esc(S.otro)+'" data-inp="otro"><p class="err" id="e-otro" role="alert"></p>':'')+
    '<div class="card" style="margin-top:14px">'+K.row('Tarjeta',esc(c.alias))+K.row('Valor','<strong id="rv">'+money(val)+'</strong>')+K.row('Medio de pago',PSE.replace('class="pse"','class="pse" style="width:26px;height:26px;font-size:9px;vertical-align:middle"')+' PSE · Banco Andino')+'</div>',foot:'<button class="btn btn-primary" data-act="pagarRecarga">Pagar con PSE</button>'};
}
function r3(){
  var S=K.S,L=S.last;if(!L)return r1();
  var imm=CITIES[L.city];
  return {bar:bar(null,'Recarga realizada'),body:'<div class="center">'+I.ok+'<h1>Pago aprobado</h1><p class="muted">'+money(L.valor)+' para '+esc(L.alias)+'</p></div>'+
    '<div class="notice'+(imm?'':' warn')+'" role="status"><strong>'+(imm?'Disponible de inmediato':'Valida tu recarga en un punto de la estación la primera vez')+'</strong><p style="margin:4px 0 0" class="small">'+(imm?'Tu saldo en la tarjeta de '+L.city+' ya se actualizó.':'En '+L.city+' el saldo se activa cuando acercas la tarjeta a un punto de recarga de la estación. Después las recargas siguientes quedan disponibles solas.')+'</p></div>'+
    '<div class="card">'+K.row('Referencia',L.ref)+K.row('Fecha','12/10/2026 · 10:40 a. m.')+K.row('Saldo actual',money(C(L.id).saldo))+(C(L.id).pend?K.row('Por validar',money(C(L.id).pend)):'')+'</div>'+(C(L.id).auto.on?'':'<div class="card" style="border:2px solid var(--blue)"><strong>¿No quieres volver a quedarte sin saldo?</strong><button class="btn btn-secondary sm" style="margin-top:8px" data-act="nav" data-to="r4">Activar recarga automática</button></div>'),foot:'<button class="btn btn-primary" data-act="nav" data-to="r1">Volver a mis tarjetas</button>'};
}
function r4(){
  var S=K.S,c=C(S.sel),a=c.auto;
  function chips(name,vals,cur){return '<div class="segs" style="flex-wrap:wrap">'+vals.map(function(v){return '<label class="seg" style="min-width:30%"><input type="radio" name="'+name+'" value="'+v+'" data-inp="'+name+'"'+(cur===v?' checked':'')+'><span>'+money(v)+'</span></label>';}).join('')+'</div>';}
  var st=a.on?'<div class="card" style="background:'+(a.paused?'var(--warn-bg)':'var(--ok-bg)')+';border:0"><strong>Recarga automática '+(a.paused?'en pausa':'activa')+'</strong><p class="small" style="margin:4px 0 8px">Cuando el saldo baje de '+money(a.um)+', recargamos '+money(a.monto)+'. Este mes: '+money(a.gastado)+' de '+money(a.tope)+'.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-secondary sm" data-act="pausarAuto">'+(a.paused?'Reanudar':'Pausar')+'</button><button class="btn btn-danger sm" data-act="cancelarAuto">Cancelar recarga automática</button></div></div>':'';
  return {bar:bar('r1','Recarga automática'),body:'<h1>Recarga automática</h1>'+st+'<fieldset><legend>Tarjeta</legend><select id="tjsel" data-inp="tjsel">'+S.cards.map(function(x){return '<option value="'+x.id+'"'+(x.id===S.sel?' selected':'')+'>'+esc(x.alias)+' · '+x.city+'</option>';}).join('')+'</select></fieldset>'+
    '<h3>Cuando mi saldo baje de</h3>'+chips('um',[2000,5000,10000],a.um)+'<h3>Recargar</h3>'+chips('monto',[10000,20000,50000],a.monto)+'<h3>Tope mensual</h3>'+chips('tope',[60000,100000,200000],a.tope)+'<label for="cta">Cuenta de origen</label><select id="cta" data-inp="cuenta"><option'+(a.cuenta.indexOf('4821')>=0?' selected':'')+'>Cuenta de ahorros •••• 4821 · Banco Andino</option><option'+(a.cuenta.indexOf('7730')>=0?' selected':'')+'>Cuenta corriente •••• 7730 · Banco del Pacífico Digital</option></select>',
    foot:'<button class="btn btn-primary" data-act="activarAuto">'+(a.on?'Guardar cambios':'Activar recarga automática')+'</button>'};
}
function r6(){
  var S=K.S;
  return {bar:bar('r1','Historial'),body:'<h1>Historial de recargas</h1><div class="card" style="padding:4px 16px"><ul class="list">'+S.hist.map(function(h){return '<li><div class="grow"><strong>'+esc(h[1])+'</strong><div class="small muted">'+h[0]+' · '+h[2]+'</div></div><div style="text-align:right"><strong>'+money(h[3])+'</strong><div class="small muted">'+h[4]+'</div></div></li>';}).join('')+'</ul></div>'};
}
/* ---------- Empresa ---------- */
function ebar(cur){
  return K.dhead({title:'Portal de Usuarios PSE · Empresas',mark:PSE,nav:[{label:'1 · Cargar archivo',to:'e1',cur:cur==='e1'},{label:'2 · Resumen y pago',to:'e2',cur:cur==='e2'},{label:'3 · Estado por empleado',to:'e3',cur:cur==='e3'}],right:'<span class="small muted">Textiles Andinos SAS</span>'});
}
function epage(cur,body){return {layout:'desk',bar:ebar(cur),wrap:'wrapd',body:body};}
function eStats(){var E=K.S.emp,rows=E.rows,bad=rows.filter(function(r){return errOf(r);}),ok=rows.length-bad.length;return {n:rows.length,bad:bad,ok:ok,total:rows.reduce(function(a,r){return a+r.monto;},0),totalOk:rows.filter(function(r){return !errOf(r);}).reduce(function(a,r){return a+r.monto;},0)};}
function e1(){
  var S=K.S,E=S.emp;if(!E.t0)E.t0=Date.now();
  if(!E.loaded)return epage('e1','<p class="eyebrow">Programa de auxilio de transporte</p><h1>Recarga el auxilio de transporte de tus empleados</h1><p class="lead">Sube un archivo con el empleado, su tarjeta de movilidad y el monto mensual. Te mostramos los errores antes de pagar.</p><div class="card center" style="border:2px dashed var(--blue-l)"><p class="muted">Formato: documento, nombre, ciudad, número de tarjeta, monto (CSV)</p><div class="toolbar" style="justify-content:center"><button class="btn btn-primary" data-act="cargar">Cargar archivo de ejemplo (auxilio_transporte_oct.csv)</button></div><p class="small muted">Archivo simulado con 85 empleados</p></div>');
  var st=eStats(),rowsHtml=E.rows.filter(function(r){return E.filtro!=='err'||errOf(r);}).map(function(r){
    var e=errOf(r);
    return '<tr'+(e?' style="background:#FCE9E7"':'')+'><td>'+r.n+'</td><td>'+esc(r.nombre)+'</td><td>'+r.city+'</td><td>'+(e&&/tarjeta/.test(e)?'<input type="text" inputmode="numeric" value="'+esc(r.tarjeta)+'" data-inp="fix" data-i="'+(r.n-1)+'" data-k="tarjeta" aria-label="Número de tarjeta de '+esc(r.nombre)+'" style="min-height:40px;max-width:140px;border-color:var(--err)">':'•••• '+String(r.tarjeta).slice(-4))+'</td><td class="num">'+(e&&/monto/.test(e)?'<input type="text" inputmode="numeric" value="'+String(r.monto)+'" data-inp="fix" data-i="'+(r.n-1)+'" data-k="monto" aria-label="Monto de '+esc(r.nombre)+'" style="min-height:40px;max-width:140px;border-color:var(--err);text-align:right">':money(r.monto))+'</td><td>'+(e?'<span class="badge err">'+e+'</span>':'<span class="badge ok">'+I.check+' Correcto</span>')+'</td></tr>';}).join('');
  return epage('e1','<p class="eyebrow">Programa de auxilio de transporte</p><h1>Archivo cargado: '+st.n+' registros</h1>'+
    '<div class="grid4"><div class="kpi"><div class="n">'+st.ok+'</div><div class="l">Correctos</div></div><div class="kpi"><div class="n" style="color:'+(st.bad.length?'var(--err)':'var(--ok)')+'">'+st.bad.length+'</div><div class="l">Con error</div></div><div class="kpi"><div class="n">'+money(st.total)+'</div><div class="l">Total del archivo</div></div><div class="kpi"><div class="n">'+(E.rows.length?CIUDADES.filter(function(c){return E.rows.some(function(r){return r.city===c;});}).length:0)+'</div><div class="l">Ciudades</div></div></div>'+
    (st.bad.length?'<div class="banner err" style="margin-top:16px"><strong>Corrige '+st.bad.length+' registro'+(st.bad.length>1?'s':'')+' con error.</strong> Escribe el dato correcto en la fila marcada o excluye esos registros del pago.</div>':'<div class="banner ok" style="margin-top:16px"><strong>Todo correcto.</strong> Puedes continuar al resumen.</div>')+
    '<div class="toolbar"><label class="switch"><input type="checkbox" data-inp="soloErr"'+(E.filtro==='err'?' checked':'')+'> Ver solo los registros con error</label></div>'+
    '<div class="tscroll" style="max-height:480px;overflow:auto"><table class="dtable"><thead><tr><th>#</th><th>Empleado</th><th>Ciudad</th><th>Tarjeta</th><th class="num">Monto mensual</th><th>Estado</th></tr></thead><tbody>'+rowsHtml+'</tbody></table></div>'+
    '<div class="toolbar" style="margin-top:14px"><button class="btn btn-primary" data-act="aResumen"'+(st.bad.length&&!E.excl?' disabled':'')+'>Continuar al resumen</button>'+(st.bad.length?'<button class="btn btn-secondary" data-act="excluir">Excluir los '+st.bad.length+' registros con error</button>':'')+'</div>');
}
function e2(){
  var S=K.S,E=S.emp;if(!E.loaded)return e1();
  var rows=E.rows.filter(function(r){return !errOf(r);}),by={};
  rows.forEach(function(r){by[r.city]=by[r.city]||{n:0,t:0};by[r.city].n++;by[r.city].t+=r.monto;});
  var tot=rows.reduce(function(a,r){return a+r.monto;},0),exc=E.rows.length-rows.length;
  if(E.paid)return epage('e2','<div class="center">'+I.ok+'<h1>Pago único realizado</h1><p class="muted">'+money(tot)+' · '+rows.length+' tarjetas</p></div><div class="toolbar" style="justify-content:center"><button class="btn btn-primary" data-act="nav" data-to="e3">Ver el estado por empleado</button></div>');
  return epage('e2','<h1>Resumen y aprobación</h1><div class="side"><div class="card"><h3 style="margin-top:0">Por ciudad</h3><table class="dtable" style="width:100%"><thead><tr><th>Ciudad</th><th class="num">Empleados</th><th class="num">Valor</th><th>Disponibilidad</th></tr></thead><tbody>'+Object.keys(by).map(function(c){return '<tr><td>'+c+'</td><td class="num">'+by[c].n+'</td><td class="num">'+money(by[c].t)+'</td><td>'+(CITIES[c]?'<span class="badge ok">Inmediata</span>':'<span class="badge warn">Validar en estación</span>')+'</td></tr>';}).join('')+'<tr><td><strong>Total</strong></td><td class="num"><strong>'+rows.length+'</strong></td><td class="num"><strong>'+money(tot)+'</strong></td><td></td></tr></tbody></table>'+(exc?'<p class="banner warn" style="margin-top:12px">'+exc+' registros con error quedaron fuera de este pago.</p>':'')+'</div>'+
    '<div class="card"><h3 style="margin-top:0">Aprobación y pago</h3>'+K.row('Total a pagar','<strong>'+money(tot)+'</strong>')+K.row('Medio','PSE · Cuenta corriente •••• 7730')+'<label class="switch" style="margin-top:10px"><input type="checkbox" data-inp="aprueba"'+(E.aprobado?' checked':'')+'> Apruebo esta recarga masiva</label><button class="btn btn-primary block" style="margin-top:8px" data-act="pagarEmp"'+(E.aprobado?'':' disabled')+'>Pagar '+money(tot)+' con PSE</button></div></div>');
}
function e3(){
  var S=K.S,E=S.emp;if(!E.paid)return e2();
  var rows=E.rows.map(function(r){var e=errOf(r);return {r:r,s:e?'No incluido':CITIES[r.city]?'Recargado':'Pendiente de validación'};});
  var c={};rows.forEach(function(x){c[x.s]=(c[x.s]||0)+1;});
  return epage('e3','<h1>Estado por empleado</h1><div class="grid3"><div class="kpi"><div class="n">'+(c['Recargado']||0)+'</div><div class="l">Recargados</div></div><div class="kpi"><div class="n">'+(c['Pendiente de validación']||0)+'</div><div class="l">Pendientes de validación en estación</div></div><div class="kpi"><div class="n">'+(c['No incluido']||0)+'</div><div class="l">No incluidos (con error)</div></div></div>'+
   '<div class="toolbar" style="margin-top:16px"><button class="btn btn-secondary sm" data-act="dlEstado">'+I.download+' Descargar estado (CSV)</button></div><div class="tscroll" style="max-height:480px;overflow:auto"><table class="dtable"><thead><tr><th>#</th><th>Empleado</th><th>Ciudad</th><th class="num">Monto</th><th>Estado</th></tr></thead><tbody>'+rows.map(function(x){return '<tr><td>'+x.r.n+'</td><td>'+esc(x.r.nombre)+'</td><td>'+x.r.city+'</td><td class="num">'+money(x.r.monto)+'</td><td><span class="badge '+(x.s==='Recargado'?'ok':x.s==='No incluido'?'err':'warn')+'">'+x.s+'</span></td></tr>';}).join('')+'</tbody></table></div>');
}

/* ---------- Lógica de recarga ---------- */
function applyRecarga(c,val,tipo,origen){
  var imm=CITIES[c.city];
  if(imm)c.saldo+=val;else c.pend+=val;
  c.last=today()+' · '+money(val);
  K.S.hist.unshift([today(),c.alias,tipo,val,imm?'Disponible':'Por validar']);
  return imm;
}
function ruleSaved(){}
function viaje(id){
  var S=K.S,c=C(id),a=c.auto;c.saldo=Math.max(0,c.saldo-VIAJE);K.log('viaje_simulado',{tarjeta:c.alias,saldo:c.saldo});
  if(a.on&&!a.paused&&c.saldo<a.um){
    if(a.gastado+a.monto<=a.tope){a.gastado+=a.monto;var imm=applyRecarga(c,a.monto,'Automática');K.log('recarga_automatica_disparada',{tarjeta:c.alias,umbral:a.um,monto:a.monto,gastado_mes:a.gastado});K.toast('Recarga automática de '+money(a.monto)+(imm?' realizada':' en espera de validación'));}
    else{K.log('recarga_automatica_tope',{tarjeta:c.alias});K.toast('Llegaste a tu tope mensual: no se recargó.');}
  }else K.toast('Viaje descontado: saldo '+money(c.saldo));
  K.rerender();
}

K.run({
  id:'a5',title:'A5 · Recarga nacional de movilidad',layout:'phone',
  params:[{k:'vista',label:'Vista',def:'persona',opts:[['persona','Persona · celular'],['empresa','Empresa · escritorio']]},{k:'v',label:'Variante (vista persona)',def:'A',opts:[['A','A · «Recargar ahora» primero'],['B','B · «Recarga automática» primero']]}],
  views:[{label:'Persona · celular',to:'r1',re:'^(r|add)'},{label:'Empresa · escritorio',to:'e1',re:'^e'}],
  state:fresh,start:function(p){return p.vista==='empresa'?'e1':'r1';},
  codes:{r1:'R1',add:'R5-AGREGAR',r2:'R2',r3:'R3',r4:'R4',r6:'R6',e1:'E1',e2:'E2',e3:'E3'},
  labels:{r1:'R1 Mis tarjetas',add:'Agregar tarjeta / R5 tarjeta de otra persona',r2:'R2 Recargar',r3:'R3 Confirmación y disponibilidad',r4:'R4 Recarga automática',r6:'R6 Historial',e1:'E1 Cargar archivo',e2:'E2 Resumen y pago',e3:'E3 Estado por empleado'},
  groups:function(p){return [['Persona',['r1','add','r2','r3','r4','r6']],['Empresa',['e1','e2','e3']]];},
  routes:{r1:r1,add:add,r2:r2,r3:r3,r4:r4,r6:r6,e1:e1,e2:e2,e3:e3},
  acts:{
    irRecarga:function(){K.go('r2');},
    recargarTarjeta:function(el){K.S.sel=el.dataset.id;K.go('r2');},
    viaje:function(el){viaje(el.dataset.id);},
    agregar:function(el){K.S.add.mode=el.dataset.id;K.go('add');},
    guardarTarjeta:function(){
      var S=K.S,o=S.add.mode==='other',al=document.getElementById('alias'),num=document.getElementById('num').value.trim(),city=document.getElementById('city').value,bad=[];
      if(o&&!al.value.trim()){K.setErr('e-alias','Escribe el nombre de la persona.','alias');bad.push('alias');}
      if(!/^\d{8}$/.test(num)){K.setErr('e-num','El número debe tener 8 dígitos.','num');bad.push('numero');}
      if(bad.length){K.vErr(bad);return;}
      var id='c'+S.nextId++;S.cards.push(card(id,city,o?al.value.trim():'Mi tarjeta '+city,'•••• '+num.slice(-4),0,!o));S.sel=id;
      K.log(o?'tarjeta_de_tercero_agregada':'tarjeta_agregada',{ciudad:city});K.go('r2');
    },
    pagarRecarga:function(){
      var S=K.S,c=C(S.sel),val=S.amt==='otro'?(+String(S.otro).replace(/\D/g,'')||0):S.amt;
      if(val<2000||val>200000){K.setErr('e-otro','Escribe un valor entre $2.000 y $200.000.','otro');K.vErr(['valor']);return;}
      if(K.maybeFail('recarga')){K.showError('No pudimos procesar el pago','Tu dinero no se movió. Intenta de nuevo.',function(){});return;}
      K.busy('Procesando tu pago con PSE…',1400).then(function(ok){if(!ok)return;var tipo=c.mine?'Manual':'A otra persona';var imm=applyRecarga(c,val,tipo);S.last={id:c.id,city:c.city,alias:c.alias,valor:val,ref:'MOV-'+K.rnd(8)};K.log('recarga_realizada',{ciudad:c.city,valor:val,tercero:!c.mine,disponible:imm});K.complete({tercero:!c.mine});K.go('r3');});
    },
    activarAuto:function(){var S=K.S,a=C(S.sel).auto;a.on=true;a.paused=false;K.log('recarga_auto_activada',{umbral:a.um,monto:a.monto,tope:a.tope});K.toast('Recarga automática activa');K.complete({auto:true});K.rerender();},
    pausarAuto:function(){var a=C(K.S.sel).auto;a.paused=!a.paused;K.log('recarga_auto_'+(a.paused?'pausada':'reanudada'));K.rerender();},
    cancelarAuto:function(){var a=C(K.S.sel).auto;a.on=false;a.paused=false;K.log('recarga_auto_cancelada');K.rerender();},
    cargar:function(){var E=K.S.emp;E.loaded=true;K.log('archivo_cargado',{ms:Date.now()-E.t0,registros:E.rows.length,errores:eStats().bad.length});E.tFix0=Date.now();K.rerender();},
    excluir:function(){var E=K.S.emp;E.excl=true;K.log('errores_excluidos',{n:eStats().bad.length});K.rerender();},
    aResumen:function(){K.go('e2');},
    pagarEmp:function(){var S=K.S,E=S.emp,st=eStats();K.busy('Procesando el pago único por PSE…',1600).then(function(ok){if(!ok)return;E.paid=true;K.log('pago_masivo',{tarjetas:st.ok,valor:st.totalOk,ms_total:Date.now()-E.t0});K.complete({empresa:true});K.go('e3');});},
    dlEstado:function(){var rows=K.S.emp.rows.map(function(r){var e=errOf(r);return [r.n,r.nombre,r.city,r.monto,e?'No incluido':CITIES[r.city]?'Recargado':'Pendiente de validación'].join(',');});K.download('estado_auxilio_transporte.csv','n,empleado,ciudad,monto,estado\n'+rows.join('\n'),'text/csv;charset=utf-8');}
  },
  inps:{
    clr:function(el){var m={alias:'e-alias',num:'e-num'}[el.id];if(el.id==='num')el.value=el.value.replace(/\D/g,'');if(m&&el.value)K.setErr(m,'',el.id);},
    tj:function(el){K.S.sel=el.value;K.log('tarjeta_elegida',{id:el.value});},
    tjsel:function(el,ty){if(ty!=='change')return;K.S.sel=el.value;K.rerender();},
    amt:function(el){K.S.amt=el.value==='otro'?'otro':+el.value;K.log('monto_elegido',{valor:el.value});K.rerender();},
    otro:function(el){K.S.otro=el.value;var v=+String(el.value).replace(/\D/g,'')||0;K.setTxt('rv',money(v));K.setErr('e-otro','','otro');},
    um:function(el){var a=C(K.S.sel).auto;a.um=+el.value;K.log('umbral_elegido',{valor:a.um});},
    monto:function(el){C(K.S.sel).auto.monto=+el.value;},
    tope:function(el){C(K.S.sel).auto.tope=+el.value;},
    cuenta:function(el,ty){if(ty==='change')C(K.S.sel).auto.cuenta=el.value;},
    fix:function(el,ty){if(ty!=='change')return;var E=K.S.emp,r=E.rows[+el.dataset.i],k=el.dataset.k,v=String(el.value).replace(/\D/g,'');var before=errOf(r);r[k]=k==='monto'?(+v||0):v;if(before&&!errOf(r)){K.log('error_corregido',{fila:r.n,campo:k});var st=eStats();if(!st.bad.length)K.log('errores_todos_corregidos',{ms:Date.now()-E.tFix0});}K.rerender();},
    soloErr:function(el,ty){if(ty!=='change')return;K.S.emp.filtro=el.checked?'err':'';K.rerender();},
    aprueba:function(el,ty){if(ty!=='change')return;K.S.emp.aprobado=el.checked;K.log('aprobacion',{aprobada:el.checked});K.rerender();}
  }
});
