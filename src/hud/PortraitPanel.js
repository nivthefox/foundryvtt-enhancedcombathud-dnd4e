
export function PortraitPanelMixin(ArgonPortraitPanel) {
    return class PortraitPanel extends ArgonPortraitPanel {
        get description() {
            const {type, system} = this.actor;

            if (type === 'Player Character') {
                return `Level ${system.details.level} ${system.details.race} ${system.details.class}`;
            }

            return '';
        }

        get isBloodied() {
            return this.actor.system.isBloodied;
        }

        get isDead() {
            const {type, system} = this.actor;

            if (type === 'Player Character') {
                return system.attributes.hp.value <= system.attributes.hp.min || system.details.deathsavefail >= system.details.deathsaves;
            }
        }

        get isDying() {
            return system.attributes.hp.value <= 0;
        }

        get configurationTemplate() {
            return ``;
        }
    }
}