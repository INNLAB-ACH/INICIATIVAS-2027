/* B1 · Request to Pay — portal de la empresa (escritorio) y app del banco del pagador (celular). Estado compartido en localStorage. */
var esc=K.esc,money=K.money,I=K.I;
var KEY='ach_b1_estado_compartido';
var EMP='Colegio San Mateo',EMP2='Servicios Integrales del Norte SAS',BANK='Banco Andino';
var HOY='12/10/2026';
var TOPE_MOT=['Ya lo pagué por otro medio','El valor no es correcto','No es el momento de pagar','Otro motivo'];

/* ---------- Estado compartido ---------- */
function rq(id,emp,payer,llave,concepto,valor,limite,ref,estado,tl,extra){var o={id:id,emp:emp,payer:payer,llave:llave,concepto:concepto,valor:valor,limite:limite,ref:ref,parcial:'no',estado:estado,tl:tl,motivo:'',medio:'',pagadoEn:''};for(var k in (extra||{}))o[k]=extra[k];return o;}
function seeds(){
  return {seq:1013,blocked:{},lotes:[],reqs:[
    rq('R-1001',EMP,'Laura Gómez','@laura.gomez','Pensión octubre',620000,'05/10/2026','FAC-2026-0912','pagada',[['Creada','28/09/2026 · 09:00'],['Notificada','28/09/2026 · 09:01'],['Vista','29/09/2026 · 18:20'],['Pagada','04/10/2026 · 08:14']],{medio:'PSE · Banco Andino',pagadoEn:'04/10/2026'}),
    rq('R-1002',EMP,'Camilo Torres','@camilo.torres','Pensión octubre',620000,'05/10/2026','FAC-2026-0913','pagada',[['Creada','28/09/2026 · 09:00'],['Notificada','28/09/2026 · 09:01'],['Pagada','02/10/2026 · 20:41']],{medio:'Bre-B',pagadoEn:'02/10/2026'}),
    rq('R-1003',EMP,'Marta Pineda','@marta.pineda','Pensión octubre',620000,'05/10/2026','FAC-2026-0914','pagada',[['Creada','28/09/2026 · 09:00'],['Notificada','28/09/2026 · 09:01'],['Pagada','05/10/2026 · 07:50']],{medio:'PSE · Banco Andino',pagadoEn:'05/10/2026'}),
    rq('R-1004',EMP,'Andrés Cano','@andres.cano','Pensión octubre',620000,'05/10/2026','FAC-2026-0915','pagada',[['Creada','28/09/2026 · 09:00'],['Notificada','28/09/2026 · 09:01'],['Pagada','06/10/2026 · 12:05']],{medio:'PSE · Banco Cordillera',pagadoEn:'06/10/2026'}),
    rq('R-1005',EMP,'Diana Ríos','@diana.rios','Pensión octubre',620000,'05/10/2026','FAC-2026-0916','vencida',[['Creada','28/09/2026 · 09:00'],['Notificada','28/09/2026 · 09:01'],['Vista','30/09/2026 · 11:12']]),
    rq('R-1006',EMP,'Julián Mora','@julian.mora','Pensión octubre',620000,'05/10/2026','FAC-2026-0917','vencida',[['Creada','28/09/2026 · 09:00'],['Notificada','28/09/2026 · 09:01']]),
    rq('R-1007',EMP,'Laura Gómez','@laura.gomez','Transporte escolar octubre',180000,'05/10/2026','FAC-2026-0925','pagada',[['Creada','28/09/2026 · 09:05'],['Notificada','28/09/2026 · 09:06'],['Pagada','04/10/2026 · 08:15']],{medio:'PSE · Banco Andino',pagadoEn:'04/10/2026'}),
    rq('R-1008',EMP,'Camilo Torres','@camilo.torres','Transporte escolar octubre',180000,'05/10/2026','FAC-2026-0926','pagada',[['Creada','28/09/2026 · 09:05'],['Notificada','28/09/2026 · 09:06'],['Pagada','02/10/2026 · 20:42']],{medio:'Bre-B',pagadoEn:'02/10/2026'}),
    rq('R-1009',EMP,'Marta Pineda','@marta.pineda','Salida pedagógica',95000,'09/10/2026','FAC-2026-0931','rechazada',[['Creada','01/10/2026 · 10:00'],['Notificada','01/10/2026 · 10:01'],['Vista','02/10/2026 · 19:30'],['Rechazada','02/10/2026 · 19:31']],{motivo:'Ya lo pagué por otro medio'}),
    rq('R-1010',EMP,'Andrés Cano','@andres.cano','Uniformes',240000,'20/10/2026','FAC-2026-0940','notificada',[['Creada','07/10/2026 · 15:00'],['Notificada','07/10/2026 · 15:01']]),
    rq('R-1011',EMP,'Laura Gómez','@laura.gomez','Pensión noviembre',620000,'05/11/2026','FAC-2026-1002','notificada',[['Creada','12/10/2026 · 10:30'],['Notificada','12/10/2026 · 10:31']]),
    rq('R-1012',EMP,'Diana Ríos','@diana.rios','Actividad deportiva',70000,'22/10/2026','FAC-2026-0944','vista',[['Creada','08/10/2026 · 09:00'],['Notificada','08/10/2026 · 09:01'],['Vista','09/10/2026 · 21:03']]),
    rq('U-2001',EMP2,'Laura Gómez','@laura.gomez','Cobro de gestión administrativa',1480000,'15/10/2026','SIN-7781','notificada',[['Creada','12/10/2026 · 08:55'],['Notificada','12/10/2026 · 08:56']],{noConocida:true})
  ]};
}
function load(){try{var s=JSON.parse(localStorage.getItem(KEY));if(s&&s.reqs)return s;}catch(_){}return null;}
function save(){try{localStorage.setItem(KEY,JSON.stringify(K.S.sh));}catch(_){}}
function fresh(p){
  var init=!K.S,sh=init?load():null;
  if(!sh){sh=seeds();try{localStorage.setItem(KEY,JSON.stringify(sh));}catch(_){}}
  return {sh:sh,sel:'R-1011',t0:0,tCrea:0,tConc:0,f:'',carga:null,q:'',pay:null};
}
function reqs(){return K.S.sh.reqs;}
function R(id){return reqs().filter(function(r){return r.id===id;})[0];}
function mine(){return reqs().filter(function(r){return r.emp===EMP;});}
function addTl(r,e){r.tl.push([e,HOY+' · '+K.ftime(new Date())]);}
function stLabel(r){return {pagada:'Pagada',vencida:'Vencida',rechazada:'Rechazada',notificada:'Notificada',vista:'Vista',programada:'Programada',reportada:'Reportada'}[r.estado];}
function stBadge(r){var c={pagada:'ok',vencida:'err',rechazada:'err',reportada:'warn',programada:'plum',vista:'',notificada:''}[r.estado];return '<span class="badge '+(c||'')+'">'+stLabel(r)+(r.estado==='programada'?' · '+r.limite:'')+'</span>';}

