let u2f = require('u2f')
let asn1 = require('../asn1.js')

let request = u2f.request('https://static.lvh.me')
request.challenge = 'MyChallenge'

let registration = {"registrationData":"BQTUx_u5SOGmJEtoEo9wiLkbV2Q3h8EezwOhERwzd232Eofft7ZzochXOZxeNOX8mJldzQyP63jT_D9YnTvIkcSZQMpy6i_mpE5gjeGifDfwYju4J5PcLLMeUpooynEo_ZbIxyADej_6lcgk3AoO6vYVMHYziFs3fTcP8T6PCn9Zvo4wggJPMIIBN6ADAgECAgQSNtF_MA0GCSqGSIb3DQEBCwUAMC4xLDAqBgNVBAMTI1l1YmljbyBVMkYgUm9vdCBDQSBTZXJpYWwgNDU3MjAwNjMxMCAXDTE0MDgwMTAwMDAwMFoYDzIwNTAwOTA0MDAwMDAwWjAxMS8wLQYDVQQDDCZZdWJpY28gVTJGIEVFIFNlcmlhbCAyMzkyNTczNDEwMzI0MTA4NzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABNNlqR5emeDVtDnA2a-7h_QFjkfdErFE7bFNKzP401wVE-QNefD5maviNnGVk4HJ3CsHhYuCrGNHYgTM9zTWriGjOzA5MCIGCSsGAQQBgsQKAgQVMS4zLjYuMS40LjEuNDE0ODIuMS41MBMGCysGAQQBguUcAgEBBAQDAgUgMA0GCSqGSIb3DQEBCwUAA4IBAQAiG5uzsnIk8T6-oyLwNR6vRklmo29yaYV8jiP55QW1UnXdTkEiPn8mEQkUac-Sn6UmPmzHdoGySG2q9B-xz6voVQjxP2dQ9sgbKd5gG15yCLv6ZHblZKkdfWSrUkrQTrtaziGLFSbxcfh83vUjmOhDLFC5vxV4GXq2674yq9F2kzg4nCS4yXrO4_G8YWR2yvQvE2ffKSjQJlXGO5080Ktptplv5XN4i5lS-AKrT5QRVbEJ3B4g7G0lQhdYV-6r4ZtHil8mF4YNMZ0-RaYPxAaYNWkFYdzOZCaIdQbXRZefgGfbMUiAC2gwWN7fiPHV9eu82NYypGU32OijG9BjhGt_MEQCIEXNa34faAvrRNRVx_4vvHluVEI5f4H8TBq1CHDNJg5cAiB1bJouUUtsezXmt9w0kjSwzi1nYdwLhzzxEUt-FT-3TA","challenge":"MyChallenge","version":"U2F_V2","clientData":"eyJ0eXAiOiJuYXZpZ2F0b3IuaWQuZmluaXNoRW5yb2xsbWVudCIsImNoYWxsZW5nZSI6Ik15Q2hhbGxlbmdlIiwib3JpZ2luIjoiaHR0cHM6Ly9zdGF0aWMubHZoLm1lIiwiY2lkX3B1YmtleSI6InVudXNlZCJ9"}

console.log(Buffer.from(registration.clientData, 'base64').toString())
var result = u2f.checkRegistration(request, registration)

console.log(result)
let b = result.certificate
const cert = asn1.decode(result.certificate)
debugger
console.log(cert)

//let b = result.certificate
//const asn1 = asn1js.fromBER(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength))
//const certificate = new pkijs.Certificate({ schema: asn1.result });
//console.log(certificate.toJSON())

//var registrationData = Buffer.from(registration.registrationData, 'base64');
//var clientData = Buffer.from(registration.clientData, 'base64');

//console.log(clientData.toString('utf-8'))
//let x509 = registrationData.slice(130, registrationData.length)
//console.log(x509.toString('base64'))
//let asn1 = asn1js.fromDER(x509);
//console.log(asn1.length)
//console.log(asn1)
//let certificate = new Certificate({ schema: asn1.result });
//console.log(certificate)
