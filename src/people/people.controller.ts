import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ICreatePeople, IUpdatePeople } from './people.dto';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post('')
  async createPeople(arg: ICreatePeople) {
    return await this.peopleService.create(arg);
  }

  @Post('gen')
  async genPeople(@Body('round') round: number) {
    return await this.peopleService.genRand(round);
  }

  @Get('')
  async people() {
    return await this.peopleService.findAll();
  }

  @Get(':id')
  async getPeopleById(@Param('id') id: string) {
      return await this.peopleService.findById(id)
  }

  @Put(':id')
  @HttpCode(204)
  async updatePeopleById(@Param('id') id: string, @Body() arg: IUpdatePeople) {
      return await this.peopleService.updateById(id, arg)
  }

  @Delete(':id')
  async deletePeopleById(@Param('id') id: string) {
      return await this.peopleService.deleteById(id)
  }

}
