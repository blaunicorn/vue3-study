import  request  from "../utils/request";

// 资源列表api

export function getNewsList(params:INewsParams={cate_id:'',currentPage:1,pageSize:1}):Promise<INewsResponse> {
  return request({
    url: "/api/news/flist",
    method: "get",
    params,
  });
}