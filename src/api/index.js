
import  Express  from "express";
import listEndpoints from "express-list-endpoints";
import AuthorRouter from "./authors/index.js";
import cors from 'cors';
const app=Express()

const port=3002
app.use(Express.json())
app.use("/authors",AuthorRouter)
app.use(cors())
app.listen(port,()=>{
    console.table(listEndpoints(app))
    console.log(`Server running on port ${port}`)
})
