import React, { useState } from 'react'
import './CreateNewpost.css'
import axios from 'axios'
function CreateNewPost() {
const [image,setImage] = useState(null)
const [title,setTitle] = useState('')
const [subtitle,setSubTitle] = useState('')
const [content,setContent] = useState('')
const [error,setError] = useState(false)
const [loading,setLoading] = useState(false)

const token = localStorage.getItem('token')

const handleCreateNewPost = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError(false)
// create new form data

    const formData = new FormData()
    formData.append('image',image);
    formData.append('title',title);
    formData.append('subtitle',subtitle);
    formData.append('content',content);


try{

const res = await axios.post('http://localhost:8000/api/post/createblogpost',formData,{headers:{'Content-Type':'multipart/form-data',
    Authorization:`Bearer ${token}`
}});


console.log('Blog created successfully:',res.data)
alert('Blog created successfully')




  // reset form
  setImage(null)
  setTitle('')
  setSubTitle('')
  setContent('')
  e.target.reset()
}catch(err){
    console.error(err);
    setError(err.response?.data?.message ||"something whent wrong while creating the blog");
}finally{setLoading(false);};


}



  return (
    <div className='form-con'>

<form onSubmit={handleCreateNewPost}>
    <input type="file" name='image'accept='image/*' onChange={(e) =>setImage(e.target.files[0])}/>
    <input type="text"required placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
    <input type="text" required placeholder='Subtitle' value={subtitle} onChange={(e) => setSubTitle(e.target.value)}/>
     <textarea type="text" required placeholder='write your content' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
    <button className='submit-btn' type='submit' disabled={loading}>submit</button>
{error && (
    <p style={{color:'red', marginTop:'10px',textAlign:'center'}}>{error}</p>
 )}
 

</form>

    </div>
  )
}

export default CreateNewPost