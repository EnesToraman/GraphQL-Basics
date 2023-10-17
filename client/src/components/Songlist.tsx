import { useMutation, useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { GET_SONGS } from '../queries/GetSongs';
import { DELETE_SONG } from '../mutations/DeleteSong';

export const Songlist = () => {
  const navigate = useNavigate();
  const { data } = useQuery(GET_SONGS);
  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [{ query: GET_SONGS }]
  })

  const handleDeleteSong = (id: string) => {
    deleteSong({
      variables: { id },
    })
  }

  return (
    <div>
      <ul>
        {data?.songs?.map((song: { id: string, title: string }) => (
          <div>
            <li
              key={song.id}
              onClick={() => navigate(`/songs/${song.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {song.title}
            </li>
            <button onClick={() => handleDeleteSong(song.id)}>
              X
            </button>
          </div>
        ))}
      </ul>
      <Link to="/songs/new">
        Add New Song
      </Link>
    </div>
  )
}
