import { UserDto } from "../../user/dtos/input/user.dto";
import { User } from "../../user/models/user";

export abstract class UserRepository {
    abstract create(user: UserDto): Promise<User>;
    abstract findByEmail(email: string): Promise<User | undefined>;
}