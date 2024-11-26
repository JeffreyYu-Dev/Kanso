function getSeason(month) {
  if (month <= 3) return "WINTER";
  if (3 < month && month <= 6) return "SPRING";
  if (6 < month && month <= 9) return "SUMMER";

  return "FALL";
}

// https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fgraphql.anilist.co&explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CewAOkgARkAKAhgOYIAUADnQumQIwA0ZT%2BN9dhwCsASjIlyFMojABLagxQE%2B7AIIA5AJIBZAKI8AzhDwp2AbQAqAJT0aAIlo0BxAPr29AZQDCAXSMo1Cgwhuy2ADJ6ap5OzkYI1MZI7ABiauHh4pLS0nJgpDkUKHIoADYIEgWFFHgQcNQAVnJV1ci0pXKGABYthUhBcgBuCL0UAL6jvBBMMKXUeCUEkwBG1EhI%2BFr19JNQEMN4W6yVUtV7pSaTFLJy8Fdkc3g7p9ITLxTUB6yee3gj72QwDA8AMIEhJggmJ0IGAEIZJkCQcUwZNOmogaUUJMAGYmepYgGwwxQBZMZHggGGBJJACaCTwkw2AA8UGo5AskLQ9FDjLCTtUKJDobDJm8cmKyG83qQZRSQFwQIN5gpluVDBgQNkyMQQDdqFp8hgyEhZqUuFUdco%2BDr2CbSmaLSAWDsjXaHVIdXw8AIRq7TeaPSAUH8kPJOTbjf7HcZTBG3QGKDqqYkUX77QntSBcXh8XGo4G0RisWn3YndQh5NRPCYUAAmPPp6OBYLwksZpPUsF0%2BYN0uZ5N4KA9NuOoW8uG99vgYGg8El0hjeVOiCGFDYjq0LooADyXtnP1JaEwIDGQA
async function getHeroCarouselData() {
  const query = `
  query ($page: Int, $perPage: Int, $season: MediaSeason, $status: MediaStatus,$seasonYear: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, sort: [TRENDING_DESC], season: $season, status: $status,seasonYear: $seasonYear) {
        id
        title {
          romaji
          english
          native
        }
        bannerImage
        coverImage {
          color
          medium
          large
          extraLarge
        }
        averageScore
        duration
        episodes
        isAdult
        format
        description
        seasonYear
        nextAiringEpisode {
          episode
        }
      }
    }
  }
  `;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const season = getSeason(month);

  const variables = {
    page: 1,
    perPage: 20,
    season: season, // Season needs to match the valid MediaSeason enum value
    seasonYear: year,
    status: "RELEASING", // Status needs to match the valid MediaStatus enum value
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

  // FIXME: need proper error handling
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

export default getHeroCarouselData;
