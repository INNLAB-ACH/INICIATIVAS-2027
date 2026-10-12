/* C1 · Validador de planilla SOI — mensajes técnicos (actual) vs guiados (nuevo). Escritorio. */
var esc=K.esc,money=K.money,I=K.I;
var SMMLV=1750905; /* valor de ejemplo del salario mínimo de referencia */
var EMPRESA='Confecciones Andina SAS',PERIODO='Octubre 2026';
var NOMB=['Camila','Andrés','Laura','Juan','Valentina','Santiago','Daniela','Mateo','Sara','Felipe','Paula','Esteban','Natalia','Julián','Mariana','Sebastián','Carolina','David','Luisa','Nicolás'];
var APE=['Gómez','Rivas','Muñoz','Rentería','Ortiz','Cárdenas','Londoño','Pineda','Valencia','Salazar','Herrera','Mejía','Arango','Quintero','Bedoya','Restrepo','Zapata','Giraldo','Cano','Ospina'];
var AFPS=['Fondo Horizonte de Pensiones','Fondo Cordillera Pensiones','Fondo Sol Andino'];
var CENTROS=[['Planta de producción','III','2,436 %'],['Administración','I','0,522 %'],['Bodega y despachos','II','1,044 %']];
var TARIFAS=['0,522 %','1,044 %','2,436 %','4,350 %','6,960 %'];
var SETS={'1':{err:[6,18,25,32,40],warn:[14,43]},'2':{err:[9,21,28,36,44],warn:[4,30]}};
var GRUPOS={e1:'IBC',e2:'Novedades',e3:'Días cotizados',e4:'Afiliaciones',e5:'Riesgos laborales'};
var ERR={
 e1:{cod:'ERR-0114',tec:'Reg. 02, campo 14 (IBC) menor al valor mínimo parametrizado para tipo de cotizante 01.',tit:'El ingreso base de cotización (IBC) es menor al mínimo',
   que:'Ningún trabajador puede cotizar con un IBC inferior al salario mínimo de referencia (%SMMLV%). El valor digitado es menor.',campo:'ibc',
   pasos:['Revisa el salario del trabajador: %SAL%.','Escribe en «IBC» un valor igual o mayor a %SMMLV%.','Si el salario real es menor al mínimo por tiempo parcial, ajusta los días cotizados.']},
 e2:{cod:'ERR-0207',tec:'Reg. 02, campo 17 (ING) = X sin fecha en campo 18 (F_ING). Formato esperado AAAA-MM-DD.',tit:'Registraste un ingreso sin fecha',
   que:'La novedad de ingreso necesita la fecha en que el trabajador empezó a laborar.',campo:'ingreso',
   pasos:['Abre el contrato o la afiliación de %NOM%.','Escribe la fecha de ingreso en formato dd/mm/aaaa, dentro de octubre de 2026.','Guarda y revalida.']},
 e3:{cod:'ERR-0319',tec:'Reg. 02, campo 21 (DIAS_COT) > 30. Valor recibido: %DIAS%.',tit:'Los días cotizados son más de 30',
   que:'Un mes se cotiza máximo con 30 días, aunque tenga 31.',campo:'dias',
   pasos:['Cambia «Días cotizados» de %DIAS% a 30 o menos.','Si el trabajador entró o salió en el mes, usa los días reales trabajados.']},
 e4:{cod:'ERR-0422',tec:'Reg. 02, campo 08 (COD_AFP) diferente al código de afiliación vigente (SGP-AFIL).',tit:'La administradora de pensión no coincide con la afiliación',
   que:'El fondo de pensiones de la planilla es distinto al fondo en el que el trabajador está afiliado.',campo:'afp',
   pasos:['Revisa la afiliación vigente de %NOM%: %AFIL%.','Selecciona ese mismo fondo en «Administradora de pensión».','Si el trabajador se trasladó, registra primero la novedad de traslado.']},
 e5:{cod:'ERR-0535',tec:'Reg. 02, campo 33 (TAR_ARL) no corresponde a la clase de riesgo del centro de trabajo (CT).',tit:'La tarifa de ARL no corresponde al centro de trabajo',
   que:'Cada centro de trabajo tiene una clase de riesgo y una tarifa fija. La tarifa escrita no es la del centro de %NOM%.',campo:'arl',
   pasos:['Mira el centro de trabajo: %CENTRO% (riesgo %RIESGO%).','Selecciona la tarifa que corresponde: %TARIFA%.']}
};
var ADV={w1:'Días cotizados (28) menores a 30 sin una novedad registrada. Verifica si falta reportar un retiro o una licencia.',w2:'El IBC es igual al del mes anterior a pesar de una novedad de variación de salario.'};
var SOPORTES_PER=['Octubre 2026','Septiembre 2026','Agosto 2026'];

