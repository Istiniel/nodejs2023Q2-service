import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  year: number
  @IsUUID()
  @IsOptional()
  artistId: string | null
}