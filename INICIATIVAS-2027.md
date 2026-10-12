# Iniciativas 2027 · Validación temprana

Documento generado desde "Validación Temprana 2027.html". Total: 31 iniciativas en 6 células (A–F), 25 prototipos.

## Índice

| Célula | Nombre | Iniciativas |
|---|---|---|
| A | Checkout PSE · Personas | 11 |
| B | Cobros y recaudo empresarial | 7 |
| C | SOI y PILA | 6 |
| D | Entidades: datos y Open Finance | 5 |
| E | Seguridad del ecosistema | 2 |
| F | Research Ops | 0 |

---

# Célula A · Checkout PSE · Personas

- **Personas:** P01–P06
- **Líder:** P01
- **Nota:** Comparte un panel de personas, una encuesta PSE (n≥200) y sesiones moderadas combinadas de 60 minutos. Incluye la recarga de movilidad del laboratorio, con intercepción presencial en Cali y Bogotá.

## LAB: Escalamiento PSE como Canal de Financiamiento

- **ID:** f14
- **Equipo:** PSE
- **Descripción:** PSE como canal de otorgamiento es una nueva opción de pago dentro del flujo de PSE que conecta al usuario con un aliado de financiación en el momento del checkout​
Si el usuario no cuenta con los recursos, el aliado evalúa y aprueba un crédito en tiempo real, permitiendo completar la transacción de forma inmediata ​
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Sin estado
- **Priorización:** No priorizada
- **Tipo:** B2B2C
- **Asignado:** P01 + P02
- **Audiencia:** Personas que pagan con PSE compras de ticket medio-alto (aerolíneas, viajes, tecnología) y aliados financiadores
- **Urgencia:** Media
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Evolutivo:** Evolutivo
- **Apuesta:** Operativo
- **Segmento original:** Personas
- **Validación original:** Sí
- **Evidencia original:** Falta salida en vivo para validación
- **Comparable:** Tarjeta de Crédito en Lista de Bancos

**JTBD**

Cuando necesito pagar mis tiqutes aereos y quiero hacerlo a través de PSE pero no tengo los recursos disponibles en mi cuenta para pagar pueda sacar un crédito en línea

**Mercado**

El mercado colombiano de BNPL proyecta $4.830 millones para 2029 (CAGR 18–25%)​
Competencia desembolsa $35mm USD / mes​

**Competencia**

Addi​: Financiación BNPL integrada al checkout. Actualmente en 40 mil comercios
Sistecredito:  ​
Creditop​: Crédito digital inmediato; múltiples entidades financieras disponibles​

**Correcciones a la fuente**

- Marcada «Sí», pero su evidencia dice «Falta salida en vivo». Nivel 1 con bandera «listo para piloto».

### Plan de validación

**Hipótesis**

- Al menos 15 % de quienes abandonan un pago PSE por fondos insuficientes elegiría un crédito en el mismo flujo.
- Los usuarios confían en un crédito ofrecido dentro de PSE más que en uno de un tercero desconocido.
- Los aliados financiadores aceptan el modelo de comisión de ACH.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Prototipo del checkout con opción de crédito + datos del LAB
- **Alcance:** Selección de medio de pago, opción «Financiar con…», aprobación en línea y confirmación. Se revisa la data del LAB si existe.


**Tamaño de muestra**

- **Entrevistas:** 3
- **Pruebas de usabilidad moderadas:** 8
- **Maze:** 60
- **Encuestas:** 200
- **Detalle:** 8 pruebas moderadas, 60 en Maze, encuesta n≥200 y 3 entrevistas con aliados (Addi, Creditop o similares). Se diseña el piloto en vivo para la semana siguiente.


**Usuarios a incluir**

- Personas de 22 a 45 años que compraron tiquetes o tecnología en línea en los últimos 6 meses
- Gerentes de alianzas de 3 financiadores

**Reclutamiento**

Panel Maze; comercios aliados del LAB.

**Criterios de validación**

- ≥30 % de la encuesta elegiría el crédito ante fondos insuficientes.
- Tasa de éxito en Maze ≥75 %.
- ≥2 aliados aceptan las condiciones del piloto.

**Guion de entrevista**

1. Cuénteme la última compra grande que hizo en línea. ¿Cómo la pagó?
2. ¿Alguna vez no pudo pagar por falta de fondos? ¿Qué hizo?
3. [Prototipo] ¿Qué entiende de esta opción? ¿A quién le estaría pidiendo el crédito?
4. ¿Qué información necesita ver antes de aceptar (tasa, cuotas, costo total)?
5. ¿Qué le haría desconfiar?
6. Aliados: ¿Qué volumen esperarían y qué comisión aceptarían?

**Encuesta**

- ¿Ha abandonado una compra en línea por fondos insuficientes en los últimos 6 meses? · Sí / No
- ¿Ha usado BNPL (Addi, Sistecredito u otro)? · Opción múltiple
- Probabilidad de usar crédito dentro de PSE · Escala 1-5
- Factor más importante · Ranking (tasa, rapidez, marca, cuotas)
- Monto de compra en el que lo usaría · Rango

**Investigación secundaria — datos**

- Addi reportó 2,7 millones de clientes activos y 33.000 comercios en 2025 [S5].
- El archivo de priorización proyecta un mercado BNPL de USD 4.830 millones en 2029.

**Investigación secundaria — por confirmar**

- Tasa de rechazo de PSE por fondos insuficientes (dato interno).
- Regulación de BNPL vigente en Colombia.

**Prototipos que lo cubren**

- **A1 · Checkout PSE 2027** (Navegable; responsable P01 + P02) — Mobile-first (390×844) dentro de un marco de teléfono centrado en escritorio. Variantes: ?v=A = flujo actual (selección de tipo de persona, lista larga de bancos, redirección al banco, OTP). ?v=B = flujo nuevo. Con la tecla M se abre un selector oculto para el moderador que cambia de variante y de módulo (Base / Instrumentos / Financiamiento).

## LAB: Recarga de TuLlave / Cívica / MIO desde PSE

- **ID:** f18
- **Equipo:** LAB
- **Nombre original:** LAB: Iniciativa 3 2027
- **Descripción:** Crear una experiencia nacional desde PSE / Portal de Usuarios que permita centralizar la recarga de diferentes sistemas de transporte público de Colombia desde un único lugar. Construir un agregador nacional de recargas de movilidad, evitando que el usuario tenga que conocer el canal particular de cada ciudad.
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Sin estado
- **Priorización:** No priorizada
- **Tipo:** B2C
- **Asignado:** P05 + P06
- **Audiencia:** Usuarios de transporte público en Bogotá, Medellín y Cali, en especial quienes usan más de un sistema; empresas que entregan auxilio de transporte; sistemas de recaudo
- **Urgencia:** Media
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 2 · Secundaria
- **Evolutivo:** Nueva
- **Apuesta:** Operativo
- **Segmento original:** Personas; Sistemas de recaudo de movilidad
- **Validación original:** No
- **Evidencia original:** Falta salida en vivo para validación

**JTBD**

• Fragmentación entre ciudades y aplicaciones.
• Los usuarios tienen que conocer el mecanismo de recarga de cada sistema.

**Mercado**

TransMilenio registra hasta 4 millones de viajes diarios. Solo por Nequi se realizaban más de 1,2 millones de recargas mensuales de TuLlave a finales de 2025 (ficha del laboratorio).

**Competencia**

TuLlave ya permite PSE. Canales actuales: MAAS, Nequi, TransMiApp, TuyaPay / Smart One, DaviPlata, App Cívica, Bancolombia, Bre-B vía WhatsApp para Cívica.

**Correcciones a la fuente**

- Reemplaza el placeholder «LAB: Iniciativa 3 2027» con la ficha del laboratorio.
- La ficha aporta investigación secundaria: nivel 2. El placeholder decía «Falta salida en vivo»: confirmar si hubo un piloto previo.
- La ficha advierte que recargar TuLlave con PSE ya existe: la validación se centra en agregación nacional, recarga automática y recarga empresarial.

### Ficha del laboratorio: LAB: Recarga de TuLlave / Cívica / MIO desde PSE

- **Segmento:** Personas; Sistemas de recaudo de movilidad
- **Apuesta:** Operativo
- **Evolutivo:** Nueva
- **Objetivo:** 40 % del marketshare de mover dinero

**Descripción**

Crear una experiencia nacional desde PSE / Portal de Usuarios que permita centralizar la recarga de diferentes sistemas de transporte público de Colombia desde un único lugar. Construir un agregador nacional de recargas de movilidad, evitando que el usuario tenga que conocer el canal particular de cada ciudad.

**JTBD**

• Fragmentación entre ciudades y aplicaciones.
• Los usuarios tienen que conocer el mecanismo de recarga de cada sistema.

**Casos de uso**

- Recargar TuLlave desde el Portal PSE.
- Recargar Cívica.
- Recargar MIO.

**Normativa**

- Ley 105 de 1993: marco general del transporte.
- Ley 336 de 1996: Estatuto Nacional de Transporte.
- Decreto 1079 de 2015: Decreto Único Reglamentario del Sector Transporte.

**Mercado**

TransMilenio registra hasta 4 millones de viajes diarios. Solo por Nequi se realizaban más de 1,2 millones de recargas mensuales de TuLlave a finales de 2025 (ficha del laboratorio).

**Competencia**

TuLlave ya permite PSE. Canales actuales: MAAS, Nequi, TransMiApp, TuyaPay / Smart One, DaviPlata, App Cívica, Bancolombia, Bre-B vía WhatsApp para Cívica.

**Implicaciones**

- No tiene sentido vender «recargar TuLlave con PSE» como iniciativa nueva, porque ya existe.
- El verdadero espacio es la agregación nacional, mejor experiencia, automatización o recarga invisible.
- Resolver la activación física de saldo en sistemas que todavía la requieren.
- Integraciones diferentes por ciudad.

**Monetización**

- Comisión por recarga.
- Fee de integración con sistemas de transporte.
- Recargas empresariales masivas.

### Plan de validación

**Hipótesis**

- Hay un segmento relevante que usa 2 o más sistemas de transporte o recarga tarjetas de otras personas (familia, empleados).
- La recarga automática al bajar el saldo es más valiosa para el usuario que la agregación de ciudades.
- Las empresas que entregan auxilio de transporte pagarían por recargar masivamente las tarjetas de sus empleados.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Recarga nacional de movilidad en el Portal PSE
- **Alcance:** Registro de tarjetas de varios sistemas, recarga, recarga automática con tope, aviso de activación del saldo y vista empresa para recarga masiva por archivo.


**Tamaño de muestra**

- **Entrevistas:** 4
- **Pruebas de usabilidad moderadas:** 8
- **Maze:** 0
- **Encuestas:** 150
- **Detalle:** Encuesta por intercepción en estaciones de Cali y Bogotá (n≥150), 8 pruebas moderadas presenciales con el prototipo y 4 entrevistas: 2 empresas con auxilio de transporte y 2 sistemas u operadores de recaudo.


**Usuarios a incluir**

- Usuarios frecuentes de MIO, TransMilenio o Metro de Medellín
- Personas que recargan tarjetas de otros
- Responsables de nómina o bienestar en 2 empresas
- 2 operadores de recaudo de movilidad

**Reclutamiento**

Intercepción en estaciones (Cali, cerca de Icesi, y Bogotá); empresas cliente de PSE; contactos institucionales con sistemas de recaudo.

**Criterios de validación**

- ≥25 % de los encuestados usa 2 o más sistemas o recarga tarjetas de otros.
- ≥50 % activaría la recarga automática.
- ≥1 empresa y ≥1 sistema de recaudo con interés en piloto.

**Guion de entrevista**

1. ¿Cómo recargó su tarjeta la última vez? ¿Dónde y cuánto se demoró?
2. ¿Usa transporte público en otra ciudad o recarga tarjetas de alguien más?
3. ¿Alguna vez se quedó sin saldo en la estación? ¿Qué hizo?
4. [Prototipo] Active la recarga automática de su tarjeta. ¿Qué le preocupa?
5. ¿Entiende cuándo queda disponible el saldo y si tiene que validarlo en un punto físico?
6. Empresas: ¿Cómo entregan hoy el auxilio de transporte? ¿Les serviría recargar las tarjetas directamente?
7. Sistemas de recaudo: ¿Qué requisitos técnicos y comerciales tiene integrar un nuevo canal de recarga?

**Encuesta**

- Sistema que usa · MIO / TransMilenio-SITP / Metro de Medellín / Otro
- Canal de recarga actual · Taquilla / Punto físico / App (Nequi, DaviPlata, otra) / PSE
- ¿Usa más de un sistema o recarga tarjetas de otros? · Sí / No
- ¿Activaría recarga automática? · Escala 1-5
- ¿Se ha quedado sin saldo en el último mes? · Sí / No

**Investigación secundaria — datos**

_Sin información_

**Investigación secundaria — por confirmar**

- Mecanismos de activación de saldo por ciudad (validación en estación o en línea).
- Comisiones actuales por recarga en canales digitales.
- Movilidad entre ciudades: cuántos usuarios usan más de un sistema.

**Prototipos que lo cubren**

- **A5 · Recarga nacional de movilidad** (Navegable; responsable P05 + P06) — Mobile-first (390×844) para el usuario y escritorio (1280 px) para la vista empresa; selector superior entre las dos. Variantes: ?vista=persona o ?vista=empresa. En persona, ?v=A muestra primero «Recargar ahora» y ?v=B muestra primero «Recarga automática».

## PU: Zona Segura

- **ID:** f19
- **Número:** PSE
- **Equipo:** NS
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Ideación y priorización
- **Tipo:** B2C
- **Asignado:** P05 + P06
- **Audiencia:** Personas que pagan con PSE y han vivido o temen un fraude
- **Urgencia:** Media
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Complejidad (texto):** Alta
- **Evolutivo:** Evolutivo
- **Apuesta:** Sostenibilidad
- **Segmento original:** Personas
- **Validación original:** No
- **Evidencia original:** Falta validación con usuario, pero validado con áreas de prevención fraude
- **Pendiente:** Definición de la fecha de acuerdo a las olas de PSE, y si existen dependencias que no permitan iniciar independientemente al portal. Adicional validar si debe quedar como apuesta estratégica en Seguridad
- **Comparable:** Módulo de parametrización con conexión a PSE

**JTBD**

Cuando voy a realizar pagos digitales y quiero proteger mi dinero de posibles fraudes, quiero definir mis propias reglas de seguridad sobre montos, dispositivos, geolozalizaciónes, etc, autorizadas para tener mayor control sobre mis transacciones sin sacrificar la facilidad y rapidez del pago.

**Correcciones a la fuente**

- Dice «No» validada, pero declara validación con las áreas de prevención de fraude. Se asigna nivel 1 (validación interna).

### Plan de validación

**Hipótesis**

- Las personas configurarían al menos una regla (monto máximo o dispositivo) si toma menos de 2 minutos.
- Las reglas propias aumentan la confianza sin reducir la frecuencia de pago.
- Las personas esperan configurar estas reglas en su banco, no en PSE: hay que validar dónde vive la función.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Prototipo navegable
- **Alcance:** Configurar monto máximo por transacción, dispositivos de confianza y horario; ver un pago bloqueado por regla y cómo desbloquearlo.


**Tamaño de muestra**

- **Entrevistas:** 0
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 50
- **Encuestas:** 200
- **Detalle:** 6 pruebas moderadas (sesión compartida con Autenticación), 50 en Maze, preguntas en la encuesta PSE compartida (n≥200).


**Usuarios a incluir**

- Usuarios PSE frecuentes (≥2 pagos al mes)
- Al menos 2 personas que hayan sufrido un fraude

**Reclutamiento**

Panel Maze; encuesta compartida de la célula Checkout PSE.

**Criterios de validación**

- ≥4 de 6 configuran una regla sin ayuda.
- ≥50 % de la encuesta activaría al menos una regla.
- Claridad sobre si debe vivir en PSE o en el banco.

**Guion de entrevista**

1. ¿Qué hace hoy para protegerse de fraudes al pagar en línea?
2. ¿Le ha pasado algo? ¿Cómo se enteró y qué hizo?
3. [Prototipo] Configure un límite para sus pagos PSE. ¿Fue claro?
4. Su pago fue bloqueado por su regla: ¿qué espera que pase ahora?
5. ¿Dónde esperaría encontrar esta configuración: en PSE o en su banco?

**Encuesta**

- ¿Ha sido víctima de fraude en pagos en línea? · Sí / No / Prefiero no decir
- Reglas que activaría · Opción múltiple (monto, dispositivo, horario, comercio)
- Preferencia de ubicación · PSE / Mi banco / Ambos

**Investigación secundaria — datos**

- El 97,7 % de los colombianos considera el fraude un problema frecuente y el 36,6 % dice haber sido víctima en el último año (DataCrédito, 2025) [S3].

**Investigación secundaria — por confirmar**

- Funciones de control de seguridad que ya ofrecen las apps bancarias en Colombia.

**Prototipos que lo cubren**

- **A4 · Seguridad del pago** (Navegable; responsable P05 + P06) — Mobile-first (390×844) dentro de un marco de teléfono. Variantes: ?v=A = autenticación actual (redirección + usuario/clave + OTP por SMS). ?v=B = autenticación reutilizable con biometría o llave de acceso (passkey). Módulo Zona Segura accesible desde el menú. Tecla M para el moderador.

## PSE Autenticación

- **ID:** f20
- **Equipo:** PSE
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** B2C
- **Asignado:** P05 + P06
- **Audiencia:** Personas que pagan con PSE; EF como emisoras de la autenticación
- **Urgencia:** Media
- **Riesgo principal:** Factibilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Complejidad (texto):** Alta
- **Evolutivo:** Evolutivo
- **Apuesta:** Sostenibilidad
- **Segmento original:** Personas
- **Validación original:** Sí
- **Evidencia original:** Alineación con EquipoSoluciones Transversales
- **Comparable:** BToC

**JTBD**

• Cuando voy a realizar una transacción de pago o gestionar una instrucción financiera,  quiero autenticar mi identidad de forma rápida y segura,
 para asegurar que solo yo pueda autorizar movimientos sobre mis cuentas y proteger mis recursos de accesos no autorizados.
• Cuando necesito realizar un pago o acceder a servicios del ecosistema financiero,  quiero autenticarme mediante un proceso simple, omnicanal y reutilizable entre diferentes comercios o entidades,  para completar mis transacciones de manera rápida sin repetir validaciones innecesarias.

**Correcciones a la fuente**

- La evidencia es alineación interna con Soluciones Transversales: nivel 1.

### Plan de validación

**Hipótesis**

- Una autenticación reutilizable (biometría o passkey) reduce el abandono en la autenticación del banco.
- Las personas confían en autenticarse una vez para varios comercios.
- Las EF aceptan delegar parte de la autenticación en un estándar común.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Prototipo comparativo A/B
- **Alcance:** Flujo actual (redirección al banco + OTP) frente a flujo con biometría o passkey reutilizable.


**Tamaño de muestra**

- **Entrevistas:** 3
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 60
- **Encuestas:** 200
- **Detalle:** 6 pruebas moderadas (sesión compartida con Zona Segura), prueba A/B de preferencia en Maze n≥60, encuesta compartida y 3 entrevistas con EF.


**Usuarios a incluir**

- Usuarios PSE de diferentes bancos
- Responsables de seguridad digital de 3 EF

**Reclutamiento**

Panel Maze; EF participantes.

**Criterios de validación**

- ≥65 % prefiere la variante reutilizable en Maze.
- El tiempo de tarea baja ≥30 % en la variante.
- ≥2 EF ven viable el estándar común.

**Guion de entrevista**

1. ¿Qué tan seguido abandona un pago en el paso de su banco? ¿Por qué?
2. ¿Qué método de autenticación prefiere hoy: clave, OTP, huella, rostro?
3. [A/B] ¿Cuál de los dos flujos le da más confianza? ¿Por qué?
4. ¿Le preocupa autenticarse una sola vez para varios comercios?
5. EF: ¿Qué requisitos tendría su área de seguridad para aceptar este modelo?

**Encuesta**

- Paso donde más abandona un pago · Opción única
- Método preferido · Opción única
- Confianza en autenticación reutilizable · Escala 1-5

**Investigación secundaria — datos**

- PSE registró más de 90 millones de operaciones en julio de 2026, su récord histórico [S2].

**Investigación secundaria — por confirmar**

- Tasa de abandono en el paso de autenticación (dato interno PSE).
- Adopción de passkeys en banca colombiana.

**Prototipos que lo cubren**

- **A4 · Seguridad del pago** (Navegable; responsable P05 + P06) — Mobile-first (390×844) dentro de un marco de teléfono. Variantes: ?v=A = autenticación actual (redirección + usuario/clave + OTP por SMS). ?v=B = autenticación reutilizable con biometría o llave de acceso (passkey). Módulo Zona Segura accesible desde el menú. Tecla M para el moderador.

## Tokenización (Concentimiento y/o Autorización)

- **ID:** f21
- **Equipo:** PSE
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** B2C
- **Asignado:** P03 + P04
- **Audiencia:** Personas con pagos repetitivos en el mismo comercio; comercios con clientes recurrentes
- **Urgencia:** Media
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Complejidad (texto):** Alta
- **Evolutivo:** Evolutivo
- **Apuesta:** Sostenibilidad
- **Segmento original:** Personas
- **Validación original:** No
- **Evidencia original:** Alineación con EquipoSoluciones Transversales
- **Comparable:** PSE Avanza

**JTBD**

Cuando he autorizado previamente un pago en PSE y necesito hacer transacciones similares, quiero que el sistema reconozca mi token y me permita pagar sin re-autorizar cada vez, para que la experiencia sea rápida y no deba repetir el proceso de consentimiento innecesariamente.

**Correcciones a la fuente**

- Dice «No» validada, pero declara alineación con Soluciones Transversales. Se asigna nivel 1.

### Plan de validación

**Hipótesis**

- Las personas que pagan en el mismo comercio 2 o más veces al mes aceptan guardar su autorización.
- La revocación visible y simple es condición para aceptar el token.
- Los comercios con recurrencia ven aumento de conversión con pago tokenizado.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Prototipo navegable
- **Alcance:** Primer pago con opción «Recordar autorización», segundo pago en un toque y pantalla de gestión y revocación.


