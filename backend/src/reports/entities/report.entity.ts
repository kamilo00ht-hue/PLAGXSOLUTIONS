import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { ReportStatus } from '../dto/create-report.dto';

export interface ReportAuthor {
  userId: number;
  email: string;
  role: string;
}

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  cliente!: string;

  @Column({ type: 'date' })
  fechaServicio!: string;

  @Column({ length: 120 })
  tipoPlaga!: string;

  @Column({ length: 120 })
  tecnicoResponsable!: string;

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.PENDIENTE
  })
  estado!: ReportStatus;

  @Column({ name: 'client_id' })
  clientId!: number;

  @ManyToOne(() => Client, (client) => client.reportes, { nullable: false, eager: true })
  @JoinColumn({ name: 'client_id' })
  client!: Client;

  @Column({ type: 'simple-json' })
  autor!: ReportAuthor;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
