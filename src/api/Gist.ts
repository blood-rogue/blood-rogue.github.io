import { Owner as UserOrOwner } from "./Owner";

export interface Gist {
    url: string;
    forks_url: string;
    commits_url: string;
    id: string;
    node_id: string;
    git_pull_url: string;
    git_push_url: string;
    html_url: string;
    files: Files;
    public: boolean;
    created_at: string;
    updated_at: string;
    description: string | null;
    comments: number;
    user?: null;
    comments_url: string;
    owner: UserOrOwner;
    forks?: null[] | null;
    history?: (HistoryEntity)[] | null;
    truncated: boolean;
  }
  export interface Files {
    [key: string]: File;
  }
  export interface File {
    filename: string;
    type: string;
    language: string;
    raw_url: string;
    size: number;
    truncated: boolean;
    content: string;
  }
  export interface HistoryEntity {
    user: UserOrOwner;
    version: string;
    committed_at: string;
    change_status: ChangeStatus;
    url: string;
  }
  export interface ChangeStatus {
    total: number;
    additions: number;
    deletions: number;
  }