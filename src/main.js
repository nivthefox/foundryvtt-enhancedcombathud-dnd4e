import {App} from "./app/App";

Hooks.on('argonInit', (CoreHUD) => {
    new App(CoreHUD);
});