import { Role } from '../../../common/enums/role.enum.js';

export interface JwtPayload {
  sub: number;
  role: Role;
}
