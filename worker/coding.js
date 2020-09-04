const base2048 = require("base2048");
const jsonCipher = require("json-cipher");

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return view;
}

function toBuffer(ab) {
    var buf = Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

const encode = (object, secret, base="2048", algorithm="aes-256-cbc") => {
    const { cipher } = jsonCipher(secret, algorithm);
    if (base=="2048"){
        const buffer = cipher(object)
        const uint8Arr = toArrayBuffer(buffer)
        return base2048.encode(uint8Arr)
    }
}

const decode = (string, secret, base="2048", algorithm="aes-256-cbc") => {
    const { decipher } = jsonCipher(secret, algorithm);
    if (base=="2048"){
        const uint8Arr = base2048.decode(string)
        const buffer = toBuffer(uint8Arr)
        return decipher(buffer)
    }
}


module.exports = {
    encode,
    decode
}
