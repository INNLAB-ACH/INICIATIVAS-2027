/* A6 · Remesas internacionales — remitente (Brasil, PIX) y beneficiario (Colombia, Bre-B) */
var esc=K.esc,money=K.money,I=K.I;
var FX=770,FEE_BRL=9.9,SPREAD=0.008; // 1 BRL = 770 COP (ficticio)
var TRAD={nombre:'Operador tradicional',fee:38.0,spread:0.024,min:'1 a 2 días · retiro en punto físico'};
var DESTINOS=[['Camila Rojas Vélez','Bre-B · @camila.rojas','Banco Andino'],['Héctor Rojas','Cuenta de ahorros ••• 4821','Cooperativa Valle Unido']];

function S(){return K.S;}
function fresh(){return {monto:500,dest:0,txn:null,ans:null,t:0};}
function brl(n){return 'R$ '+n.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function q(m){
  var sp=m*SPREAD,tot=m+FEE_BRL,cop=Math.round((m-sp)*FX);
  var tm=m*TRAD.spread,tcop=Math.round((m-tm-TRAD.fee)*FX);
  return {m:m,fee:FEE_BRL,sp:sp,total:tot,cop:cop,tcop:tcop,tcost:TRAD.fee+tm};
}
function route(o){return {bar:K.appbar({back:o.back,title:o.title,mark:K.mark('R')}),body:o.body,foot:o.cta};}
function vista(){return S().p.vista;}

function send(){
  var S_=S(),cl=document.getElementById('clave');
  if(cl&&!cl.value.trim()){K.setErr('e-clave','Escribe cualquier clave para continuar.','clave');K.vErr(['clave']);cl.focus();return;}
  if(K.maybeFail('send')){K.showError('No pudimos conectar con tu banco','Tu dinero no se movió. Intenta de nuevo.',send);return;}
  K.busy('Enviando tu remesa…',1500).then(function(ok){if(!ok)return;S_.txn=K.rnd(10);K.go('p5');});
}

var ROUTES={
  p1:function(){
    if(vista()==='beneficiario')return ROUTES.p6();
    var S_=S();
    return route({title:'Enviar a Colombia',cta:'<button class="btn btn-primary" data-act="toDest">Continuar</button>',body:
      '<p class="eyebrow">Banco Rio Verde · Brasil</p><h1>Envía dinero a Colombia</h1>'+
      '<div class="banner ok">'+I.info+' Desde tu app, por PIX, directo a la cuenta de tu familia. Sin filas ni puntos de retiro.</div>'+
      '<label for="monto">¿Cuánto quieres enviar? (R$)</label><input id="monto" type="number" inputmode="decimal" min="1" step="1" value="'+S_.monto+'" data-inp="monto" style="font-size:24px;font-weight:700"><p class="err" id="e-monto" role="alert"></p>'+
      '<p class="hint">Límite de esta prueba: R$ 2.000 por envío.</p>'});
  },
  p2:function(){
    var S_=S();
    var opts=DESTINOS.map(function(d,i){return '<label class="opt"><input type="radio" name="dest" value="'+i+'" data-inp="dest"'+(S_.dest===i?' checked':'')+'><span>'+esc(d[0])+'<span class="d">'+esc(d[1])+' · '+esc(d[2])+'</span></span></label>';}).join('');
    return route({back:'p1',title:'¿Quién recibe?',cta:'<button class="btn btn-primary" data-act="nav" data-to="p3">Ver cuánto recibe</button>',body:'<h1>¿A quién le envías?</h1><fieldset><legend>Destinatarios guardados en Colombia</legend>'+opts+'</fieldset>'});
  },
  p3:function(){
    var S_=S(),x=q(S_.monto),A=S_.p.v==='A',d=DESTINOS[S_.dest];
    var main='<div class="card"><p class="muted small">'+esc(d[0].split(' ')[0])+' recibe</p><p style="font-size:30px;font-weight:800;margin:2px 0">'+money(x.cop)+'</p><p class="muted small">En su cuenta, al instante · '+esc(d[2])+'</p></div>';
    var det='<div class="card">'+K.row('Envías',brl(x.m))+K.row('Comisión',brl(x.fee))+K.row('Tasa',brl(1).replace(',00','')+' = '+money(FX))+K.row('Margen de cambio',brl(x.sp))+K.row('Total que pagas',brl(x.total),true)+'</div>';
    var cmp='<div class="card"><h3>Frente a un operador tradicional</h3><table class="dtable" style="width:100%"><thead><tr><th></th><th class="num">Este envío</th><th class="num">Tradicional</th></tr></thead><tbody>'+
      '<tr><td>Recibe</td><td class="num"><strong>'+money(x.cop)+'</strong></td><td class="num">'+money(x.tcop)+'</td></tr>'+
      '<tr><td>Costo total</td><td class="num"><strong>'+brl(x.fee+x.sp)+'</strong></td><td class="num">'+brl(x.tcost)+'</td></tr>'+
      '<tr><td>Llega en</td><td class="num">Segundos</td><td class="num small">'+TRAD.min+'</td></tr></tbody></table><p class="hint">Referencia ficticia del prototipo.</p></div>';
    return route({back:'p2',title:'Cotización',cta:'<button class="btn btn-primary" data-act="nav" data-to="p4">Enviar '+brl(x.total)+'</button>',body:'<h1>Esto recibe tu familia</h1>'+main+det+(A?cmp:'')});
  },
  p4:function(){
    var S_=S(),x=q(S_.monto),d=DESTINOS[S_.dest];
    return route({back:'p3',title:'Confirma',cta:'<button class="btn btn-primary" data-act="send">Confirmar con PIX</button>',body:
      '<h1>Confirma tu envío</h1><div class="card">'+K.row('Para',esc(d[0]))+K.row('Cuenta',esc(d[1]))+K.row('Recibe',money(x.cop))+K.row('Pagas',brl(x.total),true)+'</div>'+
      '<label for="clave">Clave PIX</label><input type="password" id="clave" autocomplete="off" data-inp="clave"><p class="hint">Escribe cualquier clave. Es una simulación.</p><p class="err" id="e-clave" role="alert"></p>'});
  },
  p5:function(){
    var S_=S(),x=q(S_.monto),d=DESTINOS[S_.dest];K.complete({monto:S_.monto,variante:S_.p.v});
    var a=S_.ans,ans=a?'<p class="banner ok" role="status">Gracias: <strong>'+esc(a)+'</strong>.</p>':'<div class="chips" role="group" aria-label="Respuesta">'+['Sí','Depende del costo','No'].map(function(z){return '<button class="chip" data-act="answer" data-id="'+z+'" aria-pressed="false">'+z+'</button>';}).join('')+'</div>';
    return route({title:'Enviado',body:'<div class="center">'+I.ok+'<h1>Remesa enviada</h1><p class="muted">Transacción No. <strong>'+S_.txn+'</strong></p></div>'+
      '<div class="card"><ol class="tl"><li><span class="dot ok">✓</span><h3>Pagado desde tu banco en Brasil</h3><p class="muted small">'+brl(x.total)+'</p></li><li><span class="dot ok">✓</span><h3>Recibido por '+esc(d[0])+' en Colombia</h3><p class="muted small">'+money(x.cop)+' en '+esc(d[2])+'</p></li></ol></div>'+
      '<p><button class="link" data-act="vistaBen">Ver cómo lo recibe tu familia</button></p>'+
      '<div class="survey"><h3>¿Usarías este envío en lugar de tu operador actual?</h3>'+ans+'</div>'});
  },
  p6:function(){
    var S_=S(),x=q(S_.monto);
    return {bar:K.appbar({title:'Banco Andino',mark:K.mark('B')}),body:'<p class="eyebrow">Notificación</p><h1>Recibiste un envío del exterior</h1>'+
      '<div class="card"><p class="muted small">Camila, te enviaron</p><p style="font-size:30px;font-weight:800;margin:2px 0">'+money(x.cop)+'</p><p class="muted small">De Lucas Rojas · Brasil · ya está en tu cuenta</p></div>'+
      '<div class="card">'+K.row('Cuenta','Ahorros ••• 4821')+K.row('Saldo disponible',money(1204300+x.cop),true)+K.row('Retiro en efectivo','No necesario')+'</div>'+
      '<div class="toolbar"><button class="btn btn-secondary sm" data-act="nav" data-to="p1">'+(vista()==='beneficiario'?'Reiniciar':'Volver')+'</button></div>'};
  }
};

K.run({
  id:'a6',title:'A6 · Remesas internacionales',layout:'phone',
  params:[
    {k:'v',label:'Variante de la cotización',def:'A',opts:[['A','A · Con comparación frente a un operador tradicional'],['B','B · Solo lo que recibe y el desglose']]},
    {k:'vista',label:'Vista',def:'remitente',opts:[['remitente','Remitente (Brasil)'],['beneficiario','Beneficiario (Colombia)']]}],
  state:fresh,start:function(){return 'p1';},
  labels:{p1:'P1 Enviar',p2:'P2 Destinatario',p3:'P3 Cotización',p4:'P4 Confirmar',p5:'P5 Enviado',p6:'P6 Vista del beneficiario'},
  groups:[['Remitente',['p1','p2','p3','p4','p5']],['Beneficiario',['p6']]],
  routes:ROUTES,
  acts:{
    toDest:function(){
      var m=K.S.monto;
      if(!(m>=1)){K.setErr('e-monto','Escribe un monto mayor a cero.','monto');K.vErr(['monto']);return;}
      if(m>2000){K.setErr('e-monto','El límite de esta prueba es R$ 2.000.','monto');K.vErr(['monto']);return;}
      K.go('p2');
    },
    send:send,
    vistaBen:function(){K.log('ver_beneficiario');K.go('p6');},
    answer:function(el){K.S.ans=el.dataset.id;K.log('respuesta_embebida',{pregunta:'usaria_en_lugar_operador',respuesta:el.dataset.id});K.rerender();}
  },
  inps:{
    monto:function(el){K.S.monto=parseFloat(el.value)||0;K.setErr('e-monto','','monto');},
    dest:function(el){K.S.dest=+el.value;K.log('destinatario',{i:el.value});},
    clave:function(el){if(el.value)K.setErr('e-clave','','clave');}
  }
});
