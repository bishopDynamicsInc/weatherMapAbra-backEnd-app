import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPlace } from './interface/place.interface';
import { CreatePlaceDto } from './dto/place.dto';
import { ListRequestDto } from './dto/listRequest.dto';
import { PaginationPlacesInterface } from './interface/paginationPlaces.interface';
import { PositionStackApi } from './api/positionStack.api';

@Injectable()
export class PlaceService {
  constructor(@InjectModel('Place') private placeModel: Model<IPlace>,
              private readonly positionStackApi: PositionStackApi) {}

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<IPlace> {
    const positionResponse = await this.positionStackApi.getCoordinatesByAddress(createPlaceDto.address);
    console.log(`positionResponse`, positionResponse);
    const newPlace = await new this.placeModel({ ...createPlaceDto, longitude: positionResponse.longitude, latitude: positionResponse.latitude });
    return newPlace.save();
  }

  //todo add filter by type
  async getAllPlaces(
    listRequestDto: ListRequestDto,
  ): Promise<PaginationPlacesInterface> {
    if (listRequestDto.page < 0) {
      throw new BadRequestException('Page should be greater than 0!');
    }
    const total = await this.placeModel.countDocuments({}).exec();
    const places = await this.placeModel
      .find()
      .sort({ createdAt: -1 })
      .limit(listRequestDto.count)
      .skip(listRequestDto.count * (listRequestDto.page))
      .exec();
    return {
      result: places,
      total,
      count: listRequestDto.count,
      page: listRequestDto.page,
    };
  }
}
