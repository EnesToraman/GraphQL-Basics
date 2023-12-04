import { render, screen } from "@testing-library/react";
import { GET_SONG } from "../queries/GetSong";
import { MockedProvider } from "@apollo/client/testing";
import { SongDetail } from "./SongDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import '@testing-library/jest-dom'

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
];


it("Renders the song", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <MemoryRouter initialEntries={["/songs/1"]}>
      <Routes>
        <Route path='/songs/:songId' element={<SongDetail />} />
      </Routes>
      </MemoryRouter>
    </MockedProvider>
  );
  expect(await screen.findByText("Cold Night")).toBeInTheDocument();
  expect(await screen.findByText("It is a cold night")).toBeInTheDocument();
  expect(await screen.findByText("3 Likes!")).toBeInTheDocument();
});
