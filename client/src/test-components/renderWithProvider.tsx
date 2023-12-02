import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";

export const renderWithProvider = (Component: JSX.Element) => {
  return render(
    <MockedProvider>
      <MemoryRouter>
        {Component}
      </MemoryRouter>
    </MockedProvider>
  )
}