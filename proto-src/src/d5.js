/* D5 · PFM consolidado — Mis Finanzas ACH (canal ach) / Mis finanzas dentro de la app de Cooperativa Valle Unido (canal coop) */
var esc=K.esc,money=K.money,I=K.I;
var ENT=[
 {id:'e0',n:'Banco Andino',ac:[['Cuenta de ahorros','•••• 4821',2340500]],cr:[{n:'Crédito de vehículo',deuda:18400000,cuota:890000,fecha:'05/11/2026',d:new Date(2026,10,5)}]},
 {id:'e1',n:'Banco del Pacífico Digital',ac:[['Cuenta digital','•••• 1190',618200]],cr:[]},
 {id:'e2',n:'Cooperativa Valle Unido',ac:[],cr:[{n:'Tarjeta de crédito •••• 9902',deuda:1275900,cuota:142000,fecha:'25/10/2026',d:new Date(2026,9,25),cupo:4000000,minimo:true}]},
 {id:'e3',n:'Banco Cordillera',ac:[['Cuenta de nómina','•••• 6054',1120000]],cr:[]},
 {id:'e4',n:'Financiera Ceiba',ac:[],cr:[{n:'Microcrédito',deuda:2600000,cuota:210000,fecha:'11/11/2026',d:new Date(2026,10,11)}]},
 {id:'e5',n:'Caja Solidaria del Sur',ac:[['Ahorro programado','•••• 3307',450000]],cr:[]}
];
var CATS=['Mercado','Transporte','Servicios','Restaurantes','Ocio','Otros'];
/* [id, fecha, descripción, valor, categoría, entidad] */
var MOV=[
 ['m01','2026-10-01','ABONO NÓMINA',3150000,'Ingresos','e0'],['m02','2026-10-02','SUPERMERCADO EL SURTIDOR',-184300,'Mercado','e0'],['m03','2026-10-03','PAGO ENERGÍA VALLE',-148200,'Servicios','e0'],['m04','2026-10-05','CUOTA CRÉDITO VEHÍCULO',-890000,'Pagos de deuda','e0'],['m05','2026-10-06','RECARGA TRANSPORTE MASIVO',-40000,'Transporte','e0'],['m06','2026-10-08','RESTAURANTE LA SAZÓN',-120000,'Restaurantes','e0'],['m07','2026-10-09','TIENDA AURORA',-235000,'Otros','e0'],['m08','2026-10-10','PLAZA FRESCA MERCADO',-142600,'Mercado','e0'],
 ['m09','2026-10-02','DOMICILIOS CASA',-98000,'Restaurantes','e1'],['m10','2026-10-04','CINE CENTRO',-64000,'Ocio','e1'],['m11','2026-10-07','TAXI POR APLICACIÓN',-38500,'Transporte','e1'],['m12','2026-10-07','MERCADO DE BARRIO',-126400,'Mercado','e1'],['m13','2026-10-11','INTERNET HOGAR',-89900,'Servicios','e1'],
 ['m14','2026-10-03','PARRILLA DEL PUERTO',-112000,'Restaurantes','e2'],['m15','2026-10-06','SUPERMERCADO EL SURTIDOR',-159100,'Mercado','e2'],['m16','2026-10-09','CONCIERTO TEATRO',-150000,'Ocio','e2'],['m17','2026-10-10','PLATAFORMA DE VIDEO',-26900,'Servicios','e2'],
 ['s01','2026-09-01','ABONO NÓMINA',3150000,'Ingresos','e0'],['s02','2026-09-03','SUPERMERCADO EL SURTIDOR',-170200,'Mercado','e0'],['s03','2026-09-04','PAGO ENERGÍA VALLE',-139800,'Servicios','e0'],['s04','2026-09-05','CUOTA CRÉDITO VEHÍCULO',-890000,'Pagos de deuda','e0'],['s05','2026-09-07','RECARGA TRANSPORTE MASIVO',-38000,'Transporte','e0'],['s06','2026-09-09','RESTAURANTE LA SAZÓN',-95000,'Restaurantes','e0'],['s07','2026-09-10','PLAZA FRESCA MERCADO',-131400,'Mercado','e0'],
 ['s08','2026-09-02','MERCADO DE BARRIO',-118200,'Mercado','e1'],['s09','2026-09-05','CINE CENTRO',-52000,'Ocio','e1'],['s10','2026-09-08','TAXI POR APLICACIÓN',-41200,'Transporte','e1'],['s11','2026-09-10','INTERNET HOGAR',-89900,'Servicios','e1'],
 ['s12','2026-09-04','PARRILLA DEL PUERTO',-155000,'Restaurantes','e2'],['s13','2026-09-06','SUPERMERCADO EL SURTIDOR',-148600,'Mercado','e2'],['s14','2026-09-09','CONCIERTO TEATRO',-170000,'Ocio','e2'],['s15','2026-09-11','PLATAFORMA DE VIDEO',-26900,'Servicios','e2']
];
var SKIN={ach:{n:'Mis Finanzas ACH',col:'var(--navy)',mark:'M',trust:'ACH Colombia gestiona tu autorización, sin ser tu banco.'},coop:{n:'Mis finanzas · Cooperativa Valle Unido',col:'var(--bank)',mark:'C',trust:'Tu cooperativa gestiona esta función dentro de su app.'}};
var MESNOM={'09':'septiembre','10':'octubre'};

