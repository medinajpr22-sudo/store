import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ChevronRight, Home, LucideAngularModule } from 'lucide-angular';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <nav class="breadcrumb-nav" *ngIf="breadcrumbs.length > 0">
      <div class="breadcrumb-container">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item">
            <a routerLink="/home" class="breadcrumb-link home">
              <lucide-icon [img]="HomeIcon" [size]="16"></lucide-icon>
            </a>
          </li>
          @for (breadcrumb of breadcrumbs; track breadcrumb.url; let last = $last) {
          <li class="breadcrumb-separator">
            <lucide-icon [img]="ChevronIcon" [size]="16"></lucide-icon>
          </li>
          <li class="breadcrumb-item" [class.active]="last">
            @if (!last) {
            <a [routerLink]="breadcrumb.url" class="breadcrumb-link">
              {{ breadcrumb.label }}
            </a>
            } @else {
            <span class="breadcrumb-current">{{ breadcrumb.label }}</span>
            }
          </li>
          }
        </ol>
      </div>
    </nav>
  `,
  styles: [
    `
      .breadcrumb-nav {
        background: rgba(20, 20, 20, 0.8);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        padding: 1rem 0;
        backdrop-filter: blur(10px);
      }

      .breadcrumb-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }

      .breadcrumb-list {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .breadcrumb-item {
        display: flex;
        align-items: center;
      }

      .breadcrumb-link {
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
      }

      .breadcrumb-link:hover {
        color: #ccff00;
        background: rgba(204, 255, 0, 0.05);
      }

      .breadcrumb-link.home {
        padding: 0.25rem;
      }

      .breadcrumb-current {
        color: #ccff00;
        font-size: 0.875rem;
        font-weight: 600;
        padding: 0.25rem 0.5rem;
      }

      .breadcrumb-separator {
        color: rgba(255, 255, 255, 0.3);
        display: flex;
        align-items: center;
      }

      /* Responsive */
      @media (max-width: 640px) {
        .breadcrumb-link,
        .breadcrumb-current {
          font-size: 0.75rem;
        }
      }
    `,
  ],
})
export class BreadcrumbComponent implements OnInit {
  readonly HomeIcon = Home;
  readonly ChevronIcon = ChevronRight;
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    });

    // Initial load
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      // Get breadcrumb label from route data or generate from URL
      let label = child.snapshot.data['breadcrumb'];

      if (!label && routeURL) {
        // Generate label from route
        if (routeURL === 'cart') {
          label = 'Carrito';
        } else if (routeURL.startsWith('detail-product')) {
          label = this.getProductName(child) || 'Detalle del Producto';
        } else {
          label = routeURL.charAt(0).toUpperCase() + routeURL.slice(1);
        }
      }

      if (label && routeURL) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private getProductName(route: ActivatedRoute): string | null {
    const slug = route.snapshot.paramMap.get('slug');
    if (slug) {
      // Convert slug to readable name
      return slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return null;
  }
}
