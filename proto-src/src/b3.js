/* B3 · Demo TESO Marca Blanca + ERP — presentación navegable para entrevista (escritorio) */
var esc=K.esc,money=K.money,I=K.I;
var BR={
 andino:{n:'Banco Andino Empresas',corto:'Banco Andino',dom:'empresas.bancoandino.example',c:'#1E5E5A',d:'#164845',l:'#BFDCD8',ink:'#0F3B38',mark:'A',
   logo:'<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><rect width="34" height="34" rx="8" fill="#1E5E5A"/><path d="M6 25L14 10l5 8 3-4 6 11z" fill="#fff"/></svg>'},
 pac:{n:'Banco del Pacífico Digital Empresas',corto:'Banco del Pacífico Digital',dom:'empresas.pacificodigital.example',c:'#4B3F9E',d:'#372E78',l:'#CBC5EC',ink:'#241C57',mark:'P',
   logo:'<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><rect width="34" height="34" rx="17" fill="#4B3F9E"/><path d="M5 20c4-6 8-6 12 0s8 6 12 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>'}
};
var VISTAS=[['m1','Portal de tesorería'],['m2','Cambio de marca'],['m3','Integración con el ERP'],['m4','Pago masivo desde el ERP'],['m5','Conciliación automática'],['m6','Ficha comercial']];
var NODOS=[
 {k:'erp',n:'ERP del cliente',d:'Genera las órdenes de pago y recibe la conciliación.',v:['Órdenes de pago (proveedor, valor, fecha, referencia)','Maestro de proveedores y cuentas','Estados y conciliación de vuelta']},
 {k:'con',n:'Conector',d:'Traduce el formato del ERP y valida antes de enviar.',v:['Archivo plano o API (formato estándar)','Validaciones de cuentas, montos y duplicados','Registro de cada lote recibido']},
 {k:'teso',n:'TESO (con tu marca)',d:'Portal de tesorería de la empresa bajo la marca de la entidad.',v:['Aprobación dual y límites por usuario','Calendario de pagos y alertas','Saldos y recaudos consolidados']},
 {k:'pse',n:'PSE / ACH',d:'Compensación y liquidación de las instrucciones de pago.',v:['Instrucciones de débito y crédito','Estados: enviado, pagado, rechazado','Motivos de rechazo']},
 {k:'bco',n:'Bancos',d:'Entidades de origen y destino de los fondos.',v:['Abonos a proveedores','Extractos y movimientos','Devoluciones y rechazos']}
];
var PAGOS=[['Proveedores de insumos SAS',48200000,'12/10/2026','Conciliado'],['Transportes del Valle',12750000,'12/10/2026','Conciliado'],['Servicios Públicos Cali',3480000,'13/10/2026','Diferencia'],['Arrendamientos La Ceiba',21000000,'14/10/2026','Conciliado'],['Papelería Alfa',1180000,'14/10/2026','Pendiente']];
var DOC=function(i){return 'FV-26-'+(8100+i*7);};

function fresh(){return {react:{},node:'erp',pain:{},m4:{s:1,orig:'archivo',ap2:false,env:false,rech:[[3,'Cuenta destino inexistente'],[1,'Cuenta cerrada']]},m5:{env:false},tiempos:[[2,3],[3,5],[4,8],[2,3]],precio:{lic:850000,tx:450,imp:18000000},clientes:40,txm:600,modelo:'',rango:''};}
function B(){return BR[K.S.p.marca];}
function applyBrand(){var b=B(),s=document.documentElement.style;s.setProperty('--blue',b.c);s.setProperty('--blue-d',b.d);s.setProperty('--blue-l',b.l);s.setProperty('--bank',b.c);s.setProperty('--bank-d',b.d);}
function wrapRoute(id,fn){return function(){applyBrand();var cur=id;var body=fn();return {layout:'desk',wrap:'none',bar:K.dhead({title:B().logo+' <span style="margin-left:8px">'+B().n+'</span>',mark:'',nav:VISTAS.map(function(v){return {label:v[0].toUpperCase()+' · '+v[1],to:v[0],cur:v[0]===cur};}).slice(0,0).concat([]),right:'<span class="small muted">'+B().dom+'</span><label for="marca" class="small" style="margin:0 0 0 14px">Marca</label><select id="marca" data-inp="marca" style="width:auto;min-height:40px">'+Object.keys(BR).map(function(k){return '<option value="'+k+'"'+(K.S.p.marca===k?' selected':'')+'>'+BR[k].corto+'</option>';}).join('')+'</select>'}),
      body:'<div class="b3"><div class="b3-main"><nav class="tabs" aria-label="Vistas" style="margin-bottom:20px">'+VISTAS.map(function(v){return '<button data-act="nav" data-to="'+v[0]+'" aria-selected="'+(v[0]===cur)+'">'+v[0].toUpperCase()+' · '+v[1]+'</button>';}).join('')+'</nav>'+body+'</div>'+aside(cur)+'</div>'};};}
