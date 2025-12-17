
import { Component, computed } from '@angular/core';
import { CheckCircle, Info, LucideAngularModule, ShoppingCart, XCircle } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {


  readonly CartIcon = ShoppingCart;
    toast = computed(() => this.toastService.toast());

  icon = computed(() => {
    const toast = this.toast();
    if (!toast) return null;

    return {
      success: CheckCircle,
      error: XCircle,
      info: Info,
    }[toast.type ?? 'success'];
  });

  constructor(private toastService: ToastService) {}

}
