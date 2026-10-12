/* B6 · Módulo de venta presente (QR/NFC) — comercio y cliente (celular) */
var esc=K.esc,money=K.money,I=K.I;
var COMERCIO='Tienda Doña Rosa',LLAVE='@donarosa.tienda';
function S(){return K.S;}
function fresh(){return {venta:48500,pago:null,metodo:'qr',txn:null,ans:null,nfc:0,hoy:612000,n:14,exp:false};}
function route(o){return {bar:K.appbar({back:o.back,title:o.title,mark:K.mark('Q')}),body:o.body,foot:o.cta};}
function qrSvg(seed){
  var n=21,s=0,i;for(i=0;i<seed.length;i++)s=(s*31+seed.charCodeAt(i))>>>0;
  function r(){s=(s*1664525+1013904223)>>>0;return s/4294967296;}
  var out='',u=8;
  function finder(x,y){return '<rect x="'+x*u+'" y="'+y*u+'" width="'+7*u+'" height="'+7*u+'" fill="#0D1B2A"/><rect x="'+(x+1)*u+'" y="'+(y+1)*u+'" width="'+5*u+'" height="'+5*u+'" fill="#fff"/><rect x="'+(x+2)*u+'" y="'+(y+2)*u+'" width="'+3*u+'" height="'+3*u+'" fill="#0D1B2A"/>';}
  for(var y=0;y<n;y++)for(var x=0;x<n;x++){
    var inF=(x<8&&y<8)||(x>n-9&&y<8)||(x<8&&y>n-9);
    if(!inF&&r()>0.52)out+='<rect x="'+x*u+'" y="'+y*u+'" width="'+u+'" height="'+u+'" fill="#0D1B2A"/>';
  }
  return '<svg viewBox="0 0 '+n*u+' '+n*u+'" width="220" height="220" role="img" aria-label="Código QR de cobro" style="background:#fff;border:6px solid #fff;border-radius:8px">'+out+finder(0,0)+finder(n-7,0)+finder(0,n-7)+'</svg>';
}
function dyn(){return S().p.v==='B';}
function recibo(){var s=S();return ['COBRO PRESENCIAL · PROTOTIPO (datos ficticios)','Comercio: '+COMERCIO,'Venta: '+money(s.venta),'Recibido: '+money(s.pago==null?s.venta:s.pago),'Medio: '+(s.metodo==='nfc'?'Tarjeta por NFC':'QR '+(dyn()?'dinámico':'estático')),'Transacción: '+(s.txn||'—')].join('\n');}

var ROUTES={
  p1:function(){
    var s=S();
    return route({title:COMERCIO,body:
      '<p class="eyebrow">Caja · hoy</p><h1>'+money(s.hoy)+'</h1><p class="muted">'+s.n+' cobros · sin datáfono</p>'+
      '<div class="card"><h3>Nuevo cobro</h3><label for="venta">Valor de la venta</label><input id="venta" type="number" inputmode="numeric" min="1" value="'+s.venta+'" data-inp="venta" style="font-size:24px;font-weight:700"><p class="err" id="e-venta" role="alert"></p></div>',
      cta:'<button class="btn btn-primary" data-act="cobrarQr">Cobrar con QR</button><button class="btn btn-secondary" data-act="cobrarNfc">Cobrar con tarjeta (NFC)</button>'});
  },
  p2:function(){
    var s=S(),id=dyn()?'DIN-'+s.venta+'-'+(s.exp?'x':'1'):'EST-donarosa';
    var info=dyn()?'<p class="muted">Este código es solo para esta venta de <strong>'+money(s.venta)+'</strong>. '+(s.exp?'<span class="badge err">Venció</span>':'Vence en 2:00.')+'</p>':'<p class="muted">Este es tu QR fijo. El cliente <strong>escribe el valor</strong> al pagar. Venta pedida: '+money(s.venta)+'.</p>';
    return route({back:'p1',title:'Muestra el QR',body:'<div class="center"><h1>'+(dyn()?'QR de esta venta':'Tu QR fijo')+'</h1>'+qrSvg(id)+'<p class="small muted">Llave Bre-B '+LLAVE+'</p></div>'+info+
      (s.exp?'<div class="banner warn">'+I.alert+' El QR venció. Genera uno nuevo para cobrar.</div>':''),
      cta:(s.exp?'<button class="btn btn-primary" data-act="regen">Generar QR nuevo</button>':'<button class="btn btn-primary" data-act="scan">Simular que el cliente escanea</button><button class="btn btn-secondary" data-act="expire">Simular QR vencido</button>')});
  },
  p3:function(){
    var s=S(),B=dyn();
    return {bar:K.appbar({back:'p2',title:'App del cliente',mark:K.mark('C','#6B2D8B')}),body:'<p class="eyebrow">Banco Pacífico Digital · Pagar con QR</p><h1>Pagas a '+COMERCIO+'</h1>'+
      '<div class="card">'+K.row('Comercio',COMERCIO)+K.row('Llave',LLAVE)+(B?K.row('Valor',money(s.venta),true):'')+'</div>'+
      (B?'':'<label for="pago">¿Cuánto vas a pagar?</label><input id="pago" type="number" inputmode="numeric" min="1" data-inp="pago" placeholder="Escribe el valor" style="font-size:24px;font-weight:700"><p class="hint">En esta prueba puedes escribir cualquier valor.</p><p class="err" id="e-pago" role="alert"></p>'),
      foot:'<button class="btn btn-primary" data-act="paga">Pagar</button>'};
  },
  p4:function(){
    var s=S(),dif=s.pago!=null&&s.pago!==s.venta,B=s.metodo==='nfc';
    K.complete({medio:s.metodo,variante:s.p.v,diferencia:dif});
    var a=s.ans,ans=a?'<p class="banner ok" role="status">Gracias: <strong>'+esc(a)+'</strong>.</p>':'<div class="chips" role="group" aria-label="Respuesta">'+['Sí','Depende del costo','No'].map(function(x){return '<button class="chip" data-act="answer" data-id="'+x+'" aria-pressed="false">'+x+'</button>';}).join('')+'</div>';
    return route({title:'Cobro recibido',body:'<div class="center">'+I.ok+'<h1>Pago recibido</h1><p class="muted">'+(B?'Tarjeta · NFC':'QR '+(dyn()?'dinámico':'estático'))+' · Transacción '+s.txn+'</p></div>'+
      (dif?'<div class="banner warn">'+I.alert+' <strong>El cliente pagó '+money(s.pago)+' y tu venta era de '+money(s.venta)+'.</strong> Revisa el cobro.</div>':'')+
      '<div class="card">'+K.row('Venta',money(s.venta))+K.row('Recibido',money(s.pago==null?s.venta:s.pago),true)+K.row('Disponible','Al instante en tu cuenta')+'</div>'+
      '<p><button class="link" data-act="recibo">Descargar comprobante</button> · <button class="link" data-act="nuevo">Nuevo cobro</button></p>'+
      '<div class="survey"><h3>¿Cambiarías tu datáfono o tu forma actual de cobrar por esto?</h3>'+ans+'</div>'});
  },
  p5:function(){
    var s=S(),st=s.nfc;
    var cuerpo=st===0?'<div class="center"><div style="font-size:64px" aria-hidden="true">📲</div><h1>Acerca la tarjeta al celular</h1><p class="muted">Cobro de '+money(s.venta)+'</p></div>':
      st===1?'<div class="center">'+I.alert+'<h1>No pudimos leer la tarjeta</h1><p class="muted">Acércala de nuevo, sin moverla, 2 segundos.</p></div>':'';
    return route({back:'p1',title:'Cobrar con NFC',body:cuerpo,cta:'<button class="btn btn-primary" data-act="nfcOk">Simular lectura exitosa</button><button class="btn btn-secondary" data-act="nfcFail">Simular lectura fallida</button>'});
  }
};

