import React, { useEffect, useState } from "react";
import { getEpisodeDetails } from "../services/CharacterServices";
import PropTypes from "prop-types";

const Episodes = ({ episode }) => {
  const [allEpisodes, setAllEpisodes] = useState([]);

  useEffect(() => {
    const getEpisodeDetail = async () => {
      try {
        const res = await getEpisodeDetails(episode);
        setAllEpisodes(res);
      } catch (error) {
        console.log(error);
      }
    };
    getEpisodeDetail();
  }, [episode]);

  return (
    <div>
      <h1>Episode Details</h1>
      <div className="episode_container">
        {allEpisodes?.map((item, idx) => (
          <div className="card_wrapper episode_wrapper" key={idx}>
            <div className="card_content">
              <div>
                <span className="label">Episode Name : </span>
                <span className="value">{item?.name}</span>
              </div>
              <div>
                <span className="label">Air Date :</span>
                <span className="value">{item?.air_date}</span>
              </div>
              <div>
                <span className="label">Episode : </span>
                <span className="value">{item?.episode}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Episodes.propTypes = {
  episode: PropTypes.arrayOf(PropTypes.string).isRequired,
};



export default Episodes;
