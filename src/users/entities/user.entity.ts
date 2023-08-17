import { Exclude, Transform } from "class-transformer";
import { User } from "src/types";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";


@Entity({ name: 'user' })
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @VersionColumn()
  version: number

  @Column({ unique: true })
  login: string

  @Exclude()
  @Column()
  password: string

  @CreateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number | Date

  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number | Date

  // @BeforeInsert()
  // async hashPassword(): Promise<void> {
  //   const salt = await bcrypt.genSalt(bcryptConstants.saltRounds);
  //   const hash = await bcrypt.hash(this.password, salt);
  //   this.password = hash;
  // }

  constructor(userData: Partial<UserEntity>) {
    Object.assign(this, userData);
  }
}
