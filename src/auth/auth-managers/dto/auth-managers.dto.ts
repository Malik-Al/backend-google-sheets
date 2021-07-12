import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthManagersDto {

    @IsString()
    @MinLength(4, { message: 'Username is too short (4 characters min)' })
    @MaxLength(20, { message: 'Username is too long (20 characters max)' })
    username: string;

    @IsString()
    @MinLength(8, { message: 'Password is too short (8 characters min)' })
    @MaxLength(20, { message: 'Password is too long (20 characters max)' })
    password: string;

    @IsString()
    @MinLength(3, { message: 'LastName is too short (5 characters min)' })
    @MaxLength(15, { message: 'LastName is too long (15 characters max)' })
    lastName: string;

    @IsString()
    @MinLength(3, { message: 'FirstName is too short (5 characters min)' })
    @MaxLength(15, { message: 'FirstName is too long (15 characters max)' })
    firstName: string;

    @IsString()
    @MinLength(3, { message: 'MiddleName is too short (5 characters min)' })
    @MaxLength(15, { message: 'MiddleName is too long (15 characters max)' })
    middleName: string;


}