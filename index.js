let express=require('express');
let fs=require('fs');
let app=express();
let port=process.env.PORT || 8080
let products=[]
app.use(express.json())
app.get("/productlist",(req,res)=>{
    let porductinfo=JSON.parse(fs.readFileSync('product.json'));

    res.json(porductinfo)
})
app.post("/productstore",(req,res)=>{
    let product=req.body;
    products.push(product)
    fs.writeFileSync('product.json',JSON.stringify(products));
    res.send('data stored succusfully')

    res.json(products);
})

app.listen(port,()=>{console.log('server is running baiby')})