import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ICreatePet, IGenPet, IUpdatePet } from './pet.dto';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('')
  async createPet(@Body() arg: ICreatePet) {
    return await this.petService.create(arg);
  }

  @Post('/gen')
  async genRand(@Body() arg: IGenPet) {
    return await this.petService.genPets(arg);
  }

  @Get('')
  async pets() {
    return await this.petService.findAll();
  }

  @Get(':id')
  async getPetById(@Param('id') id: string) {
    return await this.petService.findById(id);
  }

  @Put(':id')
  @HttpCode(204)
  async updateById(@Param('id') id: string, @Body() update: IUpdatePet) {
    return await this.petService.updateById(id, update);
  }

  @Delete(':id')
  async deleteByID(@Param('id') id: string) {
    return await this.petService.deleteById(id);
  }
}
