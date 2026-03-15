import { IUserRole } from "./IUserRole";

export interface IUserProfile {
    mid: string;
    email: string;
    fName: string;
    lName: string;
    displayName: string;
    lastLogin: string;
    unsuccessfulLogin: number;
    location: string;
    userId: number;
    roles: IUserRole[];
}
