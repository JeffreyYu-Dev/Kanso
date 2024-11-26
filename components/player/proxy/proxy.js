const proxyUrl = "http://localhost:8787";

function proxyLink(link) {
  const proxiedUrl = `${proxyUrl}/fetch?url=${link}`;

  return proxiedUrl;
}

export default proxyLink;
