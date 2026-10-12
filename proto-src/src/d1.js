/* D1 · Portal de vinculación ACH — escritorio adaptable a tableta */
var esc=K.esc,money=K.money,I=K.I;
var HOY='12/10/2026';
var SERV=[['pse','PSE recaudo','Recibe pagos de tus clientes con PSE'],['teso','TESO','Tesorería y pagos masivos para empresas'],['transf','Transferencias','Envío y recepción de transferencias interbancarias']];
var ORG=['Entidad financiera','Comercio','Fintech','Otro'];
var REG={'900482731':'Tienda Aurora SAS','860123456':'Cooperativa Valle Unido'};
var REJ={comercio:'cert_banc',ef:'cert_vig'};
var MOTIVO='La certificación no muestra una fecha de expedición legible. Carga una versión nítida expedida en los últimos 30 días.';
var PASOS=[['v1','1 · Servicio'],['v2','2 · Registro'],['v3','3 · Requisitos'],['v4','4 · Documentos'],['v5','5 · Seguimiento'],['v6','6 · Configuración'],['v7','7 · Habilitación']];

function docsFor(actor){
  var d=[['rut','RUT','Registro Único Tributario actualizado',false],['cert_exist','Certificado de existencia y representación legal','Expedido en los últimos 30 días',true]];
  if(actor==='ef'){d.push(['cert_vig','Certificación de vigilancia','Expedida por la entidad de vigilancia, en los últimos 30 días',true]);d.push(['resp_tec','Designación del responsable técnico','Carta firmada con datos de contacto',false]);}
  else{d.push(['cert_banc','Certificación bancaria','Expedida en los últimos 30 días',true]);d.push(['cedula_rl','Cédula del representante legal','Copia legible por ambas caras',false]);}
  d.push(['fcc','Formulario de conocimiento del cliente','Firmado por el representante legal',false]);
  return d;
}
function dvNit(n){var w=[3,7,13,17,19,23,29,37,41,43,47,53,59,67,71],s=0,d=String(n).split('').reverse();for(var i=0;i<d.length;i++)s+=(+d[i])*w[i];var r=s%11;return r>1?11-r:r;}
function fresh(p){
  var st={serv:'',org:p.actor==='ef'?'Entidad financiera':'Comercio',reg:{done:false,nit:'',razon:'',rl:'',doc:'',cn:'',cc:'',ct:''},docs:{},sel:{},tech:{creds:false,url:'',url2:'',res:null,ok:false},contrato:false,msgs:[],hecho:{},err:{}};
  docsFor(p.actor).forEach(function(d){st.docs[d[0]]={estado:'pendiente',archivo:'',motivo:'',intentos:0,revAt:0};});
  st.msgs.push(['Bienvenida','Bienvenido al portal de vinculación. Te acompañaremos en cada paso.',HOY+' · 09:00']);
  return st;
}
function S(){return K.S;}
function dl(){return docsFor(K.S.p.actor);}
function nAprob(){return dl().filter(function(d){return S().docs[d[0]].estado==='aprobado';}).length;}
function stBadge(e){return {pendiente:'<span class="badge gray">Pendiente</span>',cargado:'<span class="badge">Cargado</span>',revision:'<span class="badge plum">En revisión</span>',aprobado:'<span class="badge ok">Aprobado</span>',rechazado:'<span class="badge err">Rechazado</span>'}[e];}
function bar(cur){return K.dhead({title:'Vinculación a servicios de ACH',mark:K.mark('A'),nav:PASOS.map(function(p){return {label:p[1],to:p[0],cur:p[0]===cur};}),right:'<span class="small muted">'+(S().p.actor==='ef'?'Cooperativa Valle Unido':'Tienda Aurora SAS')+'</span>'});}
function pg(cur,body){return {layout:'desk',bar:bar(cur),wrap:'wrapd narrow',body:body};}

