import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';


import { MAT_DATE_LOCALE } from '@angular/material/core';

import { ImageCropperModule } from 'ngx-image-cropper';

import { TurnaroundComponent } from './turnaround/turnaround.component';
import { CompagniesComponent } from './compagnies/compagnies.component';
import { CreateComponent } from './create/create.component';
import { MyflightsComponent } from './myflights/myflights.component';
import { InfoComponent } from './info/info.component';
import { DocumentsComponent } from './documents/documents.component';
import { ReportComponent } from './report/report.component';
import { LostComponent } from './lost/lost.component';
import { TrainingComponent } from './training/training.component';
import { GetAirlinePipe } from './pipes';
import { HistoricComponent } from './historic/historic.component';
import { HistoricSupComponent } from './historic-sup/historic-sup.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TurnaroundComponent,
    CompagniesComponent,
    CreateComponent,
    MyflightsComponent,
    InfoComponent,
    DocumentsComponent,
    ReportComponent,
    LostComponent,
    TrainingComponent,
    GetAirlinePipe,
    HistoricComponent,
    HistoricSupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    ImageCropperModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
