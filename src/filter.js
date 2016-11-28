import consts from './const.js';
import _Date from './date.js';

const {SUN, MON, SAT} = consts;

const year = year => _date => _date.getFullYear() === year;
const month = month => _date => _date.getMonth() === month;
const date = date => _date => _date.getDate() === date;
const day = day => _date => _date.getDay() === day;
const nthDay = (n, day) => _date => _date.getDay() === day && (0 | (_date.getDate() - 1) / 7) === n - 1;
const and = (...filters) => _date => {
    // filters.reduce((res, filter) => res && filter(_date), true);
    for (let i = 0, _i = filters.length; i < _i; i = 0 | i + 1) if (!filters[i](_date)) return false;
    return true;
};
const nand = (...filters) => _date => {
    // filters.reduce((res, filter) => res || !Jfilter(_date), false);
    for (let i = 0, _i = filters.length; i < _i; i = 0 | i + 1) if (!filters[i](_date)) return true;
    return false;
};
const or = (...filters) => _date => {
    // filters.reduce((res, filter) => res || filter(_date), false);
    for (let i = 0, _i = filters.length; i < _i; i = 0 | i + 1) if (filters[i](_date)) return true;
    return false;
};
const nor = (...filters) => _date => {
    // filters.reduce((res, filter) => res && !filter(_date), true);
    for (let i = 0, _i = filters.length; i < _i; i = 0 | i + 1) if (filters[i](_date)) return false;
    return true;
};
const not = filter => _date => !filter(_date);
const since = since => _date => since.getTime() <= _date.getTime();
const until = until => _date => _date.getTime() <= until.getTime();
const range = (start, end) => _date => start.getTime() <= _date.getTime() && _date.getTime() <= end.getTime();
const every = (n, baseDate = new Date(1970, 0, 1)) => _date => (baseDate.getTime() - _date.getTime()) / 86400000 % n === 0;
const leapYear = () => _date => {
    const y = _date.getFullYear();
    return y % 400 === 0 || y % 100 !== 0 && y % 4 === 0;
};
const vernalEquinoxDay = () => _date => {
    const y = _date.getFullYear();
    const m = _date.getMonth();
    const d = _date.getDate();
    if (y < 1949 || m + 1 !== 3) return false; // 1949年以前は祝日ではなかった
    if (y > 2030) return false; // 得られたデータが2030年までしかないからこうするしかない
    return d === 20 + parseInt('1111111111101110111011101110111011101110111001100110011001100110011001100110001000'.charAt(y - 1949), 10);
};
const autumnalEquinoxDay = () => _date => {
    const y = _date.getFullYear();
    const m = _date.getMonth();
    const d = _date.getDate();
    if (y < 1948 || m + 1 !== 9) return false; // 1948年以前は祝日ではなかった
    if (y > 2030) return false; // 得られたデータが2030年までしかないからこうするしかない
    if (y % 4 === 3 && 1979 >= y && y >= 1951) return d === 24;
    if (y % 4 === 0 && 2044 >= y && y >= 2012) return d === 22;
    if (d === 23) return true;
    return false;
};
const fullMoonNight = () => _date => {
    const MEIGETSU = [
        [27], [16], [5, 1], [24], [13], [2, 1], [22], [10], [29],
        [18], [6, 1], [25], [15], [4, 1], [23], [12], [30], [19],
        [8, 1], [26], [16], [5, 1], [25], [13], [2, 1], [21], [10],
        [28], [17], [6, 1], [26], [15], [4, 1], [23], [12], [30],
        [19], [8, 1], [27], [16], [5, 1], [25], [14], [1, 1], [20],
        [10], [29], [17], [6, 1], [26], [15], [3, 1], [22], [11],
        [30], [19], [8], [27], [17], [5, 1], [24], [13], [2, 1],
        [20], [10], [29], [18], [6, 1], [26], [15], [3, 1], [22],
        [11], [30], [20], [8], [27], [17], [5, 1], [23], [12],
        [1, 1], [21], [10], [29], [18], [7, 1], [25], [14], [3, 1],
        [22], [11], [30], [20], [9], [27], [16], [5, 1], [24],
        [12], [1, 1], [21], [11], [28], [18], [6, 1], [25], [14],
        [3, 1], [22], [12], [30], [19], [8], [27], [15], [4, 1],
        [24], [13], [1, 1], [21], [10], [29], [17], [6, 1], [25],
        [15], [3, 1], [22], [12]
    ];
    const y = _date.getFullYear();
    const m = _date.getMonth();
    const d = _date.getDate();
    if(y < 1901 || y > 2030) return false;// データなし
    return (MEIGETSU[y - 1901][1] || 0) + 8 === m && MEIGETSU[y-1901][0] === d;
};
const newYearsDay = () => and(since(new Date(1948, 7 - 1, 20)), month(1 - 1), date(1));
const comingOfAgeDay = () => or(
        and(range(new Date(1948, 7 - 1, 20), new Date(1999, 12 - 1, 31)), month(1 - 1), date(15)),
        and(since(new Date(2000, 1, 1)), month(1 - 1), nthDay(2, MON))
    );
