<h2 align="center">
  Serverless Tracker Correios Packages
</h2>

<p align="center">Serveless function that get Correios Package info</p>

## Setup

- Clone the app:
```
git clone https://github.com/lucasmcoelho/tracker-correios-serverless.git
```
- Install all dependencies:
```
npm install
```
- Login to Cloudflare account (https://workers.cloudflare.com/)
- Create subdomain on cloudflare or use one already created
- Run main application:
```
npm start
```
## Usage
- GET request
```
http://localhost:8787/consultar/{TRACK-NUMBER}
```

## Example

https://tracker-correios-serverless.lucasmcoelho.workers.dev/consultar/NX781526297BR


## 📝 License

This project lives under MIT License. See [LICENSE](LICENSE.md) for more details.