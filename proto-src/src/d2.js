/* D2 · Blueprint Hub Open Finance · Proveedor de datos — documento interactivo de escritorio */
var esc=K.esc,money=K.money,I=K.I;
var ENT={
  banco:{n:'Banco mediano',impl:120000000,mens:9500000,call:18,vol:2500000,f:1,ej:'Banco Andino'},
  coop:{n:'Cooperativa',impl:70000000,mens:5200000,call:22,vol:600000,f:1.25,ej:'Cooperativa Valle Unido'},
  neo:{n:'Neobanco',impl:95000000,mens:7800000,call:15,vol:4000000,f:0.8,ej:'Banco del Pacífico Digital'}
};
var LANES=['Cliente final','Tercero receptor','ACH Hub','Entidad proveedora','Sistemas internos de la entidad'];
var MOMS=['Registro del tercero','Solicitud de consentimiento','Autenticación del cliente','Entrega de datos','Monitoreo','Revocación'];
var ACH_DO=['ACH verifica al tercero una sola vez y emite sus credenciales para todas las entidades.','ACH registra el consentimiento con su propósito, datos y vigencia, y lo deja disponible para auditoría.','ACH orquesta el flujo de autenticación y verifica que la entidad confirmó la identidad del cliente.','ACH enruta la consulta, aplica límites y guarda la trazabilidad de cada llamada.','ACH ofrece el tablero de uso, las alertas y los reportes de trazabilidad.','ACH propaga la revocación a todas las partes en el mismo momento.'];
/* [texto, carga para la entidad 0-3] */
var CELLS=[
 [['No participa en este momento',0],['Recibe la solicitud: ve qué datos, para qué y por cuánto tiempo',0],['Se autentica con su entidad (app o web)',0],['No ve nada; recibe la confirmación en la app del tercero',0],['Consulta sus consentimientos activos',0],['Revoca desde su app o desde el portal del Hub',0]],
 [['Se registra y es validado ante el Hub',0],['Pide el consentimiento con propósito y vigencia',0],['Redirige al cliente hacia su entidad',0],['Consume la API con su token',0],['Respeta límites de consulta y reporta uso',0],['Deja de consultar al recibir la revocación',0]],
 [['Verifica al tercero y emite credenciales',0],['Registra y valida el consentimiento',0],['Orquesta el flujo de autenticación',0],['Enruta la consulta y registra cada llamada',0],['Tablero de uso, alertas y trazabilidad',0],['Propaga la revocación a todas las partes',0]],
 [['Define qué terceros acepta (lista de confianza)',1],['Recibe el aviso del consentimiento',1],['Autentica a su cliente con sus propios medios',3],['Expone los datos en el formato estándar que defina la SFC',3],['Atiende incidentes y reporta a la SFC',2],['Deja de entregar datos de inmediato',2]],
 [['Sin cambios: se configura en el Hub',1],['Sin cambios: el aviso llega por el Hub',1],['Integra su autenticación de banca móvil y web',3],['Conecta core, canales y productos al conector estándar',3],['Envía registros (logs) al tablero del Hub',2],['Actualiza el estado del consentimiento en sus sistemas',2]]
];
var CARGA=['Sin carga para la entidad','Carga baja','Carga media','Carga alta'];
var RESP=[['Registro y validación de terceros','ach','Define su lista de confianza'],['Gestión del consentimiento (registro y vigencia)','ach',''],['Autenticación del cliente final','','ent'],['Conector y APIs estándar','ach','Conecta sus fuentes de datos'],['Monitoreo, alertas y trazabilidad','ach','Atiende las alertas de su cartera'],['Atención al cliente sobre consentimientos','','ent'],['Reporte a la Superintendencia (SFC)','Aporta información consolidada','ent'],['Seguridad y cumplimiento de estándares','Hub y plataforma','Sus sistemas y canales']];
var PHASES=[['Diagnóstico y alcance',2,3],['Conexión y configuración del Hub',3,5],['Integración con sistemas internos',6,10],['Pruebas y certificación con terceros',3,4],['Puesta en producción y acompañamiento',2,3]];
var TIERS=[[1000000,1,'Hasta 1 millón de consultas'],[5000000,.8,'De 1 a 5 millones (-20 %)'],[Infinity,.65,'Más de 5 millones (-35 %)']];
var ALTS=[
 {k:'construir',n:'Construir la plataforma propia',d:{t:'12 a 24 meses según capacidad del equipo',ci:'Alto: equipo, infraestructura y certificaciones',cr:'Medio: mantenimiento y actualización normativa',c:'Total',r:'Lo asume la entidad',e:'Muy alto: varios equipos por años'}},
 {k:'comprar',n:'Comprar a un proveedor tecnológico',d:{t:'6 a 12 meses',ci:'Medio a alto: licencia e integración',cr:'Medio: licencia y soporte',c:'Medio: depende del proveedor',r:'Compartido con el proveedor',e:'Alto: integración y operación propia'}},
 {k:'hub',n:'Tercerizar en un hub',d:{t:'3 a 6 meses',ci:'Bajo a medio: implementación',cr:'Variable: mensualidad y consultas',c:'Medio: se apoya en reglas comunes',r:'Compartido con el operador del hub',e:'Medio: conexión de autenticación y datos'}}
];
var ALT_ROWS=[['Tiempo para cumplir','t'],['Costo inicial','ci'],['Costo recurrente','cr'],['Control sobre la solución','c'],['Riesgo regulatorio','r'],['Esfuerzo interno','e']];

