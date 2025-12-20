import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Loader2 } from 'lucide-angular';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="spinner-container" [class.fullscreen]="fullscreen">
      <div class="spinner-content">
        <lucide-icon [img]="LoaderIcon" [size]="size" class="spinner-icon"></lucide-icon>
        @if (message) {
        <p class="spinner-message">{{ message }}</p>
        }
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .spinner-container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }

      .spinner-container.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(4px);
        z-index: 9999;
      }

      .spinner-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .spinner-icon {
        color: #ccff00;
        animation: spin 1s linear infinite;
        filter: drop-shadow(0 0 10px rgba(204, 255, 0, 0.3));
      }

      .spinner-message {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.875rem;
        font-weight: 500;
        margin: 0;
        text-align: center;
      }
    `,
  ],
})
export class LoadingSpinnerComponent {
  readonly LoaderIcon = Loader2;
  @Input() size: number = 48;
  @Input() message: string = '';
  @Input() fullscreen: boolean = false;
}
