import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './user';
import { InviteStatusEnum } from 'db/enums/invite-status';
import { InviteTypeEnum } from 'db/enums/invite-type';
import { Room } from './room';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  sender: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  receiver: User;

  @Column({ type: 'enum', enum: InviteStatusEnum, default: InviteStatusEnum.PENDING })
  status: InviteStatusEnum;

  @Column({ type: 'enum', enum: InviteTypeEnum })
  type: InviteTypeEnum;

  @ManyToOne(() => Room, { nullable: true })
  @JoinColumn()
  gameRoom: Room;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
