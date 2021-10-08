# 🍋 Lemonade Stand

> When life gives you lemons... make NFTs!

# Introduction

With this framework you can mint NFTs, manage their metadata resources with [Pinata](https://pinata.cloud) IPFS and [this dedicated Rails API](https://www.github.com/voscarmv/pinata_api), and list them for sale on OpenSea.

# Use case

This project seeks to demonstrate how NFTs can be connected with the real world via computer terminal connections like USB. With Lemonade Stand, you are able to generate NFTs on the fly, when your clients purchase them from you. Lemonade Stand allows you to use devices like USB cameras, bluetooth-controlled peripherials, and basically any hardware or software that can be accessed through a linux terminal, to generate and deploy NFTs.

# Example

This repo contains the working example of a ["Spirit box"](https://www.youtube.com/watch?v=tQ3fKc17BIU) NFT. If you've watched ghost hunters like [Shane and Ryan](https://www.youtube.com/watch?v=XHXLbp7x3MM) use it, you should know the basic principle of operation 👻.

But, how do you connect a spirit box to an NFT? - you ask. Well, the NFT is initially listed on OpenSea with no metadata, and a message that reads "Purchase this NFT to generate your spirit box .wav file!".

When the user purchases an NFT generated using Lemonade Stand, the `scraper.js` file detects the transaction, and places it in a queue for `dispatcher.js` to generate and update the data associated to the purchased NFT via the [Lemon API](https://www.github.com/voscarmv/lemon_api).

The spirit box reading is generated by the `tuner.sh` script, which operates on an actual [DSB-R100](https://angerman.net/articles/radio/) USB FM radio antenna I purchased at a flea market. The spirit box reading is achieved by randomly tuning through FM radio stations, just like any other spirit box would. This happens in real time right after the client has purchased the NFT. Once uploaded as a IPFS, the sound recording accesible to the purchaser via OpenSea.

This opens up the possibility to generate NFTs on-demand with any type of software *and* hardware you could think of, and by any programmatic process that you want!

# Why not just use ChainLink?

Too expensive. This project seeks to empower developers and users by taking power away from centralized services, and distributing it to their homes and offices. After all, distribution is of the cornerstones of cryptocurrency!

# Usage

Run these two loops to activate the NFT event scraper, and the API updater.

```
$ while true ; do node scraper.js ; sleep 6 ; done
$ while true ; do node dispatcher.js ; sleep 6 ; done
```
