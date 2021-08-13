const {getContract} = require("./fetch_contract");
const express = require("express");
const app = express();




app.get("/", async(req,res)=>{
	contract = await getContract();
	console.log("asdasD", contract)
	const tasks = await contract.evaluateTransaction("GetAllTasks");
	console.log("TASKKSKKSKSK", tasks.toString())
	return res.send(tasks.toString());
});

app.listen(3000)