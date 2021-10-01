const apiKey = 'feedafaa78c0468eb9f9bb0ff01159c2';
// https://newsapi.org/v2/top-headlines?country=us&apiKey=feedafaa78c0468eb9f9bb0ff01159c2

window.addEventListener('load', () => {
    handleNews();
})

function fetchTopHeadlines(country){
    return fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`)
    .then( (response) => {
        return response.json();
    })
    .then( (response) => {
        console.log(response.articles)
        return response.articles
    })
}

async function handleNews(){
    let results = await fetchTopHeadlines('in');
    const parentContainer = document.querySelector('.container')
    for(let data of results){
        let card = createNewsCard(data);
        parentContainer.append(card);
    }
}

function createNewsCard(post){
    let card = document.createElement('div')
    card.className = 'news-card';

    let newsTitle = document.createElement('h3');
    newsTitle.textContent = post.title;

    let newsDesc = document.createElement('p');
    newsDesc.textContent = post.description;

    card.append(newsTitle, newsDesc);

    return card
}


