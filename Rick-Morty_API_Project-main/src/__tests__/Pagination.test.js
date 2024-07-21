/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination component", () => {
  const mockOnPageChange = jest.fn();

  const renderPagination = (currentPage, totalPages) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={mockOnPageChange}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the correct buttons based on currentPage and totalPages", () => {
    renderPagination(1, 20);
    expect(screen.getByText(/« prev/i)).toBeDisabled();
    expect(screen.getByText(/next »/i)).toBeEnabled();

    for (let i = 1; i <= 10; i = i + 10) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  test("calls onPageChange with the correct page number when a page button is clicked", () => {
    renderPagination(1, 22);
    fireEvent.click(screen.getByText("10"));
    expect(mockOnPageChange).toHaveBeenCalledWith(10);
  });

  test("calls onPageChange with the correct page number when the previous button is clicked", () => {
    renderPagination(2, 10);
    fireEvent.click(screen.getByText(/« prev/i));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test("calls onPageChange with the correct page number when the next button is clicked", () => {
    renderPagination(1, 10);
    fireEvent.click(screen.getByText(/next »/i));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("disables the previous button on the first page", () => {
    renderPagination(1, 10);
    expect(screen.getByText(/« prev/i)).toBeDisabled();
  });

  test("disables the next button on the last page", () => {
    renderPagination(10, 10);
    expect(screen.getByText(/next »/i)).toBeDisabled();
  });
});
