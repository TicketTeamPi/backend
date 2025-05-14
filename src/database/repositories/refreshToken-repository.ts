import { RefreshToken } from "src/auth/models/refreshToken";

export abstract class RefreshTokenRepository {
    abstract create(refreshToken: RefreshToken): Promise<RefreshToken>;
    abstract deleteById(id: String): Promise<void>;
}
