function getSeason(month) {
  if (month <= 3) return "WINTER";
  if (3 < month && month <= 6) return "SPRING";
  if (6 < month && month <= 9) return "SUMMER";

  return "FALL";
}

async function getTopAiring({ page }) {
  const query = `
query($page: Int, $perPage: Int, $seasonYear: Int, $season: MediaSeason){
  Page(page: $page, perPage: $perPage){
    media(type:ANIME, status: RELEASING, seasonYear: $seasonYear, sort: POPULARITY_DESC, season: $season) {
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

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const season = getSeason(month);

  const variables = {
    page: page,
    perPage: 20,
    seasonYear: year,
    season: season,
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

export default getTopAiring;
