import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    image: ['', Validators.required],
    point: ['', Validators.maxLength(5)],
    addPoint: [''],
    storeName: [''],
    storeImage: [''],
  });

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get imageControl() {
    return this.form.get('image') as FormControl;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  getResult() {
    console.log(this.form.value);
  }
}
