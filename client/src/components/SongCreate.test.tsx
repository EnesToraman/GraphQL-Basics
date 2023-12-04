import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event'
import { SongCreate } from "./SongCreate";
import { Songlist } from "./Songlist";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import '@testing-library/jest-dom'
import { GET_SONG } from "../queries/GetSong";
import { CREATE_SONG } from "../mutations/CreateSong";

const mocks = [
  {
    request: {
      query: GET_SONG,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        song: { id: "1", title: "Cold Night", lyrics: [{id: "11", content: "It is a cold night", likes: 3}] },
      },
    },
  },
  {
    request: {
      query: CREATE_SONG,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        song: { id: "1", title: "Cold Night", lyrics: [{id: "11", content: "It is a cold night", likes: 3}] },
      },
    },
  },
];


test('"go to songs" link navigates', async () => {
  render(
    <MockedProvider>
      <MemoryRouter initialEntries={['/songs/new']}>
        <Routes>
          <Route path='/' element={<Songlist />} />
          <Route path='/songs/new' element={<SongCreate />} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>
  )
  const link = screen.getByRole('link', {
    name: /songs/i
  })
  user.click(link);
  const heading = await screen.findByText('Songs');
  expect(heading).toBeInTheDocument();
})

test('Registers a new song', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <MemoryRouter>
        <SongCreate />
      </MemoryRouter>
    </MockedProvider>
  )
  const titleInput = screen.getByRole('textbox')
  user.type(titleInput, 'New Song Title{enter}')
})