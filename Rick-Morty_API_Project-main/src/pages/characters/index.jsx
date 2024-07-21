import React,{ useEffect, useState } from "react";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import { getAllCharacterService } from "../../services/CharacterServices";
import Filters from "../../components/Filters";

const CharactersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState({});

  const [selectedValue, setSelectedValue] = useState({
    gender: "",
    species: "",
    status: "",
    searchKey: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedValue({ ...selectedValue, [name]: value });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getAllCharacterService(currentPage, selectedValue)
      .then((res) => {
        setAllData(res);
      })
      .catch((e) => {
        setAllData({});
        console.log(e);
      });
  }, [currentPage, selectedValue]);

  return (
    <Layout>
      <div style={{ margin: "2rem 1.5rem" }}>
        <Filters selectedValue={selectedValue} onChange={handleChange} />
      </div>
      <div className="card_container">
        {allData?.results?.map((item, idx) => (
          <Card item={item} key={idx} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={allData?.info?.pages}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
};

export default CharactersPage;
