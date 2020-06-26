const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");
const https = require('https')

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/",(req,res)=>{
	res.sendFile(`${__dirname}/index.html`)
})
app.post("/" ,(req,res)=>{

					let fname = req.body.fname ;
					let lname = req.body.lname ;
					let email = req.body.email
					console.log(fname,lname,email)

					const data ={
						members:[
						{
						email_address: email,
						status:"subscribed",
						merge_fields: {
							Fname:fname,
							Lname:lname
									}
						}
					]
				}
								const jsData = JSON.stringify(data)
								const url = "https://us10.api.mailchimp.com/3.0/lists/2024728852"
								const options = {
									method:"post",
									auth:"deepsharam:cdd9645780bed51669015669bb2370db-us10" ,
									body:jsData
								    		}
							const request = https.request(url,options,(response)=>{
								(response.statusCode === 200) ? 
								res.sendFile(`${__dirname}/sucess.html`) 
								: res.sendFile(`${__dirname}/failure.html`)
								

							// response.on("data",(data)=>{
							
							// console.log("data is fetch ")
							// 	} )
							})
			request.write(jsData)
			request.end();


})
app.post("/faliure",(req,res)=>{
res.redirect("/");
})


app.listen(process.env.PORT || 3000,()=>{
	console.log("server is listing")
})
// api key 
// cdd9645780bed51669015669bb2370db-us10
// LIST IDS
// 2024728852