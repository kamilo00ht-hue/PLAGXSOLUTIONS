import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '../../reports/entities/report.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120 })
  nombre!: string;

  @Column({ length: 120, unique: true })
  email!: string;

  @Column({ length: 30, nullable: true })
  telefono?: string;

  @OneToMany(() => Report, (report) => report.client)
  reportes!: Report[];
}
