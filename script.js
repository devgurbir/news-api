const apiKey = 'feedafaa78c0468eb9f9bb0ff01159c2';
const pageSize = 10;
// https://newsapi.org/v2/top-headlines?country=us&apiKey=feedafaa78c0468eb9f9bb0ff01159c2

window.addEventListener('load', () => {
    let cat = pageName();
    handleNews('in', pageSize, cat)
    
})

function pageName(){
    let res = window.location.pathname;
    res = res.substring(1)
    res = res.split("")
    for(let i =0; i<5; i++){
        res.pop()
    }
    res = res.join("")
    return res
}

function fetchTopHeadlines(country, numberOfResults, category){
        if(category != 'index'){
            return fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${numberOfResults}`)
            .then( (response) => {
                return response.json();
            })
            .then( (response) => {
                console.log(response.articles)
                return response.articles
            })
        }
        else{
            return fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&pageSize=${numberOfResults}`)
            .then( (response) => {
                return response.json();
            })
            .then( (response) => {
                console.log(response.articles)
                return response.articles
            })
        }
    }

async function handleNews(country, pageSize, category){
    let results = await fetchTopHeadlines('in', pageSize, category);
    const parentContainer = document.querySelector('.container')
    console.log(results)
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

    let newsCategory = document.createElement('span');
    newsCategory.textContent = post.category

    let newsDesc = document.createElement('p');
    newsDesc.textContent = post.description;

    card.append(newsTitle, newsCategory, newsDesc);

    return card
}


