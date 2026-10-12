# Fuente de los prototipos

Los HTML de `../protos` (excepto A1, A2, A3 y C3, hechos a mano) se generan desde aquí.

- `kit.base.css` y `kit.ext.css`: estilos compartidos (identidad ACH, marco de teléfono, escritorio, componentes).
- `kit.js`: router por hash, registro de eventos (Shift+L), panel del moderador (M), reinicio (Shift+R), estados de carga y error.
- `src/<id>.js` (y `src/<id>.css` si existe): la lógica y las pantallas de cada prototipo.
- `build.js`: une todo en un solo HTML autocontenido por prototipo.

```
node build.js          # regenera los 16 prototipos
node build.js c4 d2    # regenera solo algunos
```

Para editar un prototipo, cambia su `src/<id>.js` y vuelve a ejecutar `node build.js <id>`.
No edites los HTML generados: se sobrescriben.