const foundationDay = () => and(since(new Date(1967, 1 - 1, 1)), month(2 - 1), date(11));
const greeneryDay = () => or(
        and(range(new Date(1989, 1 - 1, 1), new Date(2006, 12 - 1, 31)), month(4 - 1), date(29)),
        and(since(new Date(2007, 1 - 1, 1)), month(5 - 1), date(4))
    );
const showaDay = () => and(since(new Date(2007, 1 - 1, 1)), month(4 - 1), date(29));
const constitutionMemorialDay = () => and(since(new Date(1948, 7 - 1, 20)), month(5 - 1), date(3));
const childrensDay = () => and(since(new Date(1948, 7 - 1, 20)), month(5 - 1), date(5));
const marineDay = () => or(
        and(range(new Date(1996, 1 - 1, 1), new Date(2002, 12 - 1, 31)), month(7 - 1), date(20)),
        and(since(new Date(2003, 1 - 1, 1)), month(7 - 1), nthDay(3, MON))
    );
const mountainDay = () => and(since(new Date(2016, 1 - 1, 1)), month(8 - 1), date(11));
const respectForTheAgedDay = () => or(
        and(range(new Date(1966, 1 - 1, 1), new Date(2002, 12 - 1, 31), month(9 - 1), date(15))),
        and(since(new Date(2003, 1 - 1, 1)), month(9 - 1), nthDay(3, MON))
    );
const healthAndSportsDay = () => or(
        and(range(new Date(1966, 1 - 1, 1), new Date(1999, 12 - 1, 31)), month(10 - 1), date(10)),
        and(since(new Date(2000, 1 - 1, 1)), month(10 - 1), nthDay(2, MON))
    );
const cultureDay = () => and(since(new Date(1948, 7 - 1, 20)), month(11 - 1), date(3));
const labourThanksgivingDay = () => and(since(new Date(1948, 7 - 1, 20)), month(11 - 1), date(23));
const theEmperorsBirthday = () => or(
        and(range(new Date(1948, 7 - 1, 20), new Date(1988, 12 - 1, 31)), month(4 - 1), date(29)),
        and(since(new Date(1989, 1 - 1, 1)), month(12 - 1), date(23))
    );
const publicHoliday = () => or(
        vernalEquinoxDay(),
        autumnalEquinoxDay(),
        newYearsDay(),
        comingOfAgeDay(),
        foundationDay(),
        greeneryDay(),
        showaDay(),
        constitutionMemorialDay(),
        childrensDay(),
        marineDay(),
        mountainDay(),
        respectForTheAgedDay(),
        healthAndSportsDay(),
        cultureDay(),
        labourThanksgivingDay(),
        theEmperorsBirthday()
    );
const substituteHoliday = () => _date => {
        if (_date.is(publicHoliday())) return false;
        const yesterday = new _Date(_date.getTime());
        yesterday.setDate(yesterday.getDate() - 1);
        while (yesterday.is(publicHoliday())) {
            if (yesterday.is(day(SUN))) return true;
            yesterday.setDate(yesterday.getDate() - 1);
        }
        return false;
    };
const weekday = () => nor(publicHoliday(), substituteHoliday(), day(SUN), day(SAT));

export default {
    year: year,
    month: month,
    date: date,
    day: day,
    nthDay: nthDay,
    and: and,
    nand: nand,
    or: or,
    nor: nor,
    not: not,
    since: since,
    until: until,
    range: range,
    every: every,
    leapYear: leapYear,
    vernalEquinoxDay: vernalEquinoxDay,
    autumnalEquinoxDay: autumnalEquinoxDay,
    fullMoonNight: fullMoonNight,
    newYearsDay: newYearsDay,
    comingOfAgeDay: comingOfAgeDay,
    foundationDay: foundationDay,
    greeneryDay: greeneryDay,
    showaDay: showaDay,
    constitutionMemorialDay: constitutionMemorialDay,
    childrensDay: childrensDay,
    marineDay: marineDay,
    mountainDay: mountainDay,
    respectForTheAgedDay: respectForTheAgedDay,
    healthAndSportsDay: healthAndSportsDay,
    cultureDay: cultureDay,
    labourThanksgivingDay: labourThanksgivingDay,
    theEmperorsBirthday: theEmperorsBirthday,
    publicHoliday: publicHoliday,
    substituteHoliday: substituteHoliday,
    weekday: weekday
};
