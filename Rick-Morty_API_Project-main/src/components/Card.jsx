import React from "react";
import { Link } from "react-router-dom";
import { getStatusColor } from "../utils/helper";
import PropTypes from "prop-types";

const Card = ({ item }) => {
  return (
    <Link to={`/profile/${item?.id}`}>
      <div className="card_wrapper">
        <div className="img_wrapper">
          <img src={item?.image} alt="char-img" />
        </div>
        <div className="card_content">
          <h3>{item?.name}</h3>
          <div className="status_wrapper">
            <span
              data-testid="status-color"
              className="status_color"
              style={{ backgroundColor: getStatusColor(item?.status) }}
            ></span>
            <span>
              {item?.status}-{item?.species}
            </span>
          </div>
          <h4>Last known location :</h4>
          <p>{item?.location?.name}</p>
          <h4>First Seen In:</h4>
          <p>{item?.episodeDetails?.name}</p>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    episodeDetails: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};



export default Card;
