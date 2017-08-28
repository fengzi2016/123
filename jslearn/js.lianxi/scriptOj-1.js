/*完成将 toChineseNum， 可以将数字转换成中文大写的表示，处理到万级别，例如 toChineseNum(12345)，返回 一万二千三百四十五。

*/
const toChineseNum = (num) => {
    num=String(num);
    let base=0;
    while(num[num.length-1]==='0'){
        num=Number(num)/10;
        base++;
        num=String(num);
    }
    let arr=num.split('');
     arr=arr.map(function(num){
      switch (num){
        case '1' : return '一';
        case '2' : return '二';
        case '3' : return '三';
        case '4' : return '四';
        case '5' : return '五';
        case '6' : return '六';
        case '7' : return '七';
        case '8' : return '八';
        case '9' : return '九';
        case '0' : return '零';
      }
    });
    let danweiArr=['千','百','十','万','千','百','十',''];
    let start=danweiArr.length-arr.length-base;
    let result='';
    let j=0;
    console.log(arr);
    for(let i=start;i<danweiArr.length;i++){
        if(arr[j]!=='零'){
        result=result+arr[j++]+danweiArr[i];
        }else if(arr[++j]==='零'){
         result=result+arr[j]+danweiArr[i];
        }
    }
    return result;
  }
