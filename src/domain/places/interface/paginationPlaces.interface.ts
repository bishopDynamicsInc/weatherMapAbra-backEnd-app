import { IPlace } from "./place.interface";

export interface PaginationPlacesInterface{
  result: IPlace[];
  page: number;
  count: number;
  total: number;
}