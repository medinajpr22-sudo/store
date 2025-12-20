import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

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
  private timeoutId: any;

  show(message: string, type: ToastType = 'success', duration: number = 3000) {
    // Limpiar timeout anterior si existe
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.toast.set({ message, type, duration });

    this.timeoutId = setTimeout(() => {
      this.toast.set(null);
      this.timeoutId = null;
    }, duration);
  }

  hide() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.toast.set(null);
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }
}
