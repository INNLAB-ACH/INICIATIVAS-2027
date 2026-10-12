/* C5 · PSE Internacional — pagar PILA o la cuota de vivienda desde una cuenta en el exterior (celular) */
var esc=K.esc,money=K.money,I=K.I;
var PAISES={
  ES:{n:'España',m:'EUR',s:'€',fx:4380,banks:[['Banco Mediterráneo',true],['Caixa Costa Digital',true],['Neobanco Sol',false]]},
  US:{n:'Estados Unidos',m:'USD',s:'US$',fx:4050,banks:[['Liberty National Bank',true],['Pacific Coast Bank',true],['Neobank Alba',false]]},
  MX:{n:'México',m:'MXN',s:'MX$',fx:235,banks:[['Banco Sierra Madre',true],['Banco Nuevo Azteca',true],['Fintech Nopal',false]]}
};
var CASOS={
  pila:{t:'Planilla de seguridad social (PILA)',d:'Cotizante independiente · Septiembre 2026',ref:'PL-2026-09-30417',valor:412800,nom:'Marta Lucía Ortiz · C.C. 52.•••.418',lim:'Vence el 13/10/2026',efe:'La fecha efectiva de tu aporte es el día en que autorizas el pago, siempre que sea antes del vencimiento.'},
  viv:{t:'Cuota de crédito de vivienda',d:'Banco Andino · cuota 37 de 180',ref:'CR-884120-37',valor:1286400,nom:'Marta Lucía Ortiz · C.C. 52.•••.418',lim:'Vence el 15/10/2026',efe:'El banco acreedor recibe el pago en Colombia y lo aplica a tu cuota del día siguiente hábil.'}
};
var FEE=9500,SPREAD=0.012;

