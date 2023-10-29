import { IsString } from 'class-validator';

export class CreatePageViewDto {
  @IsString()
  url: string;
  @IsString()
  key: string;
}
