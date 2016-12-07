export default class _Date {
    constructor(...args) {
        this.date = new Date(...args);
        this.time = this.date.getTime();
    }

    is(f) {
        return f(this.date);
    }
    valueOf() {
        return this.date.valueOf();
    };
}

for (const val of ['Date', 'Hours', 'Milliseconds', 'Minutes', 'Month', 'Seconds']) {
    _Date.prototype[`add${val}`] = function(delta) {
        const newDate = new Date(this.time);
        return new _Date(newDate[`set${val}`].call(newDate, newDate[`get${val}`]() + delta));
    }
    _Date.prototype[`subtract${val}`] = function(delta) {
        const newDate = new Date(this.time);
        return new _Date(newDate[`set${val}`].call(newDate, newDate[`get${val}`]() - delta));
    }
}
for (const val of ['Date', 'FullYear', 'Hours', 'Milliseconds', 'Minutes', 'Month', 'Seconds', 'Time', 'UTCDate', 'UTCFullYear', 'UTCHours', 'UTCMilliseconds', 'UTCMinutes', 'UTCMonth', 'UTCSeconds']) {
    _Date.prototype[`get${val}`] = function () {return this.date[`get${val}`]();};
    _Date.prototype[`set${val}`] = function (...args) {
        const newDate = new Date(this.time);
        return new _Date(newDate[`set${val}`].apply(newDate, args));
    };
}
for (const val of ['Day', 'TimezoneOffset', 'UTCDay']) {
    _Date.prototype[`get${val}`] = function () {return this.date[`get${val}`]();};
}
for (const val of ['DateString', 'ISOString', 'JSON', 'LocaleDateString', 'LocaleString', 'LocaleTimeString', 'String', 'TimeString', 'UTCString']) {
    _Date.prototype[`to${val}`] = function() {return this.date[`to${val}`]();};
}
