/* E2 · Alerta de red antifraude — bandeja y detalle con grafo (SVG), datos sintéticos generados por código */
var esc=K.esc,money=K.money,I=K.I;
var ENTS=[['Banco Andino','#005FA3','A'],['Banco del Pacífico Digital','#1E8A7A','P'],['Cooperativa Valle Unido','#B7791F','C']];
var W=820,H=540;

function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function round1000(n){return Math.round(n/1000)*1000;}
function Graph(seed){
  var g={nodes:[],edges:[],r:rng(seed),used:{}};
  g.label=function(){var l;do{l=String(1000+Math.floor(g.r()*9000));}while(g.used[l]);g.used[l]=1;return l;};
  g.node=function(role,ent,x,y,label,flag){var n={id:g.nodes.length,role:role,ent:ent,x:Math.round(x),y:Math.round(y),label:label||g.label(),flag:!!flag};g.nodes.push(n);return n;};
  g.edge=function(a,b,amt,t){g.edges.push({a:a.id,b:b.id,amt:amt,t:t});};
  return g;
}
function pol(cx,cy,R,deg){var a=deg*Math.PI/180;return [cx+R*Math.cos(a),cy+R*Math.sin(a)];}
function sumAmt(es){return es.reduce(function(a,e){return a+e.amt;},0);}