**Tamaño de muestra**

- **Entrevistas:** 3
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 50
- **Encuestas:** 200
- **Detalle:** 6 pruebas moderadas (sesión compartida con Flujo de Iniciación), 50 en Maze, encuesta compartida y 3 entrevistas con comercios.


**Usuarios a incluir**

- Personas que pagan servicios o comercios recurrentes con PSE
- Gerentes de ecommerce de 3 comercios con recurrencia

**Reclutamiento**

Panel Maze; comercios PSE.

**Criterios de validación**

- ≥60 % activa «Recordar autorización» en Maze.
- ≥5 de 6 encuentran cómo revocar.
- ≥2 comercios estiman mejora de conversión.

**Guion de entrevista**

1. ¿En qué comercios paga varias veces al mes con PSE?
2. ¿Qué le molesta de repetir el proceso?
3. [Prototipo] ¿Activaría recordar la autorización? ¿Qué le preocupa?
4. ¿Cómo la cancelaría si quisiera?
5. Comercios: ¿Cuántos clientes abandonan en pagos repetidos?

**Encuesta**

- Pagos recurrentes al mes con PSE · Rango
- Disposición a guardar la autorización · Escala 1-5
- Condiciones para aceptarlo · Opción múltiple

**Investigación secundaria — datos**

- Bre-B ya promedia cerca de 10 millones de transacciones diarias con llaves [S1], lo que eleva la expectativa de pagos sin fricción.

**Investigación secundaria — por confirmar**

- Modelos de token de cuenta en UPI AutoPay y Pix Automático.

**Prototipos que lo cubren**

- **A2 · Pago desde la app del comercio** (Navegable; responsable P03 + P04) — Mobile-first (390×844) dentro de un marco de teléfono. Variantes: ?v=A = el pago redirige al banco (flujo actual). ?v=B = pago iniciado dentro de la app del comercio con autorización y token. Tecla M para el selector del moderador.

## Flujo de Pagos (Evolución UX flujo actual)

- **ID:** f22
- **Equipo:** PSE
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** B2C
- **Asignado:** P01 + P02
- **Audiencia:** Usuarios PSE de todas las edades y bancos
- **Urgencia:** Alta
- **Riesgo principal:** Usabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Complejidad (texto):** Alta
- **Evolutivo:** Evolutivo
- **Apuesta:** Sostenibilidad
- **Segmento original:** Personas
- **Validación original:** Sí
- **Comparable:** PSE Avanza

**JTBD**

• Cuando necesito realizar un pago digital de un producto, servicio o obligación financiera,  quiero contar con un flujo de pago moderno, intuitivo y con el menor número posible de pasos,  para completar mi transacción rápidamente y sin dificultades que me hagan abandonar el proceso.
• Cuando estoy realizando una compra o pago digital,
 quiero disponer de diferentes alternativas de pago dentro de un flujo integrado y consistente,  para seleccionar la opción que mejor se adapte a mis necesidades y completar la transacción con confianza.

**Correcciones a la fuente**

- Marcada como validada sin tipo declarado.

### Plan de validación

**Hipótesis**

- Reducir pasos del flujo actual reduce el abandono de forma medible.
- El mayor punto de fricción está en la selección de banco y en la redirección.
- Los usuarios valoran ver todas las alternativas de pago en un solo flujo.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Prototipo del nuevo flujo vs. flujo actual
- **Alcance:** Flujo completo de pago de una compra de ejemplo. Base para Diversificación, Financiamiento y Tokenización.


**Tamaño de muestra**

- **Entrevistas:** 0
- **Pruebas de usabilidad moderadas:** 8
- **Maze:** 80
- **Encuestas:** 200
- **Detalle:** 8 pruebas moderadas, 80 en Maze (40 por variante) y encuesta PSE compartida n≥200. Es la prueba principal de la célula.


**Usuarios a incluir**

- Usuarios PSE frecuentes y ocasionales
- Al menos 2 mayores de 55 años
- Al menos 2 usuarios de bancos pequeños o cooperativas

**Reclutamiento**

Panel Maze; intercepción en Cali o Bogotá (opcional).

**Criterios de validación**

- La variante nueva reduce el tiempo de tarea ≥25 %.
- Tasa de éxito ≥85 %.
- SUS ≥75.

**Guion de entrevista**

1. Cuénteme su último pago con PSE. ¿Qué fue lo más molesto?
2. ¿Alguna vez abandonó un pago PSE? ¿En qué paso?
3. [Prototipo] Pague esta compra. Piense en voz alta.
4. Compare con lo que usa hoy. ¿Qué cambió para usted?
5. ¿Qué le daría más confianza en este flujo?

**Encuesta**

- Frecuencia de uso de PSE · Opción única
- Paso más molesto · Opción única
- Satisfacción con PSE · Escala 1-5
- ¿Ha abandonado un pago en los últimos 3 meses? · Sí / No
- Medio que usa cuando no usa PSE · Opción múltiple

**Investigación secundaria — datos**

- PSE superó los 90 millones de operaciones en julio de 2026 y ACH anunció renovación tecnológica y de experiencia para 2027 [S2].

**Investigación secundaria — por confirmar**

- Embudo de conversión y abandono por paso (dato interno PSE).

**Prototipos que lo cubren**

- **A1 · Checkout PSE 2027** (Navegable; responsable P01 + P02) — Mobile-first (390×844) dentro de un marco de teléfono centrado en escritorio. Variantes: ?v=A = flujo actual (selección de tipo de persona, lista larga de bancos, redirección al banco, OTP). ?v=B = flujo nuevo. Con la tecla M se abre un selector oculto para el moderador que cambia de variante y de módulo (Base / Instrumentos / Financiamiento).

## Flujo de Iniciación (No Regulado)

- **ID:** f23
- **Equipo:** PSE
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** B2B2C
- **Asignado:** P03 + P04
- **Audiencia:** Comercios y apps que quieren iniciar el pago dentro de su canal, y personas pagadoras
- **Urgencia:** Media
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Complejidad (texto):** Alta
- **Evolutivo:** Evolutivo
- **Apuesta:** Sostenibilidad
- **Segmento original:** Personas
- **Validación original:** Sí

**JTBD**

•  Cuando estoy realizando una compra o gestionando un servicio digital,
 quiero iniciar un pago directamente desde el canal o aplicación que estoy utilizando,  para completar mi transacción sin cambiar de plataforma ni realizar pasos adicionales innecesarios.
•  Cuando voy a autorizar un pago iniciado por un comercio o tercero,
 quiero visualizar claramente los datos de la transacción antes de confirmar la operación, para asegurarme de que el monto, destinatario y condiciones sean correctos antes de que se procese el pago.

**Correcciones a la fuente**

- Marcada como validada sin tipo declarado.

### Plan de validación

**Hipótesis**

- Los comercios con app propia prefieren iniciar el pago sin redirigir al usuario fuera de su canal.
- Las personas confían en el pago si ven el resumen claro de monto, destinatario y condiciones antes de confirmar.
- El modelo no regulado es aceptable para las EF mientras exista la regulación de iniciación.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Prototipo navegable dentro de una app de comercio ficticia
- **Alcance:** Pago iniciado desde la app, resumen de confirmación y autorización.


**Tamaño de muestra**

- **Entrevistas:** 4
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 50
- **Encuestas:** 200
- **Detalle:** 6 pruebas moderadas (sesión compartida con Tokenización), 50 en Maze, encuesta compartida y 4 entrevistas con comercios.


**Usuarios a incluir**

- Personas que compran en apps
- Líderes de producto de 4 comercios con app

**Reclutamiento**

Panel Maze; comercios PSE grandes.

**Criterios de validación**

- ≥5 de 6 identifican correctamente monto y destinatario antes de confirmar.
- ≥3 de 4 comercios lo priorizan para 2027.

**Guion de entrevista**

1. Comercios: ¿Cuánto abandono ven al redirigir al usuario fuera de la app?
2. Comercios: ¿Qué tendría que pasar para integrarlo?
3. Personas: [Prototipo] ¿Qué está autorizando en esta pantalla?
4. Personas: ¿Le da más o menos confianza pagar sin salir de la app?

**Encuesta**

- Preferencia: pagar dentro de la app o en el banco · Opción única
- Confianza en pagar sin salir de la app · Escala 1-5

**Investigación secundaria — datos**

- El Decreto 0368 de 2026 crea el marco de finanzas abiertas obligatorias; la iniciación regulada dependerá de los estándares de la SFC [S4].

**Investigación secundaria — por confirmar**

- Regulación específica de iniciación de pagos en Colombia.

**Prototipos que lo cubren**

- **A2 · Pago desde la app del comercio** (Navegable; responsable P03 + P04) — Mobile-first (390×844) dentro de un marco de teléfono. Variantes: ?v=A = el pago redirige al banco (flujo actual). ?v=B = pago iniciado dentro de la app del comercio con autorización y token. Tecla M para el selector del moderador.

## Funcionalidades PSE Pagos ( Pago de Facturas automatico - Split Payments )

- **ID:** f24
- **Equipo:** PSE
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** B2C
- **Asignado:** P03 + P04
- **Audiencia:** Personas que pagan facturas recurrentes y grupos que dividen gastos
- **Urgencia:** Media
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Complejidad (texto):** Alta
- **Evolutivo:** Nueva
- **Apuesta:** Operativo
- **Segmento original:** Personas
- **Validación original:** Sí
- **Comparable:** Pagos desde dos fuentes diferentes (Divisón de pagos y planillas electrónicas SOI)

**JTBD**

• Quiero automatizar y controlar el procesamiento de mis pagos de forma centralizada para optimizar mi flujo de caja, reducir riesgos operacionales, minimizar gastos administrativos y garantizar el cumplimiento de compromisos financieros sin intervención manual constante.

**Mercado**

• Los pagos entre personas y gastos compartidos son un comportamiento masivo en comercio digital y presencial.
• La simplicidad para cobrar grupos incrementa conversión en eventos, viajes y compras colaborativas.

**Competencia**

• Transferencias P2P manuales (Nequi, Daviplata)
• Recaudo por links individuales en pasarelas
• Apps de gastos compartidos sin ejecución de pago integrada

**Correcciones a la fuente**

- Marcada como validada sin tipo declarado.
- Inconsistencia: el JTBD es empresarial (pagos centralizados), el mercado habla de pagos entre personas y el segmento dice «Personas». Se divide en 2 hipótesis independientes: pago automático de facturas y pagos divididos.

### Plan de validación

**Hipótesis**

- Pago automático: las personas activarían el pago automático de al menos 1 factura si pueden aprobar cada cobro antes.
- Pagos divididos: los grupos que dividen gastos prefieren cobrar desde PSE en vez de transferencias P2P sueltas.
- Una de las dos funciones tiene claramente más demanda que la otra.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Dos prototipos ligeros
- **Alcance:** (a) Programar pago automático de una factura. (b) Dividir una compra entre 4 personas y cobrar.


**Tamaño de muestra**

- **Entrevistas:** 0
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 60
- **Encuestas:** 200
- **Detalle:** 6 pruebas moderadas (3 por función), 60 en Maze (30 por función) y preguntas en la encuesta PSE compartida.


**Usuarios a incluir**

- Personas con 3 o más facturas recurrentes
- Personas que organizan gastos compartidos (viajes, arriendos, eventos)

**Reclutamiento**

Panel Maze.

**Criterios de validación**

- Una función supera a la otra por ≥20 puntos en intención de uso.
- Éxito ≥75 % en la función ganadora.

**Guion de entrevista**

1. ¿Cómo paga hoy sus facturas fijas? ¿Se le ha pasado alguna?
2. ¿Cómo dividió el último gasto con amigos o familia? ¿Qué falló?
3. [Prototipo] ¿Usaría esto? ¿Qué le preocupa?
4. Si solo pudiéramos lanzar una de las dos, ¿cuál le sirve más?

**Encuesta**

- Facturas recurrentes que paga al mes · Rango
- ¿Activaría pago automático? · Escala 1-5
- ¿Con qué frecuencia divide gastos? · Opción única
- ¿Usaría pagos divididos en PSE? · Escala 1-5

**Investigación secundaria — datos**

- Competencia en pagos divididos: transferencias P2P (Nequi, Daviplata), links individuales y apps de gastos compartidos sin pago integrado (archivo de priorización).

**Investigación secundaria — por confirmar**

- Adopción de débito automático en servicios públicos (dato de recaudadores).

**Prototipos que lo cubren**

- **A3 · Pagos programados y divididos** (Navegable; responsable P03 + P04) — Mobile-first (390×844) dentro de un marco de teléfono. Variantes: Dos módulos independientes desde un menú de inicio: (a) Pago automático de facturas y (b) Pagos divididos. Parámetro ?m=a o ?m=b para abrir uno directamente.

## Diversificación instrumentos de pago (TDC - BNPL - PSE Credito)

- **ID:** f25
- **Equipo:** PSE
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** B2B2C
- **Asignado:** P01 + P02
- **Audiencia:** Personas que pagan en línea y comercios que aceptan PSE; emisores de crédito
- **Urgencia:** Media
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Complejidad (texto):** Alta
- **Evolutivo:** Nueva
- **Apuesta:** Operativo
- **Segmento original:** Personas
- **Validación original:** Sí
- **Comparable:** Tarjeta de Crédito en Lista de Bancos

**JTBD**

• Cuando necesito realizar un pago digital de un producto, servicio o obligación financiera,  quiero contar con un flujo de pago moderno, intuitivo y con el menor número posible de pasos,  para completar mi transacción rápidamente y sin dificultades que me hagan abandonar el proceso.
• Cuando estoy realizando una compra o pago digital,
 quiero disponer de diferentes alternativas de pago dentro de un flujo integrado y consistente,  para seleccionar la opción que mejor se adapte a mis necesidades y completar la transacción con confianza.

**Correcciones a la fuente**

- Marcada como validada sin tipo declarado.
- El JTBD es idéntico al de «Flujo de Pagos»: se debe escribir un JTBD propio sobre elegir instrumento.

### Plan de validación

**Hipótesis**

- Ofrecer tarjeta de crédito, BNPL y crédito PSE dentro del flujo aumenta la conversión de compras de ticket alto.
- Los comercios prefieren un solo botón con varios instrumentos frente a integrar cada uno por separado.
- Los usuarios entienden la diferencia entre los instrumentos en el momento de pago.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Variante del prototipo de Flujo de Pagos
- **Alcance:** Pantalla de selección de instrumento con 4 opciones y comparación de costo.


**Tamaño de muestra**

- **Entrevistas:** 4
- **Pruebas de usabilidad moderadas:** 4
- **Maze:** 40
- **Encuestas:** 200
- **Detalle:** 4 pruebas moderadas (dentro de la sesión de Flujo de Pagos), 40 en Maze, encuesta compartida y 4 entrevistas con comercios.


**Usuarios a incluir**

- Personas que compran en línea
- Gerentes de ecommerce de 4 comercios

**Reclutamiento**

Panel Maze; comercios PSE.

**Criterios de validación**

- ≥70 % elige correctamente el instrumento según un escenario dado.
- ≥3 de 4 comercios priorizan el botón unificado.

**Guion de entrevista**

1. Comercios: ¿Qué medios de pago aceptan hoy y cuántos integradores manejan?
2. Comercios: ¿Qué ganarían con un solo botón?
3. Personas: [Prototipo] Tiene $300.000 y la compra cuesta $900.000. ¿Qué elige y por qué?
4. Personas: ¿Qué información le falta para decidir?

**Encuesta**

- Medios de pago que usa en línea · Opción múltiple
- Interés en ver crédito dentro de PSE · Escala 1-5
- Factor de elección · Ranking

**Investigación secundaria — datos**

- Addi suma 33.000 comercios aliados y 2,7 millones de clientes [S5].

**Investigación secundaria — por confirmar**

- Participación de medios de pago en ecommerce colombiano (CCCE).

**Prototipos que lo cubren**

- **A1 · Checkout PSE 2027** (Navegable; responsable P01 + P02) — Mobile-first (390×844) dentro de un marco de teléfono centrado en escritorio. Variantes: ?v=A = flujo actual (selección de tipo de persona, lista larga de bancos, redirección al banco, OTP). ?v=B = flujo nuevo. Con la tecla M se abre un selector oculto para el moderador que cambia de variante y de módulo (Base / Instrumentos / Financiamiento).

## LAB: Remesas Internacionales

- **ID:** f49
- **Equipo:** LAB
- **Nombre original:** LAB: Remesas Internacionales
- **Descripción:** Servicio de envío y recepción de remesas internacionales que permite que los colombianos en el exterior o turistas realicen transacciones desde sus aplicaciones bancarias locales usando infraestructuras de pago en tiempo real (ej. PIX) conectadas a la red ACH, sin ningún tipo de fricción.
- **Entrega:** jueves 15 de octubre de 2026, 12 m
- **Estado:** Ideación y priorización
- **Priorización:** Priorizada
- **Tipo:** B2C
- **Asignado:** Por asignar
- **Audiencia:** Colombianos y extranjeros residentes en el exterior que envían dinero a Colombia, beneficiarios en Colombia y entidades de la Zona Bre-B
- **Urgencia:** Media
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Evolutivo:** Nueva
- **Segmento original:** Entidades participantes (Bre-B); Personas (colombianos y extranjeros residentes en el exterior)
- **Validación original:** No
- **Iniciativa nueva (del laboratorio)**

**JTBD**

• El colombiano en el exterior paga comisiones en operadores tradicionales para enviar dinero a su familia.
• El beneficiario en Colombia muchas veces debe ir a un punto físico a retirar el dinero en efectivo.
• No existe hoy un canal directo cuenta-a-cuenta entre sistemas de pago en tiempo real de distintos países para el corredor latinoamericano.

**Mercado**

4,7 millones de colombianos viven en el exterior (2024).
2.800.000 colombianos residentes en Estados Unidos.
500.000 colombianos residentes en España.
100.000 colombianos residentes en México.

**Competencia**

Canales de pago desde el exterior (Western Union, tarjeta de crédito) y operadores PILA autorizados en Colombia (Aportes en Línea, Mi Planilla, Enlace Operativo, Simple, Asopagos).

**Correcciones a la fuente**

- Iniciativa del laboratorio priorizada: no está en el archivo de priorización.
- Nivel 1 por tratarse de una ficha interna del laboratorio, sin evidencia externa declarada.
- Plan de validación (hipótesis, muestra, criterios y guion) propuesto como borrador a partir de la ficha del laboratorio; ajustar en el taller de definición.
- La competencia de la ficha original lista operadores PILA, que no corresponden a remesas; falta mapear competidores de remesas (Remitly, Wise, Western Union).

### Ficha del laboratorio: LAB: Remesas Internacionales

- **Segmento:** Entidades participantes (Bre-B); Personas (colombianos y extranjeros residentes en el exterior)
- **Evolutivo:** Nueva
- **Objetivo:** 40 % del marketshare de mover dinero

**Descripción**

Servicio de envío y recepción de remesas internacionales que permite que los colombianos en el exterior o turistas realicen transacciones desde sus aplicaciones bancarias locales usando infraestructuras de pago en tiempo real (ej. PIX) conectadas a la red ACH, sin ningún tipo de fricción.

**JTBD**

• El colombiano en el exterior paga comisiones en operadores tradicionales para enviar dinero a su familia.
• El beneficiario en Colombia muchas veces debe ir a un punto físico a retirar el dinero en efectivo.
• No existe hoy un canal directo cuenta-a-cuenta entre sistemas de pago en tiempo real de distintos países para el corredor latinoamericano.

**Tipos de clientes**

- Entidades Participantes (Bre-B): entidades financieras, billeteras, fintechs, depósitos de bajo monto
- Personas: Colombianos y extranjeros residentes en el exterior

**Casos de uso**

- Envío de dinero de persona a persona entre países con sistemas de pago en tiempo real interconectados: Brasil, Argentina y Paraguay.

**Normativa**

- Resolución Externa 1 de 2018 del Banco de la República: régimen cambiario de transferencias y giros internacionales hacia y desde Colombia.
- Circular Reglamentaria DODM-144 del Banco de la República: operaciones de cambio y transferencias internacionales, incluyendo obligaciones de los intermediarios.

**Mercado**

4,7 millones de colombianos viven en el exterior (2024).
2.800.000 colombianos residentes en Estados Unidos.
500.000 colombianos residentes en España.
100.000 colombianos residentes en México.

**Competencia**

Canales de pago desde el exterior (Western Union, tarjeta de crédito) y operadores PILA autorizados en Colombia (Aportes en Línea, Mi Planilla, Enlace Operativo, Simple, Asopagos).

**Implicaciones**

- Definir el aliado transfronterizo y los países/corredores priorizados para el piloto.
- Validar la viabilidad regulatoria y cambiaria para operaciones cuenta a cuenta entre países.
- Confirmar qué entidades financieras estarían dispuestas a participar en el esquema.
- Diseñar un modelo competitivo frente a rieles tradicionales en costo, velocidad y experiencia.

**Monetización**

- Modelo dual de comisión de transacción más spread cambiario, replicando el estándar de Remitly (~40 % fees, ~60 % spread cambiario).
- Remitly aplica un spread cambiario de entre 0,4 % y 2,5 % dependiendo del corredor y la velocidad de transferencia.
- Venta cruzada de productos financieros (cuenta, ahorro) para aumentar el ingreso por usuario migrante, como el modelo Remitly Circle.

### Plan de validación

**Hipótesis**

- Los remitentes pagan hoy comisiones y spreads altos y aceptarían un canal cuenta a cuenta más barato.
- El beneficiario prefiere recibir directo en su cuenta en lugar de retirar en efectivo.
- Hay al menos una entidad aliada en un corredor (Brasil, Argentina o Paraguay) dispuesta a un piloto.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Navegable (A6)
- **Alcance:** Prototipo navegable de envío y recepción: remitente en Brasil por PIX, cotización con y sin comparación frente a operador tradicional, y vista del beneficiario.


**Tamaño de muestra**

- **Entrevistas:** 8
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 0
- **Encuestas:** 100
- **Detalle:** 8 entrevistas: 4 remitentes en el exterior, 2 beneficiarios en Colombia y 2 entidades financieras o billeteras. Encuesta a remitentes (n≥100). Más 6 pruebas moderadas del prototipo A6.


