import axios from "axios";

export interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    fork: boolean;
}

export const getRepos = async (username: string) => {
    try {
        const { data } = await axios.get<Repo[]>(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
        );

        return data.filter(repo => !repo.fork && repo.name !== 'portfolio' && repo.description).slice(0, 6)
    } catch (error) {
        console.error("Github API Error:", error);
        return [];
    }
}

export interface User {
    name: string;
    avatar_url: string;
    bio: string;
    location: string;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
}

export const getUser = async (username: string) => {
    try {
        const { data } = await axios.get<User>(`https://api.github.com/users/${username}`);
        return data;
    } catch (error) {
        console.error("Github API Error:", error);
        return null;
    }
}