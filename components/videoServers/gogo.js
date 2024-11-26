"use client";
import { ANIME, META } from "@consumet/extensions";

const gogoProvider = new ANIME.Gogoanime();

const getAnimeTitle = async (id) => {
  try {
    const meta = new META.Anilist();
    return (await meta.fetchAnimeInfo(id)).title;
  } catch (error) {
    console.error(error);
    return {
      romaji: "",
      native: "",
      english: "",
    };
  }
};

function jaroWinkler(s1, s2) {
  const m = s1.length;
  const n = s2.length;

  if (m === 0 && n === 0) return 1.0;
  if (m === 0 || n === 0) return 0.0;

  const matchDistance = Math.floor(Math.max(m, n) / 2) - 1;
  const s1Matches = new Array(m).fill(false);
  const s2Matches = new Array(n).fill(false);

  let matches = 0;
  let transpositions = 0;
  for (let i = 0; i < m; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(n - 1, i + matchDistance);

    for (let j = start; j <= end; j++) {
      if (s2Matches[j]) continue;
      if (s1[i] !== s2[j]) continue;
      s1Matches[i] = true;
      s2Matches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0.0;

  let k = 0;
  for (let i = 0; i < m; i++) {
    if (!s1Matches[i]) continue;
    while (!s2Matches[k]) k++;
    if (s1[i] !== s2[k]) transpositions++;
    k++;
  }

  transpositions /= 2;

  const jaro =
    (matches / m + matches / n + (matches - transpositions) / matches) / 3;

  const prefix = Math.min(
    4,
    [...s1].findIndex((ch, i) => s1[i] !== s2[i])
  );
  const p = 0.1;

  return jaro + prefix * p * (1 - jaro);
}

function sanitize(title) {
  let lowercased = title.toLowerCase();

  lowercased = lowercased.replace(/[^\p{L}\p{N}\s]/gu, "");

  const wordsToRemove = ["season", "cour", "part"];

  const words = lowercased.split(/\s+/);

  const sanitizedWords = words.filter((word) => !wordsToRemove.includes(word));

  return sanitizedWords.join(" ");
}

export function findBestMatch(mainString, targets) {
  if (targets.length === 0) return null;

  let bestMatch = targets[0];
  let highestScore = jaroWinkler(mainString, bestMatch);

  for (let i = 1; i < targets.length; i++) {
    const currentScore = jaroWinkler(mainString, targets[i]);
    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestMatch = targets[i];
    }
  }

  return bestMatch;
}

const findOriginalTitle = (title, titles) => {
  const { romaji, english, native } = title;

  const romajiBestMatch = findBestMatch(romaji, titles);
  const englishBestMatch = findBestMatch(english, titles);
  const nativeBestMatch = findBestMatch(native, titles);

  const romajiScore = romajiBestMatch
    ? jaroWinkler(romaji, romajiBestMatch)
    : 0;
  const englishScore = englishBestMatch
    ? jaroWinkler(english, englishBestMatch)
    : 0;
  const nativeScore = nativeBestMatch
    ? jaroWinkler(native, nativeBestMatch)
    : 0;

  if (romajiScore >= englishScore && romajiScore >= nativeScore) {
    return romajiBestMatch;
  } else if (englishScore >= romajiScore && englishScore >= nativeScore) {
    return englishBestMatch;
  } else {
    return nativeBestMatch;
  }
};

// RETURN SUB AND DUB TITLES
const getGogoAnimeMap = async (id) => {
  // Get anime title
  const title = await getAnimeTitle(id);

  // Get the dub title
  const titleDub = {
    romaji: `${title.romaji} dub`,
    english: `${title.english} dub`,
    native: `${title.romaji} dub`,
  };

  function errorHandle(error) {
    console.log(error);
  }

  const searchRes = await fetch(`http://0.0.0.0:5000/anime/gogoanime/${sanitize(
    title.english ?? title.romaji
  )}
`)
    .then((data) => data.json())
    .catch(errorHandle);

  // Get all the titles including sub and dub
  const gogoTitles = searchRes.results
    .filter((t) => t !== null)
    .map((t) => t.title);
  const gogoDubTitles = searchRes.results
    .filter((t) => t !== null)
    .map((t) => t.title)
    .filter((t) => t.includes("(Dub)"));

  // Use findOriginalTitle to get the best matched title
  const bestSubTitle = findOriginalTitle(title, gogoTitles);
  const bestDubTitle = findOriginalTitle(titleDub, gogoDubTitles);

  // Use the Array.prototype.find() to get the title from the best matched title
  const bestSub = searchRes.results.find((s) => s.title === bestSubTitle);
  const bestDub = searchRes.results.find((s) => s.title === bestDubTitle);

  // Return the sub or dub
  return {
    sub: bestSub,
    dub: bestDub,
  };
};

function formatTitle(title) {
  return title.replace(" ", "-");
}

async function getStreamingLinks(episodeTitle) {
  const gogoServers = ["gogocdn", "streamsb", "vidstreaming"];

  function errorHandle(error) {
    console.log(error);
  }

  const searchRes = await fetch(
    `http://0.0.0.0:5000/anime/gogoanime/watch/${episodeTitle}?server=${gogoServers[0]}`
  )
    .then((data) => data.json())
    .catch(errorHandle);
  return searchRes;
}

// return details about the anime
async function getAnimeInfo(title) {
  return gogoProvider.fetchAnimeInfo(formatTitle(title));
}

export { getStreamingLinks, getGogoAnimeMap, getAnimeInfo, getAnimeTitle };
