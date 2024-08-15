
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreatePlaceDto {
  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  readonly name: string;

  //todo add enum?
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;
}