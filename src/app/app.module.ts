import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './components/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
<<<<<<< HEAD
<<<<<<< HEAD
import { ProfileComponent } from './components/profile/profile.component';
=======
import { ModificarComponent } from './components/producto/modificar/modificar.component';
>>>>>>> ae79b643ae3a670c769f8fd43fc5452376bdc33c
=======
>>>>>>> a3de90010d0cedeacd72f9deed43c6c8043d0d16

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    ProfileComponent,
=======
    ModificarComponent    
>>>>>>> ae79b643ae3a670c769f8fd43fc5452376bdc33c
=======
>>>>>>> a3de90010d0cedeacd72f9deed43c6c8043d0d16
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    MatInputModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
