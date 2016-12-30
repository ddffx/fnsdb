'use strict';

const fnsDBCli = (input, flags) =>{
    if(input){
        console.log(input)
    } else{
        console.error(`input not provided`);
    }
    if(flags){
        console.log(flags)
    } else{
        console.error(`flags not present`);
    }
    
}
module.exports = exports = fnsDBCli;