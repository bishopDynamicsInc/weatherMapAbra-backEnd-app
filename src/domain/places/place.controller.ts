import { Body, Controller, Get, HttpStatus, Injectable, Post, Res } from "@nestjs/common";
import { PlaceService } from "./place.service";
import { CreatePlaceDto } from "./dto/place.dto";
import { IPlace } from "./interface/place.interface";
import { ListRequestDto } from "./dto/listRequest.dto";
import { PaginationPlacesInterface } from "./interface/paginationPlaces.interface";

@Controller('/api')
export class PlaceController{
  constructor(private readonly placeService: PlaceService) { }

  @Post('/place')
  async createPlace(@Res() response, @Body() createPlaceDto: CreatePlaceDto): Promise<IPlace> {
    try {
      const newPlace = await this.placeService.createPlace(createPlaceDto);
      return response.status(HttpStatus.OK).json({
        message: 'Place has been created successfully',
        place: newPlace,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Place not created!',
        error: 'Bad Request',
      });
    }
  }

  @Post('place/list')
  async getAllPlaces(@Res() response, @Body() listRequestDto: ListRequestDto): Promise<PaginationPlacesInterface> {
    try {
      const result = await this.placeService.getAllPlaces(listRequestDto);
      return response.status(HttpStatus.OK).json({ ...result });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error!',
        error: 'Bad Request',
      });
    }
  }
}