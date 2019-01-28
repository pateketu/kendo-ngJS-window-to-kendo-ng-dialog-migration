import { Injector, InjectFlags } from '@angular/core';
import { WindowInstance } from './window-instance';

export class PopupInjector implements Injector {

    constructor(private windowInstance: WindowInstance,
                private parentInjector: Injector,
                private resovle: {[key: string]: any}) {}

    get(token: any, notFoundValue?: any);

    get<T>(token: any, notFoundValue?: T, flags?: InjectFlags) {
        if (token === WindowInstance) {
            return this.windowInstance;
        }
        // Atttemp to find it in the options.resolve
        if (typeof token === 'string') {
            if (token in this.resovle) {
                return this.resovle[token];
            }
        }
        return this.parentInjector.get(token, notFoundValue, flags);
    }
}
