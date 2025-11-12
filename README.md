# Proyecto Users_ts

**Users_ts** es una **API REST** diseñada para la gestión integral de usuarios.
Su objetivo es ofrecer una base sólida y escalable para manejar identidades dentro de diferentes sistemas o microservicios, con un enfoque en seguridad, validación de datos y buenas prácticas de arquitectura backend.
El proyecto busca ser reutilizable, modular y fácil de integrar con otras APIs o frontends, funcionando como un servicio centralizado de usuarios.

Creada utilizando **Node.js + TypeScript** con **Express**, **Sequelize (MySQL)**, **JWT**, **bcrypt**, **Zod** y variables de entorno con **dotenv**.

> Este README describe cómo instalar, configurar, ejecutar y consumir la API.

---

## 🧱 Stack
- Node.js + TypeScript
- Express
- Sequelize + mysql2
- Auth: JWT (jsonwebtoken) + bcrypt
- Validación: Zod
- Estilo de código: ts-standard
- Carga de variables: dotenv

---

## 📦 Requisitos
- Node.js 20+ (recomendado)
- MySQL 8.x (o compatible)
- npm / pnpm / yarn

---

## 🚀 Instalación
```bash
# 1) Clonar el repo
git clone https://github.com/lichanano73/users_ts.git

cd users_ts

# 2) Instalar dependencias
npm install
```

---

## ⚙️ Configuración (.env)
Crea un archivo **.env** en la raíz con valores como estos:
```ini
# Servidor
PORT=3001

# Base de datos
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=users_db
DB_USER=root
DB_PASS=passBD

# JWT Secret
JWT_SECRET=key_super_segura
```


---

## 📁 Estructura

```
src/
 ├─ app/
 ├─ config/
 ├─ middlewares/
 ├─ models/
 ├─ routes/
 ├─ services/
 ├─ validators/
 ├─ app.ts
 ├─ index.ts
```

---

## 📜 Scripts (package.json)
```ini
npm run dev     ->  Desarrollo con recarga
npm run tsc     ->  Compila TypeScript a `build/`
npm start       ->  Ejecuta lo compilado (`build/index.js`)
npm run lint    ->  Chequea estilo ts-standard
```

---

## 🗄️ Base de datos
- Crea la base:
  ```sql
  CREATE DATABASE users_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  ```
- Configurá Sequelize para conectarse con las variables del `.env`.

---

## 🔐 Autenticación
- Bearer Token en el header **Authorization**.
- `verifyToken` protege **todas** las rutas bajo `/users`.
- `isAdmin` restringe endpoints específicos (listar/agregar usuarios).

Header ejemplo:
```
Authorization: Bearer <JWT>
```

---

## 🌐 Rutas y Endpoints

### 1) Auth
#### 1.1 POST `/auth` — Login ✅
**Body**
```json
{
  "email": "user@example.com",
  "password": "********"
}
```
**200 OK (ejemplo)**
```json
{
  "token": "<jwt>",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "type": "admin"
  }
}
```
**Errores comunes**
- 400: error de validación con Zod
- 401: credenciales inválidas
- 404: usuario no encontrado / email no confirmado

#### 1.2 GET `/auth/ws_verifytoken` — Verificar token ✅
**Headers**: `Authorization: Bearer <jwt>`

**200 OK (ejemplo)**
```json
{
  "ok": true,
  "payload": { "id": 1, "email": "user@example.com", "type": "admin" }
}
```

---

### 2) Users
> Todas las rutas de **/users** requieren token válido (`verifyToken`). Algunas además requieren rol admin (`isAdmin`).

#### 2.1 GET `/users` — Listar usuarios (solo Admin) ✅
**Headers**: `Authorization: Bearer <jwt>`

**200 OK (ejemplo)**
```json
[
  { "id": 1, "email": "admin@example.com", "name": "Admin", "type": "admin" },
  { "id": 2, "email": "client@example.com", "name": "Client", "type": "client" }
]
```

#### 2.2 POST `/users/add` — Crear usuario (solo Admin) ✅
**Headers**: `Authorization: Bearer <jwt>`

**Body**//Falta validar con Zod 
```json
{
  "email": "nuevo@example.com",
  "password": "********",
  "name": "Nuevo Usuario",
  "gender": "Femenino",
  "type": "client"
}
```
**201 Created**
```json
{ "id": 3, "email": "nuevo@example.com", "name": "Nuevo Usuario", "type": "client", "gender": "Femenino" }
```

#### 2.3 PUT `/users/:id` — Actualizar usuario ✅
**Headers**: `Authorization: Bearer <jwt>`

**Reglas de autorización:**
- **Admin**: puede actualizar cualquier usuario.
- **Client**: solo puede actualizar su propio registro. Si intenta actualizar a otro, responder 403


**Body (ejemplo, validado con Zod)**
```json
{
  "name": "Nombre Actualizado",
  "avatar": "https://example.com/avatar.png"
}
```
**200 OK (ejemplo)**
```json
{ "id": 2, "email": "client@example.com", "name": "Nombre Actualizado" }
```

---

## 🧪 Ejemplos con curl
Login:
```bash
curl -X POST http://localhost:3001/auth   -H "Content-Type: application/json"   -d '{"email":"admin@example.com","password":"123456"}'
```
Verificar token:
```bash
curl -X GET http://localhost:3001/auth/ws_verifytoken   -H "Authorization: Bearer <JWT>"
```
Listar usuarios (admin):
```bash
curl -X GET http://localhost:3001/users   -H "Authorization: Bearer <JWT>"
```


---

## 📄 Licencia
Este proyecto está licenciado bajo los términos de la GNU - GPL General Public License v3.0.
Esto significa que podés usar, copiar, modificar y distribuir este software, tanto con fines personales como comerciales, siempre que mantengas la misma licencia en cualquier trabajo derivado y reconozcas la autoría original.

Para más información, consultá el texto completo de la licencia en:
https://www.gnu.org/licenses/gpl-3.0.html
