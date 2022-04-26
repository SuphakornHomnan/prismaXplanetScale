export class ICreatePet {
  name: string;
  breed: string;
  age: number;
  weight: number;
  ownerId: number;
}

export class IUpdatePet {
  name?: string;
  breed?: string;
  age?: number;
  weight?: number;
}

export class IGenPet {
  round: number
  ownerId: number
}