/* ---------- Seguimiento: pasos y estado actual ---------- */
function pasosSeg(){
  var s=S(),all=dl(),rev=all.some(function(d){return s.docs[d[0]].estado==='revision';}),rej=all.filter(function(d){return s.docs[d[0]].estado==='rechazado';}),ap=nAprob()===all.length,sent=all.some(function(d){var e=s.docs[d[0]].estado;return e==='revision'||e==='aprobado'||e==='rechazado';});
  var P=[
   {n:'Registro de la organización',resp:'Cliente',t:'5 minutos',e:s.reg.done?'ok':'cur'},
   {n:'Documentos y revisión',resp:rej.length?'Cliente':(rev?'ACH':'Cliente'),t:rev?'1 a 2 días hábiles':'Según tu carga',e:!s.reg.done?'wait':(ap?'ok':'cur'),det:rej.length?'Corregir '+rej.length+' documento'+(rej.length>1?'s':''):(rev?'ACH está revisando tus documentos':(sent?'Esperando documentos pendientes':'Cargar y enviar documentos'))},
   {n:'Configuración técnica y pruebas',resp:'Cliente',t:'1 a 3 días',e:s.tech.ok?'ok':(ap?'cur':'wait')},
   {n:'Contrato',resp:'Cliente y ACH',t:'1 día hábil',e:s.contrato?'ok':(ap&&s.tech.ok?'cur':'wait')},
   {n:'Salida a producción',resp:'ACH',t:'3 a 5 días hábiles',e:(ap&&s.tech.ok&&s.contrato)?'cur':'wait'}
  ];
  return P;
}

