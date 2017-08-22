let asn1 = require('./asn1')

module.exports = {
  parseRegistration: parseRegistration
}

function parseRegistration(reg) {
  let buf = Buffer.from(reg.registrationData, 'base64')
  let reserved = buf[0];                       buf = buf.slice(1)
  let publicKey = buf.slice(0, 65);            buf = buf.slice(65)
  let keyHandleLen = buf[0];                   buf = buf.slice(1)
  let keyHandle = buf.slice(0, keyHandleLen);  buf = buf.slice(keyHandleLen)
  let certificate = parseCert(buf);            buf = buf.slice(certificate._length)
  let signature = buf
  return {
    publicKey: publicKey,
    keyHandle: keyHandle,
    certificate: certificate,
    signature: signature
  }
}

function parseCert(certificate) {
  try {
    let cert = asn1.decode(certificate)
    return {
      _length: cert.length,
      subject: cert.sub[0].sub[5].sub[0].sub[0].sub[1].content(),
      issuer: cert.sub[0].sub[3].sub[0].sub[0].sub[1].content()
    }
  } catch (e) {
    console.log(e)
    return 'Bad Cert'
  }
}