/* ---------- Empresa (escritorio) ---------- */
function ebar(cur){return K.dhead({title:EMP+' · Cobros',mark:K.mark('C'),nav:[{label:'Tablero',to:'e1',cur:cur==='e1'||cur==='e4'},{label:'Crear solicitud',to:'e2',cur:cur==='e2'},{label:'Carga masiva',to:'e3',cur:cur==='e3'},{label:'Conciliación',to:'e5',cur:cur==='e5'}],right:'<span class="small muted">Request to Pay</span>'});}
function ep(cur,body){return {layout:'desk',bar:ebar(cur),wrap:'wrapd',body:body};}
function sum(a){return a.reduce(function(x,r){return x+r.valor;},0);}
function e1(){
  var S=K.S,rs=mine(),f=S.f,loteN=S.sh.lotes.reduce(function(a,l){return a+l.n;},0),loteV=S.sh.lotes.reduce(function(a,l){return a+l.v;},0);
  var pag=rs.filter(function(r){return r.estado==='pagada';}),ven=rs.filter(function(r){return r.estado==='vencida';}),rec=rs.filter(function(r){return r.estado==='rechazada';}),pen=rs.filter(function(r){return r.estado!=='pagada'&&r.estado!=='vencida'&&r.estado!=='rechazada';});
  var list=rs.filter(function(r){return !f||(f==='pendiente'?(r.estado!=='pagada'&&r.estado!=='vencida'&&r.estado!=='rechazada'):r.estado===f);}).slice().reverse();
  function kpi(l,n,v,c){return '<div class="kpi" style="border-left:5px solid '+c+'"><div class="l">'+l+'</div><div class="n">'+n+'</div><div class="small muted">'+money(v)+'</div></div>';}
  return ep('e1','<p class="eyebrow">Octubre y noviembre de 2026</p><h1>Tablero de cobros</h1><div class="grid4">'+kpi('Emitidos',rs.length+loteN,sum(rs)+loteV,'var(--blue)')+kpi('Pagados',pag.length,sum(pag),'var(--ok)')+kpi('Vencidos',ven.length,sum(ven),'var(--err)')+kpi('Rechazados',rec.length,sum(rec),'var(--amber)')+'</div>'+
   (loteN?'<p class="muted small">Incluye '+loteN+' cobros de cargas masivas.</p>':'')+
   '<div class="toolbar" style="margin-top:18px;justify-content:space-between"><h2 style="margin:0">Solicitudes</h2><div style="display:flex;gap:8px;align-items:center"><label for="ff" style="margin:0" class="small">Estado</label><select id="ff" data-inp="ef" style="width:auto;min-height:44px"><option value="">Todos</option>'+[['pendiente','Por pagar'],['pagada','Pagada'],['vencida','Vencida'],['rechazada','Rechazada'],['programada','Programada'],['reportada','Reportada']].map(function(o){return '<option value="'+o[0]+'"'+(f===o[0]?' selected':'')+'>'+o[1]+'</option>';}).join('')+'</select><button class="btn btn-primary sm" data-act="nav" data-to="e2">Crear solicitud</button></div></div>'+
   '<div class="tscroll"><table class="dtable"><thead><tr><th>Solicitud</th><th>Pagador</th><th>Concepto</th><th>Vence</th><th class="num">Valor</th><th>Estado</th><th></th></tr></thead><tbody>'+list.map(function(r){return '<tr><td class="mono">'+r.id+'</td><td>'+esc(r.payer)+'</td><td>'+esc(r.concepto)+'</td><td>'+r.limite+'</td><td class="num">'+money(r.valor)+'</td><td>'+stBadge(r)+'</td><td><button class="btn btn-secondary sm" data-act="detalle" data-id="'+r.id+'">Ver</button></td></tr>';}).join('')+'</tbody></table></div>');
}
function e2(){
  var S=K.S;if(!S.tCrea){S.tCrea=Date.now();}
  var ref='FAC-2026-'+(1003+S.sh.seq-1013);
  return ep('e2','<p><button class="link" data-act="nav" data-to="e1">← Volver al tablero</button></p><h1>Crear solicitud de pago</h1><div class="side"><div class="card"><div class="field"><label for="cp">Pagador (identificación o llave)</label><input type="text" id="cp" placeholder="Ej. 52.847.119 o @laura.gomez" autocomplete="off" data-inp="payer"><p class="hint" id="cp-h" aria-live="polite"></p><p class="err" id="e-cp" role="alert"></p></div>'+
   '<div class="field"><label for="cc">Concepto</label><input type="text" id="cc" value="Pensión noviembre"></div><div class="grid2"><div class="field"><label for="cv">Valor</label><input type="text" inputmode="numeric" id="cv" value="620.000"><p class="err" id="e-cv" role="alert"></p></div><div class="field"><label for="cl">Fecha límite</label><input type="date" id="cl" value="2026-11-05"></div></div>'+
   '<div class="field"><label for="cr">Referencia de factura</label><input type="text" id="cr" value="'+ref+'"></div><fieldset><legend>¿Permitir pago parcial?</legend><div class="chips"><label class="chip" style="display:inline-flex;align-items:center;gap:8px"><input type="radio" name="parcial" value="no" checked> No</label><label class="chip" style="display:inline-flex;align-items:center;gap:8px"><input type="radio" name="parcial" value="si"> Sí</label></div></fieldset>'+
   '<div class="toolbar" style="margin-top:16px"><button class="btn btn-primary" data-act="crear">Enviar solicitud</button><button class="btn btn-secondary" data-act="nav" data-to="e1">Cancelar</button></div></div><div class="note-side"><h3>Cómo funciona</h3><p style="margin:0">El pagador recibe una notificación en la app de su banco y decide si paga ahora, programa el pago o rechaza. Verás el estado aquí en tiempo real.</p></div></div>');
}
function e3(){
  var S=K.S,c=S.carga;
  if(!c)return ep('e3','<p><button class="link" data-act="nav" data-to="e1">← Volver al tablero</button></p><h1>Carga masiva</h1><p class="lead">Sube un archivo con los pagadores, el concepto, el valor y la fecha límite. Revisamos los datos antes de enviar las solicitudes.</p><div class="card center" style="border:2px dashed var(--blue-l)"><p class="muted">Formato: identificación, concepto, valor, fecha límite (CSV)</p><button class="btn btn-primary" data-act="cargar">Cargar archivo de ejemplo (cobros_noviembre.csv)</button><p class="small muted">Archivo simulado con 120 registros</p></div>');
  var bad=c.errs.filter(function(e){return !e.ok;});
  return ep('e3','<p><button class="link" data-act="nav" data-to="e1">← Volver al tablero</button></p><h1>Archivo cargado: 120 registros</h1><div class="grid3"><div class="kpi"><div class="n">'+(120-bad.length)+'</div><div class="l">Correctos</div></div><div class="kpi"><div class="n" style="color:'+(bad.length?'var(--err)':'var(--ok)')+'">'+bad.length+'</div><div class="l">Con error</div></div><div class="kpi"><div class="n">'+money((120-bad.length)*620000)+'</div><div class="l">Valor a cobrar</div></div></div>'+
   (bad.length?'<div class="banner err" style="margin-top:14px">Corrige los registros con error o envía solo los correctos.</div>':'<div class="banner ok" style="margin-top:14px">Todo correcto.</div>')+
   '<div class="card" style="padding:6px 16px"><table class="dtable" style="width:100%"><thead><tr><th>Fila</th><th>Identificación</th><th>Problema</th><th>Corrección</th></tr></thead><tbody>'+c.errs.map(function(e,i){return '<tr><td>'+e.fila+'</td><td class="mono">'+esc(e.valor)+'</td><td>'+(e.ok?'<span class="badge ok">Corregido</span>':'<span class="badge err">'+e.msg+'</span>')+'</td><td>'+(e.ok?'—':'<input type="text" data-inp="fixcarga" data-i="'+i+'" placeholder="Identificación válida" style="min-height:40px;max-width:200px" aria-label="Corrección fila '+e.fila+'">')+'</td></tr>';}).join('')+'</tbody></table></div>'+
   '<div class="toolbar" style="margin-top:14px"><button class="btn btn-primary" data-act="enviarLote">Enviar '+(120-bad.length)+' solicitudes</button></div>');
}
function e4(){
  var r=R(K.S.sel)||mine()[0];
  return ep('e4','<p><button class="link" data-act="nav" data-to="e1">← Volver al tablero</button></p><p class="eyebrow">'+r.id+'</p><div class="toolbar"><h1 style="margin:0">'+esc(r.concepto)+'</h1>'+stBadge(r)+'</div><div class="side"><div class="card">'+K.row('Pagador',esc(r.payer)+' · '+esc(r.llave))+K.row('Valor','<strong>'+money(r.valor)+'</strong>')+K.row('Fecha límite',r.limite)+K.row('Referencia de factura',r.ref)+K.row('Pago parcial',r.parcial==='si'?'Permitido':'No permitido')+(r.medio?K.row('Medio de pago',esc(r.medio)):'')+(r.motivo?K.row('Motivo',esc(r.motivo)):'')+'</div>'+
   '<div class="card"><h3 style="margin-top:0">Línea de tiempo</h3><ol class="tl">'+r.tl.map(function(t,i){var last=i===r.tl.length-1,c=/Pagada/.test(t[0])?'ok':/Rechazada|Reportada/.test(t[0])?'warn':'ok';return '<li><span class="dot '+c+'">✓</span><h3 style="font-size:15px;margin:0">'+t[0]+'</h3><p class="muted small" style="margin:0">'+t[1]+'</p></li>';}).join('')+(r.estado==='notificada'||r.estado==='vista'?'<li><span class="dot wait">…</span><h3 style="font-size:15px;margin:0" class="muted">Pago pendiente</h3></li>':'')+'</ol></div></div>');
}
function e5(){
  var S=K.S;if(!S.tConc)S.tConc=Date.now();
  var q=K.norm(S.q),rows=mine().filter(function(r){return r.estado==='pagada'&&(!q||K.norm(r.payer+' '+r.ref+' '+r.concepto).indexOf(q)>=0);});
  return ep('e5','<h1>Conciliación</h1><p class="lead">Pagos recibidos con la referencia de la factura.</p><div class="toolbar"><label for="cq" class="sr">Buscar</label><input type="search" id="cq" placeholder="Buscar por pagador, factura o concepto" value="'+esc(S.q)+'" data-inp="cq" style="max-width:380px"><button class="btn btn-secondary sm" data-act="exportar">'+I.download+' Exportar</button></div><p class="muted small" id="cn">'+rows.length+' pagos · '+money(sum(rows))+'</p>'+
   '<div class="tscroll"><table class="dtable"><thead><tr><th>Fecha</th><th>Pagador</th><th>Concepto</th><th>Factura</th><th>Medio</th><th class="num">Valor</th><th></th></tr></thead><tbody id="ctb">'+concRows(rows)+'</tbody></table></div>');
}
function concRows(rows){return rows.map(function(r){return '<tr><td>'+(r.pagadoEn||'—')+'</td><td>'+esc(r.payer)+'</td><td>'+esc(r.concepto)+'</td><td class="mono">'+r.ref+'</td><td>'+esc(r.medio)+'</td><td class="num">'+money(r.valor)+'</td><td><button class="btn btn-secondary sm" data-act="verFacturaE" data-id="'+r.id+'">Ver factura</button></td></tr>';}).join('')||'<tr><td colspan="7" class="muted">Sin resultados.</td></tr>';}
function facturaHtml(r){return '<div class="printable" style="padding:16px"><strong>Factura electrónica '+r.ref+'</strong><p class="small muted" style="margin:4px 0 8px">'+esc(r.emp)+' · NIT 900.555.212-4</p>'+K.row('Cliente',esc(r.payer))+K.row('Concepto',esc(r.concepto))+K.row('Valor',money(r.valor))+K.row('CUFE','7c1e…b94a (ficticio)')+'</div>';}

