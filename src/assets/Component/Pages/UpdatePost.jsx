import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdatePost.css"

const UpdatePost = () => {
  const { id } = useParams(); // <-- HERE! grabs the post _id from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  // Fetch the post data using the id
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://final-project-sage-nu.vercel.app/api/post/getsinglepost/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const post = res.data.data;
        setTitle(post.title);
        setSubtitle(post.subtitle);
        setContent(post.content);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [id]);

  // Handle submit (update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.put(`https://final-project-sage-nu.vercel.app/api/post/updateblogpost/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Post updated!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to update post");
    }
  };

  return (
    <form className='form-con' onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default UpdatePost;