/* Genera protos/celula-a.html … celula-f.html (paquete de campo por célula) a partir de los datos del tablero.
   Uso: node paquetes.js   (lee ../Validación Temprana 2027.html) */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.join(__dirname,'..');
const src=fs.readFileSync(path.join(root,'Validación Temprana 2027.html'),'utf8').split(/\r?\n/);
const grab=n=>src.find(l=>l.startsWith('const '+n+' = ')||l.startsWith('const '+n+'='));
const ctx={};vm.createContext(ctx);
const ci=src.findIndex(l=>l.startsWith('const CELULAS')),cl=src.slice(ci,src.findIndex((l,i)=>i>ci&&l.startsWith('};'))+1).join('\n');
vm.runInContext([grab('DATA'),grab('PROTOS'),cl].join('\n')+';this.DATA=DATA;this.PROTOS=PROTOS;this.CELULAS=CELULAS;',ctx);
const {DATA,PROTOS,CELULAS}=ctx;

const FILES={A1:'a1-checkout-pse-2027.html',A2:'a2-pago-app-comercio.html',A3:'a3-pagos-programados-divididos.html',A4:'a4-seguridad-del-pago.html',A5:'a5-recarga-nacional-movilidad.html',B1:'b1-request-to-pay.html',B2:'b2-calendario-tributario-teso.html',B3:'b3-demo-teso-marca-blanca-erp.html',B4:'b4-facturacion-en-un-toque.html',C1:'c1-validador-planilla-soi.html',C2:'c2-asistente-pila.html',C3:'c3-pago-internacional-pila.html',C4:'c4-pago-pila-24-7.html',D1:'d1-portal-vinculacion-ach.html',D2:'d2-blueprint-hub-proveedor.html',D3:'d3-portal-desarrolladores-receptor.html',D4:'d4-ficha-modelo-analitico.html',D5:'d5-pfm-consolidado.html',E1:'e1-niveles-servicio-antifraude.html',E2:'e2-alerta-red-antifraude.html'};
const VARS={A1:[['Variante A','?v=A'],['Variante B','?v=B']],A2:[['Variante A','?v=A'],['Variante B','?v=B']],A3:[['Módulo a','?m=a'],['Módulo b','?m=b']],A4:[['Variante A','?v=A'],['Variante B','?v=B']],A5:[['Persona A','?v=A'],['Persona B','?v=B'],['Empresa','?vista=empresa']],B1:[['Empresa','?vista=empresa'],['Pagador','?vista=pagador']],B2:[['Tesorero','?perfil=tesorero'],['Contador','?perfil=contador']],B3:[['Banco Andino','?marca=andino'],['Pacífico Digital','?marca=pac']],B4:[['Variante A','?v=A'],['Variante B','?v=B'],['Caja','?v=B&vista=caja']],C1:[['Actual','?v=actual'],['Nuevo','?v=nuevo'],['Planilla 2','?v=nuevo&p=2']],C2:[['Mago de Oz','?motor=mago'],['Moderador (otra pestaña)','?motor=mago&panel=moderador'],['Automático','?motor=auto']],C3:[['Landing','?pagina=landing'],['Flujo','?pagina=flujo']],C4:[['Variante A','?v=A'],['Variante B','?v=B'],['Independiente','?perfil=ind&v=B']],D1:[['Comercio','?actor=comercio'],['Entidad financiera','?actor=ef']],D2:[['Banco','?ent=banco'],['Cooperativa','?ent=coop'],['Neobanco','?ent=neo']],D3:[],D4:[],D5:[['Canal ACH','?canal=ach'],['Canal cooperativa','?canal=coop'],['Con entidades','?pre=1']],E1:[],E2:[['Embudo','?a=embudo'],['Ciclo','?a=ciclo'],['Antecedentes','?a=antec']]};
const ENT={'2026-10-15':'jueves 15/10, 12 m','2026-10-19':'lunes 19/10'};
const entB=d=>`<span class="badge ${d.entrega==='2026-10-15'?'warn':''}">Entrega ${ENT[d.entrega]||'sin fecha'}</span>`;
const DIAS=[['Lunes','12/10/2026','festivo'],['Martes','13/10/2026',''],['Miércoles','14/10/2026',''],['Jueves','15/10/2026',''],['Viernes','16/10/2026',''],['Lunes','19/10/2026','']];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const total=d=>(d.n.ent||0)+(d.n.usa||0);