function ent(id){return ENT.filter(function(e){return e.id===id;})[0];}
function full(){return {saldos:true,movs:true,cred:true,vig:'90'};}
function fresh(p){
  var S={conn:{},sel:{},q:[],qi:0,cons:null,t3:0,recat:{},busq:'',tab:'f4',premio:'',pre:0};
  if(p.pre==='1'){['e0','e1','e2'].forEach(function(id){S.conn[id]=full();});}
  return S;
}
function conn(){return K.S.conn;}
function connIds(){return ENT.filter(function(e){return conn()[e.id];}).map(function(e){return e.id;});}
function skin(){return SKIN[K.S.p.canal];}
function bar(back,title){return K.appbar({back:back,title:title||skin().n,cls:'',mark:'<span class="avatar" style="width:34px;height:34px;font-size:14px;background:'+skin().col+';color:#fff">'+skin().mark+'</span>'});}
function tabbar(cur){
  var T=[['f4','Resumen'],['f5','Movimientos'],['f6','Tendencias'],['f7','Autorizaciones'],['f8','Plus']];
  return '<nav class="tabbar" aria-label="Secciones">'+T.map(function(t){return '<button data-act="nav" data-to="'+t[0]+'"'+(t[0]===cur?' aria-current="page"':'')+'>'+t[1]+'</button>';}).join('')+'</nav>';
}
/* ---------- Datos visibles según el consentimiento ---------- */
function visAcc(){var o=[];ENT.forEach(function(e){var c=conn()[e.id];if(c&&c.saldos)e.ac.forEach(function(a){o.push({e:e,n:a[0],num:a[1],v:a[2]});});});return o;}
function visCred(){var o=[];ENT.forEach(function(e){var c=conn()[e.id];if(c&&c.cred)e.cr.forEach(function(a){o.push({e:e,p:a});});});return o;}
function visMov(){return MOV.filter(function(m){var c=conn()[m[5]];return c&&c.movs;}).map(function(m){return {id:m[0],f:m[1],d:m[2],v:m[3],c:K.S.recat[m[0]]||m[4],e:ent(m[5]),orig:m[4]};});}
function spend(month){
  var o={};CATS.forEach(function(c){o[c]=0;});
  visMov().forEach(function(m){if(m.f.indexOf('2026-'+month)===0&&m.v<0&&m.c!=='Pagos de deuda'&&o[m.c]!=null)o[m.c]+=-m.v;});
  return o;
}
function fd(iso){var p=iso.split('-');return p[2]+'/'+p[1]+'/'+p[0];}
function missing(kind){return ENT.filter(function(e){var c=conn()[e.id];return c&&!c[kind]&&(kind==='cred'?e.cr.length:kind==='saldos'?e.ac.length:true);}).map(function(e){return e.n;});}

