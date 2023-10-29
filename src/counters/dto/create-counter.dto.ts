import { IsString, IsUrl } from 'class-validator';

export class CreateCounterDto {
  @IsString()
  @IsUrl(undefined, { message: 'Не является URL' })
  domain: string;
}
