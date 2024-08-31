export function ButtonHudMixin(ArgonButtonHud) {
    return class ButtonHud extends ArgonButtonHud {
        get visible() {
            return !game.combat?.started;
        }

        async _getButtons() {
            return [
                {
                    label: 'DND4e.LongRest',
                    onClick: (event) => this.actor.longRest(),
                    icon: "fas fa-bed",
                },
                {
                    label: 'DND4e.ShortRest',
                    onClick: (event) => this.actor.shortRest(),
                    icon: 'fas fa-coffee',
                }
            ];
        }
    }
}
