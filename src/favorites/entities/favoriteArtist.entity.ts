import { ArtistEntity } from "src/artists/entities/artist.entity";
import {
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";


@Entity({ name: 'favoriteArtist' })
export class FavoriteArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => ArtistEntity,
    (artist) => artist.favorite,
    { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'id' })
  artist: ArtistEntity;

  constructor(favoriteData: Partial<FavoriteArtistEntity>) {
    Object.assign(this, favoriteData);
  }
}

