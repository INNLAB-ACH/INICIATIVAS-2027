/* B2 · Calendario tributario TESO — escritorio adaptable a tableta */
var esc=K.esc,money=K.money,I=K.I;
var HOY=new Date(2026,9,12);
var MESES=['Octubre 2026','Noviembre 2026','Diciembre 2026'];
var DIAS=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
var SAN_MIN=520000;
var EMPRESAS=['Distribuidora Pacífico SAS','Textiles Andinos SAS','Clínica Santa Aurora SAS','Constructora Río Claro SAS','Agroexportadora del Valle SAS'];
var CIIU=['4631 · Comercio al por mayor de productos alimenticios','4711 · Comercio al por menor en supermercados','5611 · Restaurantes y cafeterías','4923 · Transporte de carga por carretera'];
var REGIMEN=['Responsable de IVA · régimen ordinario','No responsable de IVA','Régimen simple de tributación'];
/* municipio: [tarifa ICA ‰, base ICA, periodicidad, día ICA, base reteICA, día reteICA] */
var MUNI={Cali:[9.66,380000000,'Bimestral',14,88000000,19],'Bogotá':[11.04,520000000,'Bimestral',15,120000000,20],'Medellín':[10,205000000,'Mensual',16,74000000,21],Barranquilla:[10,290000000,'Bimestral',20,61000000,22],Cartagena:[7,120000000,'Bimestral',21,30000000,23],Bucaramanga:[8,140000000,'Bimestral',22,35000000,26]};
var TIPOS=['Retención en la fuente','IVA','ICA','ReteICA'];
var CUENTAS=[['c1','Cuenta corriente •••• 7730 · Banco Andino',148500000],['c2','Cuenta de ahorros •••• 4821 · Banco del Pacífico Digital',62300000]];

