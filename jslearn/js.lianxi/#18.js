/*完成函数 commafy，它接受一个数字作为参数，返回一个字符串，可以把整数部分从右到左每三位数添加一个逗号，如：12000000.11 转化为 12,000,000.11。 */
function commafy(num){
    let str=num.toString();
    let strArr=str.split('.');
    let zhengArr=strArr[0].split('');
    let result;
    if(zhengArr[0]!=='-'){
        zhengArr=zhengArr.reverse();
        let zhengStr=zhengArr.reduce(function(accumulator,value,index,collection){
            if((index+1)%3===0&&index!==collection.length-1){
                value=value+',';
            }
            return accumulator=accumulator+value;
        });
        zhengStr=zhengStr.split('').reverse();
        zhengStr=zhengStr.reduce(function(accumulator,value,index){
            return accumulator=accumulator+value;
        })
        if(strArr[1]!==undefined){
            result=zhengStr+'.'+strArr[1];
        }else{
             result=zhengStr;
        }   
        return result;
    }else{
        zhengArr.splice(0,1);
        zhengArr=zhengArr.reverse();
        let zhengStr=zhengArr.reduce(function(accumulator,value,index,collection){
            if((index+1)%3===0&&index!==collection.length-1){
                value=value+',';
            }
            return accumulator=accumulator+value;
        });
        zhengStr=zhengStr.split('').reverse();
        zhengStr=zhengStr.reduce(function(accumulator,value,index){
            return accumulator=accumulator+value;
        })
        if(strArr[1]!==undefined){
             result='-'+zhengStr+'.'+strArr[1];
        }else{
             result='-'+zhengStr;
        }   
        return result;
    }
}
