import {Nota} from './nota';

export type RequestType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    user: string;
    title?: string;
    body?: string;
    color?: string;
    titleMod?: string;
    bodyMod?: string;
    colorMod?: string;
  }
  
  export type ResponseType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    success: boolean;
    // cambiado Notas[] por mensaje (ya que mi aplicación no hace uso de un array de notas)
    mensaje?: string;
  }
  