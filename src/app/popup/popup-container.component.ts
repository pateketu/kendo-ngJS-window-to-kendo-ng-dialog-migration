import { Component, Input,
    OnInit, ViewChild, ViewContainerRef, AfterContentInit, ComponentFactoryResolver} from '@angular/core';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { PopupOptions } from './popup-options';
import { PopupInjector } from './popup-injector';
import { WindowInstance } from './window-instance';

@Component({
    selector: 'app-popup-container',
    template: `<ng-template #pTagTpl>
                    <p>{{textContent}}</p>
               </ng-template>

               <kendo-dialog-titlebar>
                        <h3>{{options.title}}</h3>
               </kendo-dialog-titlebar>
               <p *ngIf="options.info">{{options.info}}</p>
               <div [ngClass]="{'bgColour': options.contentAreaBgColor}" #contentContainer>
               </div>
               <kendo-dialog-actions>
                   <ul class="action-buttons">
                       <li *ngIf="options.showCancelButton">
                           <button (click)="cancel()">
                               {{options.cancelButtonText}}
                           </button>
                       </li>
                       <li>
                           <button (click)="done()" id="submitButton" class="submitBtn">
                               {{options.doneButtonText}}
                           </button>
                       </li>
                   </ul>
                </kendo-dialog-actions>
               `

    })
export class PopupContainerComponent extends DialogContentBase implements  OnInit, AfterContentInit {

    constructor(public dialog: DialogRef,
                private resolver: ComponentFactoryResolver) {
        super(dialog);
    }
    @ViewChild('contentContainer', { read: ViewContainerRef }) vcr: ViewContainerRef;
    @ViewChild('pTagTpl') pTagTpl;
    @Input() options: PopupOptions;

    public textContent: string;
    private windowInstance: WindowInstance;

    ngAfterContentInit(): void {
       if (this.textContent) {
            this.vcr.createEmbeddedView(this.pTagTpl);
       }
    }

    ngOnInit(): void {
        this.textContent =  typeof this.options.content === 'string' ? this.options.content : undefined;
        this.windowInstance = new WindowInstance(this.dialog);
        if (!this.textContent) {
            const contentComponent = this.resolver.resolveComponentFactory(this.options.content as any);
            this.vcr.createComponent(contentComponent,
                                     undefined,
                                     new PopupInjector(this.windowInstance, this.vcr.parentInjector, this.options.resolve));
        }
    }

    done() {
        this.windowInstance.done();
    }

    cancel() {
        this.windowInstance.cancel();
    }

}
