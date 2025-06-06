export class RefreshTokenDbDto {
  id: string;
  userId: string;
  refreshToken: string;
  expiresAt: Date;

  constructor(
    id: string,
    userId: string,
    refreshToken: string,
    expiresAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.expiresAt = expiresAt;
  }
}
