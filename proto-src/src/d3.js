/* D3 · Portal de desarrolladores Hub · Receptor de datos — escritorio */
var esc=K.esc,money=K.money,I=K.I;
var SECS=[['r1','Inicio'],['r2','Guía rápida'],['r3','Referencia de API'],['r4','Consentimiento del cliente'],['r5','Consola sandbox'],['r6','Precios'],['r7','Estado y soporte']];
var EPS={
  cuentas:{m:'GET',path:'/v1/cuentas',desc:'Lista las cuentas del cliente que autorizó el consentimiento.',scope:'cuentas.lectura',
    params:[['consentimiento_id','header','Sí','Identificador del consentimiento vigente.'],['entidad','query','No','Filtra por entidad proveedora (código ACH).']],
    res:{consentimiento_id:'cns_5b19c0',cuentas:[{id:'acc_8f21',tipo:'AHORROS',entidad:'Banco Andino',numero:'••••4821',moneda:'COP',estado:'ACTIVA'},{id:'acc_3d77',tipo:'CORRIENTE',entidad:'Cooperativa Valle Unido',numero:'••••7730',moneda:'COP',estado:'ACTIVA'}]}},
  saldos:{m:'GET',path:'/v1/cuentas/{id}/saldos',desc:'Devuelve el saldo disponible y total de una cuenta.',scope:'saldos.lectura',
    params:[['id','ruta','Sí','Identificador de la cuenta (ej. acc_8f21).'],['consentimiento_id','header','Sí','Consentimiento vigente.']],
    res:{cuenta_id:'acc_8f21',moneda:'COP',disponible:2310450,total:2350450,fecha_corte:'2026-10-11T09:00:00-05:00'}},
  movs:{m:'GET',path:'/v1/cuentas/{id}/movimientos',desc:'Lista movimientos de una cuenta en un rango de fechas, con paginación por cursor.',scope:'movimientos.lectura',
    params:[['id','ruta','Sí','Identificador de la cuenta.'],['desde','query','Sí','Fecha inicial (AAAA-MM-DD). Máximo 12 meses atrás.'],['hasta','query','Sí','Fecha final (AAAA-MM-DD).'],['limite','query','No','Registros por página (por defecto 50, máximo 200).'],['cursor','query','No','Cursor de la página siguiente.']],
    res:{cuenta_id:'acc_8f21',movimientos:[{id:'mov_0912',fecha:'2026-10-09',descripcion:'COMPRA TIENDA AURORA',tipo:'DEBITO',valor:-235000,saldo_posterior:2310450},{id:'mov_0911',fecha:'2026-10-07',descripcion:'ABONO NÓMINA',tipo:'CREDITO',valor:3450000,saldo_posterior:2545450},{id:'mov_0908',fecha:'2026-10-03',descripcion:'PAGO SERVICIOS ENERGÍA VALLE',tipo:'DEBITO',valor:-148200,saldo_posterior:-904550},{id:'mov_0902',fecha:'2026-10-01',descripcion:'TRANSFERENCIA RECIBIDA',tipo:'CREDITO',valor:120000,saldo_posterior:-756350}],siguiente_cursor:'eyJwIjoyfQ'}}
};
var ERRS=[['400','parametros_invalidos','Falta un parámetro obligatorio o tiene un formato incorrecto.'],['401','token_invalido','El token no existe o está vencido.'],['403','consentimiento_no_vigente','El cliente revocó o venció el consentimiento, o el alcance no cubre este dato.'],['404','cuenta_no_encontrada','La cuenta no pertenece al consentimiento.'],['429','limite_excedido','Superaste el límite de consultas; reintenta tras el tiempo indicado en Retry-After.'],['503','entidad_no_disponible','La entidad proveedora no respondió; reintenta con espera exponencial.']];
var TIERS=[[100000,38,'Hasta 100.000'],[1000000,30,'De 100.001 a 1.000.000'],[5000000,22,'De 1.000.001 a 5.000.000'],[Infinity,15,'Más de 5.000.000']];
var STEPS=[
 {t:'Regístrate como tercero',d:'Crea la cuenta de tu organización y sube los documentos de validación. ACH verifica una sola vez y habilita el acceso para todas las entidades.',code:'POST /v1/terceros\n{ "razon_social": "Fintech Brújula SAS", "nit": "901.555.210-3",\n  "proposito": "Gestión de finanzas personales", "contacto": "dev@brujula.example" }'},
 {t:'Obtén tus credenciales de sandbox',d:'Con el registro aprobado recibes un client_id y un client_secret de pruebas. Los datos del sandbox son ficticios.',code:null,gen:true},
 {t:'Implementa el flujo de consentimiento',d:'Redirige al cliente a la pantalla de consentimiento del Hub, indica qué datos necesitas y por cuánto tiempo. Cuando acepta, recibes un consentimiento_id en tu URL de retorno.',code:'GET https://sandbox.hub-ach.example/consentimiento\n  ?client_id=sbx_brujula_01\n  &alcance=cuentas.lectura saldos.lectura movimientos.lectura\n  &vigencia_meses=6\n  &redirect_uri=https://brujula.example/retorno\n\n→ 302 https://brujula.example/retorno?consentimiento_id=cns_5b19c0'},
 {t:'Haz tu primera consulta',d:'Con el consentimiento y tu token, consulta los datos autorizados.',code:'curl -H "Authorization: Bearer sbx_demo_token" \\\n     -H "X-Consentimiento: cns_5b19c0" \\\n     https://sandbox.hub-ach.example/v1/cuentas'}
];
var STAT=[['API de consulta','Operativo',99.99],['Servicio de consentimientos','Operativo',99.98],['Sandbox','Operativo',99.9],['Conector entidades vigiladas','Degradado',99.2]];