**Usuarios a incluir**

- Colombianos y extranjeros residentes en el exterior que envían dinero a Colombia
- Beneficiarios de remesas en Colombia
- Entidades financieras, billeteras y fintech de la Zona Bre-B

**Reclutamiento**

Comunidades de migrantes y consulados; beneficiarios por referencia de los remitentes; contactos comerciales de ACH con entidades.

**Criterios de validación**

- ≥60 % de los remitentes reporta que el costo o el retiro en efectivo es un problema (≥4/5).
- ≥3 de 4 remitentes cambiarían de operador si el costo total baja y llega a cuenta.
- ≥1 entidad aliada acepta explorar un piloto en un corredor.

**Guion de entrevista**

1. ¿Cómo envía hoy dinero a su familia? ¿Con qué frecuencia y por qué monto?
2. ¿Cuánto paga en total (comisión más tasa de cambio)? ¿Cómo lo sabe?
3. Cuénteme el último envío: ¿cuánto tardó y cómo lo recibió su familia?
4. ¿Qué tendría que ofrecer un servicio nuevo para que deje de usar su operador actual?
5. Beneficiarios: ¿cómo retira el dinero hoy? ¿Qué le incomoda?
6. Entidades: ¿qué necesitarían para participar en un corredor?

**Encuesta**

- País de residencia · Opción única
- Frecuencia y monto promedio de envío · Opción única
- Operador que usa hoy · Opción múltiple
- Califique de 1 a 5 el costo de su operador actual · Escala 1-5
- Interés en enviar desde su app bancaria local · Escala 1-5

**Investigación secundaria — datos**

- 4,7 millones de colombianos viven en el exterior (2024): 2,8 millones en EE. UU., 500.000 en España y 100.000 en México.
- Remitly aplica un spread cambiario de entre 0,4 % y 2,5 % según corredor y velocidad (ficha del laboratorio).

**Investigación secundaria — por confirmar**

- Volumen anual de remesas a Colombia por corredor.
- Costo promedio de enviar a Colombia con operadores tradicionales.
- Estado de la interconexión PIX con Bre-B.

**Prototipos que lo cubren**

- **A6 · Remesas internacionales** (Navegable; responsable Por asignar) — Celular (390×844). Variantes: ?v=A = cotización con comparación frente a un operador tradicional. ?v=B = solo lo que recibe el destinatario y el desglose. ?vista=remitente | beneficiario. Tecla M para el moderador.

## LAB: Pago presente internacional

- **ID:** f52
- **Equipo:** LAB
- **Nombre original:** LAB: Pago presente internacional
- **Descripción:** Conectar infraestructuras de pago en tiempo real (ej. Pix) para que los colombianos en el exterior o turistas paguen desde sus aplicaciones bancarias locales (Bre-B) sin ningún tipo de fricción de forma presencial por medio de QR.
- **Entrega:** jueves 15 de octubre de 2026, 12 m
- **Estado:** Ideación y priorización
- **Priorización:** Priorizada
- **Tipo:** B2C
- **Asignado:** Por asignar
- **Audiencia:** Colombianos residentes en el exterior o turistas que pagan en comercios de Colombia con su app bancaria local, y comercios que los reciben
- **Urgencia:** Media
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Evolutivo:** Nueva
- **Segmento original:** Empresas; Entidades participantes (Zona Bre-B); Personas (colombianos residentes en el exterior)
- **Validación original:** No
- **Iniciativa nueva (del laboratorio)**

**JTBD**

• Necesito pagar en e-commerces colombianos desde el exterior sin tarjetas de crédito que manejan altas comisiones.
• Necesito microtransacciones invisibles (pagos agénticos) mientras juego.

**Mercado**

550.000 colombianos residentes en Brasil, Argentina y Paraguay.

**Competencia**

Redes de tarjeta (Visa/MC), Swift y fintechs (Prometeo, Sensedia).

**Correcciones a la fuente**

- Iniciativa del laboratorio priorizada: no está en el archivo de priorización.
- Nivel 1 por tratarse de una ficha interna del laboratorio, sin evidencia externa declarada.
- Plan de validación (hipótesis, muestra, criterios y guion) propuesto como borrador a partir de la ficha del laboratorio; ajustar en el taller de definición.
- El título habla de pago presencial, pero los trabajos y casos de uso de la ficha son de e-commerce y microtransacciones; confirmar el caso a validar.

### Ficha del laboratorio: LAB: Pago presente internacional

- **Segmento:** Empresas; Entidades participantes (Zona Bre-B); Personas (colombianos residentes en el exterior)
- **Evolutivo:** Nueva
- **Objetivo:** 40 % del marketshare de mover dinero

**Descripción**

Conectar infraestructuras de pago en tiempo real (ej. Pix) para que los colombianos en el exterior o turistas paguen desde sus aplicaciones bancarias locales (Bre-B) sin ningún tipo de fricción de forma presencial por medio de QR.

**JTBD**

• Necesito pagar en e-commerces colombianos desde el exterior sin tarjetas de crédito que manejan altas comisiones.
• Necesito microtransacciones invisibles (pagos agénticos) mientras juego.

**Tipos de clientes**

- Empresas: e-commerce, telcos, retail, suscripciones
- Entidades Participantes (Zona Bre-B): entidades financieras, billeteras, Sedpes, fintech, depósitos de bajo monto
- Personas (Colombianos residentes en el exterior)

**Casos de uso**

- Pagos de colombianos residentes en Brasil, Argentina y Paraguay que requieren pagar por e-commerce.

**Normativa**

- Marco regulatorio PIX del Banco Central de Brasil (BCB): requisitos técnicos, de participación y de interoperabilidad para pagos en tiempo real en Brasil.
- Resolución Externa 1 de 2018 del Banco de la República: régimen cambiario aplicable a pagos internacionales originados por personas en el exterior hacia comercios colombianos.
- Regulación de la DIAN sobre facturación electrónica en operaciones de e-commerce con no residentes.

**Mercado**

550.000 colombianos residentes en Brasil, Argentina y Paraguay.

**Competencia**

Redes de tarjeta (Visa/MC), Swift y fintechs (Prometeo, Sensedia).

**Implicaciones**

- Transformar PSE de un modelo bilateral a uno interoperable bajo Open Finance.
- Resolver la ruta técnica y regulatoria de implementación.
- Evaluar el impacto financiero por posible caída del ingreso transaccional.

**Monetización**

- Comisión por transacción, similar al modelo de interchange en pagos iniciados por terceros (PIS) bajo Open Banking/Open Finance.
- Spread cambiario aplicado a la conversión de moneda en el pago transfronterizo, modelo estándar de Wise y Remitly.
- Tarifa de acceso cobrada a las entidades participantes (Zona Bre-B) por conectarse al riel crossborder.

### Plan de validación

**Hipótesis**

- Los colombianos en Brasil, Argentina y Paraguay prefieren pagar con su app bancaria local en lugar de tarjeta de crédito internacional.
- Los comercios colombianos aceptarían el canal si no aumenta su costo ni su complejidad de conciliación.
- Al menos una entidad de la Zona Bre-B está dispuesta a conectarse al riel crossborder.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Navegable (A7)
- **Alcance:** Prototipo navegable de pago con la app de un banco de Brasil: QR presencial y checkout de e-commerce, con dos formas de mostrar el cambio.


**Tamaño de muestra**

- **Entrevistas:** 8
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 0
- **Encuestas:** 80
- **Detalle:** 8 entrevistas: 4 colombianos en Brasil, Argentina o Paraguay, 2 comercios de e-commerce en Colombia y 2 entidades financieras o fintechs. Encuesta a residentes en esos países (n≥80). Más 6 pruebas moderadas del prototipo A7.


**Usuarios a incluir**

- Colombianos residentes en Brasil, Argentina y Paraguay
- Comercios colombianos de e-commerce
- Entidades financieras y fintechs de la Zona Bre-B

**Reclutamiento**

Comunidades de colombianos en esos países; comercios clientes de PSE; contactos comerciales de ACH con entidades.

**Criterios de validación**

- ≥50 % de los residentes reporta rechazo o costo alto al pagar con su tarjeta en comercios colombianos.
- ≥3 de 4 residentes pagarían con su app bancaria local si funciona sin fricción.
- Al menos 1 entidad interesada en conectarse al riel crossborder.

**Guion de entrevista**

1. ¿Cuándo fue la última vez que pagó a un comercio colombiano desde el exterior? ¿Cómo pagó?
2. ¿Qué problemas ha tenido con la tarjeta de crédito internacional (rechazos, comisiones)?
3. ¿Qué le parecería pagar con la app de su banco local escaneando un QR o desde el checkout?
4. ¿Qué le daría confianza o desconfianza?
5. Comercios: ¿qué porcentaje de sus clientes está en el exterior y cómo cobra hoy?
6. Entidades: ¿qué necesitarían para conectarse a un riel crossborder?

**Encuesta**

- País de residencia · Opción única
- ¿Ha pagado a comercios colombianos desde el exterior? · Sí / No
- ¿Con qué medio? · Opción múltiple
- ¿Ha tenido pagos rechazados o comisiones altas? · Sí / No
- Interés en pagar con su app bancaria local · Escala 1-5

**Investigación secundaria — datos**

- 550.000 colombianos residentes en Brasil, Argentina y Paraguay (ficha del laboratorio).

**Investigación secundaria — por confirmar**

- Volumen de compras de residentes en el exterior en comercios colombianos.
- Estado de la interconexión PIX con Bre-B.
- Impacto en el ingreso transaccional de PSE.

**Prototipos que lo cubren**

- **A7 · Pago presente internacional** (Navegable; responsable Por asignar) — Celular (390×844), app del banco del usuario en Brasil. Variantes: ?v=A = primero el total en reales. ?v=B = primero el valor en pesos y tasa fija 60 s. ?modo=presencial | ecommerce. El caso e-commerce arranca en el checkout de un comercio colombiano. Tecla M para el moderador.

---

# Célula B · Cobros y recaudo empresarial

- **Personas:** P07–P10
- **Líder:** P07
- **Nota:** Las dos iniciativas de Request to Pay se validan en un solo estudio. Incluye la facturación electrónica del laboratorio (B4), con P10, P19 y apoyo de P09 en la observación en caja.

## LAB: Facturación electrónica en un toque (datos del comprador + pago verificado)

- **ID:** f47
- **Equipo:** LAB
- **Nombre original:** LAB: Facturación electrónica en un toque (datos del comprador + pago verificado)
- **Descripción:** Facilitar la factura electrónica con fines de control y facilidad: cuando una persona compra, entrega en segundos sus datos de facturación (QR o «usar mis datos» en el checkout) y ACH vincula el pago electrónico (PSE o Bre-B) con la factura emitida. Así actúa como capa de control de datos entre quien vende, quien paga y la factura, y le asegura al comprador que la factura sirve para la deducción del 1 % en renta.
- **Entrega:** jueves 15 de octubre de 2026, 12 m
- **Estado:** Ideación y priorización
- **Priorización:** Priorizada
- **Tipo:** B2B2C
- **Asignado:** P10 + P19
- **Audiencia:** Compradores que declaran renta o piden factura a su nombre; cajeros y administradores de comercios con POS; proveedores tecnológicos de facturación
- **Urgencia:** Media
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 0 · Sin validación
- **Evolutivo:** Nueva
- **Apuesta:** Operativo
- **Segmento original:** Personas; Empresas (comercios); Proveedores tecnológicos de facturación
- **Validación original:** No
- **Iniciativa nueva (del laboratorio)**

**JTBD**

• Comprador: cuando compro y quiero factura a mi nombre (para deducir en renta o soportar un gasto), quiero entregar mis datos en segundos y sin errores, y que el pago electrónico quede registrado, para no perder el beneficio.
• Comercio: cuando vendo por encima de 5 UVT o el cliente pide factura, quiero capturar sus datos sin digitar y con el medio de pago correcto, para evitar filas, errores y reclamaciones.
• Control: cuando una factura y un pago se refieren a la misma compra, quiero que queden vinculados de forma verificable.

**Mercado**

En 2023 se emitieron 1.672 millones de facturas electrónicas a personas naturales y solo el 19,7 % cumplía los requisitos para la deducción, principalmente porque no registraban un medio de pago electrónico (DIAN, comunicado 021 de 2024). El beneficio máximo es el 1 % de hasta 240 UVT de compras ($112.956 para el año gravable 2025).

**Competencia**

Servicio de la DIAN que autocompleta nombre y correo con la cédula (desde abril de 2025): sustituto directo de la captura de datos. Proveedores tecnológicos de facturación (97 habilitados a agosto de 2026) y software POS. Referente internacional: «CPF na nota» y Nota Fiscal Paulista en Brasil (el comprador asocia su identificación a la factura a cambio de reintegros).

**Correcciones a la fuente**

- Iniciativa nueva del laboratorio: no está en el archivo de priorización.
- Sin validación declarada (nivel 0). La investigación secundaria de esta ficha se hizo para el tablero; al revisarla, el laboratorio puede subirla a nivel 2.
- Riesgo de sustitución: el servicio de la DIAN por cédula ya resuelve parte de la captura de datos.

### Ficha del laboratorio: LAB: Facturación electrónica en un toque (datos del comprador + pago verificado)

- **Segmento:** Personas; Empresas (comercios); Proveedores tecnológicos de facturación
- **Apuesta:** Operativo
- **Evolutivo:** Nueva
- **Objetivo:** Por confirmar con el laboratorio (propuesta: ampliar la oferta de valor y aumentar el uso de PSE y Bre-B en comercio)

**Descripción**

Facilitar la factura electrónica con fines de control y facilidad: cuando una persona compra, entrega en segundos sus datos de facturación (QR o «usar mis datos» en el checkout) y ACH vincula el pago electrónico (PSE o Bre-B) con la factura emitida. Así actúa como capa de control de datos entre quien vende, quien paga y la factura, y le asegura al comprador que la factura sirve para la deducción del 1 % en renta.

**JTBD**

• Comprador: cuando compro y quiero factura a mi nombre (para deducir en renta o soportar un gasto), quiero entregar mis datos en segundos y sin errores, y que el pago electrónico quede registrado, para no perder el beneficio.
• Comercio: cuando vendo por encima de 5 UVT o el cliente pide factura, quiero capturar sus datos sin digitar y con el medio de pago correcto, para evitar filas, errores y reclamaciones.
• Control: cuando una factura y un pago se refieren a la misma compra, quiero que queden vinculados de forma verificable.

**Casos de uso**

- QR de facturación del comprador (app PSE o del banco) que la caja escanea.
- Checkout en línea: «Usar mis datos de facturación» que autocompleta al comercio.
- Vínculo pago–factura: ACH confirma que la compra se pagó por un medio electrónico vigilado (referencia PSE o Bre-B ↔ CUFE).
- Bandeja del comprador con sus facturas, estado de elegibilidad y acumulado frente al tope de la deducción.

**Normativa**

- Ley 2277 de 2022: deducción del 1 % del valor de compras con factura electrónica, hasta 240 UVT, si se pagan por medio electrónico y la factura identifica al comprador.
- Resolución DIAN 000165 de 2023: sistema de facturación y documento equivalente electrónico POS (tope de 5 UVT por venta).
- Resolución DIAN 000202 de 2025: facturar con el tipo y número de documento del comprador; el vendedor solo puede pedir nombre, documento y correo.
- Ley 1581 de 2012: tratamiento de datos personales con autorización del titular.

**Mercado**

En 2023 se emitieron 1.672 millones de facturas electrónicas a personas naturales y solo el 19,7 % cumplía los requisitos para la deducción, principalmente porque no registraban un medio de pago electrónico (DIAN, comunicado 021 de 2024). El beneficio máximo es el 1 % de hasta 240 UVT de compras ($112.956 para el año gravable 2025).

**Competencia**

Servicio de la DIAN que autocompleta nombre y correo con la cédula (desde abril de 2025): sustituto directo de la captura de datos. Proveedores tecnológicos de facturación (97 habilitados a agosto de 2026) y software POS. Referente internacional: «CPF na nota» y Nota Fiscal Paulista en Brasil (el comprador asocia su identificación a la factura a cambio de reintegros).

**Implicaciones**

- La captura de datos por sí sola ya la resuelve la DIAN: el valor diferencial debe estar en el vínculo pago–factura y en el seguimiento de la deducción.
- Definir el rol de ACH: infraestructura de datos entre pagador y comercio, sin ser facturador ni proveedor tecnológico (validar con la DIAN).
- Integración con proveedores tecnológicos y software POS, no comercio por comercio.
- Consentimiento explícito del comprador para compartir sus datos de facturación (Ley 1581).
- Funciona mejor si el pago va por PSE o Bre-B: se apoya en la adopción de QR en comercio presencial.

**Monetización**

- Tarifa por transacción vinculada pago–factura para comercios o proveedores tecnológicos.
- Servicio B2B de conciliación y validación de medio de pago para proveedores tecnológicos.
- Gratis para el comprador: la tesis es aumentar el uso de PSE y Bre-B en compras presenciales y en línea.

### Plan de validación

**Hipótesis**

- Los compradores que declaran renta quieren factura a su nombre y hoy pierden la deducción por errores de datos o porque el pago electrónico no queda registrado.
- Con la consulta por cédula de la DIAN la captura ya es rápida: el valor diferencial de ACH está en vincular el pago verificado a la factura y en el seguimiento de la deducción.
- Comercios y proveedores tecnológicos integrarían el vínculo pago–factura si reduce errores, filas y reclamaciones.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Datos de facturación en un toque
- **Alcance:** Vista del comprador (QR de facturación, pago, factura con pago verificado, bandeja y acumulado de la deducción) y vista de caja (escaneo, autocompletado y emisión). Variante A con el servicio de la DIAN por cédula frente a variante B con QR y pago vinculado.


**Tamaño de muestra**

- **Entrevistas:** 6
- **Pruebas de usabilidad moderadas:** 8
- **Maze:** 40
- **Encuestas:** 200
- **Detalle:** Observación en 2 cajas de comercios (60 min cada una) para medir el tiempo de captura de datos; 8 pruebas moderadas con compradores; 40 en Maze (A/B); preguntas en la encuesta PSE compartida; 6 entrevistas: 3 comercios con POS, 2 proveedores tecnológicos de facturación y 1 contador o tributarista.


**Usuarios a incluir**

- Compradores que declaran renta y compran por más de 5 UVT al mes
- Cajeros y administradores de 3 comercios con POS (retail, droguería, restaurante)
- 2 proveedores tecnológicos de facturación electrónica
- 1 contador o tributarista

**Reclutamiento**

Panel Maze filtrado por declarantes; comercios clientes de PSE; proveedores tecnológicos por contacto institucional.

**Criterios de validación**

- ≥50 % de los declarantes encuestados pide factura a su nombre y ≥30 % reporta errores o facturas no válidas para la deducción.
- La variante B es preferida por ≥60 % y no aumenta el tiempo en caja frente a la variante A.
- ≥2 comercios y ≥1 proveedor tecnológico interesados en un piloto.

**Guion de entrevista**

1. Compradores: ¿Pide factura electrónica a su nombre? ¿Para qué la usa?
2. Compradores: ¿Sabía que puede deducir el 1 % de sus compras en renta? ¿Ha revisado si sus facturas cumplen?
3. Compradores: [Prototipo] Pague y entregue sus datos de facturación. ¿Qué le da confianza o le preocupa de compartirlos así?
4. Compradores: ¿Le sirve ver cuánto lleva acumulado para la deducción?
5. Comercios: ¿Cuánto tarda hoy la caja cuando el cliente pide factura? ¿Qué errores son frecuentes?
6. Comercios: ¿Cómo registran el medio de pago en la factura? ¿Han tenido reclamaciones por eso?
7. Proveedores tecnológicos: ¿Qué tendría que cumplir una integración para vincular el pago con la factura? ¿Quién la pagaría?

**Encuesta**

- ¿Declara renta? · Sí / No / No sé
- ¿Pide factura electrónica a su nombre? · Siempre / A veces / Nunca
- ¿Ha tenido facturas con datos errados o sin el medio de pago correcto? · Sí / No / No sé
- ¿Conoce la deducción del 1 % por compras con factura electrónica? · Sí / No
- Interés en entregar sus datos con un QR y ver su acumulado · Escala 1-5

**Investigación secundaria — datos**

- La deducción del 1 % aplica a compras de hasta 240 UVT ($112.956 de beneficio máximo en el año gravable 2025) pagadas por medio electrónico [S6].
- De 1.672 millones de facturas emitidas a personas naturales en 2023, solo el 19,7 % cumplía los requisitos, sobre todo por no registrar pago electrónico [S7].
- Desde abril de 2025 la DIAN permite facturar solo con el tipo y número de documento del comprador (Resolución 000202 de 2025) [S8].
- El sistema de factura electrónica tiene 97 proveedores tecnológicos habilitados a agosto de 2026 [S9].

**Investigación secundaria — por confirmar**

- Cifras 2024–2025 de facturas válidas para la deducción.
- Postura de la DIAN frente a un tercero que certifique el medio de pago.
- Adopción de QR de Bre-B en comercio presencial.

**Prototipos que lo cubren**

- **B4 · Facturación en un toque** (Navegable; responsable P10 + P19) — Celular (390×844) para el comprador y tableta horizontal (1180×820) para la caja; selector superior entre las dos vistas. Variantes: ?v=A = el comprador dicta su cédula y la caja usa la consulta de la DIAN (flujo actual). ?v=B = el comprador muestra su QR de facturación y paga con PSE o Bre-B, y la factura queda vinculada al pago. Tecla M para el moderador.

## LAB: Escrow (transferencia segura, microfiducia)

- **ID:** f50
- **Equipo:** LAB
- **Nombre original:** LAB: Escrow (transferencia segura, microfiducia)
- **Descripción:** Servicio de cuenta en garantía (escrow) operado por ACH que retiene los fondos de una transacción hasta que se cumplan las condiciones pactadas entre comprador y vendedor, liberando el pago automáticamente vía PSE/Transfiya solo cuando ambas partes confirman el cumplimiento.
- **Entrega:** jueves 15 de octubre de 2026, 12 m
- **Estado:** Ideación y priorización
- **Priorización:** Priorizada
- **Tipo:** B2B2C
- **Asignado:** Por asignar
- **Audiencia:** Compradores y vendedores en el sector inmobiliario, comercios y marketplaces de alto ticket, y prestadores de servicios profesionales
- **Urgencia:** Media
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Evolutivo:** Nueva
- **Segmento original:** Compradores y vendedores del sector inmobiliario; comercios y marketplaces de alto ticket
- **Validación original:** No
- **Iniciativa nueva (del laboratorio)**

