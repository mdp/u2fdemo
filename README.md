## Goals

While U2F has been around since 2014, support for it is fairly uncommon outside of a few large companies. Part of this has to do with limited browser (only Chrome and Opera) and mobile (only Android) support.
But there's also been very little written about how the protocol technically works, outside of the whitepapers.
Most U2F guides today simply focus on how to implement a U2F library into your [insert framework] web application.

The goal of this project is to reveal what's happening on the browser side with your U2F token. Instead of a how-to guide based on a library, you get to see details about the registration and signing process along with what information gets encoded into the response. Hopefully this will be useful for anyone out there toying with the idea of supporting U2F on their site.

To get started, grab your U2F key and ['Register'](#reg)

#### Prerequisites

- A U2F Key
  - [Yubikey](https://www.amazon.com/gp/product/B00NLKA0D8)
  - [U2FZero](https://www.amazon.com/gp/product/B01L9DUPK6)
  - [Thetis](https://www.amazon.com/gp/product/B06XHTKFH3)
  - [Feitan](https://www.amazon.com/gp/product/B01M1R5LRD)
- You're viewing this on Chrome


#### Notes

- Uses the U2F-api-polyfill from Google. This library, released by Google, is the easiest way to interact with the built-in U2F chrome extension. The U2F example code provided assumes that you've loaded this polyfill.

