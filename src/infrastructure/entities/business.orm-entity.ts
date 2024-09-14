import { Column, Entity } from 'typeorm';
import { CommonEntity } from './common.orm-entity';

@Entity()
export class Business extends CommonEntity {
  @Column('varchar', { unique: true })
  name: string;

  @Column('varchar', { unique: true })
  email: string;
}
