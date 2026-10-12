/* C2 · Asistente PILA — widget de chat en una página SOI ficticia (participante) y panel del moderador */
var esc=K.esc,I=K.I;

/* =====================================================================
   BASE DE PREGUNTAS FRECUENTES (editable sin tocar el resto del código)
   Cada entrada: id, q (pregunta), kw (palabras clave para el modo auto),
   a (pasos numerados), l (enlaces a pantallas simuladas de SOI: [texto, clave]),
   esc (true = el caso normalmente requiere una persona).
   Claves de pantalla: planilla, ingresos, soportes, calendario, novedades, certificados, datos, historial, pse
   ===================================================================== */
var FAQ=[
 {"id":"f1","q":"¿Cómo pago como independiente?","kw":"pagar independiente planilla pago mensual","a":["Entra a «Mi planilla» y elige el mes que vas a pagar.","Escribe o confirma tus ingresos del mes; SOI calcula tu IBC y tus aportes.","Revisa el resumen: salud, pensión y riesgos laborales.","Elige «Pagar con PSE», selecciona tu banco y autoriza el pago.","Descarga tu soporte cuando el pago quede aprobado."],"l":[["Ir a Mi planilla","planilla"],["Pagar con PSE","pse"]]},
 {"id":"f2","q":"Me salió el error de IBC","kw":"error ibc ingreso base cotizacion rechazo validacion","a":["El error de IBC aparece cuando el ingreso base de cotización queda por debajo del mínimo o por encima del máximo permitido.","Entra a «Ingresos» y revisa el valor que escribiste: que no tenga puntos de más ni esté en cero.","Si cotizas por varios ingresos, confirma que la suma esté bien repartida.","Vuelve a la planilla y pulsa «Validar». Si el error continúa, pídeme que te pase con una persona."],"l":[["Revisar mis ingresos","ingresos"],["Volver a la planilla","planilla"]]},
 {"id":"f3","q":"¿Cómo descargo mi soporte de pago?","kw":"descargar soporte comprobante pago recibo","a":["Entra a «Soportes».","Busca el mes y el número de transacción.","Pulsa «Descargar» para obtener el PDF."],"l":[["Ir a Soportes","soportes"]]},
 {"id":"f4","q":"Quiero corregir una planilla ya pagada","kw":"corregir planilla pagada correccion modificar error","a":["Las planillas ya pagadas no se pueden editar directamente.","Una persona del equipo debe revisar tu caso para saber qué tipo de corrección aplica.","Ten a la mano el número de planilla, el mes y qué dato quieres corregir."],"l":[["Ver mi historial de pagos","historial"]],"esc":true},
 {"id":"f5","q":"¿Qué es el IBC y cómo se calcula?","kw":"ibc que es calcula ingreso base cotizacion","a":["El IBC es el ingreso base sobre el que se calculan tus aportes.","Como regla general, para independientes se calcula a partir de tus ingresos mensuales.","SOI lo calcula por ti cuando escribes tus ingresos en «Ingresos».","Si tienes dudas sobre una situación particular, puedo pasarte con una persona."],"l":[["Ir a Ingresos","ingresos"]]},
 {"id":"f6","q":"¿Cuándo vence mi planilla?","kw":"vence vencimiento fecha limite plazo calendario","a":["La fecha límite depende de los últimos dígitos de tu documento y del tipo de planilla.","Entra a «Calendario de pago» y escribe tu documento para ver tu fecha.","Si pagas después de esa fecha, se pueden generar intereses de mora."],"l":[["Ver Calendario de pago","calendario"]]},
 {"id":"f7","q":"Quiero pagar este mes con un ingreso diferente","kw":"ingreso diferente cambiar ingreso distinto actualizar mes","a":["Entra a «Mi planilla» y elige el mes.","Pulsa «Actualizar ingreso» y escribe el valor real de este mes.","Revisa el IBC y los aportes que SOI recalculó.","Pulsa «Validar» y luego «Pagar con PSE».","Recuerda que el ingreso debe ser el que realmente recibiste."],"l":[["Actualizar mi ingreso","ingresos"],["Ir a Mi planilla","planilla"]]},
 {"id":"f8","q":"¿Cómo cambio de EPS o de fondo de pensiones?","kw":"cambiar eps fondo pensiones afp traslado","a":["El traslado se tramita con la entidad a la que quieres pasarte, no desde la planilla.","Cuando el traslado esté aprobado, registra la novedad en «Novedades».","SOI usará la nueva entidad en tus próximas planillas."],"l":[["Registrar novedad","novedades"]]},
 {"id":"f9","q":"¿Cómo agrego un empleado a la planilla?","kw":"agregar empleado trabajador ingreso nuevo planilla empresa","a":["Entra a «Novedades» y elige «Ingreso de trabajador».","Escribe documento, fecha de ingreso, salario y entidades.","Guarda la novedad y revisa que el empleado aparezca en la planilla del mes."],"l":[["Ir a Novedades","novedades"]]},
 {"id":"f10","q":"¿Cómo registro el retiro de un empleado?","kw":"retiro empleado trabajador novedad retirar","a":["Entra a «Novedades» y elige «Retiro».","Escribe el documento del trabajador y la fecha de retiro.","Guarda y verifica que la planilla refleje la novedad."],"l":[["Ir a Novedades","novedades"]]},
 {"id":"f11","q":"¿Cómo registro una incapacidad?","kw":"incapacidad novedad licencia enfermedad","a":["Entra a «Novedades» y elige «Incapacidad».","Selecciona al trabajador y escribe fecha de inicio y de fin.","Adjunta el soporte si te lo pide y guarda."],"l":[["Ir a Novedades","novedades"]]},
 {"id":"f12","q":"¿Cómo pago una planilla atrasada?","kw":"atrasada mora vencida pagar tarde retraso","a":["Entra a «Mi planilla» y elige el mes atrasado.","SOI calcula los intereses de mora automáticamente.","Revisa el total y paga con PSE como siempre."],"l":[["Ir a Mi planilla","planilla"]]},
 {"id":"f13","q":"¿Qué pasa si pago después de la fecha límite?","kw":"despues fecha limite tarde mora intereses sancion","a":["Se pueden generar intereses de mora sobre los aportes.","SOI los calcula y los muestra en el resumen antes de pagar.","Pagar cuanto antes evita que aumenten."],"l":[["Ver Calendario de pago","calendario"]]},
 {"id":"f14","q":"¿Por qué mi planilla sale con intereses de mora?","kw":"intereses mora cobro por que planilla","a":["Aparecen cuando el pago se hace después de la fecha límite del periodo.","Revisa la fecha límite en «Calendario de pago».","Si crees que es un error, pídeme que te pase con una persona."],"l":[["Ver Calendario de pago","calendario"]]},
 {"id":"f15","q":"¿Cómo pago con PSE?","kw":"pse pagar banco debito cuenta","a":["En el resumen de tu planilla pulsa «Pagar con PSE».","Elige tu banco y el tipo de persona.","Autoriza el pago en el sitio de tu banco.","Vuelve a SOI para ver el comprobante."],"l":[["Pagar con PSE","pse"]]},
 {"id":"f16","q":"Mi pago por PSE quedó pendiente","kw":"pse pendiente proceso no confirmado transaccion","a":["Un pago puede tardar unos minutos en confirmarse.","Entra a «Historial» y revisa el estado de la transacción.","No pagues de nuevo hasta que el estado cambie a «rechazado» o «fallido».","Si sigue pendiente después de un tiempo, pídeme que te pase con una persona."],"l":[["Ver Historial","historial"]]},
 {"id":"f17","q":"¿Cómo recupero mi usuario o mi clave?","kw":"recuperar clave contrasena usuario olvide acceso","a":["En la pantalla de ingreso pulsa «Olvidé mi clave».","Escribe tu documento y el correo registrado.","Sigue el enlace que llegará a tu correo."],"l":[["Actualizar mis datos","datos"]]},
 {"id":"f18","q":"¿Cómo actualizo mis datos de contacto?","kw":"actualizar datos contacto correo celular telefono","a":["Entra a «Mis datos».","Cambia el correo o el celular y guarda.","Recibirás un código para confirmar el cambio."],"l":[["Ir a Mis datos","datos"]]},
 {"id":"f19","q":"¿Cómo genero el certificado de aportes?","kw":"certificado aportes constancia generar","a":["Entra a «Certificados».","Elige el periodo que necesitas.","Pulsa «Generar» y descarga el PDF."],"l":[["Ir a Certificados","certificados"]]},
 {"id":"f20","q":"¿Cómo sé si mi pago ya fue aplicado a mi EPS o fondo?","kw":"pago aplicado eps fondo administradora dispersion confirmado","a":["Entra a «Historial» y abre el pago.","Revisa el estado de cada administradora: pendiente, dispersado o aplicado.","La aplicación puede tardar uno o más días hábiles."],"l":[["Ver Historial","historial"]]},
 {"id":"f21","q":"¿Cómo elijo la ARL y la clase de riesgo?","kw":"arl riesgo clase riesgos laborales","a":["Entra a «Mis datos» y abre «Riesgos laborales».","Selecciona tu ARL y la clase de riesgo según tu actividad.","Guarda; la planilla usará esa información."],"l":[["Ir a Mis datos","datos"]]},
 {"id":"f22","q":"¿Qué tipo de planilla me corresponde?","kw":"tipo planilla cual corresponde e y i","a":["SOI te sugiere el tipo de planilla según tu perfil: empleado, independiente o empresa.","Si no estás seguro, revisa tu perfil en «Mis datos».","Puedo pasarte con una persona si tu caso es especial."],"l":[["Ir a Mis datos","datos"]]},
 {"id":"f23","q":"¿Puedo pagar varias planillas a la vez?","kw":"varias planillas juntas pago multiple consolidado","a":["En este ejemplo cada planilla se paga por separado.","Paga la primera con PSE y repite el proceso con la siguiente.","Cada pago genera su propio soporte."],"l":[["Ir a Mi planilla","planilla"]]},
 {"id":"f24","q":"Escribí mal mi número de documento","kw":"documento cedula numero error equivocado incorrecto","a":["Un error en el documento no se corrige desde la planilla.","Una persona debe validar tu identidad antes de corregirlo.","Ten a la mano tu documento de identidad."],"l":[],"esc":true},
 {"id":"f25","q":"¿Cómo registro un cambio de salario?","kw":"cambio salario sueldo variacion novedad aumento","a":["Entra a «Novedades» y elige «Variación de salario».","Escribe el nuevo salario y desde qué fecha aplica.","Guarda y revisa que la planilla muestre el nuevo IBC."],"l":[["Ir a Novedades","novedades"]]},
 {"id":"f26","q":"No tuve ingresos este mes, ¿qué hago?","kw":"sin ingresos no tuve ingresos cero mes","a":["Tu situación depende de tu tipo de afiliación.","Una persona puede orientarte sobre si debes pagar ese mes.","Ten a la mano tu tipo de afiliación y el mes en cuestión."],"l":[],"esc":true},
 {"id":"f27","q":"¿Cómo pago a una empleada del servicio doméstico?","kw":"servicio domestico empleada hogar casa trabajadora","a":["Entra a «Mi planilla» y elige «Servicio doméstico».","Agrega a la trabajadora con su salario y entidades.","Revisa el resumen y paga con PSE."],"l":[["Ir a Mi planilla","planilla"]]},
 {"id":"f28","q":"Me cobraron dos veces","kw":"doble cobro cobraron dos veces duplicado pago repetido","a":["Un cobro duplicado debe revisarlo una persona.","Ten a la mano los números de transacción de ambos pagos.","No intentes pagar de nuevo mientras tanto."],"l":[["Ver Historial","historial"]],"esc":true},
 {"id":"f29","q":"Tengo dos fuentes de ingreso, ¿cómo las registro?","kw":"dos ingresos varias fuentes multiples actividades","a":["En «Ingresos» agrega cada fuente por separado.","SOI suma los ingresos para calcular el IBC total.","Revisa el resumen antes de pagar."],"l":[["Ir a Ingresos","ingresos"]]},
 {"id":"f30","q":"¿Dónde veo el historial de mis pagos?","kw":"historial pagos anteriores ver mis pagos","a":["Entra a «Historial».","Filtra por año y mes.","Abre un pago para ver su estado y descargar el soporte."],"l":[["Ver Historial","historial"]]}
];
var SUGGEST=['f1','f2','f3','f4','f7','f6'];
/* Motor API: dirección de TU servidor. Nunca pongas una clave de API en este archivo.
   El servidor debe aceptar POST {historial:[{rol:'usuario'|'asistente',texto:'...'}]} y responder {texto:'...'}.
   PROMPT DE SISTEMA SUGERIDO (se configura en el servidor):
   "Eres el asistente de SOI para dudas sobre PILA (seguridad social). Responde solo sobre PILA y SOI, en español claro y con pasos
    numerados. Usa únicamente la base de preguntas frecuentes que se te entrega. No inventes tarifas, porcentajes ni fechas; si el
    dato no está en la base, dilo. Si no sabes, o el caso exige revisar un pago o una planilla ya pagada, ofrece pasar a una persona." */
