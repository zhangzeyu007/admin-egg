/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-23 14:48:50
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-23 14:48:51
 * @FilePath: \admin-egg\server\app\extend\context.js
 */
module.exports = {
  get(headerName) {
    const headerValue = this.request.headers[headerName.toLowerCase()];
    return headerValue;
  },
};