/* --- Alerta 1: cuenta embudo --- */
function buildEmbudo(){
  var g=Graph(7731),r=g.r,hub=g.node('hub',1,500,270,'7731');
  var src=[],i,p;
  for(i=0;i<19;i++){p=pol(500,270,i%2?195:235,105+i*(150/18));src.push(g.node('src',Math.floor(r()*3),p[0],p[1]));}
  var ts=[];for(i=0;i<23;i++)ts.push(40+r()*5.8);ts.sort(function(a,b){return a-b;});
  var inb=[];
  for(i=0;i<23;i++){var s=i<19?src[i]:src[[0,3,7,11][i-19]];var amt=round1000(380000+r()*1800000);inb.push(amt);g.edge(s,hub,amt,+ts[i].toFixed(2));}
  var tin=inb.reduce(function(a,b){return a+b;},0),tout=Math.round(tin*0.94/1000)*1000;
  var parts=[0.52,0.31,0.17],ys=[170,270,370],ee=[0,2,1],tt=[46.3,46.9,47.6];
  for(i=0;i<3;i++){var d=g.node('dst',ee[i],770,ys[i],undefined);g.edge(hub,d,i<2?round1000(tout*parts[i]):tout-round1000(tout*parts[0])-round1000(tout*parts[1]),tt[i]);}
  var nz=[];for(i=0;i<6;i++)nz.push(g.node('noise',Math.floor(r()*3),50,60+i*84));
  for(i=0;i<5;i++)g.edge(nz[i],nz[i+1],round1000(30000+r()*70000),+(r()*70).toFixed(1));
  g.edge(nz[1],src[2],round1000(40000+r()*40000),12.5);g.edge(src[8],nz[4],round1000(40000+r()*40000),20.2);
  return g;
}
/* --- Alerta 2: ciclo de cuentas --- */
function buildCiclo(){
  var g=Graph(2290),r=g.r,ring=[],i,k,p;
  for(i=0;i<8;i++){p=pol(420,270,165,-90+i*45);ring.push(g.node('ring',[0,1,2,1,0,2,1,0][i],p[0],p[1],i===0?'2290':undefined));}
  var feed=[];for(i=0;i<4;i++)feed.push(g.node('src',Math.floor(r()*3),90,120+i*95));
  var exits=[];for(i=0;i<4;i++)exits.push(g.node('dst',Math.floor(r()*3),760,120+i*95));
  var amts=[1900000,1750000,1500000,1250000];
  for(i=0;i<4;i++)g.edge(feed[i],ring[0],amts[i],+(1+i*0.8).toFixed(1));
  var base=6400000,n=0;
  for(k=0;k<3;k++)for(i=0;i<8;i++){g.edge(ring[i],ring[(i+1)%8],round1000(base*Math.pow(0.985,n)),+(6+k*21+i*2.6).toFixed(1));n++;}
  g.edge(ring[4],exits[0],410000,70.1);g.edge(ring[4],exits[1],380000,70.8);g.edge(ring[5],exits[2],300000,71.4);g.edge(ring[2],exits[3],260000,71.8);
  return g;
}
/* --- Alerta 3: nodo con antecedentes en otra entidad --- */
function buildAntec(){
  var g=Graph(5518),r=g.r,c=g.node('hub',2,470,270,'5518',true),i,p,l1=[],l2=[];
  for(i=0;i<9;i++){p=pol(470,270,175,110+i*(140/8));l1.push(g.node('src',[0,1,0,2,1,0,1,2,0][i],p[0],p[1]));}
  var ts=[];for(i=0;i<9;i++)ts.push(50+r()*8);ts.sort(function(a,b){return a-b;});
  var tin=0;
  for(i=0;i<9;i++){var a=round1000(520000+r()*900000);tin+=a;g.edge(l1[i],c,a,+ts[i].toFixed(1));}
  for(i=0;i<6;i++){p=pol(470,270,265,125+i*(110/5));var nd=g.node('src2',Math.floor(r()*3),Math.min(Math.max(p[0],40),780),p[1]);l2.push(nd);g.edge(nd,l1[[0,2,3,5,6,8][i]],round1000(300000+r()*500000),+(28+r()*20).toFixed(1));}
  var tout=Math.round(tin*0.81/1000)*1000,sh=[0.34,0.26,0.2,0.12],ys=[150,225,300,375,450],tt=[58.5,59.7,61,62.4,63.6],o=[];
  var acc=0;
  for(i=0;i<5;i++){var d=g.node('dst',[1,0,2,1,0][i],760,ys[i]);var amt=i<4?round1000(tout*sh[i]):tout-acc;acc+=amt;g.edge(c,d,amt,tt[i]);}
  return g;
}
function stats(g){
  var hub=g.nodes.filter(function(n){return n.role==='hub';})[0];
  var inb=g.edges.filter(function(e){return hub&&e.b===hub.id;}),out=g.edges.filter(function(e){return hub&&e.a===hub.id;});
  return {hub:hub,inb:inb,out:out,tin:sumAmt(inb),tout:sumAmt(out),srcs:Object.keys(inb.reduce(function(o,e){o[e.a]=1;return o;},{})).length};
}
var CACHE={};
function G(k){if(!CACHE[k])CACHE[k]=({embudo:buildEmbudo,ciclo:buildCiclo,antec:buildAntec})[k]();return CACHE[k];}
function entCount(g,ids){var o={};ids.forEach(function(i){o[g.nodes[i].ent]=1;});return Object.keys(o).length;}

