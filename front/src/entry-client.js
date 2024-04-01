/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-04-01 15:44:52
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-01 16:04:22
 * @FilePath: \admin-egg\front\src\entry-client.js
 */
// 获取服务端渲染的 HTML 字符串
function fetchRenderedHtml() {
  return new Promise((resolve, reject) => {
    fetch("http://127.0.0.1:7001/ssr")
      .then((response) => response.text())
      .then((html) => resolve(html))
      .catch((err) => reject(err));
  });
}

fetchRenderedHtml().then((rennderHtml) => {
  console.log(rennderHtml, "rennderHtml)");
});