**JTBD**

• Las transacciones fallidas y estafas en negocios de alto valor (como bienes raíces) generan desconfianza y pérdidas económicas significativas para las partes.
• No existe hoy una alternativa digital y ágil al escrow tradicional (bancario o notarial), que suele ser lento y costoso.

**Mercado**

El mercado global de servicios de escrow digital alcanzó US$4,24 mil millones en 2025 y se proyecta que llegue a US$7,62 mil millones en 2030, creciendo a una tasa anual de 12,5 %.

**Competencia**

Kustodio: pionero de escrow digital para el sector inmobiliario colombiano.
PagoSeg: plataforma de escrow para comercio digital en Colombia, con soporte para PSE, Nequi y Daviplata.
Cuentas escrow tradicionales ofrecidas directamente por bancos mediante fiducia o encargo fiduciario.

**Correcciones a la fuente**

- Iniciativa del laboratorio priorizada: no está en el archivo de priorización.
- Nivel 1 por tratarse de una ficha interna del laboratorio, sin evidencia externa declarada.
- Plan de validación (hipótesis, muestra, criterios y guion) propuesto como borrador a partir de la ficha del laboratorio; ajustar en el taller de definición.
- El mercado de la ficha es global; falta dimensionar el mercado colombiano (transacciones inmobiliarias y e-commerce de alto ticket).

### Ficha del laboratorio: LAB: Escrow (transferencia segura, microfiducia)

- **Segmento:** Compradores y vendedores del sector inmobiliario; comercios y marketplaces de alto ticket
- **Evolutivo:** Nueva
- **Objetivo:** 40 % del marketshare de mover dinero

**Descripción**

Servicio de cuenta en garantía (escrow) operado por ACH que retiene los fondos de una transacción hasta que se cumplan las condiciones pactadas entre comprador y vendedor, liberando el pago automáticamente vía PSE/Transfiya solo cuando ambas partes confirman el cumplimiento.

**JTBD**

• Las transacciones fallidas y estafas en negocios de alto valor (como bienes raíces) generan desconfianza y pérdidas económicas significativas para las partes.
• No existe hoy una alternativa digital y ágil al escrow tradicional (bancario o notarial), que suele ser lento y costoso.

**Tipos de clientes**

- Compradores y vendedores en el sector inmobiliario (arras, anticipos de vivienda)
- Comercios y marketplaces de alto ticket que necesitan garantizar la entrega antes de liberar el pago

**Casos de uso**

- Compraventa de vivienda: los fondos quedan retenidos hasta la firma del registro de la escritura.
- E-commerce de alto ticket: el pago se libera al vendedor solo cuando el comprador confirma la recepción conforme del producto.
- Servicios profesionales o freelance: pago retenido hasta la entrega y aprobación del trabajo pactado.

**Normativa**

- Circular Externa 055 de 2016 de la SFC y Decreto 1081 de 2015: obligaciones de debida diligencia y bloqueo de fondos aplicables a cualquier custodio de dinero de terceros.
- Régimen de fiducia y encargo fiduciario de la SFC.
- Ley 1480 de 2011 (Estatuto del Consumidor): aplicable a la resolución de disputas entre comprador y vendedor.

**Mercado**

El mercado global de servicios de escrow digital alcanzó US$4,24 mil millones en 2025 y se proyecta que llegue a US$7,62 mil millones en 2030, creciendo a una tasa anual de 12,5 %.

**Competencia**

Kustodio: pionero de escrow digital para el sector inmobiliario colombiano.
PagoSeg: plataforma de escrow para comercio digital en Colombia, con soporte para PSE, Nequi y Daviplata.
Cuentas escrow tradicionales ofrecidas directamente por bancos mediante fiducia o encargo fiduciario.

**Implicaciones**

- Evaluar si ACH requiere una licencia fiduciaria o puede operar el escrow como servicio tecnológico sobre una entidad ya autorizada.
- Definir el mecanismo de resolución de disputas cuando comprador y vendedor no llegan a un acuerdo sobre la liberación de fondos.
- El escrow es un servicio de confianza que exige alta robustez operativa y legal antes de escalar a volúmenes masivos.

**Monetización**

- Comisión por transacción (split payment) descontada automáticamente al liberar los fondos, modelo usado por Paycomet y plataformas de escrow digital.
- Tarifa fija por transacción de alto valor (ej. inmobiliaria), dado el mayor ticket promedio del segmento.
- Servicio premium de verificación y gestión de disputas como línea de ingreso adicional.

### Plan de validación

**Hipótesis**

- Compradores y vendedores de bienes de alto valor evitan o postergan transacciones por desconfianza y hoy no tienen una alternativa digital ágil al escrow bancario o notarial.
- Estarían dispuestos a pagar una comisión por retener y liberar fondos de forma automática.
- Una entidad ya autorizada (fiduciaria o banco) acepta operar el escrow con ACH como capa tecnológica.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Navegable (B5)
- **Alcance:** Prototipo navegable del escrow: acuerdo, depósito en garantía, estado, liberación con dos reglas y disputa, vistas de comprador y vendedor.


**Tamaño de muestra**

- **Entrevistas:** 8
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 0
- **Encuestas:** 80
- **Detalle:** 8 entrevistas: 3 compradores o vendedores en operaciones inmobiliarias, 2 comercios o marketplaces de alto ticket, 2 fiduciarias o bancos y 1 abogado o notario. Encuesta a compradores recientes de alto ticket (n≥80). Más 6 pruebas moderadas del prototipo B5.


**Usuarios a incluir**

- Compradores y vendedores de vivienda
- Comercios y marketplaces de alto ticket
- Fiduciarias y bancos con encargos fiduciarios
- Abogados o notarios de operaciones inmobiliarias

**Reclutamiento**

Inmobiliarias y marketplaces clientes de PSE; contactos con fiduciarias y bancos; red de abogados inmobiliarios.

**Criterios de validación**

- ≥50 % de los entrevistados vivió o evitó una operación de alto valor por desconfianza.
- ≥3 de 5 compradores o vendedores usarían un escrow digital y aceptarían la comisión propuesta.
- Al menos 1 entidad autorizada interesada en operar el servicio con ACH.

**Guion de entrevista**

1. Cuénteme la última compra o venta de alto valor que hizo. ¿Cómo se aseguró de que la otra parte cumpliera?
2. ¿Ha tenido o conocido una estafa o una transacción fallida? ¿Qué pasó?
3. ¿Cómo funciona hoy el pago en garantía (fiducia, notaría)? ¿Cuánto cuesta y cuánto demora?
4. ¿Qué le daría confianza para dejar los fondos retenidos con un tercero como ACH?
5. ¿Qué pasa si hay una disputa? ¿Quién debería decidir?
6. Entidades: ¿qué necesitarían para operar este servicio con ACH como capa tecnológica?

**Encuesta**

- ¿Ha hecho una compra o venta de más de $20 millones en el último año? · Sí / No
- ¿Qué mecanismo usó para proteger el pago? · Opción múltiple
- ¿Ha tenido una transacción fallida o estafa? · Sí / No
- Confianza en dejar fondos retenidos con un tercero digital · Escala 1-5
- Comisión aceptable sobre el valor de la transacción · Opción única

**Investigación secundaria — datos**

- El mercado global de escrow digital fue de US$4,24 mil millones en 2025 y llegaría a US$7,62 mil millones en 2030 (12,5 % anual).

**Investigación secundaria — por confirmar**

- Volumen de transacciones inmobiliarias y e-commerce de alto ticket en Colombia.
- Costo y tiempos de la fiducia y el escrow bancario tradicional.
- Postura de la SFC sobre un escrow tecnológico sin licencia fiduciaria propia.

**Prototipos que lo cubren**

- **B5 · Escrow (transferencia segura)** (Navegable; responsable Por asignar) — Celular (390×844). Variantes: ?v=A = liberación cuando ambas partes confirman. ?v=B = ventana de revisión de 48 h y liberación automática. ?rol=comprador | vendedor. Tecla M para el moderador.

## LAB: Módulo de venta presente (QR/NFC)

- **ID:** f51
- **Equipo:** LAB
- **Nombre original:** LAB: Módulo de venta presente (QR/NFC)
- **Descripción:** Explorar una experiencia de pagos presenciales desde una futura aplicación de ACH. Inicialmente mediante QR y posteriormente mediante NFC, permitiendo que el usuario pague directamente desde una cuenta previamente configurada, similar a una billetera digital, sin depender necesariamente de tarjetas físicas.
- **Entrega:** jueves 15 de octubre de 2026, 12 m
- **Estado:** Ideación y priorización
- **Priorización:** Priorizada
- **Tipo:** B2B
- **Asignado:** Por asignar
- **Audiencia:** Comercios físicos pequeños y medianos que buscan aceptar pagos digitales sin datáfono, y comercios que ya usan PSE online
- **Urgencia:** Media
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Evolutivo:** Nueva
- **Segmento original:** Comercios físicos pequeños y medianos; comercios que ya usan PSE online
- **Validación original:** No
- **Iniciativa nueva (del laboratorio)**

**JTBD**

• Los comercios pequeños dependen de datáfonos costosos o de una sola entidad para aceptar pagos digitales presenciales.
• Los pequeños comercios pierden ventas cuando el cliente no tiene cuenta en la misma entidad del datáfono disponible.

**Mercado**

+670 M de transacciones y +$105 billones movilizados por Bre-B en seis meses.

**Competencia**

Bold: ya integró el QR Bre-B tanto en ventas presenciales como en pagos online a través de su pasarela.
Bancolombia: integró sus códigos QR propios a Bre-B para pagos inmediatos interoperables entre bancos.
Redeban, Credibanco y otros adquirentes tradicionales de datáfonos que enfrentan presión de esta nueva interoperabilidad.

**Correcciones a la fuente**

- Iniciativa del laboratorio priorizada: no está en el archivo de priorización.
- Nivel 1 por tratarse de una ficha interna del laboratorio, sin evidencia externa declarada.
- Plan de validación (hipótesis, muestra, criterios y guion) propuesto como borrador a partir de la ficha del laboratorio; ajustar en el taller de definición.
- Riesgo de sustitución: Bre-B ya resuelve gran parte de la interoperabilidad QR; la diferenciación de ACH está por definir.

### Ficha del laboratorio: LAB: Módulo de venta presente (QR/NFC)

- **Segmento:** Comercios físicos pequeños y medianos; comercios que ya usan PSE online
- **Evolutivo:** Nueva
- **Objetivo:** 40 % del marketshare de mover dinero

**Descripción**

Explorar una experiencia de pagos presenciales desde una futura aplicación de ACH. Inicialmente mediante QR y posteriormente mediante NFC, permitiendo que el usuario pague directamente desde una cuenta previamente configurada, similar a una billetera digital, sin depender necesariamente de tarjetas físicas.

**JTBD**

• Los comercios pequeños dependen de datáfonos costosos o de una sola entidad para aceptar pagos digitales presenciales.
• Los pequeños comercios pierden ventas cuando el cliente no tiene cuenta en la misma entidad del datáfono disponible.

**Tipos de clientes**

- Comercios físicos pequeños y medianos que buscan aceptar pagos digitales sin datáfono costoso
- Comercios que ya usan PSE online y quieren un canal de cobro presencial complementario

**Casos de uso**

- Comercio genera un QR estático interoperable para pagos presenciales de cualquier banco o billetera.
- QR dinámico generado por transacción para montos específicos en punto de venta.
- Convertir el celular del comercio en un datáfono mediante NFC, permitiendo aceptar pagos con tarjetas sin necesidad de adquirir un dispositivo físico adicional.

**Normativa**

- Decreto 1692 de 2020: habilita la interoperabilidad de sistemas de pago de bajo valor en Colombia (Bre-B).
- Marco técnico de Bre-B del Banco de la República: define el uso de llaves y códigos QR interoperables entre entidades.
- Límite de transacción de Bre-B: 1.000 UVB por transacción, equivalentes a COP 12.110.000 en 2026.

**Mercado**

+670 M de transacciones y +$105 billones movilizados por Bre-B en seis meses.

**Competencia**

Bold: ya integró el QR Bre-B tanto en ventas presenciales como en pagos online a través de su pasarela.
Bancolombia: integró sus códigos QR propios a Bre-B para pagos inmediatos interoperables entre bancos.
Redeban, Credibanco y otros adquirentes tradicionales de datáfonos que enfrentan presión de esta nueva interoperabilidad.

**Implicaciones**

- Bre-B ya resuelve gran parte de la interoperabilidad QR; el rol de ACH debe diferenciarse claramente frente a lo que Bre-B ofrece de forma nativa.
- Evaluar si el enfoque es integrar PSE como opción adicional dentro del ecosistema Bre-B o crear un canal QR propio.

**Monetización**

- Comisión por transacción de venta presencial vía QR, similar al modelo que ya aplican Bold y otros adquirentes.
- Tarifa de integración técnica para comercios que quieran combinar QR presencial con su canal PSE online existente.
- Pendiente de definir: Bre-B es gratuito para el registro de llaves, lo que presiona a reducir los costos de cualquier modelo de cobro adicional.

### Plan de validación

**Hipótesis**

- Los comercios pequeños pierden ventas por no tener datáfono o por depender de una sola entidad.
- Un QR interoperable combinado con su canal PSE online resuelve algo que Bre-B nativo no ofrece, y pagarían por ello.
- El NFC en el celular del comercio es un diferenciador deseable frente al datáfono.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Navegable (B6)
- **Alcance:** Prototipo navegable de cobro presencial: QR fijo y dinámico, app del cliente y cobro NFC con lectura fallida.


**Tamaño de muestra**

- **Entrevistas:** 8
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 0
- **Encuestas:** 100
- **Detalle:** 8 entrevistas con dueños o administradores de comercios físicos pequeños y medianos (4 sin datáfono, 2 con datáfono y 2 que ya venden con PSE online). Encuesta a comercios (n≥100). Más 6 pruebas moderadas del prototipo B6.


**Usuarios a incluir**

- Dueños o administradores de comercios físicos pequeños y medianos
- Comercios que ya usan PSE online
- Adquirentes o proveedores de datáfonos (1 o 2)

**Reclutamiento**

Comercios clientes de PSE; asociaciones de comerciantes; observación presencial en zonas comerciales.

**Criterios de validación**

- ≥50 % de los comercios sin datáfono reporta ventas perdidas por no poder cobrar digital.
- ≥3 de 8 comercios prefieren la propuesta de ACH sobre el QR nativo de Bre-B o de su banco.
- ≥2 comercios aceptarían un piloto y el modelo de comisión.

**Guion de entrevista**

1. ¿Cómo cobra hoy a sus clientes en el punto de venta? ¿Qué medios acepta?
2. Cuénteme la última venta que perdió por no poder cobrar con el medio que el cliente tenía.
3. ¿Qué le cuesta hoy el datáfono o su alternativa (comisión, arriendo, otros costos)?
4. ¿Conoce y usa el QR de Bre-B? ¿Qué le falta o le sobra?
5. [Mostrar concepto] ¿Qué tendría que hacer esto distinto para que lo usara en su caja?
6. ¿Cuánto estaría dispuesto a pagar por transacción?

**Encuesta**

- ¿Tiene datáfono? · Sí / No
- ¿Qué medios de pago acepta? · Opción múltiple
- ¿Ha perdido ventas por no poder cobrar digital? · Sí / No / No sé
- ¿Usa el QR de Bre-B? · Sí / No / No lo conozco
- Interés en un módulo QR/NFC de ACH · Escala 1-5

**Investigación secundaria — datos**

- Bre-B movió más de 670 millones de transacciones y más de $105 billones en seis meses.
- Límite de Bre-B: 1.000 UVB por transacción, equivalentes a COP 12.110.000 en 2026.

**Investigación secundaria — por confirmar**

- Penetración de QR de Bre-B en comercio pequeño.
- Costo promedio del datáfono para un comercio pequeño.
- Madurez de NFC como receptor de pago en celulares Android y iOS.

**Prototipos que lo cubren**

- **B6 · Venta presente QR/NFC** (Navegable; responsable Por asignar) — Celular (390×844) del comercio y del cliente. Variantes: ?v=A = QR fijo: el cliente escribe el valor. ?v=B = QR dinámico: valor fijo por venta y vencimiento. El cobro con tarjeta por NFC está en ambas. Tecla M para el moderador.

## TESO: Marca Blanca + ERP

- **ID:** f2
- **Número:** 7
- **Equipo:** NS
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Ideación y priorización
- **Tipo:** B2B
- **Asignado:** P09 + P10
- **Audiencia:** Entidades financieras que revenden TESO a sus clientes empresariales, y empresas medianas con ERP (tesorería/finanzas)
- **Urgencia:** Media
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 3 · Conversaciones con aliados
- **Valor:** 3.19
- **Complejidad:** 2.35
- **Complejidad (texto):** Alto (6 meses o más)
- **Zona:** P3 · Análisis caso a caso
- **Evolutivo:** Nueva
- **Apuesta:** Operativo
- **Segmento original:** Empresas; Entidades
- **Validación original:** Sí
- **Evidencia original:** Conversaciones
- **Pendiente:** Confirmar Postura Bancolombia - Necesidad de otro canal de comercialización
- **Comparable:** Habilitadores de Iniciadores de Pago que se estimó por OF

**JTBD**

Cuando quiero ofrecer la experiencia a mis clientes bajo mi propia marca, quiero contar con una versión white-label que se integre al ERP de las empresas, para integrarla a mi propuesta sin construirla desde cero.

**Mercado**

Mercado empresarial direccionable: en Colombia se crearon 297.475 empresas durante 2024 y DANE estimó 5,3 millones de micronegocios. El eCommerce superó COP $105 billones y 49,4 millones de accesos móviles muestran la escala disponible para soluciones empresariales digitales.

**Competencia**

Infraestructura/embedded finance: Pomelo, Minka, Galileo, Kushki, Openpay y dLocal.

**Correcciones a la fuente**

- La evidencia dice «Conversaciones» sin indicar con quién; se asume conversación con aliados (nivel 3) y hay que documentar las actas.

### Plan de validación

**Hipótesis**

- Al menos 2 entidades financieras distintas a Bancolombia quieren ofrecer tesorería bajo su propia marca en lugar de construirla.
- Las empresas objetivo usan un número acotado de ERP (SAP Business One, Siigo, World Office, Oracle NetSuite) y la integración nativa es un factor de compra decisivo.
- La EF acepta un modelo de cobro por licencia más transacción, en vez de un desarrollo a la medida.

**Prototipo requerido**

- **Requerimiento:** Ligero
- **Tipo:** Demo de concepto + ficha comercial
- **Alcance:** Mock del portal TESO con 2 marcas de ejemplo (cambio de logo y colores) y un diagrama de integración ERP → TESO → PSE. Ficha de una página con modelo comercial tentativo.


**Tamaño de muestra**

- **Entrevistas:** 7
- **Pruebas de usabilidad moderadas:** 0
- **Maze:** 0
- **Encuestas:** 0
- **Detalle:** 7 entrevistas: 4 EF (líderes de banca empresarial o cash management) y 3 empresas con ERP (tesoreros o CFO).


**Usuarios a incluir**

- Gerentes de cash management o banca transaccional en 4 EF (excluyendo Bancolombia, que ya tiene postura pendiente)
- Tesoreros o directores financieros de 3 empresas medianas clientes de TESO

**Reclutamiento**

Contactos comerciales de ACH con EF; base de clientes TESO actuales.

**Criterios de validación**

- ≥3 de 4 EF califican el dolor como prioritario (≥4/5) y piden una segunda sesión técnica.
- ≥2 de 3 empresas confirman que la falta de integración con su ERP es hoy un bloqueo real.
- Al menos 1 EF acepta firmar una carta de intención no vinculante.

**Guion de entrevista**

1. ¿Cómo ofrecen hoy servicios de tesorería o pagos masivos a sus clientes empresariales? ¿Qué construyeron ustedes y qué tercerizaron?
2. Cuénteme la última vez que perdieron o casi pierden un cliente empresarial por la falta de una funcionalidad de tesorería. ¿Qué pasó?
3. ¿Qué tan importante es para ustedes que la experiencia salga con su marca? ¿Qué pasaría si saliera con marca ACH?
4. ¿Con qué ERP trabajan sus clientes más grandes? ¿Cómo integran hoy esos ERP con sus canales?
5. [Mostrar demo] ¿Qué le falta a esto para que lo pusieran frente a un cliente el próximo trimestre?
6. ¿Quién tendría que aprobar una decisión así dentro de su entidad? ¿Cuánto tarda ese proceso?
7. ¿Cómo esperaría que se cobre un servicio así: licencia, transacción, ingreso compartido?
8. ¿Estaría dispuesto a una segunda sesión con su equipo técnico en las próximas 3 semanas?

**Encuesta**

- ¿Su entidad ofrece hoy un portal de tesorería empresarial propio? · Sí / No / En construcción
- Califique de 1 a 5 la importancia de ofrecerlo bajo su marca · Escala 1-5
- ¿Qué ERP usan sus principales clientes empresariales? · Opción múltiple
- Ordene: tiempo de salida al mercado, costo, control de marca, integración ERP · Ranking
- ¿Aceptaría una sesión técnica de seguimiento? · Sí / No

**Investigación secundaria — datos**

- El archivo de priorización estima 297.475 empresas creadas en 2024 y 5,3 millones de micronegocios (DANE).
- Competidores de infraestructura y embedded finance: Pomelo, Minka, Galileo, Kushki, Openpay, dLocal.

**Investigación secundaria — por confirmar**

- Cuota de mercado de ERP en mediana empresa colombiana.
- Modelos de precio white-label de banca como servicio en la región.

**Prototipos que lo cubren**