function aside(cur){
  var r=K.S.react[cur]||'';
  return '<aside class="b3-side" aria-label="Notas del entrevistador"><div class="note-side" style="position:sticky;top:12px"><h3>Reacción en esta vista</h3><div class="chips" role="group" aria-label="Reacción">'+['Alto','Medio','Bajo'].map(function(x){return '<button class="chip" style="min-height:38px;font-size:13px" data-act="react" data-id="'+x+'" data-v="'+cur+'" aria-pressed="'+(r===x)+'">Interés '+x.toLowerCase()+'</button>';}).join('')+'</div><div style="margin-top:12px">'+K.notesBox('Notas del entrevistador').replace('class="note-side"','style="background:none;border:0;padding:0"')+'</div></div></aside>';
}
function sum(a,i){return a.reduce(function(x,r){return x+r[i];},0);}

function m1(){
  var b=B();
  return '<p class="eyebrow">Portal de tesorería · Comercializadora Andes SAS</p><h1>Hola, bienvenido a '+b.n+'</h1><div class="grid3"><div class="kpi"><div class="l">Saldo total</div><div class="n">'+money(318450000)+'</div></div><div class="kpi"><div class="l">Pagos programados (7 días)</div><div class="n">'+money(sum(PAGOS,1))+'</div></div><div class="kpi"><div class="l">Recaudos de hoy</div><div class="n">'+money(64210000)+'</div></div></div>'+
   '<div class="grid2" style="margin-top:18px"><div class="card"><h3 style="margin-top:0">Cuentas</h3><ul class="list"><li><span class="grow">Cuenta corriente •••• 7730</span><strong>'+money(212300000)+'</strong></li><li><span class="grow">Cuenta de ahorros •••• 4821</span><strong>'+money(76150000)+'</strong></li><li><span class="grow">Cuenta de recaudo •••• 1190</span><strong>'+money(30000000)+'</strong></li></ul></div><div class="card"><h3 style="margin-top:0">Recaudos recientes</h3><ul class="list"><li><span class="grow">Cliente Distrimarket · FV-26-8101</span><strong>'+money(18400000)+'</strong></li><li><span class="grow">Cliente Almacenes del Sur · FV-26-8099</span><strong>'+money(9730000)+'</strong></li><li><span class="grow">Cliente Hotel Mirador · FV-26-8094</span><strong>'+money(36080000)+'</strong></li></ul></div></div>'+
   '<h3>Pagos programados</h3><div class="tscroll"><table class="dtable"><thead><tr><th>Beneficiario</th><th class="num">Valor</th><th>Fecha</th><th>Origen</th></tr></thead><tbody>'+PAGOS.map(function(p,i){return '<tr><td>'+p[0]+'</td><td class="num">'+money(p[1])+'</td><td>'+p[2]+'</td><td><span class="badge gray">ERP · '+DOC(i)+'</span></td></tr>';}).join('')+'</tbody></table></div>';
}
function m2(){
  var cur=K.S.p.marca;
  return '<h1>Cambio de marca en segundos</h1><p class="lead">El mismo TESO se ve con la identidad de cada entidad: logo, colores, nombre del portal y dominio. El cambio aplica a todas las vistas.</p><div class="grid2">'+
   Object.keys(BR).map(function(k){var b=BR[k];return '<div class="card" style="border:2px solid '+(cur===k?b.c:'var(--line)')+'"><div style="display:flex;gap:10px;align-items:center">'+b.logo+'<strong style="font-size:17px">'+b.n+'</strong></div><p class="muted small" style="margin:6px 0">'+b.dom+'</p><div style="display:flex;gap:8px;margin:8px 0">'+[b.c,b.d,b.l].map(function(c){return '<span style="width:44px;height:44px;border-radius:10px;background:'+c+';display:inline-block" title="'+c+'"></span>';}).join('')+'</div><div style="background:#fff;border:1px solid var(--line);border-radius:10px;padding:10px"><div style="display:flex;justify-content:space-between;align-items:center"><span class="small muted">Saldo total</span><strong>$318.450.000</strong></div><div style="margin-top:8px"><span style="display:inline-block;background:'+b.c+';color:#fff;border-radius:8px;padding:6px 12px;font-weight:700;font-size:13px">Programar pago</span></div></div><button class="btn '+(cur===k?'btn-secondary':'btn-primary')+' block" style="margin-top:12px;'+(cur===k?'':'background:'+b.c)+'" data-act="marca" data-id="'+k+'"'+(cur===k?' disabled':'')+'>'+(cur===k?'Marca actual':'Aplicar esta marca')+'</button></div>';}).join('')+'</div>';
}
function m3(){
  var S=K.S,n=NODOS.filter(function(x){return x.k===S.node;})[0];
  var boxes=NODOS.map(function(x,i){var p=S.pain[x.k];return '<button class="nodo'+(x.k===S.node?' on':'')+(p?' pain':'')+'" data-node="'+x.k+'" aria-pressed="'+(x.k===S.node)+'"><span class="small muted">'+(i+1)+'</span><strong>'+x.n+'</strong>'+(p?'<span class="badge err" style="margin-top:4px">Punto de dolor</span>':'')+'</button>'+(i<NODOS.length-1?'<div class="flecha" aria-hidden="true"><span>órdenes →</span><span>← estados</span></div>':'');}).join('');
  return '<h1>Cómo se conecta con el ERP del cliente</h1><p class="lead">Pasa el cursor (o usa el teclado) sobre cada caja para ver qué datos viajan.</p><div class="diag">'+boxes+'</div><div class="card" id="nodo-info" aria-live="polite" style="margin-top:16px">'+nodoInfo(n)+'</div>';
}
function nodoInfo(n){var p=K.S.pain[n.k];return '<h3 style="margin-top:0">'+n.n+'</h3><p class="muted">'+n.d+'</p><strong>Datos que viajan</strong><ul>'+n.v.map(function(v){return '<li>'+v+'</li>';}).join('')+'</ul><label class="switch"><input type="checkbox" data-inp="pain" data-id="'+n.k+'"'+(p?' checked':'')+'> Aquí se rompe hoy mi proceso (punto de dolor)</label>';}
function m4(){
  var S=K.S,s=S.m4,steps=['Origen','Aprobación dual','Envío','Estado'];
  var stp='<div class="stepper" aria-hidden="true">'+steps.map(function(t,i){return '<i class="'+(i<s.s?'on':'')+'"></i>';}).join('')+'</div><p class="muted">Paso '+s.s+' de 4 · '+steps[s.s-1]+'</p>';
  var h='<h1>Pago masivo originado en el ERP</h1>'+stp;
  if(s.s===1)h+='<div class="card"><fieldset><legend>¿Cómo llega el lote?</legend><label class="opt"><input type="radio" name="orig" value="archivo" data-inp="orig"'+(s.orig==='archivo'?' checked':'')+'> Archivo desde el ERP (carga manual)</label><label class="opt"><input type="radio" name="orig" value="api" data-inp="orig"'+(s.orig==='api'?' checked':'')+'> API desde el ERP (automático)</label></fieldset><div class="banner ok">'+I.check+' Lote <strong>2026-10-12-0457</strong> recibido por '+(s.orig==='api'?'API':'archivo')+': <strong>86 pagos · '+money(214350000)+'</strong></div><button class="btn btn-primary" data-act="m4go" data-id="2">Continuar a la aprobación</button></div>';
  if(s.s===2)h+='<div class="card"><h3 style="margin-top:0">Aprobación dual</h3><ul class="list"><li><span class="badge ok">'+I.check+' Aprobado</span><span class="grow">Ana Martínez · Analista de tesorería</span><span class="muted small">12/10/2026 · 09:41</span></li><li><span class="badge '+(s.ap2?'ok':'warn')+'">'+(s.ap2?I.check+' Aprobado':'Pendiente')+'</span><span class="grow">Carlos Ríos · Director financiero</span><span class="muted small">'+(s.ap2?'12/10/2026 · 09:52':'')+'</span></li></ul>'+(s.ap2?'<button class="btn btn-primary" data-act="m4go" data-id="3">Continuar al envío</button>':'<button class="btn btn-primary" data-act="m4ap2">Aprobar como segundo aprobador</button>')+'</div>';
  if(s.s===3)h+='<div class="card center"><h3 style="margin-top:0">Todo listo para enviar</h3><p class="muted">86 pagos por '+money(214350000)+' a PSE / ACH.</p>'+(s.env?'<div class="spinner"></div>':'<button class="btn btn-primary" data-act="m4env">Enviar a PSE / ACH</button>')+'</div>';
  if(s.s===4)h+='<div class="grid3"><div class="kpi"><div class="n">70</div><div class="l">Enviados</div></div><div class="kpi"><div class="n" style="color:var(--ok)">14</div><div class="l">Pagados</div></div><div class="kpi"><div class="n" style="color:var(--err)">2</div><div class="l">Rechazados</div></div></div><div class="card" style="margin-top:14px"><h3 style="margin-top:0">Rechazos</h3><table class="dtable" style="width:100%"><tbody>'+s.rech.map(function(r,i){return '<tr><td>Pago #'+(40+i*9)+' · '+PAGOS[i][0]+'</td><td><span class="badge err">'+r[1]+'</span></td></tr>';}).join('')+'</tbody></table></div><div class="toolbar"><button class="btn btn-secondary" data-act="m4reset">Repetir el flujo</button></div>';
  return h;
}
function m5(){
  var S=K.S,env=S.m5.env;
  return '<h1>Conciliación automática de vuelta al ERP</h1><p class="lead">Cada pago se cruza con su documento en el ERP y se informa su estado.</p><div class="tscroll"><table class="dtable"><thead><tr><th>Documento ERP</th><th>Beneficiario</th><th class="num">Valor</th><th>Estado</th><th>Estado en el ERP</th></tr></thead><tbody>'+PAGOS.map(function(p,i){return '<tr><td class="mono">'+DOC(i)+'</td><td>'+p[0]+'</td><td class="num">'+money(p[1])+'</td><td><span class="badge '+(p[3]==='Conciliado'?'ok':p[3]==='Diferencia'?'warn':'gray')+'">'+p[3]+'</span>'+(p[3]==='Diferencia'?'<div class="small muted">Diferencia de '+money(5000)+' por comisión</div>':'')+'</td><td>'+(env&&p[3]!=='Pendiente'?'<span class="badge ok">'+I.check+' Actualizado</span>':'<span class="muted small">—</span>')+'</td></tr>';}).join('')+'</tbody></table></div><div class="toolbar" style="margin-top:14px"><button class="btn btn-primary" data-act="m5env"'+(env?' disabled':'')+'>'+(env?'Enviado al ERP':'Enviar conciliación al ERP')+'</button>'+(env?'<span class="badge ok">'+I.check+' 4 de 5 documentos actualizados en el ERP</span>':'')+'</div>';
}
function precio(){
  var S=K.S,p=S.precio,tx=S.clientes*S.txm,lic=p.lic*S.clientes,txc=tx*p.tx,mes=lic+txc;
  return '<table class="dtable" style="width:100%"><tbody><tr><td>Licencia (por empresa cliente, al mes)</td><td class="num">'+money(lic)+'</td></tr><tr><td>Transacciones ('+String(tx).replace(/\B(?=(\d{3})+(?!\d))/g,'.')+' al mes)</td><td class="num">'+money(txc)+'</td></tr><tr><td><strong>Costo mensual estimado</strong></td><td class="num"><strong>'+money(mes)+'</strong></td></tr><tr><td>Costo mensual por empresa cliente</td><td class="num">'+money(mes/Math.max(1,S.clientes))+'</td></tr><tr><td>Cuota única de implementación</td><td class="num">'+money(p.imp)+'</td></tr></tbody></table>';
}
function m6(){
  var S=K.S,b=B(),ph=['Diagnóstico y diseño de marca','Configuración y conectores','Integración con ERP y pruebas','Salida a producción'],t=S.tiempos,a=0,z=0;
  t.forEach(function(x){a+=x[0];z+=x[1];});
  return '<p class="eyebrow">Ficha comercial · '+b.n+'</p><h1>TESO con tu marca, integrado al ERP de tus clientes</h1><div class="grid2"><div class="card"><h3 style="margin-top:0">Qué incluye</h3><ul><li>Portal de tesorería con tu marca y dominio</li><li>Pagos masivos desde el ERP con aprobación dual</li><li>Recaudos, saldos y calendario de pagos</li><li>Conciliación automática hacia el ERP</li><li>Conexión a PSE / ACH operada por ACH</li><li>Soporte de segundo nivel para tus ejecutivos</li></ul></div><div class="card"><h3 style="margin-top:0">Tiempos de implementación <span class="ilus">editable</span></h3><table class="dtable" style="width:100%"><thead><tr><th>Fase</th><th>Mín. (sem.)</th><th>Máx. (sem.)</th></tr></thead><tbody>'+ph.map(function(f,i){return '<tr><td>'+f+'</td><td style="width:84px"><input type="number" min="1" max="52" value="'+t[i][0]+'" data-inp="tm" data-i="'+i+'" data-k="0" style="min-height:40px" aria-label="Semanas mínimas de '+f+'"></td><td style="width:84px"><input type="number" min="1" max="52" value="'+t[i][1]+'" data-inp="tm" data-i="'+i+'" data-k="1" style="min-height:40px" aria-label="Semanas máximas de '+f+'"></td></tr>';}).join('')+'<tr><td><strong>Total</strong></td><td colspan="2" id="tm-tot"><strong>'+a+' a '+z+' semanas</strong></td></tr></tbody></table></div></div>'+
   '<div class="card"><h3 style="margin-top:0">Modelo de precio tentativo <span class="ilus">editable · ilustrativo</span></h3><div class="grid3"><div class="field"><label for="plic">Licencia por empresa cliente (mensual)</label><input type="text" inputmode="numeric" id="plic" value="'+S.precio.lic+'" data-inp="pr" data-k="lic"></div><div class="field"><label for="ptx">Valor por transacción</label><input type="text" inputmode="numeric" id="ptx" value="'+S.precio.tx+'" data-inp="pr" data-k="tx"></div><div class="field"><label for="pimp">Implementación (única)</label><input type="text" inputmode="numeric" id="pimp" value="'+S.precio.imp+'" data-inp="pr" data-k="imp"></div></div><div class="grid2"><div class="field"><label for="ncl">Empresas cliente que usarían TESO</label><input type="number" min="1" id="ncl" value="'+S.clientes+'" data-inp="vol" data-k="clientes"></div><div class="field"><label for="ntx">Transacciones al mes por empresa</label><input type="number" min="1" id="ntx" value="'+S.txm+'" data-inp="vol" data-k="txm"></div></div><div id="pr-out">'+precio()+'</div></div>'+
   '<div class="survey"><h3>Propuesta del participante</h3><div class="grid2"><div class="field"><label for="mod">¿Qué modelo de precio aceptaría?</label><select id="mod" data-inp="modelo"><option value="">Elige uno</option>'+['Licencia fija mensual','Por transacción','Mixto: licencia + transacción','Participación en ingresos','Otro'].map(function(m){return '<option'+(S.modelo===m?' selected':'')+'>'+m+'</option>';}).join('')+'</select></div><div class="field"><label for="rng">Rango que consideraría razonable</label><input type="text" id="rng" value="'+esc(S.rango)+'" data-inp="rango" placeholder="Ej. entre $600.000 y $900.000 por empresa"></div></div></div>'+
   '<div class="card"><h3 style="margin-top:0">Próximos pasos</h3><ol><li>Sesión técnica con tu equipo de canales y seguridad.</li><li>Definición de la marca y el dominio.</li><li>Piloto con 3 empresas cliente.</li></ol></div>';
}

