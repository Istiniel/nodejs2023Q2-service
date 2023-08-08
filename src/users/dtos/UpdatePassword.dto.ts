import { IsNotEmpty } from "class-validator";

export default class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string;
  @IsNotEmpty()
  newPassword: string;
}