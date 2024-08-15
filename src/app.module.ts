import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceSchema } from './domain/places/schema/place.schema';
import { PlaceService } from './domain/places/place.service';
import { PlaceController } from './domain/places/place.controller';
import { MONGO_DB_CONNECT } from "./domain/constants";
import { PositionStackApi } from "./domain/places/api/positionStack.api";

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_DB_CONNECT, {
      dbName: 'placesdb',
    }),
    MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }]),
  ],
  controllers: [AppController, PlaceController],
  providers: [AppService, PlaceService, PositionStackApi],
})
export class AppModule {}
