/**
 * Created by PC on 8/11/2017.
 */
import { Comentario } from './comentario.interface';
import { Categoria } from './categoria.interface';

export interface Evento{
  uid?: string;
  nombre: string;
  sumario: string;
  contenido: string;
  lugar: string;
  inicio: any;
  final: any;
  imagen?: string;
  gratis: boolean;
  precio?: number;
  vistas?: string;
  organizador: string;
}
