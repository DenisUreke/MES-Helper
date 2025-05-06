import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropDownBarService, FormOption } from '../../services/drop-down-bar.service';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css'
})
export class DropDownComponent implements OnInit {
  formOptions: FormOption[] = [];
  selectedFormId: string = '';
  selectedDescription: string = '';

  constructor(private dropdownService: DropDownBarService) { }

  ngOnInit(): void {
    // Get all form options from the service
    this.formOptions = this.dropdownService.getFormOptions();
    
    // Set the initial selected form
    this.selectedFormId = this.dropdownService.getCurrentFormId();
    this.updateSelectedDescription();
    
    // Subscribe to changes in case another component changes the selection
    this.dropdownService.currentForm$.subscribe(formId => {
      this.selectedFormId = formId;
      this.updateSelectedDescription();
    });
  }

  onSelectionChange(): void {
    // Notify the service when the user selects a different option
    this.dropdownService.selectForm(this.selectedFormId);
    this.updateSelectedDescription();
  }

  private updateSelectedDescription(): void {
    const option = this.dropdownService.getFormOptionById(this.selectedFormId);
    this.selectedDescription = option ? option.description : '';
  }
}