- **B3 · Demo TESO Marca Blanca + ERP** (Ligero; responsable P09 + P10) — Escritorio (1280 px), presentación navegable para mostrar en entrevista. Variantes: Selector de marca en la parte superior que cambia logo ficticio, colores y nombre del portal (Banco Andino Empresas / Banco del Pacífico Digital Empresas).

## ACHL: Request to Pay (RtP)

- **ID:** f5
- **Número:** 14
- **Equipo:** ACHL
- **Descripción:** Implementar un flujo de Request to Pay (RTP) que permita que un comercio o empresa genere una solicitud de pago asociada a una obligación o factura y que dicha solicitud sea gestionada por ACH para ser presentada al cliente pagador a través de la entidad financiera correspondiente.

El flujo debe permitir:
Registrar la obligación.
Crear la solicitud RTP.
Validar y almacenar el cobro.
Notificar la solicitud de pago.
Permitir al cliente consultar y autorizar el cobro desde la entidad financiera.
Ejecutar la transferencia asociada al cobro autorizado.
Confirmar el resultado a todos los participantes del proceso.

Como condición previa, el cliente pagador debe haber otorgado consentimiento para recibir notificaciones o solicitudes de pago.

Adicionalmente, deben existir canales habilitados para que el cliente pueda conocer y aceptar las condiciones relacionadas con las solicitudes de pago.

Este consentimiento se convierte en una precondición funcional para la gestión posterior del RTP.
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** B2B2C
- **Asignado:** P07 + P08
- **Audiencia:** EF que presentan la solicitud al pagador, empresas facturadoras y personas pagadoras
- **Urgencia:** Media
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 3 · Conversaciones con aliados
- **Valor:** 3.05
- **Complejidad:** 2.62
- **Complejidad (texto):** Alto (6 meses o más)
- **Zona:** P3 · Análisis caso a caso
- **Evolutivo:** Nueva
- **Apuesta:** Operativo
- **Segmento original:** Entidades
- **Validación original:** Sí
- **Evidencia original:** Conversaciones con Gou, Bancolombia y Davivienda
- **Comparable:** PSE

**JTBD**

Cuando necesito cobrar o pagar una obligación, compra, servicio o compromiso,
quiero enviar o recibir una solicitud de pago digital con información clara del cobro, que pueda ser gestionada y autorizada de forma simple desde mi entidad financiera,
para completar el pago de manera ágil, segura, trazable y conciliada, reduciendo fricciones, errores y pasos innecesario

**Mercado**

Base direccionable: RADIAN registró 540.692 facturas por $15,3 billones con corte a junio de 2026; además, en el primer semestre de 2025 se crearon 173.907 empresas. Son universos potenciales para solicitudes digitales de cobro y recaudo referenciado. Fuentes: DIAN, Consolidado SFE; RUES–Confecámaras, Dinámica Empresarial 1S-2025.
URLs fuentes:
https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/consolidado-cifras-sfe/
https://confecamaras.org.co/investigaciones-economicas/informes-dinamica-empresarial/

**Competencia**

• Bre-B con solicitud de pago
• Links y botones de pago

**Correcciones a la fuente**

- Se solapa con «SI: Iniciador de Pagos – Request to Pay». Se recomienda validarlas juntas y decidir si son una sola iniciativa.

### Plan de validación

**Hipótesis**

- Las empresas que facturan de forma recurrente prefieren RTP sobre los links de pago porque reduce la conciliación manual.
- Las personas aceptan dar consentimiento previo para recibir solicitudes de cobro en su banco si pueden rechazarlas fácilmente.
- Las EF están dispuestas a mostrar solicitudes de terceros en su app, a pesar de que Bre-B ya ofrece una función similar.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Reutilizar prototipos RTP del sitio de demos INNLAB
- **Alcance:** Flujo de la empresa (crear cobro) y del pagador (recibir, revisar, autorizar o rechazar en la app del banco). Reutilizar las experiencias ya construidas y ajustar textos.


**Tamaño de muestra**

- **Entrevistas:** 9
- **Pruebas de usabilidad moderadas:** 8
- **Maze:** 40
- **Encuestas:** 0
- **Detalle:** 5 empresas facturadoras + 4 EF (incluye seguimiento a Gou, Bancolombia y Davivienda) en entrevista; 8 personas en prueba moderada del flujo del pagador; 40 en Maze no moderado.


**Usuarios a incluir**

- Responsables de cartera o recaudo de 5 empresas con facturación recurrente (servicios, educación, seguros)
- Gerentes de producto digital de 4 EF
- 8 personas que pagan facturas por PSE al menos 1 vez al mes

**Reclutamiento**

Gou, Bancolombia y Davivienda (ya contactados); empresas recaudadoras PSE; panel Maze para personas.

**Criterios de validación**

- ≥6 de 8 pagadores completan el flujo sin ayuda y califican la confianza con ≥4/5.
- ≥3 de 5 empresas dicen que lo usarían en lugar de su método actual.
- ≥2 EF confirman interés en presentar solicitudes en su app.

**Guion de entrevista**

1. Empresas: ¿Cómo cobra hoy a sus clientes recurrentes? ¿Qué porcentaje paga a tiempo?
2. Empresas: ¿Cuántas horas al mes dedica su equipo a conciliar pagos que llegan sin referencia?
3. Empresas: Si Bre-B ya permite solicitudes de pago, ¿qué necesitaría de esta solución para preferirla?
4. EF: ¿Qué riesgo ven en mostrar en su app cobros iniciados por terceros?
5. Personas: Cuénteme cómo pagó su última factura. ¿Qué le molestó del proceso?
6. Personas: [Prototipo] ¿Qué información necesita ver para confiar en una solicitud de cobro?
7. Personas: ¿Qué haría si recibe una solicitud que no reconoce?

**Encuesta**

- Personas: ¿Cómo paga sus facturas recurrentes? · Opción múltiple
- Personas: ¿Aceptaría recibir solicitudes de cobro de empresas que usted autorice en su app bancaria? · Escala 1-5
- Personas: ¿Qué le daría más confianza? (marca del banco, detalle de la factura, posibilidad de rechazar) · Ranking
- Empresas: % de cartera que hoy se paga después del vencimiento · Rango

**Investigación secundaria — datos**

- RADIAN registró 540.692 facturas por $15,3 billones con corte a junio de 2026 (archivo de priorización).
- Bre-B ya tiene más de 36 millones de clientes y 115 millones de llaves (corte 5 oct. 2026) [S1].
- El archivo indica que Bre-B habilita débitos automáticos vinculados a llaves desde mayo de 2026: es el principal sustituto.

**Investigación secundaria — por confirmar**

- Hoja de ruta pública de Bre-B para solicitudes de pago.
- Casos de RTP en Reino Unido (Pay.UK) y Brasil (Pix Cobrança / Pix Automático) y sus tasas de adopción.

**Prototipos que lo cubren**

- **B1 · Request to Pay** (Navegable (reutiliza demos INNLAB); responsable P07 + P08) — Dos vistas: escritorio (portal de la empresa, 1280 px) y celular (app del banco del pagador, 390×844). Un selector superior cambia entre «Empresa» y «Pagador». Variantes: ?vista=empresa y ?vista=pagador. Si existen las demos RTP del sitio de INNLAB, reutiliza su estructura y textos y ajústalos a este flujo.

## TESO: Modulo de parametrización y alertamientos tributarios

- **ID:** f6
- **Número:** 22
- **Equipo:** NS
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Desarrollo y Pruebas
- **Tipo:** B2B
- **Asignado:** P09 + P10
- **Audiencia:** Contadores, tesoreros y responsables tributarios de pymes y medianas empresas con obligaciones en varios municipios
- **Urgencia:** Alta
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 2 · Secundaria
- **Valor:** 2.89
- **Complejidad:** 2.38
- **Complejidad (texto):** Alto (6 meses o más)
- **Zona:** P3 · Análisis caso a caso
- **Evolutivo:** Evolutivo
- **Apuesta:** Sostenibilidad
- **Segmento original:** Empresas
- **Validación original:** Sí
- **Evidencia original:** Digitalbank
- **Comparable:** Módulo de pago de pago de impuesto

**JTBD**

Cuando tengo múltiples obligaciones tributarias incluso en diferentes municipios, quiero un modulo que consolide fechas de vencimiento, tarifas, reglas de pago de acuerdo a mis obligaciones y actividad comercial, para anticipar vencimientos y realizar planeción de caja.

**Mercado**

Mercado observado: la DIAN recaudó COP $267,2 billones en 2024; COP $226,07 billones (84,6%) correspondieron a actividad interna y COP $41,13 billones (15,4%) a comercio exterior. Las acciones de control y facilitación generaron COP $42,2 billones, evidenciando valor en calendario, alertas y automatización tributaria.

**Competencia**

Software empresarial: Siigo Auditor, Alegra, Loggro, Helisa y World Office.

**Correcciones a la fuente**

- Está en «Desarrollo y Pruebas» con evidencia secundaria (benchmark Digitalbank). Validar el uso real antes de seguir construyendo.

### Plan de validación

**Hipótesis**

- Las empresas con obligaciones en 3 o más municipios hoy gestionan vencimientos en hojas de cálculo y han pagado sanciones por olvido.
- Prefieren recibir alertas dentro de su herramienta de pago (TESO/PSE) que en su software contable.
- La alerta solo genera valor si se conecta con el pago en un clic.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Prototipo navegable en Figma + Maze
- **Alcance:** Configuración de obligaciones por municipio, calendario consolidado, alerta y pago desde la alerta.


**Tamaño de muestra**

- **Entrevistas:** 6
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 30
- **Encuestas:** 120
- **Detalle:** 6 entrevistas y 6 pruebas moderadas con las mismas personas (sesión de 60 min); 30 en Maze; encuesta a contadores n≥120.


**Usuarios a incluir**

- Contadores independientes que manejan 5 o más empresas
- Tesoreros de empresas con sedes en varias ciudades

**Reclutamiento**

Clientes TESO; gremios de contadores; panel Maze filtrado por ocupación.

**Criterios de validación**

- ≥4 de 6 reportan haber pagado una sanción o interés por vencimiento en los últimos 12 meses.
- Tasa de éxito en Maze ≥70 % para configurar una obligación.
- ≥40 % de la encuesta pagaría o cambiaría de herramienta por esta función.

**Guion de entrevista**

1. ¿Cómo lleva hoy el control de vencimientos tributarios de sus empresas o sedes?
2. Cuénteme la última vez que se le pasó un vencimiento. ¿Qué costó?
3. ¿Qué herramienta revisa todos los días? ¿Dónde le serviría recibir la alerta?
4. [Prototipo] Configure el ICA de Cali y Bogotá. ¿Qué le resultó confuso?
5. ¿Confiaría en que las tarifas y fechas estén actualizadas? ¿Quién debería responder si hay un error?
6. ¿Cuánto pagaría al mes por esto, o lo espera incluido?

**Encuesta**

- ¿En cuántos municipios declara obligaciones? · 1 / 2-3 / 4-10 / más de 10
- ¿Cómo controla los vencimientos hoy? · Opción múltiple
- ¿Ha pagado sanciones o intereses por vencimiento en los últimos 12 meses? · Sí / No
- Interés en alertas con pago en un clic · Escala 1-5
- Herramientas que usa (Siigo, Alegra, World Office, Helisa, otra) · Opción múltiple

**Investigación secundaria — datos**

- La DIAN recaudó COP $267,2 billones en 2024 (archivo de priorización).
- Competencia: Siigo, Alegra, Loggro, Helisa y World Office.

**Investigación secundaria — por confirmar**

- Si los ERP contables ya ofrecen calendarios de ICA municipal.
- Fuente oficial y actualizable de calendarios municipales.

**Prototipos que lo cubren**

- **B2 · Calendario tributario TESO** (Navegable; responsable P09 + P10) — Escritorio (1280 px) adaptable a tableta. Variantes: Una sola variante. Parámetro ?perfil=contador (varias empresas) o ?perfil=tesorero (una empresa con sedes).

## SI: Iniciador de Pagos - Request to Pay

- **ID:** f10
- **Número:** 38
- **Equipo:** SI
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** B2B2C
- **Asignado:** P07 + P08
- **Audiencia:** Empresas facturadoras de servicios recurrentes (servicios públicos, educación, seguros) y sus clientes pagadores
- **Urgencia:** Media
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Valor:** 2.69
- **Complejidad:** 2.78
- **Complejidad (texto):** Alto (6 meses o más)
- **Zona:** P3 · Análisis caso a caso
- **Evolutivo:** Nueva
- **Apuesta:** OF
- **Segmento original:** Empresas
- **Validación original:** Sí
- **Comparable:** Link de Pagos

**JTBD**

Cuando emito una factura o necesito cobrarle a un cliente, quiero que me pague de forma directa, rápida y segura desde su cuenta, sin depender de gestionar el cobro manualmente, el cliente tenga su servicio y/o producto y yo cuente con el dinero a tiempo protegiendo el flujo de caja.

**Mercado**

Mercado de adquirencia de facturación recurrente en Colombia (servicios públicos, educación, seguros) — bancos y entidades vigiladas que hoy pagan interchange a las redes de tarjeta en el cobro de sus obligaciones.

**Competencia**

Bre-B (operado bajo el riel interbancario y del que ACH es nodo tecnológico) ya habilita débitos/pagos automáticos vinculados a llaves desde mayo de 2026, enfocados en facturas de servicios públicos — el mayor solapamiento directo con este caso. Redeban corrió un piloto de 'pagos con llaves' (23M+ registros a mar. 2025) como infraestructura previa a Bre-B —no un Request to Pay independiente propio— y anunció alianza con Capgemini (sept. 2024) para Open Finance, sin producto de RTP confirmado en producción. Wompi (pasarela de Bancolombia) ya ofrece pagos recurrentes/débito automático como jugador establecido en el recaudo. Credibanco compite en adquirencia de tarjeta, no en RTP directo.

**Correcciones a la fuente**

- Marcada como validada, sin tipo declarado.
- Se solapa con «ACHL: Request to Pay»; se valida en el mismo estudio.

### Plan de validación

**Hipótesis**

- Las empresas facturadoras cambiarían parte de su recaudo con tarjeta a iniciación de pagos si el costo es menor que el intercambio.
- La iniciación regulada bajo Finanzas Abiertas da a la empresa una ventaja real sobre Bre-B (datos de la factura, conciliación).
- Los pagadores autorizan cargos recurrentes desde su cuenta si pueden cancelarlos fácilmente.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Compartido con ACHL RTP
- **Alcance:** Mismo prototipo del pagador. Se añade la vista de conciliación para la empresa.


**Tamaño de muestra**

- **Entrevistas:** 5
- **Pruebas de usabilidad moderadas:** 0
- **Maze:** 0
- **Encuestas:** 0
- **Detalle:** 5 entrevistas adicionales con empresas facturadoras de alto volumen; las pruebas con pagadores se comparten con ACHL RTP.


**Usuarios a incluir**

- Directores de recaudo de empresas de servicios públicos, colegios o universidades y aseguradoras

**Reclutamiento**

Recaudadores PSE de alto volumen.

**Criterios de validación**

- ≥3 de 5 empresas indican que migrarían un % de su recaudo con un ahorro de costo concreto.
- Se identifica un costo de recaudo actual por transacción para comparar.

**Guion de entrevista**

1. ¿Qué medios usan hoy sus clientes para pagar y cuánto les cuesta cada uno?
2. ¿Qué porcentaje de sus clientes paga con débito automático?
3. ¿Qué ha visto de Bre-B? ¿Lo están usando para recaudar?
4. ¿Qué tendría que ofrecer una iniciación de pagos para que la promovieran con sus clientes?
5. ¿Qué tan importante es que el pago llegue conciliado con la factura?

**Encuesta**

- Costo promedio de recaudo por transacción · Rango
- % de recaudo por canal · Distribución
- Interés en iniciación de pagos · Escala 1-5

**Investigación secundaria — datos**

- El archivo de priorización señala que Bre-B ofrece débitos y pagos automáticos con llaves desde mayo de 2026, enfocados en servicios públicos.
- Wompi ya ofrece pagos recurrentes y débito automático.

**Investigación secundaria — por confirmar**

- Costos de intercambio de tarjeta en recaudo recurrente en Colombia.
- Reglas de la SFC para iniciación de pagos bajo Finanzas Abiertas.

**Prototipos que lo cubren**

- **B1 · Request to Pay** (Navegable (reutiliza demos INNLAB); responsable P07 + P08) — Dos vistas: escritorio (portal de la empresa, 1280 px) y celular (app del banco del pagador, 390×844). Un selector superior cambia entre «Empresa» y «Pagador». Variantes: ?vista=empresa y ?vista=pagador. Si existen las demos RTP del sitio de INNLAB, reutiliza su estructura y textos y ajústalos a este flujo.

---

# Célula C · SOI y PILA

- **Personas:** P11–P14
- **Líder:** P11
- **Nota:** Comparte la encuesta SOI (n≥150) y la base de empresas aportantes. El módulo PILA 24/7 del laboratorio se prueba dentro de las sesiones del Validador.

## LAB: Escalamiento SOI Pago Internacional con PSE en SOI PILA

- **ID:** f15
- **Equipo:** PSE
- **Descripción:** Servicio que permite a colombianos residentes en el exterior realizar pagos en Colombia directamente desde su cuenta bancaria en el país de residencia internacional, usando infraestructuras de pago en tiempo real conectadas a la red ACH​
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Sin estado
- **Priorización:** No priorizada
- **Tipo:** B2C
- **Asignado:** P14
- **Audiencia:** Colombianos residentes en el exterior (prioridad EE. UU. y España) que cotizan o quieren cotizar a pensión en Colombia
- **Urgencia:** Media
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Evolutivo:** Evolutivo
- **Apuesta:** Operativo
- **Segmento original:** Personas
- **Validación original:** Sí
- **Evidencia original:** Falta salida en vivo para validación
- **Comparable:** Tarjeta de Crédito en Lista de Bancos

**JTBD**

Cuando vivo en el exterior (EEUU) y quiero seguir cotizando a pensión en Colombia pueda pagar directamente desde su cuenta en EEUU

**Mercado**

TAM​
5.5 millones de Colombianos viven en el exterior (2024)​
2.8 millones Colombianos residentes en Estados Unidos ​
500 mil Colombianos residentes en España ​
100 mil Colombianos residentes en Mexico ​
SAM​
100.000 a 150.000 cotizantes en el exterior​

**Competencia**

WesternUnion, MoneyGram​: Canales de pago desde el exterior, cobran comisiones altas para el usuario​
Cobre, Remitly, Wise​: Fintechs que habilitan pagos y transferencias internacionales hacia Colombia​

**Correcciones a la fuente**

- Marcada «Sí», pero su evidencia dice «Falta salida en vivo». Nivel 1 con bandera «listo para piloto».

### Plan de validación

**Hipótesis**

- Los colombianos en el exterior que cotizan hoy pagan a través de un familiar en Colombia o con remesas costosas.
- Pagarían directamente desde su cuenta extranjera si el costo es menor que una remesa.
- El canal de captación más eficiente son las comunidades en línea de colombianos en el exterior.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Landing de lista de espera + flujo navegable
- **Alcance:** Landing que explica el servicio con registro a lista de espera (prueba de humo) y un flujo de pago navegable para las sesiones.


**Tamaño de muestra**

- **Entrevistas:** 8
- **Pruebas de usabilidad moderadas:** 8
- **Maze:** 0
- **Encuestas:** 150
- **Detalle:** 8 entrevistas con prueba del flujo (virtual), encuesta n≥150 en comunidades de colombianos en el exterior y medición de registros en la landing.


**Usuarios a incluir**

- Colombianos en EE. UU. y España que cotizan o cotizaron como independientes

**Reclutamiento**

Grupos en redes de colombianos en el exterior; consulados; Colombia Nos Une (Cancillería).

**Criterios de validación**

- ≥5 de 8 confirman que hoy dependen de un tercero para pagar.
- ≥100 registros en la lista de espera en 5 días.
- Costo máximo aceptado mayor que el costo operativo estimado.

**Guion de entrevista**

1. ¿Cotiza hoy a pensión en Colombia? ¿Cómo paga?
2. Cuénteme el último pago: ¿quién lo hizo, cuánto le costó, cuánto tardó?
3. ¿Ha dejado de cotizar algún mes por la dificultad del pago?
4. [Prototipo] ¿Qué le genera confianza o duda de este flujo?
5. ¿Cuánto estaría dispuesto a pagar por transacción?
6. ¿Desde qué banco o app pagaría?

**Encuesta**

- País de residencia · Opción única
- ¿Cotiza a seguridad social en Colombia? · Sí / No / Me gustaría
- Cómo paga hoy · Opción múltiple (familiar, remesa, no paga)
- Costo máximo aceptable por pago · Rango en USD
- ¿Quiere ser avisado cuando esté disponible? · Sí (correo) / No

**Investigación secundaria — datos**

- 5,5 millones de colombianos viven en el exterior; 2,8 millones en EE. UU.; SAM de 100.000 a 150.000 cotizantes (archivo de priorización).
- Competencia: Western Union, MoneyGram, Remitly, Wise, Cobre.

**Investigación secundaria — por confirmar**

- Requisitos de la UGPP y Colpensiones para cotizantes en el exterior.
- Riel de pago inmediato a usar en EE. UU. (FedNow o RTP) y socio.

**Prototipos que lo cubren**

- **C3 · Pago internacional PILA** (Navegable + landing; responsable P14) — Landing responsive (escritorio y celular) + flujo de pago mobile-first. Variantes: ?pagina=landing (prueba de humo) y ?pagina=flujo (sesiones). En la landing, dos titulares alternos (?t=1 «Cotiza a tu pensión en Colombia desde Estados Unidos» y ?t=2 «Paga tu seguridad social en Colombia sin remesas») para comparar registros.

## LAB: PSE 24/7 – Seguridad Social

