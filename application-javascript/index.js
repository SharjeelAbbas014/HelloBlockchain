const {getContract} = require("./fetch_contract");
const express = require("express");
var bodyParser = require('body-parser')

const cors = require("cors");

const app = express();
app.use(bodyParser());

app.use(cors());
count = 10;
contract = null;

app.get("/", async(req,res)=>{
	if(contract == null){
		console.log("asdkakjslds")
		contract = await getContract();
	}
	const tasks = await contract.evaluateTransaction("GetAllTasks");
	console.log(tasks.toString())
	return res.send(tasks.toString());
});

app.post("/add", async(req,res)=>{
	count++;

	return ((await contract.submitTransaction("CreateTask", count.toString(), req.body.taskInput)).toString());
})

app.post("/delete", async(req,res)=>{
	return ((await contract.submitTransaction("DeleteTask", req.body.id)))
})
app.listen(8000,()=>console.log("RUNINNIGNGIGN"))