import { gql } from '@apollo/client'

export const GET_USERINFO = gql`
query ($name: String) {
  User (name: $name) {
    name
    id
    statistics {
      anime {
        minutesWatched
        meanScore
        count
        episodesWatched
      }
    }
    avatar {
      large
    }
  }
}
`

export const GET_ACTIVITY = gql`
query ($userId: Int) {
  Page (page: 1, perPage: 5) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    activities(userId: $userId, type: ANIME_LIST, sort: ID_DESC) {
      ...on ListActivity {
        id
        status
        progress
        media {
          title {
            romaji
          }
        }
      }
    }
  }
}
`