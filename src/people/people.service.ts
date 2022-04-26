import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { People as PeopleModel, Prisma } from '@prisma/client';
import { ICreatePeople, IUpdatePeople } from './people.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class PeopleService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(arg: ICreatePeople): Promise<PeopleModel> {
    return await this.prisma.people.create({
      data: arg,
    });
  }

  async genRand(round: number): Promise<Prisma.BatchPayload> {
    const gender = ['male', 'female'];
    const peopleList = [];
    for (let i = 0; i < round; i++) {
      peopleList.push({
        name: faker.name.firstName(),
        bio: faker.lorem.paragraph(),
        sex: gender[Math.round(Math.random())],
        age: Math.round(Math.random() * 100),
      });
    }
    return await this.prisma.people.createMany({
      data: peopleList,
    });
  }

  async findAll(): Promise<PeopleModel[]> {
    return await this.prisma.people.findMany({});
  }

  async findById(id: string): Promise<PeopleModel | null> {
    const people = await this.prisma.people.findUnique({
      where: { id: Number(id) },
    });

    if (people) {
      return people;
    }
    throw new NotFoundException();
  }

  async updateById(
    id: string,
    arg: IUpdatePeople,
  ): Promise<PeopleModel | null> {
    const people = await this.prisma.people.update({
      where: { id: Number(id) },
      data: {
        name: arg?.name || undefined,
        bio: arg?.bio || undefined,
        sex: arg?.sex || undefined,
        age: arg?.age || undefined,
      },
    });

    if (people) {
      return people;
    }
    throw new NotFoundException();
  }

  async deleteById(id: string): Promise<PeopleModel | null> {
    const people = await this.prisma.people.delete({
      where: { id: Number(id) },
    });

    if (people) {
      return people;
    }
    throw new NotFoundException();
  }
}
