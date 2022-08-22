// 工具类
import  dayjs from 'dayjs'
import numeral from 'numeral'
export const  formatTime = (val:string)=> {
  return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
}

export const formatViewCount =(val:number)=> {
  return numeral(val).format("0,0");
}