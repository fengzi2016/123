
//1.
const digitCounts = function (k, n) {
    let count = 0;
    for(let i = 0; i<=n;i++){
        count += i.toString().split(k).length-1;
    }
     return count;
 }

//注意：'1'.split('1')返回为[[],[]],length为2
// console.log(digitCounts(1,12))
//3.
const flatten = (arr) => {
   if(arr.length === 0 ) return [];
   arr = arr.toString().split(",") ;
   return arr.map(function(value){
       return Number(value)
   }) 
  }
//注意：split()，和map都是返回一个新数组，原数组并没有改变，所以需要新建一个变量接住返回值
// console.log(flatten([]))
//4.
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
  //
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
    let temp = {}
    data.rows.forEach(([name,age,gender,birthday],index)=>{
        temp[data.metaData[0].name] = name
        temp[data.metaData[1].name]=age;
        temp[data.metaData[2].name]=gender;
        temp[data.metaData[3].name]=birthday;
      result.push(temp);
    })
    return result
  }
  
// console.log(parseData(data))
 const fillEmpty = (arr) => {
   Array.from(arr).map((value,i)=>i in arr?value:'Hello')
   return arr
  }

const uniqueNums = (n) => {
  let count = 0;
  let result =  [];
  let temp ;
  while(count<n){
    temp = Math.random()*(32-2)+2;
    if(result.indexOf(temp)<0)
    result.push(temp)
    count ++ ;
  }
  return result;
}
//13
//["section2","item1","section0","item2","item3","section1","item4","item5","item6"] 

let items= ["item1","item2","item3","item4","item5","item6"]
let sections = [
                {"content":"section0","index":1},
                {"content":"section1","index":3},
                {"content":"section2","index":0}
]
  const injectSections = (items, sections) => {
                  sections.sort(function(a,b){
                    return b.index-a.index
                  })
                  sections.map(({content,index})=>{
                   items.splice(index,0,content)
                 })
                 return items
}


  
  // const fillEmpty = arr => {
  //   for(let i=0;i<arr.length;i++) {
  //     if(!(i in arr)) arr[i] = 'Hello';
  //   }
  //   return arr
  // }
  //  console.log(fillEmpty([1,]))
  const mergeSortedArray = function (A, B) {
    let C = A.concat(B);
    return C.sort((a,b)=>{
        return a-b;
    })
  }
  
//   console.log(typeof(NaN))

const partitionArray = function (nums, k) {
  let less = nums.filter((value)=>{
      return value < k;
  });
  let bigger = nums.filter((value)=>{
      return value >=k;
  })
  let result = less.concat(bigger);
  return result.lastIndexOf(less[less.length-1])+1;
}

const unique = (arr) => {
  return arr.filter((value,index)=>{
    return arr.indexOf(value)===index;
  })
}
//


//console.log(injectSections(items,sections))


/**
 * 16.
 * 同字母异序指的是两个字符串字母种类和字母的数量相同，但是顺序可能不同。

完成 isAnagram，接受两个字符串作为参数，返回true 或者 false 表示这两个字符串是否同字母异序。
 */
const isAnagram = (str1, str2) => {
  if(str1.length!==str2.length) return false;
  str1 = str1.split('')
  str2 = str2.split('')
  let flag = true ;
  str1.forEach((value,index)=>{
   str2.forEach((item,i)=>{
      if(item===value){
        str2.splice(i,1)
      }
    })
  })
  
  return str2.length === 0 ? true : false
}
console.log(isAnagram("anagram", "nagaram") )// => return true.
console.log(isAnagram("rat", "car")) // => return false.