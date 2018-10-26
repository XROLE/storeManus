
export const isNumber = (number) => {
    return !isNaN(number);
};
export const isValidNum = (number) => {
    return number.length === 13;
};
export const isEmpty = (value) => {
    return (typeof value === 'undefined' || value.trim === '' || value.length === 0);
};