import { User } from "./User"
import { RepoList } from "./RepoList"
import { GistList } from "./GistList"
import { Gist } from "./Gist"

const userUrl = "https://api.github.com/users/blood-rogue"
const repoListUrl = "https://api.github.com/users/blood-rogue/repos"
const gistListUrl = "https://api.github.com/users/blood-rogue/gists"

const urls = {
  github : "https://github.com/blood-rogue",
  mail: "mailto:adnaptimsib333@gmail.com"
}

export type { User, RepoList, GistList, Gist }
export { userUrl, urls, repoListUrl, gistListUrl }