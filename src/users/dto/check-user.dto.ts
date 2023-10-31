import { IsString } from 'class-validator';

export class CheckUserDto {
  @IsString()
  code: string;
}
