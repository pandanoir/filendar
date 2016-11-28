export default class _Date extends Date {
    constructor(...args) {
        super(...args);
        this.date = new Date(...args);
    }
    is(f) {
        return f(this.date);
    }
}
