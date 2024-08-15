import { Document } from 'mongoose';

export interface IPlace extends Document{
  readonly name: string;
  readonly type: number;
  readonly address: number;

  readonly id: string;
  readonly createdAt: number;
  readonly latitude: number;
  readonly longitude: number;
}