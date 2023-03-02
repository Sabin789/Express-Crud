import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";

const BlogList = () => {
 
  const [posts,setBlog]=useState([])
  const [query,setQuery]=useState("")
  const[filtered,setFiltered]=useState([])
  const [id,setId]=useState("")
  const [authorButton,setAuthorButton]=useState([])
  const fetchFiltered =async(query)=>{
    try{
      let res=""
      {id==""? res= await fetch("http://localhost:3003/blogPosts?title="+query)
      :   res=await fetch(`http://localhost:3003/authors/${id}/blogPosts`)}
      

      if(res.ok){
        const jsonRes=await res.json()
        const title=jsonRes.map(a=>{return a.title})
        console.log(title)
   if(title.includes(query)){
        setFiltered(jsonRes)
       
   }
       
      }

    }
    catch(err){
      console.log(err)
    }
  }

  const fetchData= async()=>{
    const res= await fetch("http://localhost:3003/blogPosts")

  if(res.ok){
    
    const jsonRes=await res.json()
    setBlog(jsonRes)
    console.log(posts)
  }
}
 const getBlogsByAuthor=async()=>{
  try{
  const res=await fetch(`http://localhost:3003/authors/${id}/blogPosts`)

  if(res.ok){
    const jsonRes=await res.json()
    setBlog(jsonRes)
    
  }
  }catch(err){
    console.log(err)
  }
 }
 const getAuthors=async()=>{
  try{
  const res=await fetch(`http://localhost:3003/authors`)
  if(res.ok){
    const jsonRes=await res.json()
     setAuthorButton(jsonRes)
     console.log(jsonRes)
  }}catch(err){
    console.log(err)
  }
 }
  useEffect(()=>{
   fetchData()
   getAuthors()
  },[])
  useEffect(()=>{
   getBlogsByAuthor()
   },[id])
  useEffect(()=>{
    fetchFiltered(query)
    console.log(query)
  },[query])
  console.log(id)
  console.log(posts)
  return (
   
   
    <Row>
       <input type="text" onChange={(e)=>setQuery(e.target.value)}/>

       {authorButton===[]?"":authorButton.map(b=>{
        return <button key={b.id} onClick={()=>setId(b.id)}>{b.name}</button>
       })}
      {query===""?posts.map((post) => (
         
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      )):
      filtered.map((filteredPost)=>  <Col
      md={4}
      style={{
        marginBottom: 50,
      }}
    >
      <BlogItem key={filteredPost.title} {...filteredPost} />
    </Col>)
    }
    </Row>
  );
};


export default BlogList;
