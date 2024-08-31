export function WeaponSetsMixin(ArgonWeaponSets) {
    return class WeaponSets extends ArgonWeaponSets {
        async getDefaultSets() {
            // const sets = await super.getDefaultSets();
            const weapons = this.actor.items.filter(item => item.type === 'weapon');
            return {
                1: {
                    primary: weapons[0]?.uuid ?? null,
                },
                2: {
                    primary: weapons[1]?.uuid ?? null,
                },
                3: {
                    primary: weapons[2]?.uuid ?? null,
                },
            };
        }

        async _getSets() {
            const sets = foundry.utils.mergeObjects(
                await this.getDefaultSets(),
                foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") || {})
            );

            for (const [set, slots] of Object.entries(sets)) {
                slots.primary = slots.primary ? await fromUuid(slots.primary) : null;
                slots.secondary = slots.secondary ? await fromUuid(slots.secondary) : null;
            }
            return sets;
        }

        async _onSetChange({ sets, active }) {
            const updates = [];
            const activeSet = sets[active];
            const activeItems = Object.values(activeSet).filter(item => item);
            const inactiveSets = Object.values(sets).filter(set => set !== activeSet);
            const inactiveItems = inactiveSets
                .flatMap(set => Object.values(set))
                .filter(item => item)
                .filter(item => !activeItems.includes(item));
            activeItems.forEach(item => {
                if (!item.system?.equipped) {
                    updates.push({_id: item.id, "system.equipped": true});
                }
            });
            inactiveItems.forEach(item => {
                if (item.system?.equipped) {
                    updates.push({_id: item.id, "system.equipped": false});
                }
            });

            return await this.actor.updateEmbeddedDocuments("Item", updates);
        }
    }
}