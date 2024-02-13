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

@Entity({ synchronize: false })
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
