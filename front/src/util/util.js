/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-21 15:51:33
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-22 11:40:45
 */
/**
 * 处理图片类型判断
*/
async function blobToString(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function () {
            const ret = reader.result
                .split("")
                .map((v) => v.charCodeAt())
                .map((v) => v.toString(16).toUpperCase())
                .join("");
            resolve(ret);
        };
        console.log(blob);
        reader.readAsBinaryString(blob);
    });
}

async function isImage(file) {
    // 通过文件流来判定
    // 先判定是不是gif
    return (
        (await isGif(file)) ||
        (await isPng(file)) ||
        (await isJpg(file))
    );
}

async function isPng(file) {
    const ret = await blobToString(file.slice(0, 8));
    console.log(ret);
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
    // GIF89a 和GIF87a
    // 前面6个16进制，'47 49 46 38 39 61' '47 49 46 38 37 61'
    // 16进制的抓安环
    const ret = await blobToString(file.slice(0, 6));
    const isGif = ret == "47 49 46 38 39 61" || ret == "47 49 46 38 37 61";
    console.log(ret);
    return isGif;
}


export default {
    blobToString,
    isImage,
    isPng,
    isJpg,
    isGif
}