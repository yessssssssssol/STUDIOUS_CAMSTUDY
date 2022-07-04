function checkTimeFrom(time) {
    return /^([0-9]{4})-([0-1][0-9])-([0-3][0-9])\s([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$/.test(
        time,
    );
}

export { checkTimeFrom };
