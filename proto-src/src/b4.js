/* B4 · Facturación en un toque — comprador (celular) y caja (tableta). Estado compartido en localStorage. */
var esc=K.esc,money=K.money,I=K.I;
var KEY='ach_b4_estado_compartido';
var COM='Droguería Aurora',TOTAL=286400,HOY='12/10/2026';
var PERFIL={nombre:'Paula Restrepo',tipo:'Cédula de ciudadanía',doc:'1.000.000.001',correo:'paula@correo.co'};
var ITEMS=[['Acetaminofén 500 mg x 24',18900],['Crema hidratante 250 ml',52700],['Vitamina C 1000 mg x 60',67800],['Termómetro digital',38500],['Protector solar FPS 50',108500]];
var MEDIOS=['Efectivo','Tarjeta débito','Tarjeta crédito','Transferencia','PSE','Bre-B'];
var ELEC={PSE:1,'Bre-B':1,Transferencia:1,'Tarjeta débito':1,'Tarjeta crédito':1};
var EST={valida:['Válida','ok','Válida para la deducción del 1 %'],sin_medio:['Falta medio de pago','warn','No cuenta: el comercio registró pago en efectivo'],incompleta:['Datos incompletos','err','No cuenta: la factura no tiene tus datos completos']};

function F(id,com,val,fecha,estado,extra){var o={id:id,com:com,valor:val,fecha:fecha,estado:estado,cufe:'e41b…'+id.slice(-4)+' (ficticio)',medio:'PSE',ref:'',ver:false,corr:''};for(var k in (extra||{}))o[k]=extra[k];return o;}
function seeds(){
  return {cfg:{uvt:52374,topeUvt:240},perfilAuth:true,
    facturas:[F('FE-0001','Supermercado Los Álamos',1240000,'02/02/2026','valida',{ver:true,ref:'ACH 1A7C-094'}),F('FE-0002','Droguería Central',312500,'15/03/2026','valida'),F('FE-0003','Electro Hogar',2150000,'10/04/2026','valida',{ver:true,ref:'ACH 5D2E-310'}),F('FE-0004','Clínica Dental Sonría',980000,'22/05/2026','valida'),F('FE-0005','Librería Universal',418000,'03/07/2026','valida'),F('FE-0006','Tienda de Ropa Costa',1739500,'18/08/2026','valida',{ver:true,ref:'ACH 9B4F-772'}),
      F('FE-0007','Restaurante El Fogón',164000,'29/08/2026','sin_medio',{medio:'Efectivo'}),F('FE-0008','Papelería Alfa',97000,'12/09/2026','incompleta')],
    venta:{estado:'abierta',qr:null,scanned:false,pago:null,factId:null,t0:0},corrs:[]};
}
function load(){try{var s=JSON.parse(localStorage.getItem(KEY));if(s&&s.facturas)return s;}catch(_){}return null;}
function save(){try{localStorage.setItem(KEY,JSON.stringify(K.S.sh));}catch(_){}}
function fresh(p){
  var init=!K.S,sh=init?load():null;
  if(!sh){sh=seeds();try{localStorage.setItem(KEY,JSON.stringify(sh));}catch(_){}}
  return {sh:sh,f:'',medio:'Efectivo',ced:'',dian:null,nom:'',cor:'',medioTouched:false,ult:'',err:null,tab:'bandeja',tMed:0,pm:'PSE'};
}
function V(){return K.S.sh.venta;}
function tope(){var c=K.S.sh.cfg;return c.uvt*c.topeUvt;}
function acum(){return K.S.sh.facturas.filter(function(f){return f.estado==='valida';}).reduce(function(a,f){return a+f.valor;},0);}
function fact(id){return K.S.sh.facturas.filter(function(f){return f.id===id;})[0];}
function stBadge(f){var e=EST[f.estado];return '<span class="badge '+e[1]+'">'+e[0]+'</span>';}

