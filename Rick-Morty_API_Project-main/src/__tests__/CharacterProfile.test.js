/* eslint-disable no-undef */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterProfile from "../pages/character_profile";
import { getSingleCharacterService } from "../services/CharacterServices";
import Episodes from "../components/Episodes";

jest.mock("../services/CharacterServices");

// eslint-disable-next-line react/display-name
jest.mock("../components/Layout", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("../components/Episodes");

describe("CharacterProfile component", () => {
  const mockCharacter = {
    id: 1,
    name: "Rick Sanchez",
    gender: "Male",
    species: "Human",
    status: "Alive",
    type: "",
    image: "http://example.com/rick.png",
    locationDetails: {
      name: "Earth (C-137)",
      dimension: "Dimension C-137",
      type: "Planet",
    },
    episode: ["http://example.com/episode/1", "http://example.com/episode/2"],
  };

  beforeEach(() => {
    getSingleCharacterService.mockResolvedValue(mockCharacter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/profile details/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(getSingleCharacterService).toHaveBeenCalledWith("1")
    );
  });

  test("displays character details after fetching", async () => {
    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterProfile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
      expect(screen.getByText(/male/i)).toBeInTheDocument();
      expect(screen.getByText(/human/i)).toBeInTheDocument();
      expect(screen.getByText(/alive/i)).toBeInTheDocument();
      expect(screen.getByText(/earth \(c-137\)/i)).toBeInTheDocument();
      expect(screen.getByText(/dimension c-137/i)).toBeInTheDocument();
      expect(screen.getByText(/planet/i)).toBeInTheDocument();
    });
  });

  test("handles error gracefully", async () => {
    getSingleCharacterService.mockRejectedValueOnce(
      new Error("Error fetching data")
    );

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterProfile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(getSingleCharacterService).toHaveBeenCalledWith("1")
    );
    expect(screen.queryByText(/rick sanchez/i)).not.toBeInTheDocument();
  });

  test("renders the Episodes component with correct props", async () => {
    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterProfile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(Episodes).toHaveBeenCalledWith(
        { episode: mockCharacter.episode },
        {}
      );
    });
  });
});
