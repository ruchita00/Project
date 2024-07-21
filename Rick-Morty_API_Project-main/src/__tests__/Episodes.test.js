/* eslint-disable no-undef */
import React from "react";
import { render, screen, act } from "@testing-library/react";
import Episodes from "../components/Episodes";
import { getEpisodeDetails } from "../services/CharacterServices";

jest.mock("../services/CharacterServices", () => ({
  getEpisodeDetails: jest.fn(),
}));

describe("Episodes component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("loads and displays episode details", async () => {
    getEpisodeDetails.mockResolvedValue([
      { name: "Episode 1", air_date: "December 2, 2013", episode: "S01E01" },
    ]);

    await act(async () => {
      render(<Episodes episode={["/api/episode/1"]} />);
    });

    expect(await screen.findByText(/episode name :/i)).toBeInTheDocument();
    expect(await screen.findByText(/Episode 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/December 2, 2013/i)).toBeInTheDocument();
    expect(await screen.findByText(/S01E01/i)).toBeInTheDocument();
  });

  test("handles error gracefully", async () => {
    getEpisodeDetails.mockRejectedValue(new Error("Failed to fetch"));

    await act(async () => {
      render(<Episodes episode={["/api/episode/1"]} />);
    });
  });
});
