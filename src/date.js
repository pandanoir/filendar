export default class _Date {
    constructor(...args) {
        this._date_ = new Date(...args);
        this._date_.setHours(0);
        this._date_.setMinutes(0);
        this._date_.setSeconds(0);
        this._date_.setMilliseconds(0);

        this.year = this._date_.getFullYear();
        this.month = this._date_.getMonth();
        this.date = this._date_.getDate();
        this.time = this._date_.getTime();
    }
    is(f) {
        return f(this._date_);
    }
    equals(d) {
        return d instanceof _Date && d.time === this.time;
    }
    valueOf() {
        return this._date_.valueOf();
    }
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
    _Date.prototype[`get${val}`] = function () {return this._date_[`get${val}`]();};
    _Date.prototype[`set${val}`] = function (...args) {
        const newDate = new Date(this.time);
        return new _Date(newDate[`set${val}`].apply(newDate, args));
    };
}

for (const val of ['Day', 'TimezoneOffset', 'UTCDay']) {
    _Date.prototype[`get${val}`] = function () {return this._date_[`get${val}`]();};
}

for (const val of ['DateString', 'ISOString', 'JSON', 'LocaleDateString', 'LocaleString', 'LocaleTimeString', 'String', 'TimeString', 'UTCString']) {
    _Date.prototype[`to${val}`] = function() {return this._date_[`to${val}`]();};
}
