export const getAllCharacterService = async (pageNumber, selectedValue) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${pageNumber}&gender=${selectedValue.gender}&species=${selectedValue.species}&status=${selectedValue.status}&name=${selectedValue.searchKey}`
    );
    const data = await response.json();
    const result = data?.results?.map(async (item) => {
      const episodeDetails = await fetch(item?.episode[0]);
      const res = await episodeDetails.json();
      return { ...item, episodeDetails: res };
    });
    data.results = await Promise.all(result);
    return data;
  } catch (error) {
    return error;
  }
};

export const getSingleCharacterService = async (id) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    let data = await response.json();
    let locationDetails = await fetch(data?.location?.url);
    locationDetails = await locationDetails.json();
    data.locationDetails = locationDetails;
    return data;
  } catch (error) {
    return error;
  }
};


export const getEpisodeDetails = async (episodeList=[]) => {
  try {
    const responses = await Promise.all(
      episodeList?.map((url) => fetch(url).then((res) => res.json()))
    );
    return responses;
  } catch (error) {
    return error;
  }
};