/* ---------- Datos ---------- */
function build(set){
  var r=1000+(+set)*77,rows=[];
  function rnd(){r=(r*9301+49297)%233280;return r/233280;}
  var cfg=SETS[set];
  for(var i=0;i<48;i++){
    var c=CENTROS[Math.floor(rnd()*3)],afp=AFPS[Math.floor(rnd()*3)],sal=Math.round((SMMLV+Math.floor(rnd()*2400000))/1000)*1000;
    rows.push({n:i+1,nombre:NOMB[Math.floor(rnd()*20)]+' '+APE[Math.floor(rnd()*20)]+' '+APE[Math.floor(rnd()*20)],doc:String(1010000000+Math.floor(rnd()*89000000)),salario:sal,ibc:sal,dias:30,nov:false,ingreso:'',afp:afp,afil:afp,eps:'EPS Andina Salud',arl:c[2],centro:c[0],riesgo:c[1],tarifa:c[2],warn:''});
  }
  var e=cfg.err;
  rows[e[0]].salario=2100000;rows[e[0]].ibc=1300000;
  rows[e[1]].nov=true;rows[e[1]].ingreso='';
  rows[e[2]].dias=32;
  rows[e[3]].afp=AFPS[(AFPS.indexOf(rows[e[3]].afil)+1)%3];
  rows[e[4]].centro='Administración';rows[e[4]].riesgo='I';rows[e[4]].tarifa='0,522 %';rows[e[4]].arl='6,960 %';
  rows[cfg.warn[0]].dias=28;rows[cfg.warn[0]].warn='w1';
  rows[cfg.warn[1]].warn='w2';
  return rows;
}
function validDate(s){var m=/^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(s).trim());if(!m)return false;var d=+m[1],mo=+m[2],y=+m[3];return y===2026&&mo===10&&d>=1&&d<=31;}
function errsOf(r){
  var o=[];
  if(r.ibc<SMMLV)o.push('e1');
  if(r.nov&&!validDate(r.ingreso))o.push('e2');
  if(r.dias>30||r.dias<1)o.push('e3');
  if(r.afp!==r.afil)o.push('e4');
  if(r.arl!==r.tarifa)o.push('e5');
  return o;
}
function allErrs(){var o=[];K.S.rows.forEach(function(r,i){errsOf(r).forEach(function(e){o.push({row:i,e:e});});});return o;}
function warns(){return K.S.rows.filter(function(r){return r.warn;});}
function fresh(p){return {rows:build(p.p),loaded:false,t3:0,t0err:{},vueltas:{},cur:null,msg:'',ayuda:0,pct:0,tConf:0,soPer:SOPORTES_PER[0],soQ:''};}
function V(){return K.S.p.v;}
function fill(t,r){return t.replace(/%SMMLV%/g,money(SMMLV)).replace(/%SAL%/g,money(r.salario)).replace(/%NOM%/g,esc(r.nombre)).replace(/%DIAS%/g,r.dias).replace(/%AFIL%/g,esc(r.afil)).replace(/%CENTRO%/g,r.centro).replace(/%RIESGO%/g,r.riesgo).replace(/%TARIFA%/g,r.tarifa);}
function bar(cur){
  return K.dhead({title:'SOI · Seguridad social',mark:K.mark('S'),nav:[{label:'Inicio',to:'s1',cur:cur==='s1'},{label:'Mi planilla',to:'s3',cur:/^s[2-6]$/.test(cur)&&cur!=='s1'},{label:'Soportes y reportes',to:'s7',cur:cur==='s7'}],right:'<span class="small muted">'+EMPRESA+' · '+PERIODO+'</span>'});
}
function pg(cur,body,narrow){return {layout:'desk',bar:bar(cur),wrap:'wrapd'+(narrow?' narrow':''),body:body};}

