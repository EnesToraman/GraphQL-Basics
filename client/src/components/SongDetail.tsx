import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client"
import { GET_SONG } from "../queries/GetSong"
import { Link, useParams } from "react-router-dom";
import { ADD_LYRIC_TO_SONG } from "../mutations/AddLyricToSong";
import { LIKE_LYRIC } from "../mutations/LikeLyric";

export const SongDetail = () => {
  const [content, setContent] = useState('');
  const { songId } = useParams();
  const { data } = useQuery(GET_SONG, {
    variables: { id: songId },
    fetchPolicy: "cache-and-network"
  });
  const [addLyricToSong] = useMutation(ADD_LYRIC_TO_SONG, {
    refetchQueries: [{ query: GET_SONG, variables: { id: songId } }]
  });
  const [likeLyric] = useMutation(LIKE_LYRIC, {
    refetchQueries: [{ query: GET_SONG, variables: { id: songId } }]
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLyricToSong({
      variables: { songId, content },  
    });
  }

  const handleLike = (lyricId: string, likes: number) => {
    likeLyric({
      variables: { lyricId },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: lyricId,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }
  
  return (
    <div>
      <Link to="/">&larr; Go To Songs</Link>
      <h3>{data?.song?.title}</h3>
      <ul>
        {data?.song?.lyrics?.map((lyric: { id: string, content: string, likes: number }) => (
          <li key={lyric.id}>
            {lyric.content}
            <button onClick={() => handleLike(lyric.id, lyric.likes)}>Like</button>
            {lyric.likes} Likes!
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
