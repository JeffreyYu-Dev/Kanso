import React from "react";

// FIXME: handle errors properly
async function getLatestAired() {
  const monthInSeconds = 2629743;

  // start time will be the current time
  let startTime = Math.floor(Date.now() / 1000);

  // end time will be current time - 1 month
  let endTime = startTime - monthInSeconds;

  // console.log("TIME: ", startTime, endTime);

  const latedAiredQuery = `
query{
  Page(page: 1, perPage: 25) {
    airingSchedules( airingAt_lesser: 1732178977, airingAt_greater: 1729586977, sort: TIME_DESC, ) {
      media {
        title {
          english
          romaji
          native
        }
        format
        seasonYear
        averageScore
        coverImage {
          large
        }
        episodes
        nextAiringEpisode {
          episode
        }
        status
      }
    }
  }
}
`;

  const variables = {
    page: 1,
    perPage: 25,
  };

  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: latedAiredQuery,
        variables: variables,
      }),
    };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // Return the fetched data or an empty array if no data
    return data.data.Page.airingSchedules || [];
  } catch (e) {
    console.error("Error fetching data:", e);
    return [];
  }
}

export default getLatestAired;
