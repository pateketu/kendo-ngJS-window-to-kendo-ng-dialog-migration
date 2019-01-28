## Kendo Window to Kendo Dialog Migration

On our Angular 1.6 project we have been using [Angular Kendo Window](https://github.com/kjartanvalur/angular-kendo-window) extensively and it works great, we have wrapped $kWindow service provided by Angular Kendo Window in our own "PopupWindowService" in order provide some additional functionality like ability capture click of "Done/OK" and "Cancel" button within the Pop-up.

Now we are migrating away from AngularJs to Angular and with that also moving to Kendo UI for Angular. Kendo UI provides a Dialog component which provides an Angular Service similar to $kWindow service but its not exactly same, and we needed to carry forward following functionality in our new PopWindowService.

1. Provide ability to capture click of "OK" and "Cancel" Buttons within the component that is loaded into the Dialog, so that discission can be made about if user is allowed to close the dialog or not, for example in case of validation error in a form, we would like to cancel closing of the Window.       
2. Very Custom Header and Action button styling
3. Ability to pass parameters to Component that is loaded in the Dialog via a "resolve" sort of functionality from old $kWindow, this was purely to keep amount of re-factoring needed in moving old "html templates" & "controllers" to new "Component" model
4. Ability to load the Dialog without putting `<ng-template kendoDialogContainer></ng-template>` somewhere in the mark-up as we needed Dialog to be appended to the `<body>` tag for styling reasons, 


This PoC is the result of some investigation and pocking around Kendo's code base. 

##### Here's a high level detail of how above 4 requirements are achieved 
1. old $kWindow allowed an $windowInstance to be injected into the "Controller", the PoC follows the similar pattern and there is equivalent WindowInstance available that can be injected into Components loaded into the Dialog box. This is done via a custom Injector when creating the Component to load. (src/app/popup/popup-injector.ts)
2. Kendo Dialog already provides an easy way to customize everything from Header to Action buttons and thats what the PoC follows
3. Again any custom params can be be injected into the Component loaded into the Dialog, again this is done via the custom injector
4. Got a clue for this one from Kendo's Notification source code, idea is create a component with necessary marke up of `<ng-template kendoDialogContainer></ng-template>` (src/app/popup/dialog-container.component.ts) and load it Dynamically and append it to the `<body>` tag before calling the `open` method on Kendo's `DialogService`, This has to be done just once as we only a single container. see `ensureKendoDialogContainer` method in src/app/popup/popup-window.service.ts
