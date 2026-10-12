/* A7 · Pago presente internacional — pagar en Colombia con la app bancaria de Brasil (QR Bre-B presencial o e-commerce) */
var esc=K.esc,money=K.money,I=K.I;
var FX=770,SPREAD=0.008,COM='Café Origen Cali',LLAVE='@cafeorigen.cali';
var ITEMS=[['Café de origen 340 g',58000],['Envío a Cali',12000]];
function S(){return K.S;}
function fresh(){return {txn:null,ans:null,fx:FX,t:0,vence:false,modo:null};}
function modo(){return S().p.modo;}
function monto(){return modo()==='ecommerce'?ITEMS.reduce(function(a,x){return a+x[1];},0):38500;}
function brl(n){return 'R$ '+n.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function conv(){var cop=monto(),base=cop/S().fx,sp=base*SPREAD;return {cop:cop,base:base,sp:sp,tot:base+sp};}
function bar(back,t){return K.appbar({back:back,title:t||'Banco Rio Verde',mark:K.mark('R','#0B7A4B')});}
function pay(){
  var s=S(),cl=document.getElementById('clave');
  if(cl&&!cl.value.trim()){K.setErr('e-clave','Escribe cualquier clave para continuar.','clave');K.vErr(['clave']);cl.focus();return;}
  if(K.maybeFail('pay')){K.showError('No pudimos conectar con la red de pagos','Tu dinero no se movió. Intenta de nuevo.',pay);return;}
  K.busy('Pagando por PIX → Bre-B…',1500).then(function(ok){if(!ok)return;s.txn=K.rnd(10);K.go('p5');});
}
function recibo(){var q=conv();return ['PAGO INTERNACIONAL · PROTOTIPO (datos ficticios)','Comercio: '+COM,'Valor en Colombia: '+money(q.cop),'Debitado: '+brl(q.tot),'Tasa: R$ 1 = '+money(S().fx),'Transacción: '+(S().txn||'—')].join('\n');}

var ROUTES={
  p1:function(){
    if(modo()==='ecommerce')return ROUTES.p7();
    return {bar:bar(null,'Banco Rio Verde'),body:'<p class="eyebrow">Estás de viaje en Colombia</p><h1>Hola, Lucas</h1><div class="card"><p class="muted small">Saldo disponible</p><p style="font-size:28px;font-weight:800;margin:2px 0">'+brl(3820.45)+'</p></div>'+
      '<div class="banner ok">'+I.info+' <strong>Paga en comercios de Colombia con tu app.</strong> Escanea cualquier QR Bre-B y pagas en pesos desde tu cuenta en reales.</div>',
      foot:'<button class="btn btn-primary" data-act="nav" data-to="p2">Pagar con QR</button>'};
  },
  p2:function(){
    return {bar:bar('p1','Escanear QR'),body:'<div class="center"><div style="width:220px;height:220px;margin:8px auto;border:3px dashed var(--blue,#005FA3);border-radius:16px;display:grid;place-items:center" aria-hidden="true">📷</div><h1>Apunta al QR del comercio</h1><p class="muted">En esta prueba, toca «Simular escaneo».</p></div>',
      foot:'<button class="btn btn-primary" data-act="scan">Simular escaneo</button><button class="btn btn-secondary" data-act="scanBad">Simular QR ilegible</button>'};
  },
  p3:function(){
    var s=S(),q=conv(),B=s.p.v==='B';
    var mainA='<div class="card"><p class="muted small">Pagarás desde tu cuenta</p><p style="font-size:30px;font-weight:800;margin:2px 0">'+brl(q.tot)+'</p><p class="muted small">El comercio recibe '+money(q.cop)+'</p></div>';
    var mainB='<div class="card"><p class="muted small">Valor en '+esc(COM)+'</p><p style="font-size:30px;font-weight:800;margin:2px 0">'+money(q.cop)+'</p><p class="muted small">Equivale a '+brl(q.tot)+' de tu cuenta</p></div>';
    var det='<div class="card">'+K.row('Tasa','R$ 1 = '+money(s.fx))+K.row('Margen de cambio',brl(q.sp))+K.row('Total que se debita',brl(q.tot),true)+'</div>'+(B?'<p class="hint">Tasa fija por 60 segundos'+(s.vence?'':'.')+'</p>':'');
    return {bar:bar('p2','Confirmar pago'),body:'<h1>Pagas a '+esc(COM)+'</h1><p class="muted small">Llave Bre-B '+LLAVE+(modo()==='ecommerce'?' · compra en línea':'')+'</p>'+(B?mainB:mainA)+det+
      (s.vence?'<div class="banner warn">'+I.alert+' La tasa venció y se actualizó: ahora R$ 1 = '+money(s.fx)+'.</div>':''),
      foot:'<button class="btn btn-primary" data-act="nav" data-to="p4">Pagar '+brl(q.tot)+'</button>'+(B&&!s.vence?'<button class="btn btn-ghost" data-act="tasa">Simular que pasaron 60 s</button>':'')};
  },
  p4:function(){
    var q=conv();
    return {bar:bar('p3','Autoriza'),body:'<h1>Autoriza con tu clave PIX</h1><div class="card">'+K.row('Comercio',esc(COM))+K.row('Total',brl(q.tot),true)+'</div><label for="clave">Clave PIX</label><input type="password" id="clave" autocomplete="off" data-inp="clave"><p class="hint">Escribe cualquier clave. Es una simulación.</p><p class="err" id="e-clave" role="alert"></p>',
      foot:'<button class="btn btn-primary" data-act="pay">Autorizar</button>'};
  },
  p5:function(){
    var s=S(),q=conv(),a=s.ans;K.complete({modo:modo(),variante:s.p.v});
    var ans=a?'<p class="banner ok" role="status">Gracias: <strong>'+esc(a)+'</strong>.</p>':'<div class="chips" role="group" aria-label="Respuesta">'+['Sí','A veces','No'].map(function(x){return '<button class="chip" data-act="answer" data-id="'+x+'" aria-pressed="false">'+x+'</button>';}).join('')+'</div>';
    return {bar:bar(null,'Comprobante'),body:'<div class="center">'+I.ok+'<h1>Pago realizado</h1><p class="muted">Transacción No. <strong>'+s.txn+'</strong></p></div>'+
      '<div class="card">'+K.row('Comercio',esc(COM))+K.row('Recibió el comercio',money(q.cop))+K.row('Pagaste',brl(q.tot),true)+K.row('Sin tarjeta ni comisión de tarjeta internacional','✓')+'</div>'+
      '<p><button class="link" data-act="recibo">Descargar comprobante</button></p>'+
      '<div class="survey"><h3>¿Pagarías así en tu próximo viaje en lugar de usar tu tarjeta?</h3>'+ans+'</div>'};
  },
  p6:function(){
    return {bar:bar('p2','QR no válido'),body:'<div class="center">'+I.alert+'<h1>No pudimos leer el QR</h1><p class="muted">Acércate un poco más, mejora la luz e inténtalo de nuevo. Si no funciona, pide al comercio que genere un QR nuevo.</p></div>',
      foot:'<button class="btn btn-primary" data-act="nav" data-to="p2">Volver a escanear</button>'};
  },
  p7:function(){
    var tot=monto();
    return {bar:K.appbar({title:COM,mark:K.mark('C','#8A5A2B')}),body:'<p class="eyebrow">Compra en línea · checkout</p><h1>Tu pedido</h1><div class="card">'+ITEMS.map(function(x){return K.row(x[0],money(x[1]));}).join('')+K.row('Total',money(tot),true)+'</div>'+
      '<fieldset><legend>Medio de pago</legend><label class="opt"><input type="radio" name="m" checked><span>PSE · cuenta en Colombia</span></label><label class="opt"><input type="radio" name="m" value="intl" data-inp="medio"><span>Pagar desde mi banco en Brasil, Argentina o Paraguay<span class="d">Sin tarjeta de crédito internacional</span></span></label></fieldset>',
      foot:'<button class="btn btn-primary" data-act="ecoPay">Continuar</button>'};
  }
};

K.run({
  id:'a7',title:'A7 · Pago presente internacional',layout:'phone',
  params:[
    {k:'v',label:'Variante de la confirmación',def:'A',opts:[['A','A · Primero el total en reales'],['B','B · Primero el valor en pesos y tasa fija 60 s']]},
    {k:'modo',label:'Caso',def:'presencial',opts:[['presencial','Presencial: QR Bre-B'],['ecommerce','E-commerce desde el exterior']]}],
  state:fresh,start:function(p){return p.modo==='ecommerce'?'p7':'p1';},
  labels:{p1:'P1 App del banco',p2:'P2 Escanear',p3:'P3 Confirmar',p4:'P4 Autorizar',p5:'P5 Comprobante',p6:'P6 QR ilegible',p7:'P7 Checkout e-commerce'},
  groups:[['Presencial',['p1','p2','p6']],['Pago',['p3','p4','p5']],['E-commerce',['p7']]],
  routes:ROUTES,
  acts:{
    scan:function(){K.log('qr_escaneado');K.go('p3');},
    scanBad:function(){K.log('qr_ilegible');K.go('p6');},
    tasa:function(){var s=K.S;s.fx=FX+6;s.vence=true;K.log('tasa_vencida');K.rerender();},
    pay:pay,
    ecoPay:function(){var s=K.S;if(!s.medio){K.toast('Elige «Pagar desde mi banco en Brasil…» para esta prueba');K.vErr(['medio']);return;}K.go('p3');},
    recibo:function(){K.download('comprobante-pago-internacional.txt',recibo());K.toast('Comprobante descargado');},
    answer:function(el){K.S.ans=el.dataset.id;K.log('respuesta_embebida',{pregunta:'pagaria_asi_en_viaje',respuesta:el.dataset.id});K.rerender();}
  },
  inps:{
    medio:function(el){K.S.medio=el.value;K.log('medio_elegido',{medio:el.value});},
    clave:function(el){if(el.value)K.setErr('e-clave','','clave');}
  }
});
