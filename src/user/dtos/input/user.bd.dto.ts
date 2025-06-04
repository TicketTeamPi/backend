export class UserBdDto {
    id: string;
    name: string;
    email: string;
    password: string;
    enterpriseId: string;
    refreshToken?: string;

    constructor(id : string, name: string, email: string, password: string, enterpriseId: string, refreshToken?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.enterpriseId = enterpriseId;
        this.refreshToken = refreshToken;
    }
}