function meta(k){
  var g=G(k),s=stats(g),n=g.nodes.length;
  if(k==='embudo'){
    var ts=s.inb.map(function(e){return e.t;}),win=Math.max.apply(null,ts)-Math.min.apply(null,ts),lastIn=Math.max.apply(null,ts),lastOut=Math.max.apply(null,s.out.map(function(e){return e.t;}));
    return {k:k,titulo:'Cuenta embudo',patron:'Cuenta embudo',score:92,ents:'Banco del Pacífico Digital · Banco Andino · Cooperativa Valle Unido',monto:s.tin,n:n,
      texto:'La cuenta ••'+s.hub.label+' recibió '+s.inb.length+' transferencias de '+s.srcs+' cuentas distintas en '+Math.ceil(win)+' horas y retiró el '+Math.round(s.tout/s.tin*100)+' % en menos de '+Math.ceil(lastOut-lastIn)+' horas.',
      porque:'Muchas cuentas pequeñas envían dinero a una sola cuenta que lo reenvía casi todo de inmediato. Es un patrón típico de cuentas usadas para dispersar dinero de fraudes.'};
  }
  if(k==='ciclo'){
    var rt=g.edges.filter(function(e){return g.nodes[e.a].role==='ring'&&g.nodes[e.b].role==='ring';}),span=Math.max.apply(null,rt.map(function(e){return e.t;}))-Math.min.apply(null,rt.map(function(e){return e.t;}));
    var tot=sumAmt(rt),fed=sumAmt(g.edges.filter(function(e){return g.nodes[e.a].role==='src';}));
    return {k:k,titulo:'Ciclo de cuentas',patron:'Ciclo de cuentas',score:76,ents:'Banco Andino · Banco del Pacífico Digital · Cooperativa Valle Unido',monto:fed,n:n,
      texto:'Ocho cuentas hicieron circular los mismos '+money(fed)+' en 3 vueltas durante '+Math.round(span)+' horas (movimientos por '+money(tot)+' en total), sin que su saldo neto cambiara. Solo la cuenta ••2290 recibe dinero de fuera del grupo.',
      porque:'El dinero da vueltas entre las mismas cuentas sin un fin comercial visible. Puede servir para simular actividad o ocultar el origen de los fondos.'};
  }
  var inEnts=entCount(g,s.inb.map(function(e){return e.a;})),lastIn2=Math.max.apply(null,s.inb.map(function(e){return e.t;})),lastOut2=Math.max.apply(null,s.out.map(function(e){return e.t;}));
  return {k:k,titulo:'Nodo con antecedentes',patron:'Antecedentes en otra entidad',score:84,ents:'Cooperativa Valle Unido · Banco Andino · Banco del Pacífico Digital',monto:s.tin,n:n,
    texto:'La cuenta ••'+s.hub.label+', que Banco Andino reportó como cuenta mula hace 38 días, recibió '+money(s.tin)+' de '+s.inb.length+' cuentas de '+inEnts+' entidades y reenvió el '+Math.round(s.tout/s.tin*100)+' % en '+Math.ceil(lastOut2-lastIn2)+' horas.',
    porque:'La cuenta ya tenía un reporte de otra entidad y vuelve a mostrar el mismo comportamiento. Compartir esa señal entre entidades permite actuar antes.'};
}
var KEYS=['embudo','ciclo','antec'];