- **ID:** f16
- **Equipo:** LAB
- **Nombre original:** LAB: Iniciativa 1 2027
- **Descripción:** Habilitar el pago de planillas de Seguridad Social mediante PSE 24 horas al día, 7 días a la semana, iniciando con SOI, eliminando de cara al usuario las restricciones actuales asociadas a pagos Next Day, mientras se mantienen los ciclos operativos, de compensación y de información requeridos.
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Ideación y priorización
- **Priorización:** No priorizada
- **Tipo:** B2B2C
- **Asignado:** P14 + P20
- **Audiencia:** Cotizantes independientes y empresas que pagan PILA cerca de la fecha límite; operadores PILA y administradoras como actores del ciclo
- **Urgencia:** Alta
- **Riesgo principal:** Factibilidad
- **Nivel de evidencia:** 2 · Secundaria
- **Evolutivo:** Evolutivo
- **Apuesta:** Operativo
- **Segmento original:** Personas; Empresas; Operadores PILA
- **Validación original:** No

**JTBD**

• El usuario debe adaptar el momento en que paga Seguridad Social a ventanas operativas.
• Un pago urgente cerca de la fecha límite puede quedar condicionado por fines de semana, festivos o cortes operativos.

**Mercado**

En Colombia había 13,3 millones de trabajadores afiliados al Sistema General de Riesgos Laborales al cierre de 2025, además de 1,35 millones de empresas afiliadas (ficha del laboratorio).

**Competencia**

Operadores PILA autorizados en Colombia: Aportes en Línea, Mi Planilla, Enlace Operativo, Simple, Asopagos.

**Correcciones a la fuente**

- Reemplaza el placeholder «LAB: Iniciativa 1 2027» con la ficha del laboratorio.
- La ficha aporta investigación secundaria (mercado, competencia, normativa): nivel 2.

### Ficha del laboratorio: LAB: PSE 24/7 – Seguridad Social

- **Segmento:** Personas; Empresas; Operadores PILA
- **Apuesta:** Operativo
- **Evolutivo:** Evolutivo
- **Objetivo:** 40 % del marketshare de mover dinero

**Descripción**

Habilitar el pago de planillas de Seguridad Social mediante PSE 24 horas al día, 7 días a la semana, iniciando con SOI, eliminando de cara al usuario las restricciones actuales asociadas a pagos Next Day, mientras se mantienen los ciclos operativos, de compensación y de información requeridos.

**JTBD**

• El usuario debe adaptar el momento en que paga Seguridad Social a ventanas operativas.
• Un pago urgente cerca de la fecha límite puede quedar condicionado por fines de semana, festivos o cortes operativos.

**Casos de uso**

- Pago durante un festivo próximo a una fecha límite.
- Confirmación inmediata al usuario aunque la distribución administrativa ocurra posteriormente.
- Extensión posterior de la capacidad a otros operadores PILA.

**Normativa**

- Decreto 780 de 2016 (Decreto Único Reglamentario del Sector Salud): reglas generales del Sistema de Seguridad Social Integral y uso de la PILA.
- Decreto 1990 de 2016: plazos para la autoliquidación y pago de aportes mediante PILA.

**Mercado**

En Colombia había 13,3 millones de trabajadores afiliados al Sistema General de Riesgos Laborales al cierre de 2025, además de 1,35 millones de empresas afiliadas (ficha del laboratorio).

**Competencia**

Operadores PILA autorizados en Colombia: Aportes en Línea, Mi Planilla, Enlace Operativo, Simple, Asopagos.

**Implicaciones**

- Validar si un pago iniciado fuera del ciclo puede considerarse formalmente recibido ese mismo día o el siguiente día hábil.
- Separar conceptualmente autorización del pago, fecha efectiva del aporte, compensación y dispersión.
- Coordinar cambios entre SOI, PSE, entidades financieras y administradoras.

**Monetización**

- Capturar incremento de volumen derivado de pagos que hoy se posponen o se trasladan a otros canales.
- Posible tarifa diferenciada B2B para operadores que utilicen la capacidad 24/7.
- No crea necesariamente un nuevo cobro al usuario final; la tesis es aumentar la utilización del riel existente.

### Plan de validación

**Hipótesis**

- Una parte significativa de los pagos PILA ocurre o se intenta cerca de la fecha límite, en fines de semana, festivos o después del corte.
- Los usuarios confían en el pago fuera de horario si reciben confirmación inmediata con la fecha efectiva del aporte clara.
- La regulación permite reconocer como oportuno un pago autorizado fuera del ciclo (o existe una ruta para lograrlo con administradoras y operadores).

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Flujo de pago SOI en festivo con comprobante 24/7
- **Alcance:** Pago de planilla un festivo a las 10:40 p. m., un día antes de la fecha límite, con comprobante que separa autorización, fecha efectiva del aporte y dispersión. Se prueba como módulo de 10 minutos dentro de las sesiones del Validador SOI.


**Tamaño de muestra**

- **Entrevistas:** 6
- **Pruebas de usabilidad moderadas:** 8
- **Maze:** 40
- **Encuestas:** 150
- **Detalle:** Análisis de datos internos de pagos PILA por día y hora (intentos fuera de horario, pagos en el último día hábil). 8 pruebas del módulo dentro de las sesiones de C1, 40 en Maze, preguntas en la encuesta SOI compartida y 6 entrevistas: 3 empresas o contadores, 2 administradoras (pensión o salud) y 1 consulta jurídica sobre fecha efectiva.


**Usuarios a incluir**

- Auxiliares de nómina y contadores que pagan cerca de la fecha límite
- Cotizantes independientes
- Áreas de recaudo de 2 administradoras
- Equipo jurídico y de operaciones de ACH y SOI

**Reclutamiento**

Screener de C1 (base SOI) con pregunta adicional de pago cerca del vencimiento; administradoras por relación comercial de SOI.

**Criterios de validación**

- Los datos muestran demanda: ≥5 % de pagos o intentos ocurren fuera de la ventana operativa o en el último día hábil.
- ≥6 de 8 entienden correctamente la fecha efectiva del aporte en el comprobante.
- Jurídica y al menos 1 administradora confirman una ruta viable para reconocer la fecha del pago.

**Guion de entrevista**

1. Cuénteme la última vez que pagó la planilla cerca de la fecha límite. ¿Qué día y a qué hora?
2. ¿Alguna vez no pudo pagar por un festivo, fin de semana o corte de horario? ¿Qué pasó después (intereses, sanción, llamada a la administradora)?
3. [Prototipo] Pagaste el festivo a las 10:40 p. m. ¿Qué entiendes que pasó con tu aporte?
4. ¿Qué tendría que decir el comprobante para que estés tranquilo de que pagaste a tiempo?
5. Administradoras: ¿Cómo tratan hoy un pago autorizado en día no hábil? ¿Qué necesitarían para reconocerlo con esa fecha?
6. Administradoras: ¿Qué cambios operativos implicaría recibir la información con fecha efectiva distinta a la de dispersión?

**Encuesta**

- ¿En qué momento del mes suele pagar la planilla? · Primeros días / Mitad / Último día hábil / Después del vencimiento
- ¿Ha querido pagar en un fin de semana, festivo o de noche y no pudo? · Sí / No
- ¿Ha pagado intereses de mora por eso? · Sí / No / No sé
- Importancia de poder pagar 24/7 · Escala 1-5

**Investigación secundaria — datos**

_Sin información_

**Investigación secundaria — por confirmar**

- Distribución real de pagos PILA por día y hora (dato interno SOI y PSE).
- Interpretación jurídica de «fecha de pago» frente a la fecha de recaudo en los Decretos 780 y 1990 de 2016.
- Cómo operan otros operadores PILA en días no hábiles.

**Prototipos que lo cubren**

- **C4 · Pago PILA 24/7** (Navegable; responsable P14 + P20) — Escritorio (1280 px) y celular (390×844), que es donde se paga fuera de horario. Variantes: ?v=A = comprobante que solo dice «Pago exitoso». ?v=B = comprobante que separa autorización, fecha efectiva del aporte y dispersión a administradoras. Tecla M para el moderador.

## LAB: PSE Internacional / Caso de Uso Comercios

- **ID:** f48
- **Equipo:** LAB
- **Nombre original:** LAB: PSE Internacional / Caso de Uso Comercios
- **Descripción:** Servicio que permite a colombianos residentes en el exterior pagar su crédito de vivienda en Colombia desde su cuenta bancaria en el país de residencia, usando infraestructuras de pago en tiempo real conectadas a la red ACH.
- **Entrega:** jueves 15 de octubre de 2026, 12 m
- **Estado:** Ideación y priorización
- **Priorización:** Priorizada
- **Tipo:** B2B2C
- **Asignado:** Por asignar
- **Audiencia:** Colombianos residentes en el exterior que pagan en Colombia (seguridad social, crédito de vivienda), comercios colombianos y entidades de la Zona Bre-B
- **Urgencia:** Media
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Evolutivo:** Nueva
- **Segmento original:** Empresas; Entidades participantes (Zona Bre-B); Personas (colombianos residentes en el exterior)
- **Validación original:** No
- **Iniciativa nueva (del laboratorio)**

**JTBD**

• El colombiano en el exterior no tiene forma de pagar PILA directamente desde su cuenta bancaria en el país de residencia sin mantener una cuenta activa en Colombia.
• Muchos colombianos en el exterior interrumpen su cotización debido a la dificultad de realizar el pago, perdiendo semanas acumuladas y afectando directamente su derecho a pensión de vejez en Colombia.

**Mercado**

4,7 millones de colombianos viven en el exterior (2024).
2.800.000 colombianos residentes en Estados Unidos.
500.000 colombianos residentes en España.
100.000 colombianos residentes en México.

**Competencia**

Canales de pago desde el exterior (Western Union, tarjeta de crédito) y operadores PILA autorizados en Colombia (Aportes en Línea, Mi Planilla, Enlace Operativo, Simple, Asopagos).

**Correcciones a la fuente**

- Iniciativa del laboratorio priorizada: no está en el archivo de priorización.
- Nivel 1 por tratarse de una ficha interna del laboratorio, sin evidencia externa declarada.
- Plan de validación (hipótesis, muestra, criterios y guion) propuesto como borrador a partir de la ficha del laboratorio; ajustar en el taller de definición.
- La ficha original mezcla el caso de uso: la descripción habla de pagar un crédito de vivienda, pero los trabajos y casos de uso son de seguridad social (PILA). Confirmar cuál es el caso a validar.

### Ficha del laboratorio: LAB: PSE Internacional / Caso de Uso Comercios

- **Segmento:** Empresas; Entidades participantes (Zona Bre-B); Personas (colombianos residentes en el exterior)
- **Evolutivo:** Nueva
- **Objetivo:** 40 % del marketshare de mover dinero

**Descripción**

Servicio que permite a colombianos residentes en el exterior pagar su crédito de vivienda en Colombia desde su cuenta bancaria en el país de residencia, usando infraestructuras de pago en tiempo real conectadas a la red ACH.

**JTBD**

• El colombiano en el exterior no tiene forma de pagar PILA directamente desde su cuenta bancaria en el país de residencia sin mantener una cuenta activa en Colombia.
• Muchos colombianos en el exterior interrumpen su cotización debido a la dificultad de realizar el pago, perdiendo semanas acumuladas y afectando directamente su derecho a pensión de vejez en Colombia.

**Tipos de clientes**

- Empresas: e-commerce, telcos, retail, suscripciones
- Entidades Participantes (Zona Bre-B): entidades financieras, billeteras, Sedpes, fintech, depósitos de bajo monto
- Personas (Colombianos residentes en el exterior)

**Casos de uso**

- Pagos de seguridad social en colombianos que residen en el exterior.

**Normativa**

- Marco regulatorio PIX del Banco Central de Brasil (BCB): requisitos técnicos, de participación y de interoperabilidad para pagos en tiempo real en Brasil.
- Resolución Externa 1 de 2018 del Banco de la República: régimen cambiario aplicable a pagos internacionales originados por personas en el exterior hacia comercios colombianos.
- Regulación de la DIAN sobre facturación electrónica en operaciones de e-commerce con no residentes.

**Mercado**

4,7 millones de colombianos viven en el exterior (2024).
2.800.000 colombianos residentes en Estados Unidos.
500.000 colombianos residentes en España.
100.000 colombianos residentes en México.

**Competencia**

Canales de pago desde el exterior (Western Union, tarjeta de crédito) y operadores PILA autorizados en Colombia (Aportes en Línea, Mi Planilla, Enlace Operativo, Simple, Asopagos).

**Implicaciones**

- Validar la demanda real de pagos de seguridad social desde el exterior.
- Identificar el banco que podría asumir el rol de operador para este esquema.
- Definir el modelo de monetización asociado a la cuenta CUD.
- Precisar qué pagos hoy pueden hacerse con TC desde el exterior y cuáles no.
- Evaluar implicaciones comerciales y de marketing.

**Monetización**

- Comisión fija por transacción de pago de seguridad social desde el exterior, replicando el modelo transaccional de PSE.
- Spread cambiario sobre la conversión de moneda, modelo estándar de Wise y Remitly en pagos internacionales.
- Tarifa de integración con operadores PILA existentes para ampliar la cobertura del esquema.

### Plan de validación

**Hipótesis**

- Los colombianos en el exterior interrumpen su cotización a PILA por no poder pagar desde su cuenta local.
- Pagarían la planilla desde su cuenta en el país de residencia si el costo total es menor que Western Union o tarjeta de crédito.
- Al menos un banco o entidad de la Zona Bre-B está dispuesto a asumir el rol de operador del esquema.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Navegable (C5)
- **Alcance:** Prototipo navegable del pago desde una cuenta en el exterior: elección de PILA o crédito de vivienda, país y banco, cotización con y sin desglose, autorización y comprobante.


**Tamaño de muestra**

- **Entrevistas:** 8
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 0
- **Encuestas:** 100
- **Detalle:** 8 entrevistas: 5 colombianos residentes en EE. UU., España o México que cotizan o han dejado de cotizar a PILA, 2 entidades financieras y 1 operador PILA. Encuesta a residentes en el exterior (n≥100). Más 6 pruebas moderadas del prototipo C5.


**Usuarios a incluir**

- Colombianos residentes en el exterior que cotizan o cotizaron a seguridad social
- Entidades financieras de la Zona Bre-B
- Operadores PILA

**Reclutamiento**

Redes y consulados de colombianos en el exterior, comunidades de migrantes; contactos comerciales de ACH con entidades y operadores PILA.

**Criterios de validación**

- ≥50 % de los residentes encuestados ha tenido dificultad o interrumpido el pago de su seguridad social.
- ≥3 de 5 residentes entrevistados pagarían por este canal si cuesta menos que su alternativa actual.
- Al menos 1 entidad dispuesta a explorar el rol de operador.

**Guion de entrevista**

1. ¿Cómo paga hoy su seguridad social (o su crédito) en Colombia desde el exterior? ¿Qué canal usa y cuánto le cuesta?
2. Cuénteme la última vez que dejó de pagar o se atrasó. ¿Qué pasó y qué consecuencias tuvo?
3. ¿Mantiene una cuenta activa en Colombia? ¿Por qué sí o por qué no?
4. ¿Qué tendría que pasar para que pagara directamente desde su cuenta en el país donde vive?
5. ¿Cuánto estaría dispuesto a pagar de comisión por este servicio?
6. Entidades: ¿qué rol podrían asumir y qué necesitarían para participar?

**Encuesta**

- País de residencia · Opción única
- ¿Cotiza hoy a seguridad social en Colombia? · Sí / No / Dejé de cotizar
- ¿Cómo paga hoy? · Opción múltiple
- ¿Ha dejado de pagar por dificultad con el medio de pago? · Sí / No
- Interés en pagar desde su cuenta local · Escala 1-5

**Investigación secundaria — datos**

- 4,7 millones de colombianos viven en el exterior (2024): 2,8 millones en EE. UU., 500.000 en España y 100.000 en México.

**Investigación secundaria — por confirmar**

- Cuántos de ellos cotizan hoy a PILA.
- Costo real de pagar con Western Union o tarjeta frente a la propuesta.
- Cómo operan otros operadores PILA con residentes en el exterior.

**Prototipos que lo cubren**

- **C5 · PSE Internacional** (Navegable; responsable Por asignar) — Celular (390×844). Variantes: ?v=A = cotización con solo el total en la moneda del usuario. ?v=B = cotización con desglose (comisión, tasa y margen de cambio). En el primer paso el usuario elige qué paga (planilla PILA o cuota de crédito de vivienda), lo que ayuda a resolver cuál es el caso de uso. Tecla M para el moderador.

## SOI: Renovación tecnológica de SOI ( evolucion de Monolito a Microservicios -mejorar la experiencia de soportes y reportes )

- **ID:** f7
- **Número:** 29
- **Equipo:** SOI
- **Descripción:** Modernizar la arquitectura de SOI mediante la migración gradual del monolito actual a microservicios, desacoplando los procesos de liquidación, generación de reportes y gestión de soportes asociados al pago por archivo plano. Esta evolución permitirá escalar y habilitar nuevos casos de uso con mayor agilidad, estabilidad y flexibilidad, al tiempo que mejora la experiencia de los clientes.
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** Habilitador
- **Asignado:** P11 + P12
- **Audiencia:** Empresas aportantes que usan soportes y reportes de SOI; equipo de operación y soporte de ACH
- **Urgencia:** Media
- **Riesgo principal:** Factibilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Valor:** 2.77
- **Complejidad:** 2.13
- **Complejidad (texto):** Alto (6 meses o más)
- **Zona:** P3 · Análisis caso a caso
- **Evolutivo:** Evolutivo
- **Apuesta:** Sostenibilidad
- **Segmento original:** Empresas
- **Validación original:** Sí
- **Evidencia original:** Obsolescencia
- **Comparable:** Renovación Tecnológica

**JTBD**

Cuando requiero gestionar mis obligaciones de Seguridad Social, requiero que SOI pueda incorporar nuevas capacidades de manera rapida, estable, modular, para contar con una experiencia cada vez más confiable y eficiente.

**Mercado**

Habilitador Estrategico: No genera demanda por si mismo, pero permite escalar nuevos productos, integraciones, automatizaciones y experiencias digitales para los clientes.

**Competencia**

Operadores PILA, Plataformas de nominas

**Correcciones a la fuente**

- La evidencia «Obsolescencia» es un motivo técnico interno, no una validación de mercado. Se valida el dolor de experiencia (soportes y reportes), no la arquitectura.

### Plan de validación

**Hipótesis**

- La descarga de soportes y reportes es uno de los 5 motivos principales de contacto al BPO.
- Las empresas pierden tiempo cada mes por reportes lentos, incompletos o en formatos poco útiles.
- Mejorar soportes y reportes reduce contactos de soporte de forma medible.

**Prototipo requerido**

- **Requerimiento:** No
- **Tipo:** No requiere prototipo de arquitectura
- **Alcance:** Opcional: un boceto de la nueva pantalla de reportes para la conversación con usuarios.


**Tamaño de muestra**

- **Entrevistas:** 6
- **Pruebas de usabilidad moderadas:** 0
- **Maze:** 0
- **Encuestas:** 150
- **Detalle:** Análisis de tickets del BPO de los últimos 6 meses + 6 entrevistas con empresas + pregunta corta en la encuesta SOI compartida (n≥150).


**Usuarios a incluir**

- Auxiliares de nómina y contadores de 6 empresas aportantes
- Líderes del BPO y de soporte SOI

**Reclutamiento**

Base SOI; se comparte encuesta y agenda con el Validador de Planilla.

**Criterios de validación**

- Soportes y reportes ≥15 % de los contactos al BPO.
- ≥4 de 6 empresas describen un problema mensual con reportes.
- Se define una línea base (tiempo de generación, tickets) para medir la renovación.

**Guion de entrevista**

1. ¿Qué reportes o soportes descarga de SOI cada mes y para qué los usa?
2. Cuénteme la última vez que un soporte no le sirvió o no lo encontró. ¿Qué hizo?
3. ¿Cuánto tiempo le toma reunir los soportes que le pide su auditor o su área contable?
4. ¿Qué formato o integración le ahorraría más trabajo?
5. ¿Ha considerado cambiar de operador PILA por este tema?

**Encuesta**

- Satisfacción con soportes y reportes · Escala 1-5
- Tiempo mensual dedicado a soportes · Rango
- Formato preferido · Opción múltiple (PDF, Excel, API, integración nómina)

**Investigación secundaria — datos**

- El archivo lo clasifica como habilitador estratégico: no genera demanda por sí mismo.
- Competencia: operadores PILA y plataformas de nómina.

**Investigación secundaria — por confirmar**

- Motivos de contacto del BPO SOI (dato interno).
- Benchmark de reportes en Aportes en Línea y Mi Planilla.

**Prototipos que lo cubren**

- **C1 · Validador de planilla SOI** (Navegable (alta fidelidad); responsable P11 + P12) — Escritorio (1280 px), que es donde se liquida la planilla. Variantes: ?v=actual = mensajes de error como los actuales (código y texto técnico). ?v=nuevo = mensajes con explicación y guía de corrección. Tecla M para el moderador.

## SOI: Autoservicio conversacional (IA para atención)

- **ID:** f8
- **Número:** 36
- **Equipo:** SOI
- **Descripción:** Reemplaza parte del modelo de atención BPO actual —costoso y menos eficiente— con un asistente de IA que resuelve consultas repetitivas y libera al equipo humano para casos complejos.
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** B2C
- **Asignado:** P13
- **Audiencia:** Cotizantes independientes y personas que pagan PILA; también auxiliares de nómina de empresas pequeñas
- **Urgencia:** Alta
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 0 · Sin validación
- **Valor:** 2.71
- **Complejidad:** 2.33
- **Complejidad (texto):** Alto (6 meses o más)
- **Zona:** P3 · Análisis caso a caso
- **Evolutivo:** Nueva
- **Apuesta:** Operativo
- **Segmento original:** Personas
- **Validación original:** No
- **Pendiente:** Validar si los dejamos el operativo o sostenibilidad dependiendo de cuándo generar ahorros
- **Comparable:** Agente IA SOI

**JTBD**

Cuando tengo una duda y/o  necesito resolver una situación relacionada con PILA, quiero recibir orientación y acompañamiento inmediato paso a paso, medienate un asistente conversacional que entienda mi contexto, para resolver de forma autonoma  sin depender de una atncion tradicional y poder escalar a un agente del BPO solo cuando la solicitud sea muy especializada.

**Mercado**

• El modelo de atención BPO actual tiene un costo de $10.000 M/año con valor percibido bajo frente a esa inversión

**Competencia**