function nodeSet(k){var S=K.S;if(S.node===k)return;S.node=k;var n=NODOS.filter(function(x){return x.k===k;})[0];K.html('nodo-info',nodoInfo(n));document.querySelectorAll('.nodo').forEach(function(b){var on=b.dataset.node===k;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));});K.log('nodo_visto',{nodo:k});}
K.run({
  id:'b3',title:'B3 · Demo TESO Marca Blanca + ERP',layout:'desk',
  params:[{k:'marca',label:'Marca de la entidad',def:'andino',opts:[['andino','Banco Andino Empresas'],['pac','Banco del Pacífico Digital Empresas']]}],
  state:fresh,start:function(){return 'm1';},
  labels:{m1:'M1 Portal de tesorería',m2:'M2 Cambio de marca',m3:'M3 Integración con el ERP',m4:'M4 Pago masivo',m5:'M5 Conciliación',m6:'M6 Ficha comercial'},
  groups:[['Vistas',['m1','m2','m3','m4','m5','m6']]],
  routes:{m1:wrapRoute('m1',m1),m2:wrapRoute('m2',m2),m3:wrapRoute('m3',m3),m4:wrapRoute('m4',m4),m5:wrapRoute('m5',m5),m6:wrapRoute('m6',m6)},
  acts:{
    react:function(el){var S=K.S;S.react[el.dataset.v]=el.dataset.id;K.log('reaccion_vista',{vista:el.dataset.v,reaccion:el.dataset.id});K.rerender();},
    marca:function(el){setMarca(el.dataset.id);},
    m4go:function(el){K.S.m4.s=+el.dataset.id;K.log('flujo_masivo',{paso:+el.dataset.id});K.rerender();},
    m4ap2:function(){K.S.m4.ap2=true;K.log('aprobacion_dual');K.rerender();},
    m4env:function(){var s=K.S.m4;s.env=true;K.rerender();setTimeout(function(){if(K.cur!=='m4')return;s.env=false;s.s=4;K.log('lote_enviado');K.rerender();},1500);},
    m4reset:function(){var s=K.S.m4;s.s=1;s.ap2=false;s.env=false;K.rerender();},
    m5env:function(){K.S.m5.env=true;K.log('conciliacion_enviada_erp');K.rerender();}
  },
  inps:{
    marca:function(el,ty){if(ty==='change')setMarca(el.value);},
    pain:function(el,ty){if(ty!=='change')return;K.S.pain[el.dataset.id]=el.checked;K.log('punto_de_dolor',{nodo:el.dataset.id,marcado:el.checked});K.rerender();},
    orig:function(el,ty){if(ty!=='change')return;K.S.m4.orig=el.value;K.rerender();},
    tm:function(el,ty){var v=Math.max(1,Math.min(52,+el.value||1)),S=K.S;S.tiempos[+el.dataset.i][+el.dataset.k]=v;var a=0,z=0;S.tiempos.forEach(function(x){a+=x[0];z+=x[1];});K.html('tm-tot','<strong>'+a+' a '+z+' semanas</strong>');if(ty==='change')K.log('tiempo_editado',{fase:+el.dataset.i+1,k:el.dataset.k==='0'?'min':'max',semanas:v});},
    pr:function(el,ty){var S=K.S,v=+String(el.value).replace(/\D/g,'')||0;S.precio[el.dataset.k]=v;K.html('pr-out',precio());if(ty==='change')K.log('precio_editado',{campo:el.dataset.k,valor:v});},
    vol:function(el,ty){var S=K.S;S[el.dataset.k]=Math.max(1,+el.value||1);K.html('pr-out',precio());if(ty==='change')K.log('volumen_editado',{campo:el.dataset.k,valor:S[el.dataset.k]});},
    modelo:function(el,ty){if(ty!=='change')return;K.S.modelo=el.value;K.log('modelo_propuesto',{modelo:el.value});},
    rango:function(el,ty){K.S.rango=el.value;if(ty==='change')K.log('rango_propuesto',{texto:el.value});}
  }
});
function setMarca(k){var S=K.S;S.p.marca=k;var q=new URLSearchParams(location.search);q.set('marca',k);history.replaceState(null,'',location.pathname+'?'+q.toString()+location.hash);K.log('marca_cambiada',{marca:k});K.rerender();}
document.addEventListener('mouseover',function(e){var n=e.target.closest&&e.target.closest('[data-node]');if(n)nodeSet(n.dataset.node);});
document.addEventListener('focusin',function(e){var n=e.target.closest&&e.target.closest('[data-node]');if(n)nodeSet(n.dataset.node);});
document.addEventListener('click',function(e){var n=e.target.closest&&e.target.closest('[data-node]');if(n)nodeSet(n.dataset.node);});
