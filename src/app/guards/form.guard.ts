import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormComponent } from '../create/form/form.component';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanDeactivate<FormComponent> {
  canDeactivate(component: FormComponent): Observable<boolean> | boolean {
    if (component.creditForm) {
      if (
        component.creditForm.form.pristine ||
        component.creditForm.isComplete
      ) {
        return true;
      }
    } else {
      if (component.form.pristine || component.isComplete) {
        return true;
      }
    }

    const confirmation = window.confirm(
      '作業中の内容が失われますがよろしいですか？'
    );
    return of(confirmation);
  }
}
