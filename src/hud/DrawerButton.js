export function DrawerButtonMixin(ArgonDrawerButton) {
    return class DrawerButton extends ArgonDrawerButton {
        constructor(buttons, item, type) {
            super(buttons);
            this.item = item;
            this.type = type;
        }

        get hasTooltip() {
            return true;
        }

        get tooltipOrientation() {
            return TooltipManager.TOOLTIP_DIRECTIONS.RIGHT;
        }



        async getTooltipData() {
            return await getTooltipDetails(this.item, this.type);
        }
    }
}
