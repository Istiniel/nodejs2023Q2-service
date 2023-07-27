import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  year: number
  @IsNotEmpty()
  @IsUUID()
  artistId: string
}