var ENDPOINT='';
var CANAL='ach-c2-mago';
var PANTALLAS={planilla:['Mi planilla','Planilla de octubre 2026 · Independiente',[['Periodo','Octubre 2026'],['IBC calculado','$1.380.000'],['Total a pagar','$412.800']]],ingresos:['Ingresos','Ingresos reportados del mes',[['Honorarios consultoría','$3.450.000'],['Otros ingresos','$0']]],soportes:['Soportes','Soportes de pago',[['Septiembre 2026','Descargar'],['Agosto 2026','Descargar'],['Julio 2026','Descargar']]],calendario:['Calendario de pago','Escribe tu documento para ver tu fecha',[['Documento','••••418'],['Fecha límite octubre','Según tus últimos dígitos']]],novedades:['Novedades','Registrar una novedad',[['Ingreso de trabajador',''],['Retiro',''],['Incapacidad',''],['Variación de salario','']]],certificados:['Certificados','Certificado de aportes',[['Periodo','Elige el periodo'],['Formato','PDF']]],datos:['Mis datos','Datos personales y de contacto',[['Correo','m••••@correo.example'],['Celular','•••• •• 4821'],['ARL','ARL Sol Andino · Riesgo I']]],historial:['Historial','Pagos recientes',[['Sep 2026 · PSE','Aprobado'],['Ago 2026 · PSE','Aprobado'],['Jul 2026 · PSE','Aprobado']]],pse:['Pago con PSE','Elige tu banco y autoriza el pago',[['Banco','Banco Andino'],['Valor','$412.800']]]};

