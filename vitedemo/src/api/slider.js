import request from "../utils/request";

export function getSliders() {
  return request({
    url: "/api/slider/getSliders",
    method: "get",
  });
}
export function mostNew(data) {
  return request({
    url: "/api/course/mostNew",
    method: "post",
    data,
  });
}
