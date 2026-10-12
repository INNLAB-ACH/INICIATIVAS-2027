/* D4 · Ficha de resultado de modelo analítico — escritorio */
var esc=K.esc,money=K.money,I=K.I;
var MESES=['nov','dic','ene','feb','mar','abr','may','jun','jul','ago','sep','oct'];
var INGRESO=[3200000,3600000,3100000,3500000,3900000,3300000,3400000,3700000,3000000,3500000,3600000,3550000];
var GASTO=2275000;
var DISP=INGRESO.map(function(v){return v-GASTO;});
var CIERRE=[1100000,900000,1400000,700000,1800000,1200000,1000000,1300000,400000,1100000,1300000,1200000];
var TX=[38,41,35,44,47,39,40,45,33,42,43,44];
var CUOTA_MAX=410000,MONTO=8000000,PLAZO=24,TASA=0.22;
var FAM=[
 {k:'ingreso',n:'Ingreso estimado',res:'$3.450.000 al mes',marg:'± 12 % (entre $3.036.000 y $3.864.000)',conf:'Media-alta',pc:78,vent:12,
  vars:['Los abonos de 14 pagadores distintos suman en promedio $3.450.000 al mes.','Recibió abonos en los 12 meses analizados (muy regular).','Los abonos mayores a $200.000 explican el 86 % del ingreso.'],
  ch:{t:'Ingreso mensual observado (millones de pesos)',v:INGRESO,f:function(x){return (x/1e6).toFixed(1).replace('.',',');}},
  por:'El ingreso se estima a partir de los abonos recurrentes que recibe por transferencia y pagos entre cuentas; se descartan los movimientos entre sus propias cuentas.',
  lim:'No ve ingresos en efectivo ni abonos en entidades que no estén conectadas a ACH.'},
 {k:'capacidad',n:'Capacidad de pago',res:'Cuota máxima sugerida: $410.000',marg:'35 % del ingreso disponible estimado ($1.171.000)',conf:'Media',pc:71,vent:12,
  vars:['Ingreso estimado $3.450.000 menos gastos recurrentes observados de $2.275.000.','Su ingreso disponible varía entre $725.000 y $1.625.000 según el mes.','No se detectan cuotas de crédito vigentes dentro de las cuentas analizadas.'],
  ch:{t:'Ingreso disponible por mes tras gastos recurrentes (millones de pesos)',v:DISP,f:function(x){return (x/1e6).toFixed(1).replace('.',',');}},
  por:'Se resta del ingreso estimado el gasto recurrente observado (arriendo, servicios, suscripciones) y se sugiere comprometer hasta el 35 % de lo que queda.',
  lim:'No incluye deudas con entidades fuera de ACH ni gastos en efectivo; la cuota real puede ser menor.'},
 {k:'flujo',n:'Flujo de caja',res:'Flujo neto mensual de +$1.170.000',marg:'Probabilidad de un mes con déficit: 8 %',conf:'Media',pc:74,vent:12,
  vars:['Sus gastos se concentran en los primeros 10 días del mes (arriendo y servicios).','En 2 de 12 meses el saldo de cierre estuvo por debajo de $500.000.','El saldo de cierre se recupera en el mes siguiente en 11 de 12 casos.'],
  ch:{t:'Saldo de cierre mensual (millones de pesos)',v:CIERRE,f:function(x){return (x/1e6).toFixed(1).replace('.',',');}},
  por:'Se proyecta el movimiento mensual de sus cuentas con los patrones de los últimos 12 meses y se calcula cuántas veces el saldo cae por debajo de un nivel de seguridad.',
  lim:'Es una proyección; un gasto extraordinario (salud, vehículo) puede cambiar el resultado.'},
 {k:'estabilidad',n:'Estabilidad transaccional',res:'Índice 0,74 de 1 (estabilidad media-alta)',marg:'Antigüedad de la cuenta principal: 5,2 años',conf:'Alta',pc:83,vent:12,
  vars:['Tiene 14 pagadores recurrentes y ninguno aporta más del 22 % del ingreso.','Mantiene entre 33 y 47 transacciones al mes, sin interrupciones.','No registra devoluciones ni rechazos de pagos en el periodo.'],
  ch:{t:'Transacciones por mes',v:TX,f:function(x){return String(x);}},
  por:'Mide qué tan constante y diversificada es la actividad de la persona: pagadores, frecuencia, antigüedad y ausencia de rechazos.',
  lim:'Una persona nueva en el sistema financiero puede tener un índice bajo aunque pague bien.'}
];
function fresh(){return {tab:'ingreso',pts:{ingreso:25,capacidad:25,flujo:25,estabilidad:25},saved:false};}
function pmt(){var i=Math.pow(1+TASA,1/12)-1;return Math.round(MONTO*i/(1-Math.pow(1+i,-PLAZO)));}
function sum(o){return Object.keys(o).reduce(function(a,k){return a+(+o[k]||0);},0);}