/* ---------- Pagador (celular) ---------- */
function pbar(back,title,right){return K.appbar({back:back,title:title||BANK,cls:'bank',mark:'<span class="bmark" aria-hidden="true">B</span>',right:right||''});}
function inbox(){return reqs().filter(function(r){return r.payer==='Laura Gómez'&&!K.S.sh.blocked[r.emp];});}
function p1(){
  return {bar:'',wrap:'none',body:'<div style="background:var(--navy);color:#fff;flex:1;padding:56px 18px 24px;display:flex;flex-direction:column;gap:18px"><div style="text-align:center"><div style="font-family:Manrope,sans-serif;font-weight:800;font-size:58px;line-height:1">10:31</div><div style="color:#C9D7E3">lunes 12 de octubre</div></div>'+
   '<button data-act="abrirNoti" style="text-align:left;background:#fff;color:var(--ink);border:0;border-radius:18px;padding:12px 14px;cursor:pointer;min-height:44px" aria-label="Abrir notificación de '+BANK+'"><div class="small muted" style="display:flex;justify-content:space-between"><strong>'+BANK+'</strong><span>ahora</span></div><div style="font-weight:700;margin-top:2px">Solicitud de pago</div><div>'+EMP+' te envió una solicitud de pago por <strong>$620.000</strong></div></button><p style="text-align:center;color:#C9D7E3;font-size:14px">Toca la notificación para abrirla</p></div>'};
}
function p2(){
  var l=inbox();
  return {bar:pbar(null,'Solicitudes de pago','<button class="iconbtn" data-act="nav" data-to="p6" aria-label="Ajustes" style="color:#fff">'+I.chev+'</button>'),body:'<h1>Solicitudes de pago</h1><div class="card" style="padding:4px 16px"><ul class="list">'+(l.map(function(r){return '<li><div class="grow"><strong>'+esc(r.emp)+'</strong><div class="small muted">'+esc(r.concepto)+' · vence '+r.limite+'</div></div><div style="text-align:right"><strong>'+money(r.valor)+'</strong><div>'+stBadge(r)+'</div></div><button class="btn btn-secondary sm" data-act="abrir" data-id="'+r.id+'" aria-label="Abrir '+esc(r.concepto)+'">Abrir</button></li>';}).join('')||'<li class="muted">No tienes solicitudes.</li>')+'</ul></div>'};
}
function p3(){
  var r=R(K.S.sel);if(!r||K.S.sh.blocked[r.emp])return p2();
  var open=r.estado==='notificada'||r.estado==='vista';
  var desc=r.noConocida?'<div class="notice warn"><strong>Esta empresa no está verificada.</strong> No tienes relación previa con ella en tu banco.</div>':'<div class="card" style="display:flex;gap:10px;align-items:center;background:var(--ok-bg);border-color:#B9DCC6"><span class="badge ok">'+I.check+' Empresa verificada</span><span class="small">Sello de '+BANK+'</span></div>';
  return {bar:pbar('p2','Solicitud'),body:desc+'<h1>'+esc(r.emp)+'</h1><p class="amount" style="margin:0 0 8px">'+money(r.valor)+'</p><div class="card">'+K.row('Concepto',esc(r.concepto))+K.row('Fecha límite','<strong>'+r.limite+'</strong>')+K.row('Referencia',r.ref)+K.row('Estado',stBadge(r))+(r.parcial==='si'?K.row('Pago parcial','Permitido'):'')+'</div><button class="link" data-act="verFacturaP" data-id="'+r.id+'">Ver factura</button>',
    foot:open?'<button class="btn btn-primary" data-act="pagar" data-id="'+r.id+'">Pagar ahora</button><button class="btn btn-secondary" data-act="programar" data-id="'+r.id+'">Programar para la fecha límite</button><button class="btn btn-secondary" data-act="rechazar" data-id="'+r.id+'">Rechazar</button><button class="link" data-act="noReconozco" data-id="'+r.id+'" style="color:var(--err)">No reconozco esta solicitud</button>':'<button class="btn btn-secondary" data-act="nav" data-to="p2">Volver a mis solicitudes</button>'};
}
function p5(){
  var r=R(K.S.sel),pay=K.S.pay||{};
  return {bar:pbar(null,'Pago aprobado'),body:'<div class="center">'+I.ok+'<h1>Pago exitoso</h1><p class="muted">'+money(r.valor)+' a '+esc(r.emp)+'</p></div><div class="card">'+K.row('Concepto',esc(r.concepto))+K.row('Referencia de factura',r.ref)+K.row('Comprobante','ACH-'+(pay.comp||'—'))+K.row('Fecha',HOY+' · '+K.ftime(new Date()))+K.row('Medio','PSE · '+BANK+' •••• 4821')+'</div>',foot:'<button class="btn btn-primary" data-act="nav" data-to="p2">Volver a mis solicitudes</button>'};
}
function p6(){
  var emps=[];reqs().forEach(function(r){if(r.payer==='Laura Gómez'&&emps.indexOf(r.emp)<0)emps.push(r.emp);});
  return {bar:pbar('p2','Ajustes'),body:'<h1>Empresas autorizadas</h1><p class="muted">Estas empresas pueden enviarte solicitudes de pago. Puedes bloquear a las que no quieras.</p><div class="card" style="padding:4px 16px"><ul class="list">'+emps.map(function(e){var b=K.S.sh.blocked[e];return '<li><div class="grow"><strong>'+esc(e)+'</strong><div class="small muted">'+(b?'Bloqueada':'Puede enviarte solicitudes')+'</div></div><button class="btn '+(b?'btn-secondary':'btn-danger')+' sm" data-act="bloquear" data-id="'+esc(e)+'">'+(b?'Desbloquear':'Bloquear')+'</button></li>';}).join('')+'</ul></div>'};
}

