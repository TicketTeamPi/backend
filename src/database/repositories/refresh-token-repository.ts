import { RefreshTokenDbDto } from 'src/auth/dtos/input/refresh-token-db.dto';
import { RefreshToken } from '../../auth/models/refreshToken';

export abstract class RefreshTokenRepository {
  abstract create(refreshToken: RefreshToken): Promise<RefreshToken>;
  abstract deleteById(id: String): Promise<void>;
  abstract findById(id: String): Promise<RefreshTokenDbDto | undefined>;
  abstract update(refreshToken: RefreshTokenDbDto): Promise<void>;
}