• Aportes en Línea (equipo dedicado de comunicación)
• Asistentes conversacionales genéricos

### Plan de validación

**Hipótesis**

- El 60 % o más de las consultas al BPO son repetitivas y se pueden resolver con un asistente.
- Los cotizantes aceptan resolver con un asistente de IA si pueden escalar a una persona.
- El asistente resuelve correctamente ≥70 % de las preguntas frecuentes reales.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Asistente conversacional funcional (Claude) con base de conocimiento PILA
- **Alcance:** Prototipo con las 30 preguntas más frecuentes del BPO como contexto. Se prueba con usuarios reales en sesiones moderadas y en una prueba abierta controlada.


**Tamaño de muestra**

- **Entrevistas:** 0
- **Pruebas de usabilidad moderadas:** 10
- **Maze:** 0
- **Encuestas:** 150
- **Detalle:** Análisis de 500 tickets reales; 10 pruebas moderadas con el asistente (5 independientes, 5 auxiliares de nómina); encuesta n≥150 a usuarios SOI.


**Usuarios a incluir**

- 5 cotizantes independientes
- 5 auxiliares de nómina de empresas pequeñas
- Agentes del BPO (2 sesiones para curar preguntas)

**Reclutamiento**

Usuarios SOI que contactaron al BPO en el último mes; panel Maze.

**Criterios de validación**

- El asistente resuelve ≥7 de 10 tareas sin escalar.
- Confianza en la respuesta ≥4/5 en ≥7 de 10 participantes.
- ≥60 % de los tickets analizados caen en categorías automatizables.

**Guion de entrevista**

1. Cuénteme la última vez que tuvo una duda con su planilla. ¿Cómo la resolvió?
2. ¿Cuánto tardó en obtener respuesta? ¿Quedó resuelta?
3. [Prototipo] Pregúntele al asistente lo que preguntó esa vez. ¿La respuesta le sirve?
4. ¿Qué le haría confiar o desconfiar de esta respuesta?
5. ¿En qué momento querría hablar con una persona?
6. ¿Dónde esperaría encontrar este asistente: en SOI, en WhatsApp, en otro canal?

**Encuesta**

- ¿Cuántas veces contactó a soporte SOI en los últimos 6 meses? · 0 / 1 / 2-3 / más de 3
- Motivo del último contacto · Opción múltiple
- Satisfacción con la respuesta recibida · Escala 1-5
- ¿Usaría un asistente automático disponible 24/7? · Escala 1-5
- Canal preferido · SOI web / WhatsApp / Teléfono / Correo

**Investigación secundaria — datos**

- El modelo BPO actual cuesta $10.000 millones al año con valor percibido bajo (archivo de priorización).
- Competencia: Aportes en Línea (equipo dedicado de comunicación) y asistentes genéricos.

**Investigación secundaria — por confirmar**

- Distribución de motivos de contacto (dato interno BPO).
- Tasa de contención de asistentes de IA en servicios de seguridad social.

**Prototipos que lo cubren**

- **C2 · Asistente PILA** (Funcional; responsable P13 (+ apoyo P20)) — Mobile-first (390×844) y escritorio; widget de chat dentro de una página SOI ficticia. Variantes: Motor de respuestas configurable: ?motor=mago (Mago de Oz: el moderador responde desde una segunda pestaña abierta con ?panel=moderador, comunicada con BroadcastChannel) o ?motor=api (llamada a un endpoint propio que conecta con la API de Claude; nunca pongas una clave de API en el HTML). Por defecto, ?motor=mago.

## SOI: Validador de Planilla SOI – evolución funcional

- **ID:** f12
- **Número:** 43
- **Equipo:** SOI
- **Descripción:** Evolucionar el Validador de Planilla SOI para ofrecer una experiencia integral que permita generar, cargar, revisar y corregir la información de la planilla de seguridad social antes de realizar el pago. La solución identificará inconsistencias y presentará mensajes claros con orientación para solucionarlas, reduciendo errores, tiempos operativos y reprocesos, y brindando a los clientes mayor confianza y tranquilidad durante la preparación y el pago de una planilla confiable.
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** B2B
- **Asignado:** P11 + P12
- **Audiencia:** Auxiliares de nómina, contadores y analistas de seguridad social en empresas aportantes
- **Urgencia:** Baja
- **Riesgo principal:** Usabilidad
- **Nivel de evidencia:** 4 · Investigación con usuarios
- **Valor:** 2.59
- **Complejidad:** 2.16
- **Complejidad (texto):** Alto (6 meses o más)
- **Zona:** P3 · Análisis caso a caso
- **Evolutivo:** Evolutivo
- **Apuesta:** Sostenibilidad
- **Segmento original:** Empresas
- **Validación original:** Sí
- **Evidencia original:** UX - ICESI - Empresas
- **Comparable:** Corrección de errores - Autocorrector

**JTBD**

Cuando estoy preparando una planilla de seguridad social y necesito asegurar que la informción este correcta antes de realizar mi pago de la planilla, quiero contar con una experiencia que me permita generar, cargar, validar, y corregir la información, entendiendo claramente los errores y como solucionarlos, para reducir mis procesos operativos y llegar al pago con una Planilla Confiable y un  porceso que me generó tranquilidad.

**Mercado**

• Mercado de muy alto potencial, con alcance transversal entre empresas, contadores y demás usuarios que generan planillas, especialmente clientes recurrentes, organizaciones con procesos mensuales, operaciones de alto volumen y ecosistemas de nómina heterogéneos. La adaptación permanente a cambios normativos aumenta el valor de una solución que evolucione desde la generación y validación hacia la automatización, integración y control operativo continuo.

**Competencia**

Competencia potencial de operadores PILA, plataformas de nómina, ERP y soluciones de automatizaciónlas

### Plan de validación

**Hipótesis**

- Los mensajes de error con instrucciones de corrección reducen a la mitad el tiempo de corrección.
- Los usuarios prefieren corregir dentro de SOI en vez de volver a su software de nómina.
- La validación previa al pago aumenta la confianza en la planilla.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Prototipo de alta fidelidad (Figma + Maze)
- **Alcance:** Carga de planilla con 5 errores típicos, mensajes con guía de corrección y confirmación de planilla confiable.


**Tamaño de muestra**

- **Entrevistas:** 0
- **Pruebas de usabilidad moderadas:** 8
- **Maze:** 50
- **Encuestas:** 150
- **Detalle:** 8 pruebas moderadas (iteración del prototipo existente), 50 en Maze y la encuesta SOI compartida.


**Usuarios a incluir**

- Auxiliares de nómina de empresas con más de 50 empleados
- Contadores que liquidan varias empresas

**Reclutamiento**

Participantes del estudio UX ICESI–Empresas que aceptaron recontacto; base SOI.

**Criterios de validación**

- Tasa de éxito ≥80 % en corregir los 5 errores.
- Tiempo promedio de corrección menor que la línea base del estudio UX ICESI.
- SUS ≥75.

**Guion de entrevista**

1. Cuénteme qué hizo la última vez que SOI le rechazó una planilla.
2. [Prototipo] Cargue esta planilla y corrija los errores. Piense en voz alta.
3. ¿El mensaje le dijo qué hacer? ¿Qué cambiaría del texto?
4. ¿Corregiría aquí o en su software de nómina? ¿Por qué?
5. ¿Qué le haría sentir que la planilla quedó lista para pagar?

**Encuesta**

- Errores más frecuentes al liquidar · Opción múltiple
- Tiempo promedio en corregir una planilla rechazada · Rango
- Satisfacción con mensajes de error actuales · Escala 1-5

**Investigación secundaria — datos**

- Ya existe investigación directa con empresas (UX ICESI), por eso tiene el nivel más alto del portafolio.
- Competencia: operadores PILA, plataformas de nómina, ERP y automatización.

**Investigación secundaria — por confirmar**

- Hallazgos del estudio UX ICESI–Empresas para fijar la línea base.

**Prototipos que lo cubren**

- **C1 · Validador de planilla SOI** (Navegable (alta fidelidad); responsable P11 + P12) — Escritorio (1280 px), que es donde se liquida la planilla. Variantes: ?v=actual = mensajes de error como los actuales (código y texto técnico). ?v=nuevo = mensajes con explicación y guía de corrección. Tecla M para el moderador.

---

# Célula D · Entidades: datos y Open Finance

- **Personas:** P15–P17
- **Líder:** P15
- **Nota:** Sesiones conjuntas de 90 minutos con cada EF para los dos Hubs, Modelos analíticos y las preguntas B2B2C de PFM. P17 y P20 llevan las pruebas de PFM con personas.

## LAB: Open Banking Integrado / PFM

- **ID:** f17
- **Equipo:** LAB
- **Nombre original:** LAB: Iniciativa 2 2027
- **Descripción:** Plataforma que permite al usuario consolidar en un único lugar la información de cuentas y productos financieros que mantiene en distintas entidades, utilizando las capacidades de Finanzas Abiertas. Con autorización del usuario, la solución podría mostrar saldos, movimientos, obligaciones, categorías de gasto y tendencias, y evolucionar hacia alertas, recomendaciones y servicios financieros personalizados.
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Sin estado
- **Priorización:** No priorizada
- **Tipo:** B2B2C
- **Asignado:** P17 + P20
- **Audiencia:** Personas con productos en varias entidades; bancos pequeños, cooperativas, SEDPEs y billeteras que ofrecerían PFM bajo su marca
- **Urgencia:** Media
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 2 · Secundaria
- **Evolutivo:** Nueva
- **Apuesta:** Inteligencia Financiera
- **Segmento original:** Personas; Entidades
- **Validación original:** No

**JTBD**

• Información financiera fragmentada entre varias entidades.
• Necesidad de entrar a diferentes aplicaciones para entender la situación financiera completa.
• Baja capacidad del usuario para identificar patrones de gasto.
• Dificultad para llevar seguimiento consolidado de obligaciones.

**Mercado**

A cierre de 2024 había 37,1 millones de adultos con al menos un producto de depósito, equivalentes al 95,8 % de los adultos en Colombia (ficha del laboratorio).

**Competencia**

Finerio Connect (infraestructura latinoamericana de Open Finance); Belvo (APIs de Open Finance y enriquecimiento de datos). Otros actores: plataformas PFM propias de bancos colombianos y fintechs que desarrollen agregación sobre el esquema obligatorio de Finanzas Abiertas.

**Correcciones a la fuente**

- Reemplaza el placeholder «LAB: Iniciativa 2 2027» con la ficha del laboratorio.
- La ficha aporta investigación secundaria: nivel 2.
- Se solapa con los Hubs de Open Finance (Proveedor y Receptor): se valida en la misma agenda de entidades.

### Ficha del laboratorio: LAB: Open Banking Integrado / PFM

- **Segmento:** Personas; Entidades
- **Apuesta:** Inteligencia Financiera
- **Evolutivo:** Nueva
- **Objetivo:** Ampliar la oferta de valor

**Descripción**

Plataforma que permite al usuario consolidar en un único lugar la información de cuentas y productos financieros que mantiene en distintas entidades, utilizando las capacidades de Finanzas Abiertas. Con autorización del usuario, la solución podría mostrar saldos, movimientos, obligaciones, categorías de gasto y tendencias, y evolucionar hacia alertas, recomendaciones y servicios financieros personalizados.

**JTBD**

• Información financiera fragmentada entre varias entidades.
• Necesidad de entrar a diferentes aplicaciones para entender la situación financiera completa.
• Baja capacidad del usuario para identificar patrones de gasto.
• Dificultad para llevar seguimiento consolidado de obligaciones.

**Casos de uso**

- Consolidación de cuentas de ahorro y depósitos.
- Vista unificada de movimientos.
- Categorización de gastos.
- Seguimiento de tarjetas y créditos.

**Normativa**

- Decreto 1297 de 2022: incorporó la regulación de Finanzas Abiertas al Decreto 2555 de 2010.
- Circular Externa 004 de 2024 de la SFC: estándares tecnológicos, de seguridad, consentimiento e intercambio de información para Finanzas Abiertas.

**Mercado**

A cierre de 2024 había 37,1 millones de adultos con al menos un producto de depósito, equivalentes al 95,8 % de los adultos en Colombia (ficha del laboratorio).

**Competencia**

Finerio Connect (infraestructura latinoamericana de Open Finance); Belvo (APIs de Open Finance y enriquecimiento de datos). Otros actores: plataformas PFM propias de bancos colombianos y fintechs que desarrollen agregación sobre el esquema obligatorio de Finanzas Abiertas.

**Implicaciones**

- Definir si ACH será tercero receptor de datos, proveedor de infraestructura o ambos.
- Diseñar consentimiento granular.
- Gestión de revocatoria y eliminación de autorizaciones.
- Estándares de seguridad y certificación.
- Responsabilidad ante datos desactualizados.

**Monetización**

- Modelo freemium B2C.
- Suscripción por funcionalidades avanzadas.
- Licenciamiento B2B2C a bancos.
- Cobro por API o usuario conectado.

### Plan de validación

**Hipótesis**

- Las personas con productos en 2 o más entidades quieren una vista consolidada y conectarían al menos 2 cuentas.
- Confían más en conectar sus cuentas desde la app de su propia entidad (B2B2C) que desde una app de ACH o de un tercero.
- Cooperativas y SEDPEs pagarían por ofrecer PFM bajo su marca en lugar de construirlo.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** App PFM navegable con consentimiento granular
- **Alcance:** Conectar cuentas de 3 entidades ficticias con consentimiento por tipo de dato, vista consolidada, movimientos categorizados, obligaciones y revocación. Dos variantes de canal: app propia de ACH y dentro de la app de una cooperativa.


**Tamaño de muestra**

- **Entrevistas:** 4
- **Pruebas de usabilidad moderadas:** 8
- **Maze:** 60
- **Encuestas:** 200
- **Detalle:** 8 pruebas moderadas, 60 en Maze (30 por variante de canal), preguntas en la encuesta PSE compartida y 4 entrevistas B2B2C (2 cooperativas, 1 SEDPE o billetera, 1 banco pequeño) en la agenda de la célula D.


**Usuarios a incluir**

- Personas con cuentas o créditos en 2 o más entidades
- Gerentes de producto digital de cooperativas, SEDPEs y bancos pequeños

**Reclutamiento**

Panel Maze filtrado por multibancarización; EF de la agenda de la célula D.

**Criterios de validación**

- ≥60 % conecta al menos 2 cuentas en Maze.
- Diferencia de confianza ≥0,5 puntos entre canales que indique el modelo preferido.
- ≥2 de 4 entidades interesadas en licenciar PFM bajo su marca.

**Guion de entrevista**

1. ¿En cuántas entidades tiene cuentas, tarjetas o créditos? ¿Cómo sabe cuánto tiene y cuánto debe en total?
2. Cuénteme la última vez que se le pasó un pago o se llevó una sorpresa con un gasto.
3. [Prototipo] Conecte sus cuentas. ¿Qué datos está autorizando compartir y por cuánto tiempo?
4. ¿Le da más confianza hacerlo desde la app de su banco o cooperativa, o desde una app independiente? ¿Por qué?
5. ¿Qué tendría que pasar para que la usara cada semana?
6. Entidades: ¿Tienen hoy una función de finanzas personales? ¿Qué les impide ofrecerla?
7. Entidades: ¿Cómo esperarían pagar por ella: licencia, por usuario conectado, ingreso compartido?

**Encuesta**

- ¿En cuántas entidades tiene productos financieros? · 1 / 2 / 3 o más
- Interés en ver todas sus cuentas en un solo lugar · Escala 1-5
- ¿Desde dónde preferiría conectarlas? · App de mi banco / App independiente / Me da igual
- ¿Pagaría por funciones avanzadas (alertas, presupuestos)? · Sí / No / Depende del precio

**Investigación secundaria — datos**

- El Decreto 0368 de 2026 hace obligatoria la participación de las entidades vigiladas en Finanzas Abiertas [S4].

**Investigación secundaria — por confirmar**

- Adopción de funciones PFM en apps bancarias colombianas.
- Modelos de precio B2B2C de PFM en la región.

**Prototipos que lo cubren**

- **D5 · PFM consolidado** (Navegable; responsable P17 + P20) — Mobile-first (390×844) dentro de un marco de teléfono. Variantes: ?canal=ach (app independiente «Mis Finanzas ACH») o ?canal=coop (función «Mis finanzas» dentro de la app ficticia de Cooperativa Valle Unido). Tecla M para el moderador.

## Onboarding - Vinculación Ágil ACH

- **ID:** f46
- **Equipo:** TRV
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Ideación y priorización
- **Tipo:** B2B
- **Asignado:** P17
- **Audiencia:** Equipos de vinculación y tecnología de EF y comercios que se conectan a servicios ACH
- **Urgencia:** Media
- **Riesgo principal:** Usabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Complejidad (texto):** Alta
- **Segmento original:** Empresas, Entidades
- **Validación original:** Sí

**JTBD**

Cuando una EF o comercio inicia su vinculación y necesita quedar habilitado en las capacidades dispuestas por ACH, Quiero Completar el registro, las validaciones y la configuración mediante un flujo digital y autonomo integrado Disminuir fricción, tiempos de espera y reprocesos durante la vinculación para hacer uso de los servicios de ACH

**Correcciones a la fuente**

- Marcada como validada sin tipo declarado.
- Faltan evolutivo, apuesta estratégica, valor y complejidad.

### Plan de validación

**Hipótesis**

- La vinculación actual toma semanas y la mayor demora está en validaciones documentales y técnicas.
- Un flujo digital autónomo reduce el tiempo de vinculación a la mitad.
- Los comercios pequeños abandonan la vinculación por falta de acompañamiento.

**Prototipo requerido**

- **Requerimiento:** Sí
- **Tipo:** Prototipo navegable del portal de vinculación
- **Alcance:** Registro, carga de documentos, estado de validación y configuración técnica (credenciales de prueba).


**Tamaño de muestra**

- **Entrevistas:** 6
- **Pruebas de usabilidad moderadas:** 6
- **Maze:** 0
- **Encuestas:** 0
- **Detalle:** 6 entrevistas con prueba del prototipo en la misma sesión (3 EF, 3 comercios recién vinculados) + mapa del proceso interno con el equipo de vinculación.


**Usuarios a incluir**

- Responsables de vinculación en 3 EF
- 3 comercios vinculados en los últimos 6 meses
- Equipo interno de vinculación ACH

**Reclutamiento**

Base de vinculaciones recientes de ACH.

**Criterios de validación**

- Se identifica el paso que más tarda con datos.
- ≥5 de 6 completan el prototipo sin ayuda.
- ≥4 de 6 califican la propuesta con ≥4/5.

**Guion de entrevista**

1. Cuénteme cómo fue su vinculación con ACH, paso a paso.
2. ¿Dónde se demoró más y por qué?
3. ¿Qué hicieron mientras esperaban?
4. [Prototipo] Complete la vinculación. ¿Qué le falta?
5. ¿Qué información de estado le habría ahorrado llamadas o correos?

**Encuesta**

- Duración de la vinculación · Rango
- Satisfacción · Escala 1-5
- Paso más difícil · Opción única

**Investigación secundaria — datos**

- Dato interno pendiente: tiempos de vinculación actuales.

**Investigación secundaria — por confirmar**

- Benchmark de onboarding digital en Stripe, Kushki y Wompi.

**Prototipos que lo cubren**

- **D1 · Portal de vinculación ACH** (Navegable; responsable P17) — Escritorio (1280 px) adaptable a tableta. Variantes: ?actor=ef (entidad financiera) o ?actor=comercio. Cambian documentos requeridos y pasos técnicos.

## SI: Hub de Open Finance - Proveedor de Datos

- **ID:** f9
- **Número:** 37
- **Equipo:** SI
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Discovery/Diseño
- **Tipo:** B2B
- **Asignado:** P15 + P16
- **Audiencia:** Entidades vigiladas obligadas a compartir datos bajo el Decreto 0368 de 2026 (áreas de tecnología, cumplimiento y producto)
- **Urgencia:** Alta
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Valor:** 2.7
- **Complejidad:** 2.96
- **Complejidad (texto):** Alto (6 meses o más)
- **Zona:** P3 · Análisis caso a caso
- **Evolutivo:** Nueva
- **Apuesta:** OF
- **Segmento original:** Entidades
- **Validación original:** Sí

**JTBD**

Cuando mi cliente autoriza compartir su información con un tercero, quiero cumplir esa autorización de forma segura, trazable y dentro del estándar regulatorio vigente, de esta manera darle el control a mi cliente real sobre su información.

**Mercado**

Todas las entidades financieras vigiladas obligadas a participar en el esquema de Finanzas Abiertas bajo el Decreto 0368 de 2026 — mercado de adopción obligatoria, no opcional.

**Competencia**

Credibanco ya lanzó su propio hub de Open Finance/Open Data en alianza con Sensedia (ago. 2024, pero fue lanzamiento aún no tienen nada en producción ni finalizado), con registro de participantes y APIs de agregación y consentimiento — el competidor directo más avanzado en habilitación de hub en Colombia. Redeban anunció una alianza con Capgemini (sept. 2024) para construir capacidades de Open Finance, sin producto en producción confirmado aún. Bancolombia ya opera agregación de datos abierta con Finerio Connect (México) como socio tecnológico — no con Ozone, como se asumía antes.

**Correcciones a la fuente**

- Marcada como validada, sin tipo de validación declarado. Se asigna nivel 1 hasta documentar la evidencia.

### Plan de validación

**Hipótesis**

- Las EF medianas y pequeñas prefieren tercerizar el cumplimiento como proveedor de datos antes que construirlo.
- ACH es preferido sobre Credibanco o Redeban por su neutralidad y su rol actual en el ecosistema.
- El plazo regulatorio crea urgencia de compra en 2027.

**Prototipo requerido**

- **Requerimiento:** Ligero
- **Tipo:** Blueprint de servicio + ficha de oferta
- **Alcance:** Diagrama de cómo ACH expone las APIs y gestiona consentimiento por la EF, con tiempos de implementación y modelo de precio tentativo.


**Tamaño de muestra**

- **Entrevistas:** 8
- **Pruebas de usabilidad moderadas:** 0
- **Maze:** 0
- **Encuestas:** 0
- **Detalle:** 8 entrevistas con EF: 3 bancos medianos, 3 cooperativas o compañías de financiamiento, 2 neobancos.


