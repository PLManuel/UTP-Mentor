# 🎓 Bienvenido a UTP+Mentor 📚

¡Transforma la gestión de recursos educativos en la Universidad Tecnológica del Perú con UTP+Mentor!  
Este proyecto académico busca mejorar la colaboración entre docentes y estudiantes mediante una plataforma web moderna, accesible y centrada en la experiencia del usuario.

---

## 📘 Descripción del Proyecto

**UTP+Mentor** es un sistema de gestión de recursos educativos desarrollado como parte del curso de **Herramientas de Desarrollo** en la **Universidad Tecnológica del Perú (UTP) – sede Lima Sur**.

Su propósito principal es brindar a los docentes una herramienta eficiente para crear, organizar y compartir materiales educativos digitales.  
Al mismo tiempo, los estudiantes podrán acceder fácilmente a estos recursos desde un único lugar.

### 🎯 Objetivos

- Centralizar y digitalizar los recursos educativos.
- Facilitar el acceso a materiales por parte de los estudiantes.
- Fomentar la colaboración docente.

---

## ⚙️ Tecnologías Utilizadas

| Tecnología | Descripción |
|-----------|-------------|
| <a href="https://developer.mozilla.org/es/docs/Web/HTML" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML" width="60"/></a> | **HTML5** – Estructura del contenido |
| <a href="https://developer.mozilla.org/es/docs/Web/CSS" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS" width="60"/></a> | **CSS3** – Estilos visuales |
| <a href="https://developer.mozilla.org/es/docs/Web/JavaScript" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width="60"/></a> | **JavaScript** – Lógica en el cliente |
| <a href="https://astro.build/" target="_blank"><img src="https://astro.build/assets/press/astro-icon-light.png" alt="Astro" width="60"/></a> | **Astro** – Framework moderno para desarrollo web |
| <a href="https://react.dev/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="60"/></a> | **React** – Componentes interactivos |
| <a href="https://tailwindcss.com/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS" width="60"/></a> | **Tailwind CSS** – Estilizado utilitario |


> 💡 **Nota:** El backend del sistema se encuentra en un repositorio separado.  
> Accede aquí 👉 [Repositorio Backend](https://github.com/CesarAlarcongG/ProyectoHDW)

---

## 🌟 Características Principales

- 📂 **Gestión de Recursos:** Docentes pueden subir, clasificar y actualizar materiales.
- 🔗 **Acceso Unificado:** Todos los contenidos disponibles en un solo lugar.
- 👩‍🏫 **Interfaz Intuitiva:** Diseñada para docentes y estudiantes por igual.
- 🤝 **Colaboración Docente:** Compartir recursos entre profesores fácilmente.

---

## 🗂️ Estructura del Proyecto

La organización del código fuente es la siguiente:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/               # Imágenes y logos
│   ├── components/           # Componentes reutilizables (.astro)
│   ├── layouts/              # Plantillas de diseño base
│   │   ├── Layout.astro
│   │   └── LayoutAuth.astro
│   ├── pages/
│   │   ├── api/              # Endpoints API (Astro)
│   │   │   ├── auth/         # Login y registro
│   │   │   ├── courses/      # CRUD de cursos
│   │   │   ├── resources/    # CRUD de recursos educativos
│   │   │   └── user/         # CRUD de usuarios
│   │   ├── dashboard/        # Vistas para administradores y profesores
│   │   ├── resources/        # Vistas para estudiantes
│   │   ├── index.astro       # Página principal
│   │   ├── login.astro       # Página de inicio de sesión
│   │   └── register.astro    # Página de registro
│   └── styles/
│       └── global.css        # Estilos globales
└── package.json              # Dependencias y scripts del proyecto
```

## 🧰 Requisitos Previos

Para ejecutar este proyecto en desarrollo o producción, asegúrate de tener instalado:

| Herramienta | Descripción |
|-------------|-------------|
| <a href="https://nodejs.org" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" width="80"/></a> | **Node.js** – Entorno de ejecución JavaScript |
| <a href="https://pnpm.io" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Pnpm_logo.svg" alt="pnpm" width="80"/></a> | **pnpm** – Gestor de paquetes rápido y eficiente |

---

## 🧞 Comandos Disponibles

Todos los comandos deben ejecutarse desde la raíz del proyecto:

| Comando                  | Descripción                                                         |
|--------------------------|---------------------------------------------------------------------|
| `pnpm install`           | Instala todas las dependencias del proyecto                         |
| `pnpm dev`               | Inicia el servidor en modo desarrollo (`localhost:4321`)            |
| `pnpm build`             | Construye el proyecto optimizado para producción en `/dist`         |
| `pnpm astro ...`         | Ejecuta comandos personalizados de Astro                            |
| `pnpm astro -- --help`   | Muestra ayuda sobre los comandos CLI de Astro                       |

---

## ✨ Contribuciones

Este proyecto forma parte de una iniciativa académica. Sin embargo, si deseas aportar mejoras o sugerencias, ¡eres bienvenido a hacerlo mediante _pull requests_ o _issues_!

---
