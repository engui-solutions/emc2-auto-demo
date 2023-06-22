# Заавар

Энэхүү demo нь Emc2-thirdparty холболт хийх frontend, backend хэсгийг агуулсан болно.

## Backend

server.js файлд үндсэн backend үйлдлийг жишээ болгон оруулсан байгаа. 

### Ажиллуулах:

* `npm` package manager шаардлагатай.
* Прожектийг клондох `git clone https://github.com/engui-solutions/emc2-thirdparty-demo.git`
* Шаардлагатай санг суулгах `npm install`
* Ажиллуулах `node server.js`
* `server.js` файлд өөрийн байгууллын токеныг оруулж өгнө

```js
const token = 'Bearer <Your token>';
```

## Frontend

`index.html` файлд frontend хэсгийг оруулсан байгаа.

### Ажиллуулах

* `http-server` сан шаардлагатай
* Ажиллуулахдаа `index.html` файл байгаа фолдерт `http-server` командыг оруулна
