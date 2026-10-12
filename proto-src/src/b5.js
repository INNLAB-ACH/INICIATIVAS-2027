/* B5 · Escrow (transferencia segura, microfiducia) — comprador y vendedor (celular) */
var esc=K.esc,money=K.money,I=K.I;
var CASOS={
  viv:{t:'Compraventa de vivienda (arras)',monto:35000000,cond:'Los fondos se liberan cuando se firme el registro de la escritura.',contra:'Inmobiliaria Cedro SAS',entrega:'Firma y registro de la escritura'},
  eco:{t:'Compra de alto ticket en línea',monto:4200000,cond:'El pago se libera cuando el comprador confirme la recepción conforme del producto.',contra:'Tecnomarket Colombia',entrega:'Entrega del portátil'},
  free:{t:'Servicio profesional o freelance',monto:1800000,cond:'El pago se libera cuando el cliente apruebe el trabajo entregado.',contra:'Diseños Pardo (freelance)',entrega:'Entrega y aprobación del diseño'}
};
var TARIFA=0.012,MINIMO=25000;
function S(){return K.S;}
function fresh(p){var v=p&&p.rol==='vendedor';return {caso:'viv',bank:'Banco Andino',txn:v?'7'+K.rnd(9):null,stage:v?2:0,buy:false,sell:false,disp:null,days:0,ans:null};}
function c(){return CASOS[S().caso];}
function fee(){return Math.max(MINIMO,Math.round(c().monto*TARIFA));}
function rol(){return S().p.rol;}
function route(o){return {bar:K.appbar({back:o.back,title:o.title,mark:K.mark('E')}),body:o.body,foot:o.cta};}
function steps(){
  var s=S(),B=s.p.v==='B',rev=B?'Ventana de revisión de 48 h':'Confirmación de ambas partes';
  var li=[['Acuerdo creado',s.stage>=1],['Fondos en garantía',s.stage>=2],[rev,s.stage>=3],['Fondos liberados',s.stage>=4]];
  return '<div class="card"><ol class="tl">'+li.map(function(x,i){return '<li><span class="dot '+(x[1]?'ok':'wait')+'">'+(x[1]?'✓':(i+1))+'</span><h3>'+x[0]+'</h3></li>';}).join('')+'</ol></div>';
}
function pay(){
  var s=S(),cl=document.getElementById('clave');
  if(cl&&!cl.value.trim()){K.setErr('e-clave','Escribe cualquier clave para continuar.','clave');K.vErr(['clave']);cl.focus();return;}
  if(K.maybeFail('pay')){K.showError('No pudimos conectar con tu banco','Tu dinero no se movió. Intenta de nuevo.',pay);return;}
  K.busy('Depositando en la cuenta en garantía…',1500).then(function(ok){if(!ok)return;s.txn=K.rnd(10);s.stage=2;K.go('p4');});
}
function release(){
  var s=S();s.stage=4;K.log('fondos_liberados',{caso:s.caso,variante:s.p.v,dias:s.days});
  K.busy('Liberando fondos por PSE/Transfiya…',1300).then(function(ok){if(ok)K.go('p5');});
}

