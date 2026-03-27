import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CatService } from '../../core/services/cat.service';
import { Cat, CreateCatRequest } from '../../core/models/cat.model';

interface CatForm {
  name: FormControl<string>;
  age: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-cat-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './cat-form.component.html',
  styleUrl: './cat-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatFormComponent implements OnInit {
  private fb     = inject(FormBuilder);
  private svc    = inject(CatService);
  private ref    = inject(MatDialogRef<CatFormComponent>);
  data = inject(MAT_DIALOG_DATA) as { mode: 'create' | 'update'; cat?: Cat };

  loading = signal(false);

  form = new FormGroup<CatForm>({
    name:        new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    age:         new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit() {
    if (this.data.mode === 'update' && this.data.cat) {
      this.form.patchValue({
        name: this.data.cat.name,
        age: this.data.cat.age,
        description: this.data.cat.description,
      });
    }
  }

  hasError(field: keyof CatForm) {
    const c = this.form.controls[field];
    return c?.invalid && (c.dirty || c.touched);
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    
    this.loading.set(true);
    const req = this.form.getRawValue() as CreateCatRequest;

    const obs = this.data.mode === 'create'
      ? this.svc.createCat(req)
      : this.svc.updateCat(this.data.cat!.id, req);

    obs.subscribe({
      next: () => { this.loading.set(false); this.ref.close(true); },
      error: () => { this.loading.set(false); }
    });
  }

  cancel() { this.ref.close(); }
}