function fresh(){return {step:0,done:{},creds:false,sprints:'',ep:'cuentas',sim:'ok',out:null,cons:{s:0,scopes:{cuentas:true,saldos:true,movs:true},dur:6},vol:1000000,hoy:'',alt:''};}
function json(o){return JSON.stringify(o,null,2);}
function fmtN(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');}

function layout(cur,content){
  var side='<aside class="dside" aria-label="Documentación"><p class="eyebrow">Documentación</p>'+SECS.map(function(s){return '<button data-act="nav" data-to="'+s[0]+'"'+(s[0]===cur?' aria-current="page"':'')+'>'+s[1]+'</button>';}).join('')+'<div style="margin-top:18px">'+K.notesBox('Notas del entrevistador')+'</div></aside>';
  return {layout:'desk',wrap:'none',bar:K.dhead({title:'Hub Open Finance · Desarrolladores',mark:K.mark('H'),right:'<span class="badge plum">Sandbox</span><span class="ilus">Portal simulado</span>'}),
    body:'<div class="dev">'+side+'<main class="dmain">'+content+'</main></div>'};
}
function codeBlock(t){return '<pre class="code-block" tabindex="0">'+esc(t)+'</pre>';}

/* R1 */
function r1(){
  return layout('r1','<p class="eyebrow">Para terceros receptores de datos</p><h1>Una conexión para consumir datos financieros con consentimiento</h1>'+
  '<p class="lead">Fintechs, pasarelas y entidades receptoras acceden a los datos de las entidades vigiladas a través del Hub de ACH, sin integrarse una por una.</p>'+
  '<div class="grid3"><div class="card"><h3>Una conexión</h3><p class="muted">Un registro, un contrato técnico y una sola integración para todas las entidades conectadas.</p></div>'+
  '<div class="card"><h3>Cobertura de entidades vigiladas</h3><p class="muted">Bancos, cooperativas y compañías de financiamiento conectadas al Hub.</p></div>'+
  '<div class="card"><h3>Respaldo regulatorio</h3><p class="muted">Diseñado para cumplir lo que defina la Superintendencia Financiera bajo el Decreto 0368 de 2026.</p></div></div>'+
  '<div class="grid3" style="margin-top:16px"><div class="kpi"><div class="n">18 <span class="ilus">ilustrativo</span></div><div class="l">Entidades conectadas (cifra de ejemplo)</div></div>'+
  '<div class="kpi"><div class="n">3</div><div class="l">Endpoints en esta versión de ejemplo</div></div><div class="kpi"><div class="n">&lt; 1 s</div><div class="l">Respuesta típica en sandbox (simulada)</div></div></div>'+
  '<div class="toolbar" style="margin-top:20px"><button class="btn btn-primary" data-act="nav" data-to="r2">Ir a la guía rápida</button><button class="btn btn-secondary" data-act="nav" data-to="r5">Probar la consola</button></div>');
}
/* R2 */
function r2(){
  var S=K.S;
  var h='<h1>Guía rápida en 4 pasos</h1><p class="lead">Marca cada paso a medida que lo revisas.</p><div class="stepper" aria-hidden="true">'+STEPS.map(function(s,i){return '<i class="'+(S.done[i]?'on':'')+'"></i>';}).join('')+'</div>';
  STEPS.forEach(function(s,i){
    h+='<div class="card"><div class="toolbar" style="margin:0 0 6px"><span class="badge '+(S.done[i]?'ok':'')+'">'+(S.done[i]?I.check+' Hecho':'Paso '+(i+1))+'</span><h3 style="margin:0">'+s.t+'</h3></div><p class="muted">'+s.d+'</p>';
    if(s.code)h+=codeBlock(s.code);
    if(s.gen){h+=S.creds?codeBlock('client_id:     sbx_brujula_01\nclient_secret: sbx_sec_7f3a••••••••••••c91e   (ficticio)\ntoken_demo:    sbx_demo_token   (vigente 24 h)'):'<button class="btn btn-secondary sm" data-act="creds">Generar credenciales de sandbox</button>';}
    h+='<div class="toolbar" style="margin:12px 0 0"><button class="btn '+(S.done[i]?'btn-secondary':'btn-primary')+' sm" data-act="stepdone" data-id="'+i+'">'+(S.done[i]?'Desmarcar':'Marcar como revisado')+'</button></div></div>';
  });
  h+='<div class="survey"><h3>Para su equipo</h3><label for="sprints">¿Cuántos sprints estimaría para construir estos 4 pasos en su producto?</label><input type="number" id="sprints" min="0" step="0.5" value="'+esc(S.sprints)+'" data-inp="sprints" style="max-width:180px"><p class="hint">Dato para el entrevistador; no se envía a ningún lado.</p></div>';
  return layout('r2',h);
}
/* R3 */
function r3(){
  var S=K.S,e=EPS[S.ep];
  var tabs='<div class="tabs" role="tablist">'+Object.keys(EPS).map(function(k){return '<button role="tab" data-act="ep" data-id="'+k+'" aria-selected="'+(S.ep===k)+'" class="mono">'+EPS[k].m+' '+EPS[k].path+'</button>';}).join('')+'</div>';
  return layout('r3','<h1>Referencia de la API</h1><p class="lead">Ejemplos con datos ficticios. Los nombres de campos son ilustrativos; el estándar final lo define la Superintendencia Financiera.</p>'+tabs+
  '<div class="card"><p><span class="badge ok">'+e.m+'</span> <span class="mono">'+e.path+'</span></p><p class="muted">'+e.desc+' Alcance requerido: <span class="mono">'+e.scope+'</span>.</p>'+
  '<h3>Parámetros</h3><div class="tscroll"><table class="dtable"><thead><tr><th>Nombre</th><th>Ubicación</th><th>Obligatorio</th><th>Descripción</th></tr></thead><tbody>'+e.params.map(function(p){return '<tr><td class="mono">'+p[0]+'</td><td>'+p[1]+'</td><td>'+p[2]+'</td><td>'+p[3]+'</td></tr>';}).join('')+'</tbody></table></div></div>'+
  '<div class="card"><h3 style="margin-top:0">Ejemplo de respuesta · 200</h3>'+codeBlock(json(e.res))+'</div>'+
  '<div class="card"><h3 style="margin-top:0">Códigos de error</h3><table class="dtable" style="width:100%"><thead><tr><th>HTTP</th><th>Código</th><th>Qué significa</th></tr></thead><tbody>'+ERRS.map(function(x){return '<tr><td><span class="badge '+(x[0]==='503'||x[0]==='429'?'warn':'err')+'">'+x[0]+'</span></td><td class="mono">'+x[1]+'</td><td>'+x[2]+'</td></tr>';}).join('')+'</tbody></table></div>');
}
/* R4 */
function miniPhone(){
  var C=K.S.cons,s=C.s,b='';
  var exp=new Date(2026,9,11);exp.setMonth(exp.getMonth()+C.dur);var ed=K.fdate(exp);
  var header='<div class="mini-h"><strong>Banco Andino</strong><span class="small">Banca móvil</span></div>';
  if(s===0){
    b=header+'<div class="mini-b"><h2 style="font-size:17px">Fintech Brújula quiere ver tus datos</h2><p class="small muted">Para qué: calcular tu presupuesto mensual y mostrarte en qué gastas.</p>'+
    '<fieldset><legend class="small">Qué datos compartirás</legend>'+
    '<label class="switch small"><input type="checkbox" checked disabled> Tus cuentas (nombre y tipo)</label>'+
    '<label class="switch small"><input type="checkbox" data-inp="scope" data-id="saldos"'+(C.scopes.saldos?' checked':'')+'> Saldos</label>'+
    '<label class="switch small"><input type="checkbox" data-inp="scope" data-id="movs"'+(C.scopes.movs?' checked':'')+'> Movimientos de los últimos 12 meses</label></fieldset>'+
    '<label class="small" for="dur" style="margin-top:8px">Por cuánto tiempo</label><select id="dur" data-inp="dur" style="min-height:44px"><option value="3"'+(C.dur===3?' selected':'')+'>3 meses</option><option value="6"'+(C.dur===6?' selected':'')+'>6 meses</option><option value="12"'+(C.dur===12?' selected':'')+'>12 meses</option></select>'+
    '<p class="small muted">Vence el '+ed+'. Puedes revocar cuando quieras desde «Mis consentimientos».</p>'+
    '<button class="btn btn-primary sm block" data-act="consent" data-id="aceptar">Aceptar y compartir</button><button class="btn btn-secondary sm block" style="margin-top:8px" data-act="consent" data-id="rechazar">No compartir</button></div>';
  }else if(s===1){
    b=header+'<div class="mini-b center"><div>'+I.ok+'</div><h2 style="font-size:17px">Listo, compartiste tus datos</h2><p class="small muted">Fintech Brújula verá '+['cuentas'].concat(C.scopes.saldos?['saldos']:[]).concat(C.scopes.movs?['movimientos']:[]).join(', ')+' hasta el '+ed+'.</p><button class="btn btn-secondary sm block" data-act="consent" data-id="ver">Ver Mis consentimientos</button></div>';
  }else if(s===2){
    b=header+'<div class="mini-b center"><div>'+I.alert+'</div><h2 style="font-size:17px">No compartimos tus datos</h2><p class="small muted">Puedes cambiar de opinión cuando quieras.</p><button class="btn btn-secondary sm block" data-act="consent" data-id="reiniciar">Volver a empezar</button></div>';
  }else if(s===3){
    b=header+'<div class="mini-b"><h2 style="font-size:17px">Mis consentimientos</h2><div class="card"><strong>Fintech Brújula</strong><p class="small muted">Cuentas, '+(C.scopes.saldos?'saldos, ':'')+(C.scopes.movs?'movimientos · ':'')+'vence el '+ed+'</p><button class="btn btn-danger sm block" data-act="consent" data-id="revocar">Revocar consentimiento</button></div><button class="link" data-act="consent" data-id="reiniciar">Volver a empezar</button></div>';
  }else{
    b=header+'<div class="mini-b center"><div>'+I.ok+'</div><h2 style="font-size:17px">Consentimiento revocado</h2><p class="small muted">Fintech Brújula ya no puede consultar tus datos. Recibirá el aviso en segundos.</p><button class="btn btn-secondary sm block" data-act="consent" data-id="reiniciar">Volver a empezar</button></div>';
  }
  return '<div class="mini" id="mini">'+b+'</div>';
}
function r4(){
  return layout('r4','<h1>Consentimiento visto por el cliente final</h1><p class="lead">Así vería su usuario la solicitud dentro de la app de su entidad. Interactúe con la pantalla: acepte, cambie el alcance, rechace o revoque.</p>'+
  '<div class="side"><div style="display:flex;justify-content:center">'+miniPhone()+'</div><div><div class="card"><h3 style="margin-top:0">Lo que el cliente debe entender</h3><ul><li><strong>Qué datos:</strong> solo los que elige compartir.</li><li><strong>Para qué:</strong> el propósito declarado por el tercero.</li><li><strong>Por cuánto tiempo:</strong> vigencia visible y ajustable.</li><li><strong>Cómo revocar:</strong> siempre disponible en la app de su entidad.</li></ul></div>'+
  '<div class="survey"><h3>Para el entrevistado</h3><p>¿Su usuario aceptaría esta pantalla? ¿Qué le generaría dudas o fricción?</p><textarea data-inp="cfric" aria-label="Fricciones del consentimiento" placeholder="Escriba las fricciones que identifica">'+esc(K.S.alt)+'</textarea></div></div></div>');
}
/* R5 */
function reqText(){
  var S=K.S,e=EPS[S.ep],p=e.path.replace('{id}','acc_8f21');
  if(S.ep==='movs')p+='?desde=2026-09-01&hasta=2026-10-11&limite=50';
  return e.m+' https://sandbox.hub-ach.example'+p+'\nAuthorization: Bearer '+(S.sim==='401'?'sbx_token_vencido':'sbx_demo_token')+'\nX-Consentimiento: cns_5b19c0';
}
function r5(){
  var S=K.S,o=S.out,out='';
  if(o&&o.loading)out='<div class="center"><div class="spinner" aria-hidden="true"></div><p role="status">Consultando…</p></div>';
  else if(o)out='<p><span class="badge '+(o.status===200?'ok':'err')+'">'+o.status+' '+o.txt+'</span> <span class="badge gray">'+o.ms+' ms</span></p>'+codeBlock(json(o.body));
  else out='<p class="muted">Presiona «Probar» para ver la respuesta.</p>';
  return layout('r5','<h1>Consola sandbox</h1><p class="lead">Respuestas de ejemplo con datos ficticios y latencia simulada.</p>'+
  '<div class="grid2"><div class="card"><div class="field"><label for="epsel">Endpoint</label><select id="epsel" data-inp="epsel">'+Object.keys(EPS).map(function(k){return '<option value="'+k+'"'+(S.ep===k?' selected':'')+'>'+EPS[k].m+' '+EPS[k].path+'</option>';}).join('')+'</select></div>'+
  '<div class="field"><label for="simsel">Resultado simulado</label><select id="simsel" data-inp="simsel"><option value="ok"'+(S.sim==='ok'?' selected':'')+'>Éxito (200)</option><option value="401"'+(S.sim==='401'?' selected':'')+'>Token vencido (401)</option><option value="429"'+(S.sim==='429'?' selected':'')+'>Límite excedido (429)</option></select></div>'+
  '<h3>Solicitud</h3>'+codeBlock(reqText())+'<div class="toolbar" style="margin-top:12px"><button class="btn btn-primary" data-act="probar">Probar</button></div></div>'+
  '<div class="card"><h3 style="margin-top:0">Respuesta</h3><div id="out" aria-live="polite">'+out+'</div></div></div>');
}
/* R6 */
function priceCalc(v){
  var cost=0,prev=0,rows=[];
  TIERS.forEach(function(t){var n=Math.max(0,Math.min(v,t[0])-prev);if(n>0){rows.push([t[2],n,t[1],n*t[1]]);cost+=n*t[1];}prev=t[0];});
  return {cost:cost,rows:rows};
}
function priceOut(){
  var S=K.S,c=priceCalc(S.vol),hoy=+String(S.hoy).replace(/\D/g,'');
  var h='<table class="dtable" style="width:100%"><thead><tr><th>Tramo aplicado</th><th class="num">Consultas</th><th class="num">Precio</th><th class="num">Subtotal</th></tr></thead><tbody>'+c.rows.map(function(r){return '<tr><td>'+r[0]+'</td><td class="num">'+fmtN(r[1])+'</td><td class="num">'+money(r[2])+'</td><td class="num">'+money(r[3])+'</td></tr>';}).join('')+'<tr><td colspan="3"><strong>Costo mensual estimado</strong></td><td class="num"><strong>'+money(c.cost)+'</strong></td></tr></tbody></table>';
  if(hoy>0){var d=(c.cost-hoy)/hoy;h+='<p class="banner '+(d<=0?'ok':'warn')+'" style="margin-top:12px">Frente a lo que paga hoy ('+money(hoy)+' al mes), esta estimación es <strong>'+K.pct(Math.abs(d),0)+(d<=0?' menor':' mayor')+'</strong>.</p>';}
  return h;
}
function r6(){
  var S=K.S;
  return layout('r6','<h1>Precios tentativos por consulta <span class="ilus">ilustrativo</span></h1><p class="lead">Precio por consulta con tramos por volumen. Los valores son de ejemplo y no constituyen una oferta.</p>'+
  '<div class="card" style="padding:6px 16px"><table class="dtable" style="width:100%"><thead><tr><th>Consultas al mes</th><th class="num">Precio por consulta</th></tr></thead><tbody>'+TIERS.map(function(t){return '<tr><td>'+t[2]+'</td><td class="num">'+money(t[1])+'</td></tr>';}).join('')+'</tbody></table></div>'+
  '<div class="card"><h3 style="margin-top:0">Calculadora</h3><div class="grid2"><div><label for="vol">Consultas al mes: <strong id="vol-l">'+fmtN(S.vol)+'</strong></label><input type="range" id="vol" min="50000" max="8000000" step="50000" value="'+S.vol+'" data-inp="vol">'+
  '<label for="hoy">¿Cuánto paga hoy al mes por consultar estos datos? (opcional)</label><input type="text" inputmode="numeric" id="hoy" value="'+esc(S.hoy)+'" data-inp="hoy" placeholder="Ej. 40000000"><p class="hint">Un valor aproximado sirve.</p></div><div id="price-out">'+priceOut()+'</div></div></div>');
}
/* R7 */
function r7(){
  var bars=function(v){var h='';for(var i=0;i<30;i++){var bad=v<99.5&&(i===9||i===22);h+='<i style="flex:1;height:22px;border-radius:2px;background:'+(bad?'var(--amber)':'var(--ok)')+'"></i>';}return '<div style="display:flex;gap:2px;margin-top:6px" aria-hidden="true">'+h+'</div>';};
  return layout('r7','<h1>Estado del servicio y soporte</h1><div class="grid2"><div class="card"><h3 style="margin-top:0">Estado actual <span class="ilus">ejemplo</span></h3>'+STAT.map(function(s){return '<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between"><strong>'+s[0]+'</strong><span class="badge '+(s[1]==='Operativo'?'ok':'warn')+'">'+s[1]+'</span></div>'+bars(s[2])+'<p class="small muted" style="margin:4px 0 0">Disponibilidad últimos 30 días: '+String(s[2]).replace('.',',')+' %</p></div>';}).join('')+'</div>'+
  '<div><div class="card"><h3 style="margin-top:0">Soporte</h3><table class="dtable" style="width:100%"><tbody><tr><td>Canal técnico</td><td>soporte-hub@ach.example</td></tr><tr><td>Incidentes críticos</td><td>Respuesta en 30 minutos, 24/7</td></tr><tr><td>Consultas generales</td><td>Respuesta en 1 día hábil</td></tr><tr><td>Acompañamiento de integración</td><td>Sesiones semanales durante la implementación</td></tr></tbody></table></div>'+
  '<div class="card"><h3 style="margin-top:0">Incidentes recientes</h3><ul class="list"><li><span class="badge warn">Degradado</span><span class="grow">Latencia alta en el conector de una entidad · 03/10/2026</span></li><li><span class="badge ok">Resuelto</span><span class="grow">Mantenimiento programado del sandbox · 21/09/2026</span></li></ul></div></div></div>');
}

K.run({
  id:'d3',title:'D3 · Portal de desarrolladores Hub · Receptor',layout:'desk',
  params:[],state:fresh,start:function(){return 'r1';},
  labels:{r1:'R1 Inicio',r2:'R2 Guía rápida',r3:'R3 Referencia de API',r4:'R4 Consentimiento',r5:'R5 Consola',r6:'R6 Precios',r7:'R7 Estado y soporte'},
  groups:[['Secciones',['r1','r2','r3','r4','r5','r6','r7']]],
  routes:{r1:r1,r2:r2,r3:r3,r4:r4,r5:r5,r6:r6,r7:r7},
  acts:{
    stepdone:function(el){var S=K.S,i=el.dataset.id;S.done[i]=!S.done[i];K.log('paso_guia',{paso:+i+1,hecho:!!S.done[i]});K.rerender();},
    creds:function(){K.S.creds=true;K.rerender();},
    ep:function(el){K.S.ep=el.dataset.id;K.log('endpoint_visto',{endpoint:el.dataset.id});K.rerender();},
    consent:function(el){
      var C=K.S.cons,a=el.dataset.id;
      if(a==='aceptar')C.s=1;else if(a==='rechazar')C.s=2;else if(a==='ver')C.s=3;else if(a==='revocar')C.s=4;else C.s=0;
      K.log('consentimiento_'+a,{saldos:C.scopes.saldos,movimientos:C.scopes.movs,meses:C.dur});K.rerender();
    },
    probar:function(){
      var S=K.S;S.out={loading:true};K.rerender();
      var ms=280+Math.floor(Math.random()*420),ep=S.ep,sim=S.sim;
      K.log('consola_probar',{endpoint:ep,resultado:sim});
      setTimeout(function(){
        if(K.cur!=='r5')return;
        if(sim==='401')S.out={status:401,txt:'Unauthorized',ms:ms,body:{error:'token_invalido',mensaje:'El token no existe o está vencido.'}};
        else if(sim==='429')S.out={status:429,txt:'Too Many Requests',ms:ms,body:{error:'limite_excedido',mensaje:'Reintente en 12 segundos.',retry_after:12}};
        else S.out={status:200,txt:'OK',ms:ms,body:EPS[ep].res};
        K.rerender();
      },ms);
    }
  },
  inps:{
    sprints:function(el,ty){K.S.sprints=el.value;if(ty==='change')K.log('estimacion_sprints',{sprints:el.value});},
    scope:function(el){K.S.cons.scopes[el.dataset.id]=el.checked;K.log('alcance_cambiado',{dato:el.dataset.id,activo:el.checked});K.rerender();},
    dur:function(el,ty){if(ty!=='change')return;K.S.cons.dur=+el.value;K.log('vigencia_cambiada',{meses:+el.value});K.rerender();},
    cfric:function(el,ty){K.S.alt=el.value;if(ty==='change')K.log('friccion_consentimiento',{texto:el.value.slice(0,200)});},
    epsel:function(el,ty){if(ty!=='change')return;K.S.ep=el.value;K.S.out=null;K.rerender();},
    simsel:function(el,ty){if(ty!=='change')return;K.S.sim=el.value;K.rerender();},
    vol:function(el,ty){var S=K.S;S.vol=+el.value;K.setTxt('vol-l',fmtN(S.vol));K.html('price-out',priceOut());if(ty==='change')K.log('calculadora_volumen',{volumen:S.vol,costo:priceCalc(S.vol).cost});},
    hoy:function(el,ty){var S=K.S;S.hoy=el.value;K.html('price-out',priceOut());if(ty==='change')K.log('dato_precio_actual',{valor:el.value});}
  }
});
