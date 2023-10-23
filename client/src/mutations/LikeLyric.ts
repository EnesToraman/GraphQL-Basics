import { gql } from "@apollo/client"

export const LIKE_LYRIC = gql`
  mutation LikeLyric($lyricId: ID) {
    likeLyric(id: $lyricId) {
      id
      likes
      content
      song {
        title
      }
    }
  }
`