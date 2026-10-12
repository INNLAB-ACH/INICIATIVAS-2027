/* E1 · Niveles de servicio antifraude — Oferta y Tablero (escritorio) */
var esc=K.esc,money=K.money,I=K.I;
var NIV=[['Esencial','esencial'],['Plus','plus'],['Avanzado','avanzado']];
var GRP=[
 ['Prevención',[['Verificación de dispositivo y huella digital',[1,1,1]],['Reglas de velocidad y límites dinámicos',[1,1,1]],['Lista compartida de cuentas de riesgo',[0,1,1]]]],
 ['Detección',[['Puntaje de riesgo en tiempo real por transacción',[1,1,1]],['Detección de anomalías por comportamiento',[0,1,1]],['Alertas de patrón de red entre entidades',[0,0,1]]]],
 ['Investigación',[['Gestor de casos',[0,1,1]],['Visualización de relaciones entre cuentas',[0,0,1]]]],
 ['Recuperación interbancaria',[['Solicitud de congelamiento entre entidades',[0,0,1]],['Arbitraje de ACH en disputas',[0,0,1]],['Seguimiento de devoluciones',[0,1,1]]]],
 ['Analítica',[['Tablero de pérdidas evitadas y tendencias',[1,1,1]],['Reportes regulatorios automatizados',[0,1,1]]]]
];
var CAPS=[];GRP.forEach(function(g){g[1].forEach(function(c){CAPS.push({n:c[0],g:g[0],inc:c[1]});});});
var PRICE0=[[4500000,9],[9800000,14],[16500000,20]];
var CASOS=[['CAS-2026-1047','Transferencia fraudulenta · $4.850.000','Banco Andino → Banco del Pacífico Digital','En arbitraje','2 días'],['CAS-2026-1052','Cuenta mula · $1.920.000','Cooperativa Valle Unido → Banco Andino','En investigación','1 día'],['CAS-2026-1055','Suplantación de identidad · $760.000','Banco del Pacífico Digital → Banco Andino','Esperando entidad','5 horas'],['CAS-2026-1038','Ataque de phishing · $12.300.000','Banco Andino → Cooperativa Valle Unido','En arbitraje','6 días'],['CAS-2026-1060','Pago no reconocido · $310.000','Banco Andino → Banco del Pacífico Digital','Nuevo','2 horas'],['CAS-2026-1029','Cuenta mula · $2.140.000','Banco del Pacífico Digital → Cooperativa Valle Unido','Esperando entidad','9 días']];
var ESTADOS=['Nuevo','En investigación','Esperando entidad','En arbitraje'];
var HEAT=[[4,6,0,0],[2,9,3,1],[1,4,5,3],[0,2,3,5]];
var ANT=['Menos de 24 horas','1 a 3 días','3 a 7 días','Más de 7 días'];
var LINEA=[['07/10/2026 · 14:12','Transferencia de $4.850.000 por ACH hacia una cuenta de Banco del Pacífico Digital.','ok'],['07/10/2026 · 14:55','La cliente reporta el fraude a Banco Andino.','ok'],['07/10/2026 · 15:30','Banco Andino abre la disputa en ACH y adjunta evidencia.','ok'],['07/10/2026 · 16:05','ACH solicita congelamiento preventivo a Banco del Pacífico Digital.','ok'],['07/10/2026 · 16:40','Banco del Pacífico Digital confirma congelamiento de $4.120.000; $730.000 ya habían sido retirados.','warn'],['08/10/2026 · 10:20','Banco del Pacífico Digital presenta su evidencia: el titular de la cuenta dice que fue una venta.','warn'],['09/10/2026 · 09:00','ACH emite su decisión como árbitro (dentro del plazo de 72 horas hábiles).','ok']];
var REC=['Solicitada','Confirmada por la entidad','Fondos congelados','Devolución solicitada','Devuelto'];
var COND=['Plazo máximo de decisión conocido de antemano','Reglas de arbitraje públicas y aprobadas por las entidades','Posibilidad de apelar la decisión','Independencia frente a las entidades involucradas','Pueda revertirse si aparece nueva evidencia'];

