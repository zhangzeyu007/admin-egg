/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-23 14:21:35
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-23 18:01:04
 * @FilePath: \admin-egg\server\app\extend\helper.js
 */
const moment = require("moment");

const getLastModified = (data) => {
  // 根据数据计算出一个 Last-Modified 值
  // 例如,可以取数据中的最后修改时间字段
  if (!data) {
    return null;
  }
  if (Array.isArray(data)) {
    // 如果是数组，递归获取数组中每个元素的最后修改时间
    const lastModified = data.reduce((max, item) => {
      const itemLastModified = this.getLastModified(item);
      return itemLastModified > max ? itemLastModified : max;
    }, 0);
    return lastModified;
  } else if (typeof data === "object") {
    // 如果是对象，递归获取对象每个属性的最后修改时间
    const lastModified = Object.values(data).reduce((max, value) => {
      const valueLastModified = this.getLastModified(value);
      return valueLastModified > max ? valueLastModified : max;
    }, 0);
    return lastModified;
  } else if (typeof data === "string") {
    // 如果是字符串，将其转换为时间戳
    const timestamp = moment(data).valueOf();
    return timestamp > 0 ? timestamp : null;
  } else if (typeof data === "number") {
    // 如果是数字，直接返回
    return data;
  } else {
    // 其他类型返回 null
    return null;
  }
};
exports.getLastModified = getLastModified;
const get = (ctx, headerName) => {
  if (!ctx || !ctx.request) {
    return "";
  }
  console.log("----做了");

  let headers = ctx.request.headers;

  headers[headerName.toLowerCase()] = "";
  console.log(headers, "headers---");
  return headers;
};

exports.get = get;

const getUTCDateValue = (ctx, headerName) => {
  const headerValue = get(ctx, headerName);
  if (!headerValue) {
    return null;
  }
  // 解析 RFC 1123 格式的日期字符串
  const dateRegex =
    /(\d{1,2})\s(\w{3})\s(\d{4})\s(\d{1,2}):(\d{1,2}):(\d{1,2})\sGMT/;
  const matches = headerValue.match(dateRegex);

  if (!matches) {
    return null;
  }

  const [, day, month, year, hours, minutes, seconds] = matches;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = months.indexOf(month);

  return new Date(Date.UTC(year, monthIndex, day, hours, minutes, seconds));
};

exports.getUTCDateValue = getUTCDateValue;

const getUTCDateString = (ctx, headerName) => {
  const headerValue = get(ctx, headerName);
  if (!headerValue) {
    return null;
  }
  // console.log("--------zoukle", headerValue);
  // 解析 RFC 1123 格式的日期字符串
  const dateRegex =
    /(\d{1,2})\s(\w{3})\s(\d{4})\s(\d{1,2}):(\d{1,2}):(\d{1,2})\sGMT/;
  const matches = headerValue.match(dateRegex);
  if (!matches) {
    return null;
  }

  const [, day, month, year, hours, minutes, seconds] = matches;
  const utcDateString = `${day} ${month} ${year} ${hours}:${minutes}:${seconds} UTC`;

  return utcDateString;
};

exports.getUTCDateString = getUTCDateString;

const some = (ctx, header, value) => {
  const headerValues = get(ctx, header) || "";

  console.log(headerValues, "headerValues");
  // const values = headerValues.split(/\s*,\s*/);
  // return values.some((v) => v === value);
};

exports.some = some;
