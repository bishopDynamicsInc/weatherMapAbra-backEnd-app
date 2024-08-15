
import { IsString, IsPositive, IsOptional, IsInt } from "class-validator";
export class ListRequestDto {
  @IsInt()
  readonly page: number;

  @IsPositive()
  readonly count: number;

  @IsString()
  @IsOptional()
  readonly type: string | undefined;
}