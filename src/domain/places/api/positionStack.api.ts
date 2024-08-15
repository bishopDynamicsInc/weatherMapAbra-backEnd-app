import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  POSITION_STACK_API_KEY,
  POSITION_STACK_API_URL,
} from '../../constants';

@Injectable()
export class PositionStackApi {
  async getCoordinatesByAddress(
    address: string,
  ): Promise<{ latitude: number; longitude: number }> {
    try {
      const response = await axios.get(
        POSITION_STACK_API_URL +
          `?access_key=` +
          POSITION_STACK_API_KEY +
          `&query=` +
          encodeURIComponent(address),
      );
      if (response.data?.data?.length <= 0) {
        throw new BadRequestException(`No such address found!`);
      }
      return {
        latitude: response.data.data[0].latitude,
        longitude: response.data.data[0].longitude,
      };
    } catch (err) {
      console.error(err);
    }
  }
}