function chart(c,hl){
  var max=Math.max.apply(null,c.v),w=560,h=170,bw=w/c.v.length;
  var bars=c.v.map(function(v,i){var bh=Math.max(4,(v/max)*(h-34));return '<g><rect x="'+(i*bw+6)+'" y="'+(h-18-bh)+'" width="'+(bw-12)+'" height="'+bh+'" rx="3" fill="'+(i===c.v.length-1?'#004A80':'#005FA3')+'"/><text x="'+(i*bw+bw/2)+'" y="'+(h-4)+'" text-anchor="middle" font-size="11" fill="#4A5A6A">'+MESES[i]+'</text><text x="'+(i*bw+bw/2)+'" y="'+(h-22-bh)+'" text-anchor="middle" font-size="10.5" fill="#0D1B2A" font-weight="700">'+c.f(v)+'</text></g>';}).join('');
  return '<figure style="margin:0"><figcaption class="small muted" style="margin-bottom:4px">'+c.t+'</figcaption><svg viewBox="0 0 '+w+' '+h+'" width="100%" role="img" aria-label="'+esc(c.t)+'">'+bars+'</svg></figure>';
}
function famCard(f){
  return '<div class="card" role="tabpanel"><div class="grid2"><div><p class="eyebrow">Resultado principal</p><div class="amount" style="font-size:26px">'+f.res+'</div><p class="muted">'+f.marg+'</p>'+
    '<div class="toolbar"><span class="badge '+(f.pc>=80?'ok':f.pc>=70?'':'warn')+'">Confianza '+f.conf.toLowerCase()+' · '+f.pc+' %</span><span class="badge gray">Ventana de datos: '+f.vent+' meses</span></div>'+
    '<h3>Qué lo explica</h3><ul>'+f.vars.map(function(v){return '<li>'+v+'</li>';}).join('')+'</ul></div><div>'+chart(f.ch)+'</div></div></div>';
}
function jsonResp(sel){
  var o={solicitud_id:'sol_20261011_0042',persona:{id:'per_c9e1',segmento:'independiente'},consentimiento:{id:'cns_71ab',vigente_hasta:'2026-11-01'},
    modelos:{ingreso_estimado:{valor:3450000,margen:0.12,confianza:0.78,ventana_meses:12},capacidad_pago:{cuota_maxima_sugerida:410000,confianza:0.71,ventana_meses:12},flujo_caja:{flujo_neto_mensual:1170000,prob_mes_deficit:0.08,confianza:0.74,ventana_meses:12},estabilidad_transaccional:{indice:0.74,confianza:0.83,ventana_meses:12}},tiempo_respuesta_ms:640};
  return JSON.stringify(o,null,2);
}
function ptsOut(){
  var S=K.S,t=sum(S.pts),ok=t===100;
  return '<p id="pts-total" role="status" class="'+(ok?'':'err')+'" style="font-weight:700;font-size:17px;margin:8px 0">Total: '+t+' / 100'+(ok?' ✓':(t<100?' · faltan '+(100-t):' · sobran '+(t-100)))+'</p>';
}
function page(){
  var S=K.S,cur=FAM.filter(function(f){return f.k===S.tab;})[0],cuota=pmt();
  var nav=[['f1','Perfil'],['f2','Modelos'],['f3','Recomendación'],['f4','Explicabilidad'],['f5','Datos y consentimiento'],['f6','Vista técnica'],['f7','Priorización']];
  var h='<nav class="docnav" aria-label="Secciones"><div class="in"><strong style="margin-right:8px">Modelos analíticos ACH</strong>'+nav.map(function(n){return '<button data-act="scroll" data-to="'+n[0]+'">'+n[1]+'</button>';}).join('')+'</div></nav><div class="wrapd">';
  h+='<section id="f1"><p class="eyebrow">Ficha de resultado · ejemplo con datos ficticios</p><h1>Evaluación de una persona sin ingreso declarado</h1>'+
    '<div class="card"><div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><span class="avatar" style="width:56px;height:56px;font-size:20px">CR</span><div class="grow"><strong style="font-size:19px">Carlos Rentería</strong><div class="muted">34 años · independiente · Cali · sin ingreso declarado</div></div>'+
    '<div><div class="muted small">Solicitud de crédito</div><div class="amount" style="font-size:22px">'+money(MONTO)+' a '+PLAZO+' meses</div><div class="muted small">Cuota estimada con tasa de ejemplo de 22 % E. A.: '+money(cuota)+'</div></div></div></div></section>';
  h+='<section class="docsec" id="f2"><h2>Resultados por familia de modelo</h2><div class="tabs" role="tablist">'+FAM.map(function(f){return '<button role="tab" data-act="tab" data-id="'+f.k+'" aria-selected="'+(S.tab===f.k)+'">'+f.n+'</button>';}).join('')+'</div>'+famCard(cur)+'</section>';
  h+='<section class="docsec" id="f3"><h2>Recomendación de uso</h2><div class="banner ok" style="font-size:17px"><strong>Capacidad de pago estimada: cuota máxima sugerida '+money(CUOTA_MAX)+'.</strong> La cuota de la solicitud ('+money(cuota)+') equivale al '+K.pct(cuota/CUOTA_MAX,0)+' de ese máximo.</div><p class="muted">Este resultado es un insumo para su análisis, <strong>no una decisión de crédito</strong>. La decisión final la toma su entidad con sus propias políticas.</p></section>';
  h+='<section class="docsec" id="f4"><h2>Explicabilidad y límites</h2><div class="grid2"><div class="card"><h3 style="margin-top:0">Por qué llegó a este resultado · '+cur.n+'</h3><p>'+cur.por+'</p></div><div class="card"><h3 style="margin-top:0">Límites conocidos</h3><p>'+cur.lim+'</p><p class="muted small">Todos los modelos son menos precisos con menos de 6 meses de historia.</p></div></div></section>';
  h+='<section class="docsec" id="f5"><h2>Consentimiento y fuente de datos</h2><div class="card" style="padding:6px 16px"><table class="dtable" style="width:100%"><thead><tr><th>Dato de ACH utilizado</th><th>Para qué</th><th>Periodo</th></tr></thead><tbody><tr><td>Transferencias recibidas y enviadas</td><td>Ingreso y estabilidad</td><td>12 meses</td></tr><tr><td>Pagos con PSE y débitos automáticos</td><td>Gastos recurrentes y flujo de caja</td><td>12 meses</td></tr></tbody></table></div>'+
    '<div class="banner">'+I.info+' Carlos autorizó el 02/10/2026 el uso de estos datos para evaluar su solicitud con Banco Andino. Vigencia: hasta el 01/11/2026. Puede revocarla cuando quiera.</div></section>';
  h+='<section class="docsec" id="f6"><h2>Vista técnica</h2><div class="card"><div class="toolbar"><span class="badge ok">200 OK</span><span class="badge gray">Tiempo de respuesta: 640 ms</span><span class="badge gray mono">POST /v1/modelos/evaluar</span></div><pre class="code-block" tabindex="0">'+esc(jsonResp())+'</pre></div></section>';
  h+='<section class="docsec" id="f7"><h2>Ejercicio de priorización</h2><div class="survey"><h3>Reparta 100 puntos entre las 4 familias según su valor para su área</h3><p class="muted">Mientras más puntos, más prioridad. La suma debe ser exactamente 100.</p><div class="grid4">'+
    FAM.map(function(f){return '<div class="field"><label for="p-'+f.k+'">'+f.n+'</label><input type="number" min="0" max="100" step="1" id="p-'+f.k+'" value="'+S.pts[f.k]+'" data-inp="pts" data-id="'+f.k+'"></div>';}).join('')+'</div>'+ptsOut()+
    '<div class="toolbar"><button class="btn btn-primary" id="btn-save" data-act="savepts"'+(sum(S.pts)===100?'':' disabled')+'>Registrar reparto</button><button class="btn btn-secondary" id="btn-copy" data-act="copypts"'+(sum(S.pts)===100?'':' disabled')+'>Copiar resultado</button>'+(S.saved?'<span class="badge ok" id="saved">'+I.check+' Registrado</span>':'')+'</div></div></section>'+
    '<section class="docsec"><div class="side"><div></div>'+K.notesBox()+'</div></section></div>';
  return h;
}
function ptsText(){var S=K.S;return 'Priorización de familias de modelos (100 puntos)\n'+FAM.map(function(f){return f.n+': '+S.pts[f.k];}).join('\n')+'\nTotal: '+sum(S.pts);}

