import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { IsUserAlreadyExist } from "../validators/is-user-already-exist.validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @Validate(IsUserAlreadyExist)
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}