const CSS=`:root{--navy:#0D1B2A;--blue:#005FA3;--blue-d:#004A80;--blue-l:#A8C4D8;--bg:#F3F6F9;--line:#D5E0EA;--muted:#4A5A6A;--ok:#1E7A46;--warn:#7A4F00;--warn-bg:#FDF0D5}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--navy);font-family:'Source Sans 3',system-ui,sans-serif;font-size:16px;line-height:1.5}
h1,h2,h3{font-family:'Manrope',system-ui,sans-serif;margin:0;line-height:1.2}h1{font-size:28px}h2{font-size:22px;margin:34px 0 10px}h3{font-size:17px;margin:18px 0 6px}
header{background:var(--navy);color:#fff;padding:20px 20px 24px}.in{max-width:1100px;margin:0 auto}header a{color:#C9D7E3;font-weight:600;text-decoration:none;font-size:14px;margin-right:16px}header a:hover{color:#fff;text-decoration:underline}header p{margin:6px 0 0;color:#C9D7E3}
main{max-width:1100px;margin:0 auto;padding:8px 20px 80px}nav.toc{position:sticky;top:0;z-index:5;background:#fff;border-bottom:1px solid var(--line)}nav.toc .in{display:flex;gap:4px;flex-wrap:wrap;padding:4px 20px}nav.toc a{padding:10px 12px;font-weight:700;font-size:14px;color:var(--muted);text-decoration:none;border-radius:8px}nav.toc a:hover{background:#EDF2F6;color:var(--navy)}
.card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:16px 18px;margin:0 0 14px}.muted{color:var(--muted)}.small{font-size:14px}
table{border-collapse:collapse;width:100%}th,td{border-bottom:1px solid #EDF2F6;padding:9px 10px;text-align:left;vertical-align:top;font-size:15px}th{background:#F5F9FC;font-family:'Manrope',system-ui,sans-serif;font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.03em}
.tw{overflow-x:auto;border:1px solid var(--line);border-radius:12px;background:#fff}
.badge{display:inline-block;border-radius:999px;padding:2px 10px;font-size:13px;font-weight:700;background:#EAF2F8;color:var(--blue-d);white-space:nowrap}.badge.warn{background:var(--warn-bg);color:var(--warn)}.badge.ok{background:#E3F1E8;color:var(--ok)}
.btn,a.btn{display:inline-block;border:2px solid var(--blue);background:#fff;color:var(--blue);font-weight:700;border-radius:10px;padding:7px 14px;text-decoration:none;font-size:14px;cursor:pointer;font-family:inherit;margin:2px 6px 2px 0}.btn:hover{background:#EAF2F8}.btn.p{background:var(--blue);color:#fff}.btn.p:hover{background:var(--blue-d)}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:12px 0}.kpi{background:#fff;border:1px solid var(--line);border-radius:12px;padding:10px 14px}.kpi b{display:block;font-family:'Manrope',system-ui,sans-serif;font-size:24px}.kpi span{color:var(--muted);font-size:13px}
details{background:#fff;border:1px solid var(--line);border-radius:14px;margin:0 0 12px}summary{cursor:pointer;padding:14px 18px;font-weight:700;font-family:'Manrope',system-ui,sans-serif;font-size:18px;min-height:48px}details>.body{padding:0 18px 16px}
details.sub{border-radius:10px;margin:8px 0}details.sub summary{font-size:15px;padding:10px 14px}
ul.cl{list-style:none;margin:0;padding:0}ul.cl li{padding:5px 0}label.ck{display:flex;gap:10px;align-items:flex-start;cursor:pointer}label.ck input{width:20px;height:20px;margin-top:2px;accent-color:var(--blue);flex:none}label.ck input:checked+span{color:var(--muted);text-decoration:line-through}
input[type=text],input[type=number],select,textarea{font:inherit;border:1.5px solid #7D8E9F;border-radius:8px;padding:6px 8px;width:100%;background:#fff;min-height:38px}textarea{min-height:60px}
:focus-visible{outline:3px solid var(--blue-d);outline-offset:2px}.note{background:#FFFBEA;border:1px dashed #D9C36A;border-radius:10px;padding:10px 14px;font-size:14.5px}
.q{margin:0 0 6px}.q small{color:var(--muted)}.day{border-left:4px solid var(--blue);padding-left:14px;margin:0 0 18px}.day.fest{border-color:#B7791F}
.bar{height:10px;border-radius:5px;background:#E3EBF2;overflow:hidden;min-width:90px}.bar i{display:block;height:100%;background:var(--blue)}
@media print{nav.toc,header a,.btn,.noprint{display:none!important}details{border:0}details>summary{display:none}details:not([open])>.body{display:block}body{background:#fff}}`;

