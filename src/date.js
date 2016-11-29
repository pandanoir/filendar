export default class _Date {
    constructor(...args) {
        this.date = new Date(...args);
    }

    is(f) {
        return f(this.date);
    }
}
for (const val of ['Date', 'FullYear', 'Hours', 'Milliseconds', 'Minutes', 'Month', 'Seconds', 'Time', 'UTCDate', 'UTCFullYear', 'UTCHours', 'UTCMilliseconds', 'UTCMinutes', 'UTCMonth', 'UTCSeconds']) {
    _Date.prototype['get' + val] = function () {return this.date['get' + val]();};
    _Date.prototype['set' + val] = function (...args) {
        const newDate = new Date(this.date.getTime());
        return new _Date(newDate['set' + val].apply(newDate, args));
    };
}
for (const val of ['Day', 'TimezoneOffset', 'UTCDay']) {
    _Date.prototype['get' + val] = function () {return this.date['get' + val]();};
}
for (const val of ['DateString', 'ISOString', 'JSON', 'LocaleDateString', 'LocaleString', 'LocaleTimeString', 'String', 'TimeString', 'UTCString']) {
    _Date.prototype['to' + val] = function() {return this.date['to' + val]();};
}
_Date.prototype.valueOf = function() {return this.date.valueOf();};
