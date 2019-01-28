import { Component } from '@angular/core';
import { PopupWindowService } from './popup/popup-window.service';
import { SettingsComponent } from './settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-dream-app';
  output = '';
  constructor(private popupWindowService: PopupWindowService) {

  }

  async alert() {
      await this.popupWindowService.alert('Yo yo', 'What you doin');
      // Do any other things that needs to be done afte user has closed alert
      this.output = 'You just closed the alert';

  }

  async confirm() {
      const confirm = await this.popupWindowService.confirm('Are you sure?', 'You sure you wannna do this?', 'Yeppp!');
      // Do any other things that needs to be done afte user has closed alert
      this.output = `You Confirmed: ${confirm}`;

  }

  async custom() {
    const result = await this.popupWindowService.openModal({title: 'Custom',
                            content: SettingsComponent,
                            doneButtonText: 'OK',
                            showCancelButton: true,
                            cancelButtonText: 'Close',
                            resolve: {customParam: {'val': `from the caller of Dialog`}}});

    this.output = `Result from Dynamic component in Dialog: ${JSON.stringify(result)}`;
  }

}
