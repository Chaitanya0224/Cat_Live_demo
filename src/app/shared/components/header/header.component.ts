import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { fromEvent, map } from 'rxjs';
import { CatFormComponent } from '../../../features/cat-form/cat-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private dialog = inject(MatDialog);
  mobileOpen = signal(false);

  // Reactive scroll tracking using toSignal and fromEvent
  isScrolled = toSignal(
    fromEvent(typeof window !== 'undefined' ? window : [], 'scroll').pipe(
      map(() => (typeof window !== 'undefined' ? window.scrollY > 30 : false))
    ),
    { initialValue: false }
  );

  openCreate() {
    this.dialog.open(CatFormComponent, {
      width: '540px',
      maxWidth: '96vw',
      data: { mode: 'create' },
      panelClass: 'premium-dialog'
    });
  }
}
