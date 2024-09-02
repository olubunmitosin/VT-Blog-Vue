import axios from 'axios';

const BASE_URL = process.env.VUE_APP_API_URL;
const API_VERSION = 'api/';

const axiosInstance = axios.create({
    baseURL: BASE_URL + "/" + API_VERSION
});

export async function getPosts() {
    return await axiosInstance.get('/posts/all');
}

export async function getSinglePost(id) {
    return await axiosInstance.get('/posts/single/' + id);
}

export async function createPost(post) {
    return await axiosInstance.post('/posts/create', post);
}

export async function updatePost(post) {
    return await axiosInstance.post('/posts/update', post);
}

export async function deletePost(postId) {
    return await axiosInstance.post('/posts/delete', { 'id': postId });
}
