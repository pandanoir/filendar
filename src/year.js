import _Date from './date.js';
import Month from './month.js';

export default class Year {
    constructor(year) {
        this.year = year;
    }
    filter(filter) {
        const res = [];
        for (let month = 1 - 1; month <= 12 - 1; month = 0 | month + 1) {
            res.push(...new Month(this.year, month).filter(filter));
        }
        return res;
    }
    getNextYear() {
        return new Year(this.year + 1);
    }
    getPrevYear() {
        return new Year(this.year - 1);
    }
}
