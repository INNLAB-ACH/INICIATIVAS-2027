/* C4 · Pago PILA 24/7 — escritorio (empresa) y celular (independiente) */
var esc=K.esc,money=K.money,I=K.I;
var PER={
  emp:{layout:'desk',nombre:'Confecciones Andina SAS',doc:'NIT 901.234.567-8',tipo:'Planilla de empresa',cot:'48 empleados',plan:'PL-2026-09-48812',
    items:[['Pensión',7370500,'Fondo Horizonte de Pensiones'],['Salud',5527900,'EPS Andina Salud'],['Riesgos laborales (ARL)',380200,'ARL Sol Andino'],['Caja de compensación',2949200,'Caja de Compensación del Valle'],['SENA',612000,'Entidad de aportes parafiscales'],['ICBF',1586500,'Entidad de aportes parafiscales']]},
  ind:{layout:'phone',nombre:'Marta Lucía Ortiz',doc:'C.C. 52.•••.418',tipo:'Planilla de independiente',cot:'1 cotizante',plan:'PL-2026-09-30417',
    items:[['Pensión',164800,'Fondo Horizonte de Pensiones'],['Salud',128800,'EPS Andina Salud'],['Riesgos laborales (ARL)',20400,'ARL Sol Andino'],['Fondo de solidaridad pensional',98800,'Fondo Horizonte de Pensiones']]}
};
var BANKS=[['Banco Andino',true],['Banco del Pacífico Digital',true],['Cooperativa Valle Unido',true],['Banco Sierra Verde',false]];
var PERIODO='Septiembre 2026',LIMITE='martes 13/10/2026',AHORA='lunes 12/10/2026 · 10:40 p. m.',AUTH='12/10/2026 22:40';

function pf(){return PER[K.S.p.perfil];}
function desk(){return pf().layout==='desk';}
function total(){return pf().items.reduce(function(a,x){return a+x[1];},0);}
function fresh(){return {bank:'Banco Andino',txn:null,disp:false,ans:null};}
function bar(back,title){
  if(desk())return K.dhead({title:'SOI · Seguridad social',mark:K.mark('S'),right:'<span class="muted small">'+esc(pf().nombre)+'</span>'});
  return K.appbar({back:back,title:title||'SOI',mark:K.mark('S')});
}
function backLink(to){return desk()&&to?'<p><button class="link" data-act="back" data-to="'+to+'">← Atrás</button></p>':'';}
function route(o){
  var d={layout:pf().layout,bar:bar(o.back,o.title),body:backLink(o.back)+o.body};
  if(desk()){d.wrap='wrapd narrow';if(o.cta)d.body+='<div class="toolbar">'+o.cta+'</div>';}
  else if(o.cta)d.foot=o.cta;
  return d;
}
function planCard(){var p=pf();
  return '<div class="card">'+K.row('Planilla',p.plan)+K.row(p.tipo,esc(p.nombre))+K.row('Documento',p.doc)+K.row('Periodo',PERIODO)+K.row('Cotizantes',p.cot)+K.row('Fecha límite de pago','<span class="badge warn">'+LIMITE+'</span>')+'</div>';
}
function itemsTable(){
  return '<div class="card" style="padding:6px 16px"><table class="dtable" style="width:100%"><thead><tr><th>Subsistema</th><th class="num">Valor</th></tr></thead><tbody>'+
    pf().items.map(function(i){return '<tr><td>'+i[0]+'</td><td class="num">'+money(i[1])+'</td></tr>';}).join('')+
    '<tr><td><strong>Total a pagar</strong></td><td class="num"><strong>'+money(total())+'</strong></td></tr></tbody></table></div>';
}
function meaning(){
  K.log('apertura_que_significa');
  K.openSheet(K.sheetHead('¿Qué significa?')+
    '<dl style="margin:6px 0 0"><dt><strong>Pago autorizado</strong></dt><dd style="margin:0 0 12px">El momento exacto en que tu banco aprobó el pago: '+AUTH+'. Esa fecha y hora quedan en tu soporte.</dd>'+
    '<dt><strong>Fecha efectiva de tu aporte</strong></dt><dd style="margin:0 0 12px">El día al que se asigna tu aporte: 12/10/2026. Como es anterior al vencimiento ('+LIMITE.replace('martes ','')+'), tu pago está a tiempo.</dd>'+
    '<dt><strong>Recepción de las administradoras</strong></dt><dd style="margin:0 0 12px">Es el día en que ellas reciben la información de tu aporte para registrarlo: 13/10/2026 en el siguiente ciclo. No tienes que hacer nada más.</dd></dl>'+
    '<button class="btn btn-primary" data-act="closeSheet">Entendido</button>');
}
function soporte(){
  var S=K.S;
  return ['SOPORTE DE PAGO · PROTOTIPO (datos ficticios)','Planilla: '+pf().plan,'Aportante: '+pf().nombre+' ('+pf().doc+')','Periodo: '+PERIODO,'Valor pagado: '+money(total()),'Banco: '+S.bank,'Transacción PSE: '+(S.txn||'—'),
    'Pago autorizado: '+AUTH,'Fecha efectiva del aporte: 12/10/2026','Información a administradoras: 13/10/2026 (siguiente ciclo)'].join('\n');
}
function pay(){
  var S=K.S;
  if(!BANKS.filter(function(b){return b[0]===S.bank;})[0][1]){K.go('p6');return;}
  var cl=document.getElementById('clave');
  if(cl&&!cl.value.trim()){K.setErr('e-clave','Escribe cualquier clave para continuar.','clave');K.vErr(['clave']);cl.focus();return;}
  if(K.maybeFail('pay')){K.showError('No pudimos conectar con tu banco','Fue un problema temporal. Tu dinero no se movió. Intenta de nuevo.',pay);return;}
  K.busy('Autorizando tu pago…',1500).then(function(ok){if(!ok)return;S.txn=K.rnd(10);K.go('p4');});
}

