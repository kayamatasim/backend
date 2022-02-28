let express=require('express');
let fs=require('fs');
let app=express();
let cors=require('cors');
var port =(process.env.PORT || '3000');
let products=[]
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json())

app.get('/',(req,res)=>{
     res.send('hello there');
})
app.get("/productlist",(req,res)=>{
    let porductinfo=JSON.parse(fs.readFileSync('product.json'));

    res.json(porductinfo)
})

//post method 
app.post("/productstore",(req,res)=>{
    products=JSON.parse(fs.readFileSync('product.json'));
    let product=req.body;
    
    let bat=products.find(p=>p.pid==product.pid);
    
    if(bat==undefined){
        products.push(product)
        fs.writeFileSync('product.json',JSON.stringify(products));
  
        res.send('data stored succusfully')
    }
    else{

        res.send('product id must be unique')
    }

   
    
 

   
})

//delete method

app.delete('/deleteproduct/:pid',(req,res)=>{
    let pid=req.params.pid;
    products=JSON.parse(fs.readFileSync('product.json'));
    
   
    let index=products.findIndex((p)=>{return p.pid==pid});
    console.log(index);
    if(index<0){
        res.send('product is not present');
    }
    else{
        products.splice(index,1);
        fs.writeFileSync('product.json',JSON.stringify(products));
        res.send('product delete successfully');
    }
})

//update get by id

app.get('/getproductbyid/:pid',(req,res)=>{
   
      let pid=req.params.pid;
      let products=JSON.parse(fs.readFileSync('product.json'));
      let index=products.find(p=>p.pid==pid);

      if(index==undefined){
          res.send(`id ${index} is not present`);

      }
      else{
          
          res.json(index);
          console.log('data sent')
      }
})


//put method

app.put('updateproductinfo',(req,res)=>{
    let newproduct=req.body;
    products=JSON.parse(fs.readFileSync('product.json'));
    index=products.findIndex(p=>p.pid==newproduct.pid);
    console.log(index)
    if(index<0){
        res.send('id is not present')
    }
    else{
        products[index].pname=newproduct.pname;
        products[index].pImage=newproduct.pImage;
        products[index].price=newproduct.price;
        fs.writeFileSync('product.json',JSON.stringify(products));
        res.send('product updated successfully');
        
    }
})

app.listen(port)