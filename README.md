## Goals

While U2F is a fairly simple and straightforward security standard, there hasn't been much written about it from a technical angle. Outside of the whitepapers, most guides simply focus on how to implement it into [insert framework] web application.

The goal of this project is to show what's happening on the client end. You get to see details about the registration and signing process along with what information gets encoded into the repsonse.

#### Prerequisites

- A U2F Key
  - [Yubikey](https://smile.amazon.com/Yubico-Y-123-FIDO-U2F-Security/dp/B00NLKA0D8/ref=sr_1_4?ie=UTF8&qid=1504479671&sr=8-4&keywords=u2f Yubikey)
  - [U2FZero](https://smile.amazon.com/U2F-Zero/dp/B01L9DUPK6/ref=sr_1_5?ie=UTF8&qid=1504479671&sr=8-5&keywords=u2f)
  - [Thetis](https://smile.amazon.com/Thetis-Universal-Authentication-Protection-SalesForce/dp/B06XHTKFH3/ref=sr_1_3?ie=UTF8&qid=1504479671&sr=8-3&keywords=u2f)
  - [Feitan](https://smile.amazon.com/Feitian-ePass-NFC-FIDO-Security/dp/B01M1R5LRD/ref=sr_1_7?ie=UTF8&qid=1504479671&sr=8-7&keywords=u2f)
- You're viewing this on Chrome


#### Notes

- Uses the U2F-api-polyfill from Google. This library, released by Google, is the easiest way to interact with the built-in U2F chrome extension. The U2F example code provided assumes that you've loaded this polyfill.