/* ---------- QR simulado ---------- */
function qrSvg(code){
  var n=25,h=0,i,j;for(i=0;i<code.length;i++)h=(h*31+code.charCodeAt(i))|0;
  function rnd(){h=(h*1103515245+12345)&0x7fffffff;return h/0x7fffffff;}
  function finder(x,y){return '<rect x="'+x+'" y="'+y+'" width="7" height="7" fill="#0D1B2A"/><rect x="'+(x+1)+'" y="'+(y+1)+'" width="5" height="5" fill="#fff"/><rect x="'+(x+2)+'" y="'+(y+2)+'" width="3" height="3" fill="#0D1B2A"/>';}
  var cells='';for(i=0;i<n;i++)for(j=0;j<n;j++){var inF=(i<8&&j<8)||(i<8&&j>n-9)||(i>n-9&&j<8);if(!inF&&rnd()>0.52)cells+='<rect x="'+j+'" y="'+i+'" width="1" height="1" fill="#0D1B2A"/>';}
  return '<svg viewBox="-1 -1 '+(n+2)+' '+(n+2)+'" width="200" height="200" role="img" aria-label="Código QR de facturación (simulado)"><rect x="-1" y="-1" width="'+(n+2)+'" height="'+(n+2)+'" fill="#fff"/>'+cells+finder(0,0)+finder(n-7,0)+finder(0,n-7)+'</svg>';
}
var timer=null;
function stopTimer(){if(timer){clearInterval(timer);timer=null;}}
function qrActive(){var q=V().qr;return q&&q.exp>Date.now();}
function newQr(){var q={code:'QR-'+K.rnd(8),exp:Date.now()+120000};V().qr=q;V().scanned=false;save();return q;}

/* ---------- Emisión ---------- */
function emitir(opts){
  var S=K.S,v=V(),id='FE-'+(1000+S.sh.facturas.length+1),medio=opts.medio,verified=!!opts.verified;
  var f=F(id,COM,TOTAL,HOY,ELEC[medio]?'valida':'sin_medio',{medio:medio,ref:verified?'ACH 8F3K-221':'',ver:verified,nombre:opts.nombre||PERFIL.nombre,origen:opts.origen});
  S.sh.facturas.push(f);v.factId=id;v.estado='facturada';v.pago=verified?{medio:medio,ref:'ACH 8F3K-221'}:v.pago;save();
  return f;
}
function pagarComprador(medio){
  var S=K.S;
  if(K.maybeFail('pago')){K.log('pago_rechazado',{medio:medio});K.showError('Pago rechazado','El banco rechazó el pago. No se descontó nada de tu cuenta.',function(){},'Volver a intentar');return;}
  var f=emitir({medio:medio,verified:true,origen:'qr'});
  K.log('pago_y_factura',{medio:medio,factura:f.id,estado:f.estado,ms:V().t0?Date.now()-V().t0:0});K.complete({medio:medio});
  K.go('c4');
}