**Usuarios a incluir**

- Gerentes de tecnología o arquitectura
- Oficiales de cumplimiento
- Líderes de producto digital

**Reclutamiento**

EF participantes de ACH; se agenda en sesión conjunta con el Hub Receptor.

**Criterios de validación**

- ≥5 de 8 EF no tienen hoy un plan definido para cumplir como proveedor.
- ≥4 consideran a ACH como opción principal.
- ≥2 piden propuesta comercial antes de fin de año.

**Guion de entrevista**

1. ¿Cómo se están preparando para cumplir el Decreto 0368 como proveedores de datos?
2. ¿Qué parte piensan construir, comprar o tercerizar? ¿Por qué?
3. ¿A qué otros proveedores están evaluando (Credibanco, Redeban, otros)?
4. [Mostrar blueprint] ¿Qué le genera dudas de este modelo?
5. ¿Qué tendría que ser cierto para elegir a ACH?
6. ¿Qué presupuesto y qué fechas tienen previstas?

**Encuesta**

- Estado de preparación para Finanzas Abiertas · Escala 1-5
- Decisión: construir / comprar / tercerizar / no definido · Opción única
- Proveedores evaluados · Opción múltiple

**Investigación secundaria — datos**

- El Decreto 0368 (7 abr. 2026) hace obligatoria la participación de las entidades vigiladas como proveedoras y receptoras de datos; la SFC debe publicar un cronograma de estandarización en máximo 6 meses [S4].
- ACH espera tener una oferta de finanzas abiertas a finales de 2026 [S2].
- Credibanco lanzó un hub con Sensedia (2024) y Redeban anunció alianza con Capgemini (archivo de priorización).

**Investigación secundaria — por confirmar**

- Cronograma de estandarización publicado por la SFC.
- Precios de hubs en Brasil y Reino Unido.

**Prototipos que lo cubren**

- **D2 · Blueprint Hub Open Finance · Proveedor** (Ligero; responsable P15 + P16) — Escritorio (1280 px), documento interactivo para mostrar en entrevista. Variantes: Selector de tipo de entidad (banco mediano, cooperativa, neobanco) que ajusta tiempos y precios de ejemplo.

## SI:Modelos Analiticos

- **ID:** f11
- **Número:** 40
- **Equipo:** SI
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Desarrollo y Pruebas
- **Tipo:** B2B
- **Asignado:** P15 + P16
- **Audiencia:** Áreas de riesgo de crédito y analítica de EF, cooperativas y fintechs de crédito
- **Urgencia:** Alta
- **Riesgo principal:** Deseabilidad
- **Nivel de evidencia:** 0 · Sin validación
- **Valor:** 2.67
- **Complejidad:** 2.26
- **Complejidad (texto):** Medio (3-6 Meses)
- **Zona:** P3 · Análisis caso a caso
- **Evolutivo:** Nueva
- **Apuesta:** Inteligencia Financiera
- **Segmento original:** Empresas; Entidades
- **Validación original:** No
- **Pendiente:** Abrir los modelo analíticos por familias
- **Comparable:** Modelo Capacidad de Endeudamiento

**JTBD**

Cuando necesito decidir qué ofrecerle a un cliente, quiero conocer su verdadera situación financiera, de forma confiable y a tiempo, para poder ofrecerle la oportunidad que realmente puede aprovechar y se ajusta a sus necesidades.

**Mercado**

Solo 35,5% de los colombianos tiene acceso a crédito formal — la población informal/independiente sin ingreso declarado es un segmento amplio y hoy subatendido.

**Competencia**

Belvo + Banco Azteca (México) confirmaron superar 6 millones de verificaciones de ingreso mediante originación digital con datos abiertos (24-oct-2025), sobre una base de 23M+ clientes digitales de Banco Azteca — el referente regional más avanzado y con métrica pública verificada para este caso. El marco de Account Aggregators de India integra datos de seguridad social (EPFO) y tributarios (GST/CBDT) con el mismo fin de cash-flow lending. Mareigua es la referencia local histórica en scoring alternativo, aunque su actividad reciente (2024-2026) no pudo verificarse.

**Correcciones a la fuente**

- Está en «Desarrollo y Pruebas» sin validación. Riesgo alto.
- El pendiente indica abrir los modelos por familias: se valida por familia (capacidad de pago, ingreso estimado, flujo de caja).

### Plan de validación

**Hipótesis**

- Las EF usarían un indicador de capacidad de pago basado en flujos transaccionales para personas sin ingreso declarado.
- La familia de mayor valor es «ingreso estimado» para independientes e informales.
- Las EF pagan por consulta si el modelo mejora su tasa de aprobación sin aumentar la mora.

**Prototipo requerido**

- **Requerimiento:** Ligero
- **Tipo:** Ficha de resultado de modelo
- **Alcance:** Ejemplo de respuesta de API y reporte de una persona ficticia: ingreso estimado, estabilidad, capacidad de pago y nivel de confianza.


**Tamaño de muestra**

- **Entrevistas:** 7
- **Pruebas de usabilidad moderadas:** 0
- **Maze:** 0
- **Encuestas:** 0
- **Detalle:** 7 entrevistas: 3 bancos, 2 cooperativas, 2 fintechs de crédito; incluye un ejercicio de priorización de familias de modelos.


**Usuarios a incluir**

- Gerentes de riesgo de crédito
- Líderes de analítica y originación digital

**Reclutamiento**

EF participantes; fintechs que usan PSE; sesión conjunta con los Hubs de Open Finance.

**Criterios de validación**

- ≥4 de 7 eligen la misma familia como prioridad.
- ≥3 aceptan una prueba retrospectiva con su propia cartera.
- Se define una métrica de éxito (mejora de aprobación o de mora) aceptada por las EF.

**Guion de entrevista**

1. ¿Cómo evalúan hoy a solicitantes sin ingreso formal declarado?
2. ¿Qué porcentaje de solicitudes rechazan por falta de información?
3. [Mostrar ficha] ¿Qué decisión tomarían con esta información?
4. ¿Qué nivel de explicabilidad necesita su área de riesgo y el regulador?
5. Ordene estas familias de modelos según su valor para ustedes.
6. ¿Aceptarían una prueba retrospectiva con datos de su cartera?

**Encuesta**

- Familia de modelo prioritaria · Ranking
- % de rechazos por falta de información · Rango
- Modelo de cobro preferido · Por consulta / Suscripción / Por crédito aprobado

**Investigación secundaria — datos**

- Solo el 35,5 % de los colombianos tiene acceso a crédito formal (archivo de priorización).
- Belvo y Banco Azteca superaron 6 millones de verificaciones de ingreso con datos abiertos (oct. 2025, archivo de priorización).

**Investigación secundaria — por confirmar**

- Proveedores locales de scoring alternativo activos en 2026.
- Requisitos de la SFC sobre modelos de riesgo con datos alternativos.

**Prototipos que lo cubren**

- **D4 · Ficha de resultado de modelo analítico** (Ligero; responsable P15 + P16) — Escritorio (1280 px). Variantes: Pestañas por familia de modelo: Ingreso estimado, Capacidad de pago, Flujo de caja, Estabilidad transaccional.

## SI: Hub de Open Finance - Receptor de Datos

- **ID:** f13
- **Número:** 47
- **Equipo:** SI
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Desarrollo y Pruebas
- **Tipo:** B2B
- **Asignado:** P15 + P16
- **Audiencia:** Fintechs, entidades no vigiladas, pasarelas y EF que quieren consumir datos de terceros con consentimiento
- **Urgencia:** Alta
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Valor:** 2.55
- **Complejidad:** 2.81
- **Complejidad (texto):** Alto (6 meses o más)
- **Zona:** P3 · Análisis caso a caso
- **Evolutivo:** Nueva
- **Apuesta:** OF
- **Segmento original:** Empresas
- **Validación original:** Sí

**JTBD**

Cuando mi cliente autoriza compartir su información financiera de otras entidades conmigo, quiero acceder a ella de foma segura, estandarizada y confiable, para poder conocer su situación financiera completa, y así ofecer la oportunidad que realmente pueda aprovechar.

**Mercado**

Entidades no vigiladas, fintechs y pasarelas que buscan enriquecer su oferta con datos de terceros bajo consentimiento — mercado que crece a medida que madura el registro de participantes de Open Finance en el país.

**Competencia**

Belvo ya opera como receptor/agregador de datos en Colombia: firmó un acuerdo directo de API con Nequi (feb. 2024) bajo la Circular 004 de 2024 y ya conectaba 10+ entidades colombianas al anunciarlo; levantó US$15M (abr. 2025) para escalar su plataforma. Internacionalmente, Plaid, Yapily (alianza con Adyen, feb. 2025) y Finicity (adquirida por Mastercard, US$825M) son los agregadores/receptores de referencia global.

**Correcciones a la fuente**

- Marcada como validada sin tipo declarado.
- Está en «Desarrollo y Pruebas» con nivel 1.

### Plan de validación

**Hipótesis**

- Las fintechs prefieren un único punto de conexión regulado frente a integrar entidad por entidad o usar agregadores privados.
- El valor diferencial de ACH frente a Belvo es la cobertura y el respaldo regulatorio.
- Los receptores pagarían por consulta a un precio competitivo con los agregadores.

**Prototipo requerido**

- **Requerimiento:** Ligero
- **Tipo:** Portal de desarrolladores simulado
- **Alcance:** Página de documentación de API con un caso de uso (consulta de saldos y movimientos), flujo de consentimiento y precios tentativos.


**Tamaño de muestra**

- **Entrevistas:** 7
- **Pruebas de usabilidad moderadas:** 0
- **Maze:** 0
- **Encuestas:** 0
- **Detalle:** 7 entrevistas: 4 fintechs de crédito o pagos, 2 pasarelas, 1 EF que quiere ser receptora.


**Usuarios a incluir**

- CTO o líderes de producto de fintechs
- Responsables de datos en pasarelas

**Reclutamiento**

Colombia Fintech; comercios PSE que son fintechs.

**Criterios de validación**

- ≥4 de 7 usan o evaluaron un agregador y conocen su costo.
- ≥3 ven ventaja clara en ACH.
- ≥2 aceptan participar en un piloto.

**Guion de entrevista**

1. ¿Qué datos de otras entidades necesitan hoy y cómo los obtienen?
2. ¿Usan agregadores como Belvo? ¿Qué les funciona y qué no?
3. ¿Cuánto pagan por consulta o conexión?
4. [Mostrar portal] ¿Qué le falta para integrarse en un sprint?
5. ¿Qué peso tiene el respaldo regulatorio en su decisión?

**Encuesta**

- Fuente actual de datos de terceros · Opción múltiple
- Costo por consulta · Rango
- Interés en piloto · Sí / No

**Investigación secundaria — datos**

- Belvo firmó acuerdo de API con Nequi (feb. 2024) y conecta más de 10 entidades colombianas (archivo de priorización).
- El Decreto 0368 permite a terceros no vigilados participar de forma voluntaria [S4].

**Investigación secundaria — por confirmar**

- Precios de Belvo y otros agregadores en Colombia.

**Prototipos que lo cubren**

- **D3 · Portal de desarrolladores Hub · Receptor** (Ligero; responsable P15 + P16) — Escritorio (1280 px), estilo portal de desarrolladores. Variantes: Una sola variante.

---

# Célula E · Seguridad del ecosistema

- **Personas:** P18–P19
- **Líder:** P18
- **Nota:** Agenda única con las áreas de fraude de las EF para ambas iniciativas, más las 3 entrevistas de autenticación (A4). P19 dedica parte de la semana a B4.

## SEG: Motor de grafos antifraude cross-banco

- **ID:** f4
- **Equipo:** SEG
- **Nombre original:** SEG:
- **Descripción:** Motor de grafos que corre sobre los datos que YA pasan por ACH (no requiere que las EF compartan nada nuevo), detectando patrones de red: una cuenta que recibe montos similares de decenas de orígenes distintos y los retira rápido; un conjunto de cuentas que rotan dinero en ciclos; nodos que aparecen en fraude confirmado en un banco y ya tienen actividad sospechosa en otro. Esto es exactamente la capacidad de Feedzai que hoy nadie está monetizando de forma cross-banco (la "Visualización de redes/grafos de fraude" priorizada en Plus es solo la capa de visualización — aquí se propone el motor analítico que la alimenta a escala ecosistema). Desde la perspectiva de fraude y laft. Tx cercanas a las carceles, actividades de alto riesgo (temporada electoral)
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Sin estado
- **Tipo:** B2B
- **Asignado:** P18 + P19
- **Audiencia:** Áreas de fraude y LAFT de las EF; potencialmente UIAF como aliado
- **Urgencia:** Media
- **Riesgo principal:** Factibilidad
- **Nivel de evidencia:** 2 · Secundaria
- **Evolutivo:** Nueva
- **Validación original:** Sí
- **Evidencia original:** Observatorio de Tendencias

**JTBD**

Cuando a una entidad le hacen un fraude y ese dinero va a una cuenta en la que ya han aparecido multiples transacciones parecidas que resultan ser fraude, quiero identificar estas correlaciones para prevenir fraudes futuros basados en grafos cross-banco

**Correcciones a la fuente**

- La fila no tiene nombre; se nombró provisionalmente por su descripción.
- Faltan valor, complejidad, segmento, apuesta y estado.

### Plan de validación

**Hipótesis**

- Los datos que ya pasan por ACH bastan para detectar patrones de mulas y ciclos con una precisión útil (sin datos nuevos de las EF).
- Las EF valoran una alerta de red cross-banco más que la visualización sola.
- Es legal y aceptable para las EF que ACH genere alertas con datos de varias entidades.

**Prototipo requerido**

- **Requerimiento:** Ligero
- **Tipo:** Prueba de datos + reporte de alerta simulado
- **Alcance:** Análisis exploratorio sobre una muestra anonimizada de transacciones ACH para encontrar 3 patrones reales (cuenta embudo, ciclos, nodos repetidos) y un reporte de alerta de ejemplo.


**Tamaño de muestra**

- **Entrevistas:** 6
- **Pruebas de usabilidad moderadas:** 0
- **Maze:** 0
- **Encuestas:** 0
- **Detalle:** 1 prueba de datos interna (2 días) + 6 entrevistas con EF, que se pueden combinar con las de Feedzai.


**Usuarios a incluir**

- Directores de fraude y oficiales LAFT de 6 EF
- Equipo legal y de datos de ACH (validación interna de uso de datos)

**Reclutamiento**

Las mismas EF de la iniciativa Feedzai; agenda conjunta de 90 minutos.

**Criterios de validación**

- La prueba de datos encuentra ≥3 patrones que el equipo de fraude de ACH considera accionables.
- ≥4 de 6 EF califican la alerta con ≥4/5 en utilidad.
- Legal no identifica impedimentos de uso de datos.

**Guion de entrevista**

1. ¿Cómo detectan hoy cuentas mula que reciben dinero de varias entidades?
2. ¿Cuántas veces ha pasado que la cuenta destino de un fraude ya tenía antecedentes en otra entidad?
3. [Mostrar alerta] ¿Qué harían con esta alerta en las primeras 2 horas?
4. ¿Qué tasa de falsos positivos podrían tolerar antes de dejar de usarla?
5. ¿Qué restricciones legales o de reputación ven en recibir alertas basadas en datos de otras entidades?
6. ¿Pagarían por esto aparte o lo esperan incluido en el servicio de fraude?

**Encuesta**

- Utilidad de la alerta de red · Escala 1-5
- Tolerancia a falsos positivos · Opción múltiple
- ¿Recibirían alertas en tiempo real vía API? · Sí / No

**Investigación secundaria — datos**

- El Observatorio de Tendencias es la evidencia actual (nivel 2).
- Las estafas en compras en línea (34,5 %) y el fraude digital (26,7 %) concentran los casos reportados en 2025 [S3].
- Referentes de detección de mulas a nivel de red: Mastercard Consumer Fraud Risk (Reino Unido) y los marcadores de fraude del directorio del Pix (Brasil).

**Investigación secundaria — por confirmar**

- Lineamientos de la UIAF y SFC sobre analítica de red entre entidades.
- Tasa de mulas en pagos inmediatos en la región.

**Prototipos que lo cubren**

- **E2 · Alerta de red antifraude** (Ligero + prueba de datos; responsable P18 + P19) — Escritorio (1280 px). Variantes: Tres alertas de ejemplo: cuenta embudo, ciclo de cuentas y nodo con antecedentes en otra entidad.

## SEG: Monetización del motor de fraude Feedzai

- **ID:** f3
- **Número:** 11
- **Equipo:** SEG
- **Descripción:** ACH Security transforma la gestión de fraude en el riel mediante el motor Feedzai. Se prioriza 13 capacidades en 3 niveles de servicio que responden a dolor transversal: convertir a ACH en árbitro confiable, automatizar recuperación interbancaria, y empoderar EF con autonomía y analítica en tiempo real.
- **Entrega:** lunes 19 de octubre de 2026
- **Estado:** Desarrollo y Pruebas
- **Tipo:** B2B
- **Asignado:** P18 + P19
- **Audiencia:** Áreas de prevención de fraude, riesgo operativo y LAFT de las entidades financieras participantes
- **Urgencia:** Alta
- **Riesgo principal:** Viabilidad
- **Nivel de evidencia:** 1 · Interna o mandato
- **Valor:** 3.06
- **Complejidad:** 2.63
- **Complejidad (texto):** Alto (6 meses o más)
- **Zona:** P3 · Análisis caso a caso
- **Evolutivo:** Nueva
- **Apuesta:** Seguridad
- **Segmento original:** Entidades; Empresas
- **Validación original:** Sí
- **Evidencia original:** Solicitud de Junta por lineamiento
- **Comparable:** Motor de Fraude

**JTBD**

Cuando las entidades participantes del ecosistema de pagos requieren gestionar integralmente el riesgo de fraude, quiero habilitar capacidades personalizadas de prevención, detección, monitoreo, investigación, automatización y resolución de casos en tiempo real, para reducir pérdidas, mejorar la experiencia del cliente, optimizar la operación, fortalecer la colaboración entre actores y maximizar la efectividad de los controles de fraude.

**Correcciones a la fuente**

- Está en «Desarrollo y Pruebas» con evidencia de nivel 1 (mandato de Junta). Alto riesgo de construir sin validar la disposición a pagar.

### Plan de validación

**Hipótesis**

- Las EF pagarían por al menos 1 de los 3 niveles de servicio (no solo por el nivel básico incluido).
- La recuperación interbancaria automatizada es el dolor más costoso para las EF, por encima de la analítica.
- Las EF aceptan a ACH como árbitro neutral en disputas de fraude entre entidades.

**Prototipo requerido**

- **Requerimiento:** Ligero
- **Tipo:** Ficha de niveles de servicio + mock de tablero
- **Alcance:** Tabla con los 3 niveles y las 13 capacidades, precio tentativo por nivel y una pantalla del tablero de casos y recuperación.


**Tamaño de muestra**

- **Entrevistas:** 8
- **Pruebas de usabilidad moderadas:** 0
- **Maze:** 0
- **Encuestas:** 0
- **Detalle:** 8 entrevistas con 8 EF distintas (mezcla de bancos grandes, medianos y neobancos), más un ejercicio de priorización con presupuesto ficticio (buy-a-feature) en cada sesión.


**Usuarios a incluir**

- Gerentes o directores de prevención de fraude de 8 EF
- Al menos 2 oficiales de cumplimiento LAFT

**Reclutamiento**

Comités de fraude y seguridad donde ACH ya participa; contactos de Asobancaria.

**Criterios de validación**

- ≥5 de 8 EF eligen un nivel pago en el ejercicio de priorización.
- La recuperación interbancaria aparece en el top 3 de dolores en ≥5 de 8 entrevistas.
- ≥3 EF piden propuesta comercial formal.

**Guion de entrevista**

1. Cuénteme el último caso de fraude que involucró a otra entidad. ¿Cómo se coordinaron y cuánto tardó la recuperación?
2. ¿Qué herramientas usan hoy para detectar y gestionar casos? ¿Qué no resuelven?
3. ¿Cuánto les cuesta al mes la gestión manual de reclamaciones interbancarias, en personas y en pérdidas?
4. [Mostrar niveles] Si tuviera 100 puntos de presupuesto, ¿cómo los repartiría entre estas capacidades?
5. ¿Qué condiciones necesitarían para aceptar a ACH como árbitro en disputas entre entidades?
6. ¿Qué datos estarían dispuestos a compartir y cuáles no, por regulación o por competencia?
7. ¿Quién decide la compra de una solución así y con qué presupuesto se pagaría?

**Encuesta**

- Pérdidas mensuales estimadas por fraude que involucra a otra EF · Rango
- Tiempo promedio de recuperación interbancaria · Rango en días
- Interés en cada nivel de servicio · Escala 1-5 por nivel
- ¿Tiene presupuesto asignado para 2027? · Sí / No / En discusión

**Investigación secundaria — datos**

- Asobancaria reportó más de 218.000 reclamaciones por fraude en canales financieros en el primer semestre de 2025 [S3].
- El 36,6 % de los colombianos dice haber sido víctima directa de fraude en los últimos 12 meses (DataCrédito, 2025) [S3].
- Referentes internacionales: Mastercard Consumer Fraud Risk (puntaje de riesgo en pagos cuenta a cuenta, Reino Unido) y el mecanismo de devolución MED del Pix en Brasil.

**Investigación secundaria — por confirmar**

- Precios de servicios de fraude de consorcio (Feedzai, Mastercard Brighterion, BioCatch).
- Marco SFC sobre intercambio de información de fraude entre entidades.

**Prototipos que lo cubren**

- **E1 · Niveles de servicio antifraude** (Ligero; responsable P18 + P19) — Escritorio (1280 px). Variantes: Dos vistas: «Oferta» (niveles y precios) y «Tablero» (mock operativo).

---

# Célula F · Research Ops

- **Personas:** P20
- **Líder:** P20
- **Nota:** Coordina Maze, encuestas, consentimientos y agenda. Apoya las 3 iniciativas del laboratorio: datos de PILA 24/7 (C4), PFM (D5) y la encuesta de recarga de movilidad (A5).