function fresh(p){return {k:p&&p.a?p.a:'embudo',T:72,play:false,st:{embudo:{estado:'Nueva',rate:0,motivo:''},ciclo:{estado:'Nueva',rate:0,motivo:''},antec:{estado:'Nueva',rate:0,motivo:''}},fp:''};}
function fmtN(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function bar(){return K.dhead({title:'Red antifraude ACH',mark:K.mark('R'),nav:[{label:'Bandeja de alertas',to:'g1',cur:K.cur==='g1'}],right:'<span class="ilus">Datos sintéticos</span>'});}

/* ---------- SVG del grafo ---------- */
function svg(k,T){
  var g=G(k),vis={},agg={},max=0;
  g.edges.forEach(function(e){if(e.t<=T){var id=e.a+'>'+e.b;agg[id]=agg[id]||{a:e.a,b:e.b,amt:0,n:0};agg[id].amt+=e.amt;agg[id].n++;vis[e.a]=1;vis[e.b]=1;}});
  Object.keys(agg).forEach(function(i){max=Math.max(max,agg[i].amt);});
  var h='<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="Grafo de transacciones de la alerta, hasta la hora '+T+'"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M0 0L10 5L0 10z" fill="#4A5A6A"/></marker></defs>';
  Object.keys(agg).forEach(function(i){
    var e=agg[i],a=g.nodes[e.a],b=g.nodes[e.b],dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)||1,ux=dx/d,uy=dy/d,rb=a.role==='hub'||b.role==='hub'?15:12;
    var x1=a.x+ux*(rb+2),y1=a.y+uy*(rb+2),x2=b.x-ux*(rb+9),y2=b.y-uy*(rb+9),w=1+4.5*e.amt/max;
    h+='<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="#4A5A6A" stroke-opacity=".55" stroke-width="'+w.toFixed(1)+'" marker-end="url(#ah)"><title>'+esc('••'+a.label+' → ••'+b.label+' · '+e.n+' transferencia'+(e.n>1?'s':'')+' · '+money(e.amt))+'</title></line>';
  });
  g.nodes.forEach(function(n){
    var on=vis[n.id],rr=n.role==='hub'?15:12,en=ENTS[n.ent];
    h+='<g opacity="'+(on?1:0.18)+'"><circle cx="'+n.x+'" cy="'+n.y+'" r="'+rr+'" fill="'+en[1]+'" stroke="'+(n.flag?'#B3261E':'#fff')+'" stroke-width="'+(n.flag?4:2)+'"/><text x="'+n.x+'" y="'+(n.y+4)+'" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">'+en[2]+'</text><text x="'+n.x+'" y="'+(n.y+rr+13)+'" text-anchor="middle" font-size="10.5" fill="#0D1B2A">••'+n.label+'</text><title>'+esc('Cuenta ••'+n.label+' · '+en[0]+(n.flag?' · con antecedentes reportados':''))+'</title></g>';
  });
  return h+'</svg>';
}
function graphInfo(k,T){
  var g=G(k),es=g.edges.filter(function(e){return e.t<=T;});
  return 'Hasta la hora <strong>'+(T%1?T.toFixed(1):T)+'</strong> de 72: '+es.length+' transferencias · '+money(sumAmt(es))+' movidos.';
}
function legend(k){
  var g=G(k),hasFlag=g.nodes.some(function(n){return n.flag;});
  return '<div class="small" style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;margin-top:8px"><strong>Leyenda:</strong>'+ENTS.map(function(e){return '<span><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:'+e[1]+';vertical-align:-2px"></span> '+e[2]+' · '+e[0]+'</span>';}).join('')+
    '<span>Grosor de la línea = monto</span><span>Flecha = dirección del dinero</span>'+(hasFlag?'<span><span style="display:inline-block;width:14px;height:14px;border-radius:50%;border:3px solid #B3261E;vertical-align:-3px"></span> Cuenta con antecedentes</span>':'')+'<span class="muted">Etiquetas enmascaradas: ••XXXX</span></div>';
}