/* ---------- Comprador (celular) ---------- */
function cbar(back,title){return K.appbar({back:back,title:title||'Mis facturas',mark:K.mark('F')});}
function tabs(cur){return '<nav class="tabbar" aria-label="Secciones">'+[['c1','Perfil'],['c2','Pagar y facturar'],['c5','Mis facturas']].map(function(t){return '<button data-act="nav" data-to="'+t[0]+'"'+(t[0]===cur?' aria-current="page"':'')+'>'+t[1]+'</button>';}).join('')+'</nav>';}
function c1(){
  var sh=K.S.sh;
  return {layout:'phone',bar:cbar(null,'Perfil de facturación'),body:'<h1>Tu perfil de facturación</h1><div class="card">'+K.row('Nombre',PERFIL.nombre)+K.row('Documento',PERFIL.tipo+' · '+PERFIL.doc)+K.row('Correo',PERFIL.correo)+'</div>'+
    '<label class="opt" style="align-items:flex-start"><input type="checkbox" data-inp="auth"'+(sh.perfilAuth?' checked':'')+'><span>Autorizo compartir mi nombre, documento y correo con los comercios para que me facturen a mi nombre.<span class="d">Solo cuando yo muestro mi código o dicto mi documento.</span></span></label><button class="link" data-act="queCompartir">¿Qué se comparte?</button>',foot:tabs('c1')};
}
function c2(){
  var S=K.S,B=S.p.v==='B',v=V();
  if(!B)return {layout:'phone',bar:cbar(null,'Pagar y facturar'),body:'<h1>Factura a tu nombre</h1><div class="card total"><span class="muted">Compra en '+COM+'</span><span class="amount">'+money(TOTAL)+'</span></div><div class="notice"><strong>Dile tu cédula al cajero</strong> para que te facture a tu nombre.</div><div class="card center"><div class="muted small">Tu documento</div><div class="amount">'+PERFIL.doc+'</div></div><p class="muted">Paga en caja con el medio que prefieras. La factura aparecerá en «Mis facturas» cuando el cajero la emita.</p>',foot:tabs('c2')};
  if(!S.sh.perfilAuth)return {layout:'phone',bar:cbar(null,'Pagar y facturar'),body:'<div class="notice warn"><strong>Autoriza compartir tus datos</strong> para generar tu código de facturación.</div><button class="btn btn-primary" data-act="nav" data-to="c1">Ir a mi perfil</button>',foot:tabs('c2')};
  if(!v.t0)v.t0=Date.now();
  var act=qrActive();
  return {layout:'phone',bar:cbar(null,'Pagar y facturar'),body:'<h1>Pagar y facturar</h1><div class="card total"><span class="muted">Compra en '+COM+'</span><span class="amount">'+money(TOTAL)+'</span></div>'+
    '<div class="card center" id="qrbox">'+(act?qrSvg(v.qr.code)+'<p class="small muted" style="margin:8px 0 0">Muestra este código en caja para facturar a tu nombre</p><p style="margin:2px 0 0"><strong id="qt" aria-live="off"></strong></p>':'<p class="muted">'+(v.qr?'Tu código venció.':'Genera tu código de facturación.')+'</p><button class="btn btn-secondary sm" data-act="genQr">'+(v.qr?'Generar nuevo código':'Generar código')+'</button>')+'</div>'+
    '<h3>Pagar y facturar desde tu celular</h3><div style="display:grid;gap:8px"><button class="btn btn-primary" data-act="pagarApp" data-id="PSE">Pagar y facturar con PSE</button><button class="btn btn-primary" data-act="pagarApp" data-id="Bre-B">Pagar y facturar con Bre-B</button></div><p class="hint">Tu pago queda vinculado a la factura automáticamente.</p>',foot:tabs('c2'),
    after:function(){if(!qrActive())return;stopTimer();function tick(){var e=document.getElementById('qt');if(!e||K.cur!=='c2'){stopTimer();return;}var s=Math.max(0,Math.round((V().qr.exp-Date.now())/1000));e.textContent='Vence en '+Math.floor(s/60)+':'+(s%60<10?'0':'')+(s%60);if(s<=0){stopTimer();K.rerender();}}tick();timer=setInterval(tick,1000);}};
}
function c3(){
  var S=K.S;
  return {layout:'phone',bar:cbar('c2','Autoriza el pago'),body:'<h1>Autoriza el pago</h1><div class="card">'+K.row('Comercio',COM)+K.row('Valor','<strong>'+money(TOTAL)+'</strong>')+K.row('Medio','<strong>'+S.pm+'</strong>')+K.row('Factura a nombre de',PERFIL.nombre)+'</div><div class="center"><div class="fp-ring">'+I.fp+'</div><p class="muted">Confirma con tu huella o rostro</p></div>',foot:'<button class="btn btn-primary" data-act="confirmarPago">Confirmar con huella o rostro</button>'};
}
function c4(){
  var v=V(),f=v.factId?fact(v.factId):null;
  if(!f)return {layout:'phone',bar:cbar(null,'Factura recibida'),body:'<h1>Factura recibida</h1><div class="notice">Aún no hay factura de tu compra en '+COM+'.<br>'+(K.S.p.v==='B'?'Paga y factura con tu código desde «Pagar y facturar».':'Pídele al cajero que te facture con tu cédula.')+'</div>',foot:tabs('c2')};
  var e=EST[f.estado];
  return {layout:'phone',bar:cbar(null,'Factura recibida'),body:'<div class="center">'+I.ok+'<h1>Factura recibida</h1><p class="muted">'+f.com+' · '+money(f.valor)+'</p></div><div class="card">'+K.row('Número',f.id)+K.row('A nombre de',esc(f.nombre||PERFIL.nombre))+K.row('Fecha',f.fecha)+K.row('CUFE',f.cufe)+K.row('Medio de pago',f.medio)+'</div>'+
    (f.ver?'<div class="notice" style="background:var(--ok-bg);border-color:#B9DCC6"><strong>Pago electrónico verificado · Ref. '+f.ref+'</strong></div>':'<div class="notice warn">Medio de pago declarado por el comercio. No está vinculado a un pago verificado.</div>')+
    '<div class="notice '+(f.estado==='valida'?'':'warn')+'" style="'+(f.estado==='valida'?'background:var(--ok-bg);border-color:#B9DCC6':'')+'"><strong>'+e[2]+'</strong></div>',foot:'<button class="btn btn-primary" data-act="nav" data-to="c5">Ver mis facturas</button>'};
}
function c5(){
  var S=K.S,sh=S.sh,a=acum(),t=tope(),filtro=S.f,list=sh.facturas.filter(function(f){return !filtro||f.estado===filtro;}).slice().reverse();
  return {layout:'phone',bar:cbar(null,'Mis facturas'),body:'<h1>Facturas del año</h1><div class="card"><div class="small muted">Acumulado válido para la deducción del 1 %</div><div class="amount" id="acum">'+money(a)+'</div><div class="bar'+(a/t>0.9?' warn':'')+'" style="margin:8px 0 4px" role="img" aria-label="'+Math.round(a/t*100)+' % del tope"><i style="width:'+Math.min(100,Math.round(a/t*100))+'%"></i></div><div class="small muted" style="display:flex;justify-content:space-between"><span>Tope: '+money(t)+' ('+sh.cfg.topeUvt+' UVT)</span><span>Deducción estimada: '+money(Math.min(a,t)*0.01)+'</span></div><button class="link" data-act="cfgTope" style="font-size:13px">Configurar tope</button></div>'+
    '<div class="chips" role="group" aria-label="Filtrar" style="margin-bottom:10px">'+[['','Todas'],['valida','Válidas'],['sin_medio','Falta medio de pago'],['incompleta','Datos incompletos']].map(function(x){return '<button class="chip" style="min-height:38px;font-size:13px" data-act="filtro" data-id="'+x[0]+'" aria-pressed="'+(filtro===x[0])+'">'+x[1]+'</button>';}).join('')+'</div>'+
    '<div class="card" style="padding:4px 16px"><ul class="list">'+(list.map(function(f){return '<li><div class="grow"><strong>'+esc(f.com)+'</strong><div class="small muted">'+f.fecha+' · '+f.id+'</div></div><div style="text-align:right"><strong>'+money(f.valor)+'</strong><div>'+stBadge(f)+'</div></div><button class="btn btn-secondary sm" data-act="verFact" data-id="'+f.id+'" aria-label="Abrir factura de '+esc(f.com)+'">Ver</button></li>';}).join('')||'<li class="muted">No hay facturas con este filtro.</li>')+'</ul></div>',foot:tabs('c5')};
}
function c6(){
  var f=fact(K.S.sel);if(!f)return c5();var e=EST[f.estado];
  return {layout:'phone',bar:cbar('c5','Factura'),body:'<h1>'+esc(f.com)+'</h1><p class="amount" style="margin:0 0 8px">'+money(f.valor)+'</p>'+
    (f.estado==='valida'?'<div class="notice" style="background:var(--ok-bg);border-color:#B9DCC6"><strong>'+e[2]+'</strong></div>':'<div class="notice warn" role="status"><strong>'+(f.estado==='sin_medio'?'El comercio registró pago en efectivo':'Faltan datos en la factura')+'</strong><p style="margin:4px 0 0" class="small">'+e[2]+'.</p></div>')+
    '<div class="card">'+K.row('Número',f.id)+K.row('Fecha',f.fecha)+K.row('Medio registrado',f.medio||'—')+K.row('CUFE',f.cufe)+(f.ver?K.row('Verificación','Ref. '+f.ref):'')+'</div>'+(f.corr?'<div class="notice"><strong>Corrección solicitada.</strong> El comercio recibió tu solicitud: «'+esc(f.corr)+'».</div>':''),
    foot:f.estado!=='valida'&&!f.corr?'<button class="btn btn-primary" data-act="pedirCorr" data-id="'+f.id+'">Pedir corrección al comercio</button>':'<button class="btn btn-secondary" data-act="nav" data-to="c5">Volver a mis facturas</button>'};
}

