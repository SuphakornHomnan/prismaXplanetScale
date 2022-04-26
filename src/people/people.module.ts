import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
  imports: [],
  controllers: [PeopleController],
  providers: [PeopleService,PrismaService],
})
export class PeopleModule {}
