import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CatService } from '../../core/services/cat.service';
import { CatCardComponent } from '../../shared/components/cat-card/cat-card.component';
import { CatFormComponent } from '../cat-form/cat-form.component';
import { Cat } from '../../core/models/cat.model';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, MatDialogModule, CatCardComponent],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatListComponent implements OnInit {
  catService = inject(CatService);
  private dialog = inject(MatDialog);

  searchQuery = signal('');

  filteredCats = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.catService.cats();
    return this.catService.cats().filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.age.toLowerCase().includes(q)
    );
  });

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  ngOnInit() { this.catService.fetchCats(); }

  openCreate() {
    this.dialog.open(CatFormComponent, {
      width: '540px', maxWidth: '96vw',
      data: { mode: 'create' },
      panelClass: 'premium-dialog'
    });
  }

  editCat(cat: Cat) {
    this.dialog.open(CatFormComponent, {
      width: '540px', maxWidth: '96vw',
      data: { mode: 'update', cat },
      panelClass: 'premium-dialog'
    });
  }

  deleteCat(id: string) {
    if (confirm('Remove this feline record from the registry?')) {
      this.catService.deleteCat(id).subscribe();
    }
  }

  viewCat(cat: Cat) {
    console.log('Viewing', cat);
  }

  scrollToGrid() {
    document.getElementById('registry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
