//define the expressobj
const expressobj=require('express');
const hbsObj=require('hbs');
const fsobj=require('fs');
//new express app
var app=expressobj();
app.set('view engine','hbs');
hbsObj.registerPartials(__dirname+'/views/partials');
//add some middle ware
app.use(expressobj.static(__dirname+'/public'));
app.use((req,resp,next)=>{
  var now=new Date().toString();
  var log=`${now} :${req.method} ${req.url}`;
  fsobj.appendFile('server.log',log+'\n');
  console.log();
  resp.render('maintenance.hbs');
//next();
});
//for the Http routing
//req --> headers,body,method,path...etc.
//resp --> http response,status codes...etc.
app.get('/',(req,resp)=>{
  // resp.send('<h1>Hello from node Express...!</h1>');
  resp.send({name:"Rama",Designation:"Desc"})
});
app.get('/about',(req,resp)=>{
//resp.send("About the Node");
resp.render('about.hbs',{Desc:'Test Obj from Server',cudate: new Date().getFullYear()});
});
app.get('/bad',(req,resp)=>{
resp.send({error:"error in the file"});
});
app.listen(3000,()=>{
  console.log('server is running on 3000');
});
