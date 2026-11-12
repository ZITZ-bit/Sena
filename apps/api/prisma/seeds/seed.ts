import { config } from 'dotenv';
import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

config({ path: join(process.cwd(), 'prisma', '.env') });

if (process.env.DB_TARGET !== 'local') {
  throw new Error(
    'Este seeder solo se puede ejecutar con DB_TARGET=local para proteger bases remotas.',
  );
}

const connectionString = process.env.DATABASE_URL_LOCAL;
if (!connectionString) {
  throw new Error('DATABASE_URL_LOCAL no está definida.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const { usuario, rol } = await prisma.$transaction(async (tx) => {
    const rol = await tx.roles.upsert({
      where: { nombre: 'Programador' },
      update: { descripcion: 'Rol de Programador del sistema' },
      create: {
        nombre: 'Programador',
        descripcion: 'Rol de Programador del sistema',
      },
    });

    const usuario = await tx.usuarios.upsert({
      where: { cedula: '32074312' },
      update: {
        nombre: 'ZITZ',
        password: 'zitzkira',
        estado: true,
      },
      create: {
        nombre: 'ZITZ',
        cedula: '32074312',
        password: 'zitzkira',
        estado: true,
      },
    });

    await tx.estudiantes.deleteMany({
      where: { usuario_id: usuario.id },
    });
    await tx.profesores.deleteMany({
      where: { usuario_id: usuario.id },
    });
    await tx.activation_tokens.deleteMany({
      where: { usuario_id: usuario.id },
    });
    await tx.usuario_roles.deleteMany({
      where: { usuario_id: usuario.id },
    });
    await tx.usuario_roles.create({
      data: {
        usuario_id: usuario.id,
        rol_id: rol.id,
      },
    });

    return { usuario, rol };
  });

  console.log(`Usuario Programador configurado: ${usuario.nombre} (${usuario.cedula})`);
  console.log(`Rol asignado: ${rol.nombre}`);

  console.log('\nSeeder de Programador completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('Error en el seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
