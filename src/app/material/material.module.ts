import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';

const materialComponents = [
  MatButtonModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatRippleModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatIconModule,
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatRadioModule
];
@NgModule({

  imports: [...materialComponents],
  exports: [...materialComponents],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
})
export class MaterialModule { }