K.run({
  id:'b1',title:'B1 · Request to Pay',layout:'desk',
  params:[{k:'vista',label:'Vista inicial',def:'empresa',opts:[['empresa','Empresa · escritorio'],['pagador','Pagador · celular (app de Banco Andino)']]}],
  views:[{label:'Empresa · escritorio',to:'e1',re:'^e'},{label:'Pagador · celular',to:'p1',re:'^p'}],
  state:fresh,start:function(p){return p.vista==='pagador'?'p1':'e1';},
  codes:{e1:'E1',e2:'E2',e3:'E3',e4:'E4',e5:'E5',p1:'P1',p2:'P2',p3:'P3',p5:'P5',p6:'P6'},
  labels:{e1:'E1 Tablero',e2:'E2 Crear solicitud',e3:'E3 Carga masiva',e4:'E4 Detalle',e5:'E5 Conciliación',p1:'P1 Notificación',p2:'P2 Bandeja',p3:'P3 Detalle y acciones',p5:'P5 Comprobante',p6:'P6 Ajustes'},
  groups:[['Empresa',['e1','e2','e3','e4','e5']],['Pagador',['p1','p2','p3','p5','p6']]],
  routes:{
    e1:e1,e2:e2,e3:e3,e4:e4,e5:e5,
    p1:function(){var d=p1();d.layout='phone';return d;},p2:function(){var d=p2();d.layout='phone';return d;},p3:function(){var d=p3();d.layout='phone';return d;},p5:function(){var d=p5();d.layout='phone';return d;},p6:function(){var d=p6();d.layout='phone';return d;}
  },
  acts:{
    detalle:function(el){K.S.sel=el.dataset.id;K.go('e4');},
    crear:function(){
      var S=K.S,p=document.getElementById('cp').value.trim(),v=+String(document.getElementById('cv').value).replace(/\D/g,'')||0,bad=[];
      if(!p){K.setErr('e-cp','Escribe la identificación o la llave del pagador.','cp');bad.push('pagador');}
      if(v<1000){K.setErr('e-cv','Escribe un valor válido.','cv');bad.push('valor');}
      if(bad.length){K.vErr(bad);return;}
      var lau=/laura|52\.?847\.?119/i.test(p),id='R-'+(S.sh.seq++);
      var lim=document.getElementById('cl').value.split('-').reverse().join('/');
      var r=rq(id,EMP,lau?'Laura Gómez':'Pagador '+p,p,document.getElementById('cc').value||'Cobro',v,lim,document.getElementById('cr').value,'notificada',[['Creada',HOY+' · '+K.ftime(new Date())],['Notificada',HOY+' · '+K.ftime(new Date())]]);
      r.parcial=document.querySelector('input[name=parcial]:checked').value;
      S.sh.reqs.push(r);save();
      K.log('cobro_creado',{ms:Date.now()-S.tCrea,pagador_laura:lau,valor:v});S.tCrea=0;K.complete({fase:'crear_cobro'});K.toast('Solicitud enviada');S.sel=id;K.go('e4');
    },
    cargar:function(){var S=K.S;S.carga={errs:[{fila:17,valor:'1.000.12',msg:'Identificación incompleta',ok:false},{fila:58,valor:'@sin llave',msg:'Llave no válida',ok:false},{fila:94,valor:'—',msg:'Identificación vacía',ok:false}],t0:Date.now()};K.log('archivo_cargado',{registros:120,errores:3});K.rerender();},
    enviarLote:function(){var S=K.S,bad=S.carga.errs.filter(function(e){return !e.ok;}).length,n=120-bad;S.sh.lotes.push({n:n,v:n*620000});save();K.log('lote_enviado',{enviados:n,excluidos:bad,ms:Date.now()-S.carga.t0});S.carga=null;K.toast(n+' solicitudes enviadas');K.go('e1');},
    exportar:function(){var rows=mine().filter(function(r){return r.estado==='pagada';}).map(function(r){return [r.pagadoEn,r.payer,r.concepto,r.ref,r.medio,r.valor].join(',');});K.log('conciliacion_exportar');K.download('conciliacion_cobros.csv','fecha,pagador,concepto,factura,medio,valor\n'+rows.join('\n'),'text/csv;charset=utf-8');},
    verFacturaE:function(el){var r=R(el.dataset.id);K.log('ver_factura_empresa',{ref:r.ref,ms_desde_conciliacion:K.S.tConc?Date.now()-K.S.tConc:0});K.openSheet(K.sheetHead('Factura')+facturaHtml(r)+'<button class="btn btn-primary" style="margin-top:12px" data-act="closeSheet">Cerrar</button>');},
    abrirNoti:function(){var S=K.S;S.t0=Date.now();S.sel='R-1011';var r=R('R-1011');if(r.estado==='notificada'){r.estado='vista';addTl(r,'Vista');save();}K.log('notificacion_abierta');K.go('p3');},
    abrir:function(el){var S=K.S;S.sel=el.dataset.id;var r=R(S.sel);if(r.estado==='notificada'){r.estado='vista';addTl(r,'Vista');save();}if(!S.t0)S.t0=Date.now();K.go('p3');},
    verFacturaP:function(el){var r=R(el.dataset.id);K.log('ver_factura',{ref:r.ref});K.openSheet(K.sheetHead('Factura')+(r.noConocida?'<p class="muted">Esta empresa no adjuntó factura electrónica.</p>':facturaHtml(r))+'<button class="btn btn-primary" style="margin-top:12px" data-act="closeSheet">Cerrar</button>');},
    pagar:function(el){var S=K.S,r=R(el.dataset.id);K.log('accion_solicitud',{accion:'pagar_ahora',id:r.id});K.fingerprint().then(function(ok){if(!ok)return;S.pay={comp:K.rnd(9)};r.estado='pagada';r.medio='PSE · '+BANK;r.pagadoEn=HOY;addTl(r,'Pagada');save();K.log('pago_realizado',{id:r.id,ms_desde_notificacion:S.t0?Date.now()-S.t0:0});K.complete({accion:'pagar'});K.go('p5');});},
    programar:function(el){var r=R(el.dataset.id);r.estado='programada';addTl(r,'Pago programado para '+r.limite);save();K.log('accion_solicitud',{accion:'programar_fecha_limite',id:r.id});K.complete({accion:'programar'});K.openSheet(K.sheetHead('Pago programado')+'<div class="center">'+I.ok+'<p><strong>Pagaremos '+money(r.valor)+' el '+r.limite+'</strong> desde tu cuenta •••• 4821.</p></div><button class="btn btn-primary" data-act="irBandeja">Volver a mis solicitudes</button>');},
    irBandeja:function(){K.closeSheet();K.go('p2');},
    rechazar:function(el){K.openSheet(K.sheetHead('Rechazar solicitud')+'<fieldset><legend>Motivo</legend>'+TOPE_MOT.map(function(m,i){return '<label class="opt"><input type="radio" name="mot" value="'+esc(m)+'"'+(i===0?' checked':'')+'> '+m+'</label>';}).join('')+'</fieldset><button class="btn btn-danger" data-act="okRechazar" data-id="'+el.dataset.id+'">Rechazar solicitud</button>');},
    okRechazar:function(el){var r=R(el.dataset.id),m=document.querySelector('input[name=mot]:checked').value;r.estado='rechazada';r.motivo=m;addTl(r,'Rechazada');save();K.log('accion_solicitud',{accion:'rechazar',motivo:m,id:r.id});K.complete({accion:'rechazar'});K.closeSheet();K.go('p2');},
    noReconozco:function(el){K.openSheet(K.sheetHead('No reconozco esta solicitud')+'<p>Reportaremos esta solicitud a '+BANK+' y a la entidad que la envió. No se hará ningún pago.</p><label class="opt"><input type="checkbox" id="blk" checked> Bloquear a esta empresa para que no me envíe más solicitudes</label><button class="btn btn-danger" data-act="okReporte" data-id="'+el.dataset.id+'">Reportar solicitud</button>');},
    okReporte:function(el){var S=K.S,r=R(el.dataset.id),b=document.getElementById('blk').checked;r.estado='reportada';addTl(r,'Reportada por el pagador');if(b)S.sh.blocked[r.emp]=true;save();K.log('accion_solicitud',{accion:'no_reconozco',bloqueo:b,id:r.id});K.complete({accion:'reportar'});K.closeSheet();K.toast('Reporte enviado');K.go('p2');},
    bloquear:function(el){var S=K.S,e=el.dataset.id;S.sh.blocked[e]=!S.sh.blocked[e];save();K.log('empresa_'+(S.sh.blocked[e]?'bloqueada':'desbloqueada'),{empresa:e});K.rerender();}
  },
  inps:{
    ef:function(el,ty){if(ty!=='change')return;K.S.f=el.value;K.log('uso_filtro',{estado:el.value});K.rerender();},
    payer:function(el){var h=document.getElementById('cp-h'),v=el.value.trim();K.setErr('e-cp','','cp');if(h)h.textContent=/laura|52\.?847\.?119/i.test(v)?'Pagadora encontrada: Laura Gómez · cliente de '+BANK:(v?'Pagador sin banco verificado: recibirá la solicitud igualmente.':'');},
    cq:function(el,ty){var S=K.S;S.q=el.value;var q=K.norm(el.value),rows=mine().filter(function(r){return r.estado==='pagada'&&(!q||K.norm(r.payer+' '+r.ref+' '+r.concepto).indexOf(q)>=0);});K.html('ctb',concRows(rows));K.setTxt('cn',rows.length+' pagos · '+money(sum(rows)));if(ty==='change')K.log('busqueda_conciliacion',{texto:el.value});},
    fixcarga:function(el,ty){if(ty!=='change')return;var S=K.S,e=S.carga.errs[+el.dataset.i],v=el.value.trim();if(/^\d{1,3}(\.\d{3}){1,2}$|^@\w+/.test(v)){e.ok=true;K.log('error_corregido',{fila:e.fila});K.rerender();}else{el.style.borderColor='var(--err)';K.vErr(['carga_'+e.fila]);}}
  }
});
window.addEventListener('storage',function(e){if(e.key!==KEY)return;var s=load();if(!s)return;K.S.sh=s;if(['e1','e4','e5','p2','p3'].indexOf(K.cur)>=0)K.rerender();});
