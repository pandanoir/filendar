import _Date from './date.js';

export default class Month {
    constructor(year, month) {
        if (year == null) year = new Date().getFullYear();
        if (month == null) month = new Date().getMonth();
        this.year = year;
        this.month = month;
        this.lastDate = new Date(year, month + 1, 0).getDate();
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
}
