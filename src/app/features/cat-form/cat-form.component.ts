import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CatService } from '../../core/services/cat.service';
import { Cat } from '../../core/models/cat.model';

@Component({
  selector: 'app-cat-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './cat-form.component.html',
  styleUrl: './cat-form.component.scss'
})
export class CatFormComponent implements OnInit {
  private fb     = inject(FormBuilder);
  private svc    = inject(CatService);
  private ref    = inject(MatDialogRef<CatFormComponent>);
  data = inject(MAT_DIALOG_DATA) as { mode: 'create' | 'update'; cat?: Cat };

  loading = false;

  form = this.fb.group({
    name:        ['', Validators.required],
    age:         ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
    if (this.data.mode === 'update' && this.data.cat) {
      this.form.patchValue(this.data.cat);
    }
  }

  hasError(field: string) {
    const c = this.form.get(field);
    return c?.invalid && (c.dirty || c.touched);
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    const req = this.form.value as { name: string; age: string; description: string };

    const obs = this.data.mode === 'create'
      ? this.svc.createCat(req)
      : this.svc.updateCat(this.data.cat!.id, req);

    obs.subscribe({
      next: () => { this.loading = false; this.ref.close(true); },
      error: () => { this.loading = false; }
    });
  }

  cancel() { this.ref.close(); }
}
