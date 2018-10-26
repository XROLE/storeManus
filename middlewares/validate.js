// export  default class validate {

//     static isString(value){
//         return typeof value === 'string';
//     }
//     static isNumber(number) {
//         return !isNaN(number);
//     }
//     static isValidNum(number) {
//         return number.length === 13;
//     }
//     static isEmpty(value) {
//         return (typeof value === 'undefined' || value.trim === '' || value.length === 0);
//     }
// }

export const  isString = (value) =>{
    return typeof value === 'string';
};
export const isNumber = (number) => {
    return !isNaN(number);
};
export const isValidNum = (number) => {
    return number.length === 13;
};
export const isEmpty = (value) => {
    return (typeof value === 'undefined' || value.trim === '' || value.length === 0);
};