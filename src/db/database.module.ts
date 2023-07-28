import { Global, Module } from '@nestjs/common';
import { DatabaseService } from 'src/db/services/database/database.service';

@Global()
@Module({
  controllers: [],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule { }
