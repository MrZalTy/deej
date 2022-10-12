<p align="center">
    <a href="https://github.com/MrZalTy/deej">
    <img src=".github/assets/logo.png" width="160" alt="Logo" /></a>
</p>

<h1 align="center">DeeJ</h1>

<p align="center">A DeeJ for your Discord parties.</p>

---

Do you need a DJ for your Discord parties? Just call DeeJ, he will come to your channel and play your favourite song!

## 📕 How does it work ?

The project uses the `Discord.js` SDK alongside `discord-player` package to stream audio tracks from different providers (Spotify, Youtube, Soundcloud...) to Discord.

## ⏩ Getting Started

### ⚙️ Installation

Install Docker using the [official documentation](https://docs.docker.com/compose/install/linux/) and pull the DeeJ Docker image:
```shell
docker pull ghcr.io/MrZalTy/deej:latest
```

### 🏁 Quickstart

Edit the `.env.example` file according to your needs and renames it to `.env`.

Start the DeeJ Docker container:
```shell
docker run -d --env-file .env ghcr.io/MrZalTy/deej:latest
```

## 💻 Technologies

<img src="https://skillicons.dev/icons?i=nodejs,ts,docker" alt="technologies" />

## ✏️ License

DeeJ is distributed under the [MIT License](LICENSE)

## ✍️ Authors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/MrZalTy">
        <img src="https://avatars.githubusercontent.com/u/25481821?v=4?s=100" width="100px;" alt="avatar"/><br />
      <sub>
        <b>MrZalTy</b>
      </sub>
    </a>
  </tr>
</table>

---

> 🚀 Don't forget to put a ⭐️ on my repositories !