/* ---------- Pantallas ---------- */
function g1(){
  var S=K.S;
  var rows=KEYS.map(function(k){var m=meta(k),s=S.st[k];
    return '<tr><td><span class="badge '+(m.score>=85?'err':'warn')+'" style="font-size:15px">'+m.score+'</span></td><td><strong>'+m.patron+'</strong><div class="small muted">'+m.n+' cuentas en el grafo</div></td><td>'+m.ents+'</td><td class="num">'+money(m.monto)+'</td><td><span class="badge '+(/Descartada/.test(s.estado)?'gray':s.estado==='Nueva'?'':'plum')+'">'+s.estado+'</span>'+(s.rate?'<div class="small muted">Utilidad: '+s.rate+'/5</div>':'')+'</td><td><button class="btn btn-primary sm" data-act="abrir" data-id="'+k+'">Revisar</button></td></tr>';}).join('');
  return {layout:'desk',bar:bar(),wrap:'wrapd',body:'<p class="eyebrow">Alertas de red · últimas 72 horas</p><h1>Bandeja de alertas</h1><p class="lead">Alertas generadas por el análisis de red de las transacciones que ya pasan por ACH. Todos los datos son sintéticos y las cuentas están enmascaradas.</p>'+
    '<div class="tscroll"><table class="dtable"><thead><tr><th>Puntaje de riesgo</th><th>Patrón</th><th>Entidades involucradas</th><th class="num">Monto expuesto</th><th>Estado</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
    '<div class="survey" style="margin-top:20px"><h3>Para el entrevistado</h3><label for="fp">¿Qué tasa de falsos positivos toleraría para este tipo de alertas? (de cada 100 alertas, cuántas pueden ser falsas)</label><input type="text" id="fp" inputmode="numeric" data-inp="fp" value="'+esc(S.fp)+'" style="max-width:220px" placeholder="Ej. 30"></div>'+K.notesBox()};
}
function g2(){
  var S=K.S,k=S.k,m=meta(k),s=S.st[k];
  var acts=[['revisar','Marcar para revisión'],['bloquear','Bloquear preventivamente'],['compartir','Compartir con la entidad de origen'],['descartar','Descartar como falso positivo']];
  var rate='<div class="chips" role="group" aria-label="Utilidad de la alerta de 1 a 5">'+[1,2,3,4,5].map(function(n){return '<button class="chip" data-act="rate" data-id="'+n+'" aria-pressed="'+(s.rate===n)+'" aria-label="'+n+' de 5">'+n+'</button>';}).join('')+'</div>';
  return {layout:'desk',bar:bar(),wrap:'wrapd',body:'<p><button class="link" data-act="nav" data-to="g1">← Volver a la bandeja</button></p><p class="eyebrow">Alerta · '+m.patron+'</p><div class="toolbar"><h1 style="margin:0">'+m.titulo+'</h1><span class="badge '+(m.score>=85?'err':'warn')+'" style="font-size:15px">Puntaje '+m.score+'</span><span class="badge '+(/Descartada/.test(s.estado)?'gray':s.estado==='Nueva'?'':'plum')+'">'+s.estado+'</span></div>'+
   '<div class="side"><div class="card"><div id="graph">'+svg(k,S.T)+'</div>'+legend(k)+
   '<div style="margin-top:12px"><label for="tl" style="margin:0 0 4px">Línea de tiempo: <strong id="tl-l">'+(S.T%1?S.T.toFixed(1):S.T)+'</strong> h de 72</label><div class="toolbar" style="margin:0"><button class="btn btn-secondary sm" data-act="play" aria-label="'+(S.play?'Pausar':'Reproducir')+'">'+(S.play?'Pausar':'Reproducir')+'</button><input type="range" id="tl" min="0" max="72" step="0.5" value="'+S.T+'" data-inp="tl" style="flex:1;min-width:200px"></div><p class="small muted" id="g-info" aria-live="polite" style="margin:4px 0 0">'+graphInfo(k,S.T)+'</p></div></div>'+
   '<div><div class="card"><h3 style="margin-top:0">Qué pasó</h3><p style="font-size:17px">'+m.texto+'</p><p class="muted">'+m.porque+'</p></div>'+
   '<div class="card"><h3 style="margin-top:0">Acciones sugeridas</h3><div style="display:grid;gap:8px">'+acts.map(function(a){return '<button class="btn '+(a[0]==='descartar'?'btn-secondary':'btn-primary')+' block" data-act="'+a[0]+'">'+a[1]+'</button>';}).join('')+'</div><p class="hint">El bloqueo preventivo depende de la política de su entidad. Las acciones son simuladas.</p></div>'+
   '<div class="survey" style="margin-top:0"><h3>¿Esta alerta fue útil?</h3>'+rate+'<label for="mot">Motivo</label><textarea id="mot" data-inp="mot" placeholder="Cuéntenos por qué">'+esc(s.motivo)+'</textarea></div></div></div>'};
}

