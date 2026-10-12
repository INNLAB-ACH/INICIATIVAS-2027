/* Uso: node build.js [id ...]  -> genera ../protos/<archivo>.html a partir de src/<id>.js (+ src/<id>.css opcional) */
const fs=require('fs'),path=require('path');
const FILES={
 c5:['C5 · PSE Internacional','c5-pse-internacional.html'],
 a6:['A6 · Remesas internacionales','a6-remesas-internacionales.html'],
 b5:['B5 · Escrow (transferencia segura)','b5-escrow-transferencia-segura.html'],
 b6:['B6 · Venta presente QR/NFC','b6-venta-presente-qr-nfc.html'],
 a7:['A7 · Pago presente internacional','a7-pago-presente-internacional.html'],
 c4:['C4 · Pago PILA 24/7','c4-pago-pila-24-7.html'],
 d2:['D2 · Blueprint Hub Open Finance · Proveedor','d2-blueprint-hub-proveedor.html'],
 d3:['D3 · Portal de desarrolladores Hub · Receptor','d3-portal-desarrolladores-receptor.html'],
 d4:['D4 · Ficha de resultado de modelo analítico','d4-ficha-modelo-analitico.html'],
 e1:['E1 · Niveles de servicio antifraude','e1-niveles-servicio-antifraude.html'],
 e2:['E2 · Alerta de red antifraude','e2-alerta-red-antifraude.html'],
 b2:['B2 · Calendario tributario TESO','b2-calendario-tributario-teso.html'],
 c2:['C2 · Asistente PILA','c2-asistente-pila.html'],
 a4:['A4 · Seguridad del pago','a4-seguridad-del-pago.html'],
 a5:['A5 · Recarga nacional de movilidad','a5-recarga-nacional-movilidad.html'],
 d5:['D5 · PFM consolidado','d5-pfm-consolidado.html'],
 b1:['B1 · Request to Pay','b1-request-to-pay.html'],
 b4:['B4 · Facturación en un toque','b4-facturacion-en-un-toque.html'],
 c1:['C1 · Validador de planilla SOI','c1-validador-planilla-soi.html'],
 b3:['B3 · Demo TESO Marca Blanca + ERP','b3-demo-teso-marca-blanca-erp.html'],
 d1:['D1 · Portal de vinculación ACH','d1-portal-vinculacion-ach.html']
};
const r=f=>fs.readFileSync(path.join(__dirname,f),'utf8');
const ids=process.argv.length>2?process.argv.slice(2):Object.keys(FILES);
for(const id of ids){
  const [title,out]=FILES[id];
  const extra=fs.existsSync(path.join(__dirname,'src',id+'.css'))?r('src/'+id+'.css'):'';
  const html=`<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
<style>
${r('kit.base.css')}
${r('kit.ext.css')}
${extra}
</style>
</head>
<body>
<div id="root"></div>
<style>#idx-back{position:fixed;top:4px;left:4px;z-index:200;font:700 12px/1 "Source Sans 3",system-ui,sans-serif;color:#fff;background:rgba(13,27,42,.88);border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:6px 10px;text-decoration:none;min-height:24px;display:inline-flex;align-items:center}#idx-back:hover,#idx-back:focus-visible{background:#005FA3}</style><a id="idx-back" href="index.html" aria-label="Volver al índice de prototipos">&larr; Índice</a>
<div id="mod" class="panel" hidden></div>
<div id="logp" class="panel" hidden></div>
<script>
${r('kit.js')}
</script>
<script>
(function(){
'use strict';
${r('src/'+id+'.js')}
})();
</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(__dirname,'..','protos',out),html);
  console.log('ok',out,(html.length/1024).toFixed(0)+' KB');
}
