
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import "./BlogPosts.css"

const AllPost = () => {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
const navigate = useNavigate()


const handleDelete = async (id) => {

  try{
const token = localStorage.getItem("token")

await axios.delete(`https://final-project-sage-nu.vercel.app/api/post/deleteblogpost/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

setPosts((prevPosts)=>prevPosts.filter((post)=>post._id !==id))

}catch(err){
  
  console.log(err)
  alert('faild to delete post');
}

}





// feching  data using useEffect
useEffect( () => {

  const fetchPosts = async () => {


try{


    const res = await axios.get('https://final-project-sage-nu.vercel.app/api/post/getallpost')
    setPosts(res.data.data)
}catch(err){ setError(err.message)

 } finally{

  setLoading(false)
 }

  }
fetchPosts()
},[])

if(loading) return<p>loading... </p>;
if(error) return <p style={{color:'red'}}>Error:{error}</p>


  return (
     <div className='BlogPost-con'>
    <section className='blog-card'>
      <article className='article'>
        <h2>All Blog Posts</h2>
      <input type="text" placeholder='search post' className='input-blogPost'/>
      </article>
      {
posts.length === 0 ?(<p>No Blog Post Available</p>

) : (

  posts.map((post) => (
 <div key={post._id} className='blog-item'>
  {post.imageUrl &&  (
<img src={post.imageUrl} alt={post.title} 

style={{width:"300px",borderRadius:"10px"}}
/>

  )}
  <h3>{post.title}</h3>
  <p>{post.subtitle}</p>
  <p>{post.content}</p>
  <small>{new Date(post.createdAt).toDateString()}</small>
<button onClick={()=> handleDelete(post._id)}>Delete</button>
<button onClick={()=>navigate(`/updatepost/${post._id}`)}>Update Post</button>

</div>

  ))
)


      }
    </section>
    
  
    </div>
  )
}

export default AllPost