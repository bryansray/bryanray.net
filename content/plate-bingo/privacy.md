---
title: "Privacy Policy"
date: 2026-06-11
draft: false
description: "How Plate Bingo handles your data."
url: "/plate-bingo/privacy/"
---

# Plate Bingo Privacy Policy

**Effective date:** June 11, 2026

Plate Bingo is a small app for tracking which US state license plates you've spotted, optionally sharing that progress with family and friends. This page explains exactly what data the app handles, why, and how to remove it.

If you have questions or concerns, you can reach me at **bryan@bryanray.net**.

## What information the app handles

When you use Plate Bingo, the app handles the following information:

- **An Apple Sign in with Apple identifier** — a stable, app-specific user ID that Apple gives the app when you sign in. This is what tells the app's server that you are you on return visits.
- **Your name** — only if you choose to share it during Sign in with Apple, or if you set it explicitly inside the app. You can edit it in Settings at any time.
- **Your email address** — only if Apple shares one with the app. Apple may give the app a private relay address (`@privaterelay.appleid.com`) rather than your real address. The app uses your email solely as a display fallback when no name is set; it is never used for marketing, newsletters, or transactional email.
- **The state codes you've marked as seen**, along with the date and time you marked them.
- **The location where you marked a plate seen** (latitude and longitude), **only if** the Share Location with Friends setting is on. This setting is on by default and you can turn it off at any time in Settings → Privacy. When you turn it off, any locations already uploaded are immediately removed from the server.
- **Your friendships** — when you send or accept a follow request, the app records who is following whom so that it can decide whose plates to show you.

The app **does not** collect:

- Analytics or telemetry of any kind
- Crash reports
- Advertising identifiers
- Anything from your device's contacts, photos, calendar, microphone, or any other system service except Location (only when you trigger it by marking a plate seen, and only if you've opted in)

## Where your data is stored

- **On your device.** A local copy of your plate sightings lives on your iPhone or iPad in the app's private storage. This is what makes the app work offline.
- **In your private iCloud.** The app uses Apple's CloudKit to sync your own plate progress between your own iCloud-signed devices. Apple stores this data; I do not have access to it.
- **In a internal database I operate.** It is a hosted database service. The app uses it to enable Sign in with Apple, friendships, and the friend-sharing feature. The data lives in a US data center.

## Who can see your data

- **You can see all of your own data**, on every device signed into your account.
- **Friends you've explicitly accepted as followers** can see which states you've spotted, when you spotted them, and — if you have the location-sharing setting on — where you spotted them.
- **No one else.** Strangers cannot find your account. Friends can only follow you if you give them a one-tap invite link or share your user ID.
- **I do not sell, rent, or share your data with any third party**, with the technical exception of the hosting providers (Apple) that store it on my behalf.

## How long your data is kept

- **On your device**: until you delete the app or use Settings → Reset All.
- **In your iCloud**: managed by Apple's iCloud retention; the app itself does not control this.
- **On Plate Bingo Cloud**: until you delete your account.

When you tap **Delete Account** in Settings → Danger Zone, the app immediately:

1. Permanently deletes your row from Plate Bingo's auth system
2. Cascades the delete to remove your profile, every sighting, and every friendship that involved you
3. Signs you out and wipes the cached data on your device

There is no soft-delete or recovery period. Once you tap confirm, the data is gone.

## Your controls inside the app

- **Settings → Privacy → Share Location with Friends** — toggle that controls whether your plate-spotting coordinates leave your device. When turned off, the app also removes any historical coordinates already uploaded.
- **Settings → Reset All** — clears every plate you've marked as seen across all your devices.
- **Settings → Sign Out** — ends the current session but does not delete your account.
- **Settings → Danger Zone → Delete Account** — permanently removes everything as described above.
- **Settings → Friends** — see, manage, and remove every friendship the app knows about.

## Children's privacy

Plate Bingo is suitable for general audiences and does not intentionally collect personal information from children under 13. The app's data collection is gated by Sign in with Apple, which itself enforces age requirements through the user's Apple ID. If you believe a child under 13 has created an account, please contact me at **bryan@bryanray.net** and I will delete the account.

## International users

The app's server data is stored in a US data center. If you use the app from outside the United States, your data will be transferred to and processed in the United States. By using the app you consent to this transfer.

## Changes to this policy

If the app's data practices ever change, I'll update this page and revise the effective date at the top. The current version is always the one published at **https://bryanray.net/plate-bingo/privacy**.

## Contact

Bryan Ray
**bryan@bryanray.net**
