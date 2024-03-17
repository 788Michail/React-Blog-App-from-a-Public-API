import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BASE_URL = "https://jsonplaceholder.typicode.com/";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const Details = () => {
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${BASE_URL}/posts/${id}`);
                const postData = await response.json() as Post;
                setPost(postData);
            } catch (error) {
                setError(error);
            } 
        };

        fetchPost();
    }, [id]);

    if (error) {
        return <div> Something went wrong... </div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>#{post.userId}</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    );
};
