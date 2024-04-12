const {AES, enc, mode, pad} = require("crypto-js");

const getOptions = (iv) => {
  return {
    iv: enc.Utf8.parse(iv),
    mode: mode.CBC,
    padding: pad.ZeroPadding,
  };
}

/** 加密 */
exports.AESEncrypt = (str, key, iv) => {

  const options = getOptions(iv);

  return AES.encrypt(str, enc.Utf8.parse(key), options).toString();
};
/** 解密 */
exports.AESDecrypt = (cipherText, key, iv) => {

  const options = getOptions(iv);

  return AES.decrypt(cipherText, enc.Utf8.parse(key), options)
    .toString(enc.Utf8)
    .replace(//g, '')
    .replace(/\x00/g, '');
};
