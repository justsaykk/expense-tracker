import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  form!: FormGroup

  constructor(
    private dialogRef: MatDialogRef<AddExpenseComponent>,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      rows: new FormArray([])
    })
    this.addRow()
  }

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  addRow(): void {
    const newFormGroup: FormGroup = new FormGroup({
      description: new FormControl(''),
      value: new FormControl(0),
      category: new FormControl('')
    })
    this.rows.push(newFormGroup);
  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }
  
  submit() {
    console.log(this.form.value)
    this.dialogRef.close()
  }
}
