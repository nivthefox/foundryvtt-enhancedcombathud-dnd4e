export function StandardActionPanelMixin(ArgonActionPanel, Button) {
    return class StandardActionPanel extends ArgonActionPanel {
        isActionUsed = false;

        get label() {
            return "DND4e.StandardAction";
        }

        get maxActions() {
            return this.actor?.inCombat ? 1 : null;
        }

        get currentActions() {
            return this.isActionUsed ? 0 : 1;
        }

        _onNewRound (combat) {
            this.isActionUsed = false;
            this.updateActionUse();
        }

        async _getButtons() {
            const powerItems = this.actor.items.filter(item => item.type === 'power');

            const buttons = powerItems.map(item => {
                return new Button({
                    type: 'power',
                    item: item,
                    color: 0
                });
            });
        }
    }
}