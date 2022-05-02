import path from 'path';
import fs from 'fs';

const start = () => {
  const dest = path.resolve((process.argv[2] || './dist').trim());

  if (!fs.existsSync(dest)) {
    console.error('指定的目录不存在：', dest);
    return false;
  }

  fs.rmSync(dest, { recursive: true });

  console.log('目录已删除：', dest);
  return true;
}

start();
