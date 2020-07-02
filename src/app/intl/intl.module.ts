import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntlRoutingModule } from './intl-routing.module';
import { HelpComponent } from './help/help.component';
import { TermsComponent } from './terms/terms.component';
import { LegalComponent } from './legal/legal.component';

@NgModule({
  declarations: [HelpComponent, TermsComponent, LegalComponent],
  imports: [CommonModule, IntlRoutingModule],
})
export class IntlModule {}
