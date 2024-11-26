async function getUpComing({ page }) {
  const query = `
query($perPage: Int, $page: Int, $type: MediaType, $status: MediaStatus, $sort: [MediaSort]){
  Page(perPage: $perPage, page: $page) {
    media(type: $type, sort: $sort,status: $status) {
       id
      title{
        english
        native
        romaji
      }
      coverImage {
        color
        large
      }
      averageScore
      episodes
      format
      status
         characters(page: 1, perPage: 1) {

           edges {
            id
            voiceActors {
              languageV2
            }
            node {
              __typename
            }
            role
          }
        }
    nextAiringEpisode {
      episode
    }
    }
  }
}`;

  const variables = {
    page: page,
    perPage: 20,
    type: "ANIME",
    sort: "POPULARITY_DESC",
    status: "NOT_YET_RELEASED",
  };

  const url = "https://graphql.anilist.co";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // Return the fetched data or an empty array if no data

    return data?.data.Page.media || [];
  } catch (e) {
    console.error("Error fetching data:", e);
    return [];
  }
}

export default getUpComing;