/* ---------- Pantallas ---------- */
function f1(){
  var sk=skin(),coop=K.S.p.canal==='coop';
  return {bar:bar(null),body:'<div class="center"><div class="avatar" style="width:72px;height:72px;font-size:28px;background:'+sk.col+';color:#fff">'+sk.mark+'</div><h1>Todas tus cuentas en un solo lugar, con tu autorización</h1><p class="muted">'+(coop?'Ahora, dentro de la app de tu cooperativa, puedes ver tus cuentas, tarjetas y créditos de otras entidades.':'Conecta tus cuentas, tarjetas y créditos de varias entidades y míralos juntos.')+'</p></div>'+
    '<div class="card"><ul class="list"><li>'+I.check+'<span>Tú decides qué entidades y qué datos compartes.</span></li><li>'+I.check+'<span>Puedes revocar cuando quieras.</span></li><li>'+I.check+'<span>'+sk.trust+'</span></li></ul></div>',
    foot:'<button class="btn btn-primary" data-act="empezar">Conectar mis entidades</button>'+(connIds().length?'<button class="btn btn-secondary" data-act="nav" data-to="f4">Ir a mi resumen</button>':'')};
}
function f2(){
  var S=K.S,q=K.norm(S.busq),list=ENT.filter(function(e){return !q||K.norm(e.n).indexOf(q)>=0;});
  return {bar:bar('f1','Elegir entidades'),body:'<h1>¿Qué entidades quieres conectar?</h1><label for="bq" class="sr">Buscar entidad</label><input type="search" id="bq" placeholder="Buscar entidad" value="'+esc(S.busq)+'" data-inp="busq" style="margin-bottom:12px">'+
    '<div id="elist">'+listHtml(list)+'</div>',foot:'<button class="btn btn-primary" data-act="continuarEnt">Continuar</button>'};
}
function listHtml(list){
  var S=K.S;return list.map(function(e){var on=conn()[e.id];return '<label class="opt"><input type="checkbox" data-inp="ent" data-id="'+e.id+'"'+((S.sel[e.id]||on)?' checked':'')+(on?' disabled':'')+'><span>'+esc(e.n)+(on?'<span class="d">Ya conectada</span>':(K.S.p.canal==='coop'&&e.id==='e2'?'<span class="d">Tu cooperativa · elige qué compartir</span>':''))+'</span></label>';}).join('')||'<p class="muted">No encontramos esa entidad.</p>';
}
function f3(){
  var S=K.S,id=S.q[S.qi];if(!id)return f4();
  var e=ent(id),c=S.cons||(S.cons=full());if(!S.t3)S.t3=Date.now();
  function ck(k,l,d){return '<label class="opt"><input type="checkbox" data-inp="cons" data-k="'+k+'"'+(c[k]?' checked':'')+'><span>'+l+'<span class="d">'+d+'</span></span></label>';}
  var venc=c.vig==='90'?'10/01/2027':'12/10/2027';
  return {bar:bar('f2','Autorización'),body:'<p class="eyebrow">'+(S.qi+1)+' de '+S.q.length+'</p><h1>Compartir datos de '+esc(e.n)+'</h1><p class="muted">Recibe: <strong>'+esc(skin().n)+'</strong>.</p>'+
    '<fieldset><legend>Datos que compartirás</legend>'+ck('saldos','Saldos de cuentas','Nombre del producto y saldo')+ck('movs','Movimientos','Últimos 12 meses')+ck('cred','Productos de crédito','Cupos, deudas y cuotas')+'</fieldset>'+
    '<div class="card"><strong>Para qué</strong><p class="small muted" style="margin:2px 0 0">Mostrarte tu patrimonio, tus gastos y tus próximas obligaciones en un solo lugar.</p></div>'+
    '<label for="vig">Vigencia</label><select id="vig" data-inp="vig"><option value="90"'+(c.vig==='90'?' selected':'')+'>90 días</option><option value="365"'+(c.vig==='365'?' selected':'')+'>1 año</option></select><p class="hint">Vence el '+venc+'.</p>'+
    '<div class="notice"><strong>Cómo revocar:</strong> en Autorizaciones, toca «Revocar». Los datos desaparecen de todas las vistas.</div>',
    foot:'<button class="btn btn-primary" data-act="autenticar">Continuar a '+esc(e.n)+'</button>'};
}
function f4(){
  var S=K.S;
  if(!connIds().length)return {bar:bar('f1'),body:'<div class="center"><h1>Aún no hay entidades conectadas</h1><p class="muted">Conecta una entidad para ver tu resumen.</p></div>',foot:'<button class="btn btn-primary" data-act="nav" data-to="f2">Conectar entidades</button>'};
  var acc=visAcc(),cr=visCred(),act=acc.reduce(function(a,x){return a+x.v;},0),deu=cr.reduce(function(a,x){return a+x.p.deuda;},0),net=act-deu;
  var obl=cr.slice().sort(function(a,b){return a.p.d-b.p.d;});
  var mc=missing('cred');
  var h='<h1>Mi resumen</h1><div class="card" style="background:var(--navy);color:#fff;border:0"><div class="small" style="color:#C9D7E3">Patrimonio neto</div><div class="amount" style="color:#fff">'+money(net)+'</div><div class="small" style="color:#C9D7E3">Activos '+money(act)+' − Deudas '+money(deu)+'</div></div>';
  if(mc.length)h+='<div class="notice warn">No ves deudas de <strong>'+mc.map(esc).join(', ')+'</strong> porque no compartiste sus productos de crédito. <button class="link" data-act="nav" data-to="f7">Cambiar autorizaciones</button></div>';
  h+='<h2>Saldos por entidad</h2><div class="card" style="padding:4px 16px"><ul class="list">'+(acc.map(function(a){return '<li><div class="grow"><strong>'+esc(a.e.n)+'</strong><div class="small muted">'+a.n+' '+a.num+'</div></div><strong>'+money(a.v)+'</strong></li>';}).join('')||'<li class="muted">Sin cuentas visibles.</li>')+'</ul></div>';
  h+='<h2>Lo que debes</h2><div class="card" style="padding:4px 16px"><ul class="list">'+(cr.map(function(x){return '<li><div class="grow"><strong>'+esc(x.e.n)+'</strong><div class="small muted">'+x.p.n+(x.p.cupo?' · cupo '+money(x.p.cupo):'')+'</div></div><strong>'+money(x.p.deuda)+'</strong></li>';}).join('')||'<li class="muted">Sin deudas visibles.</li>')+(cr.length?'<li><strong class="grow">Deuda total</strong><strong>'+money(deu)+'</strong></li>':'')+'</ul></div>';
  h+='<h2>Próximas obligaciones</h2><div class="card" style="padding:4px 16px"><ul class="list">'+(obl.map(function(x,i){return '<li><span class="badge '+(i===0?'warn':'gray')+'">'+x.p.fecha.slice(0,5)+'</span><div class="grow"><strong>'+x.p.n+'</strong><div class="small muted">'+esc(x.e.n)+(x.p.minimo?' · pago mínimo':' · cuota')+'</div></div><strong>'+money(x.p.cuota)+'</strong></li>';}).join('')||'<li class="muted">Sin obligaciones visibles.</li>')+'</ul></div>';
  return {bar:bar('f1'),body:h,foot:tabbar('f4')};
}
function f5(){
  var S=K.S,mv=visMov().filter(function(m){return m.f.indexOf('2026-10')===0;}).sort(function(a,b){return a.f<b.f?1:-1;});
  return {bar:bar('f4','Movimientos'),body:'<h1>Movimientos de octubre</h1><p class="muted small">Categorías asignadas automáticamente. Toca una para cambiarla.</p><div class="card" style="padding:4px 16px"><ul class="list">'+(mv.map(function(m){return '<li><div class="grow"><strong class="small">'+esc(m.d)+'</strong><div class="small muted">'+fd(m.f).slice(0,5)+' · '+esc(m.e.n)+'</div><button class="chip" style="min-height:34px;font-size:13px;margin-top:4px" data-act="recat" data-id="'+m.id+'">'+m.c+(S.recat[m.id]?' ✎':'')+'</button></div><strong style="color:'+(m.v>0?'var(--ok)':'inherit')+'">'+money(m.v)+'</strong></li>';}).join('')||'<li class="muted">No hay movimientos visibles.</li>')+'</ul></div>',foot:tabbar('f5')};
}
function f6(){
  var a=spend('10'),b=spend('09'),tot=CATS.reduce(function(x,c){return x+a[c];},0),max=Math.max.apply(null,CATS.map(function(c){return Math.max(a[c],b[c]);}))||1;
  var best=null;CATS.forEach(function(c){var d=a[c]-b[c];if(b[c]>0&&d>=50000){var p=d/b[c];if(!best||p>best.p)best={c:c,p:p};}});
  var top=CATS.slice().sort(function(x,y){return a[y]-a[x];})[0];
  var bars=CATS.map(function(c){return '<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between"><strong>'+c+'</strong><span>'+money(a[c])+' <span class="small muted">vs '+money(b[c])+'</span></span></div><div class="bar" style="margin-top:4px"><i style="width:'+Math.round(a[c]/max*100)+'%"></i></div><div class="bar" style="margin-top:3px;height:6px;background:transparent"><i style="width:'+Math.round(b[c]/max*100)+'%;background:var(--blue-l)"></i></div></div>';}).join('');
  return {bar:bar('f4','Tendencias'),body:'<h1>Tendencias del mes</h1><p class="muted small">Octubre (1 al 11) frente a septiembre (1 al 11). No incluye pagos de deudas.</p>'+
    (best?'<div class="notice warn" role="status"><strong>Tu gasto en '+best.c.toLowerCase()+' subió '+Math.round(best.p*100)+' %</strong><div class="small">'+money(a[best.c]-b[best.c])+' más que en septiembre.</div></div>':'')+
    (tot?'<div class="card"><div class="small muted">Gasto total de octubre (hasta hoy)</div><div class="amount">'+money(tot)+'</div><div class="small">Donde más gastaste: <strong>'+top+'</strong> ('+money(a[top])+')</div></div><div class="card">'+bars+'<p class="small muted" style="margin:0"><span style="display:inline-block;width:12px;height:8px;background:var(--blue)"></span> Octubre · <span style="display:inline-block;width:12px;height:8px;background:var(--blue-l)"></span> Septiembre</p></div>':'<div class="notice">Conecta entidades y comparte movimientos para ver tus tendencias.</div>'),foot:tabbar('f6')};
}
function f7(){
  var ids=connIds();
  return {bar:bar('f4','Autorizaciones'),body:'<h1>Tus autorizaciones</h1>'+(ids.length?ids.map(function(id){var e=ent(id),c=conn()[id],venc=c.vig==='90'?'10/01/2027':'12/10/2027';
    return '<div class="card"><strong>'+esc(e.n)+'</strong><div style="margin:6px 0">'+[['saldos','Saldos'],['movs','Movimientos'],['cred','Créditos']].map(function(k){return '<span class="badge '+(c[k[0]]?'ok':'gray')+'" style="margin:0 4px 4px 0">'+(c[k[0]]?'Compartes':'No compartes')+' · '+k[1]+'</span>';}).join('')+'</div><div class="small muted">Vence el '+venc+'</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn btn-secondary sm" data-act="editar" data-id="'+id+'">Cambiar datos</button><button class="btn btn-danger sm" data-act="revocar" data-id="'+id+'">Revocar</button><button class="link" data-act="eliminar" data-id="'+id+'" style="font-size:14px">Eliminar mis datos</button></div></div>';}).join(''):'<div class="notice">No tienes autorizaciones activas.</div>')+'<button class="btn btn-secondary" data-act="nav" data-to="f2">Conectar otra entidad</button>',foot:tabbar('f7')};
}
function f8(){
  return {bar:bar('f4','Plus'),body:'<div class="center"><div class="avatar" style="width:64px;height:64px;font-size:26px;background:var(--plum);color:#fff">+</div><h1>'+(K.S.p.canal==='coop'?'Mis finanzas Plus':'Mis Finanzas Plus')+'</h1><p class="muted">Ve más, planea mejor.</p></div><div class="card"><ul class="list"><li>'+I.check+'<span><strong>Presupuestos</strong> por categoría con avisos al acercarte al límite.</span></li><li>'+I.check+'<span><strong>Alertas avanzadas</strong> de pagos, cobros duplicados y gastos inusuales.</span></li><li>'+I.check+'<span><strong>Historial de 24 meses</strong> de tus movimientos.</span></li></ul></div><div class="card center"><div class="amount">$9.900</div><div class="small muted">al mes · precio de ejemplo · primer mes gratis</div></div>',foot:'<button class="btn btn-primary" data-act="premium">Quiero probar Plus</button>'+tabbar('f8')};
}

