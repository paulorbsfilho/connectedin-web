import {AuthorityResponse} from './authority-response';

export class JwtResponse {

  sub: string;
  roles: AuthorityResponse[];
  exp: number;

}