function fresh(p){return {open:false,msgs:[],typing:false,esc:false,surveyed:false,t0:0,ans:{},mod:{msgs:[],connected:false,esc:false,filter:''}};}
function faq(id){return FAQ.filter(function(f){return f.id===id;})[0];}
function newId(){return 'm'+Date.now().toString(36)+Math.floor(Math.random()*1000);}
var bc=null;
function send(o){if(bc){try{bc.postMessage(o);}catch(_){}}}
function motor(){return K.S.p.motor;}

/* ---------- Motor automático (palabras clave) ---------- */
function bestFaq(text){
  var q=K.norm(text).split(/[^a-z0-9]+/).filter(function(w){return w.length>2;}),best=null,bs=0;
  FAQ.forEach(function(f){var hay=K.norm(f.q+' '+f.kw),s=0;q.forEach(function(w){if(hay.indexOf(w)>=0)s++;});if(s>bs){bs=s;best=f;}});
  return bs>=2||(bs>=1&&q.length<=2)?best:null;
}
function faqMsg(f,who){return {id:newId(),r:'bot',who:who||'Asistente',fid:f.id,t:'',steps:f.a,links:f.l,esc:!!f.esc,fb:''};}

/* ---------- Mensajes ---------- */
function pushUser(text){
  var S=K.S;S.msgs.push({id:newId(),r:'user',t:text});K.log('pregunta',{texto:text.slice(0,200),motor:motor()});
  renderMsgs();
  if(motor()==='mago'){S.typing=true;renderMsgs();send({type:'user',text:text});}
  else if(motor()==='api')askApi();
  else answerAuto(text);
}
function answerAuto(text){
  var S=K.S;S.typing=true;renderMsgs();
  setTimeout(function(){
    S.typing=false;var f=bestFaq(text);
    if(f)S.msgs.push(faqMsg(f));
    else S.msgs.push({id:newId(),r:'bot',who:'Asistente',t:'No estoy seguro de haber entendido tu duda. ¿Puedes contarla con otras palabras? Si prefieres, te paso con una persona.',steps:[],links:[],esc:true,fb:''});
    renderMsgs();
  },900+Math.random()*500);
}
function askApi(){
  var S=K.S;S.typing=true;renderMsgs();
  var hist=S.msgs.filter(function(m){return m.r==='user'||m.r==='bot';}).slice(-10).map(function(m){return {rol:m.r==='user'?'usuario':'asistente',texto:m.t||(m.steps||[]).join(' ')};});
  if(!ENDPOINT){K.log('motor_fallback',{motivo:'ENDPOINT vacío'});answerAuto(S.msgs[S.msgs.length-1].t);return;}
  fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({historial:hist})}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json();}).then(function(d){
    S.typing=false;S.msgs.push({id:newId(),r:'bot',who:'Asistente',t:String(d.texto||''),steps:[],links:[],fb:''});renderMsgs();
  }).catch(function(e){S.typing=false;K.log('error_api',{mensaje:String(e.message||e)});S.msgs.push({id:newId(),r:'bot',who:'Asistente',t:'No pude conectarme para responder. Puedes intentar de nuevo o hablar con una persona.',steps:[],links:[],esc:true,fb:'x'});renderMsgs();});
}
function msgHtml(m){
  if(m.r==='user')return '<div class="cm u"><div class="bub">'+esc(m.t)+'</div></div>';
  if(m.r==='sys')return '<div class="cm s"><div class="card" style="margin:0">'+m.html+'</div></div>';
  var h='<div class="cm b"><div class="who">'+esc(m.who||'Asistente')+'</div><div class="bub">';
  if(m.t)h+='<p style="margin:0 0 6px">'+esc(m.t).replace(/\n/g,'<br>')+'</p>';
  if(m.steps&&m.steps.length)h+='<ol style="margin:4px 0 6px;padding-left:20px">'+m.steps.map(function(s){return '<li style="margin-bottom:4px">'+esc(s)+'</li>';}).join('')+'</ol>';
  if(m.links&&m.links.length)h+='<div class="chips" style="margin-top:6px">'+m.links.map(function(l){return '<button class="chip" style="min-height:40px;font-size:14px" data-act="pantalla" data-id="'+l[1]+'">'+esc(l[0])+'</button>';}).join('')+'</div>';
  h+='</div>';
  if(m.fb===''&&m.r==='bot')h+='<div class="fb" role="group" aria-label="¿Te sirvió esta respuesta?"><span class="small muted">¿Te sirvió?</span><button class="chip" style="min-height:36px;font-size:13px" data-act="fb" data-id="'+m.id+'" data-v="si">Me sirvió</button><button class="chip" style="min-height:36px;font-size:13px" data-act="fb" data-id="'+m.id+'" data-v="no">No me sirvió</button></div>';
  else if(m.fb==='si'||m.fb==='no')h+='<div class="small muted" style="margin-top:2px">'+(m.fb==='si'?'Marcaste: me sirvió':'Marcaste: no me sirvió')+'</div>';
  return h+'</div>';
}
function greeting(){
  return '<div class="cm b"><div class="who">Asistente</div><div class="bub"><p style="margin:0 0 6px"><strong>¡Hola! Soy el asistente de SOI.</strong> Te ayudo con dudas sobre tu planilla.</p><p class="small muted" style="margin:0">Soy un asistente automático. Puedo equivocarme; si lo necesitas te paso con una persona.</p></div></div>'+
   '<div class="cm"><p class="small muted" style="margin:8px 0 4px">Preguntas frecuentes</p><div class="chips">'+SUGGEST.map(function(id){return '<button class="chip" style="min-height:40px;font-size:14px;text-align:left" data-act="sug" data-id="'+id+'">'+esc(faq(id).q)+'</button>';}).join('')+'</div></div>';
}
function renderMsgs(){
  var S=K.S,el=document.getElementById('chat-msgs');if(!el)return;
  el.innerHTML=greeting()+S.msgs.map(msgHtml).join('')+(S.typing?'<div class="cm b"><div class="bub" aria-live="polite">Escribiendo…</div></div>':'');
  el.scrollTop=el.scrollHeight;
}
function escalate(byMod){
  var S=K.S;if(S.esc){return;}S.esc=true;
  var last=S.msgs.filter(function(m){return m.r==='user';}).slice(-1)[0];
  var resumen={motivo:last?last.t:'(sin pregunta previa)',mensajes:S.msgs.length,perfil:'Independiente · planilla de octubre 2026',planilla:'PL-2026-10-30417',resueltas:S.msgs.filter(function(m){return m.fb==='si';}).length};
  S.msgs.push({id:newId(),r:'sys',html:'<strong>Te pasamos con una persona</strong><p class="muted small" style="margin:4px 0">Esto es lo que recibirá el asesor:</p><ul class="small" style="margin:0 0 6px;padding-left:18px"><li>Motivo: '+esc(resumen.motivo)+'</li><li>Perfil: '+resumen.perfil+'</li><li>Planilla: '+resumen.planilla+'</li><li>Mensajes en esta conversación: '+resumen.mensajes+'</li></ul><span class="badge warn">Tiempo estimado de espera: 6 minutos</span>'});
  S.typing=false;K.log('escalamiento',{origen:byMod?'moderador':'participante',motivo:resumen.motivo.slice(0,120)});
  if(!byMod)send({type:'escalate',resumen:resumen});
  renderMsgs();
}
function setOpen(v){
  var S=K.S,w=document.getElementById('chat'),f=document.getElementById('fab');if(!w)return;
  S.open=v;w.hidden=!v;f.hidden=v;
  if(v){if(!S.t0){S.t0=Date.now();K.log('conversacion_inicio');send({type:'hello'});}renderMsgs();var i=document.getElementById('chat-in');if(i)i.focus();}
}
function closeChat(){
  var S=K.S;
  if(S.msgs.length&&!S.surveyed){
    K.openSheet('<div class="sheet-h"><h2 id="sh-t">Antes de cerrar</h2></div><p><strong>¿Resolviste tu duda?</strong></p><div class="chips" role="group" aria-label="Resolviste tu duda">'+['Sí','En parte','No'].map(function(x){return '<button class="chip" data-act="encuesta" data-id="'+x+'">'+x+'</button>';}).join('')+'</div><p><button class="link" data-act="encuesta" data-id="(sin responder)">Cerrar sin responder</button></p>');
    return;
  }
  endConv('(sin mensajes)');
}
function endConv(resp){
  var S=K.S;S.surveyed=true;K.closeSheet();
  K.log('encuesta_cierre',{resolvio:resp,ms:S.t0?Date.now()-S.t0:0,mensajes:S.msgs.length,escalo:S.esc});
  K.log('conversacion_fin',{ms:S.t0?Date.now()-S.t0:0});K.complete({resolvio:resp});
  setOpen(false);S.msgs=[];S.esc=false;S.t0=0;S.surveyed=false;S.typing=false;
}

