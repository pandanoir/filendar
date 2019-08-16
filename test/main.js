const assert = require('assert');
const Calendar = require('../dist/filendar.js');
const {filter, SUNDAY, MONDAY, TUEDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUN, MON, TUE, WED, THU, FRI, SAT} = Calendar;

const toDate = (year, month) => date => new Calendar.Date(year, month, date);

describe('filendar', () => {
    describe('Date', () => {
        it('constructor', () => {
            const fdate1 = new Calendar.Date();
            const date1 = new Date();
            assert.equal(fdate1.date, date1.getDate());
            assert.equal(fdate1.month, date1.getMonth());
            assert.equal(fdate1.year, date1.getFullYear());

            const fdate2 = new Calendar.Date(2016, 12 - 1, 32);
            const date2 = new Calendar.Date(2017, 1 - 1, 1);
            assert.equal(fdate2.date, date2.getDate());
            assert.equal(fdate2.month, date2.getMonth());
            assert.equal(fdate2.year, date2.getFullYear());
        });
        it('equals', () => {
            const date1 = new Calendar.Date(2016, 12 - 1, 31);
            const date2 = new Calendar.Date(2016, 12 - 1, 31);
            const date3 = new Calendar.Date(2016, 12 - 1, 30);
            const date4 = new Calendar.Date(2017, 12 - 1, 30);
            const date5 = new Calendar.Date(2016, 11 - 1, 30);
            assert.ok(date1.equals(date2));
            assert.ok(!date1.equals(date3));
            assert.ok(!date1.equals(date4));
            assert.ok(!date1.equals(date5));
        })
    });
    describe('Month', () => {
        it('constructor', () => {
            assert.equal(new Calendar.Month().month, new Date().getMonth());
            assert.equal(new Calendar.Month().year, new Date().getFullYear());

            assert.equal(new Calendar.Month(2016, 12).month, new Date(2017, 1 - 1, 1).getMonth());
            assert.equal(new Calendar.Month(2016, 12).year, new Date(2017, 1 - 1, 1).getFullYear());
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
        it('lastDay', () => {
            const lastDay = filter.lastDay.bind(filter);
            assert.ok(new Calendar.Date(2017, 1, 24).is(lastDay(FRI)));
        });
        it('and', () => {
            assert.deepEqual(
                new Calendar.Year(2016).filter(filter.and(filter.month(10 - 1), filter.date(13))),
                [new Calendar.Date(2016, 10 - 1, 13)]
            );
        });
        it('nand', () => {
            assert.deepEqual(
                new Calendar.Month(2016, 10 - 1).filter(filter.nand(filter.day(SAT), filter.date(1))),
                [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(toDate(2016, 10 - 1))
            );
        });
        it('or', () => {
            assert.deepEqual(
                new Calendar.Month(2016, 10 - 1).filter(filter.or(filter.day(FRI), filter.date(13))),
                [7, 13, 14, 21, 28].map(toDate(2016, 10 - 1))
            );
        });
        it('nor', () => {
            assert.deepEqual(
                new Calendar.Month(2016, 10 - 1).filter(filter.nor(filter.day(SAT), filter.day(SUN))),
                [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 31].map(toDate(2016, 10 - 1))
            );
        });
        it('not', () => {
            assert.deepEqual(
                new Calendar.Month(2016, 10 - 1).filter(filter.and(filter.not(filter.day(SAT)), filter.not(filter.day(SUN)))),
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
        it('theEmperorsBirthday', () => {
            assert.deepEqual(ph1.filter(filter.theEmperorsBirthday()), [new Calendar.Date(2016, 12 - 1, 23)]);
            // assert.deepEqual(new Calendar.Year(2019).filter(filter.theEmperorsBirthday()), []);
            // assert.deepEqual(new Calendar.Year(2020).filter(filter.theEmperorsBirthday()), [new Calendar.Date(2020, 2 - 1, 23)]);
        });
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
        it('substituteHoliday', () => {
            assert.deepEqual(
                new Calendar.Year(2016).filter(filter.substituteHoliday()),
                [new Calendar.Date(2016, 3 - 1, 21)]
            );
            const substituteHoliday = filter.substituteHoliday();

            assert.ok(new Calendar.Date(1981, 5 - 1, 4).is(substituteHoliday));
            assert.ok(new Calendar.Date(2008, 5 - 1, 6).is(substituteHoliday));
            assert.ok(new Calendar.Date(2009, 5 - 1, 6).is(substituteHoliday));

            assert.equal(new Calendar.Year(1973).filter(substituteHoliday).length, 2);
            assert.equal(new Calendar.Year(1974).filter(substituteHoliday).length, 3);
            assert.equal(new Calendar.Year(1975).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(1976).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(1978).filter(substituteHoliday).length, 2);
            assert.equal(new Calendar.Year(1979).filter(substituteHoliday).length, 2);
            assert.equal(new Calendar.Year(1980).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(1981).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(1982).filter(substituteHoliday).length, 2);
            assert.equal(new Calendar.Year(1984).filter(substituteHoliday).length, 4);
            assert.equal(new Calendar.Year(1985).filter(substituteHoliday).length, 3);
            assert.equal(new Calendar.Year(1986).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(1987).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(1988).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(1989).filter(substituteHoliday).length, 2);
            assert.equal(new Calendar.Year(1990).filter(substituteHoliday).length, 4);
            assert.equal(new Calendar.Year(1991).filter(substituteHoliday).length, 3);
            assert.equal(new Calendar.Year(1992).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(1993).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(1995).filter(substituteHoliday).length, 2);
            assert.equal(new Calendar.Year(1996).filter(substituteHoliday).length, 4);
            assert.equal(new Calendar.Year(1997).filter(substituteHoliday).length, 2);
            assert.equal(new Calendar.Year(1998).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(1999).filter(substituteHoliday).length, 2);
            assert.equal(new Calendar.Year(2001).filter(substituteHoliday).length, 4);
            assert.equal(new Calendar.Year(2002).filter(substituteHoliday).length, 3);
            assert.equal(new Calendar.Year(2003).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(2005).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(2006).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(2007).filter(substituteHoliday).length, 4);
            assert.equal(new Calendar.Year(2008).filter(substituteHoliday).length, 2);
            assert.equal(new Calendar.Year(2009).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(2010).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(2012).filter(substituteHoliday).length, 3);
            assert.equal(new Calendar.Year(2013).filter(substituteHoliday).length, 2);
            assert.equal(new Calendar.Year(2014).filter(substituteHoliday).length, 2);
            assert.equal(new Calendar.Year(2015).filter(substituteHoliday).length, 1);
            assert.equal(new Calendar.Year(2016).filter(substituteHoliday).length, 1);
        });
        it('citizensHoliday', () => {
            assert.ok(!new Calendar.Date(1985, 5 - 1, 4).is(filter.citizensHoliday()));
            assert.ok(!new Calendar.Date(1986, 5 - 1, 4).is(filter.citizensHoliday()));
            assert.ok(!new Calendar.Date(1987, 5 - 1, 4).is(filter.citizensHoliday()));
            assert.ok(new Calendar.Date(1988, 5 - 1, 4).is(filter.citizensHoliday()));
            assert.ok(new Calendar.Date(2009, 9 - 1, 22).is(filter.citizensHoliday()));
        });
        it('weekday', () => {
            const res = [];
            for (let i = 0; i < 12; i++) res.push(new Calendar.Month(2016, i).filter(filter.weekday()).length);
            assert.deepEqual(res, [19, 20, 22, 20, 19, 22, 20, 22, 20, 20, 20, 21]);
        });
    })
});
