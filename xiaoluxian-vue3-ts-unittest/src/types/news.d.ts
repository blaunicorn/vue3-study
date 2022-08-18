// 类型增强声明文件，用于遍历开发中的接口数据

// 请求数据的约束
interface INewsParams {
  cate_id:string;
  currentPage: number;
  pageSize:number
}
interface Inews {

}
// 响应数据的约束
interface INewsResponse {
statusCode: number;
message: string;
data: {
  total: number;
  list:Inews[];
}
}