/* ---------- Página SOI ---------- */
function soi(){
  var S=K.S;
  var cards=[['Mi planilla','Planilla de octubre 2026 lista para pagar'],['Calendario de pago','Consulta tu fecha límite'],['Soportes','Descarga tus soportes de pago'],['Historial','Tus pagos recientes']].map(function(c){return '<div class="card"><h3 style="margin:0 0 4px">'+c[0]+'</h3><p class="muted" style="margin:0">'+c[1]+'</p></div>';}).join('');
  return {layout:'desk',wrap:'none',bar:K.dhead({title:'SOI · Seguridad social',mark:K.mark('S'),right:'<span class="small muted">Marta Lucía Ortiz · Independiente</span>'}),
    body:'<div class="wrapd"><p class="eyebrow">Pago de seguridad social (PILA)</p><h1>Bienvenida, Marta Lucía</h1><p class="lead">Aquí puedes liquidar y pagar tus aportes. Si tienes una duda, usa el botón de ayuda.</p><div class="grid2">'+cards+'</div></div>'+
    '<button id="fab" class="fab" data-act="abrir"'+(S.open?' hidden':'')+'>¿Necesitas ayuda?</button>'+
    '<section id="chat" class="chat" role="dialog" aria-label="Asistente de SOI"'+(S.open?'':' hidden')+'><header><strong>Asistente de SOI</strong><span class="grow"></span><button class="btn btn-secondary sm" data-act="persona" style="background:#fff">Hablar con una persona</button><button class="iconbtn" data-act="cerrar" aria-label="Cerrar el chat" style="color:#fff">'+I.close+'</button></header><div id="chat-msgs" class="chat-msgs" aria-live="polite"></div>'+
    '<form class="chat-f" data-act-form="enviar"><label for="chat-in" class="sr">Escribe tu pregunta</label><input type="text" id="chat-in" autocomplete="off" placeholder="Escribe tu pregunta…"><button class="btn btn-primary sm" type="submit">Enviar</button></form></section>',
    after:function(){if(K.S.open)renderMsgs();var f=document.querySelector('.chat-f');if(f&&!f._b){f._b=1;f.addEventListener('submit',function(e){e.preventDefault();var i=document.getElementById('chat-in'),v=i.value.trim();if(!v){return;}i.value='';pushUser(v);});}}};
}
/* ---------- Panel del moderador ---------- */
function modMsgs(){
  var M=K.S.mod;
  return M.msgs.map(function(m){
    var c={user:'Participante',agent:'Tú ('+(m.who||'asistente')+')',sys:'Sistema'}[m.r];
    return '<div style="margin-bottom:8px;display:flex;gap:8px"><span class="badge '+(m.r==='user'?'':m.r==='sys'?'warn':'plum')+'" style="align-self:flex-start;white-space:nowrap">'+c+'</span><div>'+esc(m.t)+'</div></div>';
  }).join('')||'<p class="muted">Todavía no hay mensajes. Cuando el participante abra el chat y escriba, aparecerán aquí.</p>';
}
function modRender(){var el=document.getElementById('mod-msgs');if(el){el.innerHTML=modMsgs();el.scrollTop=el.scrollHeight;}var st=document.getElementById('mod-st');if(st){var M=K.S.mod;st.innerHTML=(M.connected?'<span class="badge ok">Participante conectado</span>':'<span class="badge gray">Esperando al participante…</span>')+(M.esc?' <span class="badge warn">Pidió hablar con una persona</span>':'');}}
function modPage(){
  var M=K.S.mod,f=K.norm(M.filter);
  var quick=FAQ.filter(function(x){return !f||K.norm(x.q).indexOf(f)>=0;}).map(function(x){return '<button class="btn btn-secondary sm" style="justify-content:flex-start;text-align:left;width:100%;margin-bottom:6px;min-height:44px" data-act="mresp" data-id="'+x.id+'">'+esc(x.q)+(x.esc?' <span class="badge warn">escalar</span>':'')+'</button>';}).join('');
  return {layout:'desk',wrap:'wrapd',bar:K.dhead({title:'Panel del moderador · Asistente PILA',mark:K.mark('M'),right:'<button class="btn btn-secondary sm" data-act="abrirpart">Abrir pantalla del participante</button>'}),
    body:'<h1>Conversación en vivo</h1><p class="muted">Abre la pantalla del participante en otra pestaña del mismo navegador y sitio (modo Mago de Oz). Tus respuestas aparecen en su chat como si las diera el asistente.</p><div id="mod-st" style="margin-bottom:10px"></div>'+
    '<div class="side" style="grid-template-columns:minmax(0,1fr) 380px"><div><div class="card" style="min-height:260px;max-height:420px;overflow:auto" id="mod-msgs"></div><div class="card"><label for="mtxt" style="margin-top:0">Responder con texto libre</label><textarea id="mtxt" placeholder="Escribe la respuesta"></textarea><div class="toolbar" style="margin-top:8px"><button class="btn btn-primary" data-act="menviar" data-id="asistente">Enviar como asistente</button><button class="btn btn-secondary" data-act="menviar" data-id="asesor">Enviar como asesor (persona)</button><button class="btn btn-danger" data-act="mescalar">Escalar</button></div></div></div>'+
    '<div class="card"><h3 style="margin-top:0">Respuestas predefinidas ('+FAQ.length+')</h3><input type="search" id="mf" data-inp="mfiltro" placeholder="Buscar pregunta" value="'+esc(M.filter)+'" style="margin-bottom:8px"><div style="max-height:520px;overflow:auto" id="mquick">'+quick+'</div></div></div>',
    after:modRender};
}
function modSend(o,txt){var M=K.S.mod;send(o);M.msgs.push({r:'agent',who:o.who,t:txt});K.log('moderador_responde',{tipo:o.fid?'predefinida':'libre',como:o.who,texto:txt.slice(0,120)});modRender();}
function openPantalla(key){
  var p=PANTALLAS[key];if(!p)return;K.log('pantalla_simulada',{pantalla:key});
  K.openSheet(K.sheetHead(esc(p[0]))+'<p class="muted">Pantalla simulada de SOI · '+esc(p[1])+'</p><div class="card">'+p[2].map(function(r){return K.row(esc(r[0]),esc(r[1]));}).join('')+'</div><button class="btn btn-primary" data-act="closeSheet">Volver al chat</button>');
}