/* ---------- Caja (tableta) ---------- */
function kbar(){return K.dhead({title:COM+' · Caja 2',mark:K.mark('D'),right:'<span class="small muted">Cajero: Andrés Rivas · '+HOY+'</span>'});}
function kp(body){return {layout:'desk',bar:kbar(),wrap:'wrapd',body:body};}
function ventaCard(){return '<div class="card"><h3 style="margin-top:0">Venta en curso</h3><table class="dtable" style="width:100%"><tbody>'+ITEMS.map(function(i){return '<tr><td>'+i[0]+'</td><td class="num">'+money(i[1])+'</td></tr>';}).join('')+'<tr><td><strong>Total</strong></td><td class="num"><strong style="font-size:22px">'+money(TOTAL)+'</strong></td></tr></tbody></table></div>';}
function k1(){
  var S=K.S,v=V();if(!v.t0||v.estado==='facturada'&&!S.kt){v.t0=v.t0||Date.now();}
  var corr=S.sh.facturas.filter(function(f){return f.corr&&f.estado!=='valida';});
  return kp('<div class="side" style="grid-template-columns:minmax(0,1fr) 420px">'+'<div><h1>Venta en curso</h1>'+ventaCard()+(corr.length?'<div class="banner warn"><strong>Correcciones pedidas por clientes</strong>'+corr.map(function(f){return '<div style="display:flex;gap:10px;align-items:center;margin-top:8px"><span class="grow">'+f.id+' · '+esc(f.com)+' · '+f.corr+'</span><button class="btn btn-secondary sm" data-act="aplicarCorr" data-id="'+f.id+'">Corregir medio de pago</button></div>';}).join('')+'</div>':'')+'</div>'+
    '<div class="card"><h3 style="margin-top:0">Facturación</h3><p class="muted">El cliente pidió factura a su nombre.</p><button class="btn btn-primary block" data-act="facturar" style="min-height:64px;font-size:18px">Facturar a nombre del cliente</button><p class="hint">Variante '+S.p.v+' · '+(S.p.v==='A'?'consulta de cédula':'código QR del cliente')+'</p></div></div>');
}
function k2(){
  var S=K.S,B=S.p.v==='B',v=V();
  if(!B){
    var d=S.dian;
    return kp('<p><button class="link" data-act="nav" data-to="k1">← Volver a la venta</button></p><h1>Facturar a nombre del cliente</h1><div class="side"><div><div class="card"><div class="field"><label for="ced">Cédula del cliente</label><div style="display:flex;gap:8px"><input type="text" id="ced" inputmode="numeric" value="'+esc(S.ced)+'" data-inp="ced" placeholder="Pídele su cédula al cliente" style="flex:1"><button class="btn btn-primary" data-act="consultar">Consultar</button></div><p class="err" id="e-ced" role="alert"></p></div>'+
      (d?'<div class="field"><label for="nom">Nombre (consulta de la DIAN)</label><input type="text" id="nom" value="'+esc(S.nom)+'" data-inp="nom"></div><div class="field"><label for="cor">Correo</label><input type="text" id="cor" value="'+esc(S.cor)+'" data-inp="cor"></div><div class="field"><label for="med">Medio de pago</label><select id="med" data-inp="med">'+MEDIOS.map(function(m){return '<option'+(S.medio===m?' selected':'')+'>'+m+'</option>';}).join('')+'</select><p class="hint">Elige cómo pagó el cliente.</p></div><button class="btn btn-primary" data-act="emitirA">Emitir factura</button>':'')+'</div></div>'+ventaCard()+'</div>');
  }
  var sc=v.scanned;
  return kp('<p><button class="link" data-act="nav" data-to="k1">← Volver a la venta</button></p><h1>Facturar a nombre del cliente</h1><div class="side"><div class="card">'+
    (!sc?'<p class="muted">Pídele al cliente que muestre su código de facturación y escanéalo.</p><button class="btn btn-primary" data-act="escanear" style="min-height:64px">Escanear QR del cliente</button><p class="hint">Simulado. Si el cliente tiene un código activo en su celular, se usa ese.</p>':
    '<div class="banner ok">'+I.check+' Código leído. Datos de facturación completados.</div>'+K.row('Nombre',PERFIL.nombre)+K.row('Documento',PERFIL.doc)+K.row('Correo',PERFIL.correo)+'<div class="banner" style="margin-top:12px" id="espera"><strong>Esperando el pago del cliente…</strong><p class="small" style="margin:4px 0 0">Cuando el cliente pague con PSE o Bre-B, el medio de pago se marca solo y la factura se emite sin más pasos.</p></div><div class="note-side"><h3>Solo para la prueba</h3><div class="toolbar" style="margin:0"><button class="btn btn-secondary sm" data-act="simPago" data-id="PSE">Simular pago con PSE</button><button class="btn btn-secondary sm" data-act="simPago" data-id="Bre-B">Simular pago con Bre-B</button></div></div>')+'</div>'+ventaCard()+'</div>');
}
function k3(){
  var f=V().factId?fact(V().factId):null;if(!f)return k1();
  var B=K.S.p.v==='B';
  return kp('<div class="center">'+I.ok+'<h1>Factura emitida</h1><p class="muted">'+f.id+' · '+money(f.valor)+'</p></div><div class="side" style="max-width:820px;margin:0 auto;grid-template-columns:1fr 1fr"><div class="card">'+K.row('Cliente',esc(f.nombre||PERFIL.nombre))+K.row('Medio de pago','<strong>'+f.medio+'</strong>')+K.row('Estado de transmisión','<span class="badge ok">Transmitida a la DIAN · Aceptada</span>')+K.row('CUFE',f.cufe)+'</div><div class="card"><h3 style="margin-top:0">Vínculo de pago</h3>'+(f.ver?'<div class="banner ok" style="margin:0">'+I.check+' Pago electrónico verificado · Ref. '+f.ref+'</div>':'<div class="banner warn" style="margin:0">Sin vínculo de pago: el medio fue digitado por el cajero.</div>')+(f.estado==='sin_medio'?'<p class="small muted">Con medio «Efectivo» esta factura no sirve para la deducción del cliente.</p>':'')+'</div></div><div class="toolbar" style="justify-content:center;margin-top:16px"><button class="btn btn-primary" data-act="nuevaVenta">Nueva venta</button></div>');
}
function k4(){
  var e=K.S.err||{t:'qr_vencido',m:'El código QR del cliente venció. Pídele que genere uno nuevo.'};
  return kp('<div class="center">'+I.alert+'<h1>'+(e.t==='qr_vencido'?'Código QR vencido':'No pudimos completar el paso')+'</h1><p class="muted">'+e.m+'</p></div><div class="toolbar" style="justify-content:center"><button class="btn btn-primary" data-act="reintentarK">Escanear de nuevo</button><button class="btn btn-secondary" data-act="nav" data-to="k1">Volver a la venta</button></div>');
}
function finKaja(f){
  var S=K.S,v=V();
  K.log('tiempo_k1_k3',{variante:S.p.v,ms:S.kT0?Date.now()-S.kT0:0,medio:f.medio,estado:f.estado,editados:S.edits||0,medio_corregido:!!S.medioTouched});
  K.complete({variante:S.p.v});S.kT0=0;S.edits=0;S.medioTouched=false;K.go('k3');
}

