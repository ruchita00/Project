import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleCharacterService } from "../../services/CharacterServices";
import Layout from "../../components/Layout";
import Episodes from "../../components/Episodes";

const CharacterProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getCharacterDetails = async () => {
      try {
        const res = await getSingleCharacterService(id);
        setProfile(res);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getCharacterDetails();
  }, [id]);

  return (
    <Layout>
      <div className="profile_wrapper">
        <div className="image_wrapper">
          <img src={profile?.image} alt="char-img" />
        </div>
        <section>
          <h2 style={{ marginBottom: "1rem" }}>Profile Details</h2>
          <div>
            <span className="label">Name : </span>
            <span className="value">{profile?.name}</span>
          </div>
          <div>
            <span className="label">Gender : </span>
            <span className="value">{profile?.gender}</span>
          </div>
          <div>
            <span className="label">Species : </span>
            <span className="value">{profile?.species}</span>
          </div>
          <div>
            <span className="label">Status : </span>
            <span className="value">{profile?.status}</span>
          </div>
          <div>
            <span className="label">Type : </span>
            <span className="value">{profile?.type || "-"}</span>
          </div>

          <div>
            <h4 style={{ marginTop: "1.5rem" }}>Location Details: </h4>
            <div style={{ marginTop: "0.5rem" }}>
              <span className="label">Location Name : </span>
              <span className="value">{profile?.locationDetails?.name}</span>
            </div>
            <div>
              <span className="label">Dimension : </span>
              <span className="value">
                {profile?.locationDetails?.dimension}
              </span>
            </div>
            <div>
              <span className="label">Type : </span>
              <span className="value">{profile?.locationDetails?.type}</span>
            </div>
          </div>
        </section>
      </div>
      <section className="episode_main_container">
        <Episodes episode={profile.episode} />
      </section>
    </Layout>
  );
};

export default CharacterProfile;
