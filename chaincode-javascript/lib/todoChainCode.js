const { Contract } = require('fabric-contract-api');

// Smart Contract for handling todo stuff in blockchain
class TodoContract extends Contract{
    //Initialize Ledger for the first time
    async InitLedger(ctx){
        const tasks=[
            {
                id: "1",
                title: "Hello World"
            }
        ]
        for (const task of tasks){
            await ctx.stub.putState(task.id, Buffer.from(JSON.stringify(task)))
            console.info(`Task ${task.id} initialized`);
        }
    }

    // Helper function to check if task already exist
    async TaskExists(ctx, id) {
        const taskJSON = await ctx.stub.getState(id);
        return taskJSON && taskJSON.length > 0;
    }

    // Create new task
    async CreateTask(ctx, id, title) {
        const exists = await this.TaskExists(ctx, id);
        if (exists) {
            throw new Error(`The task ${id} already exists`);
        }

        const task = {
            id,
            title
        };
        console.log("hahhahahhahah");
        try{

        
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(task)));
        return JSON.stringify(task);
    }
    catch(err){
        console.log(err);
    }
    }
    async DeleteTask(ctx, id) {
        const exists = await this.TaskExists(ctx, id);
        if (!exists) {
            throw new Error(`The task ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }
    async GetAllTasks(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}
module.exports = TodoContract;