function S(){return K.S;}
function fresh(){return {caso:'pila',pais:'ES',bank:null,txn:null,ans:null,clave:''};}
function bk(){return S().bank||pais().banks[0][0];}
function pais(){return PAISES[S().pais];}
function caso(){return CASOS[S().caso];}
function cotiz(){
  var p=pais(),c=caso(),totalCop=c.valor+FEE,base=totalCop/p.fx,sp=base*SPREAD,loc=base+sp;
  return {cop:c.valor,fee:FEE,totalCop:totalCop,base:base,sp:sp,loc:loc};
}
function lm(n){var p=pais();return p.s+' '+n.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function route(o){return {bar:K.appbar({back:o.back,title:o.title,mark:K.mark('P')}),body:o.body,foot:o.cta};}
function steps(n){return '<p class="muted small" aria-label="Paso '+n+' de 4">Paso '+n+' de 4</p>';}

function pay(){
  var S_=S(),cl=document.getElementById('clave');
  if(cl&&!cl.value.trim()){K.setErr('e-clave','Escribe cualquier código para continuar.','clave');K.vErr(['clave']);cl.focus();return;}
  if(K.maybeFail('pay')){K.showError('No pudimos conectar con tu banco','Fue un problema temporal. Tu dinero no se movió. Intenta de nuevo.',pay);return;}
  K.busy('Autorizando tu pago en '+esc(bk())+'…',1600).then(function(ok){if(!ok)return;S_.txn=K.rnd(10);K.go('p5');});
}
function recibo(){
  var q=cotiz(),c=caso(),S_=S();
  return ['COMPROBANTE PSE INTERNACIONAL · PROTOTIPO (datos ficticios)','Concepto: '+c.t,'Referencia: '+c.ref,'Valor en Colombia: '+money(q.cop),'Debitado de tu cuenta: '+lm(q.loc),'Banco: '+S_.bank+' ('+pais().n+')','Transacción: '+S_.txn,'Autorizado: 12/10/2026 22:40 (hora Colombia)'].join('\n');
}

var ROUTES={
  p1:function(){
    var S_=S();
    var opts=Object.keys(CASOS).map(function(k){var c=CASOS[k];return '<label class="opt"><input type="radio" name="caso" value="'+k+'" data-inp="caso"'+(S_.caso===k?' checked':'')+'><span>'+c.t+'<span class="d">'+c.d+' · '+money(c.valor)+'</span></span></label>';}).join('');
    return route({title:'Paga desde el exterior',cta:'<button class="btn btn-primary" data-act="nav" data-to="p2">Continuar</button>',body:
      steps(1)+'<p class="eyebrow">PSE Internacional</p><h1>Paga en Colombia desde tu cuenta de aquí</h1>'+
      '<div class="banner ok">'+I.info+' <strong>Sin cuenta en Colombia.</strong> Pagas con la app de tu banco en el país donde vives; el pago llega en pesos.</div>'+
      '<fieldset><legend>¿Qué quieres pagar?</legend>'+opts+'</fieldset>'});
  },
  p2:function(){
    var S_=S();
    var paises=Object.keys(PAISES).map(function(k){return '<label class="opt"><input type="radio" name="pais" value="'+k+'" data-inp="pais"'+(S_.pais===k?' checked':'')+'><span>'+PAISES[k].n+'<span class="d">Moneda: '+PAISES[k].m+'</span></span></label>';}).join('');
    var banks=pais().banks.map(function(b){return '<label class="opt"><input type="radio" name="bank" value="'+esc(b[0])+'" data-inp="bank"'+(S_.bank===b[0]?' checked':'')+'><span>'+esc(b[0])+(b[1]?'':'<span class="d">Aún no conectado</span>')+'</span></label>';}).join('');
    return route({back:'p1',title:'Tu país y tu banco',cta:'<button class="btn btn-primary" data-act="toQuote">Ver cuánto pagarás</button>',body:
      steps(2)+'<h1>¿Desde dónde pagas?</h1><fieldset><legend>País donde vives</legend>'+paises+'</fieldset><fieldset id="banks"><legend>Tu banco en '+pais().n+'</legend>'+banks+'</fieldset><p class="err" id="e-bank" role="alert"></p>'});
  },
  p3:function(){
    var q=cotiz(),c=caso(),B=S().p.v==='B';
    var tot='<div class="card"><p class="muted small">Pagarás desde tu cuenta</p><p style="font-size:30px;font-weight:800;margin:2px 0">'+lm(q.loc)+'</p><p class="muted small">Llegan a Colombia '+money(q.cop)+' · '+esc(c.t)+'</p></div>';
    var det=B?'<div class="card">'+K.row('Valor en Colombia',money(q.cop))+K.row('Comisión fija del servicio',money(q.fee))+K.row('Tasa de cambio',pais().m+' 1 = '+money(pais().fx))+K.row('Margen de cambio ('+(SPREAD*100).toFixed(1).replace('.',',')+' %)',lm(q.sp))+K.row('Total debitado',lm(q.loc),true)+'</div><p class="hint">La tasa se fija durante 60 segundos desde que ves esta pantalla.</p>':'<p class="hint">Incluye comisión y conversión de moneda.</p>';
    return route({back:'p2',title:'Cotización',cta:'<button class="btn btn-primary" data-act="nav" data-to="p4">Pagar '+lm(q.loc)+'</button>',body:steps(3)+'<h1>Esto es lo que pagarás</h1>'+tot+det});
  },
  p4:function(){
    var q=cotiz(),S_=S();
    return route({back:'p3',title:'Autoriza en tu banco',cta:'<button class="btn btn-primary" data-act="pay">Autorizar pago</button>',body:
      steps(4)+'<h1>Autoriza en '+esc(bk())+'</h1><div class="card">'+K.row('Concepto',esc(caso().t))+K.row('Referencia',caso().ref)+K.row('Total',lm(q.loc),true)+'</div>'+
      '<label for="clave">Código de seguridad de tu banco</label><input type="password" id="clave" autocomplete="off" data-inp="clave"><p class="hint">Escribe cualquier código. Es una simulación.</p><p class="err" id="e-clave" role="alert"></p>'});
  },
  p5:function(){
    var q=cotiz(),c=caso(),S_=S();K.complete({caso:S_.caso,pais:S_.pais});
    var a=S_.ans,ans=a?'<p class="banner ok" role="status">Gracias por tu respuesta: <strong>'+esc(a)+'</strong>.</p>':'<div class="chips" role="group" aria-label="Respuesta">'+['Sí','Tal vez','No'].map(function(x){return '<button class="chip" data-act="answer" data-id="'+x+'" aria-pressed="false">'+x+'</button>';}).join('')+'</div>';
    return route({title:'Comprobante',body:'<div class="center">'+I.ok+'<h1>Pago enviado</h1><p class="muted">Transacción No. <strong>'+S_.txn+'</strong></p></div>'+
      '<div class="card">'+K.row('Concepto',esc(c.t))+K.row('Llegó a Colombia',money(q.cop))+K.row('Debitado de tu cuenta',lm(q.loc))+K.row('Banco',esc(bk()))+'</div>'+
      '<div class="banner">'+I.info+' '+esc(c.efe)+'</div>'+
      '<p><button class="link" data-act="recibo">Descargar comprobante</button></p>'+
      '<div class="survey"><h3>¿Usarías este servicio en lugar de tu opción actual?</h3>'+ans+'</div>'});
  },
  p6:function(){
    return route({back:'p2',title:'Banco no conectado',cta:'<button class="btn btn-primary" data-act="altBank">Usar '+esc(pais().banks[0][0])+'</button><button class="btn btn-secondary" data-act="nav" data-to="p2">Elegir otro banco</button>',body:
      '<div class="center">'+I.alert+'<h1>'+esc(bk())+' aún no está conectado</h1><p class="muted">Todavía no podemos recibir pagos desde esa entidad. Puedes pagar con otro banco de '+pais().n+' ahora mismo.</p></div>'});
  }
};

K.run({
  id:'c5',title:'C5 · PSE Internacional',layout:'phone',
  params:[{k:'v',label:'Variante de la cotización',def:'A',opts:[['A','A · Solo el total en tu moneda'],['B','B · Desglose: comisión, tasa y margen de cambio']]}],
  state:fresh,start:function(){return 'p1';},
  labels:{p1:'P1 Qué pagar',p2:'P2 País y banco',p3:'P3 Cotización',p4:'P4 Autorizar',p5:'P5 Comprobante',p6:'P6 Banco no conectado'},
  groups:[['Pantallas',['p1','p2','p3','p4','p5','p6']]],
  routes:ROUTES,
  acts:{
    toQuote:function(){
      var S_=S(),b=pais().banks.filter(function(x){return x[0]===S_.bank;})[0];
      if(!b){K.setErr('e-bank','Elige tu banco para continuar.');K.vErr(['bank']);return;}
      if(!b[1]){K.log('banco_no_conectado',{banco:S_.bank});K.go('p6');return;}
      K.go('p3');
    },
    pay:pay,
    recibo:function(){K.download('comprobante-pse-internacional.txt',recibo());K.toast('Comprobante descargado');},
    answer:function(el){K.S.ans=el.dataset.id;K.log('respuesta_embebida',{pregunta:'usaria_servicio',respuesta:el.dataset.id});K.rerender();},
    altBank:function(){K.S.bank=pais().banks[0][0];K.go('p3');}
  },
  inps:{
    caso:function(el){K.S.caso=el.value;K.log('caso_elegido',{caso:el.value});},
    pais:function(el){K.S.pais=el.value;K.S.bank=null;K.log('pais_elegido',{pais:el.value});K.rerender();},
    bank:function(el){K.S.bank=el.value;K.log('banco_seleccionado',{banco:el.value});K.setErr('e-bank','');},
    clave:function(el){if(el.value)K.setErr('e-clave','','clave');}
  }
});
