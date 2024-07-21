/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CharactersPage from "../pages/characters";
import { getAllCharacterService } from "../services/CharacterServices";

jest.mock("../services/CharacterServices");
jest.mock("../components/Layout", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("../components/Card", () => ({ item }) => <div>{item.name}</div>);
jest.mock("../components/Filters", () => ({ selectedValue, onChange }) => (
  <div>
    <input
      name="searchKey"
      value={selectedValue.searchKey}
      onChange={onChange}
      placeholder="Search"
    />
  </div>
));
jest.mock(
  "../components/Pagination",
  () =>
    ({ currentPage, totalPages, onPageChange }) =>
      (
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )
);

describe("CharactersPage component", () => {
  const mockData = {
    info: {
      pages: 2,
    },
    results: [
      { id: 1, name: "Rick Sanchez" },
      { id: 2, name: "Morty Smith" },
    ],
  };

  beforeEach(() => {
    getAllCharacterService.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component correctly", async () => {
    render(<CharactersPage />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(getAllCharacterService).toHaveBeenCalledWith(1, {
        gender: "",
        species: "",
        status: "",
        searchKey: "",
      })
    );
  });

  test("displays character cards after fetching data", async () => {
    render(<CharactersPage />);
    await waitFor(() => {
      expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
      expect(screen.getByText(/morty smith/i)).toBeInTheDocument();
    });
  });

  test("updates state and fetches data when filters change", async () => {
    render(<CharactersPage />);
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { name: "searchKey", value: "rick" },
    });
    await waitFor(() => {
      expect(getAllCharacterService).toHaveBeenCalledWith(1, {
        gender: "",
        species: "",
        status: "",
        searchKey: "rick",
      });
    });
  });

  test("handles pagination correctly", async () => {
    render(<CharactersPage />);
    await waitFor(() => {
      expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/next/i));
    await waitFor(() => {
      expect(getAllCharacterService).toHaveBeenCalledWith(2, {
        gender: "",
        species: "",
        status: "",
        searchKey: "",
      });
    });
  });

  test("handles error gracefully", async () => {
    getAllCharacterService.mockRejectedValueOnce(
      new Error("Error fetching data")
    );
    render(<CharactersPage />);
    await waitFor(() =>
      expect(getAllCharacterService).toHaveBeenCalledWith(1, {
        gender: "",
        species: "",
        status: "",
        searchKey: "",
      })
    );
    expect(screen.queryByText(/rick sanchez/i)).not.toBeInTheDocument();
  });
});
