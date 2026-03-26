import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CatFormComponent } from '../../../features/cat-form/cat-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private dialog = inject(MatDialog);
  mobileOpen = signal(false);
  isScrolled = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => this.isScrolled.set(window.scrollY > 30));
    }
  }

  openCreate() {
    this.dialog.open(CatFormComponent, {
      width: '540px',
      maxWidth: '96vw',
      data: { mode: 'create' },
      panelClass: 'premium-dialog'
    });
  }
}
