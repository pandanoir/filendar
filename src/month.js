import _Date from './date.js';

export default class Month {
    constructor(year = new Date().getFullYear(), month = new Date().getMonth()) {
        const firstDate = new Date(year, month, 1); // monthが0から11以外の場合があるからここで対応
        this.year = firstDate.getFullYear();
        this.month = firstDate.getMonth();
        this.lastDate = new Date(year, month + 1, 0).getDate();
        this._weeks = null;
    }
    filter(filter) {
        const res = [];
        for (let date = 1; date <= this.lastDate; date = 0 | date + 1) {
            if (new _Date(this.year, this.month, date).is(filter)) {
                res[res.length] = new _Date(this.year, this.month, date);
            }
        }
        return res;
    }
    getWeeks() {
        if (this._weeks !== null) return this._weeks;
        this._weeks = [];
        let week = [];
        for (let i = 1 - new Date(this.year, this.month, 1).getDay(); i <= this.lastDate; i = 0 | i + 1) {
            week[week.length] = i > 0 ? i : 0;
            if (week.length === 7) {
                this._weeks[this._weeks.length] = week;
                week = [];
            }
        }
        if (week.length !== 0) {
            while (week.length !== 7) {
                week[week.length] = 0;
            }
            this._weeks[this._weeks.length] = week;
            week = [];
        }
        return this._weeks;
    }
    getNextMonth() {
        return new Month(this.year, this.month + 1);
    }
    getPrevMonth() {
        return new Month(this.year, this.month - 1);
    }
}
