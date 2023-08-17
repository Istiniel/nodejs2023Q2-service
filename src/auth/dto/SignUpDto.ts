import { IsNotEmpty } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  password: string;
}