import {ContactResponse} from './contact-response';

export class PostResponse {

  id: number;
  title: string;
  text: string;
  date: Date;
  owner: ContactResponse;

}
