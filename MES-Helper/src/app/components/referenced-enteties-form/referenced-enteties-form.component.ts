import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateSqlService } from '../../services/generate-sql.service';
import { SqlQueryObservableService } from '../../services/sql-query-observable.service';
import { DropDownBarService } from '../../services/drop-down-bar.service';

@Component({
  selector: 'app-referenced-entities-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './referenced-enteties-form.component.html',
  styleUrl: './referenced-enteties-form.component.css'
})
export class ReferencedEntitiesFormComponent implements OnInit {
  form!: FormGroup;
  description = '';

  constructor(
    private fb: FormBuilder,
    private sqlService: GenerateSqlService,
    private queryObservable: SqlQueryObservableService,
    private dropdownService: DropDownBarService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      procedureName: ['', Validators.required]
    });

    const option = this.dropdownService.getFormOptionById('referencedEntities');
    if (option) this.description = option.description;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { procedureName } = this.form.value;
    const sql = this.sqlService.findReferencedEntities(procedureName);
    this.queryObservable.updateSqlQuery(sql);
  }
}
