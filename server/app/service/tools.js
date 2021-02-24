/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-24 09:23:40
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-24 21:50:45
 */
'use strict';
const Service = require('egg').Service;
const path = require('path');
const fse = require('fs-extra');

class ToolService extends Service {
  async mergeFile(filePath, filehash, size) {
    const chunkdDir = path.resolve(this.config.UPLOAD_DIR, filehash);// 切片文件夹
    let chunks = await fse.readdir(chunkdDir);
    chunks.sort((a, b) => a.split('-')[1] - b.split('-'[1]));
    chunks = chunks.map(cp => path.resolve(chunkdDir, cp));
    await this.mergeChunks(chunks, filePath, size);
  }

  async mergeChunks(files, dest, size) {
    const pipStream = (filePath, writeStream) => new Promise(resolve => {
      const readStream = fse.createReadStream(filePath);
      readStream.on('end', () => {
        fse.unlinkSync(filePath);
        resolve();
      });
      readStream.pipe(writeStream);
    });

    await Promise.all([
      files.forEach((file, index) => {
        pipStream(file, fse.createWriteStream(dest, {
          start: index * size,
          end: (index + 1) * size,
        }));
      }),
    ]
    );
  }
}


module.exports = ToolService;
