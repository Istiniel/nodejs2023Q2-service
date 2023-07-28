import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class UpdateAlbumDto {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  year: number
  @IsUUID()
  @IsOptional()
  artistId: string | null
}