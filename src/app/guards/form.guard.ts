import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormComponent } from '../create/form/form.component';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanDeactivate<FormComponent> {
  canDeactivate(component: FormComponent): Observable<boolean> | boolean {
    if (component.form.pristine || component.isComplete) {
      return true;
    }
    const confirmation = window.confirm(
      '作業中の内容が失われますがよろしいですか？'
    );
    return of(confirmation);
  }
}
