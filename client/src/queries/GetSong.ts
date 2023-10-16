import { gql } from "@apollo/client";

export const GET_SONG = gql`
  query GetSong ($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;