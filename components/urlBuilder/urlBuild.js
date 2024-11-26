function urlBuild(page, params) {
  let url = new URL(`http://localhost:3000${page}`);

  if (params === null) {
    return url;
  }

  for (let param in params) {
    url.searchParams.set(param, params[param]);
  }

  return url;
}

export default urlBuild;
