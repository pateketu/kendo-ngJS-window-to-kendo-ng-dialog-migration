import { TemplateRef } from '@angular/core';

export interface PopupOptions {
    title: string;
    content: string | TemplateRef<any> | Function;
    info?: string;
    contentAreaBgColor?: string;
    showCancelButton?: boolean;
    cancelButtonText?: string;
    doneButtonText?: string;
    resolve?: {[key: string]: any};
}
