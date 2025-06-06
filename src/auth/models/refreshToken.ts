import { randomUUID, UUID } from "crypto";

export class RefreshToken {
    private readonly _id: string;
    private readonly _userId: string;
    private readonly _token: string;
    private readonly _expiresAt: Date;
    
    constructor(userId: string, refreshToken: string, expiresAt: Date) {
        this._id = randomUUID();
        this._userId = userId;
        this._token = refreshToken;
        this._expiresAt = expiresAt;
    }

    get id(): string {
        return this._id;
    }

    get userId(): string {
        return this._userId;
    }

    get refreshToken(): string {
        return this._token;
    }

    get expiresAt(): Date {
        return this._expiresAt;
    }
}