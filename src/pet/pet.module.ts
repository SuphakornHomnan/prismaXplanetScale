import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

@Module({
  controllers: [PetController],
  providers: [PetService, PrismaService],
})
export class PetModule {}
