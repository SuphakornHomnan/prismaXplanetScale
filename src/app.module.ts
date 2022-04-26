import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PeopleModule } from './people/people.module';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 30,
    }),
    PeopleModule,
    PetModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