K.run({
  id:'d4',title:'D4 · Ficha de resultado de modelo analítico',layout:'desk',
  params:[],state:fresh,start:function(){return 'doc';},labels:{doc:'Ficha completa'},groups:[['Pantalla',['doc']]],
  routes:{doc:function(){return {layout:'desk',wrap:'none',body:page()};}},
  acts:{
    tab:function(el){K.S.tab=el.dataset.id;K.log('pestana_modelo',{familia:el.dataset.id});K.rerender();},
    savepts:function(){var S=K.S;if(sum(S.pts)!==100){K.vErr(['suma_100']);return;}S.saved=true;K.log('priorizacion_100',S.pts);K.complete({fase:'priorizacion'});K.rerender();},
    copypts:function(){if(sum(K.S.pts)!==100)return;K.log('copia_priorizacion');K.copy(ptsText(),'Resultado copiado');}
  },
  inps:{
    pts:function(el,ty){var S=K.S,v=Math.max(0,Math.min(100,Math.round(+el.value||0)));S.pts[el.dataset.id]=v;S.saved=false;
      var t=document.getElementById('pts-total'),tt=sum(S.pts);
      if(t){t.textContent='Total: '+tt+' / 100'+(tt===100?' ✓':(tt<100?' · faltan '+(100-tt):' · sobran '+(tt-100)));t.className=tt===100?'':'err';}
      var ok2=sum(S.pts)===100;['btn-save','btn-copy'].forEach(function(id){var b=document.getElementById(id);if(b)b.disabled=!ok2;});var sv=document.getElementById('saved');if(sv)sv.remove();
      if(ty==='change'&&!ok2)K.vErr(['suma_distinta_100:'+sum(S.pts)]);}
  }
});
