import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event'
import { SongCreate } from "./SongCreate";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { Songlist } from "./Songlist";

test('Link to "go to songs" navigates', () => {
  render(
    <MockedProvider>
      <MemoryRouter>
        <SongCreate />
      </MemoryRouter>
    </MockedProvider>
  )
  const link = screen.getByRole('link', {
    name: /songs/i
  })
  user.click(link);
  expect(window.location.pathname).toBe('/');
})

test('Registering a new song works', async () => {
  render(
    <MockedProvider>
      <MemoryRouter>
        <Songlist />
        <SongCreate />
      </MemoryRouter>
    </MockedProvider>
  )
  const titleInput = screen.getByRole('textbox')
  user.type(titleInput, 'New Song Title{enter}')
  expect(window.location.pathname).toBe('/');
})