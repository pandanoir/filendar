const SUN = 0;
const MON = 1;
const SAT = 6;
export default {
    year: year => date => date.getFullYear() === year,
    month: month => date => date.getMonth() === month,
    date: date => _date => _date.getDate() === date,
    day: day => date => date.getDay() === day,
    nthDay: (n, day) => date => date.getDay() === day && (0 | (date.getDate() - 1) / 7) === n - 1,
    and: (...filters) => date => filters.reduce((res, filter) => res && filter(date), true),
    or: (...filters) => date => filters.reduce((res, filter) => res || filter(date), false),
    not: filter => date => !filter(date),
    since: since => date => since.getTime() <= date.getTime(),
    until: until => date => date.getTime() <= until.getTime(),
    range: (start, end) => date => start.getTime() <= date.getTime() && date.getTime() <= end.getTime(),
    leapYear: () => date => {
        const y = date.getFullYear();
        return y % 400 === 0 || y % 100 !== 0 && y % 4 === 0;
    },
    vernalEquinoxDay: () => date => {
        const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDate();
        if (y < 1949 || m + 1 !== 3) return false; // 1949年以前は祝日ではなかった
        if (y > 2030) return false; // 得られたデータが2030年までしかないからこうするしかない
        return d === 20 + parseInt('1111111111101110111011101110111011101110111001100110011001100110011001100110001000'.charAt(y - 1949), 10);
    },
    autumnalEquinoxDay: () => date => {
        const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDate();
        if (y < 1948 || m + 1 !== 9) return false; // 1948年以前は祝日ではなかった
        if (y > 2030) return false; // 得られたデータが2030年までしかないからこうするしかない
        if (y % 4 === 3 && 1979 >= y && y >= 1951) return d === 24;
        if (y % 4 === 0 && 2044 >= y && y >= 2012) return d === 22;
        if (d === 23) return true;
        return false;
    },
    fullMoonNight: () => date => {
        const MEIGETSU = [
            {d: 27}, {d: 16}, {m: 9, d: 5}, {d: 24}, {d: 13}, {m: 9, d: 2}, {d: 22}, {d: 10}, {d: 29},
            {d: 18}, {m: 9, d: 6}, {d: 25}, {d: 15}, {m: 9, d: 4}, {d: 23}, {d: 12}, {d: 30}, {d: 19},
            {m: 9, d: 8}, {d: 26}, {d: 16}, {m: 9, d: 5}, {d: 25}, {d: 13}, {m: 9, d: 2}, {d: 21}, {d: 10},
            {d: 28}, {d: 17}, {m: 9, d: 6}, {d: 26}, {d: 15}, {m: 9, d: 4}, {d: 23}, {d: 12}, {d: 30},
            {d: 19}, {m: 9, d: 8}, {d: 27}, {d: 16}, {m: 9, d: 5}, {d: 25}, {d: 14}, {m: 9, d: 1}, {d: 20},
            {d: 10}, {d: 29}, {d: 17}, {m: 9, d: 6}, {d: 26}, {d: 15}, {m: 9, d: 3}, {d: 22}, {d: 11},
            {d: 30}, {d: 19}, {d: 8}, {d: 27}, {d: 17}, {m: 9, d: 5}, {d: 24}, {d: 13}, {m: 9, d: 2},
            {d: 20}, {d: 10}, {d: 29}, {d: 18}, {m: 9, d: 6}, {d: 26}, {d: 15}, {m: 9, d: 3}, {d: 22},
            {d: 11}, {d: 30}, {d: 20}, {d: 8}, {d: 27}, {d: 17}, {m: 9, d: 5}, {d: 23}, {d: 12},
            {m: 9, d: 1}, {d: 21}, {d: 10}, {d: 29}, {d: 18}, {m: 9, d: 7}, {d: 25}, {d: 14}, {m: 9, d: 3},
            {d: 22}, {d: 11}, {d: 30}, {d: 20}, {d: 9}, {d: 27}, {d: 16}, {m: 9, d: 5}, {d: 24},
            {d: 12}, {m: 9, d: 1}, {d: 21}, {d: 11}, {d: 28}, {d: 18}, {m: 9, d: 6}, {d: 25}, {d: 14},
            {m: 9, d: 3}, {d: 22}, {d: 12}, {d: 30}, {d: 19}, {d: 8}, {d: 27}, {d: 15}, {m: 9, d: 4},
            {d: 24}, {d: 13}, {m: 9, d: 1}, {d: 21}, {d: 10}, {d: 29}, {d: 17}, {m: 9, d: 6}, {d: 25},
            {d: 15}, {m: 9, d: 3}, {d: 22}, {d: 12}
        ];
        const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDate();
        if(y < 1901 || y > 2030) return false;// データなし
        return (!MEIGETSU[y - 1901].m && m === 8 || MEIGETSU[y - 1901].m === m) && MEIGETSU[y-1901].d === d;
    },
    newYearsDay() {
        return date => this.and(this.since(new Date(1948, 7 - 1, 20)), this.month(1 - 1), this.date(1))(date);
    },
    comingOfAgeDay(){
        return date => this.or(
            this.and(this.range(new Date(1948, 7 - 1, 20), new Date(1999, 12 - 1, 31)), this.month(1 - 1), this.date(15)),
            this.and(this.since(new Date(2000, 1, 1)), this.month(1 - 1), this.nthDay(2, MON))
        )(date);
    },
    foundationDay() {
        return date => this.and(this.since(new Date(1967, 1 - 1, 1)), this.month(2 - 1), this.date(11))(date);
    },
    greeneryDay() {
        return date => this.or(
            this.and(this.range(new Date(1989, 1 - 1, 1), new Date(2006, 12 - 1, 31)), this.month(4 - 1), this.date(29)),
            this.and(this.since(new Date(2007, 1 - 1, 1)), this.month(5 - 1), this.date(4))
        )(date);
    },
    showaDay() {
        return date => this.and(this.since(new Date(2007, 1 - 1, 1)), this.month(4 - 1), this.date(29))(date);
    },
    constitutionMemorialDay() {
        return date => this.and(this.since(new Date(1948, 7 - 1, 20)), this.month(5 - 1), this.date(3))(date);
    },
    childrensDay() {
       return date => this.and(this.since(new Date(1948, 7 - 1, 20)), this.month(5 - 1), this.date(5))(date);
    },
    marineDay() {
        return date => this.or(
            this.and(this.range(new Date(1996, 1 - 1, 1), new Date(2002, 12 - 1, 31)), this.month(7 - 1), this.date(20)),
            this.and(this.since(new Date(2003, 1 - 1, 1)), this.month(7 - 1), this.nthDay(3, MON))
        )(date);
    },
    mountainDay() {
       return date => this.and(this.since(new Date(2016, 1 - 1, 1)), this.month(8 - 1), this.date(11))(date);
    },
    respectForTheAgedDay() {
        return date => this.or(
            this.and(this.range(new Date(1966, 1 - 1, 1), new Date(2002, 12 - 1, 31), this.month(9 - 1), this.date(15))),
            this.and(this.since(new Date(2003, 1 - 1, 1)), this.month(9 - 1), this.nthDay(3, MON))
        )(date);
    },
    healthAndSportsDay() {
        return date => this.or(
            this.and(this.range(new Date(1966, 1 - 1, 1), new Date(1999, 12 - 1, 31)), this.month(10 - 1), this.date(10)),
            this.and(this.since(new Date(2000, 1 - 1, 1)), this.month(10 - 1), this.nthDay(2, MON))
        )(date);
    },
    cultureDay() {
       return date => this.and(this.since(new Date(1948, 7 - 1, 20)), this.month(11 - 1), this.date(3))(date);
    },
    labourThanksgivingDay() {
       return date => this.and(this.since(new Date(1948, 7 - 1, 20)), this.month(11 - 1), this.date(23))(date);
    },
    theEmperorsBirthday() {
        return date => this.or(
            this.and(this.range(new Date(1948, 7 - 1, 20), new Date(1988, 12 - 1, 31)), this.month(4 - 1), this.date(29)),
            this.and(this.since(new Date(1989, 1 - 1, 1)), this.month(12 - 1), this.date(23))
        )(date);
    },
    publicHoliday() {
        return date => this.or(
            this.vernalEquinoxDay(),
            this.autumnalEquinoxDay(),
            this.newYearsDay(),
            this.comingOfAgeDay(),
            this.foundationDay(),

            this.greeneryDay(),
            this.showaDay(),
            this.constitutionMemorialDay(),
            this.childrensDay(),

            this.marineDay(),
            this.mountainDay(),
            this.respectForTheAgedDay(),
            this.healthAndSportsDay(),
            this.cultureDay(),
            this.labourThanksgivingDay(),
            this.theEmperorsBirthday()
        )(date);
    },
    substituteHoliday() {
        return date => {
            const yesterday = new Date(date.getTime());
            yesterday.setDate(yesterday.getDate() - 1);
            return this.and(this.publicHoliday(), this.day(SUN))(yesterday);
        }
    },
    weekday() {
        return date => this.not(this.or(this.publicHoliday(), this.substituteHoliday(), this.day(SUN), this.day(SAT)))(date);
    }
};
