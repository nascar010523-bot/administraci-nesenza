# Esenza · Panel de Evaluaciones

App interna para administrar y guardar los 4 tests de Esenza:
Hábitos de Estudio, Relación con la Alimentación, Ansiedad y Estrés, y Autoestima.

Solo tú (con tu usuario y contraseña) puedes entrar. Cada evaluación se
guarda automáticamente en tu base de datos, agrupada por paciente, para
que puedas consultar el historial después.

---

## 1. Crear el proyecto de Firebase (una sola vez)

1. Ve a [console.firebase.google.com](https://console.firebase.google.com) y crea un proyecto nuevo
   (o usa el mismo proyecto de la app de Esenza si prefieres tenerlo todo junto —
   en ese caso, mejor crear un proyecto **aparte**, porque este panel es de uso
   clínico interno y conviene mantenerlo separado de la app pública).
2. Dentro del proyecto, ve a **Compilación → Authentication → Comenzar**.
   Habilita el proveedor **Correo electrónico/contraseña**.
3. En la pestaña **Users**, haz clic en **Agregar usuario** y crea tu propio
   usuario (tu correo + una contraseña). Ese será el único login que la app acepta —
   no hay registro público.
4. Ve a **Compilación → Firestore Database → Crear base de datos**.
   Elige modo **producción** y la región más cercana (por ejemplo `us-central`).
5. Cuando la base esté creada, ve a la pestaña **Reglas** y pega el contenido
   del archivo [`firestore.rules`](./firestore.rules) de este proyecto. Publica los cambios.
6. Ve a **⚙️ Configuración del proyecto → General**, baja hasta "Tus apps",
   haz clic en el ícono `</>` para agregar una app web, ponle un nombre
   (por ejemplo "panel-evaluaciones") y copia el objeto `firebaseConfig` que te muestra.
7. Pega esos valores en [`src/firebase.js`](./src/firebase.js), reemplazando los
   `"TU_API_KEY"`, etc.

## 2. Subir el proyecto a GitHub

```bash
cd esenza-tests-app
git init
git add .
git commit -m "Panel de evaluaciones Esenza"
```

Crea un repositorio nuevo en GitHub (puede ser privado — de hecho, para
un panel clínico interno te lo recomiendo). Luego:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

## 3. Activar GitHub Pages con despliegue automático

1. En tu repositorio de GitHub, ve a **Settings → Pages**.
2. En "Build and deployment", elige **Source: GitHub Actions**.
3. Eso es todo — el workflow en `.github/workflows/deploy.yml` ya está
   incluido en el proyecto. Cada vez que hagas `git push` a `main`, la app
   se construye y se publica sola.
4. Después del primer push, ve a la pestaña **Actions** de tu repo para ver
   el progreso. Cuando termine, tu link estará en **Settings → Pages**
   (algo como `https://tu-usuario.github.io/tu-repo/`).

> Si el repositorio es privado, GitHub Pages también puede quedar privado
> según tu plan — revisa las opciones en Settings → Pages si te interesa
> restringir el acceso incluso a nivel de red, además del login de la app.

## 4. Uso diario

- Entra con tu correo y contraseña.
- **Nueva evaluación** → busca o crea al paciente → elige uno de los 4 tests
  → adminístralo (tú lo llenas junto al paciente, o le pasas el dispositivo).
- Al terminar, el perfil de resultados aparece al instante y queda guardado.
- **Pacientes** → busca cualquier paciente para ver todo su historial de
  evaluaciones a través del tiempo.

## 5. Desarrollo local (opcional)

Si quieres probar cambios antes de subirlos:

```bash
npm install
npm run dev
```

Esto abre la app en `http://localhost:5173` usando la misma configuración
de Firebase — los datos que generes en local se guardan en la base de datos
real, así que usa un paciente de prueba si solo quieres probar la app.

## Estructura del proyecto

```
src/
  data/            → banco de preguntas y textos de los 4 tests
  engine/           → lógica de puntuación (compartida por los 4 tests)
  components/        → pantallas: Login, Dashboard, NewAssessment, TestRunner,
                       ResultProfile, Patients, Sidebar
  firebase.js        → configuración de tu proyecto de Firebase
firestore.rules       → reglas de seguridad (solo usuarios autenticados)
```

## Agregar un test nuevo en el futuro

Cada test es un objeto de configuración en `src/data/` (mira `anxiety.js`
como ejemplo — es el más simple). Para agregar uno nuevo:

1. Crea `src/data/nombre-del-test.js` con la misma forma (`domains`,
   `secondary`, `bandFor`, `recsText`, etc.).
2. Regístralo en `src/data/testRegistry.js`.

El resto de la app (cuestionario, guardado, perfil de resultados) funciona
automáticamente con cualquier test que sigas ese formato.
