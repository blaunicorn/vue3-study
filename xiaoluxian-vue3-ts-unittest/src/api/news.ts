import { AxiosPromise } from "axios";
import request from "../utils/request";

// 资源列表api

export function getNewsList(
  params: INewsParams = { cate_id: "", currentPage: 1, pageSize: 1 }
): Promise<INewsResponse> {
  return request({
    url: "/api/news/flist",
    method: "get",
    params,
  });
}

// 获取轮播图的各个id
export function getPost(params: {}) {
  return request({
    url: "/api/v1/banner/list",
    method: "get",
    params,
  });
}

// 通过轮播位的id获取轮播图
interface IBannerResponse {
  info: any;
  statusCode: number;
  message: string;
  data: {
    info: {};
  };
}
export function getBannersByPost(params: {
  id: "";
}): AxiosPromise<IBannerResponse> {
  return request({
    url: "/api/v1/banner/bypos",
    method: "get",
    params,
  });
}

// 资讯分类
interface IResponse {
  statusCode: number;
  message: string;
}

interface INewsCategoryResponse extends IResponse {
  // statusCode:number;
  // message:string;
  data: {
    list: List[];
    total: number;
  };
}
interface List {
  isShow: boolean;
  _id: string;
  title: string;
  __v: number;
}
export function getNewsCategory(params: {}): AxiosPromise<INewsCategoryResponse> {
  return request({
    url: "/api/cate/flist",
    method: "get",
    params,
  });
}
// 资讯分类列表
interface INewsListParams {
  pageSize: number;
  currentPage: number;
  cate_id: string;
}
interface INewsListResponse extends IResponse {
  data: {
    list: NewsList[];
  };
}
interface NewsList {
  imageUrl: string;
  _id: string;
  title: string;
  shortCut: string;
  author: string;
  cate_id: string;
  isShow: boolean;
  viewCount: number;
  description: string;
  createTime: string;
  __v: number;
}
export function getNewsListBCateId(
  params: INewsListParams = { pageSize: 10, currentPage: 1, cate_id: "" }
): AxiosPromise<INewsListResponse> {
  return request({
    url: "/api/news/flist",
    method: "get",
    params,
  });
}


// 资讯详情
interface INewsDetailByIdResponse extends IResponse {
  data: {
    info:{}
  }
}
export function getNewsDetailById(
  params = { newsId: '' }
): AxiosPromise<INewsDetailByIdResponse> {
  return request({
    url: "/api/news/detail",
    method: "get",
    headers: {
  "Content-Type": "application/x-www-form-urlencoded"
},
    params,
  });
}




// 评论模块
// 发布评论，需要授权
interface ISubmitCommentResponse extends IResponse {

}
export function submitCommentToNews(
  data:{title:string,content:any,newsId:string}
): AxiosPromise<ISubmitCommentResponse> {
  return request({
    url: "/api/comment/submitComment",
    method: "post",
    data,
  });
}

//  获取评论列表
interface IGetCommentListResponse extends IResponse {
  data: {
    commentList:CommentList[];
    total:number;
  }
}
interface CommentList {
    imageUrl: string;
  _id: string;
  title: string;
  shortCut: string;
  author: string;
  cate_id: string;
  isShow: boolean;
  viewCount: number;
  description: string;
  createTime: string;
  __v: number;
}
export function getCommentList(
  params:{pageSize:number,currentPage:number,newsId:string}
): AxiosPromise<IGetCommentListResponse> {
  return request({
    url: "/api/comment/getCommentList",
    method: "get",
    params,
  });
}

// 用户登录
interface ILoginResponse extends IResponse {
 data:{
  userInfo:{
    _id:string,
    imageUrl:string,
    isShow:boolean,
    name:string,
    email:string,
    jurisdiction:[]
  },
  token:string
 }
}
export function login(
  data:{username:"gogery@163.com",password:'admin'}
): AxiosPromise<ILoginResponse> {
  return request({
    url: "/api/v1/user/login",
    method: "post",
    data,
  });
}
