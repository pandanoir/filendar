const assert = require('assert');
const Calendar = require('../dist/calendar.js');
const {filter, SUNDAY, MONDAY, TUEDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUN, MON, TUE, WED, THU, FRI, SAT} = Calendar;

const toDate = (year, month) => date => new Calendar.Date(year, month, date);

describe('calendar.js', () => {
    describe('Date', () => {
        it('constructor', () => {
            assert.ok(new Calendar.Date(2016, 11 - 1, 25).is(
                filter.and(filter.nthDay(4, FRI), filter.and(filter.year(2016), filter.month(11 - 1)))
            ));
        });
    });
    describe('Month', () => {
        it('constructor', () => {
            assert.deepEqual(
                new Calendar.Month(2016, 11 - 1).filter(filter.day(FRI)),
                [4, 11, 18, 25].map(toDate(2016, 11 - 1))
            );
            assert.deepEqual(
                new Calendar.Month(2016, 11 - 1).filter(filter.day(TUE)),
                [1, 8, 15, 22, 29].map(toDate(2016, 11 - 1))
            );
            assert.deepEqual(
                new Calendar.Month(2016, 11 - 1).filter(filter.nthDay(1, TUE)),
                [1].map(toDate(2016, 11 - 1))
            );
        });
    });
    describe('Year', () => {
        it('constructor', () => {
        });
    });
    describe('filter', () => {
        const ph1 = new Calendar.Year(2016).filter(filter.publicHoliday());
        const publicHolidays2 = new Calendar.Year(2017).filter(filter.publicHoliday());
        it('year', () => {
            const year = filter.year.bind(filter);
            assert.equal(new Calendar.Year(2016).filter(year(2016)).length, 366);
            assert.equal(new Calendar.Year(2016).filter(year(2017)).length, 0);
            assert.equal(new Calendar.Year(2017).filter(year(2017)).length, 365);
            assert.equal(new Calendar.Year(2017).filter(year(2016)).length, 0);
        });
        it('month', () => {
            const month = filter.month.bind(filter);
            assert.equal(new Calendar.Year(2016).filter(month(1 - 1)).length, 31);
            assert.equal(new Calendar.Year(2016).filter(month(2 - 1)).length, 29);
            assert.equal(new Calendar.Year(2016).filter(month(3 - 1)).length, 31);
        });
        it('date', () => {
            const date = filter.date.bind(filter);
            assert.equal(new Calendar.Year(2016).filter(date(29)).length, 12);
            assert.equal(new Calendar.Year(2017).filter(date(29)).length, 11);
        });
        it('day', () => {
            const day = filter.day.bind(filter);
            assert.ok(new Calendar.Date(2016, 0, 1).is(day(FRI)));
        });
        it('nthDay', () => {
            const nthDay = filter.nthDay.bind(filter);
            assert.ok(new Calendar.Date(2016, 0, 11).is(nthDay(2, MON)));
        });
        it('and', () => {
            assert.deepEqual(
                new Calendar.Year(2016).filter(filter.and(filter.month(10 - 1), filter.date(13))),
                [new Calendar.Date(2016, 10 - 1, 13)]
            );
        });
        it('or', () => {
            assert.deepEqual(
                new Calendar.Month(2016, 10 - 1).filter(filter.or(filter.day(FRI), filter.date(13))),
                [7, 13, 14, 21, 28].map(toDate(2016, 10 - 1))
            );
        });
        it('not', () => {
            assert.deepEqual(
                new Calendar.Month(2016, 10 - 1).filter(filter.not(filter.or(filter.day(SAT), filter.day(SUN)))),
                [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 31].map(toDate(2016, 10 - 1))
            );
        });
        it('since', () => {
            const since = filter.since.bind(filter);
            assert.ok(new Calendar.Date(2016, 0, 11).is(since(new Date(2016, 0, 10))));
            assert.ok(new Calendar.Date(2016, 0, 11).is(since(new Date(2016, 0, 11))));
            assert.ok(!new Calendar.Date(2016, 0, 11).is(since(new Date(2016, 0, 12))));

            assert.ok(new Calendar.Date(2016, 0, 11).is(since(new Calendar.Date(2016, 0, 10))));
            assert.ok(new Calendar.Date(2016, 0, 11).is(since(new Calendar.Date(2016, 0, 11))));
            assert.ok(!new Calendar.Date(2016, 0, 11).is(since(new Calendar.Date(2016, 0, 12))));
        });
        it('until', () => {
            const until = filter.until.bind(filter);
            assert.ok(!new Calendar.Date(2016, 0, 11).is(until(new Date(2016, 0, 10))));
            assert.ok(new Calendar.Date(2016, 0, 11).is(until(new Date(2016, 0, 11))));
            assert.ok(new Calendar.Date(2016, 0, 11).is(until(new Date(2016, 0, 12))));

            assert.ok(!new Calendar.Date(2016, 0, 11).is(until(new Calendar.Date(2016, 0, 10))));
            assert.ok(new Calendar.Date(2016, 0, 11).is(until(new Calendar.Date(2016, 0, 11))));
            assert.ok(new Calendar.Date(2016, 0, 11).is(until(new Calendar.Date(2016, 0, 12))));
        });
        it('range', () => {
            const range = filter.range.bind(filter);
            const rangeFilter = range(new Date(2016, 0, 10), new Date(2016, 0, 11));
            assert.ok(!new Calendar.Date(2016, 0, 9).is(rangeFilter));
            assert.ok(new Calendar.Date(2016, 0, 10).is(rangeFilter));
            assert.ok(new Calendar.Date(2016, 0, 11).is(rangeFilter));
            assert.ok(!new Calendar.Date(2016, 0, 12).is(rangeFilter));
        });
        it('every', () => {
            const every = filter.every.bind(filter);
            const everyFilter = every(3, new Date(2016, 0, 11));
            assert.ok(new Calendar.Date(2016, 0, 8).is(everyFilter));
            assert.ok(!new Calendar.Date(2016, 0, 9).is(everyFilter));
            assert.ok(!new Calendar.Date(2016, 0, 10).is(everyFilter));
            assert.ok(new Calendar.Date(2016, 0, 11).is(everyFilter));
            assert.ok(!new Calendar.Date(2016, 0, 12).is(everyFilter));
            assert.ok(!new Calendar.Date(2016, 0, 13).is(everyFilter));
            assert.ok(new Calendar.Date(2016, 0, 14).is(everyFilter));
        });
        it('leapYear', () => {
            const leapYear = filter.leapYear.bind(filter);
            assert.ok(!new Calendar.Date(2015, 0, 1).is(leapYear()));
            assert.ok(new Calendar.Date(2016, 0, 1).is(leapYear()));
            assert.ok(!new Calendar.Date(2017, 0, 1).is(leapYear()));
        });
        it('vernalEquinoxDay', () => assert.deepEqual(
            ph1.filter(filter.vernalEquinoxDay()),
            [new Calendar.Date(2016, 3 - 1, 20)]
        ));
        it('autumnalEquinoxDay', () => assert.deepEqual(
            ph1.filter(filter.autumnalEquinoxDay()),
            [new Calendar.Date(2016, 9 - 1, 22)]
        ));
        it('fullMoonNight', () => assert.deepEqual(
            new Calendar.Year(2016).filter(filter.fullMoonNight()),
            [new Calendar.Date(2016, 9 - 1, 15)]
        ));
        it('newYearsDay', () => assert.deepEqual(
            ph1.filter(filter.newYearsDay()),
            [new Calendar.Date(2016, 1 - 1, 1)]
        ));
        it('comingOfAgeDay', () => assert.deepEqual(
            ph1.filter(filter.comingOfAgeDay()),
            [new Calendar.Date(2016, 1 - 1, 11)]
        ));
        it('foundationDay', () => assert.deepEqual(
            ph1.filter(filter.foundationDay()),
            [new Calendar.Date(2016, 2 - 1, 11)]
        ));
        it('showaDay', () => assert.deepEqual(
            ph1.filter(filter.showaDay()),
            [new Calendar.Date(2016, 4 - 1, 29)]
        ));
        it('constitutionMemorialDay', () => assert.deepEqual(
            ph1.filter(filter.constitutionMemorialDay()),
            [new Calendar.Date(2016, 5 - 1, 3)]
        ));
        it('greeneryDay', () => assert.deepEqual(
            ph1.filter(filter.greeneryDay()),
            [new Calendar.Date(2016, 5 - 1, 4)]
        ));
        it('childrensDay', () => assert.deepEqual(
            ph1.filter(filter.childrensDay()),
            [new Calendar.Date(2016, 5 - 1, 5)]
        ));
        it('marineDay', () => assert.deepEqual(
            ph1.filter(filter.marineDay()),
            [new Calendar.Date(2016, 7 - 1, 18)]
        ));
        it('mountainDay', () => assert.deepEqual(
            ph1.filter(filter.mountainDay()),
            [new Calendar.Date(2016, 8 - 1, 11)]
        ));
        it('respectForTheAgedDay', () => assert.deepEqual(
            ph1.filter(filter.respectForTheAgedDay()),
            [new Calendar.Date(2016, 9 - 1, 19)]
        ));
        it('healthAndSportsDay', () => assert.deepEqual(
            ph1.filter(filter.healthAndSportsDay()),
            [new Calendar.Date(2016, 10 - 1, 10)]
        ));
        it('cultureDay', () => assert.deepEqual(
            ph1.filter(filter.cultureDay()),
            [new Calendar.Date(2016, 11 - 1, 3)]
        ));
        it('labourThanksgivingDay', () => assert.deepEqual(
            ph1.filter(filter.labourThanksgivingDay()),
            [new Calendar.Date(2016, 11 - 1, 23)]
        ));
        it('theEmperorsBirthday', () => assert.deepEqual(
            ph1.filter(filter.theEmperorsBirthday()),
            [new Calendar.Date(2016, 12 - 1, 23)]
        ));
        it('publicHoliday', () => {
            assert.deepEqual(ph1, [
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
            ]);
        });
        it('substituteHoliday', () => assert.deepEqual(
            new Calendar.Year(2016).filter(filter.substituteHoliday()),
            [new Calendar.Date(2016, 3 - 1, 21)]
        ));
        it('weekday', () => {
            const res = [];
            for (let i = 0; i < 12; i++) res.push(new Calendar.Month(2016, i).filter(filter.weekday()).length);
            assert.deepEqual(res, [19, 20, 22, 20, 19, 22, 20, 22, 20, 20, 20, 21]);
        });
    })
});