/* ---------- Acciones ---------- */
function connect(){
  var S=K.S,id=S.q[S.qi],c=S.cons;
  S.conn[id]=c;K.log('entidad_conectada',{entidad:ent(id).n,saldos:c.saldos,movimientos:c.movs,creditos:c.cred,vigencia:c.vig,ms_f3:Date.now()-S.t3});
  var off=['saldos','movs','cred'].filter(function(k){return !c[k];});if(off.length)K.log('casillas_desmarcadas',{entidad:ent(id).n,datos:off.join('|')});
  S.qi++;S.cons=null;S.t3=0;S.sel[id]=false;
  if(S.qi>=S.q.length){K.complete({entidades:connIds().length});K.go('f4');}else K.go('f3');
}
function confirmSheet(titulo,texto,btn,act,id){K.openSheet(K.sheetHead(titulo)+'<p>'+texto+'</p><button class="btn btn-danger" data-act="'+act+'" data-id="'+id+'">'+btn+'</button><button class="btn btn-secondary" style="margin-top:8px" data-act="closeSheet">Cancelar</button>');}
function remove(id,modo){
  var S=K.S;delete S.conn[id];S.sel[id]=false;K.log(modo==='eliminar'?'datos_eliminados':'autorizacion_revocada',{entidad:ent(id).n,desde:K.cur});K.closeSheet();K.toast(modo==='eliminar'?'Eliminamos tus datos de '+ent(id).n:'Revocaste la autorización de '+ent(id).n);K.rerender();
}

