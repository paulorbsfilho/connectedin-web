import {ContactResponse} from './contact-response';

export class InvitationResponse {

  id: number;
  date: Date;
  receiver: ContactResponse;
  sender: ContactResponse;
  status: string;

}
