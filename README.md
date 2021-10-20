# 🍋 Lemonade Stand

> When life gives you lemons... make NFTs!

# Introduction

With this framework you can mint NFTs deployed with [squeeze](https://github.com/voscarmv/squeeze), manage their metadata resources with [Pinata](https://pinata.cloud) IPFS and [the Lemon API](https://www.github.com/voscarmv/lemon_api), and list them for sale on OpenSea.

# We're live on Polygon Mainnet and Opensea!

You can purchase one of the first 8 limited edition Spirit Box Vending NFTs here: https://opensea.io/collection/spirit-box-vending

Once you purchase the Spirit Box Vending NFT, a Lemonade Stand instance running in a Raspberry Pi connected to an actual spirit box will generate your paranormal reading and upload it to IPFS for you. All you have to do is click the "Refresh" button on your newly purchased NFT on Opensea, and wait for it to update. Note: this might take several minutes.

To learn how to purchase polygon NFTs on Opensea, check out this: https://support.opensea.io/hc/en-us/articles/1500012881642-How-do-I-transfer-ETH-from-Ethereum-to-Polygon-

# Use case

This project seeks to demonstrate how NFTs can be connected with the real world via computer hardware devices like USB cameras, microphones, antennas... basically any hardware or software that can be accessed through a linux terminal. If your device can be accessed from a POSIX shell, Lemonade Stand can hook it up to an NFT!

Lemonade stand reacts to user interactions with NFTs via their transaction events. Every time the NFT is purchased, transfered or operated on in any way, it's possible to generate an event that Lemonade Stand can read and react to (by updating NFT metadata, for example). This allows for an enormous range of possibilities.

This means NFTs can be used as an efficient currency for purchasing units of processing power or energy consupmtion. We can program Lemonade Stand to generate events for the purchaser, as a result of the purchase being made. This means clients could pay for the work they want a machine to do, like taking a picture, or operating a robot arm to do something, powering a car, etc. NFTs can thus be used as energy accounting units, related to monetary value.

# How is this different from ChainLink?

**Lemonade Stand is free and requires 0 fees.**

ChanLink is just too expensive. This project seeks to empower developers and users by taking power away from centralized services, and distributing it to their own homes and offices (in accordance to the blockchain design principle of service distribution). Lemonade Stand can run in a standard home PC running linux connected to the internet. Or you can host it in your own online virtual machine to guarantee uptime.

The point here is to give ownership back to the hobbyist and the practicing developer, as opposed to drowning creative and potentially good projects in unreachable fees.

# Example

This repo contains the working example of a ["Spirit box"](https://www.youtube.com/watch?v=tQ3fKc17BIU) NFT. If you've watched ghost hunters like [Shane and Ryan](https://www.youtube.com/watch?v=XHXLbp7x3MM) use it, you should know the basic principle of operation 👻.

But, how do you connect a spirit box to an NFT? - you may ask. Well, the NFT is initially listed on OpenSea with no metadata, and a message that reads "Purchase this NFT to generate your spirit box .wav file!".

When the user purchases an NFT generated using Lemonade Stand, the `scraper.js` file detects the transaction, and places it in a queue for `dispatcher.js` to generate and update the metadata associated to the purchased NFT via the [Lemon API](https://www.github.com/voscarmv/lemon_api).

The spirit box reading is generated by the `tuner.sh` script, which operates on an actual [DSB-R100](https://angerman.net/articles/radio/) USB FM radio antenna I purchased at a flea market. The spirit box reading is achieved by randomly tuning through FM radio stations, just like any other spirit box would. The computer creates this recording in real time right after the client has purchased the NFT. Once uploaded as a IPFS, the sound recording is accesible to the purchaser via OpenSea.

This opens up the possibility to generate NFTs on-demand with any type of software *and* hardware you could think of, and by any programmatic process that you want!

# Limitations

This project is intended as a framework for casual NFT developers and hobbyists. This project comes at a time when beginner-friendly projects are paramount to the goal of mass adoption of blockchain technology.

The more technical intention is for this NFT server model to serve as a distributed unit of user interaction. One way around the possibility of a DOS due to high demand (wherein the queue would grow too long for the `dispatcher.js` to serve in a reasonable time frame) would be to limit the minting frequency. That way, there is a guaranteed daily limit to the volume of information the dispatcher has to serve.

A way to extend Lemonade Stand would be to run multiple instances of it, connected to a load balancer. If the NFT is connected to some hardware device, parallel processing will be impossible unless more devices are hooked up to the network. So for example, if you'd like to double the amount of Spirit Box NFTs being processed in a day, you'd need 2 USB FM antennae.

# Usage

Run these two loops to activate the NFT event scraper, and the API updater.

```
$ while true ; do node scraper.js ; sleep 6 ; done
$ while true ; do node dispatcher.js ; sleep 6 ; done
```
