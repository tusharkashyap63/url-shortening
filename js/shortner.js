async function shortUrl() {
  let link = document.getElementById('url').value;
  let myBody = {
    url: link,
  };
  let initObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(myBody),
  };
  let request = new Request('https://rel.ink/api/links/', initObject);

  let response = await fetch(request).then((res) => res.json());
  let shortenedLinkResponse = `https://rel.ink/${response.hashid}`;

  let allShortenedLinks = document.getElementById('allShortenedLinks');

  let shortenedLinkContainer = document.createElement('div');
  shortenedLinkContainer.className = 'shortenedLinkContainer';

  let enteredlink = document.createElement('span');
  enteredlink.textContent = link;
  shortenedLinkContainer.appendChild(enteredlink);

  let copyLink = document.createElement('div');
  copyLink.innerHTML = `<a href="${shortenedLinkResponse}" target="_blank">${shortenedLinkResponse}</a>
                        <button>Copy</button>`;

  shortenedLinkContainer.appendChild(copyLink);

  allShortenedLinks.appendChild(shortenedLinkContainer);
}

document.getElementById('shortUrl').addEventListener('click', shortUrl);
