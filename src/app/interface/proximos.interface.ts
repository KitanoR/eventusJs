/**
 * Created by PC on 8/11/2017.
 */
import { Evento } from './evento.interface';
export interface Proximo{
  uid?: string;
  usuario: string;
  eventos: Evento[];
}
