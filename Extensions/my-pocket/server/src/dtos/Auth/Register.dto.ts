import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'must be a valid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/, {
    message:
      'Password must be 6-15 characters long, contain at least one uppercase letter, one number, and one special character.',
  })
  password: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;
}
