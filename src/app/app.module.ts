import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SvgEyeComponent } from './svg-eye/svg-eye.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgEyeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
