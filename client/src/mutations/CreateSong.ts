import { gql } from "@apollo/client"

export const CREATE_SONG = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      id
      title
    }
  }
`;