function play(){
  var S=K.S;
  if(S.play){S.play=false;K.rerender();return;}
  if(S.T>=72)S.T=0;
  S.play=true;K.log('reproduce_linea_tiempo',{alerta:S.k});K.rerender();
  (function tick(){
    if(!S.play||K.cur!=='g2'){S.play=false;return;}
    S.T=Math.min(72,+(S.T+0.5).toFixed(1));
    K.html('graph',svg(S.k,S.T));K.setTxt('tl-l',String(S.T%1?S.T.toFixed(1):S.T));K.html('g-info',graphInfo(S.k,S.T));var sl=document.getElementById('tl');if(sl)sl.value=S.T;
    if(S.T>=72){S.play=false;K.rerender();return;}
    setTimeout(tick,110);
  })();
}
function setEstado(est,detalle){var S=K.S;S.st[S.k].estado=est;K.log('accion_alerta',Object.assign({alerta:S.k,accion:est},detalle||{}));K.closeSheet();K.rerender();}
function confirmSheet(titulo,texto,btn,fn){
  K.openSheet(K.sheetHead(titulo)+'<p>'+texto+'</p><button class="btn btn-primary" data-act="okSheet">'+btn+'</button>');
  confirmSheet.fn=fn;
}

K.run({
  id:'e2',title:'E2 · Alerta de red antifraude',layout:'desk',
  params:[{k:'a',label:'Alerta con que inicia',def:'',opts:[['','Bandeja de alertas'],['embudo','Cuenta embudo'],['ciclo','Ciclo de cuentas'],['antec','Nodo con antecedentes']]}],
  state:fresh,start:function(p){return p.a?'g2':'g1';},
  labels:{g1:'G1 Bandeja',g2:'G2 Detalle de la alerta'},groups:[['Pantallas',['g1','g2']]],
  routes:{g1:g1,g2:g2},
  acts:{
    abrir:function(el){var S=K.S;S.k=el.dataset.id;S.T=72;S.play=false;K.log('alerta_abierta',{alerta:S.k});K.go('g2');},
    play:play,
    revisar:function(){setEstado('En revisión');},
    bloquear:function(){confirmSheet('Bloqueo preventivo','Se aplicaría el bloqueo preventivo según la política de su entidad. En este prototipo no se bloquea nada.','Confirmar bloqueo simulado',function(){setEstado('Bloqueo preventivo (simulado)');});},
    compartir:function(){confirmSheet('Compartir con la entidad de origen','Se enviaría un resumen de la alerta a la entidad de origen de los fondos. En este prototipo no se envía nada.','Confirmar envío simulado',function(){setEstado('Compartida con la entidad de origen');});},
    descartar:function(){K.openSheet(K.sheetHead('Descartar como falso positivo')+'<label for="dm">Motivo</label><select id="dm"><option>Cliente legítimo conocido</option><option>Patrón normal de su negocio</option><option>Datos insuficientes</option><option>Otro motivo</option></select><button class="btn btn-primary" style="margin-top:14px" data-act="okDescartar">Descartar alerta</button>');},
    okDescartar:function(){var m=document.getElementById('dm').value;K.S.st[K.S.k].motivo=K.S.st[K.S.k].motivo||m;setEstado('Descartada (falso positivo)',{motivo:m});},
    okSheet:function(){if(confirmSheet.fn)confirmSheet.fn();},
    rate:function(el){var S=K.S;S.st[S.k].rate=+el.dataset.id;K.log('utilidad_alerta',{alerta:S.k,calificacion:+el.dataset.id});K.rerender();}
  },
  inps:{
    tl:function(el,ty){var S=K.S;S.play=false;S.T=+el.value;K.html('graph',svg(S.k,S.T));K.setTxt('tl-l',String(S.T%1?S.T.toFixed(1):S.T));K.html('g-info',graphInfo(S.k,S.T));if(ty==='change')K.log('linea_tiempo',{alerta:S.k,hora:S.T});},
    mot:function(el,ty){var S=K.S;S.st[S.k].motivo=el.value;if(ty==='change')K.log('motivo_utilidad',{alerta:S.k,texto:el.value.slice(0,200)});},
    fp:function(el,ty){K.S.fp=el.value;if(ty==='change')K.log('tasa_falsos_positivos',{valor:el.value});}
  }
});
