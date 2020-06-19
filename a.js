function editArr(Arr1,Arr2){
   let arr1 = [...new Set(Arr1)]
   let arr2 = [...new Set(Arr2)]
   let arr = []
   arr1.map(item=>{
        arr2.map(aitem=>{
            if(item==aitem){
                arr.push(aitem)
            }
        })
   })
   return arr
}
console.log(editArr([4,9,5,8,10],[9,4,9,8,4]))