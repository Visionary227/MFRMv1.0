function roundToXDigits (value, digits) {
    value = value * Math.pow(10, digits);
    value = Math.round(value);
    value = value / Math.pow(10, digits);
    return value;
}
export default roundToXDigits;