const search = document.getElementById('search');
const input = document.getElementById('input');
const text = document.getElementById('text');
const form = document.getElementById('form');
const loader = document.getElementById('loader');

var searchValue = '';
var limit = 4;
var page = 1;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchThroughPosts();
});

input.addEventListener('change', (e) => {
  var value = input.value;
  searchValue = value;
});

search.addEventListener('click', () => {
  searchThroughPosts();
});

// fetch posts
async function fetchData() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// show loader
async function showLoader() {
  loader.style.opacity = '1';

  setTimeout(() => {
    loader.style.opacity = '0';

    setTimeout(() => {
      page++;
      showPosts();
    }, 200);
  }, 1000);
}

// Loop through the headers
function searchThroughPosts() {
  const term = searchValue.toUpperCase();
  const list = document.querySelectorAll('.list');

  list.forEach((post) => {
    const title = post.querySelector('.title').innerText.toUpperCase();
    const text = post.querySelector('.text').innerText.toUpperCase();

    // iterate through each 'post' and set the display block/none it.
    if (title.indexOf(term) > -1 || text.indexOf(term) > -1) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
}

// Show posts in DOM
async function showPosts() {
  const posts = await fetchData();
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('list');
    postEl.style.display = 'block';
    postEl.innerHTML = `
        <div class="min-w-full w-full lg:min-w-full lg:flex mt-2">
          <div
            class="min-w-full border border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
          >
            <div class="mb-8 posts">
              <p class="text-sm text-gray-600 flex items-center">
                <svg
                  class="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
                  />
                </svg>
                Members only
              </p>
              <div class="text-gray-900 font-bold text-xl mb-2">
                <span class="title">${post.title}</span>
              </div>
              <p class="text-gray-700 text-base text">
                ${post.body}
              </p>
            </div>
            <div class="flex items-center">
              <div class="text-sm">
                <p class="text-gray-900 leading-none">
                  Jonathan Reinink
                </p>
                <p class="text-gray-600" id="id">Post #${post.id}</p>
              </div>
            </div>
          </div>
        </div>
        `;

    list.appendChild(postEl);
  });
}
showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
  }
});