/* ---------- Pantallas ---------- */
function s1(){
  return pg('s1','<p class="eyebrow">Pago de seguridad social (PILA)</p><h1>Planilla de '+PERIODO.toLowerCase()+'</h1><p class="lead">'+EMPRESA+' · 48 empleados. Carga tu planilla o genérala desde tus novedades.</p><div class="grid2"><div class="card"><h3 style="margin-top:0">Cargar planilla</h3><p class="muted">Sube el archivo plano de tu nómina.</p><button class="btn btn-primary" data-act="cargar" data-id="archivo">Cargar archivo de ejemplo (planilla_octubre_2026.txt)</button></div><div class="card"><h3 style="margin-top:0">Generar planilla</h3><p class="muted">SOI la arma con las novedades registradas.</p><button class="btn btn-secondary" data-act="cargar" data-id="generar">Generar planilla</button></div></div>',true);
}
var msgs=['Leyendo el archivo…','Validando afiliaciones…','Calculando el IBC…','Revisando novedades y días…','Verificando tarifas de riesgos laborales…'];
function s2(){
  var S=K.S;
  return {layout:'desk',bar:bar('s2'),wrap:'wrapd narrow',body:'<div class="center" style="padding:40px 0"><h1>Validando tu planilla</h1><div class="bar" style="width:100%;max-width:520px;margin:14px 0 8px" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="pb"><i id="pbi" style="width:0%"></i></div><p class="muted" id="pm" aria-live="polite">'+msgs[0]+'</p></div>',
    after:function(){var p=0;(function tick(){if(K.cur!=='s2')return;p+=4+Math.random()*5;if(p>=100){p=100;}var i=document.getElementById('pbi');if(!i)return;i.style.width=p+'%';var b=document.getElementById('pb');if(b)b.setAttribute('aria-valuenow',Math.round(p));K.setTxt('pm',msgs[Math.min(msgs.length-1,Math.floor(p/20))]);if(p>=100){setTimeout(function(){if(K.cur==='s2'){K.S.t3=Date.now();K.log('validacion_terminada',{errores:allErrs().length,advertencias:warns().length});K.go('s3');}},350);return;}setTimeout(tick,160);})();}};
}
function s3(){
  var S=K.S,es=allErrs(),ws=warns(),nuevo=V()==='nuevo';if(!S.t3)S.t3=Date.now();
  var body='<h1>Resultado de la validación</h1><div class="grid3"><div class="kpi"><div class="n">48</div><div class="l">Registros</div></div><div class="kpi"><div class="n" style="color:'+(es.length?'var(--err)':'var(--ok)')+'">'+es.length+'</div><div class="l">'+(es.length===1?'Error':'Errores')+'</div></div><div class="kpi"><div class="n" style="color:var(--amber)">'+ws.length+'</div><div class="l">Advertencias</div></div></div>';
  if(!es.length)body+='<div class="banner ok" style="margin-top:16px"><strong>Ya no hay errores.</strong> Puedes continuar.</div><div class="toolbar"><button class="btn btn-primary" data-act="confiable">Continuar</button></div>';
  else if(nuevo){
    var g={};es.forEach(function(x){(g[x.e]=g[x.e]||[]).push(x);});
    body+='<p class="lead" style="margin-top:16px">Corrige estos errores antes de pagar. Te explicamos cada uno.</p>'+Object.keys(g).map(function(e){return '<div class="card"><h3 style="margin-top:0">'+GRUPOS[e]+' · '+ERR[e].tit+'</h3>'+g[e].map(function(x){var r=S.rows[x.row];return '<div style="display:flex;gap:12px;align-items:center;padding:8px 0;border-top:1px solid #EDF2F6"><div class="grow"><strong>'+esc(r.nombre)+'</strong><div class="small muted">Registro '+r.n+'</div></div><button class="btn btn-primary sm" data-act="detalle" data-i="'+x.row+'" data-e="'+x.e+'">Ver cómo corregirlo</button></div>';}).join('')+'</div>';}).join('');
  }else{
    body+='<div class="tscroll" style="margin-top:16px"><table class="dtable"><thead><tr><th>Código</th><th>Reg.</th><th>Descripción</th><th></th></tr></thead><tbody>'+es.map(function(x){var r=S.rows[x.row];return '<tr><td class="mono">'+ERR[x.e].cod+'</td><td>'+r.n+'</td><td class="mono" style="font-size:12.5px">'+ERR[x.e].tec.replace(/%DIAS%/g,r.dias)+'</td><td><button class="btn btn-secondary sm" data-act="detalle" data-i="'+x.row+'" data-e="'+x.e+'">Detalle</button></td></tr>';}).join('')+'</tbody></table></div>';
  }
  if(ws.length)body+='<details class="qa" style="margin-top:16px"><summary>Advertencias ('+ws.length+')</summary><div>'+ws.map(function(r){return '<p><strong>'+esc(r.nombre)+'</strong> (reg. '+r.n+'): '+ADV[r.warn]+'</p>';}).join('')+'</div></details>';
  return pg('s3',body,true);
}
function s4(){
  var S=K.S,x=S.cur;if(!x)return s3();var r=S.rows[x.i],e=ERR[x.e],nuevo=V()==='nuevo';
  if(!errsOf(r).includes(x.e))return s3();
  var body='<p><button class="link" data-act="nav" data-to="s3">← Volver al resultado</button></p>';
  if(nuevo){
    var dato={e1:'IBC escrito: <strong>'+money(r.ibc)+'</strong> (salario: '+money(r.salario)+')',e2:'Novedad de ingreso con fecha: <strong>vacía</strong>',e3:'Días cotizados escritos: <strong>'+r.dias+'</strong>',e4:'En la planilla: <strong>'+esc(r.afp)+'</strong><br>Afiliación vigente: <strong>'+esc(r.afil)+'</strong>',e5:'Tarifa escrita: <strong>'+r.arl+'</strong> · Centro: '+r.centro+' (riesgo '+r.riesgo+', tarifa <strong>'+r.tarifa+'</strong>)'}[x.e];
    body+='<p class="eyebrow">Registro '+r.n+' · '+esc(r.nombre)+'</p><h1>'+e.tit+'</h1><div class="grid2"><div class="card"><h3 style="margin-top:0">Qué pasó</h3><p>'+fill(e.que,r)+'</p><h3>El dato que causa el error</h3><p>'+dato+'</p></div><div class="card"><h3 style="margin-top:0">Cómo corregirlo</h3><ol>'+e.pasos.map(function(p){return '<li style="margin-bottom:6px">'+fill(p,r)+'</li>';}).join('')+'</ol><button class="btn btn-primary" data-act="corregir">Corregir aquí</button></div></div>';
  }else{
    body+='<p class="eyebrow">Detalle del error</p><h1 class="mono" style="font-size:24px">'+e.cod+'</h1><div class="card"><pre class="code-block" style="white-space:pre-wrap">'+esc(e.cod+' | REG='+r.n+' | DOC='+r.doc+'\n'+e.tec.replace(/%DIAS%/g,r.dias))+'</pre></div><div class="toolbar"><button class="btn btn-secondary" data-act="corregir">Ver el registro</button></div>';
  }
  return pg('s4',body,true);
}
function s5(){
  var S=K.S,x=S.cur;if(!x)return s3();var r=S.rows[x.i],e=ERR[x.e],nuevo=V()==='nuevo';
  function fld(k,label,html,hi){return '<div class="field"><label for="f-'+k+'">'+label+'</label>'+html+(hi&&nuevo?'<p class="hint">'+hi+'</p>':'')+'</div>';}
  function hl(k){return nuevo&&e.campo===k?' style="border:2.5px solid var(--blue);background:#F5F9FC"':'';}
  var body='<p><button class="link" data-act="volverDetalle">← Volver al detalle</button></p><p class="eyebrow">Registro '+r.n+'</p><h1>Corregir '+esc(r.nombre)+'</h1>'+
   (S.msg?'<div class="banner err" role="alert"><strong>'+S.msg+'</strong></div>':'')+
   '<div class="card"><div class="grid2">'+
   fld('salario','Salario','<input type="text" id="f-salario" inputmode="numeric" value="'+r.salario+'" data-inp="rec" data-k="salario">')+
   fld('ibc','IBC','<input type="text" id="f-ibc" inputmode="numeric" value="'+r.ibc+'" data-inp="rec" data-k="ibc"'+hl('ibc')+'>',e.campo==='ibc'?'Mínimo: '+money(SMMLV):'')+
   fld('dias','Días cotizados','<input type="text" id="f-dias" inputmode="numeric" value="'+r.dias+'" data-inp="rec" data-k="dias"'+hl('dias')+'>',e.campo==='dias'?'Máximo: 30':'')+
   fld('ingreso','Fecha de ingreso (si hay novedad)','<input type="text" id="f-ingreso" placeholder="dd/mm/aaaa" value="'+esc(r.ingreso)+'" data-inp="rec" data-k="ingreso"'+hl('ingreso')+(r.nov?'':' disabled')+'>',e.campo==='ingreso'?'Formato dd/mm/aaaa, dentro de octubre de 2026':'')+
   fld('afp','Administradora de pensión','<select id="f-afp" data-inp="rec" data-k="afp"'+hl('afp')+'>'+AFPS.map(function(a){return '<option'+(r.afp===a?' selected':'')+'>'+a+'</option>';}).join('')+'</select>',e.campo==='afp'?'Afiliación vigente: '+esc(r.afil):'')+
   fld('arl','Tarifa ARL','<select id="f-arl" data-inp="rec" data-k="arl"'+hl('arl')+'>'+TARIFAS.map(function(a){return '<option'+(r.arl===a?' selected':'')+'>'+a+'</option>';}).join('')+'</select>',e.campo==='arl'?'Centro: '+r.centro+' · riesgo '+r.riesgo+' · tarifa '+r.tarifa:'')+
   '<div class="field"><label>Centro de trabajo</label><input type="text" value="'+r.centro+' (riesgo '+r.riesgo+')" disabled></div><div class="field"><label>Documento</label><input type="text" value="'+r.doc+'" disabled></div></div></div>'+
   '<div class="toolbar"><button class="btn btn-primary" data-act="guardar">Guardar y revalidar</button><button class="btn btn-secondary" data-act="volverDetalle">Cancelar</button></div>';
  return pg('s5',body,true);
}
function s6(){
  var es=allErrs();if(es.length)return s3();
  var S=K.S,ws=warns(),rows=[['Pensión',7370500],['Salud',5527900],['Riesgos laborales (ARL)',380200],['Caja de compensación',2949200],['SENA',612000],['ICBF',1586500]],tot=rows.reduce(function(a,x){return a+x[1];},0);
  return pg('s6','<div class="center">'+I.ok+'<h1>Planilla confiable</h1><p class="muted">48 registros sin errores'+(ws.length?' · '+ws.length+' advertencias para revisar':'')+'. Lista para pagar.</p></div><div class="card" style="max-width:640px;margin:0 auto"><table class="dtable" style="width:100%"><thead><tr><th>Subsistema</th><th class="num">Valor</th></tr></thead><tbody>'+rows.map(function(x){return '<tr><td>'+x[0]+'</td><td class="num">'+money(x[1])+'</td></tr>';}).join('')+'<tr><td><strong>Total a pagar</strong></td><td class="num"><strong>'+money(tot)+'</strong></td></tr></tbody></table></div><div class="toolbar" style="justify-content:center;margin-top:16px"><button class="btn btn-primary" data-act="alPago">Continuar al pago</button><button class="btn btn-secondary" data-act="nav" data-to="s7">Soportes y reportes</button></div>',true);
}
function soRows(){
  var S=K.S,q=K.norm(S.soQ),per=S.soPer,pi=SOPORTES_PER.indexOf(per);
  return S.rows.filter(function(r){return !q||K.norm(r.nombre+' '+r.doc).indexOf(q)>=0;}).map(function(r){var v=Math.round(r.ibc*0.285/100)*100;return '<tr><td>'+per+'</td><td>'+esc(r.nombre)+'</td><td>'+r.doc+'</td><td>PL-2026-'+['10','09','08'][pi]+'-48'+(812-pi*11)+'</td><td>'+['11/10/2026','10/09/2026','11/08/2026'][pi]+'</td><td class="num">'+money(v)+'</td><td style="white-space:nowrap"><button class="btn btn-secondary sm" data-act="dlSoporte" data-id="'+r.n+'" data-f="PDF">PDF</button> <button class="btn btn-secondary sm" data-act="dlSoporte" data-id="'+r.n+'" data-f="Excel">Excel</button></td></tr>';}).join('')||'<tr><td colspan="7" class="muted">No hay soportes con esa búsqueda.</td></tr>';
}
function s7(){
  var S=K.S;
  return pg('s7','<h1>Soportes y reportes</h1><p class="lead">Soportes de pago por empleado y periodo.</p><div class="toolbar"><div><label for="per" class="small" style="margin:0 0 3px">Periodo</label><select id="per" data-inp="soPer" style="width:auto">'+SOPORTES_PER.map(function(p){return '<option'+(S.soPer===p?' selected':'')+'>'+p+'</option>';}).join('')+'</select></div><div style="flex:1;max-width:380px"><label for="sq" class="small" style="margin:0 0 3px">Buscar empleado</label><input type="search" id="sq" placeholder="Nombre o documento" value="'+esc(S.soQ)+'" data-inp="soQ"></div><button class="btn btn-secondary sm" data-act="dlReporte" style="align-self:flex-end">'+I.download+' Reporte del periodo (Excel)</button></div><div class="tscroll" style="max-height:520px;overflow:auto"><table class="dtable"><thead><tr><th>Periodo</th><th>Empleado</th><th>Documento</th><th>Planilla</th><th>Fecha de pago</th><th class="num">Valor aportado</th><th>Descargar</th></tr></thead><tbody id="sotb">'+soRows()+'</tbody></table></div>',false);
}

