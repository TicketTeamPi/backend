import { UserBdDto } from "src/user/dtos/input/user.bd.dto";
import { UserDto } from "../../user/dtos/input/user.dto";
import { User } from "../../user/models/user";

export abstract class UserRepository {
    abstract create(user: UserDto): Promise<User>;
    abstract findByEmail(email: string): Promise<UserBdDto | undefined>;
}
