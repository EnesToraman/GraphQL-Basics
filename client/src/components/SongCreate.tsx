import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { GET_SONGS } from "../queries/GetSongs";
import { CREATE_SONG } from "../mutations/CreateSong";

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
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </form>
    </div>
  )
}
