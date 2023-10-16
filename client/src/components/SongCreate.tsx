import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { GET_SONGS } from "../queries/GetSongs";

const CREATE_SONG = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      id
      title
    }
  }
`;

export const SongCreate = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const [addSong] = useMutation(CREATE_SONG, {
    onCompleted() {
      navigate('/')
    },
    refetchQueries: [{ query: GET_SONGS }]
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSong({
      variables: { title },  
    });
  }

  return (
    <div>
      <Link to="/">&larr; Go To Songs</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={handleSubmit}>
        <label>Song Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </form>
    </div>
  )
}
