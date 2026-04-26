import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller'; // <-- Añade esta importación

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController], // <-- ¡ESTO ES LO QUE FALTA!
  providers: [ClientsService],
  exports: [ClientsService]
})
export class ClientsModule {}
