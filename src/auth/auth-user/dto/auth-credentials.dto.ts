import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {

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

    @IsString()
    @MinLength(0, { message: 'Company enter' })
    @MaxLength(15, { message: 'Company is too long (15 characters max)' })
    campaignNames: string;

    @IsString()
    @MinLength(0, { message: 'INN enter ' })
    @MaxLength(14, { message: 'INN is too long (14 characters max)' })
    inn: string;

    @IsString()
    @MinLength(0, { message: 'Main occupation enter ' })
    @MaxLength(40, { message: 'Main occupation is too long (40 characters max)' })
    mainOccupation: string;

    @IsString()
    @MinLength(0, { message: 'Position enter ' })
    @MaxLength(30, { message: 'Position is too long (20 characters max)' })
    position: string;

    @IsString()
    @MinLength(0, { message: 'Address enter ' })
    @MaxLength(50, { message: 'Address is too long (30 characters max)' })
    address: string;

    @IsString()
    @MinLength(0, { message: 'Phone enter ' })
    @MaxLength(13, { message: 'Phone is too long (14 characters max)' })
    phone: string;

    @IsString()
    @MinLength(0, { message: 'Bank account enter ' })
    @MaxLength(20, { message: 'Bank account is too long (14 characters max)' })
    bankAccount: string;

}
