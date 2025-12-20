import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-wrapper" [ngClass]="type">
      @if (type === 'product-card') {
      <div class="skeleton-product-card">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-line skeleton-brand"></div>
          <div class="skeleton-line skeleton-title"></div>
          <div class="skeleton-line skeleton-price"></div>
          <div class="skeleton-button"></div>
        </div>
      </div>
      } @if (type === 'product-detail') {
      <div class="skeleton-product-detail">
        <div class="skeleton-detail-left">
          <div class="skeleton-main-image"></div>
          <div class="skeleton-thumbnails">
            <div class="skeleton-thumb"></div>
            <div class="skeleton-thumb"></div>
            <div class="skeleton-thumb"></div>
          </div>
        </div>
        <div class="skeleton-detail-right">
          <div class="skeleton-line skeleton-category"></div>
          <div class="skeleton-line skeleton-title-large"></div>
          <div class="skeleton-line skeleton-description"></div>
          <div class="skeleton-line skeleton-description"></div>
          <div class="skeleton-line skeleton-price-large"></div>
          <div class="skeleton-sizes">
            <div class="skeleton-size"></div>
            <div class="skeleton-size"></div>
            <div class="skeleton-size"></div>
            <div class="skeleton-size"></div>
          </div>
          <div class="skeleton-button-large"></div>
          <div class="skeleton-button-large"></div>
        </div>
      </div>
      } @if (type === 'text') {
      <div class="skeleton-line" [style.width.%]="width" [style.height.px]="height"></div>
      } @if (type === 'image') {
      <div class="skeleton-image-block" [style.width.%]="width" [style.height.px]="height"></div>
      }
    </div>
  `,
  styles: [
    `
      /* Animación de shimmer */
      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }

      .skeleton-wrapper {
        animation: fadeIn 0.3s ease-in;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* Elementos base de skeleton */
      .skeleton-line,
      .skeleton-image,
      .skeleton-main-image,
      .skeleton-thumb,
      .skeleton-button,
      .skeleton-button-large,
      .skeleton-size,
      .skeleton-image-block {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.03) 0%,
          rgba(255, 255, 255, 0.08) 50%,
          rgba(255, 255, 255, 0.03) 100%
        );
        background-size: 1000px 100%;
        animation: shimmer 2s infinite linear;
        border-radius: 8px;
      }

      /* Product Card Skeleton */
      .skeleton-product-card {
        background: #141414;
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 24px;
        overflow: hidden;
        padding: 0;
      }

      .skeleton-image {
        width: 100%;
        height: 280px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 0;
      }

      .skeleton-content {
        padding: 1.5rem;
      }

      .skeleton-line {
        height: 16px;
        margin-bottom: 12px;
      }

      .skeleton-brand {
        width: 40%;
        height: 12px;
      }

      .skeleton-title {
        width: 80%;
        height: 20px;
        margin: 16px 0;
      }

      .skeleton-price {
        width: 30%;
        height: 24px;
        margin: 20px 0;
      }

      .skeleton-button {
        width: 100%;
        height: 48px;
        margin-top: 16px;
        border-radius: 8px;
      }

      /* Product Detail Skeleton */
      .skeleton-product-detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        padding: 5rem 0;
        max-width: 1200px;
        margin: 0 auto;
      }

      .skeleton-main-image {
        width: 100%;
        height: 500px;
        margin-bottom: 1.5rem;
      }

      .skeleton-thumbnails {
        display: flex;
        gap: 1rem;
      }

      .skeleton-thumb {
        width: 80px;
        height: 80px;
      }

      .skeleton-detail-right {
        padding-top: 2rem;
      }

      .skeleton-category {
        width: 30%;
        height: 14px;
        margin-bottom: 1rem;
      }

      .skeleton-title-large {
        width: 90%;
        height: 40px;
        margin-bottom: 1.5rem;
      }

      .skeleton-description {
        width: 100%;
        height: 16px;
        margin-bottom: 8px;
      }

      .skeleton-price-large {
        width: 40%;
        height: 40px;
        margin: 2rem 0;
      }

      .skeleton-sizes {
        display: flex;
        gap: 0.5rem;
        margin: 2rem 0;
      }

      .skeleton-size {
        width: 60px;
        height: 50px;
      }

      .skeleton-button-large {
        width: 100%;
        height: 56px;
        margin-bottom: 1rem;
        border-radius: 8px;
      }

      .skeleton-image-block {
        display: block;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .skeleton-product-detail {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
      }
    `,
  ],
})
export class SkeletonComponent {
  @Input() type: 'product-card' | 'product-detail' | 'text' | 'image' = 'text';
  @Input() width: number = 100;
  @Input() height: number = 20;
}