function links(p){
  const f=FILES[p.id];const v=VARS[p.id]||[];
  return `<a class="btn p" href="${f}" target="_blank" rel="noopener">Abrir ${p.id} ↗</a>`+v.map(x=>`<a class="btn" href="${f}${x[1]}" target="_blank" rel="noopener">${esc(x[0])}</a>`).join('');
}
function protoBlock(p,first){
  const pl=p.plan,sc=p.screener;
  return `<details${first?' open':''} id="p-${p.id}"><summary>${p.id} · ${esc(p.nombre)} <span class="badge" style="margin-left:8px">${esc(p.tipo)}</span></summary><div class="body">
  <div style="margin:4px 0 10px">${links(p)}</div>
  <p><b>Objetivo.</b> ${esc(pl.objetivo)}</p>
  <div class="kpis"><div class="kpi"><span>Formato de sesión</span><b style="font-size:15px;font-family:inherit">${esc(pl.formato)}</b></div><div class="kpi"><span>Participantes</span><b style="font-size:15px;font-family:inherit">${esc(pl.participantes)}</b></div></div>
  <p><b>Roles.</b> ${esc(pl.roles)}</p>
  <h3>Guion de la sesión</h3><ol>${pl.guion.map(g=>`<li>${esc(g)}</li>`).join('')}</ol>
  <h3>Tareas y criterio de éxito</h3><div class="tw"><table><thead><tr><th>#</th><th>Tarea (léela tal cual)</th><th>Éxito si…</th></tr></thead><tbody>${pl.tareas.map((t,i)=>`<tr><td>${i+1}</td><td>${esc(t.t)}</td><td>${esc(t.e)}</td></tr>`).join('')}</tbody></table></div>
  <h3>Qué se mide y cuándo se considera logrado</h3><div class="tw"><table><thead><tr><th>Métricas a registrar</th><th>Umbrales de decisión</th></tr></thead><tbody><tr><td><ul>${pl.metricas.map(m=>`<li>${esc(m)}</li>`).join('')}</ul></td><td><ul>${pl.umbrales.map(m=>`<li>${esc(m)}</li>`).join('')}</ul></td></tr></tbody></table></div>
  <p class="small muted"><b>Cómo se analiza:</b> ${esc(pl.analisis)}</p>
  <details class="sub"><summary>Screener y reclutamiento</summary><div class="body"><p class="small">${esc(sc.intro)}</p><ol>${sc.preguntas.map(q=>`<li class="q">${esc(q.q)}<br><small>${q.o.map(o=>esc(o[0])+' → '+esc(o[1])).join(' · ')}</small></li>`).join('')}</ol><p><b>Cuotas.</b> ${esc(sc.cuotas)}</p><p><b>Incentivo.</b> ${esc(sc.incentivo)}</p></div></details>
  <details class="sub"><summary>Lista de verificación antes de empezar</summary><div class="body"><ul class="cl">${['Abrí el prototipo con los parámetros correctos y probé las dos variantes','Hice el piloto del guion con una persona del pool','Confirmé el consentimiento y la grabación','Tengo el formato de registro abierto (sección Registro de sesiones)'].map((t,i)=>`<li><label class="ck"><input type="checkbox" data-k="pre-${p.id}-${i}"><span>${t}</span></label></li>`).join('')}</ul></div></details>
  </div></details>`;
}
function iniBlock(d){
  return `<details id="i-${d.id}"><summary>${esc(d.nombre)} <span class="badge" style="margin-left:8px">Nivel ${d.nivel}</span> <span class="badge ${d.urgencia==='Alta'?'warn':''}">Urgencia ${esc(d.urgencia.toLowerCase())}</span> ${entB(d)}</summary><div class="body">
   <p class="small muted">${esc(d.asignado)} · ${esc(d.tipo)} · ${esc(d.audiencia)}</p>
   <h3>Hipótesis</h3><ol>${d.hipotesis.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>
   <h3>A quién y cuántos</h3><ul>${d.usuarios.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p class="small"><b>Reclutamiento:</b> ${esc(d.reclutamiento)}</p><p class="small"><b>Muestra:</b> ${esc(d.n.otro)}</p>
   <h3>Criterios para decidir</h3><ul>${d.criterios.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
   <details class="sub"><summary>Guía de entrevista (${d.entrevista.length} preguntas)</summary><div class="body"><ol>${d.entrevista.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div></details>
   ${d.encuesta&&d.encuesta.length?`<details class="sub"><summary>Preguntas de la encuesta (${d.encuesta.length})</summary><div class="body"><ol>${d.encuesta.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div></details>`:''}
  </div></details>`;
}
function semana(k,items,protos){
  const tot=o=>items.reduce((a,d)=>a+(d.n[o]||0),0),ent=tot('ent'),usa=tot('usa'),maze=tot('maze'),ses=ent+usa;
  const mazeP=protos.filter(p=>items.some(d=>p.cubre.includes(d.id)&&d.n.maze));
  const encT=[...new Set(items.filter(d=>d.n.enc).map(d=>d.n.enc))].sort((a,b)=>b-a);
  const d=[
   [`Kick-off de 1 h a las 8:00 con todo el equipo.`,`Ajusta hipótesis y criterios de tus ${items.length} iniciativas (sección Iniciativas).`,ent?`Envía las invitaciones a entrevistas B2B antes de las 12 m (${ent} entrevistas por agendar según el plan).`:'',encT.length?`Publica o confirma con Research Ops la encuesta compartida (n≥${encT[0]}).`:'',`Prueba cada prototipo de la célula con sus parámetros (ya están construidos).`],
   [`Prototipos listos a las 3 p. m.: haz el piloto de cada guion con una persona del pool y ajusta.`,mazeP.length?`Publica en Maze: ${mazeP.map(p=>p.id).join(', ')} (meta total n=${maze}, con el filtro del screener).`:'',`Primeras sesiones y entrevistas. Registra cada una el mismo día.`],
   [`Trabajo de campo. Daily de 15 min de la célula.`,`Meta del día: llegar a ≥${Math.ceil(ses*0.5)} de ${ses} sesiones (≥50 %).`,`Notas en el formato común el mismo día (sección Registro de sesiones).`],
   [`Trabajo de campo. Meta: ${ses} de ${ses} sesiones (100 %).`,maze||encT.length?`Cierre de Maze y encuestas a las 6 p. m.`:'',`Revisa los umbrales de cada prototipo con lo que ya tienes.`],
   [`Síntesis de la célula en la mañana: veredicto y nivel de evidencia por iniciativa (sección Síntesis).`,`Actualiza el estado y el veredicto en el tablero.`,`Presentación a la VP a las 3 p. m. con un veredicto por iniciativa.`],
   [`Fecha límite de las demás iniciativas.`,...items.filter(x=>x.entrega==='2026-10-19').map(x=>`Entrega hoy: ${x.nombre}.`),items.some(x=>x.entrega==='2026-10-19')?'':'Esta célula no tiene iniciativas con entrega este día.']
  ];
  const lab=items.filter(x=>x.entrega==='2026-10-15');if(lab.length)d[3].unshift(...lab.map(x=>`Entrega hoy antes de las 12 m: ${x.nombre}.`));
  return `<section id="semana"><h2>Tu semana</h2><div class="kpis"><div class="kpi"><b>${ses}</b><span>sesiones (${ent} entrevistas + ${usa} pruebas moderadas)</span></div><div class="kpi"><b>${maze}</b><span>respuestas en Maze (meta total)</span></div><div class="kpi"><b>${encT.length?'n≥'+encT[0]:'—'}</b><span>encuesta compartida</span></div><div class="kpi"><b>${protos.length}</b><span>prototipos</span></div></div>
  <p class="small muted">Las cifras suman lo que pide el plan de cada iniciativa; algunas sesiones se comparten entre iniciativas, así que las personas reales pueden ser menos.</p>`+
  DIAS.map((x,i)=>`<div class="day${x[2]?' fest':''}"><h3 style="margin-top:0">${x[0]} ${x[1].slice(0,5)}${x[2]?' <span class="badge warn">festivo</span>':''}</h3><ul class="cl">${d[i].filter(Boolean).map((t,j)=>`<li><label class="ck"><input type="checkbox" data-k="dia-${i}-${j}"><span>${t}</span></label></li>`).join('')}</ul></div>`).join('')+`</section>`;
}
const JS=`(function(){var K='ach_paquete_'+document.body.dataset.cel+'_';
function g(k){try{return localStorage.getItem(K+k)}catch(e){return null}}function s(k,v){try{localStorage.setItem(K+k,v)}catch(e){}}
document.querySelectorAll('input[data-k]').forEach(function(i){var k=i.dataset.k,v=g(k);if(i.type==='checkbox')i.checked=v==='1';else if(v!=null)i.value=v;i.addEventListener('change',function(){s(k,i.type==='checkbox'?(i.checked?'1':'0'):i.value);if(i.dataset.up)up()});i.addEventListener('input',function(){if(i.type!=='checkbox')s(k,i.value);if(i.dataset.up)up()})});
document.querySelectorAll('select[data-k],textarea[data-k]').forEach(function(i){var k=i.dataset.k,v=g(k);if(v!=null)i.value=v;i.addEventListener('change',function(){s(k,i.value)});i.addEventListener('input',function(){s(k,i.value)})});
function up(){document.querySelectorAll('[data-prog]').forEach(function(r){var h=+g(r.dataset.prog+'-h')||0,m=+g(r.dataset.prog+'-m')||0;var b=r.querySelector('i');if(b)b.style.width=(m?Math.min(100,Math.round(h/m*100)):0)+'%';var t=r.querySelector('.pc');if(t)t.textContent=(m?Math.min(100,Math.round(h/m*100)):0)+' %'})}up();
var COLS=['fecha','participante','prototipo','variante','tareas','minutos','hallazgo','notas'];
var rows=[];try{rows=JSON.parse(g('reg')||'[]')}catch(e){}
var tb=document.getElementById('regb');
function sv(){s('reg',JSON.stringify(rows))}
function rd(){if(!tb)return;tb.innerHTML=rows.map(function(r,i){return '<tr>'+COLS.map(function(c){return '<td><input type="text" data-r="'+i+'" data-c="'+c+'" value="'+String(r[c]||'').replace(/"/g,'&quot;')+'" aria-label="'+c+' fila '+(i+1)+'"></td>'}).join('')+'<td><button class="btn" data-del="'+i+'" aria-label="Quitar fila '+(i+1)+'">×</button></td></tr>'}).join('');var n=document.getElementById('regn');if(n)n.textContent=rows.length}
if(tb){tb.addEventListener('input',function(e){var t=e.target;if(t.dataset.r!=null){rows[+t.dataset.r][t.dataset.c]=t.value;sv()}});tb.addEventListener('click',function(e){var d=e.target.dataset.del;if(d!=null){rows.splice(+d,1);sv();rd()}});
document.getElementById('regadd').onclick=function(){rows.push({fecha:''});sv();rd();var l=tb.querySelectorAll('tr');if(l.length)l[l.length-1].querySelector('input').focus()};
document.getElementById('regcsv').onclick=function(){var t=[COLS.join(',')].concat(rows.map(function(r){return COLS.map(function(c){var v=String(r[c]||'');return /[",\\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}).join(',')})).join('\\n');var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv;charset=utf-8'}));a.download='registro_celula_'+document.body.dataset.cel+'.csv';document.body.appendChild(a);a.click();a.remove()};rd()}
var ex=document.getElementById('sinexp');if(ex)ex.onclick=function(){var o=['# Síntesis · Célula '+document.body.dataset.cel.toUpperCase()+' (entregas 15 y 19/10/2026)',''];document.querySelectorAll('[data-sin]').forEach(function(b){var id=b.dataset.sin;o.push('## '+b.dataset.nombre,'- Veredicto: '+(g('ver-'+id)||'Pendiente'),'- Nivel de evidencia: '+(g('niv-'+id)||'—'),'- Evidencia: '+(g('evi-'+id)||'—'),'')});var t=o.join('\\n');if(navigator.clipboard)navigator.clipboard.writeText(t).then(function(){ex.textContent='Copiado'},function(){});var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/markdown;charset=utf-8'}));a.download='sintesis_celula_'+document.body.dataset.cel+'.md';document.body.appendChild(a);a.click();a.remove()};
})();`;

function registro(protos){
  return `<section id="registro"><h2>Registro de sesiones</h2><p class="muted">Una fila por sesión, el mismo día. Se guarda en este navegador; exporta el CSV al terminar el día y compártelo con tu líder. En el prototipo, <b>Shift+L</b> abre el log automático (Copiar CSV).</p>
  <div class="tw"><table style="min-width:960px"><thead><tr><th>Fecha</th><th>Participante (código)</th><th>Prototipo (${protos.map(p=>p.id).join(', ')})</th><th>Variante y orden</th><th>Tareas logradas</th><th>Min.</th><th>Hallazgo principal</th><th>Notas</th><th></th></tr></thead><tbody id="regb"></tbody></table></div>
  <div style="margin-top:10px"><button class="btn p" id="regadd">+ Agregar sesión</button><button class="btn" id="regcsv">Exportar CSV</button><span class="muted small"> <span id="regn">0</span> sesiones registradas</span></div></section>`;
}
function sintesis(items){
  return `<section id="sintesis"><h2>Síntesis y veredicto</h2><p class="muted">Un veredicto por iniciativa, con la evidencia que lo respalda. Luego actualízalo en el tablero.</p>`+items.map(d=>`<div class="card" data-sin="${d.id}" data-nombre="${esc(d.nombre)}"><h3 style="margin-top:0">${esc(d.nombre)}</h3><details class="sub"><summary>Criterios para decidir</summary><div class="body"><ul>${d.criterios.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></details>
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px"><div><label class="small muted">Veredicto<select data-k="ver-${d.id}"><option>Pendiente</option><option>Validada</option><option>Pivotar</option><option>Descartar</option><option>Necesita más evidencia</option></select></label></div><div><label class="small muted">Nuevo nivel de evidencia<select data-k="niv-${d.id}"><option value="">—</option>${[0,1,2,3,4,5].map(n=>`<option>${n}</option>`).join('')}</select></label></div></div>
   <label class="small muted">Evidencia que lo respalda (cifras frente a los umbrales)<textarea data-k="evi-${d.id}"></textarea></label></div>`).join('')+`<button class="btn p" id="sinexp">Copiar y descargar síntesis (.md)</button></section>`;
}
function page(k,title,body,sub){
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Célula ${k.toUpperCase()} · Paquete de campo</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet"><style>${CSS}</style></head><body data-cel="${k.toLowerCase()}">
<header><div class="in"><a href="index.html">← Índice de prototipos</a><a href="../Validación Temprana 2027.html">Tablero general</a><a href="#" onclick="window.print();return false">Imprimir</a><h1 style="margin-top:12px">Célula ${k} · ${esc(title)}</h1><p>${sub}</p></div></header>${body}<script>${JS}</script></body></html>`;
}
function toc(l){return `<nav class="toc" aria-label="Secciones"><div class="in">${l.map(x=>`<a href="#${x[0]}">${x[1]}</a>`).join('')}</div></nav>`;}

/* ---------- Células A–E ---------- */
function build(k){
  const c=CELULAS[k],items=DATA.filter(d=>d.celula===k),protos=PROTOS.filter(p=>p.celula===k);
  const people=c.p;
  const body=toc([['resumen','Resumen'],['semana','Semana'],['prototipos','Prototipos'],['iniciativas','Iniciativas'],['registro','Registro'],['sintesis','Síntesis']])+
   `<main><section id="resumen"><h2>Resumen</h2><div class="card"><p style="margin-top:0">${esc(c.nota)}</p><p class="small"><b>Equipo:</b> ${esc(c.p)} · <b>Líder:</b> ${esc(c.lider)} · <b>Apoyo:</b> P20 (Research Ops) para Maze, encuestas, consentimientos y agenda.</p><p class="small"><b>Sprint:</b> lunes 12 a viernes 16 de octubre de 2026. <b>Entregas:</b> las iniciativas del laboratorio el jueves 15/10 al mediodía; las demás hasta el lunes 19/10. Los ${protos.length} prototipos de la célula ya están construidos y se pueden abrir desde aquí.</p></div></section>`+
   semana(k,items,protos)+
   `<section id="prototipos"><h2>Prototipos y guiones</h2>${protos.map((p,i)=>protoBlock(p,i===0)).join('')}</section>`+
   `<section id="iniciativas"><h2>Iniciativas de la célula</h2>${items.map(iniBlock).join('')}</section>`+registro(protos)+sintesis(items)+`</main>`;
  return page(k,c.n,body,`${esc(c.p)} · líder ${esc(c.lider)} · entregas 15 (12 m) y 19 de octubre de 2026`);
}
/* ---------- Célula F: Research Ops ---------- */
function buildF(){
  const c=CELULAS.F;
  const fila=p=>{const ds=DATA.filter(d=>p.cubre.includes(d.id)),m=Math.max(0,...ds.map(d=>d.n.maze||0)),u=Math.max(0,...ds.map(d=>d.n.usa||0)),e=Math.max(0,...ds.map(d=>d.n.ent||0)),enc=Math.max(0,...ds.map(d=>d.n.enc||0));return {p,m,u,e,enc};};
  const rows=PROTOS.map(fila);
  const prog=(key,meta)=>`<div data-prog="${key}" style="display:flex;gap:8px;align-items:center"><input type="number" min="0" style="width:70px" data-k="${key}-h" data-up="1" aria-label="Hechas ${key}"> <span class="muted small">de</span> <input type="number" min="0" style="width:70px" data-k="${key}-m" data-up="1" value="${meta}" aria-label="Meta ${key}"><div class="bar" style="flex:1"><i style="width:0"></i></div><span class="pc small" style="min-width:40px">0 %</span></div>`;
  const mz=rows.filter(r=>r.m),enc=[['PSE (personas)','n≥200','A1, A2, A3, A4, A5 y D5'],['SOI (cotizantes)','n≥150','C1, C2, C3 y C4'],['Recarga de movilidad (intercepción)','n≥150','A5'],['Colombianos en el exterior','n≥150','C3']];
  const body=toc([['resumen','Resumen'],['semana','Semana'],['seguimiento','Seguimiento de campo'],['maze','Maze'],['encuestas','Encuestas'],['reclutamiento','Reclutamiento'],['checklist','Listas de verificación']])+
  `<main><section id="resumen"><h2>Resumen</h2><div class="card"><p style="margin-top:0">${esc(c.nota)}</p><p class="small"><b>Responsable:</b> P20. Esta célula no tiene iniciativas propias: asegura que las otras cinco tengan participantes, consentimientos, agenda y herramientas funcionando de lunes a viernes.</p><p class="small"><b>Apoyo directo:</b> C4 (datos de PILA 24/7), D5 (PFM) y A5 (encuesta de recarga), y la coordinación de Maze y encuestas compartidas de todas las células.</p></div></section>
  <section id="semana"><h2>Tu semana</h2>`+
  [['Lunes 12/10 <span class="badge warn">festivo</span>',['Kick-off de 1 h a las 8:00.','Publica las encuestas compartidas de PSE y SOI (ver Encuestas).','Confirma con cada célula las invitaciones B2B enviadas antes de las 12 m.','Verifica que los 20 prototipos abran con sus parámetros (índice de prototipos).','Habilita el consentimiento de grabación y los formatos comunes para las 5 células.']],['Martes 13/10',['Prototipos listos a las 3 p. m.: confirma el piloto de cada guion.','Publica todas las pruebas Maze con su screener y cuotas (ver Maze).','Confirma la agenda de moderadas y las salas de videollamada del miércoles y jueves.']],['Miércoles 14/10',['Daily de 15 min con cada célula (o con los 6 líderes).','Revisa el avance contra la meta del 50 % de sesiones.','Atiende reemplazos de participantes que no se presentan.']],['Jueves 15/10',['Meta: 100 % de sesiones.','Cierra Maze y encuestas a las 6 p. m. y exporta los datos.','Procesa incentivos de las sesiones moderadas.','Entrega de las iniciativas del laboratorio: apoya a las células con datos de Maze y encuestas.']],['Viernes 16/10',['Entrega a cada célula sus datos de Maze y encuestas por la mañana.','Apoya la síntesis y la presentación a la VP a las 3 p. m.']],['Lunes 19/10',['Fecha límite de las iniciativas que no son del laboratorio: entrega a cada célula los datos pendientes de Maze y encuestas.','Verifica que todas las iniciativas estén entregadas en el tablero.']]].map((d,i)=>`<div class="day${i===0?' fest':''}"><h3 style="margin-top:0">${d[0]}</h3><ul class="cl">${d[1].map((t,j)=>`<li><label class="ck"><input type="checkbox" data-k="dia-${i}-${j}"><span>${t}</span></label></li>`).join('')}</ul></div>`).join('')+`</section>
  <section id="seguimiento"><h2>Seguimiento de campo por prototipo</h2><p class="muted">Anota cuántas sesiones llevan y se calcula el avance. Las metas vienen del plan y puedes ajustarlas.</p><div class="tw"><table style="min-width:900px"><thead><tr><th>Prototipo</th><th>Célula</th><th>Pruebas moderadas</th><th>Entrevistas</th><th>Maze (n)</th></tr></thead><tbody>${rows.map(r=>`<tr><td><b>${r.p.id}</b> ${esc(r.p.nombre)}</td><td>${r.p.celula}</td><td>${r.u?prog('mod-'+r.p.id,r.u):'—'}</td><td>${r.e?prog('ent-'+r.p.id,r.e):'—'}</td><td>${r.m?prog('mz-'+r.p.id,r.m):'—'}</td></tr>`).join('')}</tbody></table></div><p class="small muted">Meta por prototipo = la mayor de sus iniciativas (algunas sesiones se comparten).</p></section>
  <section id="maze"><h2>Pruebas Maze (${mz.length} prototipos)</h2><div class="tw"><table><thead><tr><th>Prototipo</th><th>Meta n</th><th>Screener y cuotas</th><th>Enlaces</th></tr></thead><tbody>${mz.map(r=>`<tr><td><b>${r.p.id}</b> ${esc(r.p.nombre)}</td><td>${r.m}</td><td class="small">${esc(r.p.screener.cuotas.slice(0,260))}${r.p.screener.cuotas.length>260?'…':''}</td><td>${links(r.p)}</td></tr>`).join('')}</tbody></table></div><p class="small muted">En Maze se usa la prueba de sitio web en vivo con la URL publicada del prototipo (misma carpeta que este paquete).</p></section>
  <section id="encuestas"><h2>Encuestas compartidas</h2><div class="tw"><table><thead><tr><th>Encuesta</th><th>Meta</th><th>Prototipos que aportan preguntas</th><th>Avance</th></tr></thead><tbody>${enc.map((e,i)=>`<tr><td>${e[0]}</td><td>${e[1]}</td><td>${e[2]}</td><td>${prog('enc-'+i,+e[1].replace(/\D/g,''))}</td></tr>`).join('')}</tbody></table></div></section>
  <section id="reclutamiento"><h2>Reclutamiento e incentivos</h2><div class="tw"><table><thead><tr><th>Prototipo</th><th>Participantes</th><th>Incentivo</th></tr></thead><tbody>${PROTOS.map(p=>`<tr><td><b>${p.id}</b> ${esc(p.nombre)}</td><td class="small">${esc(p.plan.participantes)}</td><td class="small">${esc(p.screener.incentivo)}</td></tr>`).join('')}</tbody></table></div></section>
  <section id="checklist"><h2>Listas de verificación</h2><div class="card"><ul class="cl">${['Formato de consentimiento con grabación firmado por cada participante','Plantilla de registro de sesiones compartida con las cinco células','Agenda maestra de sesiones moderadas con enlaces de videollamada','Bolsa de reemplazos por segmento (mínimo 2 por cuota crítica)','Carpeta común para grabaciones, CSV de los prototipos (Shift+L) y datos de Maze','Proceso de pago de incentivos y registro de entregados','Datos internos de pagos PILA solicitados para C4','Revisión de que ningún prototipo envía datos a internet y que todo es ficticio'].map((t,i)=>`<li><label class="ck"><input type="checkbox" data-k="chk-${i}"><span>${t}</span></label></li>`).join('')}</ul></div></section></main>`;
  return page('F',c.n,body,`${esc(c.p)} · líder ${esc(c.lider)} · entregas 15 (12 m) y 19 de octubre de 2026`);
}

for(const k of ['A','B','C','D','E']){fs.writeFileSync(path.join(root,'protos','celula-'+k.toLowerCase()+'.html'),build(k));console.log('ok celula-'+k.toLowerCase());}
fs.writeFileSync(path.join(root,'protos','celula-f.html'),buildF());console.log('ok celula-f');
