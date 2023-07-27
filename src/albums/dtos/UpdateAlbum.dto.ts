import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateAlbumDto {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  year: number
  @IsNotEmpty()
  @IsUUID()
  artistId: string
}