import {PostResponse} from './post-response';

export class ContactResponse {

  id: number;
  name: string;
  email: string;
  posts: PostResponse[];
  contacts: ContactResponse[];
  roles: any[];
  myFriend: boolean;
  enabled: boolean;
  active: boolean;
  blocked: boolean;

}
