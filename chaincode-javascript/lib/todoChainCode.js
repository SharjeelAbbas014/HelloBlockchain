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
            task.docType = "task";
            await ctx.stub.putState(task.id, Buffer.from(JSON.stringify(asset)))
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
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(task)));
        return JSON.stringify(task);
    }
}