/* ---------- Arranque ---------- */
function initChannel(){
  try{bc=new BroadcastChannel(CANAL);}catch(_){bc=null;return;}
  bc.onmessage=function(ev){
    var d=ev.data||{},S=K.S;
    if(K.S.p.panel==='moderador'){
      var M=S.mod;
      if(d.type==='hello'){M.connected=true;send({type:'ack'});modRender();}
      else if(d.type==='user'){M.connected=true;M.msgs.push({r:'user',t:d.text});modRender();}
      else if(d.type==='escalate'){M.esc=true;M.msgs.push({r:'sys',t:'El participante pidió hablar con una persona. Motivo: '+d.resumen.motivo});modRender();}
      else if(d.type==='fb'){M.msgs.push({r:'sys',t:'Retroalimentación: '+d.v});modRender();}
      return;
    }
    if(motor()!=='mago')return;
    if(d.type==='agent'){
      S.typing=false;
      if(d.fid){var f=faq(d.fid);if(f){var m=faqMsg(f,d.who==='asesor'?'Asesor':'Asistente');S.msgs.push(m);}}
      else S.msgs.push({id:newId(),r:'bot',who:d.who==='asesor'?'Asesor':'Asistente',t:d.text,steps:[],links:[],fb:d.who==='asesor'?'x':''});
      renderMsgs();
    }else if(d.type==='escalate_mod'){escalate(true);}
  };
}
K.run({
  id:'c2',title:'C2 · Asistente PILA',layout:'desk',
  params:[{k:'motor',label:'Motor de respuestas',def:'mago',opts:[['mago','Mago de Oz · el moderador responde desde otra pestaña'],['api','API · endpoint propio (ENDPOINT)'],['auto','Automático local · palabras clave (para pruebas sin moderador)']]},
          {k:'panel',label:'Pantalla',def:'',opts:[['','Participante'],['moderador','Panel del moderador']]}],
  state:fresh,start:function(p){return p.panel==='moderador'?'mod':'soi';},
  labels:{soi:'C1 Página SOI con chat',mod:'Panel del moderador'},groups:[['Pantallas',['soi','mod']]],
  routes:{soi:soi,mod:modPage},
  acts:{
    abrir:function(){setOpen(true);},
    cerrar:closeChat,
    persona:function(){if(!K.S.open)return;if(K.S.esc){K.toast('Ya pediste hablar con una persona');return;}escalate(false);},
    sug:function(el){pushUser(faq(el.dataset.id).q);},
    fb:function(el){var S=K.S,m=S.msgs.filter(function(x){return x.id===el.dataset.id;})[0];if(!m)return;m.fb=el.dataset.v;K.log('respuesta_util',{util:el.dataset.v==='si',faq:m.fid||'(libre)'});send({type:'fb',v:(el.dataset.v==='si'?'Me sirvió':'No me sirvió')+' · '+(m.fid?faq(m.fid).q:'respuesta libre')});
      if(el.dataset.v==='no'&&!S.esc)S.msgs.push({id:newId(),r:'bot',who:'Asistente',t:'Lamento no haberte ayudado. ¿Quieres reformular tu pregunta o prefieres hablar con una persona?',steps:[],links:[],fb:'x'});renderMsgs();},
    pantalla:function(el){openPantalla(el.dataset.id);},
    encuesta:function(el){endConv(el.dataset.id);},
    abrirpart:function(){var q=new URLSearchParams(location.search);q.delete('panel');window.open(location.pathname+'?'+q.toString()+'#soi','_blank');},
    mresp:function(el){var f=faq(el.dataset.id);modSend({type:'agent',fid:f.id,who:'asistente'},f.q+' → '+f.a.join(' · '));},
    menviar:function(el){var t=document.getElementById('mtxt'),v=t.value.trim();if(!v)return;modSend({type:'agent',text:v,who:el.dataset.id},v);t.value='';},
    mescalar:function(){var M=K.S.mod;send({type:'escalate_mod'});M.msgs.push({r:'sys',t:'Escalaste la conversación: el participante ve el resumen y el tiempo de espera.'});K.log('moderador_escala');modRender();}
  },
  inps:{
    mfiltro:function(el){K.S.mod.filter=el.value;var q=K.norm(el.value);document.getElementById('mquick').innerHTML=FAQ.filter(function(x){return !q||K.norm(x.q).indexOf(q)>=0;}).map(function(x){return '<button class="btn btn-secondary sm" style="justify-content:flex-start;text-align:left;width:100%;margin-bottom:6px;min-height:44px" data-act="mresp" data-id="'+x.id+'">'+esc(x.q)+(x.esc?' <span class="badge warn">escalar</span>':'')+'</button>';}).join('');}
  }
});
initChannel();
