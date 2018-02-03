const digitCounts = function (k, n) {
    let count = 0;
    for(let i = 0; i<=n;i++){
        count += i.toString().split(k).length-1;
    }
     return count;
 }

//注意：'1'.split('1')返回为[[],[]],length为2
// console.log(digitCounts(1,12))

const flatten = (arr) => {
   if(arr.length === 0 ) return [];
   arr = arr.toString().split(",") ;
   return arr.map(function(value){
       return Number(value)
   }) 
  }
//注意：split()，和map都是返回一个新数组，原数组并没有改变，所以需要新建一个变量接住返回值
// console.log(flatten([]))

const arrWithoutLoop = (n) => {
    let arr = [0];
    return arr.reduce(function(accumulotar,value,index,array){
     accumulotar.push(value);
     if(value<n){
        array.push[++value];
      }
      return accumulotar;
    },[])
}
// console.log(arrWithoutLoop(10))
//第一个参数决定了第二个参数的运行次数，第二个参数相当于map函数，第三个参数是执行第二个参数时的this 对象。
//console.log(Array.from({length:10},((value,i)=>i)))

  //console.log(flatten2( [[[[[0]],[1]],[[[2],[3]]],[[4],[5]]]]))
  function *flatten2 (arr) {
    arr = arr.toString();
    let result;
    if(arr.length===0)
      result = [];
    else{
      result = arr.split(',');
    }
    for(let value of result)
    yield  Number(value);
  }

  let data ={
    rows: [
      ["Lisa", 16, "Female", "2000-12-01"],
      ["Bob", 22, "Male", "1996-01-21"]
    ],
    metaData: [
      { name: "name", note: '' },
      { name: "age", note: '' },
      { name: "gender", note: '' },
      { name: "birthday", note: '' }
    ]
  }
  const parseData = (data) => {
    let result = [];
   
    data.rows.forEach((row)=>{
        row.forEach((value)=>{
            result.push(Object.assign({},))
        })
       
        
    })
    return result
  }
  
//  console.log(parseData(data))
//  const fillEmpty = (arr) => {
//    Array.from(arr).map((value,i)=>i in arr?value:'Hello')
//    return arr
//   }

  
  const fillEmpty = arr => {
    for(let i=0;i<arr.length;i++) {
      if(!(i in arr)) arr[i] = 'Hello';
    }
    return arr
  }
    console.log(fillEmpty([1,]))
  
//   console.log(typeof(NaN))