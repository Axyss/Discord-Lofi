<p align="center">
    <p align="center">
    <img src="./assets/boticon.jpg" width=120>
    <p align=center>
    <img src="./assets/lofibot-2.png" width=250/>

</p>

</p>
<p align="center">
<a href="https://github.com/rit3zh/Discord-Lofi" target="_blank">
    <img src="http://forthebadge.com/images/badges/built-with-love.svg"/>
  </a>
</p>

  <p align="center">
<p align="center">
  <a href="https://github.com/rit3zh/Discord-Lofi" target="_blank">
    <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="Build Status">
  </a>
  <a href="https://github.com/rit3zh/Discord-Lofi" target="_blank">
    <img src="https://img.shields.io/badge/License-Boost_1.0-lightblue.svg" alt="Codecov" />
  </a>
  <a href="https://github.com/rit3zh/Discord-Lofi" target="_blank">
    <img src="https://img.shields.io/badge/License-ISC-blue.svg" alt="License">
  </a>
  <a href="https://github.com/rit3zh/Discord-Lofi" target="_blank">
    <img src="https://badgen.net/github/release/Naereen/Strapdown.js" alt="License">
  </a>

</p>

<p align="center">
  <a href="https://www.buymeacoffee.com/rit3zh" target="_blank">
    <img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" />
  </a>
  
</p>

## 🛠 Prerequisites

1. A Discord Bot Token [how to obtain a bot token?](https://www.writebots.com/discord-bot-token/)

- Enabling "MESSAGE CONTENT INTENT" & "PRESENCE INTENT"

2. NodeJS higher than v16.20.2 [Check NodeJS versions.](https://nodejs.org/en/about/previous-releases)

> [!WARNING]  
> Using NodeJS below "v16.20.2" might cause unexecpted errors. Therefore, it is better to upgrading your Node version to the latest to avoid errors.

## 🚀 Getting Started (Bot)

```bash
# cloning the repository.
> $ git clone https://github.com/rit3zh/Discord-Lofi

#   Navigating inside the folder.
> $ cd DiscordLofiBot

# Installing all the required dependencies.
> $ npm install --save # using yarn? --> yarn
```

> [!NOTE]  
> Once all the dependencies are installed, follow the configuration steps listed below. Once everything is completed, use the command `npm run dev`

## 🔧 Configuring

```bash
token=YOUR_DISCORD_BOT_TOKEN

guildId=GUILD_ID

#Mongoose Connection URI is optional.
connectionURI=MONGOOSE_CONNECTION_URI

inviteURL=YOUR_BOT_INVITE_URI
```

> [!CAUTION]
> Please make sure to rename ".env.example" to ".env" after filling in all the required information.

## ⚡ Client Server (Website)

> [!IMPORTANT]  
> The website is still in under construction. However, you are feel free to customize the website accordingly to you.

```bash
# Navigating to the website folder.
cd website

# Installing all the mandatory dependencies.
npm install --save

# Starting the development server.
npm start # using yarn? --> yarn start
```

### Server

| Port   | Number            | Default |
| ------ | ----------------- | ------- |
| Number | <code>3000</code> | 3000    |

<p>

- The initial port is 9000, the development server will be up on now: [http://localhost:3000](http://localhost:3000)

## ☁️ Deploying Your Own Instance

### Heroku

#### Click the button below to deploy this project to Heroku.

[![Deploy on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rit3zh/Discord-Lofi/tree/main)

## 🤝 Contributing

1.  [Fork this repository]()
2.  Clone your fork: git clone https://github.com/rit3zh/Discord-Lofi
3.  Create your feature branch: git checkout -b something new
4.  Stage changes git add .
5.  Commit your changes: `npm run commit` or `cz`
6.  Push to the branch: git push origin something new
7.  Submit a pull request.

## 📜 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for details about the changes in each version.