/* ---------- Pantallas ---------- */
function v1(){
  var s=S();
  return pg('v1','<p class="eyebrow">Portal de vinculación</p><h1>¿A qué servicio de ACH quieres conectarte?</h1><p class="lead">Elige el servicio y el tipo de organización. Los requisitos cambian según tu caso.</p><fieldset><legend>Servicio</legend><div class="grid3">'+SERV.map(function(x){return '<label class="opt" style="align-items:flex-start"><input type="radio" name="serv" value="'+x[0]+'" data-inp="serv"'+(s.serv===x[0]?' checked':'')+'><span>'+x[1]+'<span class="d">'+x[2]+'</span></span></label>';}).join('')+'</div></fieldset><div class="field" style="max-width:380px"><label for="org">Tipo de organización</label><select id="org" data-inp="org">'+ORG.map(function(o){return '<option'+(s.org===o?' selected':'')+'>'+o+'</option>';}).join('')+'</select></div><p class="err" id="e-serv" role="alert"></p><div class="toolbar"><button class="btn btn-primary" data-act="v1next">Continuar</button></div>');
}
function v2(){
  var s=S(),r=s.reg,ef=s.p.actor==='ef';
  function f(id,l,ph,k,extra){return '<div class="field"><label for="'+id+'">'+l+'</label><input type="text" id="'+id+'" value="'+esc(r[k])+'" placeholder="'+ph+'" data-inp="reg" data-k="'+k+'" autocomplete="off"'+(extra||'')+'><p class="err" id="e-'+id+'" role="alert"></p></div>';}
  return pg('v2','<h1>Registro de tu organización</h1><div class="card"><div class="field"><label for="nit">NIT (con dígito de verificación)</label><input type="text" id="nit" value="'+esc(r.nit)+'" placeholder="Ej. '+(ef?'860.123.456-3':'900.482.731-8')+'" data-inp="nit" autocomplete="off"><p class="hint" id="nit-h" aria-live="polite"></p><p class="err" id="e-nit" role="alert"></p></div>'+
    '<div class="field"><label for="razon">Razón social</label><input type="text" id="razon" value="'+esc(r.razon)+'" data-inp="reg" data-k="razon" placeholder="Se completa al verificar el NIT"><p class="err" id="e-razon" role="alert"></p></div><div class="grid2">'+f('rl','Representante legal','Nombre completo','rl')+f('doc','Documento del representante','Número de cédula','doc')+'</div><h3>Contacto del proceso</h3><div class="grid3">'+f('cn','Nombre','Nombre del contacto','cn')+f('cc','Correo','correo@empresa.example','cc')+f('ct','Celular','3XX XXX XXXX','ct')+'</div><div class="toolbar"><button class="btn btn-secondary" data-act="nav" data-to="v1">Atrás</button><button class="btn btn-primary" data-act="v2next">Guardar y ver requisitos</button></div></div>');
}
function v3(){
  var s=S(),all=dl(),n=nAprob();
  return pg('v3','<h1>Requisitos para '+(s.p.actor==='ef'?'entidades financieras':'comercios')+'</h1><p class="lead">Servicio: <strong>'+esc((SERV.filter(function(x){return x[0]===s.serv;})[0]||SERV[0])[1])+'</strong>. '+n+' de '+all.length+' documentos aprobados.</p><div class="bar'+(n===all.length?' ok':'')+'" style="margin-bottom:16px"><i style="width:'+Math.round(n/all.length*100)+'%"></i></div><div class="card" style="padding:6px 16px"><ul class="list">'+all.map(function(d){var x=s.docs[d[0]];return '<li><div class="grow"><strong>'+d[1]+'</strong><div class="small muted">'+d[2]+'</div>'+(x.estado==='rechazado'?'<div class="banner err" style="margin:8px 0 0;font-size:14px"><strong>Motivo del rechazo:</strong> '+x.motivo+'</div>':'')+(x.archivo&&x.estado!=='pendiente'?'<div class="small muted">Archivo: '+esc(x.archivo)+'</div>':'')+'</div>'+stBadge(x.estado)+(x.estado==='rechazado'?'<button class="btn btn-primary sm" data-act="irCarga" data-id="'+d[0]+'">Corregir</button>':'')+'</li>';}).join('')+'</ul></div><div class="toolbar" style="margin-top:14px"><button class="btn btn-primary" data-act="nav" data-to="v4">Cargar documentos</button><button class="btn btn-secondary" data-act="nav" data-to="v5">Ver el seguimiento</button></div>');
}
function v4(){
  var s=S(),all=dl(),pend=all.filter(function(d){return s.docs[d[0]].estado==='cargado';}).length;
  return pg('v4','<h1>Carga de documentos</h1><p class="lead">Formato PDF. Los documentos con fecha deben haberse expedido en los últimos 30 días.</p>'+all.map(function(d){
    var x=s.docs[d[0]],can=x.estado==='pendiente'||x.estado==='rechazado',sel=s.sel[d[0]]||'',er=s.err[d[0]]||'';
    return '<div class="card"><div style="display:flex;gap:10px;align-items:flex-start"><div class="grow"><strong>'+d[1]+'</strong><div class="small muted">'+d[2]+'</div></div>'+stBadge(x.estado)+'</div>'+
      (x.estado==='rechazado'?'<div class="banner err" style="margin:10px 0 0"><strong>Rechazado:</strong> '+x.motivo+'</div>':'')+
      (can?'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;align-items:flex-end"><div style="flex:1;min-width:260px"><label for="f-'+d[0]+'" class="small" style="margin:0 0 3px">Archivo (simulado)</label><select id="f-'+d[0]+'" data-inp="arch" data-id="'+d[0]+'"><option value="">Elige un archivo de ejemplo</option>'+filesFor(d).map(function(f){return '<option value="'+f+'"'+(sel===f?' selected':'')+'>'+f+'</option>';}).join('')+'</select></div><button class="btn btn-primary sm" data-act="cargarDoc" data-id="'+d[0]+'">'+(x.estado==='rechazado'?'Recargar documento':'Cargar')+'</button></div>'+(er?'<p class="err" role="alert">'+er+'</p>':''):(x.archivo?'<p class="small muted" style="margin:8px 0 0">Archivo: '+esc(x.archivo)+'</p>':''))+'</div>';}).join('')+
    '<div class="toolbar"><button class="btn btn-primary" data-act="enviarRev"'+(pend?'':' disabled')+'>Enviar a revisión ('+pend+')</button><button class="btn btn-secondary" data-act="nav" data-to="v3">Ver requisitos</button></div>');
}
function filesFor(d){var id=d[0],o=[id+(d[3]?'_2026-10-02':'')+'.pdf',id+'_escaneo.jpg'];if(d[3])o.push(id+'_2026-06-01.pdf');return o;}
function v5(){
  var P=pasosSeg(),s=S();
  var cur=P.filter(function(p){return p.e==='cur';})[0],falta=P.filter(function(p){return p.e!=='ok';}).length;
  return pg('v5','<h1>Seguimiento de tu vinculación</h1><div class="banner"><strong>Vas en: '+(cur?cur.n:'Todo completo')+'.</strong> '+(falta?'Faltan '+falta+' paso'+(falta>1?'s':'')+'. ':'')+(cur&&cur.det?cur.det+'.':'')+'</div><div class="side"><div class="card"><ol class="tl">'+P.map(function(p,i){return '<li><span class="dot '+(p.e==='ok'?'ok':p.e==='cur'?'warn':'wait')+'">'+(p.e==='ok'?'✓':i+1)+'</span><h3 style="font-size:16px;margin:0">'+p.n+'</h3><p class="small muted" style="margin:2px 0 0">Responsable: <strong>'+p.resp+'</strong> · Tiempo estimado: '+p.t+'</p>'+(p.e==='cur'&&p.det?'<p class="small" style="margin:2px 0 0">'+p.det+'</p>':'')+'</li>';}).join('')+'</ol></div><div class="card"><h3 style="margin-top:0">Mensajes de ACH</h3><ul class="list">'+s.msgs.slice().reverse().map(function(m){return '<li style="flex-direction:column;align-items:flex-start;gap:2px"><strong>'+m[0]+'</strong><span class="small">'+m[1]+'</span><span class="small muted">'+m[2]+'</span></li>';}).join('')+'</ul></div></div>');
}
function v6(){
  var s=S(),t=s.tech,ef=s.p.actor==='ef';
  return pg('v6','<h1>Configuración técnica</h1><p class="lead">Ambiente de pruebas: <span class="mono">https://pruebas.ach.example</span></p>'+(nAprob()<dl().length?'<div class="banner warn">Puedes avanzar con la configuración, pero la habilitación requiere que todos los documentos estén aprobados.</div>':'')+
   '<div class="card"><h3 style="margin-top:0">1 · Credenciales de prueba</h3>'+(t.creds?'<pre class="code-block" tabindex="0">'+(ef?'cliente_id:       ent_valleunido_test\ncertificado:      cert_pruebas_8f3a.pem (ficticio)\nsecreto:          ••••••••••••c91e':'cliente_id:       com_aurora_test\nsecreto:          sec_t_7f3a••••••••••••c91e (ficticio)')+'</pre>':'<p class="muted">Genera las credenciales para conectarte al ambiente de pruebas.</p><button class="btn btn-primary" data-act="genCred">Generar credenciales de prueba</button>')+'</div>'+
   '<div class="card"><h3 style="margin-top:0">2 · URL'+(ef?'s del servicio de la entidad':' de retorno')+'</h3><div class="field"><label for="u1">'+(ef?'URL del servicio (callback)':'URL de retorno')+'</label><input type="text" id="u1" value="'+esc(t.url)+'" placeholder="https://'+(ef?'servicios.cooperativa.example/ach':'tienda.example/retorno')+'" data-inp="url" data-k="url"><p class="err" id="e-u1" role="alert"></p></div>'+(ef?'':'<div class="field"><label for="u2">URL de confirmación</label><input type="text" id="u2" value="'+esc(t.url2)+'" placeholder="https://tienda.example/confirmacion" data-inp="url" data-k="url2"></div>')+'</div>'+
   '<div class="card"><h3 style="margin-top:0">3 · Prueba de conexión</h3><button class="btn btn-primary" data-act="probar">Probar conexión</button>'+(t.res?'<div class="banner '+(t.res.ok?'ok':'err')+'" style="margin-top:12px" role="status"><strong>'+(t.res.ok?'Conexión exitosa':'La conexión falló')+'.</strong> '+t.res.m+'</div>':'')+'</div><div class="toolbar"><button class="btn btn-secondary" data-act="nav" data-to="v5">Ver el seguimiento</button><button class="btn btn-primary" data-act="nav" data-to="v7">Ir a la habilitación</button></div>');
}
function v7(){
  var s=S(),all=dl(),n=nAprob(),P=[['Registro de la organización',s.reg.done],['Documentos aprobados ('+n+' de '+all.length+')',n===all.length],['Pruebas de conexión exitosas',s.tech.ok],['Contrato firmado',s.contrato]],ok=P.every(function(x){return x[1];});
  return pg('v7','<h1>Habilitación</h1><div class="card"><ul class="list">'+P.map(function(x){return '<li><span class="badge '+(x[1]?'ok':'gray')+'">'+(x[1]?I.check+' Listo':'Pendiente')+'</span><span class="grow">'+x[0]+'</span></li>';}).join('')+'</ul></div>'+
   (n===all.length&&!s.contrato?'<div class="toolbar"><button class="btn btn-secondary" data-act="firmar">Firmar contrato (simulado)</button></div>':'')+
   (ok?'<div class="banner ok" style="margin-top:14px"><strong>Todo listo.</strong> Fecha estimada de salida a producción: <strong>19/10/2026</strong>.</div>':'<div class="banner" style="margin-top:14px">La fecha estimada de salida a producción se calcula cuando completes los pasos pendientes.</div>')+'<div class="toolbar"><button class="btn btn-secondary" data-act="nav" data-to="v5">Ver el seguimiento</button></div>');
}