K.run({
  id:'b6',title:'B6 · Venta presente QR/NFC',layout:'phone',
  params:[{k:'v',label:'Variante del QR',def:'A',opts:[['A','A · QR fijo: el cliente escribe el valor'],['B','B · QR dinámico: valor fijo por venta']]}],
  state:fresh,start:function(){return 'p1';},
  labels:{p1:'P1 Caja',p2:'P2 QR del comercio',p3:'P3 App del cliente',p4:'P4 Cobro recibido',p5:'P5 Cobro NFC'},
  groups:[['Pantallas',['p1','p2','p3','p4','p5']]],
  routes:ROUTES,
  acts:{
    cobrarQr:function(){var s=K.S;if(!(s.venta>=1)){K.setErr('e-venta','Escribe el valor de la venta.','venta');K.vErr(['venta']);return;}s.metodo='qr';s.exp=false;s.pago=null;K.go('p2');},
    cobrarNfc:function(){var s=K.S;if(!(s.venta>=1)){K.setErr('e-venta','Escribe el valor de la venta.','venta');K.vErr(['venta']);return;}s.metodo='nfc';s.nfc=0;K.go('p5');},
    scan:function(){K.log('cliente_escanea');K.go('p3');},
    expire:function(){K.S.exp=true;K.log('qr_vencido');K.rerender();},
    regen:function(){K.S.exp=false;K.log('qr_regenerado');K.rerender();},
    paga:function paga(){
      var s=K.S;
      if(!dyn()){if(!(s.pago>=1)){K.setErr('e-pago','Escribe el valor que vas a pagar.','pago');K.vErr(['pago']);return;}}else s.pago=s.venta;
      if(K.maybeFail('pay')){K.showError('No pudimos procesar el pago','Tu dinero no se movió. Intenta de nuevo.',paga);return;}
      K.busy('Procesando el pago…',1300).then(function(ok){if(!ok)return;s.txn=K.rnd(10);s.hoy+=s.pago;s.n++;K.go('p4');});
    },
    nfcOk:function(){var s=K.S;s.pago=s.venta;K.busy('Leyendo tarjeta…',1200).then(function(ok){if(!ok)return;s.txn=K.rnd(10);s.hoy+=s.pago;s.n++;K.go('p4');});},
    nfcFail:function(){K.S.nfc=1;K.log('nfc_fallo');K.rerender();},
    recibo:function(){K.download('comprobante-cobro.txt',recibo());K.toast('Comprobante descargado');},
    nuevo:function(){var s=K.S;s.pago=null;s.ans=null;s.exp=false;K.go('p1');},
    answer:function(el){K.S.ans=el.dataset.id;K.log('respuesta_embebida',{pregunta:'cambiaria_datafono',respuesta:el.dataset.id});K.rerender();}
  },
  inps:{
    venta:function(el){K.S.venta=parseInt(el.value,10)||0;K.setErr('e-venta','','venta');},
    pago:function(el){K.S.pago=parseInt(el.value,10)||null;K.setErr('e-pago','','pago');}
  }
});
