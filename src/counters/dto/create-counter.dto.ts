import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCounterDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl(undefined, { message: 'Не является URL' })
  domain: string;
}
