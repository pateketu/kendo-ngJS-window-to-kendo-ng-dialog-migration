import { Component, Inject } from '../../node_modules/@angular/core';
import { WindowInstance } from './popup/window-instance';
import { RandomService } from './random-service';
import { PopupWindowService } from './popup/popup-window.service';

@Component(
    {
        selector: 'app-settings',
        template: `<b>
                        This is Dynamic component loaded into the content area of the pop-up
                    </b>
                    <br/>
                    <div>Param passed in via resolve from caller: {{customParam | json}}</div>
                    <button (click)="open()">Dialog within a Dialog</button>
                    <br/><br/>
                    <div>
                        <input type="text" [(ngModel)]="textBoxValue" style="width:520px"
                                placeholder="Type in something here,and it will be available to the caller when OK button is clicked" />
                    </div>

                    <div class="error-msg"
                        *ngIf="errr">You need to put something in the text box before OK button can close the Dialog</div>`
    })
export class SettingsComponent {

    constructor($windowInstance: WindowInstance,
                private randomService: RandomService,
                private popupWindowService: PopupWindowService,
                @Inject('customParam') public customParam: any
                ) {

       // console.log(`Custom param passed in via resolve ${JSON.stringify(customParam)}`);

        $windowInstance.done = () => {
            console.log('ok click captured wihin the content component');
            if (!this.textBoxValue) {
                this.errr = true;
                return;
            }
            // You can pass any complext object back to the caller
            $windowInstance.close({text: this.textBoxValue});
        };

        $windowInstance.cancel = () => {
            $windowInstance.close(false);
        };
    }

    public textBoxValue: string;
    public errr = false;

    open() {
        this.popupWindowService.alert('hey hey', 'fffff');
    }
}
