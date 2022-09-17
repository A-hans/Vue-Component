// 生成随机字符串
export default function (len = 32) {
    const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        //随机拼接，默认生成32位Str
      str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
  }