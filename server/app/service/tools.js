/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-24 09:23:40
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-07 09:41:55
 */

'use strict';
const Service = require('egg').Service;
const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');
const nodemailer = require('nodemailer');
const userEmail = 'zhangzeyu_work@126.com';

const transporter = nodemailer.createTransport({
  service: '126',
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: 'QPTQIUVELTEEEMWI',
  },
});

class ToolService extends Service {
  async mergeFile(filePath, filehash, size) {
    const chunkdDir = path.join(this.config.UPLOAD_DIR, filehash);// 切片文件夹
    let chunks = [];
    const that = this;
    fs.readdir(chunkdDir, 'utf8', async function(err, files) {
      console.log('------读取文件');
      console.log(err);
      console.log(files);
      console.log('------读取.....');
      if (!err) {
        chunks = files;
      }
      chunks.sort((a, b) => a.split('-')[1] - b.split('-'[1]));
      chunks = chunks.map(cp => path.resolve(chunkdDir, cp));
      await that.mergeChunks(chunks, filePath, size);
    });
  }
  async mergeChunks(files, dest, size) {
    const pipStream = (filePath, writeStream) => new Promise(resolve => {
      const readStream = fse.createReadStream(filePath);
      readStream.on('end', () => {
        fse.unlinkSync(filePath);
        console.log('完成合并');
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
    setTimeout(() => {
      // 删除文件夹
      this.removeFile(dest);
    }, 9000);
  }
  async removeFile(dest) {
    const fileName = dest.split('public\\')[1];
    const hash = fileName.split('.')[0];
    const hashPath = path.resolve(this.config.UPLOAD_DIR, hash);
    if (fse.existsSync(hashPath)) {
      fse.rmdir(hashPath, err => {
        if (err) throw err;
        console.log('删除文件夹成功');
      });
    }
  }
  // 发送邮件
  async sendEmail(email, subject, text, html) {
    const maiOptions = {
      from: userEmail,
      cc: userEmail,
      to: email,
      subject,
      text,
      html,
    };
    try {
      await transporter.sendMail(maiOptions);
      return true;
    } catch (e) {
      console.log('发送失败错误信息:' + e);
      return false;
    }
  }
}


module.exports = ToolService;