/* ---------- Fechas ---------- */
function adj(d){var w=d.getDay();if(w===6)d.setDate(d.getDate()+2);if(w===0)d.setDate(d.getDate()+1);return d;}
function dd(m,d){return adj(new Date(2026,m,d));}
function fdt(d){return K.fdate(d);}
function same(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
function dias(d){return Math.round((d-HOY)/86400000);}
function venceTxt(d){var n=dias(d);return n===0?'vence hoy':n===1?'vence mañana':n>1?'vence en '+n+' días':'venció hace '+(-n)+' día'+(n===-1?'':'s');}

/* ---------- Series de obligaciones ---------- */
function seriesFor(sel,reg,per){
  var S=[];
  if(reg!==1){
    if(reg===0||reg===2)S.push({key:'ret',tipo:'Retención en la fuente',muni:'Nacional',per:'Mensual',tn:4,unit:'%',base:1059500000,items:[['Septiembre 2026',dd(9,13),1],['Octubre 2026',dd(10,11),1.04],['Noviembre 2026',dd(11,10),0.97]]});
  }
  if(reg===0)S.push({key:'iva',tipo:'IVA',muni:'Nacional',per:per==='cuatri'?'Cuatrimestral':'Bimestral',tn:19,unit:'%',base:461105000,items:per==='cuatri'?[]:[['Septiembre–Octubre 2026',dd(10,12),1]],nota:per==='cuatri'?'Primer vencimiento en enero de 2027 (fuera del calendario mostrado).':''});
  Object.keys(MUNI).filter(function(m){return sel.indexOf(m)>=0;}).forEach(function(m){
    var c=MUNI[m],bi=c[2]==='Bimestral',d1=c[3],d2=c[5];
    S.push({key:'ica-'+m,tipo:'ICA',muni:m,per:c[2],tn:c[0],unit:'‰',base:c[1],items:bi?[['Agosto–Septiembre 2026',dd(9,d1),1],['Octubre–Noviembre 2026',dd(11,d1),1.06]]:[['Septiembre 2026',dd(9,d1),1],['Octubre 2026',dd(10,d1),1.03],['Noviembre 2026',dd(11,d1),0.98]]});
    S.push({key:'rica-'+m,tipo:'ReteICA',muni:m,per:'Mensual',tn:c[0],unit:'‰',base:c[4],items:[['Agosto 2026',dd(9,5),1,m==='Barranquilla'?'':'pagado'],['Septiembre 2026',dd(9,d2),1],['Octubre 2026',dd(10,d2),1.05],['Noviembre 2026',dd(11,d2),0.96]]});
  });
  S.forEach(function(s){s.inc=true;s.edit=false;});
  return S;
}
function expand(series){
  var L=[],n=0;
  series.forEach(function(s){if(!s.inc)return;s.items.forEach(function(it){
    var base=Math.round(s.base*it[2]/1000)*1000;
    L.push({id:'o'+(n++),sk:s.key,tipo:s.tipo,muni:s.muni,periodo:it[0],due:it[1],base:base,tn:s.tn,unit:s.unit,valor:Math.round(base*(s.unit==='%'?s.tn/100:s.tn/1000)/1000)*1000,estado:it[3]||'pendiente',editado:false});
  });});
  L.sort(function(a,b){return a.due-b.due;});
  return L;
}
function est(o){return (o.estado==='pagado'||o.estado==='programado')?o.estado:(o.due<HOY?'vencido':'pendiente');}
function badge(e){return '<span class="badge '+({pendiente:'',programado:'plum',pagado:'ok',vencido:'err'}[e])+'">'+e.charAt(0).toUpperCase()+e.slice(1)+'</span>';}
function tn(o){return (o.tn+'').replace('.',',')+' '+o.unit;}
function san(o,m){m=m||1;return Math.round(Math.max(0.05*o.valor*m,SAN_MIN)+0.024*o.valor*m);}

/* ---------- Estado ---------- */
var OTRAS=[['Textiles Andinos SAS','Retención en la fuente','Nacional','Septiembre 2026',new Date(2026,9,12),31840000],['Clínica Santa Aurora SAS','ReteICA','Cali','Septiembre 2026',new Date(2026,9,19),1240000],['Constructora Río Claro SAS','ICA','Medellín','Septiembre 2026',new Date(2026,9,16),4380000],['Agroexportadora del Valle SAS','Retención en la fuente','Nacional','Septiembre 2026',new Date(2026,9,13),18770000],['Clínica Santa Aurora SAS','IVA','Nacional','Septiembre–Octubre 2026',new Date(2026,10,12),52960000],['Textiles Andinos SAS','ICA','Bogotá','Agosto–Septiembre 2026',new Date(2026,9,15),6120000],['Agroexportadora del Valle SAS','ICA','Barranquilla','Agosto–Septiembre 2026',new Date(2026,9,20),2210000],['Constructora Río Claro SAS','Retención en la fuente','Nacional','Septiembre 2026',new Date(2026,9,14),24390000]];
function fresh(){return {conf:false,step:1,empresa:EMPRESAS[0],ciiu:0,reg:0,sel:['Cali'],per:'bi',series:null,obs:[],mes:0,vista:'cal',todos:false,f:{muni:'',tipo:'',est:''},ob:null,al:{d15:true,d5:true,d1:false,correo:true,teso:true,mail:'tesoreria@distpacifico.example'},alertaId:null,pago:{id:null,step:0,from:'',cuenta:'c1',valor:0,comp:null},cfgT0:0,fe:'',emp7:''};}
function ensure(){var S=K.S;if(!S.conf)autoConfig();}
function autoConfig(){var S=K.S;S.sel=['Cali','Bogotá','Medellín','Barranquilla'];S.series=seriesFor(S.sel,S.reg,S.per);S.obs=expand(S.series);S.conf=true;K.log('configuracion_ejemplo_cargada');}
function byId(id){return K.S.obs.filter(function(o){return o.id===id;})[0];}
function icaCali(){var S=K.S;return S.obs.filter(function(o){return o.tipo==='ICA'&&o.muni==='Cali'&&o.due>=HOY;})[0];}

/* ---------- Estructura ---------- */
function bar(cur){
  var S=K.S,nav=[{label:'Inicio',to:'t1',cur:cur==='t1'},{label:'Calendario tributario',to:'t3',cur:cur==='t3'||cur==='t4'},{label:'Alertas',to:'t5',cur:cur==='t5'||cur==='t6'},{label:'Configuración',to:'t2',cur:cur==='t2'}];
  if(K.S.p.perfil==='contador')nav.push({label:'Mis empresas',to:'t7',cur:cur==='t7'});
  return K.dhead({title:'TESO · Tesorería',mark:K.mark('T'),nav:nav,right:'<span class="small muted">'+(S.p.perfil==='contador'?'Contador · ':'Tesorero · ')+esc(S.empresa)+'</span>'});
}
function page(cur,body){return {layout:'desk',bar:bar(cur),wrap:'wrapd',body:body};}
function cta(to,label,cls){return '<button class="btn '+(cls||'btn-primary')+'" data-act="nav" data-to="'+to+'">'+label+'</button>';}
function proximos(n){return K.S.obs.filter(function(o){var e=est(o);return e!=='pagado'&&o.due>=HOY;}).slice(0,n);}
function obLine(o){return '<li><div class="grow"><strong>'+o.tipo+(o.muni!=='Nacional'?' · '+o.muni:'')+'</strong><div class="small muted">'+o.periodo+' · '+fdt(o.due)+' ('+venceTxt(o.due)+')</div></div><strong>'+money(o.valor)+'</strong><button class="btn btn-secondary sm" data-act="ver" data-id="'+o.id+'">Ver</button></li>';}

/* ---------- T1 ---------- */
function t1(){
  var S=K.S,card;
  if(!S.conf)card='<div class="card"><h2 style="margin:0 0 6px">Calendario tributario</h2><p class="muted">Reúne en un solo lugar tus vencimientos de retención, IVA, ICA y reteICA por municipio, con alertas y pago en un clic.</p>'+cta('t2','Configurar mi calendario')+'</div>';
  else card='<div class="card"><div class="toolbar" style="justify-content:space-between;margin:0 0 6px"><h2 style="margin:0">Calendario tributario</h2>'+cta('t3','Abrir calendario','btn-secondary')+'</div><p class="muted">Tus próximos 3 vencimientos</p><ul class="list">'+proximos(3).map(obLine).join('')+'</ul></div>';
  var sel=S.p.perfil==='contador'?'<div class="toolbar"><label for="emp" style="margin:0">Empresa</label><select id="emp" data-inp="emp" style="width:auto">'+EMPRESAS.map(function(e){return '<option'+(e===S.empresa?' selected':'')+'>'+e+'</option>';}).join('')+'</select>'+cta('t7','Ver todas mis empresas','btn-secondary')+'</div>':'';
  var filler=['Pagos a proveedores','Nómina','Conciliación bancaria','Cupos y saldos'].map(function(x){return '<div class="card" style="opacity:.55"><strong>'+x+'</strong><p class="muted small" style="margin:4px 0 0">Otro módulo de TESO (no incluido en esta prueba)</p></div>';}).join('');
  return page('t1','<p class="eyebrow">Bienvenido a TESO</p><h1>Inicio</h1>'+sel+'<div class="grid2" style="grid-template-columns:2fr 1fr;align-items:start">'+card+'<div class="grid2" style="grid-template-columns:1fr">'+filler+'</div></div>');
}
/* ---------- T2 ---------- */
function t2(){
  var S=K.S;if(!S.cfgT0){S.cfgT0=Date.now();K.log('inicio_configuracion');}
  var st=S.step,h='<h1>Configuración asistida</h1><div class="stepper" aria-hidden="true">'+[1,2,3].map(function(i){return '<i class="'+(i<=st?'on':'')+'"></i>';}).join('')+'</div><p class="muted">Paso '+st+' de 3</p>';
  if(st===1){
    h+='<div class="card"><div class="field"><label for="emp">Empresa</label><select id="emp" data-inp="emp"'+(S.p.perfil==='contador'?'':' disabled')+'>'+EMPRESAS.map(function(e){return '<option'+(e===S.empresa?' selected':'')+'>'+e+'</option>';}).join('')+'</select></div>'+
     '<div class="field"><label for="ciiu">Actividad económica (CIIU)</label><select id="ciiu" data-inp="ciiu">'+CIIU.map(function(c,i){return '<option value="'+i+'"'+(S.ciiu===i?' selected':'')+'>'+c+'</option>';}).join('')+'</select></div>'+
     '<div class="field"><label for="reg">Régimen</label><select id="reg" data-inp="reg">'+REGIMEN.map(function(c,i){return '<option value="'+i+'"'+(S.reg===i?' selected':'')+'>'+c+'</option>';}).join('')+'</select></div></div><div class="toolbar">'+'<button class="btn btn-primary" data-act="step" data-id="2">Continuar</button></div>';
  }else if(st===2){
    h+='<div class="card"><fieldset><legend>¿En qué municipios declara?</legend><div class="grid3">'+Object.keys(MUNI).map(function(m){return '<label class="opt"><input type="checkbox" data-inp="muni" data-id="'+m+'"'+(S.sel.indexOf(m)>=0?' checked':'')+'> <span>'+m+'<span class="d">ICA '+MUNI[m][2].toLowerCase()+'</span></span></label>';}).join('')+'</div></fieldset>'+
     '<div class="field" style="margin-top:14px"><label for="per">Periodicidad del IVA</label><select id="per" data-inp="per"><option value="bi"'+(S.per==='bi'?' selected':'')+'>Bimestral</option><option value="cuatri"'+(S.per==='cuatri'?' selected':'')+'>Cuatrimestral</option></select></div></div><div class="toolbar"><button class="btn btn-secondary" data-act="step" data-id="1">Atrás</button><button class="btn btn-primary" data-act="step" data-id="3"'+(S.sel.length?'':' disabled')+'>Sugerir obligaciones</button></div>';
  }else{
    if(!S.series)S.series=seriesFor(S.sel,S.reg,S.per);
    h+='<p class="lead">Estas son las obligaciones que le sugerimos. Confirme, corrija la tarifa o quite las que no apliquen.</p><div class="card" style="padding:6px 16px"><table class="dtable" style="width:100%"><thead><tr><th>Incluir</th><th>Obligación</th><th>Municipio</th><th>Periodicidad</th><th>Próximo vencimiento</th><th>Tarifa sugerida</th></tr></thead><tbody>'+
     S.series.map(function(s,i){var nx=s.items.filter(function(x){return x[1]>=HOY;})[0];return '<tr><td><input type="checkbox" data-inp="sinc" data-i="'+i+'"'+(s.inc?' checked':'')+' aria-label="Incluir '+esc(s.tipo+' '+s.muni)+'" style="width:22px;height:22px"></td><td>'+s.tipo+'</td><td>'+s.muni+'</td><td>'+s.per+'</td><td>'+(nx?fdt(nx[1]):'—')+(s.nota?'<div class="small muted">'+s.nota+'</div>':'')+'</td><td style="width:150px"><div style="display:flex;align-items:center;gap:6px"><input type="text" inputmode="decimal" value="'+String(s.tn).replace('.',',')+'" data-inp="stn" data-i="'+i+'" aria-label="Tarifa de '+esc(s.tipo+' '+s.muni)+'" style="min-height:42px"> <span>'+s.unit+'</span></div></td></tr>';}).join('')+'</tbody></table></div>'+
     '<div class="toolbar" style="margin-top:14px"><button class="btn btn-secondary" data-act="step" data-id="2">Atrás</button><button class="btn btn-primary" data-act="confirmcfg">Confirmar y crear calendario</button></div>';
  }
  return page('t2',h);
}
/* ---------- T3 ---------- */
function filtered(){var S=K.S,f=S.f;return S.obs.filter(function(o){return (!f.muni||o.muni===f.muni)&&(!f.tipo||o.tipo===f.tipo)&&(!f.est||est(o)===f.est);});}
function chip(o){var e=est(o),c={pendiente:'#EAF2F8;color:#004A80',programado:'#EFE9F8;color:#5B3F8C',pagado:'#E3F1E8;color:#1E7A46',vencido:'#FCE9E7;color:#B3261E'}[e];return '<button data-act="ver" data-id="'+o.id+'" style="display:block;width:100%;text-align:left;border:0;border-radius:6px;background:'+c+';font-size:12px;font-weight:700;padding:3px 6px;margin-top:3px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+esc(o.tipo+' '+o.muni+' · '+e+' · '+money(o.valor))+'">'+o.tipo.replace('Retención en la fuente','Retefuente')+(o.muni!=='Nacional'?' '+o.muni:'')+'</button>';}
function t3(){
  var S=K.S;
  if(!S.conf)return page('t3','<h1>Calendario tributario</h1><div class="card center"><p class="muted">Todavía no hay obligaciones en tu calendario.</p><div class="toolbar">'+cta('t2','Configurar mi calendario')+'<button class="btn btn-secondary" data-act="ejemplo">Cargar configuración de ejemplo</button></div></div>');
  var items=filtered(),f=S.f;
  var munis=['Nacional'].concat(Object.keys(MUNI).filter(function(m){return S.sel.indexOf(m)>=0;}));
  function sel(id,k,label,opts){return '<div><label for="'+id+'" class="small" style="margin:0 0 3px">'+label+'</label><select id="'+id+'" data-inp="filtro" data-k="'+k+'" style="min-height:44px">'+'<option value="">Todos</option>'+opts.map(function(o){return '<option'+(f[k]===o?' selected':'')+'>'+o+'</option>';}).join('')+'</select></div>';}
  var h='<div class="toolbar" style="justify-content:space-between"><h1 style="margin:0">Calendario tributario</h1><div class="chips" role="group" aria-label="Vista"><button class="chip" data-act="vista" data-id="cal" aria-pressed="'+(S.vista==='cal')+'">Calendario</button><button class="chip" data-act="vista" data-id="lista" aria-pressed="'+(S.vista==='lista')+'">Lista</button></div></div>'+
   '<div class="card"><div class="grid4">'+sel('fm','muni','Municipio',munis)+sel('ft','tipo','Impuesto',TIPOS)+sel('fe','est','Estado',['pendiente','programado','pagado','vencido'])+'<div style="display:flex;align-items:end"><button class="btn btn-secondary sm" data-act="limpiar">Limpiar filtros</button></div></div></div>'+
   '<div class="toolbar" style="justify-content:center"><button class="btn btn-secondary sm" data-act="mes" data-id="-1" aria-label="Mes anterior"'+(S.mes===0?' disabled':'')+'>‹</button><h2 style="margin:0;min-width:200px;text-align:center">'+MESES[S.mes]+'</h2><button class="btn btn-secondary sm" data-act="mes" data-id="1" aria-label="Mes siguiente"'+(S.mes===2?' disabled':'')+'>›</button></div>';
  if(S.vista==='cal'){
    var first=new Date(2026,9+S.mes,1),off=(first.getDay()+6)%7,nd=new Date(2026,10+S.mes,0).getDate(),cells='';
    for(var i=0;i<off;i++)cells+='<div class="cal-c off"></div>';
    for(var d=1;d<=nd;d++){var dt=new Date(2026,9+S.mes,d),its=items.filter(function(o){return same(o.due,dt);});
      cells+='<div class="cal-c'+(same(dt,HOY)?' today':'')+'"><span class="cal-d">'+d+'</span>'+its.slice(0,3).map(chip).join('')+(its.length>3?'<div class="small muted" style="margin-top:3px">+'+(its.length-3)+' más</div>':'')+'</div>';}
    h+='<div class="cal">'+DIAS.map(function(x){return '<div class="cal-h">'+x+'</div>';}).join('')+cells+'</div>';
  }else{
    var inM=items.filter(function(o){return S.todos||o.due.getMonth()===9+S.mes;}),pend=inM.filter(function(o){var e=est(o);return e==='pendiente'||e==='vencido'||e==='programado';}),tot=pend.reduce(function(a,o){return a+o.valor;},0);
    h+='<div class="toolbar"><label class="switch"><input type="checkbox" data-inp="todos"'+(S.todos?' checked':'')+'> Ver todos los meses</label><span class="banner" style="margin:0"><strong>Por pagar con este filtro:</strong> '+money(tot)+' ('+pend.length+' '+(pend.length===1?'obligación':'obligaciones')+')</span></div>'+
     '<div class="tscroll"><table class="dtable"><thead><tr><th>Vence</th><th>Impuesto</th><th>Municipio</th><th>Periodo</th><th class="num">Valor estimado</th><th>Estado</th><th></th></tr></thead><tbody>'+(inM.length?inM.map(function(o){return '<tr><td>'+fdt(o.due)+'</td><td>'+o.tipo+'</td><td>'+o.muni+'</td><td>'+o.periodo+'</td><td class="num">'+money(o.valor)+'</td><td>'+badge(est(o))+'</td><td><button class="btn btn-secondary sm" data-act="ver" data-id="'+o.id+'">Ver</button></td></tr>';}).join(''):'<tr><td colspan="7" class="muted">No hay obligaciones con estos filtros.</td></tr>')+'</tbody></table></div>';
  }
  return page('t3',h);
}
/* ---------- T4 ---------- */
function sancionHtml(o){var e=est(o),m=e==='vencido'?Math.max(1,Math.ceil(-dias(o.due)/30)):1;return K.row(e==='vencido'?'Sanción e intereses estimados ('+m+' mes'+(m>1?'es':'')+' de retraso)':'Sanción e intereses estimados si se paga 1 mes tarde','<strong style="color:var(--err)">'+money(san(o,m))+'</strong>');}
function t4(){
  var S=K.S;ensure();var o=byId(S.ob)||S.obs[0],e=est(o);S.ob=o.id;
  var acts=e==='pagado'?'<span class="badge ok">'+I.check+' Pagada</span>':'<button class="btn btn-primary" data-act="pagar" data-id="'+o.id+'">Pagar</button><button class="btn btn-secondary" data-act="programar" data-id="'+o.id+'">Programar pago</button><button class="btn btn-ghost" data-act="marcar" data-id="'+o.id+'">Ya la pagué por otro medio</button>';
  return page('t4','<p><button class="link" data-act="nav" data-to="t3">← Volver al calendario</button></p><p class="eyebrow">'+o.periodo+'</p><div class="toolbar"><h1 style="margin:0">'+o.tipo+(o.muni!=='Nacional'?' · '+o.muni:'')+'</h1>'+badge(e)+(o.editado?'<span class="badge gray">Editada a mano</span>':'')+'</div>'+
   '<div class="side"><div class="card">'+K.row('Base gravable estimada',money(o.base))+K.row('Tarifa sugerida',tn(o))+
   '<div class="field" style="margin-top:12px"><label for="val">Valor estimado (puede corregirlo)</label><input type="text" inputmode="numeric" id="val" value="'+K.money(o.valor).replace('$','')+'" data-inp="valor" data-id="'+o.id+'"'+(e==='pagado'?' disabled':'')+'><p class="hint">Calculado como base × tarifa. Si su liquidación real es distinta, escríbala aquí.</p></div>'+K.row('Fecha límite','<strong>'+fdt(o.due)+'</strong> · '+venceTxt(o.due))+'<div id="san">'+sancionHtml(o)+'</div></div>'+
   '<div class="card"><h3 style="margin-top:0">Acciones</h3><div style="display:grid;gap:8px">'+acts+'</div><p class="hint">Estimación ilustrativa de sanciones; no reemplaza la asesoría tributaria.</p></div></div>');
}
/* ---------- T5 ---------- */
function t5(){
  var S=K.S;ensure();var al=S.al,lst=proximos(4),sel=byId(S.alertaId)||icaCali()||lst[0];S.alertaId=sel.id;
  function ck(k,l){return '<label class="switch"><input type="checkbox" data-inp="alerta" data-k="'+k+'"'+(al[k]?' checked':'')+'> '+l+'</label>';}
  return page('t5','<h1>Alertas</h1><div class="grid2"><div class="card"><h3 style="margin-top:0">Avisarme antes del vencimiento</h3>'+ck('d15','15 días antes')+ck('d5','5 días antes')+ck('d1','1 día antes')+'<h3>Por dónde</h3>'+ck('correo','Correo electrónico')+ck('teso','Dentro de TESO')+'<div class="field"><label for="mail">Correo</label><input type="text" id="mail" value="'+esc(al.mail)+'" data-inp="mail"></div><button class="btn btn-primary" data-act="guardar">Guardar alertas</button></div>'+
   '<div class="card"><h3 style="margin-top:0">Alertas recientes</h3><ul class="list">'+lst.map(function(o){return '<li><span class="badge '+(dias(o.due)<=2?'warn':'')+'">'+(dias(o.due)===0?'Hoy':'En '+dias(o.due)+' d')+'</span><span class="grow"><strong>'+o.tipo+(o.muni!=='Nacional'?' · '+o.muni:'')+'</strong><span class="small muted"> · '+fdt(o.due)+'</span></span><button class="btn btn-secondary sm" data-act="alerta" data-id="'+o.id+'">Ver alerta</button></li>';}).join('')+'</ul></div></div>'+
   '<h2 style="margin:20px 0 8px">Vista de la alerta</h2><div class="printable" style="max-width:640px"><p class="small muted" style="margin:0">De: alertas@teso.example · Para: '+esc(al.mail)+'</p><h3 style="margin:8px 0">'+(dias(sel.due)<=0?'Hoy':'En '+dias(sel.due)+' días')+' vence tu '+sel.tipo+(sel.muni!=='Nacional'?' de '+sel.muni:'')+'</h3><p>'+esc(S.empresa)+' · periodo '+sel.periodo+'.<br>Valor estimado: <strong>'+money(sel.valor)+'</strong> · Fecha límite: <strong>'+fdt(sel.due)+'</strong>.</p><div class="toolbar"><button class="btn btn-primary" data-act="pagaralerta" data-id="'+sel.id+'">Pagar ahora</button><button class="btn btn-secondary" data-act="ver" data-id="'+sel.id+'">Ver detalle</button></div></div>');
}
/* ---------- T6 ---------- */
function t6(){
  var S=K.S;ensure();var P=S.pago,o=byId(P.id)||icaCali()||S.obs[0];P.id=o.id;if(!P.valor)P.valor=o.valor;
  if(P.step===1){
    var cu=CUENTAS.filter(function(c){return c[0]===P.cuenta;})[0];
    return page('t6','<div class="center">'+I.ok+'<h1>Pago realizado</h1><p class="muted">'+o.tipo+(o.muni!=='Nacional'?' · '+o.muni:'')+' · periodo '+o.periodo+'</p></div><div class="card" style="max-width:560px;margin:0 auto">'+K.row('Comprobante',P.comp.id)+K.row('Valor pagado','<strong>'+money(P.valor)+'</strong>')+K.row('Cuenta',esc(cu[1]))+K.row('Fecha y hora',fdt(HOY)+' · '+P.comp.h)+K.row('Estado de la obligación',badge('pagado'))+'</div><div class="toolbar" style="justify-content:center;margin-top:16px"><button class="btn btn-secondary" data-act="compdl">'+I.download+' Descargar comprobante</button>'+cta('t3','Volver al calendario')+'</div>');
  }
  var cu2=CUENTAS.filter(function(c){return c[0]===P.cuenta;})[0];
  return page('t6','<p><button class="link" data-act="nav" data-to="'+(P.from==='alerta'?'t5':'t4')+'">← Atrás</button></p><h1>Pagar '+o.tipo+(o.muni!=='Nacional'?' · '+o.muni:'')+'</h1><div class="side"><div class="card"><div class="field"><label for="cta">Pagar desde</label><select id="cta" data-inp="cuenta">'+CUENTAS.map(function(c){return '<option value="'+c[0]+'"'+(P.cuenta===c[0]?' selected':'')+'>'+c[1]+'</option>';}).join('')+'</select><p class="hint">Saldo disponible: '+money(cu2[2])+'</p></div><div class="field"><label for="pv">Valor a pagar</label><input type="text" inputmode="numeric" id="pv" value="'+money(P.valor).replace('$','')+'" data-inp="pvalor"><p class="err" id="e-pv" role="alert"></p></div>'+K.row('Fecha de pago','Hoy · '+fdt(HOY))+K.row('Fecha límite',fdt(o.due))+'<button class="btn btn-primary" data-act="confirmarpago" style="margin-top:12px">Confirmar pago</button></div><div class="note-side"><h3>Resumen</h3><p style="margin:0">'+esc(S.empresa)+'<br>Periodo '+o.periodo+'<br>Valor estimado: '+money(o.valor)+'</p>'+(P.from==='alerta'?'<p class="hint">Estás pagando desde una alerta.</p>':'')+'</div></div>');
}
/* ---------- T7 ---------- */
function t7(){
  var S=K.S,rows=[];
  var mine=S.conf?S.obs.filter(function(o){return est(o)!=='pagado'&&o.due>=HOY;}).slice(0,3):seriesFor(['Cali','Bogotá','Medellín','Barranquilla'],0,'bi').reduce(function(a,s){return a.concat(s.items.filter(function(i){return i[1]>=HOY;}).slice(0,1).map(function(i){return {tipo:s.tipo,muni:s.muni,periodo:i[0],due:i[1],valor:Math.round(s.base*i[2]*(s.unit==='%'?s.tn/100:s.tn/1000)/1000)*1000};}));},[]).sort(function(a,b){return a.due-b.due;}).slice(0,3);
  mine.forEach(function(o){rows.push({emp:EMPRESAS[0],tipo:o.tipo,muni:o.muni,periodo:o.periodo,due:o.due,valor:o.valor});});
  OTRAS.forEach(function(r){rows.push({emp:r[0],tipo:r[1],muni:r[2],periodo:r[3],due:r[4],valor:r[5]});});
  rows.sort(function(a,b){return a.due-b.due;});
  if(S.emp7)rows=rows.filter(function(r){return r.emp===S.emp7;});
  var nx=rows[0];
  return page('t7','<h1>Mis empresas</h1><p class="lead">Los próximos vencimientos de las 5 empresas que maneja, en una sola lista.</p>'+
   (nx?'<div class="banner warn"><strong>Próximo vencimiento:</strong> '+esc(nx.emp)+' · '+nx.tipo+(nx.muni!=='Nacional'?' '+nx.muni:'')+' · '+fdt(nx.due)+' ('+venceTxt(nx.due)+')</div>':'')+
   '<div class="toolbar"><label for="e7" style="margin:0">Empresa</label><select id="e7" data-inp="emp7" style="width:auto"><option value="">Todas (5)</option>'+EMPRESAS.map(function(e){return '<option'+(S.emp7===e?' selected':'')+'>'+e+'</option>';}).join('')+'</select></div>'+
   '<div class="tscroll"><table class="dtable"><thead><tr><th>Vence</th><th>Empresa</th><th>Impuesto</th><th>Municipio</th><th>Periodo</th><th class="num">Valor estimado</th></tr></thead><tbody>'+rows.map(function(r){return '<tr><td><strong>'+fdt(r.due)+'</strong><div class="small muted">'+venceTxt(r.due)+'</div></td><td>'+esc(r.emp)+'</td><td>'+r.tipo+'</td><td>'+r.muni+'</td><td>'+r.periodo+'</td><td class="num">'+money(r.valor)+'</td></tr>';}).join('')+'</tbody></table></div>');
}

function num(v){return +String(v).replace(/\D/g,'')||0;}
K.run({
  id:'b2',title:'B2 · Calendario tributario TESO',layout:'desk',
  params:[{k:'perfil',label:'Perfil',def:'tesorero',opts:[['tesorero','Tesorero · una empresa con 4 sedes'],['contador','Contador · varias empresas']]}],
  state:fresh,start:function(){return 't1';},
  labels:{t1:'T1 Inicio TESO',t2:'T2 Configuración asistida',t3:'T3 Calendario y lista',t4:'T4 Detalle de obligación',t5:'T5 Alertas',t6:'T6 Pago desde la alerta',t7:'T7 Vista multiempresa'},
  groups:function(p){return [['Pantallas',['t1','t2','t3','t4','t5','t6'].concat(p.perfil==='contador'?['t7']:[])]];},
  routes:{t1:t1,t2:t2,t3:t3,t4:t4,t5:t5,t6:t6,t7:t7},
  acts:{
    step:function(el){var S=K.S,n=+el.dataset.id;if(n===3)S.series=seriesFor(S.sel,S.reg,S.per);S.step=n;K.rerender();},
    confirmcfg:function(){var S=K.S;S.obs=expand(S.series);S.conf=true;K.log('configuracion_completada',{ms:Date.now()-S.cfgT0,municipios:S.sel.join('|'),obligaciones:S.obs.length,editadas:S.series.filter(function(s){return s.edit;}).length});K.complete({fase:'configuracion'});K.go('t3');},
    ejemplo:function(){autoConfig();K.rerender();},
    ver:function(el){K.S.ob=el.dataset.id;K.log('detalle_obligacion',{id:el.dataset.id});K.go('t4');},
    vista:function(el){K.S.vista=el.dataset.id;K.rerender();},
    mes:function(el){var S=K.S;S.mes=Math.max(0,Math.min(2,S.mes+(+el.dataset.id)));K.rerender();},
    limpiar:function(){K.S.f={muni:'',tipo:'',est:''};K.log('uso_filtro',{accion:'limpiar'});K.rerender();},
    pagar:function(el){var S=K.S;S.pago={id:el.dataset.id,step:0,from:'detalle',cuenta:'c1',valor:0,comp:null};K.go('t6');},
    pagaralerta:function(el){var S=K.S;S.pago={id:el.dataset.id,step:0,from:'alerta',cuenta:'c1',valor:0,comp:null};K.log('pagar_desde_alerta',{id:el.dataset.id});K.go('t6');},
    programar:function(el){var o=byId(el.dataset.id);o.estado='programado';K.log('pago_programado',{id:o.id});K.toast('Pago programado para el '+fdt(new Date(o.due.getTime()-86400000)));K.rerender();},
    marcar:function(el){var o=byId(el.dataset.id);o.estado='pagado';K.log('marcada_pagada',{id:o.id});K.rerender();},
    alerta:function(el){K.S.alertaId=el.dataset.id;K.log('alerta_vista',{id:el.dataset.id});K.rerender();},
    guardar:function(){K.log('alertas_guardadas',K.S.al);K.toast('Alertas guardadas');},
    confirmarpago:function(){
      var S=K.S,P=S.pago,o=byId(P.id);
      if(!P.valor||P.valor<1){K.setErr('e-pv','Escribe el valor a pagar.','pv');K.vErr(['valor']);return;}
      if(K.maybeFail('pago')){K.showError('No pudimos procesar el pago','Fue un problema temporal. No se descontó nada de tu cuenta.',function(){K.rerender();});return;}
      K.busy('Procesando tu pago…',1400).then(function(ok){if(!ok)return;o.estado='pagado';P.step=1;P.comp={id:'CP-'+K.rnd(9),h:'10:32 a. m.'};K.log('pago_realizado',{id:o.id,desde:P.from,valor:P.valor});K.complete({desde:P.from});K.rerender();});
    },
    compdl:function(){var S=K.S,o=byId(S.pago.id);K.download('comprobante-'+S.pago.comp.id+'.txt',['COMPROBANTE DE PAGO · PROTOTIPO (datos ficticios)',S.empresa,o.tipo+' '+o.muni+' · '+o.periodo,'Valor: '+money(S.pago.valor),'Comprobante: '+S.pago.comp.id].join('\n'));}
  },
  inps:{
    emp:function(el,ty){if(ty!=='change')return;K.S.empresa=el.value;K.log('empresa_elegida',{empresa:el.value});K.rerender();},
    ciiu:function(el,ty){if(ty==='change'){K.S.ciiu=+el.value;}},
    reg:function(el,ty){if(ty==='change'){K.S.reg=+el.value;}},
    per:function(el,ty){if(ty==='change'){K.S.per=el.value;}},
    muni:function(el,ty){if(ty!=='change')return;var S=K.S,m=el.dataset.id,i=S.sel.indexOf(m);if(el.checked&&i<0)S.sel.push(m);if(!el.checked&&i>=0)S.sel.splice(i,1);K.log('municipio_'+(el.checked?'agregado':'quitado'),{municipio:m});K.rerender();},
    sinc:function(el,ty){if(ty!=='change')return;var s=K.S.series[+el.dataset.i];s.inc=el.checked;s.edit=true;K.log('obligacion_editada_manual',{serie:s.key,incluir:el.checked});},
    stn:function(el,ty){if(ty!=='change')return;var s=K.S.series[+el.dataset.i],v=parseFloat(String(el.value).replace(',','.'));if(!isNaN(v)&&v>0){s.tn=v;s.edit=true;K.log('obligacion_editada_manual',{serie:s.key,tarifa:v});}else el.value=String(s.tn).replace('.',',');},
    filtro:function(el,ty){if(ty!=='change')return;K.S.f[el.dataset.k]=el.value;K.log('uso_filtro',{filtro:el.dataset.k,valor:el.value});K.rerender();},
    todos:function(el,ty){if(ty!=='change')return;K.S.todos=el.checked;K.rerender();},
    valor:function(el,ty){var S=K.S,o=byId(el.dataset.id),v=num(el.value);if(!v)return;o.valor=v;o.editado=true;K.html('san',sancionHtml(o));if(ty==='change'){K.log('obligacion_editada_manual',{id:o.id,valor:v});K.rerender();}},
    alerta:function(el,ty){if(ty!=='change')return;K.S.al[el.dataset.k]=el.checked;K.log('alerta_configurada',{aviso:el.dataset.k,activo:el.checked});},
    mail:function(el){K.S.al.mail=el.value;},
    cuenta:function(el,ty){if(ty==='change'){K.S.pago.cuenta=el.value;K.rerender();}},
    pvalor:function(el){K.S.pago.valor=num(el.value);K.setErr('e-pv','','pv');},
    emp7:function(el,ty){if(ty!=='change')return;K.S.emp7=el.value;K.log('uso_filtro',{filtro:'empresa',valor:el.value});K.rerender();}
  }
});
