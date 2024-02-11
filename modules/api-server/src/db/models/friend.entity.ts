import { 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Invite } from './invite.entity';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  friend: User;

  @ManyToOne(() => Invite, { nullable: false })
  @JoinColumn()
  invite: Invite;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
