import { UserBdDto } from "src/user/dtos/input/user.bd.dto";
import { User } from "../../user/models/user";

export abstract class UserRepository {
    abstract create(user: User): Promise<User>;
    abstract findByEmail(email: string): Promise<UserBdDto | undefined>;
    abstract findAll(): Promise<UserBdDto[]>;
}
