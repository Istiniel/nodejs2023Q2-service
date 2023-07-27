import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  id: string; // uuid v4
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  password: string;
}