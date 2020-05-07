import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  // form = this.fb.group({
  //   name: ['', [Validators.required, Validators.maxLength(20)]],
  //   image: ['', Validators.required],
  //   point: ['', Validators.maxLength(5)],
  //   addPoint: [''],
  //   storeName: [''],
  //   storeImage: [''],
  // });

  form: FormGroup;
  type;
  customForm = {
    qrCode: {
      charge: [''],
      autoCharge: [''],
      availableCredit: [''],
    },
  };

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get imageControl() {
    return this.form.get('image') as FormControl;
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((map) => {
      this.type = map.get('type');
      this.buildForm(this.type);
    });
  }

  ngOnInit(): void {}

  buildForm(type) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      image: ['', Validators.required],
      point: ['', Validators.maxLength(5)],
      addPoint: [''],
      storeName: [''],
      storeImage: [''],
      ...this.customForm[type],
    });
  }

  getResult() {
    console.log(this.form.value);
  }
}
