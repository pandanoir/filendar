import _Date from './date.js';

export default class Month {
    constructor(year, month) {
        if (year == null) year = new Date().getFullYear();
        if (month == null) month = new Date().getMonth();
        this.year = year;
        this.month = month;
        this.lastDate = new Date(year, month + 1, 0).getDate();
        this.weeks = null;
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
        if (this.weeks !== null) return this.weeks;
        this.weeks = [];
        let week = [];
        for (let i = 1 - new Date(this.year, this.month, 1).getDay(); i <= this.lastDate; i = 0 | i + 1) {
            week[week.length] = i > 0 ? i : 0;
            if (week.length === 7) {
                this.weeks.push(week);
                week = [];
            }
        }
        if (week.length !== 0) {
            while (week.length !== 7) {
                week[week.length] = 0;
            }
            this.weeks.push(week);
            week = [];
        }
        return this.weeks;
    }
}
