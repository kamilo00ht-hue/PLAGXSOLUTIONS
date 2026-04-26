🛡️ PLAGXSOLUTIONS: Gestión Inteligente de Control de Plagas¡Bienvenido! Este es PlagXsolutions, un proyecto nacido de la necesidad de profesionalizar y digitalizar la industria del control de plagas. Desarrollado como parte de mi proceso de formación en el SENA (Servicio Nacional de Aprendizaje), este SaaS busca transformar procesos manuales en reportes técnicos precisos y seguros."De un técnico para técnicos." – Este software entiende el trabajo de campo porque está diseñado desde la experiencia operativa en el Oriente Antioqueño.🚀 Logros Actuales (Fase Backend Finalizada)A la fecha, el corazón del sistema está 100% operativo y blindado:Seguridad: Autenticación robusta con JWT (JSON Web Tokens).Base de Datos: Estructura relacional sólida en MySQL vinculando Clientes y Reportes.Persistencia: Configuración profesional para evitar pérdida de datos en producción.Integridad: Validaciones de servidor para asegurar que cada reporte tenga un autor y un cliente real.🛠️ Tecnologías del ProyectoBackend (El Motor)Frontend (La Interfaz)HerramientasNestJS (Node.js Framework)React / Angular (En desarrollo)Git / GitHubTypeORM (Manejo de BD)CSS Moderno / TailwindPostman (Pruebas API)MySQL (Base de Datos)ViteConventional Commits📦 Configuración y Despliegue Local1. Requisitos PreviosNode.js 20+ y npm 10+MySQL (Vía XAMPP o Docker) en el puerto 3306.Git instalado.2. InstalaciónClona el repositorio y entra a la carpeta del proyecto:Bashgit clone https://github.com/kamilo00ht-hue/PLAGXSOLUTIONS.git
cd PLAGXSOLUTIONS
3. Variables de Entorno (Importante) 🔑Por seguridad, los secretos no se suben al repositorio. Crea un archivo .env dentro de la carpeta backend/ basado en el siguiente ejemplo:Fragmento de códigoDB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=plagx
JWT_SECRET=tu_clave_secreta_pro_aqui
JWT_EXPIRES_IN=1d
4. Encendido del MotorBash# Entra al backend e instala dependencias
cd backend
npm install

# Inicia en modo desarrollo
npm run start:dev
El servidor estará escuchando en: http://localhost:3000📑 Flujo de Pruebas (Evidencia Técnica)Para validar el sistema desde Postman, sigue este orden:Registro: POST /auth/register (Crea tu cuenta de técnico).Acceso: POST /auth/login (Obtén tu llave de acceso - Token).Clientes: POST /clients (Registra un cliente nuevo usando el Token).Reportes: POST /reports (Crea el acta de fumigación vinculando el ID del cliente).🎓 Sobre el AutorSoy Juan Camilo Henao Tabarez, estudiante de Análisis y Desarrollo de Software en el SENA. Este proyecto es el resultado de combinar la disciplina técnica, el amor por la música urbana y la visión de crear soluciones tecnológicas que impacten positivamente el sector logístico y de servicios en Colombia.🤝 Contribuciones y ContactoEste proyecto sigue la metodología de Conventional Commits para un historial de cambios limpio y profesional. Si tienes sugerencias o quieres charlar sobre el código:GitHub: @kamilo00ht-hueProyecto: PlagXsolutions V1.0
