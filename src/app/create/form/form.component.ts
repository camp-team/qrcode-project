import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { CodeCard } from 'src/app/interfaces/code-card';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  type;
  customForm = {
    qrCode: {
      charge: ['', Validators.required],
      autoCharge: ['', Validators.required],
      availableCredit: ['', Validators.required],
      pushMoney: ['', Validators.required],
      pullMoney: ['', Validators.required],
    },
  };

  chargePatterns = ['1000円から可能', '1000円単位で可能', '不可'];
  simplePatterns = ['可能', '不可能'];

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get imageControl() {
    return this.form.get('image') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cardService: CardService
  ) {
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
      expiration: ['', Validators.required],
      storeName: [''],
      storeImage: [''],
      ...this.customForm[type],
    });
  }

  submit() {
    const formData = this.form.value;
    this.cardService.createCodeCard({
      name: formData.name,
      iamge: formData.image,
      point: formData.point,
      addPoint: formData.addPoint,
      expiration: formData.expiration,
      storeName: formData.storeName,
      storeImage: formData.storeImage,
      charge: formData.charge,
      autoCharge: formData.autoCharge,
      pushMoney: formData.pushMoney,
      pullMoney: formData.pullMoney,
    });
  }
}
