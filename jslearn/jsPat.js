/*PAT乙级1052*/
function getMothe(input){
 let mothe=input.split('][');
 let zero=mothe[0][1];
 let last=mothe[mothe.length-1][0];
 mothe[0]=zero;
 mothe[mothe.length-1]=last;
 return mothe;
}
function Together(input,arr1,arr2,arr3){
    let result='';
    let choice=input.split(' ');
    choice=choice.map(function(value){
        return Number(value)-1;
    });
   
    if(len(arr1,choice[0])===true&&len(arr2,choice[1])===true&&len(arr3,choice[2])===true&&len(arr2,choice[3])===true&&len(arr1,choice[4])===true){
        result=result+arr1[choice[0]]+'('+arr2[choice[1]]+arr3[choice[2]]+arr2[choice[3]]+')'+arr1[choice[4]];
        return result;
    }else{
        return 'Are you kidding me? @\/@';
    } 
}
function len(arr,num){
    if(num>arr.length-1){
        return false;
    }else{
        return true;
    }
}
let oneInput='[╮][╭][o][~\][/~][<][>]';
let twoInput='[╯][╰][^][-][=][>][<][@][⊙]';
let thirdInput='[Д][▽][_][ε][^]';
let num=4;
let oneChoice='1 1 2 2 2';
let twoChoice='6 8 1 5 5';
let thirdChoice='3 3 4 3 3';
let fourChice='2 10 3 9 3';
let MethoArrOne=getMothe(oneInput);
let MethoArrTwo=getMothe(twoInput);
let MethoArrThird=getMothe(thirdInput);
let result=Together(oneChoice,MethoArrOne,MethoArrTwo,MethoArrThird)+'\n'+Together(twoChoice,MethoArrOne,MethoArrTwo,MethoArrThird)+'\n'+Together(thirdChoice,MethoArrOne,MethoArrTwo,MethoArrThird)+'\n'+Together(fourChice,MethoArrOne,MethoArrTwo,MethoArrThird);
console.log(result);
