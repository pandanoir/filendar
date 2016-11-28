export default class _Date extends Date {
    constructor(...args) {
        super(...args);
    }
    is(f) {
        return f(new Date(this.getTime()));
    }
}
