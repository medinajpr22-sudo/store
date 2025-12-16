
import { Component, computed } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CheckCircle, Info, LucideAngularModule, XCircle } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {

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