K.run({
  id:'b4',title:'B4 · Facturación en un toque',layout:'phone',
  params:[{k:'v',label:'Variante',def:'A',opts:[['A','A · El comprador dicta su cédula y la caja consulta la DIAN'],['B','B · QR de facturación y pago electrónico vinculado']]},{k:'vista',label:'Vista inicial',def:'comprador',opts:[['comprador','Comprador · celular'],['caja','Caja · tableta']]}],
  views:[{label:'Comprador · celular',to:'c1',re:'^c'},{label:'Caja · tableta',to:'k1',re:'^k'}],
  state:fresh,start:function(p){return p.vista==='caja'?'k1':'c1';},
  codes:{c1:'C1',c2:'C2',c3:'C3',c4:'C4',c5:'C5',c6:'C6',k1:'K1',k2:'K2',k3:'K3',k4:'K4'},
  labels:{c1:'C1 Perfil de facturación',c2:'C2 QR y pagar (B) / dictar cédula (A)',c3:'C3 Autorización del pago',c4:'C4 Factura recibida',c5:'C5 Bandeja del año',c6:'C6 Factura con problema',k1:'K1 Venta en curso',k2:'K2 Datos y medio de pago',k3:'K3 Factura emitida',k4:'K4 Error'},
  groups:[['Comprador',['c1','c2','c3','c4','c5','c6']],['Caja',['k1','k2','k3','k4']]],
  routes:{c1:c1,c2:c2,c3:c3,c4:c4,c5:c5,c6:c6,k1:k1,k2:k2,k3:k3,k4:k4},
  acts:{
    queCompartir:function(){K.log('abre_que_se_comparte');K.openSheet(K.sheetHead('¿Qué se comparte?')+'<ul><li><strong>Qué:</strong> tu nombre, tipo y número de documento y tu correo.</li><li><strong>Con quién:</strong> solo con el comercio donde muestras tu código o dictas tu documento.</li><li><strong>Para qué:</strong> que la factura salga a tu nombre y puedas usarla en tu declaración de renta.</li><li><strong>Cómo dejar de compartir:</strong> desmarca la casilla en tu perfil.</li></ul><button class="btn btn-primary" data-act="closeSheet">Entendido</button>');},
    genQr:function(){newQr();K.log('qr_generado');K.rerender();},
    pagarApp:function(el){var S=K.S;S.pm=el.dataset.id;K.log('metodo_elegido',{medio:S.pm});if(!qrActive())newQr();K.go('c3');},
    confirmarPago:function(){var S=K.S;K.fingerprint().then(function(ok){if(ok)pagarComprador(S.pm);});},
    filtro:function(el){K.S.f=el.dataset.id;K.log('uso_bandeja',{filtro:el.dataset.id||'todas'});K.rerender();},
    verFact:function(el){K.S.sel=el.dataset.id;K.log('factura_abierta',{id:el.dataset.id});K.go('c6');},
    pedirCorr:function(el){var f=fact(el.dataset.id);f.corr='Registrar el medio de pago electrónico';K.S.sh.corrs.push(f.id);save();K.log('pedir_correccion',{factura:f.id});K.complete({correccion:true});K.toast('Solicitud enviada al comercio');K.rerender();},
    cfgTope:function(){var c=K.S.sh.cfg;K.openSheet(K.sheetHead('Configurar tope')+'<p class="muted small">Valores de ejemplo. Cámbialos si lo necesitas.</p><label for="uvt">Valor de la UVT</label><input type="text" id="uvt" inputmode="numeric" value="'+c.uvt+'" data-inp="uvt"><label for="tuvt">Tope en UVT</label><input type="text" id="tuvt" inputmode="numeric" value="'+c.topeUvt+'" data-inp="tuvt"><button class="btn btn-primary" style="margin-top:12px" data-act="okTope">Guardar</button>');},
    okTope:function(){var c=K.S.sh.cfg;c.uvt=+String(document.getElementById('uvt').value).replace(/\D/g,'')||c.uvt;c.topeUvt=+String(document.getElementById('tuvt').value).replace(/\D/g,'')||c.topeUvt;save();K.log('tope_configurado',c);K.closeSheet();K.rerender();},
    facturar:function(){var S=K.S;S.kT0=Date.now();S.edits=0;S.medioTouched=false;S.dian=null;S.ced='';S.medio='Efectivo';V().factId=null;V().pago=null;V().estado='abierta';V().scanned=false;save();K.log('inicio_facturar',{variante:S.p.v});K.go('k2');},
    consultar:function(){
      var S=K.S,c=document.getElementById('ced').value.replace(/\D/g,'');
      if(c.length<6){K.setErr('e-ced','Escribe la cédula completa.','ced');K.vErr(['cedula']);return;}
      S.ced=document.getElementById('ced').value;
      if(K.maybeFail('dian')){K.showError('La consulta no respondió','La consulta a la DIAN tardó demasiado. Intenta de nuevo.',function(){});return;}
      K.busy('Consultando datos del cliente…',1500).then(function(ok){if(!ok)return;S.dian={nombre:PERFIL.nombre,correo:PERFIL.correo};S.nom=PERFIL.nombre;S.cor=PERFIL.correo;K.log('consulta_dian',{cedula_ingresada:c});K.rerender();});
    },
    emitirA:function(){var S=K.S,f=emitir({medio:S.medio,verified:false,nombre:S.nom,origen:'cedula'});finKaja(f);},
    escanear:function(){
      var S=K.S,v=V();
      if(K.maybeFail('qr')){S.err={t:'qr',m:'No pudimos leer el código. Acércalo a la cámara o pídele al cliente que lo genere de nuevo.'};K.go('k4');return;}
      if(v.qr&&v.qr.exp<=Date.now()){S.err={t:'qr_vencido',m:'El código QR del cliente venció. Pídele que genere uno nuevo.'};K.log('qr_vencido');K.go('k4');return;}
      if(!v.qr){newQr();}
      v.scanned=true;save();K.log('qr_escaneado');
      if(v.factId){var f=fact(v.factId);finKaja(f);return;}
      K.rerender();
    },
    simPago:function(el){var f=emitir({medio:el.dataset.id,verified:true,origen:'qr'});K.log('pago_simulado',{medio:el.dataset.id});finKaja(f);},
    reintentarK:function(){var S=K.S;S.err=null;V().qr=null;V().scanned=false;save();K.go('k2');},
    aplicarCorr:function(el){var f=fact(el.dataset.id);f.estado='valida';f.medio='Transferencia';f.corr='';K.S.sh.corrs=K.S.sh.corrs.filter(function(x){return x!==f.id;});save();K.log('correccion_aplicada',{factura:f.id});K.rerender();},
    nuevaVenta:function(){var v=V();v.factId=null;v.pago=null;v.estado='abierta';v.qr=null;v.scanned=false;v.t0=0;save();K.go('k1');}
  },
  inps:{
    auth:function(el,ty){if(ty!=='change')return;K.S.sh.perfilAuth=el.checked;save();K.log('autorizacion_perfil',{autoriza:el.checked});},
    ced:function(el){K.setErr('e-ced','','ced');},
    nom:function(el,ty){K.S.nom=el.value;if(ty==='change'){K.S.edits=(K.S.edits||0)+1;K.log('campo_editado',{campo:'nombre'});}},
    cor:function(el,ty){K.S.cor=el.value;if(ty==='change'){K.S.edits=(K.S.edits||0)+1;K.log('campo_editado',{campo:'correo'});}},
    med:function(el,ty){if(ty!=='change')return;K.S.medio=el.value;if(K.S.medioTouched)K.log('medio_pago_corregido',{a:el.value});K.S.medioTouched=true;K.log('medio_pago_elegido',{medio:el.value});},
    uvt:function(){},tuvt:function(){}
  }
});
window.addEventListener('storage',function(e){if(e.key!==KEY)return;var s=load();if(!s)return;K.S.sh=s;if(['c4','c5','c6','k1','k2'].indexOf(K.cur)>=0){var v=s.venta;if(K.cur==='k2'&&v.factId&&K.S.p.v==='B'){var f=fact(v.factId);if(f)finKaja(f);return;}K.rerender();}});