var ROUTES={
  p1:function(){
    var s=S();
    var opts=Object.keys(CASOS).map(function(k){var x=CASOS[k];return '<label class="opt"><input type="radio" name="caso" value="'+k+'" data-inp="caso"'+(s.caso===k?' checked':'')+'><span>'+x.t+'<span class="d">'+money(x.monto)+'</span></span></label>';}).join('');
    return route({title:'Nuevo acuerdo',cta:'<button class="btn btn-primary" data-act="nav" data-to="p2">Continuar</button>',body:
      '<p class="eyebrow">Transferencia segura</p><h1>Paga seguro: los fondos se liberan solo cuando se cumple lo pactado</h1>'+
      '<fieldset><legend>¿Qué estás pagando?</legend>'+opts+'</fieldset>'+
      '<div class="card">'+K.row('Otra parte',esc(c().contra))+K.row('Condición',esc(c().cond))+'</div>'});
  },
  p2:function(){
    var m=c().monto,f=fee();
    return route({back:'p1',title:'Resumen',cta:'<button class="btn btn-primary" data-act="nav" data-to="p3">Pagar a la cuenta en garantía</button>',body:
      '<h1>Resumen del acuerdo</h1><div class="card">'+K.row('Concepto',esc(c().t))+K.row('Valor pactado',money(m))+K.row('Comisión del servicio ('+(TARIFA*100).toString().replace('.',',')+' %)',money(f))+K.row('Total a depositar',money(m+f),true)+'</div>'+
      '<div class="banner">'+I.info+' Tus fondos quedan retenidos por ACH. El vendedor no los recibe hasta que se cumpla la condición. '+(S().p.v==='B'?'Tienes 48 horas para revisar antes de la liberación automática.':'Deben confirmar ambas partes.')+'</div>'});
  },
  p3:function(){
    var s=S(),t=c().monto+fee();
    return route({back:'p2',title:'Pago con PSE',cta:'<button class="btn btn-primary" data-act="pay">Depositar '+money(t)+'</button>',body:
      '<h1>Deposita en garantía</h1><p class="muted">Total: <strong>'+money(t)+'</strong></p>'+
      '<fieldset><legend>Tu banco</legend>'+['Banco Andino','Banco del Pacífico Digital'].map(function(b){return '<label class="opt"><input type="radio" name="bank" value="'+b+'" data-inp="bank"'+(s.bank===b?' checked':'')+'><span>'+b+'</span></label>';}).join('')+'</fieldset>'+
      '<label for="clave">Clave de tu banco</label><input type="password" id="clave" autocomplete="off" data-inp="clave"><p class="hint">Escribe cualquier clave. Es una simulación.</p><p class="err" id="e-clave" role="alert"></p>'});
  },
  p4:function(){
    var s=S(),B=s.p.v==='B',comp=rol()==='comprador',m=c().monto,btn='';
    if(comp){
      if(B){
        btn=s.days>=2?'<button class="btn btn-primary" data-act="release">Liberar fondos ahora</button>':'<button class="btn btn-primary" data-act="release">Confirmar cumplimiento y liberar</button><button class="btn btn-secondary" data-act="advance">Simular que pasan 48 h sin reclamo</button>';
      }else{
        btn='<button class="btn btn-primary" data-act="confirmBuy"'+(s.buy?' disabled':'')+'>'+(s.buy?'Confirmaste el cumplimiento':'Confirmo el cumplimiento')+'</button>'+(s.buy&&!s.sell?'<button class="btn btn-secondary" data-act="confirmSell">Simular confirmación del vendedor</button>':'');
      }
      btn+='<button class="btn btn-ghost" data-act="nav" data-to="p6">Hay un problema: abrir disputa</button>';
    }else{
      btn='<div class="banner">'+I.info+' Cuando cumplas ('+esc(c().entrega).toLowerCase()+'), el comprador confirma y se liberan los fondos.</div>'+(B?'':'<button class="btn btn-primary" data-act="confirmSell"'+(s.sell?' disabled':'')+'>'+(s.sell?'Confirmaste la entrega':'Confirmo que entregué')+'</button>');
    }
    var est=s.stage>=3?'<span class="badge ok">Listo para liberar</span>':'<span class="badge warn">Fondos retenidos</span>';
    var wait=(!B&&s.buy&&!s.sell)?'<p class="hint">Falta la confirmación del vendedor.</p>':'';
    return route({title:comp?'Tu acuerdo':'Acuerdo del vendedor',cta:btn,body:
      '<h1>'+esc(c().t)+'</h1><div class="card">'+K.row('Valor en garantía',money(m),true)+K.row('Estado',est)+K.row(comp?'Vendedor':'Comprador',comp?esc(c().contra):'Laura Montoya')+K.row('Transacción',s.txn||'—')+(B?K.row('Tiempo de revisión',(s.days>=2?'Cumplido (48 h)':'48 h desde la entrega')):'')+'</div>'+steps()+wait});
  },
  p5:function(){
    var s=S(),a=s.ans;K.complete({caso:s.caso,variante:s.p.v});
    var ans=a?'<p class="banner ok" role="status">Gracias: <strong>'+esc(a)+'</strong>.</p>':'<div class="chips" role="group" aria-label="Respuesta">'+['Sí','Depende del costo','No'].map(function(x){return '<button class="chip" data-act="answer" data-id="'+x+'" aria-pressed="false">'+x+'</button>';}).join('')+'</div>';
    return route({title:'Fondos liberados',body:'<div class="center">'+I.ok+'<h1>Fondos liberados</h1><p class="muted">Se pagaron '+money(c().monto)+' a '+esc(c().contra)+'</p></div>'+steps()+
      '<div class="card">'+K.row('Comisión cobrada',money(fee()))+K.row('Transacción',s.txn)+'</div>'+
      '<div class="survey"><h3>¿Pagarías una comisión de '+(TARIFA*100).toString().replace('.',',')+' % por este servicio?</h3>'+ans+'</div>'});
  },
  p6:function(){
    var s=S();
    var mot=['El producto o servicio no corresponde a lo pactado','No me han entregado','Hay un problema con los documentos','Otro motivo'];
    return route({back:'p4',title:'Abrir disputa',cta:'<button class="btn btn-primary" data-act="dispute">Enviar disputa</button>',body:
      (s.disp?'<div class="center">'+I.alert+'<h1>Disputa abierta</h1><p class="muted">Congelamos los fondos. Un mediador responde en 5 días hábiles. Radicado '+esc(s.disp)+'.</p></div>':
      '<h1>¿Qué pasó?</h1><fieldset><legend>Motivo</legend>'+mot.map(function(m,i){return '<label class="opt"><input type="radio" name="mot" value="'+i+'" data-inp="mot"><span>'+m+'</span></label>';}).join('')+'</fieldset><label for="det">Cuéntanos más</label><textarea id="det" rows="3" data-inp="det"></textarea><p class="err" id="e-mot" role="alert"></p>')});
  }
};

