export const editTime=(time)=>{
   let date = new Date(time)
   let hour = date.getHours();
   let mounth = date.getMonth()+1;
   let day = date.getDate();
   let year = date.getFullYear();
   let minutes = date.getMinutes();
   let second = date.getSeconds();
   return `${year}-${mounth}-${day}  ${hour}:${minutes}`
}
