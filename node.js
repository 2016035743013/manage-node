let request = require('request');
let express = require('express');
let app = express();
let router = express.Router();
let http = require('http');


router.get('/', (req, res, next) => {
  http.get(`http://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_num?rsp_type=1&uid=354547907&update_num_dy_id=0&type_list=64`, (res) => {
    // console.log(res);
    let data = '';
    res.on('data', (chunk)=> {
      data += chunk;
    });
    res.on('end', () => {
      console.log(JSON.parse(data));

    })
  })
  console.log('get');
  res.send('hello world');
  
});

app.use('/test', router);


http.createServer(app).listen(8886);


