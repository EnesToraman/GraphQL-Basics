import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client"
import { GET_SONG } from "../queries/GetSong"
import { Link, useParams } from "react-router-dom";
import { ADD_LYRIC_TO_SONG } from "../mutations/AddLyricToSong";

export const SongDetail = () => {
  const [content, setContent] = useState('');
  const { songId } = useParams();
  const { data, error } = useQuery(GET_SONG, {
    variables: { id: songId },
    fetchPolicy: "cache-and-network"
  });
  const [addLyricToSong] = useMutation(ADD_LYRIC_TO_SONG, {
    refetchQueries: [{ query: GET_SONG, variables: { id: songId } }]
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLyricToSong({
      variables: { songId, content },  
    });
  }
  console.log(error)
  
  return (
    <div>
      <Link to="/">&larr; Go To Songs</Link>
      <h3>{data?.song?.title}</h3>
      <ul>
        {data?.song?.lyrics?.map((lyric: { id: string, content: string }) => (
          <li key={lyric.id}>
            {lyric.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>Add Lyric</label>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
      </form>
    </div>
  )
}
