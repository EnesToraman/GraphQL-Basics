import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event'
import { SongCreate } from "./SongCreate";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

test('Link to "go to songs" works', () => {
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