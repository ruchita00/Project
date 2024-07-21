/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Filters from "../components/Filters"; // Adjust the import path as necessary

// Mock the debounce function
jest.mock("../utils/helper", () => ({
  ...jest.requireActual("../utils/helper"),
  debounce: jest.fn((fn) => fn),
}));

const mockOnChange = jest.fn();

const mockSelectedValue = {
  status: "alive",
  gender: "female",
  species: "human",
};

describe("Filters component", () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renders the component correctly", () => {
    render(
      <Filters selectedValue={mockSelectedValue} onChange={mockOnChange} />
    );
    expect(screen.getByText(/filters/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/alive/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/female/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/human/i)).toBeInTheDocument();
  });

  test("handles status filter change", () => {
    render(
      <Filters selectedValue={mockSelectedValue} onChange={mockOnChange} />
    );
    const select = screen.getByDisplayValue(/alive/i);
    fireEvent.change(select, {
      target: { value: "dead", name: "status" },
    });
    expect(mockOnChange).toHaveBeenCalled();
  });
  test("handles species filter change", () => {
    render(
      <Filters selectedValue={mockSelectedValue} onChange={mockOnChange} />
    );
    const select = screen.getByDisplayValue(/human/i);
    fireEvent.change(select, {
      target: { value: "alien", name: "species" },
    });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test("handles gender filter change", () => {
    render(
      <Filters selectedValue={mockSelectedValue} onChange={mockOnChange} />
    );
    const select = screen.getByDisplayValue(/female/i);
    fireEvent.change(select, {
      target: { value: "male", name: "gender" },
    });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test("handles debounced input change", async () => {
    render(
      <Filters selectedValue={mockSelectedValue} onChange={mockOnChange} />
    );
    fireEvent.change(screen.getByPlaceholderText(/Ex: Rick Sanchez/i), {
      target: { value: "Morty", name: "searchKey" },
    });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: "Morty",
            name: "searchKey",
          }),
        })
      );
    });
  });
});
