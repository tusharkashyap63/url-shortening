async function shortenUrl() {
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
  try {
    let response = await fetch(request).then((res) => res.json());
    let shortenedLinkResponse = `https://rel.ink/${response.hashid}`;

    // Updating the DOM with results
    let allShortenedLinks = document.getElementById('allShortenedLinks');

    let shortenedLinkContainer = document.createElement('div');
    shortenedLinkContainer.className = 'shortenedLinkContainer';

    let enteredlink = document.createElement('span');
    enteredlink.textContent = link;
    shortenedLinkContainer.appendChild(enteredlink);

    let copyLink = document.createElement('div');
    copyLink.innerHTML = `<a href="${shortenedLinkResponse}" target="_blank">${shortenedLinkResponse}</a>
                        <button class="copyBtn">Copy</button>`;

    shortenedLinkContainer.appendChild(copyLink);

    allShortenedLinks.appendChild(shortenedLinkContainer);
  } catch (error) {
    console.log(error);
  }
}

function copyShortenedLink(e) {
  let range = document.createRange();
  range.selectNode(e.target.previousElementSibling);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand('copy');
  window.getSelection().removeAllRanges(); // to deselect

  e.target.textContent = 'Copied!';
  e.target.style.backgroundColor = 'hsl(257, 27%, 26%)';
  setTimeout(() => {
    e.target.textContent = 'Copy';
    e.target.style.backgroundColor = 'hsl(180, 66%, 49%)';
  }, 3000);
}

document.getElementById('shortenUrl').addEventListener('click', shortenUrl);
document.getElementById('allShortenedLinks').addEventListener('click', (e) => {
  if ((e.target.className = 'copyBtn')) {
    copyShortenedLink(e);
  }
});
