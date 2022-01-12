const isEmptyOrUndefinedOrNull = (_str) => {
    if (_str === undefined) {
        return true;
    } else if (_str === null) {
        return true;
    } else if (_str === '') {
        return true;
    } else {
        return false;
    }
};

module.exports = { isEmptyOrUndefinedOrNull };
