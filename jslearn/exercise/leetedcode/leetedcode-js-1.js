// var twoSum = function(nums, target) {
//    let data = nums.slice(0);
//    let sortNum = nums.sort(function(a,b){
//         return a-b;
//     })
//     let result = [];
//     for(var i=0;i<nums.length;i++){
//        for(var j=i;j<nums.length;){
//            if(sortNum[i]+sortNum[j]===target){
//                if(sortNum[i]===sortNum[j]){
//                 result.push(data.indexOf(sortNum[i]))
//                 result.push(data.lastIndexOf(sortNum[j]))
//                }else{
//                 result.push(data.indexOf(sortNum[i]))
//                 result.push(data.indexOf(sortNum[j]))
//                }
//                return result;   
//            }else{
//                j++;
//                if(sortNum[i]+sortNum[j]>target){
//                    break;
//                }
//            }
//        }
//     }
// };
// var nums = [3,3];
// var target = 6;
// let result = twoSum(nums,target)
// console.log(result)

var threeSum = function(nums){
    let sortNum = nums.sort(function(a,b){
        return a-b;
    })
    let result = [];
    let count = 0;
    for(var i= 0;i<nums.length-2;i++){
        for(var j=i+1;j<nums.length-1;j++){
            for(var k=j+1;k<nums.length;){
                if(nums[i]+nums[j]+nums[k]===0){
                    result[count]=[];
                    result[count].push(nums[i]);
                    result[count].push(nums[j]);
                    result[count].push(nums[k]);
                    count++;
                }else{
                    k++;
                    if(nums[i]+nums[j]+nums[k]>0)
                        break;
                }
            }
        }
    }
    return result;
}
var nums = [-1, 0, 1, 2, -1, -4];
//有问题，死循环
// var result2 = threeSum(nums);
// console.log(result2)