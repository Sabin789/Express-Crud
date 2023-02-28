import  Express  from "express";
import fs from "fs"
import { fileURLToPath } from "url"; 
import { dirname,join } from "path";
import uniqid from "uniqid"



const AuthorsFileToJson=join(dirname(fileURLToPath(import.meta.url)),"authors.json")
console.log(AuthorsFileToJson)
//1
const AuthorRouter=Express.Router()  


//-------------2{
AuthorRouter.post("/",(req,res)=>{
    const newAuthor={...req.body,id:uniqid()}
    const fileName=fs.readFileSync(AuthorsFileToJson)
 const array=JSON.parse(fileName)
 if(array.filter(a=>a.email ===newAuthor.email)){
    res.send({message:"Email addres already in use"})
    res.render("./authors/index.js")
 }else{
 
 array.push(newAuthor)

 fs.writeFileSync(AuthorsFileToJson,JSON.stringify(array))

 res.status(201).send({ id: newAuthor.id })}
})


AuthorRouter.get("/",(req,res)=>{
 const fileName=fs.readFileSync(AuthorsFileToJson)
 const author=JSON.parse(fileName)
 res.send(author)
})


AuthorRouter.get("/:authorId",(req,res)=>{
    const fileName=fs.readFileSync(AuthorsFileToJson)
 const author=JSON.parse(fileName)
 const singleAuthor=author.find(a=>a.id===req.params.authorId)
    res.send(singleAuthor)
})

AuthorRouter.put("/:authorId",(req,res)=>{
    const fileName=fs.readFileSync(AuthorsFileToJson)
    const array=JSON.parse(fileName)
   const index=array.findIndex(a=>a.id===req.params.authorId)

   const current=array[index]
   
   const updated={...current,...req.body}
   array[index]=updated
   fs.writeFileSync(AuthorsFileToJson,JSON.stringify(array))
   
   res.send(updated)
})


AuthorRouter.delete("/:authorId",(req,res)=>{
    const fileName=fs.readFileSync(AuthorsFileToJson)
    const array=JSON.parse(fileName)
    const remaining=array.filter(a=>a.id!==req.params.authorId)
    fs.writeFileSync(AuthorsFileToJson,JSON.stringify(remaining))
    res.status(204).send()
})

//----------}

export default  AuthorRouter