K.run({
  id:'d5',title:'D5 · PFM consolidado',layout:'phone',
  params:[{k:'canal',label:'Canal',def:'ach',opts:[['ach','Mis Finanzas ACH · app independiente'],['coop','Mis finanzas dentro de la app de Cooperativa Valle Unido']]},{k:'pre',label:'Estado inicial',def:'0',opts:[['0','Sin entidades conectadas'],['1','Con Banco Andino, Pacífico Digital y Cooperativa conectadas']]}],
  state:fresh,start:function(p){return p.pre==='1'?'f4':'f1';},
  codes:{f1:'F1',f2:'F2',f3:'F3',f4:'F4',f5:'F5',f6:'F6',f7:'F7',f8:'F8'},
  labels:{f1:'F1 Bienvenida',f2:'F2 Elegir entidades',f3:'F3 Consentimiento',f4:'F4 Vista consolidada',f5:'F5 Movimientos',f6:'F6 Tendencias',f7:'F7 Autorizaciones',f8:'F8 Premium'},
  groups:[['Pantallas',['f1','f2','f3','f4','f5','f6','f7','f8']]],
  routes:{f1:f1,f2:f2,f3:f3,f4:f4,f5:f5,f6:f6,f7:f7,f8:f8},
  acts:{
    empezar:function(){K.go('f2');},
    continuarEnt:function(){var S=K.S,q=ENT.filter(function(e){return S.sel[e.id]&&!conn()[e.id];}).map(function(e){return e.id;});if(!q.length){K.toast('Elige al menos una entidad');K.vErr(['entidades']);return;}S.q=q;S.qi=0;S.cons=null;S.t3=0;K.log('entidades_elegidas',{n:q.length,lista:q.map(function(i){return ent(i).n;}).join('|')});K.go('f3');},
    autenticar:function(){
      var S=K.S,e=ent(S.q[S.qi]);
      K.ov('<div class="avatar" style="width:56px;height:56px;font-size:22px">'+esc(e.n.charAt(0))+'</div><h2 class="ov-t">Ingresa a '+esc(e.n)+'</h2><p class="muted small">Autenticación simulada en la entidad. Escribe cualquier clave.</p><input type="password" id="ac" style="max-width:260px" aria-label="Clave de la entidad" autocomplete="off"><button class="btn btn-primary" data-act="autOk">Autorizar</button>');
      var i=document.getElementById('ac');if(i)i.focus();
    },
    autOk:function(){var i=document.getElementById('ac');if(!i||!i.value.trim()){K.toast('Escribe cualquier clave');return;}K.busy('Conectando…',1200).then(function(ok){if(ok)connect();});},
    recat:function(el){var id=el.dataset.id,m=visMov().filter(function(x){return x.id===id;})[0];K.openSheet(K.sheetHead('Cambiar categoría')+'<p class="muted small">'+esc(m.d)+' · '+money(m.v)+'</p>'+CATS.map(function(c){return '<label class="opt"><input type="radio" name="cat" value="'+c+'" data-inp="cat" data-id="'+id+'"'+(m.c===c?' checked':'')+'> '+c+'</label>';}).join(''));},
    editar:function(el){var id=el.dataset.id,c=conn()[id];K.openSheet(K.sheetHead('Datos de '+esc(ent(id).n))+[['saldos','Saldos de cuentas'],['movs','Movimientos'],['cred','Productos de crédito']].map(function(k){return '<label class="opt"><input type="checkbox" data-inp="edit" data-id="'+id+'" data-k="'+k[0]+'"'+(c[k[0]]?' checked':'')+'> '+k[1]+'</label>';}).join('')+'<button class="btn btn-primary" data-act="closeSheet">Listo</button>');},
    revocar:function(el){confirmSheet('¿Revocar la autorización?','Dejaremos de leer los datos de <strong>'+esc(ent(el.dataset.id).n)+'</strong> y desaparecerán de todas tus vistas.','Sí, revocar','okRevocar',el.dataset.id);},
    okRevocar:function(el){remove(el.dataset.id,'revocar');},
    eliminar:function(el){confirmSheet('¿Eliminar tus datos?','Además de revocar, borraremos los datos que ya habíamos leído de <strong>'+esc(ent(el.dataset.id).n)+'</strong>. Esta acción no se puede deshacer.','Sí, eliminar mis datos','okEliminar',el.dataset.id);},
    okEliminar:function(el){remove(el.dataset.id,'eliminar');},
    premium:function(){K.log('clic_premium',{precio_ejemplo:9900});K.openSheet(K.sheetHead('¡Gracias por tu interés!')+'<p>Esta función aún no está disponible y no te cobramos nada. Estamos midiendo cuánto te interesa.</p><label for="pp">¿Cuánto pagarías al mes por Plus?</label><select id="pp" data-inp="precio"><option value="">Elige una opción</option><option>Nada</option><option>$5.000</option><option>$9.900</option><option>$15.000 o más</option></select><button class="btn btn-primary" style="margin-top:12px" data-act="closeSheet">Cerrar</button>');}
  },
  inps:{
    busq:function(el){K.S.busq=el.value;var q=K.norm(el.value);K.html('elist',listHtml(ENT.filter(function(e){return !q||K.norm(e.n).indexOf(q)>=0;})));},
    ent:function(el,ty){if(ty!=='change')return;K.S.sel[el.dataset.id]=el.checked;},
    cons:function(el,ty){if(ty!=='change')return;K.S.cons[el.dataset.k]=el.checked;K.log(el.checked?'casilla_marcada':'casilla_desmarcada',{dato:el.dataset.k});},
    vig:function(el,ty){if(ty!=='change')return;K.S.cons.vig=el.value;K.rerender();},
    cat:function(el,ty){if(ty!=='change')return;var m=MOV.filter(function(x){return x[0]===el.dataset.id;})[0];K.S.recat[el.dataset.id]=el.value;K.log('recategorizar',{movimiento:m[2],de:m[4],a:el.value});K.closeSheet();K.rerender();},
    edit:function(el,ty){if(ty!=='change')return;conn()[el.dataset.id][el.dataset.k]=el.checked;K.log('autorizacion_editada',{entidad:ent(el.dataset.id).n,dato:el.dataset.k,compartido:el.checked});K.rerender();},
    precio:function(el,ty){if(ty==='change')K.log('precio_disposicion',{respuesta:el.value});}
  }
});
