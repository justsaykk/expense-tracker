import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { NewTransaction } from 'src/app/models/NewTransaction';
import { BackendService } from 'src/app/services/backend.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { User } from '@angular/fire/auth'

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  form!: FormGroup
  user!: User;
  isLoading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddExpenseComponent>,
    private backendSvc: BackendService,
    private authSvc: FirebaseAuthService,
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
      description: new FormControl('', [Validators.required]),
      value: new FormControl(5, [Validators.required]),
      category: new FormControl('')
    })
    this.rows.push(newFormGroup);
  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }
  
  async submit() {
    if (this.form.invalid) {return}
    this.isLoading = true;
    const newTransactions: NewTransaction[] = this.form.value.rows;
    await this.authSvc.user$.pipe(take(1)).forEach((u) => this.user = u!);
    await this.backendSvc.postData(newTransactions, this.user.uid);
    this.isLoading = false;
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close()
  }
}