var ROUTES={
  p1:function(){
    var cta='<button class="btn btn-primary" data-act="nav" data-to="p2">Pagar planilla</button>';
    return route({title:'Planilla lista',cta:cta,body:
      '<p class="eyebrow">SOI · Planillas</p><h1>Planilla de '+PERIODO.toLowerCase()+' lista para pagar</h1>'+
      '<div class="banner ok">'+I.info+' <strong>Ahora puedes pagar 24/7, incluso festivos.</strong> Tu pago queda registrado con la fecha y hora en que lo autorizas.</div>'+planCard()});
  },
  p2:function(){
    var cta='<button class="btn btn-primary" data-act="nav" data-to="p3">Pagar con PSE</button>';
    return route({back:'p1',title:'Resumen',cta:cta,body:
      '<h1>Resumen de tu pago</h1>'+itemsTable()+
      '<div class="card">'+K.row('Fecha límite','<strong>'+LIMITE+'</strong>')+K.row('Hora actual','<strong>'+AHORA+'</strong> <span class="badge gray">Festivo</span>')+'</div>'});
  },
  p3:function(){
    var S=K.S;
    var cta='<button class="btn btn-primary" data-act="pay">Autorizar pago</button>';
    return route({back:'p2',title:'Pago con PSE',cta:cta,body:
      '<h1>Paga con PSE</h1><p class="muted">Valor a pagar: <strong>'+money(total())+'</strong> · Planilla '+pf().plan+'</p>'+
      '<fieldset><legend>Elige tu banco</legend>'+BANKS.map(function(b){
        return '<label class="opt"><input type="radio" name="bank" value="'+esc(b[0])+'" data-inp="bank"'+(S.bank===b[0]?' checked':'')+'><span>'+esc(b[0])+(b[1]?'':'<span class="d">En mantenimiento hasta las 5:00 a. m.</span>')+'</span></label>';}).join('')+'</fieldset>'+
      '<label for="clave">Clave de tu banco</label><input type="password" id="clave" autocomplete="off" data-inp="clave"><p class="hint">Escribe cualquier clave. Es una simulación.</p><p class="err" id="e-clave" role="alert"></p>'});
  },
  p4:function(){
    var S=K.S;K.complete({fase:'pago',banco:S.bank});
    var B=K.S.p.v==='B',a=S.ans;
    var answered=a?'<p class="banner ok" role="status">Gracias por tu respuesta: <strong>'+esc(a)+'</strong>.</p>':'<div class="chips" role="group" aria-label="Respuesta">'+['Sí','No','No sé'].map(function(x){return '<button class="chip" data-act="answer" data-id="'+x+'" aria-pressed="false">'+x+'</button>';}).join('')+'</div>';
    var survey='<div class="survey"><h3>¿Tu aporte quedó pagado a tiempo?</h3>'+answered+'</div>';
    var body;
    if(!B){
      body='<div class="center">'+I.ok+'<h1>Pago exitoso</h1><p class="muted">Número de transacción: <strong>'+S.txn+'</strong></p></div>'+
        '<div class="card">'+K.row('Planilla',pf().plan)+K.row('Valor pagado',money(total()),true)+K.row('Banco',esc(S.bank))+'</div>'+
        '<p><button class="link" data-act="soporte">Descargar soporte</button> · <button class="link" data-act="nav" data-to="p5">Consultar estado del pago</button></p>'+survey;
    }else{
      body='<div class="center">'+I.ok+'<h1>Pago recibido</h1><p class="muted">Transacción PSE No. <strong>'+S.txn+'</strong> · '+money(total())+'</p></div>'+
        '<div class="card"><ol class="tl">'+
        '<li><span class="dot ok">✓</span><h3>Pago autorizado: '+AUTH.replace(' ',' · ')+'</h3><p class="muted small">Tu banco aprobó el pago.</p></li>'+
        '<li><span class="dot ok">✓</span><h3>Fecha efectiva de tu aporte: 12/10/2026</h3><p class="muted small">Quedó registrado antes del vencimiento (13/10/2026).</p></li>'+
        '<li><span class="dot wait">3</span><h3>Las administradoras recibirán la información el 13/10/2026 en el siguiente ciclo</h3><p class="muted small">No tienes que hacer nada más.</p></li></ol>'+
        '<button class="link" data-act="meaning">¿Qué significa?</button></div>'+
        '<div class="toolbar"><button class="btn btn-secondary sm" data-act="soporte">'+I.download+' Descargar soporte</button><button class="btn btn-secondary sm" data-act="nav" data-to="p5">Ver estado con cada administradora</button></div>'+survey;
    }
    var d=route({title:'Comprobante',body:body});d.bar=desk()?bar():K.appbar({title:'Comprobante',mark:K.mark('S')});return d;
  },
  p5:function(){
    var S=K.S,hdr='<tr><th>Subsistema</th><th>Administradora</th><th>Estado</th></tr>';
    var rows=pf().items.map(function(i){return '<tr><td>'+i[0]+'</td><td>'+esc(i[2])+'</td><td>'+(S.disp?'<span class="badge ok">Dispersado 13/10/2026 · 6:00 a. m.</span>':'<span class="badge warn">Pendiente de dispersión</span>')+'</td></tr>';}).join('');
    var cta='<button class="btn btn-secondary" data-act="advance">'+(S.disp?'Volver a ver como hoy':'Actualizar estado (simula mañana 6:00 a. m.)')+'</button>';
    return route({back:'p4',title:'Estado del pago',cta:cta,body:
      '<h1>Estado de tu pago</h1><p class="muted">Transacción '+(S.txn||'—')+' · '+money(total())+'</p>'+
      '<div class="tscroll"><table class="dtable"><thead>'+hdr+'</thead><tbody>'+rows+'</tbody></table></div>'+
      '<p class="hint">Dispersión: el momento en que cada administradora recibe y registra tu aporte.</p>'});
  },
  p6:function(){
    var S=K.S;
    var cta='<button class="btn btn-primary" data-act="altBank">Pagar con Banco del Pacífico Digital</button><button class="btn btn-secondary" data-act="nav" data-to="p3">Elegir otro banco</button>';
    var d=route({back:'p3',title:'Banco no disponible',cta:cta,body:
      '<div class="center">'+I.alert+'<h1>'+esc(S.bank)+' no está disponible a esta hora</h1><p class="muted">Está en mantenimiento hasta las 5:00 a. m. Tu planilla vence el '+LIMITE.replace('martes ','')+': aún estás a tiempo. Puedes pagar con otro banco ahora mismo.</p></div>'});
    return d;
  }
};