function ent(){return ENT[K.S.p.ent];}
function initState(p){
  var e=ENT[p.ent];
  return {heat:false,marks:{},vol:e.vol,ph:PHASES.map(function(x){return [Math.max(1,Math.round(x[1]*e.f)),Math.max(1,Math.round(x[2]*e.f))];}),rank:['hub','comprar','construir'],ranked:false,why:''};
}
function calc(vol){
  var e=ent(),cost=0,prev=0;
  TIERS.forEach(function(t){var n=Math.max(0,Math.min(vol,t[0])-prev);cost+=n*e.call*t[1];prev=t[0];});
  var month=cost+e.mens;return {llam:cost,month:month,year1:e.impl+12*month,eff:month/Math.max(vol,1)};
}
function fmtN(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');}

function simOut(){
  var S=K.S,e=ent(),c=calc(S.vol);
  return '<table class="dtable" style="width:100%"><tbody>'+
    '<tr><td>Cuota de implementación (única)</td><td class="num">'+money(e.impl)+'</td></tr>'+
    '<tr><td>Mensualidad</td><td class="num">'+money(e.mens)+'</td></tr>'+
    '<tr><td>Consultas (según tramos)</td><td class="num">'+money(c.llam)+'</td></tr>'+
    '<tr><td><strong>Costo mensual estimado</strong></td><td class="num"><strong>'+money(c.month)+'</strong></td></tr>'+
    '<tr><td>Costo por consulta (todo incluido)</td><td class="num">'+money(c.eff)+'</td></tr>'+
    '<tr><td><strong>Primer año (implementación + 12 meses)</strong></td><td class="num"><strong>'+money(c.year1)+'</strong></td></tr></tbody></table>';
}
function simHtml(){
  var S=K.S,e=ent();
  return '<div class="grid2"><div>'+
    '<label for="vol">Consultas al mes: <strong id="vol-l">'+fmtN(S.vol)+'</strong></label>'+
    '<input type="range" id="vol" min="100000" max="10000000" step="100000" value="'+S.vol+'" data-inp="vol" aria-describedby="vol-h">'+
    '<p class="hint" id="vol-h">Mueve la barra con el volumen que estima su entidad (tipo: '+e.n+').</p></div>'+
    '<div class="card" style="margin:0" id="sim-out" aria-live="polite">'+simOut()+'</div></div>';
}
function phHtml(){
  var S=K.S,a=0,b=0;
  var rows=PHASES.map(function(p,i){a+=S.ph[i][0];b+=S.ph[i][1];
    return '<tr><td>'+(i+1)+'. '+p[0]+'</td><td style="width:110px"><input type="number" min="1" max="52" value="'+S.ph[i][0]+'" data-inp="ph" data-i="'+i+'" data-k="0" aria-label="Semanas mínimas de '+esc(p[0])+'"></td><td style="width:110px"><input type="number" min="1" max="52" value="'+S.ph[i][1]+'" data-inp="ph" data-i="'+i+'" data-k="1" aria-label="Semanas máximas de '+esc(p[0])+'"></td></tr>';}).join('');
  return '<table class="dtable" style="width:100%"><thead><tr><th>Fase</th><th>Semanas (mín.)</th><th>Semanas (máx.)</th></tr></thead><tbody>'+rows+
    '<tr><td><strong>Total</strong></td><td colspan="2"><strong>'+a+' a '+b+' semanas</strong> (≈ '+(a/4.3).toFixed(1).replace('.',',')+' a '+(b/4.3).toFixed(1).replace('.',',')+' meses)</td></tr></tbody></table>';
}
function bpHtml(){
  var S=K.S,h='<div class="bp" role="table" aria-label="Blueprint de servicio"><div class="bp-h" role="columnheader"></div>'+MOMS.map(function(m,i){return '<div class="bp-h" role="columnheader"><span class="badge gray">'+(i+1)+'</span> '+m+'</div>';}).join('');
  LANES.forEach(function(l,li){
    h+='<div class="bp-l" role="rowheader">'+l+'</div>';
    CELLS[li].forEach(function(c,mi){
      var key=li+'-'+mi,mk=S.marks[key];
      h+='<button class="cell'+(S.heat&&c[1]?' h'+c[1]:'')+(mk?' mk':'')+'" data-act="cell" data-id="'+key+'" aria-label="'+esc(l+', '+MOMS[mi]+': '+c[0])+'">'+(mk?'<span class="star" aria-hidden="true">★</span>':'')+esc(c[0])+'</button>';
    });
  });
  return h+'</div>';
}
function cellSheet(key){
  var S=K.S,p=key.split('-'),li=+p[0],mi=+p[1],c=CELLS[li][mi],mk=S.marks[key];
  K.log('celda_abierta',{carril:LANES[li],momento:MOMS[mi],carga:CARGA[c[1]]});
  K.openSheet(K.sheetHead(esc(LANES[li])+' · '+esc(MOMS[mi]))+
    '<p><strong>'+esc(c[0])+'</strong></p>'+
    '<div class="card">'+K.row('Carga para su entidad','<span class="badge '+(c[1]>=3?'err':c[1]===2?'warn':c[1]===1?'':'gray')+'">'+CARGA[c[1]]+'</span>')+K.row('Lo que cubre ACH',esc(ACH_DO[mi]))+'</div>'+
    '<button class="btn '+(mk?'btn-secondary':'btn-primary')+'" data-act="mark" data-id="'+key+'">'+(mk?'Quitar de «mayor carga»':'Marcar como mayor carga')+'</button>');
}
function rankHtml(){
  var S=K.S;
  return '<ol class="list" style="counter-reset:r">'+S.rank.map(function(k,i){
    var a=ALTS.filter(function(x){return x.k===k;})[0];
    return '<li><span class="badge">'+(i+1)+'.º</span><span class="grow"><strong>'+a.n+'</strong></span>'+
      '<button class="btn btn-secondary sm" data-act="rank" data-id="'+k+'" data-d="-1"'+(i===0?' disabled':'')+' aria-label="Subir '+esc(a.n)+'">▲</button>'+
      '<button class="btn btn-secondary sm" data-act="rank" data-id="'+k+'" data-d="1"'+(i===2?' disabled':'')+' aria-label="Bajar '+esc(a.n)+'">▼</button></li>';}).join('')+'</ol>';
}

function setEnt(v){
  var S=K.S;S.p.ent=v;var q=new URLSearchParams(location.search);q.set('ent',v);history.replaceState(null,'',location.pathname+'?'+q.toString()+location.hash);
  var n=initState(S.p),m=S.marks,r=S.rank,hh=S.heat,w=S.why;Object.assign(S,n);S.marks=m;S.rank=r;S.heat=hh;S.why=w;
  K.log('tipo_entidad',{ent:v});K.rerender();
}
function page(){
  var S=K.S,e=ent();
  var nav=[['b2','Blueprint'],['b3','Responsabilidades'],['b4','Implementación'],['b5','Precio'],['b6','Alternativas'],['b7','Próximos pasos']];
  var h='<nav class="docnav" aria-label="Secciones"><div class="in"><strong style="margin-right:8px">Hub Open Finance · Proveedor</strong>'+nav.map(function(n){return '<button data-act="scroll" data-to="'+n[0]+'">'+n[1]+'</button>';}).join('')+
    '<span class="grow"></span><label for="ent" class="small muted" style="margin:0">Tipo de entidad</label><select id="ent" data-inp="ent" style="width:auto;min-height:40px">'+Object.keys(ENT).map(function(k){return '<option value="'+k+'"'+(S.p.ent===k?' selected':'')+'>'+ENT[k].n+'</option>';}).join('')+'</select>'+'</div></nav>';
  h+='<div class="wrapd">'+
  '<section id="b1"><p class="eyebrow">ACH Colombia · Hub de Open Finance</p><h1>Cumple como proveedor de datos sin construir tu propia plataforma</h1>'+
  '<p class="lead">El Decreto 0368 de 2026 hace obligatoria la apertura de datos financieros con consentimiento del cliente. Las entidades vigiladas deben exponer sus datos a terceros autorizados. <strong>Los estándares técnicos y de seguridad los define la Superintendencia Financiera (SFC)</strong>; este documento es una propuesta de servicio, no una interpretación jurídica.</p>'+
  '<div class="banner">'+I.info+' Ejemplo para <strong>'+e.n+'</strong> (como «'+e.ej+'», ficticio). Los tiempos y precios son <span class="ilus">ilustrativos</span> y se ajustan según el tipo de entidad.</div></section>'+
  '<section class="docsec" id="b2"><h2>El servicio, momento a momento</h2><p class="muted">Haz clic en cualquier celda para ver el detalle. Activa «Mostrar carga» para ver dónde se concentra el trabajo de su entidad.</p>'+
  '<div class="toolbar"><label class="switch"><input type="checkbox" data-inp="heat"'+(S.heat?' checked':'')+'> Mostrar carga para la entidad</label>'+(Object.keys(S.marks).length?'<span class="badge">★ '+Object.keys(S.marks).length+' marcada'+(Object.keys(S.marks).length>1?'s':'')+' como mayor carga</span>':'')+'</div>'+
  '<div class="tscroll" style="padding:10px">'+bpHtml()+'</div></section>'+
  '<section class="docsec" id="b3"><h2>Qué hace ACH y qué hace la entidad</h2><div class="card" style="padding:6px 16px"><table class="dtable" style="width:100%"><thead><tr><th>Responsabilidad</th><th>ACH</th><th>Entidad</th></tr></thead><tbody>'+
   RESP.map(function(r){return '<tr><td>'+r[0]+'</td><td>'+(r[1]==='ach'?'<span class="badge ok">'+I.check+' Lo opera ACH</span>':r[1]?esc(r[1]):'—')+'</td><td>'+(r[2]==='ent'?'<span class="badge warn">'+I.check+' La entidad</span>':r[2]?esc(r[2]):'—')+'</td></tr>';}).join('')+'</tbody></table></div></section>'+
  '<section class="docsec" id="b4"><h2>Implementación por fases</h2><p class="muted">Rangos de ejemplo para '+e.n+'. Puedes editarlos para ajustarlos a su realidad.</p><div class="card" id="ph">'+phHtml()+'</div></section>'+
  '<section class="docsec" id="b5"><h2>Modelo de precio tentativo <span class="ilus">ilustrativo</span></h2><p class="muted">Cuota de implementación + mensualidad + costo por consulta con descuento por volumen. Tramos: '+TIERS.map(function(t){return t[2];}).join(' · ')+'. Costo base por consulta: '+money(e.call)+'.</p><div class="card" id="sim">'+simHtml()+'</div></section>'+
  '<section class="docsec" id="b6"><h2>Comparación de alternativas</h2><p class="muted">Una mirada neutral de tres caminos para cumplir como proveedor de datos.</p><div class="tscroll"><table class="dtable"><thead><tr><th></th>'+ALTS.map(function(a){return '<th>'+a.n+'</th>';}).join('')+'</tr></thead><tbody>'+
   ALT_ROWS.map(function(r){return '<tr><th scope="row" style="font-weight:600;color:var(--muted)">'+r[0]+'</th>'+ALTS.map(function(a){return '<td>'+esc(a.d[r[1]])+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table></div>'+
  '<div class="survey"><h3>Ejercicio: ordene las alternativas de la más a la menos atractiva para su entidad</h3><div id="rank">'+rankHtml()+'</div><div class="toolbar"><button class="btn btn-primary sm" data-act="saveRank">Registrar orden</button>'+(S.ranked?'<span class="badge ok">'+I.check+' Orden registrado</span>':'')+'</div>'+
  '<label for="why">¿Por qué?</label><textarea id="why" data-inp="why" placeholder="Explique su orden">'+esc(S.why)+'</textarea></div></section>'+
  '<section class="docsec" id="b7"><h2>Próximos pasos</h2><div class="side"><div class="card"><ol><li>Sesión técnica con su equipo de arquitectura y seguridad.</li><li>Estimación conjunta del alcance y del volumen de consultas.</li><li>Propuesta comercial definitiva y plan de pruebas.</li></ol></div>'+K.notesBox()+'</div></section></div>';
  return h;
}

K.run({
  id:'d2',title:'D2 · Blueprint Hub Open Finance · Proveedor',layout:'desk',
  params:[{k:'ent',label:'Tipo de entidad',def:'banco',opts:[['banco','Banco mediano'],['coop','Cooperativa'],['neo','Neobanco']]}],
  state:initState,start:function(){return 'doc';},
  labels:{doc:'Documento completo'},groups:[['Pantalla',['doc']]],
  routes:{doc:function(){return {layout:'desk',wrap:'none',body:page()};}},
  acts:{
    setEnt:function(el){setEnt(el.dataset.id);},
    cell:function(el){cellSheet(el.dataset.id);},
    mark:function(el){var S=K.S,k=el.dataset.id;if(S.marks[k]){delete S.marks[k];}else S.marks[k]=1;
      var p=k.split('-');K.log('marca_mayor_carga',{carril:LANES[+p[0]],momento:MOMS[+p[1]],marcada:!!S.marks[k]});K.closeSheet();K.rerender();},
    rank:function(el){var S=K.S,i=S.rank.indexOf(el.dataset.id),j=i+(+el.dataset.d);if(j<0||j>2)return;var t=S.rank[i];S.rank[i]=S.rank[j];S.rank[j]=t;S.ranked=false;K.rerender();},
    saveRank:function(){var S=K.S;S.ranked=true;K.log('ranking_alternativas',{orden:S.rank.join(' > ')});K.rerender();}
  },
  inps:{
    ent:function(el,ty){if(ty==='change')setEnt(el.value);},
    heat:function(el,ty){if(ty!=='change')return;K.S.heat=el.checked;K.log('carga_visible',{visible:el.checked});K.rerender();},
    vol:function(el,ty){var S=K.S;S.vol=+el.value;K.setTxt('vol-l',fmtN(S.vol));K.html('sim-out',simOut());if(ty==='change')K.log('simulador_volumen',{volumen:S.vol,costo_mensual:Math.round(calc(S.vol).month)});},
    ph:function(el,ty){var S=K.S,v=Math.max(1,Math.min(52,+el.value||1));S.ph[+el.dataset.i][+el.dataset.k]=v;if(ty==='change'){K.log('fase_editada',{fase:PHASES[+el.dataset.i][0],k:el.dataset.k==='0'?'min':'max',semanas:v});K.rerender();}},
    why:function(el,ty){K.S.why=el.value;if(ty==='change')K.log('justificacion_ranking',{caracteres:el.value.length});}
  }
});
