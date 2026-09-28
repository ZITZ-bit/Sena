# 📚 Guía de Prisma 7 — Migraciones y Base de Datos

> **Proyecto:** Sistema de gestión académica
> **Base de datos:** PostgreSQL
> **ORM:** Prisma 7
> **Configuración:** `prisma/prisma.config.ts`

---

## 1. 🧠 Estructura de configuración

En este proyecto se utiliza una configuración de Prisma mediante:

```text
prisma/
├── schema.prisma
├── prisma.config.ts
└── migrations/
    └── global/
```

Por esta razón, los comandos de Prisma deben ejecutarse indicando explícitamente:

```bash
--config prisma/prisma.config.ts
```

### ⚠️ Importante

No asumir el flujo tradicional donde todo se configura directamente desde `schema.prisma`.

En este proyecto, cuando Prisma necesite la configuración, utilizar:

```bash
npx prisma <comando> --config prisma/prisma.config.ts
```

---

# 2. 🔄 Aplicar migraciones

Para aplicar las migraciones existentes en la base de datos:

```bash
npx prisma migrate deploy --config prisma/prisma.config.ts
```

### ¿Qué hace?

Toma las migraciones que existen en:

```text
prisma/migrations/
```

y las aplica a la base de datos configurada.

Por ejemplo:

```text
prisma/
└── migrations/
    └── global/
```

Después de ejecutar el comando debería aparecer algo indicando que la migración fue aplicada correctamente.

### 📌 Usar cuando:

* Clonaste el proyecto.
* Instalaste el proyecto en otra computadora.
* Hay migraciones nuevas que todavía no están aplicadas.
* Necesitas sincronizar la BD con las migraciones existentes.

---

# 3. 🔍 Comprobar el estado de las migraciones

Para comprobar si la base de datos está actualizada:

```bash
npx prisma migrate status --config prisma/prisma.config.ts
```

Si todo está correctamente sincronizado, aparecerá:

```text
Database schema is up to date!
```

### 🧠 Esto significa:

```text
Migraciones del proyecto
        ↓
      Prisma
        ↓
Base de datos PostgreSQL
        ↓
       ✅ OK
```

Si aparecen migraciones pendientes, significa que la BD todavía no tiene todos los cambios.

---

# 4. ⚙️ Regenerar Prisma Client

Cuando sea necesario regenerar el cliente de Prisma:

```bash
npx prisma generate --config prisma/prisma.config.ts
```

Esto genera/actualiza el **Prisma Client**, que es el que utiliza NestJS para comunicarse con PostgreSQL mediante Prisma.

Por ejemplo:

```typescript
this.prisma.materias.findMany()
```

funciona gracias al cliente generado por Prisma.

---

## ⚠️ Error común

Si ejecutas:

```bash
npx prisma generate
```

y Prisma intenta utilizar una configuración que no corresponde al proyecto, puede producir errores.

En ese caso utiliza explícitamente:

```bash
npx prisma generate --config prisma/prisma.config.ts
```

### 🧠 Regla para este proyecto

Si un comando de Prisma da problemas relacionados con la configuración, primero intenta:

```bash
--config prisma/prisma.config.ts
```

---

# 5. 🗄️ Ver las tablas de PostgreSQL

Para consultar directamente las tablas existentes en la base de datos:

```bash
PGPASSWORD=zitzkira psql -h localhost -U postgres -d sena -Atc \
"SELECT tablename FROM pg_catalog.pg_tables
WHERE schemaname = 'public' ORDER BY tablename;"
```

### 📌 Datos utilizados

| Parámetro     | Valor       |
| ------------- | ----------- |
| Host          | `localhost` |
| Usuario       | `postgres`  |
| Base de datos | `sena`      |
| Schema        | `public`    |

El resultado será algo parecido a:

```text
carreras
estudiantes
materias
profesores
usuarios
```

Esto permite comprobar **qué tablas existen realmente en PostgreSQL**, independientemente de lo que diga el `schema.prisma`.

---

# 6. 🔎 Ver la estructura de una tabla

Si quieres inspeccionar una tabla concreta desde `psql`:

```bash
PGPASSWORD=zitzkira psql -h localhost -U postgres -d sena
```

Una vez dentro:

```sql
\d materias
```

Para obtener información más detallada:

```sql
\d+ materias
```

Y para salir:

```sql
\q
```

---

# 7. 🛠️ Flujo recomendado del proyecto

Cuando hagamos cambios en Prisma, podemos seguir este flujo:

```text
        ✏️
Modificar schema.prisma
        │
        ▼
Crear/aplicar migración
        │
        ▼
     PostgreSQL
        │
        ▼
Verificar migraciones
        │
        ▼
Regenerar Prisma Client
        │
        ▼
     NestJS 🚀
```

Para comprobar que todo está bien:

### ① Aplicar migraciones

```bash
npx prisma migrate deploy --config prisma/prisma.config.ts
```

### ② Revisar estado

```bash
npx prisma migrate status --config prisma/prisma.config.ts
```

Esperamos:

```text
Database schema is up to date!
```

### ③ Regenerar Prisma Client

```bash
npx prisma generate --config prisma/prisma.config.ts
```

### ④ Comprobar tablas

```bash
PGPASSWORD=zitzkira psql -h localhost -U postgres -d sena -Atc \
"SELECT tablename FROM pg_catalog.pg_tables
WHERE schemaname = 'public' ORDER BY tablename;"
```

---

# 🚨 Chuleta rápida

Si un día no recuerdas **NADA**, guarda esto 😂:

```bash
# Aplicar migraciones
npx prisma migrate deploy --config prisma/prisma.config.ts

# Ver estado
npx prisma migrate status --config prisma/prisma.config.ts

# Regenerar Prisma Client
npx prisma generate --config prisma/prisma.config.ts

# Ver tablas de PostgreSQL
PGPASSWORD=zitzkira psql -h localhost -U postgres -d sena -Atc \
"SELECT tablename FROM pg_catalog.pg_tables
WHERE schemaname = 'public' ORDER BY tablename;"
```

### 🧠 Regla de oro

> **En este proyecto, recuerda `--config prisma/prisma.config.ts`.**

Esa es probablemente la parte que más fácil se te va a olvidar. 😭

Y **ojo con la contraseña**: como la documentación contiene `PGPASSWORD=zitzkira`, si vas a compartirla con alguien o subirla a GitHub, conviene reemplazarla por un marcador como `<TU_PASSWORD>`.

Si quieres, también puedo convertir esto en un **`README.md` bonito para meterlo directamente en tu proyecto**.