K.run({
  id:'b5',title:'B5 · Escrow',layout:'phone',
  params:[
    {k:'v',label:'Variante de la liberación',def:'A',opts:[['A','A · Liberación cuando ambas partes confirman'],['B','B · Ventana de revisión de 48 h y liberación automática']]},
    {k:'rol',label:'Rol',def:'comprador',opts:[['comprador','Comprador'],['vendedor','Vendedor']]}],
  state:fresh,start:function(p){return p.rol==='vendedor'?'p4':'p1';},
  labels:{p1:'P1 Nuevo acuerdo',p2:'P2 Resumen',p3:'P3 Depósito PSE',p4:'P4 Estado del acuerdo',p5:'P5 Fondos liberados',p6:'P6 Disputa'},
  groups:[['Pantallas',['p1','p2','p3','p4','p5','p6']]],
  routes:ROUTES,
  acts:{
    pay:pay,release:release,
    confirmBuy:function(){var s=K.S;s.buy=true;if(s.sell){s.stage=3;release();return;}K.rerender();},
    confirmSell:function(){var s=K.S;s.sell=true;K.log('confirma_vendedor');if(s.buy){s.stage=3;release();return;}if(s.stage<2)s.stage=2;K.rerender();},
    advance:function(){var s=K.S;s.days=2;s.stage=3;K.log('estado_simulado',{horas:48});K.rerender();},
    dispute:function(){
      var s=K.S;if(!s.motivo&&s.motivo!==0){K.setErr('e-mot','Elige un motivo.');K.vErr(['mot']);return;}
      s.disp='DSP-'+K.rnd(6);K.log('disputa_abierta',{motivo:s.motivo,caso:s.caso});K.rerender();
    },
    answer:function(el){K.S.ans=el.dataset.id;K.log('respuesta_embebida',{pregunta:'pagaria_comision',respuesta:el.dataset.id});K.rerender();}
  },
  inps:{
    caso:function(el){K.S.caso=el.value;K.log('caso_elegido',{caso:el.value});},
    bank:function(el){K.S.bank=el.value;},
    clave:function(el){if(el.value)K.setErr('e-clave','','clave');},
    mot:function(el){K.S.motivo=+el.value;K.setErr('e-mot','');},
    det:function(){}
  }
});
