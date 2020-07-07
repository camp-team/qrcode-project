import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UserData } from '@interfaces/user';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user$: Observable<UserData> = this.authService.user$;
  userControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
