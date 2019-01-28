import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector, EmbeddedViewRef } from '@angular/core';
import { DialogService, DialogResult, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { PopupOptions } from './popup-options';
import { PopupContainerComponent } from './popup-container.component';
import { DialogContainerComponent } from './dialog-container.component';

@Injectable()
export class PopupWindowService {
    private dialogContainerAttached = false;
    constructor(private dialogService: DialogService,
         private applicationRef: ApplicationRef,
         private resolver: ComponentFactoryResolver,
         private injector: Injector ) {}


    public async alert(title: string, text: string, okButtonText: string = 'OK'): Promise<any> {
        return this.openDialog(
            {
                title,
                content: text,
                doneButtonText: okButtonText,
                showCancelButton: false
            });

    }

    public confirm(title: string, text: string, confirmButtonText: string): any {
        return this.openDialog(
            {
                title,
                content: text,
                doneButtonText: confirmButtonText,
                showCancelButton: true
            });
    }

    public openModal(popupOptions: PopupOptions) {
        return this.openDialog(popupOptions);
    }

    private openDialog(popupOptions: PopupOptions) {
        this.ensureKendoDialogContainer();
        popupOptions.showCancelButton = popupOptions.showCancelButton || false;
        popupOptions.cancelButtonText = popupOptions.cancelButtonText || 'Cancel';
        popupOptions.doneButtonText =  popupOptions.doneButtonText || 'Close';

        const dialogRef = this.dialogService.open({content: PopupContainerComponent});

        (dialogRef.content.instance as PopupContainerComponent).options = popupOptions;

        const promise = new Promise((resolve) => {
            dialogRef.result.subscribe((r: DialogResult) => {
                if (r instanceof DialogCloseResult) {
                    resolve(false);
                } else {
                    resolve(r);
                }

            });
        });

        return promise;
    }

    private ensureKendoDialogContainer() {
        if (this.dialogContainerAttached) { return; }

        const dialogContainerComponent = this.resolver.resolveComponentFactory<DialogContainerComponent>(DialogContainerComponent)
        .create(this.injector);

        this.applicationRef.attachView(dialogContainerComponent.hostView);
        const hostViewElement = ( dialogContainerComponent.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(hostViewElement);
        this.dialogContainerAttached = true;
    }
}

