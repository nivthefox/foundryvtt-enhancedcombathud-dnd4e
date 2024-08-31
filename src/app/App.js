import {ButtonHudMixin} from '../hud/ButtonHud';
import {DrawerButtonMixin} from '../hud/DrawerButton';
import {PortraitPanelMixin} from '../hud/PortraitPanel';
import {WeaponSetsMixin} from '../hud/WeaponSets';

export class App {
    actionTypes = {
        action: ['standard'],
        move: ['move'],
        minor: ['minor'],
        triggered: ['opportunity', 'immediate interrupt', 'immediate reaction'],
        free: ['free']
    };

    itemTypes = {
        power: ['power'],
        item: ['item'],
        ritual: ['ritual']
    };

    echItems = {};

    constructor(CoreHUD) {
        const ARGON = CoreHUD.ARGON;

        if (game.system.id !== 'dnd4e') {
            return;
        }

        const mainBarFeatures = [];

        const mainPanels = [];
        mainPanels.push(ARGON.PREFAB.PassTurnPanel);

        CoreHUD.DND4E = {
            actionTypes: this.actionTypes,
            itemTypes: this.itemTypes,
            mainBarFeatures
        };

        Hooks.callAll('enhanced-combat-hud.dnd4e.initConfig', {
            actionTypes: this.actionTypes,
            itemTypes: this.itemTypes,
        });

        CoreHUD.definePortraitPanel(PortraitPanelMixin(ARGON.PORTRAIT.PortraitPanel));
        CoreHUD.defineDrawerPanel(DrawerButtonMixin(ARGON.DRAWER.DrawerButton));
        CoreHUD.defineButtonHud(ButtonHudMixin(ARGON.ButtonHud));
        CoreHUD.defineWeaponSets(WeaponSetsMixin(ARGON.WeaponSets));
        CoreHUD.defineMainPanels(mainPanels);
        /** todo: 4e specifics **/
        CoreHUD.defineMovementHud(ARGON.MovementHud);
        /** end todo **/
        CoreHUD.defineSupportedActorTypes(['Player Character']);
    }
}
