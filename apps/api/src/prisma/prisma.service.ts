import { config } from 'dotenv';
import { join } from 'node:path';

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const envPath = join(__dirname, '..', '..', 'prisma', '.env');
config({ path: envPath });

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (typeof connectionString !== 'string' || connectionString.length === 0) {
      throw new Error('DATABASE_URL no está definida o no es una cadena válida');
    }

    const adapter = new PrismaPg({
      connectionString,
    });

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}