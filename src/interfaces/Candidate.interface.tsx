export interface Candidate {
  id: number
  login: string
  avatar_url: string
  html_url: string
  name: string
  location: string
  bio: string
  public_repos: number
  followers: number
  following: number
  saved?: boolean
}