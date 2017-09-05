## Goals

While U2F is a fairly simple and straightforward security standard, there hasn't been much written about it from a technical angle. Outside of the whitepapers, most guides simply focus on how to implement it into your [insert framework] web application.

The goal of this project is to show what's happening on the client end. You get to see details about the registration and signing process along with what information gets encoded into the repsonse.

#### Prerequisites

- A U2F Key
  - [Yubikey](https://www.amazon.com/gp/product/B00NLKA0D8)
  - [U2FZero](https://www.amazon.com/gp/product/B01L9DUPK6)
  - [Thetis](https://www.amazon.com/gp/product/B06XHTKFH3)
  - [Feitan](https://www.amazon.com/gp/product/B01M1R5LRD)
- You're viewing this on Chrome


#### Notes

- Uses the U2F-api-polyfill from Google. This library, released by Google, is the easiest way to interact with the built-in U2F chrome extension. The U2F example code provided assumes that you've loaded this polyfill.