K.run({
  id:'c4',title:'C4 · Pago PILA 24/7',layout:'phone',
  params:[{k:'v',label:'Variante del comprobante',def:'A',opts:[['A','A · Solo «Pago exitoso»'],['B','B · Autorización, fecha efectiva y dispersión separadas']]},
          {k:'perfil',label:'Perfil',def:'emp',opts:[['emp','Empresa · escritorio ($18.426.300)'],['ind','Independiente · celular ($412.800)']]}],
  views:[{label:'Empresa · escritorio',to:'emp',act:'setPerfil',on:function(){return K.S.p.perfil==='emp';}},{label:'Independiente · celular',to:'ind',act:'setPerfil',on:function(){return K.S.p.perfil==='ind';}}],
  state:fresh,start:function(){return 'p1';},
  labels:{p1:'P1 Planilla lista',p2:'P2 Resumen',p3:'P3 Pago PSE',p4:'P4 Comprobante',p5:'P5 Estado por administradora',p6:'P6 Banco no disponible'},
  groups:[['Pantallas',['p1','p2','p3','p4','p5','p6']]],
  routes:ROUTES,
  acts:{
    pay:pay,
    meaning:meaning,
    soporte:function(){K.download('soporte-pago-pila.txt',soporte());K.toast('Soporte descargado');},
    answer:function(el){var v=el.dataset.id;K.S.ans=v;K.log('respuesta_embebida',{pregunta:'aporte_pagado_a_tiempo',respuesta:v});K.rerender();},
    advance:function(){K.S.disp=!K.S.disp;K.log('estado_simulado',{dispersado:K.S.disp});K.rerender();},
    altBank:function(){K.S.bank='Banco del Pacífico Digital';K.go('p3');},
    setPerfil:function(el){
      var S=K.S;S.p.perfil=el.dataset.to;
      var q=new URLSearchParams(location.search);q.set('perfil',S.p.perfil);history.replaceState(null,'',location.pathname+'?'+q.toString()+'#p1');
      Object.assign(S,fresh());K.go('p1');
    }
  },
  inps:{
    bank:function(el){K.S.bank=el.value;K.log('banco_seleccionado',{banco:el.value});},
    clave:function(el){if(el.value)K.setErr('e-clave','','clave');}
  }
});
