import { screen } from "@testing-library/react";
import user from '@testing-library/user-event'
import { SongCreate } from "./SongCreate";
import { Songlist } from "./Songlist";
import { renderWithProvider } from "../test-components/renderWithProvider";

test('Link to "go to songs" navigates', () => {
  renderWithProvider(<SongCreate />)
  const link = screen.getByRole('link', {
    name: /songs/i
  })
  user.click(link);
  expect(window.location.pathname).toBe('/');
})

test('Registering a new song works', async () => {
  renderWithProvider(
    <>
      <Songlist />
      <SongCreate />
    </>
  )
  const titleInput = screen.getByRole('textbox')
  user.type(titleInput, 'New Song Title{enter}')
  expect(window.location.pathname).toBe('/');
})