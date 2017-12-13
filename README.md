## Goals

The goal of this project is to reveal what's happening on the browser side with your U2F token. Instead of a how-to guide based on a library, you get to see details about the registration and signing process along with what information gets encoded into the response. Hopefully this will be useful for anyone out there toying with the idea of supporting U2F on their site.

If you want to learn more about how U2F works, I've written a developers guide which can be found [here](https://medium.com/@mdp/quick-and-dirty-developer-guide-to-u2f-c5767054b45b)

To get started, grab your U2F key and ['Register'](#reg)


#### Prerequisites

- A U2F Key
  - [Yubikey](https://www.amazon.com/gp/product/B00NLKA0D8)
  - [U2FZero](https://www.amazon.com/gp/product/B01L9DUPK6)
  - [Thetis](https://www.amazon.com/gp/product/B06XHTKFH3)
  - [Feitan](https://www.amazon.com/gp/product/B01M1R5LRD)
- You're viewing this on Chrome or Firefox


#### Notes

- Uses the U2F-api-polyfill from Google. This library, released by Google, is the easiest way to interact with the built-in U2F chrome extension. The U2F example code provided assumes that you've loaded this polyfill.

