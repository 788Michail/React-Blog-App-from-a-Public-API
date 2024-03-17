import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const BASE_URL = "https://jsonplaceholder.typicode.com/";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const Home = () => {
    const [error, setError] = useState();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            
          try {
            const response = await fetch(`${BASE_URL}/posts`);
            const posts = (await response.json()) as Post[];

             setPosts(posts);
          } catch (error) {
            setError(error)
          } 
        };

        fetchPosts();
    }, []);

    if (error) {
      return <div> Something went wrong... </div>
    }

    return (
        <div>
            <h1> Data Fetching </h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/details/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
