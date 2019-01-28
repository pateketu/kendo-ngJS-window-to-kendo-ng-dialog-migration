import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DialogsModule,  } from '@progress/kendo-angular-dialog';
import { PopupWindowService } from './popup/popup-window.service';
import { PopupContainerComponent } from './popup/popup-container.component';
import { SettingsComponent } from './settings.component';
import { RandomService } from './random-service';
import { FormsModule } from '../../node_modules/@angular/forms';
import { DialogContainerComponent } from './popup/dialog-container.component';


@NgModule({
  declarations: [
    AppComponent,
    PopupContainerComponent,
    SettingsComponent,
    DialogContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DialogsModule,
    FormsModule,
  ],
  entryComponents: [
    PopupContainerComponent,
    SettingsComponent,
    DialogContainerComponent,
  ],
  providers: [PopupWindowService, RandomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
