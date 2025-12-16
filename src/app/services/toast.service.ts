
import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';


export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number; 
}


@Injectable({
  providedIn: 'root',
})
export class ToastService {

   toast = signal<ToastOptions | null>(null);

  show(message: string, type: ToastType = 'success') {
    this.toast.set({ message, type });

    setTimeout(() => {
      this.toast.set(null);
    }, 3000);
  }



  
}
