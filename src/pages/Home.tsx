import React, { useState, useRef, lazy, useLayoutEffect } from 'react';
import axios from 'axios';
import { User, RepoList, GistList, repoListUrl, gistListUrl } from '../api'
import "./Home.css"
import retry from '../utils/retry';

const Details = lazy(() => retry(() => import("../components/Details")))
const TitleHelmet = lazy(() => retry(() => import("../components/TitleHelmet")))
const Repos = lazy(() => retry(() => import("../components/Repos")))
const Gists = lazy(() => retry(() => import("../components/Gists")))

const Home: React.FC<{ user: User }> = ({ user }) => {
  const [repos, setRepos] = React.useState<RepoList[]>([])
  const [gists, setGists] = React.useState<GistList[]>([])
  const repoRef = React.useRef<HTMLDivElement>(null)
  
  useLayoutEffect(() => {
    axios.get<RepoList[]>(repoListUrl)
      .then(res => setRepos(res.data))
    axios.get<GistList[]>(gistListUrl)
      .then(res => setGists(res.data))
  }, [])

  return (
  <>
  <TitleHelmet title='Home' />  
  <div id="home" className="home">
    {user && <Details user={user} />}
    <div className="home__mouse-container">
      <div onClick={() => repoRef.current?.scrollIntoView({ behavior: "smooth" })} className='mouse home__mouse' />
    </div>
    <Repos ref={repoRef} repos={repos} />
    <Gists gists={gists} />
  </div>
  </>)
}

export default Home