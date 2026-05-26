import { PrismaClient } from '@prisma/client';


export const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Conexão com o MySQL estabelecida com sucesso via Prisma!');
  } catch {
   
    console.error('❌ Erro ao conectar no MySQL. Verifique seu arquivo .env ou se o MySQL está ligado.');
  }
}

testConnection();