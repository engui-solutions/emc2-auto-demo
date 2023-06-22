process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const fs = require('fs')
const https = require('https')
const axios = require('axios');
const cors = require('cors');
const FormData = require('form-data')
const multiparty = require('multiparty')

const app = express();
const port = 3456;

const agent = new https.Agent({
  rejectUnauthorized: false,
})

const token = 'Bearer <Байгууллагын токен>';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/auto/check', async (req, res) => {
  try {
    const response = await axios.post('https://thirdparty.engui.mn/third/es2aas/auto/check', req.body, {
      httpsAgent: agent,
      headers: {
        Authorization: token,
      }
    })
    res.json(response.data)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Алдаа гарлаа'});
  }
})

app.post('/auto/sign', async (req, res) => {
  try {
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
      console.log(fields, files, err)
      if (err == null) {
        const formData = new FormData()
        for (const field in fields) {
          formData.append(field, fields[field][0])
        }
        for (const fileField in files) {
          formData.append(fileField, fs.createReadStream(files[fileField][0].path) )
        }

        const response = await axios.post('https://thirdparty.engui.mn/third/es2aas/auto/sign/document', formData, {
          httpsAgent: agent,
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          }
        })
        res.json(response.data)
      } else {
        res.status(500).json({ error: 'Алдаа гарлаа'});
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Алдаа гарлаа'});
  }
})

app.listen(port, () => {
  console.log(`Сервер http://localhost:${port} ажиллаж байна`)
})