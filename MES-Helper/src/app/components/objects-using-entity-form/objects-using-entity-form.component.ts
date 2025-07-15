import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerateSqlService } from '../../services/generate-sql.service';
import { SqlQueryObservableService } from '../../services/sql-query-observable.service';
import { DropDownBarService } from '../../services/drop-down-bar.service';

@Component({
  selector: 'app-objects-using-entity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './objects-using-entity-form.component.html',
  styleUrl: './objects-using-entity-form.component.css'
})
export class ObjectsUsingEntityFormComponent implements OnInit {
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
      entityName: ['', Validators.required]
    });

    const option = this.dropdownService.getFormOptionById('objectsUsingEntity');
    if (option) this.description = option.description;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { entityName } = this.form.value;
    const sql = this.sqlService.findObjectsUsingEntity(entityName);
    this.queryObservable.updateSqlQuery(sql);
  }
}
