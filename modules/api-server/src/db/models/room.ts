import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user';
import { RoomStatusEnum } from 'db/enums/room-status';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  topic: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  owner: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  judge: User;

  @ManyToMany(() => User, { nullable: false })
  @JoinTable()
  members: User[];

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  proTeam: User[];

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  conTeam: User[];

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  winners: User[];

  @Column("float")
  reportTime: number;

  @Column("int")
  reportsNumber: number;

  @Column({ type: 'enum', enum: RoomStatusEnum, default: RoomStatusEnum.PENDING })
  status: RoomStatusEnum;

  @Column({type: 'boolean', default: true})
  notGraded: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
