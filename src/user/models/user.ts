import { randomUUID, UUID } from "crypto";

export class User {
    private readonly _id: string;
    private readonly _name: string; 
    private readonly _email: string;
    private readonly _password: string;
    private readonly _enterpriseId: string;
    private readonly _refreshTokenId?: string;

    constructor(id: string, name: string, email: string, password: string, enterpriseId: string, refreshToken?: string) {
        this._id = id ? id : randomUUID();
        this._name = name;
        this._email = email;
        this._password = password;
        this._enterpriseId = enterpriseId;
        this._refreshTokenId = refreshToken;
    }
    

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    get enterpriseId(): string {
        return this._enterpriseId;
    }

    get refreshToken(): string | undefined {
        return this._refreshTokenId;
    }
}