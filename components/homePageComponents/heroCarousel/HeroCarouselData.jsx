// get carousel data based on season and releasing maybe
// https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fgraphql.anilist.co&explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CewAOkgARkAKAhgOYIAUADnQumQIwA0ZT%2BN9dhwCsASjIlyFMojABLagxQE%2B7AIIA5AJIBZAKI8AzhDwp2AbQAqAJT0aAIlo0BxAPr29AZQDCAXSMo1Cgwhuy2ADJ6ap5OzkYI1MZI7ABiauHh4pLS0nJgpDkUKHIoADYIEgWFFHgQcNQAVnJV1ci0pXKGABYthUhBcgBuCL0UAL6jvBBMMKXUeCUEkwBG1EhI%2BFr19JNQEMN4W6yVUtV7pSaTFLJy8Fdkc3g7p9ITLxTUB6yee3gj72QwDA8AMIEhJggmJ0IGAEIZJkCQcUwZNOmogaUUJMAGYmepYgGwwxQBZMZHggGGBJJACaCTwkw2AA8UGo5AskLQ9FDjLCTtUKJDobDJm8cmKyG83qQZRSQFwQIN5gpluVDBgQNkyMQQDdqFp8hgyEhZqUuFUdco%2BDr2CbSmaLSAWDsjXaHVIdXw8AIRq7TeaPSAUH8kPJOTbjf7HcZTBG3QGKDqqYkUX77QntSBcXh8XGo4G0RisWn3YndQh5NRPCYUAAmPPp6OBYLwksZpPUsF0%2BYN0uZ5N4KA9NuOoW8uG99vgYGg8El0hjeVOiCGFDYjq0LooADyXtnP1JaEwIDGQA
async function getHeroCarouselData() {
  var query = `
query{
  Page(page: 1, perPage: 15) {
    media(type: ANIME, sort: [TRENDING_DESC], status: RELEASING, season: FALL) {
      id
      title {
        romaji
        english
        native
      }
      popularity
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
      duration
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

  var variables = {
    season: "FALL",
  };
  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
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

  // TODO: errors are not properly handled here very basic error checking is done
  try {
    const data = await fetch(url, options).then((res) => res.json());

    // return the fetched data if empty return an empty array
    return data?.data?.Page?.media || [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default getHeroCarouselData;
