

// get data by search
const getSearch = () =>{

    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    .then(response => response.json())
    .then(data => console.log(data))
};

getSearch();