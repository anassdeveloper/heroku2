const express = require('express');

const cors = require('cors');
const ytdl = require('ytdl-core');

const PORT = process.env.PORT || 5000

const app = express();

let u;

app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Server youtube</h1>')
})

app.get('/download', (req, res) => {
    let URL = req.query.URL;
    u = URL;
   let id = ytdl.getURLVideoID(URL);
   console.log((id))
   // res.json({url: URL});
   
   ytdl.getInfo(id).then(reponse => {
      res.send(JSON.stringify(reponse));
      //res.redirect("/startdownload")
   }).catch(err => {
     res.send(JSON.stringify({ data : "noooo"}))
   })
   
    

    
     

 })

 app.get('/startdownload', (req, res) =>{
    res.header('Content-Disposition', 'attachment; filename="video.mp4');
    ytdl(u, {
        format: 'mp4'
    }).pipe(res)
 })

app.listen(PORT, () => {
    console.log('server run 5000');
})
