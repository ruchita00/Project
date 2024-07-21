import React from "react";
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS,
} from "../utils/constants";
import { debounce } from "../utils/helper";
import PropTypes from "prop-types";

const Filters = ({ selectedValue, onChange }) => {
  const handleInputChange = (e) => {
    onChange(e);
  };

  const debouncedInputChange = debounce(handleInputChange, 500);

  return (
    <div>
      <h2>Filters</h2>
      <section
        style={{
          marginTop: "0.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div className="select-container">
          <select
            value={selectedValue.status}
            onChange={onChange}
            className="styled-select"
            name="status"
          >
            {STATUS_OPTIONS?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="select-container">
          <select
            value={selectedValue.gender}
            onChange={onChange}
            className="styled-select"
            name="gender"
          >
            {GENDER_OPTIONS?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="select-container">
          <select
            value={selectedValue.species}
            onChange={onChange}
            className="styled-select"
            name="species"
          >
            {SPECIES_OPTIONS?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div
          className="select-container"
          style={{ display: "flex", gap: "0.5rem" }}
        >
          <input
            onChange={debouncedInputChange}
            type="text"
            name="searchKey"
            placeholder="Ex: Rick Sanchez"
            className="styled-select"
            style={{ width: "240px", backgroundImage: 'url("")' }}
          />
        </div>
      </section>
    </div>
  );
};

Filters.propTypes = {
  selectedValue: PropTypes.shape({
    searchKey: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};



export default Filters;
