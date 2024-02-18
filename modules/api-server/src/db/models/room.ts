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

  @Column("varchar", { unique: true })
  code: string;

  @Column("varchar")
  topic: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  owner: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  judje: User;

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

  @Column("int")
  preparationTime: number;

  @Column("int")
  reportTime: number;

  @Column("int")
  gradingTime: number;

  @Column("boolean", {default: false})
  practise: boolean;

  @Column({ type: 'enum', enum: RoomStatusEnum, default: RoomStatusEnum.PENDING })
  status: RoomStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}