K.run({
  id:'c1',title:'C1 · Validador de planilla SOI',layout:'desk',
  params:[{k:'v',label:'Variante de los mensajes',def:'actual',opts:[['actual','Actual · código y texto técnico'],['nuevo','Nuevo · explicación y guía de corrección']]},{k:'p',label:'Planilla (equivalentes, para contrabalancear)',def:'1',opts:[['1','Planilla 1'],['2','Planilla 2']]}],
  state:fresh,start:function(){return 's1';},
  codes:{s1:'S1',s2:'S2',s3:'S3',s4:'S4',s5:'S5',s6:'S6',s7:'S7'},
  labels:{s1:'S1 Inicio SOI',s2:'S2 Validación en curso',s3:'S3 Resultado',s4:'S4 Detalle del error',s5:'S5 Corrección en línea',s6:'S6 Planilla confiable',s7:'S7 Soportes y reportes'},
  groups:[['Pantallas',['s1','s2','s3','s4','s5','s6','s7']]],
  routes:{s1:s1,s2:s2,s3:s3,s4:s4,s5:s5,s6:s6,s7:s7},
  acts:{
    cargar:function(el){K.log('planilla_cargada',{modo:el.dataset.id});K.go('s2');},
    detalle:function(el){var S=K.S,x={i:+el.dataset.i,e:el.dataset.e},k=x.i+':'+x.e;S.cur=x;S.msg='';S.vueltas[k]=(S.vueltas[k]||0)+1;if(!S.t0err[k])S.t0err[k]=Date.now();K.log('detalle_abierto',{error:x.e,registro:x.i+1,vueltas:S.vueltas[k]});K.go('s4');},
    corregir:function(){K.S.msg='';K.go('s5');},
    volverDetalle:function(){K.go('s4');},
    guardar:function(){
      var S=K.S,x=S.cur,r=S.rows[x.i],k=x.i+':'+x.e;
      var g=function(id){var e=document.getElementById('f-'+id);return e?e.value:null;};
      var n=function(v){return +String(v).replace(/\D/g,'')||0;};
      r.salario=n(g('salario'));r.ibc=n(g('ibc'));r.dias=n(g('dias'));if(r.nov)r.ingreso=g('ingreso');r.afp=g('afp');r.arl=g('arl');
      K.busy('Revalidando el registro…',900).then(function(ok){if(!ok)return;
        if(errsOf(r).indexOf(x.e)<0){K.log('error_corregido',{error:x.e,registro:r.n,ms:Date.now()-(S.t0err[k]||Date.now()),vueltas:S.vueltas[k]||0,ayuda:S.ayuda});S.cur=null;S.msg='';S.ayuda=0;
          if(!allErrs().length){K.log('planilla_sin_errores',{ms_desde_resultado:Date.now()-S.t3});}
          K.toast('Corregido: el error desapareció');K.go('s3');}
        else{K.vErr([x.e]);S.msg=(V()==='nuevo'?'Todavía no cumple: '+fill(ERR[x.e].que,r):ERR[x.e].cod+' | REG='+r.n+' | persiste');K.rerender();}
      });
    },
    confiable:function(){var S=K.S;K.log('planilla_confiable',{ms_desde_resultado:Date.now()-S.t3,variante:V()});K.go('s6');},
    alPago:function(){K.log('continuar_al_pago',{variante:V()});K.complete({variante:V(),ms:Date.now()-K.S.t3});K.toast('En el flujo real aquí continuaría el pago (ver prototipo C4)');},
    dlSoporte:function(el){var r=K.S.rows[+el.dataset.id-1];K.log('descarga_soporte',{empleado:r.nombre,periodo:K.S.soPer,formato:el.dataset.f});K.download('soporte_'+r.doc+'_'+K.S.soPer.replace(' ','_')+'.'+(el.dataset.f==='PDF'?'txt':'csv'),'SOPORTE DE PAGO (simulado)\nEmpleado: '+r.nombre+'\nDocumento: '+r.doc+'\nPeriodo: '+K.S.soPer+'\nFormato solicitado: '+el.dataset.f);},
    dlReporte:function(){K.log('descarga_reporte',{periodo:K.S.soPer});K.download('reporte_'+K.S.soPer.replace(' ','_')+'.csv','empleado,documento,ibc\n'+K.S.rows.map(function(r){return [r.nombre,r.doc,r.ibc].join(',');}).join('\n'),'text/csv;charset=utf-8');}
  },
  inps:{
    rec:function(){},
    soPer:function(el,ty){if(ty!=='change')return;K.S.soPer=el.value;K.html('sotb',soRows());K.log('soportes_periodo',{periodo:el.value});},
    soQ:function(el,ty){K.S.soQ=el.value;K.html('sotb',soRows());if(ty==='change')K.log('busqueda_soportes',{texto:el.value,periodo:K.S.soPer});}
  }
});
document.addEventListener('keydown',function(e){if(e.shiftKey&&e.key==='H'&&!e.ctrlKey&&!e.metaKey){K.S.ayuda=(K.S.ayuda||0)+1;K.log('ayuda_moderador',{n:K.S.ayuda,error:K.S.cur?K.S.cur.e:''});K.toast('Ayuda registrada');}});
