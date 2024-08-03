import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Country {
  @Column({ primary: true })
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  phoneCode: string;

  @Column()
  currency: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  //RELATIONS: User (one-to-many)
  /* @OneToMany(() => User, (user: User) => user.country)
  users: User[]; */
}
