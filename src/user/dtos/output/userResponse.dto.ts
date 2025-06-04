export class UserResponseDto {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly enterpriseId: string;

    constructor(props: {
        id: string;
        name: string;
        email: string;
        enterpriseId: string;
    }) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.enterpriseId = props.enterpriseId;
    }
}