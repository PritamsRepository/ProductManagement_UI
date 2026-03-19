export interface IJwtPayload {

    exp: number;   // expiry (required)
    name?: string;
    role?: string;
}

