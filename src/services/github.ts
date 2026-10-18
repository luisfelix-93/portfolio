import axios from "axios";

export interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    forks_count?: number;
    fork: boolean;
}

export interface RepoMetrics {
    stars: number;
    forks: number;
    language?: string;
    updatedAt?: string;
}

export const getRepos = async (username: string) => {
    try {
        const { data } = await axios.get<Repo[]>(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );

        return data;
    } catch (error) {
        console.error("Github API Error:", error);
        return [];
    }
}

export const getFeaturedProjectsMetrics = async (
    username: string = "luisfelix-93"
): Promise<Record<string, RepoMetrics>> => {
    try {
        const repos = await getRepos(username);
        const map: Record<string, RepoMetrics> = {};

        for (const repo of repos) {
            map[repo.name.toLowerCase()] = {
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0,
                language: repo.language,
            };
        }

        return map;
    } catch (error) {
        console.error("Failed to fetch featured projects metrics:", error);
        return {};
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