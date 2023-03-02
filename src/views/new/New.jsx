import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
const NewBlogPost = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title,setTitle]=useState("")
  const [category,setCategory]=useState("")
  const [cover,setCover]=useState("")
  const [value,setValue]=useState("")
  const [unit,setUnit]=useState("")
  const [name,setName]=useState("")
  const [avatar,setAvatar]=useState("")
  const newBlog={
    title,category,cover,readTime:{
      value,unit
    },author:{
      name,avatar
    }

  }
 useEffect(()=>{
  console.log(newBlog)
 },[newBlog])
  const postData= async(blog)=>{
    const res= await fetch("http://localhost:3003/blogPosts",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"

      },
      body:JSON.stringify(blog)
    }
    )
  
  if(res.ok){
    const jsonRes=await res.json()
    console.log(jsonRes)
    
  }
}

  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" placeholder="Title" value={title.value} 
          onChange={(e)=>setTitle(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select" value={category.value} 
          onChange={(e)=>setCategory(e.target.value)}>
            <option value="">Please Select a category</option>
            <option value={"Horror"}>Horror</option>
            <option value={"Action"}>Action</option>
            <option value={"Fantasy"}>Fantasy</option>
           
          </Form.Control>
          <Form.Label>Cover</Form.Label>
          <Form.Control size="lg" placeholder="Choose a cover" value={cover.value} 
          onChange={(e)=>setCover(e.target.value)}/>
          <Form.Label>Unit</Form.Label>
          <Form.Control size="lg" placeholder="Choose a unit of time" value={unit.value} 
          onChange={(e)=>setUnit(e.target.value)}/>
          <Form.Label>Units</Form.Label>
          <Form.Control size="lg" placeholder="Choose how many units" value={value.value} 
          onChange={(e)=>setValue(e.target.value)}/>
   
          <Form.Label>Name</Form.Label>
          <Form.Control size="lg" placeholder="Choose a Name" value={name.value} 
          onChange={(e)=>setName(e.target.value)}/>
          <Form.Label>Avatar</Form.Label>
          <Form.Control size="lg" placeholder="Choose an Avatar" value={avatar.value} 
          onChange={(e)=>setAvatar(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            onClick={()=>postData(newBlog)}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
