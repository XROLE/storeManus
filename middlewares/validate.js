export  default class validate {

    static isString(value){
        return typeof value === 'string';
    }
    static isNumber(number) {
        return !isNaN(number);
    }

    static isValidNum(number) {
        return number.length === 13;
    }  
    
    static isEmpty(value) {
        return (typeof value === 'undefined' || value.trim === '' || value.length === 0);
    }
}