/* ---------- Revisión simulada ---------- */
function tick(){
  var s=S();if(!s)return;var ch=false,now=Date.now();
  dl().forEach(function(d){var x=s.docs[d[0]];if(x.estado==='revision'&&x.revAt&&x.revAt<=now){
    if(s.p.rechazo==='1'&&d[0]===REJ[s.p.actor]&&x.intentos===0){x.estado='rechazado';x.motivo=MOTIVO;x.intentos++;s.msgs.push(['Documento rechazado','Rechazamos «'+d[1]+'»: '+MOTIVO,HOY+' · '+K.ftime(new Date())]);K.log('documento_rechazado',{doc:d[0],motivo:MOTIVO});}
    else{x.estado='aprobado';s.msgs.push(['Documento aprobado','Aprobamos «'+d[1]+'».',HOY+' · '+K.ftime(new Date())]);K.log('documento_aprobado',{doc:d[0]});}
    ch=true;}});
  if(ch){K.toast('Hay novedades en la revisión de tus documentos');if(['v3','v4','v5','v7'].indexOf(K.cur)>=0)K.rerender();}
}
setInterval(tick,1000);

K.run({
  id:'d1',title:'D1 · Portal de vinculación ACH',layout:'desk',
  params:[{k:'actor',label:'Actor',def:'comercio',opts:[['comercio','Comercio · Tienda Aurora SAS'],['ef','Entidad financiera · Cooperativa Valle Unido']]},{k:'rechazo',label:'Revisión de documentos',def:'1',opts:[['1','Rechazar un documento la primera vez'],['0','Aprobar todo']]}],
  state:fresh,start:function(){return 'v1';},
  codes:{v1:'V1',v2:'V2',v3:'V3',v4:'V4',v5:'V5',v6:'V6',v7:'V7'},
  labels:{v1:'V1 Inicio',v2:'V2 Registro',v3:'V3 Requisitos',v4:'V4 Carga de documentos',v5:'V5 Seguimiento',v6:'V6 Configuración técnica',v7:'V7 Habilitación'},
  groups:[['Pantallas',['v1','v2','v3','v4','v5','v6','v7']]],
  routes:{v1:v1,v2:v2,v3:v3,v4:v4,v5:v5,v6:v6,v7:v7},
  acts:{
    v1next:function(){var s=S();if(!s.serv){K.setErr('e-serv','Elige un servicio para continuar.');K.vErr(['servicio']);return;}K.log('servicio_elegido',{servicio:s.serv,organizacion:s.org});K.go('v2');},
    v2next:function(){
      var s=S(),r=s.reg,bad=[],raw=String(r.nit).replace(/\D/g,'');
      var chk=function(id,ok,msg){if(!ok){K.setErr('e-'+id,msg,id);bad.push(id);}};
      chk('nit',raw.length>=7&&dvNit(raw.slice(0,-1))===+raw.slice(-1),'Revisa el NIT: el dígito de verificación no coincide.');
      chk('razon',!!r.razon.trim(),'Escribe la razón social.');chk('rl',!!r.rl.trim(),'Escribe el nombre del representante legal.');chk('doc',/\d{5,}/.test(r.doc),'Escribe el documento del representante.');
      chk('cn',!!r.cn.trim(),'Escribe el nombre del contacto.');chk('cc',/\S+@\S+\.\S+/.test(r.cc),'Escribe un correo válido.');chk('ct',/\d{7,}/.test(String(r.ct).replace(/\D/g,'')),'Escribe un celular válido.');
      if(bad.length){K.vErr(bad);return;}
      r.done=true;s.msgs.push(['Registro recibido','Recibimos el registro de '+r.razon+'. Ya puedes cargar tus documentos.',HOY+' · '+K.ftime(new Date())]);K.log('registro_completo',{nit:r.nit});K.go('v3');
    },
    irCarga:function(el){K.log('corregir_documento',{doc:el.dataset.id});K.go('v4');},
    cargarDoc:function(el){
      var s=S(),id=el.dataset.id,f=s.sel[id],d=dl().filter(function(x){return x[0]===id;})[0],x=s.docs[id];
      s.err[id]='';
      if(!f){s.err[id]='Elige un archivo para cargar.';K.vErr([id]);K.rerender();return;}
      if(!/\.pdf$/i.test(f)){s.err[id]='El formato no es válido: solo se aceptan archivos PDF.';K.vErr([id+':formato']);K.log('carga_invalida',{doc:id,motivo:'formato'});K.rerender();return;}
      var m=/_(\d{4})-(\d{2})-(\d{2})\./.exec(f);
      if(d[3]&&m){var dias=Math.round((new Date(2026,9,12)-new Date(+m[1],+m[2]-1,+m[3]))/86400000);if(dias>30){s.err[id]='El documento fue expedido hace '+dias+' días. Debe tener 30 días o menos.';K.vErr([id+':fecha']);K.log('carga_invalida',{doc:id,motivo:'fecha',dias:dias});K.rerender();return;}}
      var reint=x.estado==='rechazado';x.estado='cargado';x.archivo=f;x.motivo=x.motivo;K.log(reint?'documento_recargado':'documento_cargado',{doc:id,archivo:f});K.toast('Documento cargado');K.rerender();
    },
    enviarRev:function(){var s=S(),n=0;dl().forEach(function(d){var x=s.docs[d[0]];if(x.estado==='cargado'){x.estado='revision';x.revAt=Date.now()+6000;n++;}});s.msgs.push(['Documentos recibidos','Recibimos '+n+' documento'+(n>1?'s':'')+'. La revisión toma entre 1 y 2 días hábiles (en esta demo, unos segundos).',HOY+' · '+K.ftime(new Date())]);K.log('envio_revision',{documentos:n});K.go('v5');},
    genCred:function(){S().tech.creds=true;K.log('credenciales_generadas');K.rerender();},
    probar:function(){
      var s=S(),t=s.tech;
      if(!t.creds){t.res={ok:false,m:'Primero genera tus credenciales de prueba.'};K.log('prueba_conexion',{ok:false,motivo:'sin_credenciales'});K.rerender();return;}
      if(!/^https:\/\/\S+\.\S+/.test(t.url)){t.res={ok:false,m:'La URL debe empezar por https:// y ser válida.'};K.setErr('e-u1','Escribe una URL que empiece por https://','u1');K.log('prueba_conexion',{ok:false,motivo:'url'});K.rerender();return;}
      if(K.maybeFail('conn')){t.res=null;K.showError('Tiempo de espera agotado','No recibimos respuesta del servicio de pruebas. Intenta de nuevo.',function(){});return;}
      K.busy('Probando la conexión…',1600).then(function(ok){if(!ok)return;t.ok=true;t.res={ok:true,m:'Respuesta 200 en 184 ms con las credenciales de prueba.'};s.msgs.push(['Pruebas de conexión','Tu conexión de pruebas funciona correctamente.',HOY+' · '+K.ftime(new Date())]);K.log('prueba_conexion',{ok:true});K.rerender();});
    },
    firmar:function(){S().contrato=true;K.log('contrato_firmado');var all=nAprob()===dl().length&&S().tech.ok;if(all)K.complete({fase:'habilitacion'});K.rerender();}
  },
  inps:{
    serv:function(el,ty){if(ty==='change'){S().serv=el.value;K.setErr('e-serv','');}},
    org:function(el,ty){if(ty==='change')S().org=el.value;},
    nit:function(el){var s=S(),raw=el.value.replace(/\D/g,''),h=document.getElementById('nit-h');s.reg.nit=el.value;K.setErr('e-nit','','nit');
      if(raw.length>=8){var ok=dvNit(raw.slice(0,-1))===+raw.slice(-1);if(h)h.textContent=ok?'Dígito de verificación correcto.':'El dígito de verificación no coincide.';if(ok&&REG[raw.slice(0,-1)]){s.reg.razon=REG[raw.slice(0,-1)];var rz=document.getElementById('razon');if(rz)rz.value=s.reg.razon;}}else if(h)h.textContent='';},
    reg:function(el){var k=el.dataset.k;S().reg[k]=el.value;K.setErr('e-'+el.id,'',el.id);},
    arch:function(el,ty){if(ty==='change'){S().sel[el.dataset.id]=el.value;S().err[el.dataset.id]='';}},
    url:function(el){S().tech[el.dataset.k]=el.value;K.setErr('e-u1','','u1');}
  }
});
