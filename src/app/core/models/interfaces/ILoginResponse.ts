import { IUserProfile } from "./IUserProfile";

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  expires: number;
  userProfile: IUserProfile;
}
