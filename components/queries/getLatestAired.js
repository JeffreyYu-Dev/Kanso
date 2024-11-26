import { unstable_cache } from "next/cache";

const REVALIDATE_TIME = 1800;

// FIXME: have to update for nextjs 15(nextjs 15)
const getLatestAired = async (numShows) => {
  // Wrap the fetch logic in unstable_cache
  const getCachedAnimeData = unstable_cache(
    async () => {
      const monthInSeconds = 2629743;
      let startTime = Math.floor(Date.now() / 1000);
      let endTime = startTime - monthInSeconds;

      const latedAiredQuery = `
      query($page: Int, $perPage: Int, $airingAtGreater: Int, $airingAtLesser: Int){
        Page(page: $page, perPage: $perPage ) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          airingSchedules(
            sort: TIME_DESC, 
            airingAt_greater: $airingAtGreater, 
            airingAt_lesser: $airingAtLesser
          ) {
            media {
              id
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
                color
              }
              episodes
              nextAiringEpisode {
                episode
              }
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
            }
          }
        }
      }`;

      let listOfAnime = [];
      let page = 1;
      let hasNextPage = true;

      while (listOfAnime.length < numShows && hasNextPage) {
        const variables = {
          page: page,
          perPage: 24,
          airingAtGreater: endTime,
          airingAtLesser: startTime,
        };

        const options = {
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
          const response = await fetch("https://graphql.anilist.co", options);
          const tmp = await response.json();
          const data = tmp.data.Page.airingSchedules;
          const pageInfo = tmp.data.Page.pageInfo;

          for (let show of data) {
            const format = show.media.format;
            const title = show.media.title;
            const rating = show.media.averageScore;

            if (
              format !== "NOVEL" &&
              format !== "MANGA" &&
              format !== "ONE_SHOT" &&
              title != null &&
              rating != null
            ) {
              listOfAnime.push(show);
              if (listOfAnime.length === numShows) break;
            }
          }

          hasNextPage = pageInfo.hasNextPage;
          page++;
        } catch (e) {
          console.error("Error fetching data:", e);
          break;
        }
      }
      return listOfAnime;
    },
    // Cache key that includes the function parameters
    [`latest-aired-${numShows}-${24}`],
    {
      revalidate: REVALIDATE_TIME, // Revalidate every 30 minutes
      tags: [`latest-aired`], // Tag for manual revalidation if needed
    }
  );

  return getCachedAnimeData();
};

export default getLatestAired;
