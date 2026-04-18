import { calendarDayKey, formatCalendar, normalizeCalendar } from "./calendar.js";

export class PTUCalendarSheet extends FormApplication {
    _calendarHook = null;

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: "Calendar",
            classes: ["ptu", "sheet", "calendar"],
            template: "systems/ptu/static/templates/apps/calendar-sheet.hbs",
            width: 420,
            height: "auto",
            closeOnSubmit: false,
            submitOnChange: false,
            submitOnClose: false,
        });
    }

    getData() {
        const data = super.getData();
        const calendar = game.ptu.calendar.get();

        return foundry.utils.mergeObject(data, {
            calendar,
            calendarDisplay: formatCalendar(calendar),
            calendarDayKey: calendarDayKey(calendar),
            editable: game.user.isGM,
        });
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (this._calendarHook) return;

        this._calendarHook = Hooks.on("ptuCalendarChanged", () => this.render(false));
    }

    async close(options = {}) {
        if (this._calendarHook) {
            Hooks.off("ptuCalendarChanged", this._calendarHook);
            this._calendarHook = null;
        }

        return super.close(options);
    }

    async _updateObject(event, formData) {
        if (!game.user.isGM) return;

        await game.ptu.calendar.set(normalizeCalendar(formData));
    }
}