function fresh(){return {price:PRICE0.map(function(p){return p.slice();}),vol:1500000,nivel:'',why:'',pts:CAPS.map(function(){return 0;}),saved:false,caso:'CAS-2026-1047',acepta:'',conds:{},rec:1,disp:''};}
function sum(a){return a.reduce(function(x,y){return x+(+y||0);},0);}
function fmtN(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function mark(v){return v?'<span class="badge ok" aria-label="Incluido">'+I.check+'</span>':'<span class="badge gray" aria-label="No incluido">—</span>';}
function bar(cur){
  return K.dhead({title:'Antifraude ACH',mark:K.mark('A'),nav:cur==='o'?[]:[{label:'Casos',to:'t1',cur:cur==='t1'},{label:'Caso interbancario',to:'t2',cur:cur==='t2'},{label:'Recuperación',to:'t3',cur:cur==='t3'}],right:'<span class="ilus">Datos ficticios</span>'});
}
/* ---- Oferta ---- */
function costOut(){
  var S=K.S;
  return '<table class="dtable" style="width:100%"><thead><tr><th>Costo mensual con '+fmtN(S.vol)+' transacciones analizadas</th>'+NIV.map(function(n){return '<th class="num">'+n[0]+'</th>';}).join('')+'</tr></thead><tbody><tr><td>Mensualidad + transacciones</td>'+S.price.map(function(p){return '<td class="num"><strong>'+money(p[0]+p[1]*S.vol)+'</strong></td>';}).join('')+'</tr></tbody></table>';
}
function ptsOut(){var t=sum(K.S.pts);return 'Total: '+t+' / 100'+(t===100?' ✓':(t<100?' · faltan '+(100-t):' · sobran '+(t-100)));}
function summary(){
  var S=K.S,ord=CAPS.map(function(c,i){return [c.n,S.pts[i]];}).filter(function(x){return x[1]>0;}).sort(function(a,b){return b[1]-a[1];});
  return ord.map(function(x,i){return (i+1)+'. '+x[0]+': '+x[1];}).join('\n');
}
function o1(){
  var S=K.S;
  var h=bar('o')+'<nav class="docnav" aria-label="Secciones"><div class="in">'+[['o-1','Niveles y capacidades'],['o-2','Precio'],['o-3','Ejercicio de 100 puntos']].map(function(n){return '<button data-act="scroll" data-to="'+n[0]+'">'+n[1]+'</button>';}).join('')+'</div></nav><div class="wrapd">';
  h+='<section id="o-1"><p class="eyebrow">Servicio antifraude para entidades</p><h1>Tres niveles, trece capacidades</h1><p class="lead">Revise qué incluye cada nivel. Después estime el precio y priorice las capacidades que más valor tienen para su entidad.</p>'+
   '<div class="tscroll"><table class="dtable"><thead><tr><th>Capacidad</th>'+NIV.map(function(n){return '<th style="text-align:center">'+n[0]+'</th>';}).join('')+'</tr></thead><tbody>';
  GRP.forEach(function(g){h+='<tr><td colspan="4" style="background:#EAF2F8;font-weight:800;font-family:Manrope,sans-serif">'+g[0]+'</td></tr>';g[1].forEach(function(c){h+='<tr><td>'+c[0]+'</td>'+c[1].map(function(v){return '<td style="text-align:center">'+mark(v)+'</td>';}).join('')+'</tr>';});});
  h+='<tr><td><strong>Capacidades incluidas</strong></td>'+NIV.map(function(n,i){return '<td style="text-align:center"><strong>'+CAPS.filter(function(c){return c.inc[i];}).length+' de 13</strong></td>';}).join('')+'</tr></tbody></table></div></section>';
  h+='<section class="docsec" id="o-2"><h2>Precio tentativo <span class="ilus">editable · ilustrativo</span></h2><p class="muted">Unidad de cobro: mensualidad + valor por transacción analizada. Edite los valores para probar escenarios.</p><div class="grid3">'+
   NIV.map(function(n,i){return '<div class="card"><h3 style="margin-top:0">'+n[0]+'</h3><div class="field"><label for="m'+i+'">Mensualidad (COP)</label><input type="text" inputmode="numeric" id="m'+i+'" value="'+fmtN(S.price[i][0])+'" data-inp="price" data-i="'+i+'" data-k="0"></div><div class="field"><label for="t'+i+'">Por transacción analizada (COP)</label><input type="text" inputmode="numeric" id="t'+i+'" value="'+fmtN(S.price[i][1])+'" data-inp="price" data-i="'+i+'" data-k="1"></div></div>';}).join('')+'</div>'+
   '<div class="card"><label for="vol" style="margin-top:0">Transacciones analizadas por mes: <strong id="vol-l">'+fmtN(S.vol)+'</strong></label><input type="range" id="vol" min="100000" max="10000000" step="100000" value="'+S.vol+'" data-inp="vol"><div id="cost-out" aria-live="polite">'+costOut()+'</div></div>'+
   '<div class="survey"><h3>¿Qué nivel compraría?</h3><div class="chips" role="group" aria-label="Nivel">'+NIV.map(function(n){return '<button class="chip" data-act="nivel" data-id="'+n[0]+'" aria-pressed="'+(S.nivel===n[0])+'">'+n[0]+'</button>';}).join('')+'</div><label for="why">¿Por qué?</label><textarea id="why" data-inp="why">'+esc(S.why)+'</textarea></div></section>';
  h+='<section class="docsec" id="o-3"><h2>Reparta 100 puntos entre las 13 capacidades</h2><p class="muted">Más puntos = más valor para su entidad. La suma debe ser 100.</p><div class="card"><div class="grid2">'+
   CAPS.map(function(c,i){return '<div class="field" style="display:flex;gap:12px;align-items:center;margin:0"><label for="c'+i+'" style="margin:0;flex:1;font-weight:400"><span class="muted small">'+c.g+'</span><br>'+c.n+'</label><input type="number" min="0" max="100" id="c'+i+'" value="'+S.pts[i]+'" data-inp="pts" data-i="'+i+'" style="width:84px"></div>';}).join('')+'</div>'+
   '<p id="pts-total" role="status" class="'+(sum(S.pts)===100?'':'err')+'" style="font-weight:700;font-size:17px">'+ptsOut()+'</p><div class="toolbar"><button class="btn btn-primary" id="btn-save" data-act="savepts"'+(sum(S.pts)===100?'':' disabled')+'>Registrar reparto</button><button class="btn btn-secondary" id="btn-copy" data-act="copypts"'+(sum(S.pts)===100?'':' disabled')+'>Copiar resumen</button></div>'+
   (S.saved?'<div class="banner ok"><strong>Resumen (de mayor a menor):</strong><pre class="mono" style="white-space:pre-wrap;margin:6px 0 0">'+esc(summary())+'</pre></div>':'')+'</div>'+K.notesBox()+'</section></div>';
  return {layout:'desk',wrap:'none',body:h};
}
/* ---- Tablero ---- */
function t1(){
  var rows=ESTADOS.map(function(e,i){return '<tr><th scope="row" style="text-align:left;font-weight:600">'+e+'</th>'+HEAT[i].map(function(v){return '<td style="text-align:center;background:rgba(0,95,163,'+(v?(0.08+v*0.07):0)+');font-weight:700">'+(v||'')+'</td>';}).join('')+'<td style="text-align:center"><strong>'+sum(HEAT[i])+'</strong></td></tr>';}).join('');
  var casos=CASOS.map(function(c){return '<tr><td class="mono">'+c[0]+'</td><td>'+c[1]+'</td><td>'+c[2]+'</td><td><span class="badge '+(c[3]==='En arbitraje'?'plum':c[3]==='Nuevo'?'':'gray')+'">'+c[3]+'</span></td><td>'+c[4]+'</td><td><button class="btn btn-secondary sm" data-act="caso" data-id="'+c[0]+'">Abrir</button></td></tr>';}).join('');
  var h=bar('t1')+'<div class="wrapd"><h1>Tablero operativo</h1><p class="lead">Casos abiertos entre entidades del ecosistema. Datos ficticios.</p>'+
   '<div class="grid4"><div class="kpi"><div class="n">47</div><div class="l">Casos abiertos</div></div><div class="kpi"><div class="n">$842.300.000</div><div class="l">Pérdidas evitadas este mes</div></div><div class="kpi"><div class="n">$316.750.000</div><div class="l">Montos en recuperación</div></div><div class="kpi"><div class="n">2,4 días</div><div class="l">Tiempo medio de resolución</div></div></div>'+
   '<h2 style="margin:24px 0 8px">Casos por estado y antigüedad</h2><div class="card" style="padding:6px"><table class="dtable" style="width:100%"><thead><tr><th>Estado</th>'+ANT.map(function(a){return '<th style="text-align:center">'+a+'</th>';}).join('')+'<th style="text-align:center">Total</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
   '<h2 style="margin:24px 0 8px">Casos recientes</h2><div class="tscroll"><table class="dtable"><thead><tr><th>Caso</th><th>Descripción</th><th>Entidades</th><th>Estado</th><th>Antigüedad</th><th></th></tr></thead><tbody>'+casos+'</tbody></table></div></div>';
  return {layout:'desk',wrap:'none',body:h};
}
function t2(){
  var S=K.S;
  var tl='<ol class="tl">'+LINEA.map(function(l){return '<li><span class="dot '+l[2]+'">'+(l[2]==='ok'?'✓':'!')+'</span><h3 style="font-size:14px" class="muted">'+l[0]+'</h3><p style="margin:0">'+l[1]+'</p></li>';}).join('')+'</ol>';
  var h=bar('t2')+'<div class="wrapd"><p><button class="link" data-act="nav" data-to="t1">← Volver a los casos</button></p><p class="eyebrow">Caso interbancario</p><h1>'+S.caso+' · Transferencia fraudulenta</h1>'+
   '<div class="side"><div><div class="card"><h3 style="margin-top:0">Línea de tiempo</h3>'+tl+'</div>'+
   '<div class="card"><h3 style="margin-top:0">Evidencia presentada</h3><div class="grid2"><div><strong>Banco Andino (denunciante)</strong><ul><li>Reporte de la cliente a las 14:55</li><li>Registro de un dispositivo nuevo al momento de la transferencia</li><li>2 alertas de riesgo previas sin atender</li></ul></div><div><strong>Banco del Pacífico Digital (receptor)</strong><ul><li>Declaración del titular: venta de un bien</li><li>Sin soporte de la venta</li><li>Cuenta abierta hace 9 días</li></ul></div></div></div></div>'+
   '<div><div class="card"><h3 style="margin-top:0">Resumen</h3>'+K.row('Monto disputado','<strong>'+money(4850000)+'</strong>')+K.row('Congelado',money(4120000))+K.row('Ya retirado',money(730000))+K.row('Plazo de decisión','72 horas hábiles')+K.row('Decisión tomada en','2 días')+'</div>'+
   '<div class="banner" style="border-color:var(--blue)"><strong>Decisión de ACH como árbitro</strong><p style="margin:6px 0 0">Devolver <strong>$4.120.000</strong> a Banco Andino. Los <strong>$730.000</strong> retirados quedan en seguimiento. Fundamento: la contraparte no presentó soporte de la venta y la cuenta tenía 9 días de antigüedad.</p></div>'+
   '<div class="survey"><h3>¿Aceptaría esta decisión?</h3><div class="chips" role="group" aria-label="Aceptación">'+['Sí','Sí, con condiciones','No'].map(function(x){return '<button class="chip" data-act="acepta" data-id="'+x+'" aria-pressed="'+(S.acepta===x)+'">'+x+'</button>';}).join('')+'</div>'+
   (S.acepta&&S.acepta!=='Sí'?'<p style="margin:12px 0 4px"><strong>Condiciones que necesitaría:</strong></p>'+COND.map(function(c,i){return '<label class="switch"><input type="checkbox" data-inp="cond" data-i="'+i+'"'+(S.conds[i]?' checked':'')+'> '+c+'</label>';}).join(''):'')+'</div></div></div></div>';
  return {layout:'desk',wrap:'none',body:h};
}
function t3(){
  var S=K.S;
  var steps=REC.map(function(r,i){return '<li><span class="dot '+(i<S.rec?'ok':i===S.rec?'warn':'wait')+'">'+(i<S.rec?'✓':i+1)+'</span><h3>'+r+'</h3><p class="muted small" style="margin:0">'+(i<S.rec?'Completado':i===S.rec?'Pendiente de la otra entidad':'')+'</p></li>';}).join('');
  var rows=[['REC-0412','Congelamiento','Banco del Pacífico Digital','$4.120.000','Fondos congelados'],['REC-0409','Devolución','Cooperativa Valle Unido','$1.450.000','Devuelto'],['REC-0415','Congelamiento','Banco Andino','$310.000','Solicitada'],['REC-0401','Devolución','Banco del Pacífico Digital','$2.880.000','Rechazada: fondos ya retirados']];
  var h=bar('t3')+'<div class="wrapd"><h1>Recuperación automatizada</h1><p class="lead">Solicitudes de congelamiento y devolución entre entidades, con su estado en tiempo real.</p>'+
   '<div class="side"><div class="tscroll"><table class="dtable"><thead><tr><th>Solicitud</th><th>Tipo</th><th>Entidad</th><th class="num">Monto</th><th>Estado</th></tr></thead><tbody>'+rows.map(function(r){return '<tr><td class="mono">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td class="num">'+r[3]+'</td><td><span class="badge '+(/Rechazada/.test(r[4])?'err':/Devuelto/.test(r[4])?'ok':'warn')+'">'+r[4]+'</span></td></tr>';}).join('')+'</tbody></table></div>'+
   '<div class="card"><h3 style="margin-top:0">Caso '+S.caso+' · recuperación de $4.120.000</h3><ol class="tl">'+steps+'</ol><button class="btn btn-secondary" data-act="avanza"'+(S.rec>=REC.length?' disabled':'')+'>'+(S.rec>=REC.length?'Recuperación completada':'Simular siguiente estado')+'</button></div></div></div>';
  return {layout:'desk',wrap:'none',body:h};
}

K.run({
  id:'e1',title:'E1 · Niveles de servicio antifraude',layout:'desk',
  params:[],state:fresh,start:function(){return 'o1';},
  views:[{label:'Oferta',to:'o1',re:'^o'},{label:'Tablero',to:'t1',re:'^t'}],
  labels:{o1:'Oferta completa',t1:'T1 Tablero de casos',t2:'T2 Caso interbancario',t3:'T3 Recuperación'},
  groups:[['Oferta',['o1']],['Tablero',['t1','t2','t3']]],
  routes:{o1:o1,t1:t1,t2:t2,t3:t3},
  acts:{
    nivel:function(el){K.S.nivel=el.dataset.id;K.log('nivel_elegido',{nivel:el.dataset.id});K.rerender();},
    savepts:function(){var S=K.S;if(sum(S.pts)!==100){K.vErr(['suma_100']);return;}S.saved=true;var o={};CAPS.forEach(function(c,i){if(S.pts[i])o[c.n]=S.pts[i];});K.log('reparto_100',o);K.rerender();},
    copypts:function(){if(sum(K.S.pts)!==100)return;K.log('copia_reparto');K.copy('Reparto de 100 puntos entre capacidades antifraude\n'+summary(),'Resumen copiado');},
    caso:function(el){K.S.caso=el.dataset.id;K.go('t2');},
    acepta:function(el){K.S.acepta=el.dataset.id;K.log('decision_arbitraje',{respuesta:el.dataset.id});K.rerender();},
    avanza:function(){var S=K.S;if(S.rec<REC.length){S.rec++;K.log('recuperacion_estado',{estado:REC[Math.min(S.rec,REC.length)-1]});}K.rerender();}
  },
  inps:{
    price:function(el,ty){var S=K.S,v=+String(el.value).replace(/\D/g,'')||0;S.price[+el.dataset.i][+el.dataset.k]=v;K.html('cost-out',costOut());if(ty==='change'){K.log('precio_editado',{nivel:NIV[+el.dataset.i][0],campo:el.dataset.k==='0'?'mensualidad':'por_transaccion',valor:v});K.rerender();}},
    vol:function(el){var S=K.S;S.vol=+el.value;K.setTxt('vol-l',fmtN(S.vol));K.html('cost-out',costOut());},
    why:function(el,ty){K.S.why=el.value;if(ty==='change')K.log('justificacion_nivel',{texto:el.value.slice(0,200)});},
    pts:function(el,ty){var S=K.S,v=Math.max(0,Math.min(100,Math.round(+el.value||0)));S.pts[+el.dataset.i]=v;S.saved=false;
      var t=document.getElementById('pts-total'),ok=sum(S.pts)===100;if(t){t.textContent=ptsOut();t.className=ok?'':'err';}
      ['btn-save','btn-copy'].forEach(function(id){var b=document.getElementById(id);if(b)b.disabled=!ok;});
      if(ty==='change'&&!ok)K.vErr(['suma_distinta_100:'+sum(S.pts)]);},
    cond:function(el,ty){if(ty!=='change')return;var S=K.S;S.conds[el.dataset.i]=el.checked;K.log('condicion_arbitraje',{condicion:COND[+el.dataset.i],activa:el.checked});}
  }
});
