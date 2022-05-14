/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-03-08 16:45:30
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-13 17:34:23
 * @FilePath: \admin-egg\front\src\util\util.js
 */

/**
 * 处理图片类型判断
 */
async function blobToString(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function() {
      const ret = reader.result
        .split("")
        .map((v) => v.charCodeAt())
        .map((v) => v.toString(16).toUpperCase())
        .join("");
      resolve(ret);
    };
    reader.readAsBinaryString(blob);
  });
}

async function isImage(file) {
  // 通过文件流来判定
  // 先判定是不是gif
  return (await isGif(file)) || (await isPng(file)) || (await isJpg(file));
}

async function isPng(file) {
  const ret = await blobToString(file.slice(0, 8));
  const ispng = ret == "89504E47DA1AA";
  return ispng;
}

async function isJpg(file) {
  const len = file.size;
  const start = await blobToString(file.slice(0, 2));
  const tail = await blobToString(file.slice(-2, len));
  const isjpg = start == "FFD8" && tail == "FFD9";
  return isjpg;
}

async function isGif(file) {
  // GIF89a 和 GIF87a
  // 前面6个16进制，'47 49 46 38 39 61' '47 49 46 38 37 61'
  // 16进制的抓安环
  const ret = await blobToString(file.slice(0, 6));
  const isGif = ret == "47 49 46 38 39 61" || ret == "47 49 46 38 37 61";
  return isGif;
}

export default {
  blobToString,
  isImage,
  isPng,
  isJpg,
  isGif,
};
