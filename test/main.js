const assert = require('assert');
const Calendar = require('../dist/calendar.js');
const {filter, filter: {year, month, date, day, nthDay, and, or}, SUNDAY, MONDAY, TUEDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUN, MON, TUE, WED, THU, FRI, SAT} = Calendar;

const toDate = (year, month) => date => new Calendar.Date(year, month, date);
describe('calendar.js', () => {
    describe('Date', () => {
        it('constructor', () => {
            assert.ok(new Calendar.Date(2016, 11 - 1, 25).is(and(nthDay(4, FRI), and(year(2016), month(11 - 1)))));
        });
    });
    describe('Month', () => {
        it('constructor', () => {
            assert.deepEqual(new Calendar.Month(2016, 11 - 1).filter(day(FRI)), [4, 11, 18, 25].map(toDate(2016, 11 - 1)));
            assert.deepEqual(new Calendar.Month(2016, 11 - 1).filter(day(TUE)), [1, 8, 15, 22, 29].map(toDate(2016, 11 - 1)));
            assert.deepEqual(new Calendar.Month(2016, 11 - 1).filter(nthDay(1, TUE)), [1].map(toDate(2016, 11 - 1)));
        });
    });
    describe('Year', () => {
        it('constructor', () => {
            assert.deepEqual(new Calendar.Year(2016).filter(filter.publicHoliday()),
                [
                    new Calendar.Date(2016, 1 - 1, 1),
                    new Calendar.Date(2016, 1 - 1, 11),
                    new Calendar.Date(2016, 2 - 1, 11),
                    new Calendar.Date(2016, 3 - 1, 20),
                    new Calendar.Date(2016, 4 - 1, 29),
                    new Calendar.Date(2016, 5 - 1, 3),
                    new Calendar.Date(2016, 5 - 1, 4),
                    new Calendar.Date(2016, 5 - 1, 5),
                    new Calendar.Date(2016, 7 - 1, 18),
                    new Calendar.Date(2016, 8 - 1, 11),
                    new Calendar.Date(2016, 9 - 1, 19),
                    new Calendar.Date(2016, 9 - 1, 22),
                    new Calendar.Date(2016, 10 - 1, 10),
                    new Calendar.Date(2016, 11 - 1, 3),
                    new Calendar.Date(2016, 11 - 1, 23),
                    new Calendar.Date(2016, 12 - 1, 23)
                ]
            );
            const res = [];
            for (let i = 0; i < 12; i++) res.push(new Calendar.Month(2016, i).filter(filter.weekday()).length);
            assert.deepEqual(res, [19, 20, 22, 20, 19, 22, 20, 22, 20, 20, 20, 21]);
        });
    });
});
