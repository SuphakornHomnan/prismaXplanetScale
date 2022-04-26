import { Pet as PetModel } from '.prisma/client';
import faker from '@faker-js/faker';
import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ICreatePet, IGenPet, IUpdatePet } from './pet.dto';

@Injectable()
export class PetService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(arg: ICreatePet): Promise<PetModel> {
    return await this.prisma.pet.create({
      data: arg,
    });
  }

  async genPets(arg: IGenPet): Promise<Prisma.BatchPayload> {
    const petList = [];
    for (let i = 0; i < arg.round; i++) {
      petList.push({
        name: faker.name.findName(),
        breed: faker.animal.type(),
        age: Math.round(Math.random() * 7),
        weight: Math.round(Math.random() * 1000),
        ownerId: arg.ownerId,
      });
    }

    return await this.prisma.pet.createMany({
      data: petList,
    });
  }

  async findAll(): Promise<PetModel[]> {
    return await this.prisma.pet.findMany({});
  }

  async findById(id: string): Promise<PetModel | null> {
    const pet = await this.prisma.pet.findUnique({
      where: { id: Number(id) },
    });

    if (pet) {
      return pet;
    }
    throw new NotFoundException();
  }

  async updateById(id: string, update: IUpdatePet): Promise<PetModel | null> {
    const pet = await this.prisma.pet.update({
      where: { id: Number(id) },
      data: update,
    });

    if (pet) {
      return pet;
    }
    throw new NotFoundException();
  }

  async deleteById(id: string): Promise<PetModel | null> {
    const pet = await this.prisma.pet.delete({ where: { id: Number(id) } });

    if (pet) {
      return pet;
    }
    throw new NotFoundException();
  }
}
