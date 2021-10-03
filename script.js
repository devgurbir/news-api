const apiKey = 'feedafaa78c0468eb9f9bb0ff01159c2';
const pageSize = 10;
let currentPage = 1;

// https://newsapi.org/v2/top-headlines?country=us&apiKey=feedafaa78c0468eb9f9bb0ff01159c2

window.addEventListener('load', () => {
    
    
    if(window.location.pathname == '/search.html'){
        handleSearch();
        
        const pagination = document.querySelector('.pagination');
        pagination.addEventListener('click', handlePaginate);
    }
    else{
        let cat = pageName();        
        handleNews('in', pageSize, cat)
    }
})

function handlePaginate(){

    let pageNumber = parseInt(event.target.name);
    currentPage = pageNumber;
    console.log(currentPage)
    handleSearch();
    createPagination();

}

function createPagination(){
    let parent = document.querySelector('.news');
    const pagination = document.querySelector('.pagination')
    pagination.innerHTML = '';

    let prev = document.createElement('button');
    prev.className = 'pgnBtn';
    prev.textContent = 'Prev';
    if(currentPage == 1){
        prev.disabled = true;
    }
    prev.name = currentPage - 1

    let current = document.createElement('button');
    current.className = 'pgnBtn';
    current.textContent = currentPage;
    current.name = currentPage;

    let next = document.createElement('button');
    next.className = 'pgnBtn';
    next.textContent = 'Next';
    next.name = currentPage + 1;

    pagination.append(prev, current, next);
    parent.append(pagination)

}

function fetchSearch(searchQuery, page, pageSize){
    
    return fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&page=${page}&pageSize=${pageSize}&sortBy=popularity&apiKey=${apiKey}`)
    .then( (response) => {
        return response.json();
    })
    .then( (response) => {
        // console.log(response.articles)
        return response.articles
    })    
}

async function handleSearch(){
    let searchQuery = window.location.search;
    searchQuery = searchQuery.substring(3);
    let pageSize = 5;
    let page = currentPage;
    let results = await fetchSearch(searchQuery, page, pageSize);

    const searchHeading = document.querySelector('.heading')
    searchHeading.innerHTML = ''
    const heading = document.createElement('h1');
    heading.textContent = `News on ${searchQuery}`
    searchHeading.append(heading)

    const parentContainer = document.querySelector('.container')
    parentContainer.innerHTML = ''
    for(let data of results){
        let card = createNewsCard(data);
        parentContainer.append(card);
    }
    createPagination();

}

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

async function handleNews(country, pageSize, cat){
    let results = await fetchTopHeadlines(country, pageSize, cat);
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


