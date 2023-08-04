import { AlbumEntity } from "src/albums/entities/album.entity";
import {
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";


@Entity({ name: 'favoriteAlbum' })
export class FavoriteAlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => AlbumEntity,
    (album) => album.favorite,
    { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'id' })
  album: AlbumEntity;

  constructor(favoriteData: Partial<FavoriteAlbumEntity>) {
    Object.assign(this, favoriteData);
  }
}

