import { Component, computed } from '@angular/core';
import { CheckCircle, Info, LucideAngularModule, XCircle, AlertTriangle, X } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  readonly CheckCircleIcon = CheckCircle;
  readonly XCircleIcon = XCircle;
  readonly InfoIcon = Info;
  readonly AlertTriangleIcon = AlertTriangle;
  readonly XIcon = X;

  toast = computed(() => this.toastService.toast());

  constructor(private toastService: ToastService) {}

  closeToast() {
    this.toastService.hide();
  }
}
