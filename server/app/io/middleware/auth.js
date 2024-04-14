/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-04-14 12:21:46
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-14 12:23:37
 * @FilePath: \admin-egg\server\app\middleware\auth.js
 */
module.exports = () => {
  return async (ctx, next) => {
    console.log("连接鉴权");
    const { socket } = ctx;
    const query = socket.handshake.query;
    const id = socket.id;
    console.log(id, "id");
    console.log(query, "query");
    if (!(query.myKey === "111")) {
      socket.disconnect();
      socket.emit("auth", "鉴权失败");
      console.log("断开链接");
      return;
    }
    console.log("服务端链接成功");
    socket.emit("connect", "服务端连接成功");
    socket.on("message", (arg, callback) => {
      console.log(arg, "接收客户端消息"); // "world"
      callback("服务端收到客户端消息");
    });
    await next();
  };
};
