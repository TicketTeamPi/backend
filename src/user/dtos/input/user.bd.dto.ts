export class UserBdDto {
    id: string;
    name: string;
    email: string;
    password: string;
    enterpriseId: string;
    refreshToken?: string;
    role: string;

    constructor(
        id : string,
        name: string, 
        email: string, 
        password: string, 
        enterpriseId: string,
        role: string,
        refreshToken?: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.enterpriseId = enterpriseId;
        this.role = role;
        this.refreshToken = refreshToken;
    }
}
