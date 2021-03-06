import { Owner } from "./Owner";

export interface GistList {
    url: string;
    forks_url: string;
    commits_url: string;
    id: string;
    node_id: string;
    git_pull_url: string;
    git_push_url: string;
    html_url: string;
    files: {
      [key: string]: {
        filename: string;
        type: string;
        language: string;
        raw_url: string;
        size: number
      }
    };
    public: boolean,
    created_at: string;
    updated_at: string;
    description: string;
    comments: number;
    user: null;
    comments_url: string;
    owner: Owner
  }