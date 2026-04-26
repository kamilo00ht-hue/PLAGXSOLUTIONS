import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { ReportModule } from './reports/report.module';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuración de la base de datos con persistencia asegurada
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'root'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_NAME', 'plagxsolutions'),
        
        // Carga automática de entidades del proyecto
        autoLoadEntities: true,
        
        // PROTECCIÓN DE DATOS: Desactivado para evitar pérdida de registros
        synchronize: false, 
        
        // PROTECCIÓN DE DATOS: Desactivado para que no se borren las tablas al reiniciar
        dropSchema: false, 
      }),
    }),

    // Módulos de la aplicación PlagXsolutions
    AuthModule,
    UsersModule,
    ClientsModule,
    ReportModule,
  ],
})
export class AppModule {}