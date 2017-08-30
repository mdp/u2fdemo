let asn1 = require('./asn1')

module.exports = {
  parseRegistration,
  parseSignature,
  b64,
  b64d
}

// Websafe base 64
function b64(b){
  return Buffer.from(b).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function b64d(b){
  return Buffer.from(b.replace(/\-/g, '+').replace(/\_/g, '/'), 'base64').toString('utf-8')
}


function parseRegistration(reg) {
  let buf = Buffer.from(reg.registrationData, 'base64')
  let reservedByte = buf[0];                       buf = buf.slice(1)
  let userPublicKey = b64(buf.slice(0, 65));            buf = buf.slice(65)
  let keyHandleLength = buf[0];                   buf = buf.slice(1)
  let keyHandle = b64(buf.slice(0, keyHandleLength));  buf = buf.slice(keyHandleLength)
  let certificate = parseCert(buf);            buf = buf.slice(certificate._length)
  let signature = b64(buf)
  return {
    reservedByte,
    userPublicKey,
    keyHandleLength,
    keyHandle,
    attestationCertificate: certificate,
    signature
  }
}

function parseSignature(res) {
  let buf = Buffer.from(res.signatureData, 'base64')
  let userPresence = buf[0];                   buf = buf.slice(1)
  let counter = buf.slice(0, 4).readInt32BE(0); buf = buf.slice(4)
  let signature = b64(buf)
  return {
    userPresence,
    counter,
    signature
  }
}



function parseCert(certificate) {
  try {
    let cert = asn1.decode(certificate)
    return {
      _length: cert.length,
      subject: cert.sub[0].sub[5].sub[0].sub[0].sub[1].content(),
      issuer: cert.sub[0].sub[3].sub[0].sub[0].sub[1].content(),
      validityNotBefore: cert.sub[0].sub[4].sub[0].content(),
      validityNotAfter: cert.sub[0].sub[4].sub[1].content(),
      sigAlgorithm: cert.sub[0].sub[2].sub[0].content(),
      serial: cert.sub[0].sub[1].content()
    }
  } catch (e) {
    console.log(e)
    return 'Bad Cert'
  }
}

