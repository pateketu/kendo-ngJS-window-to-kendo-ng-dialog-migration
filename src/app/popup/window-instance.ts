import { DialogRef } from '@progress/kendo-angular-dialog';

export class WindowInstance {
    private doneFunc: Function;
    private cancelFunc: Function;
    constructor(private diaglogRef: DialogRef) {

    }

    public get done(): Function {
        return this.doneFunc || (() => this.diaglogRef.close(true));
    }
    public set done(func: Function) {
        this.doneFunc = func;
    }

    public get cancel(): Function {
        return this.cancelFunc || (() => this.diaglogRef.close(false));
    }
    public set cancel(func: Function) {
        this.cancelFunc = func;
    }

    public close(result?: any) {
        this.diaglogRef.close(result);
    }
}
