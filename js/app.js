
// html section id 
const searchResult = document.getElementById('search-result');

// get data by search
const getSearch = () => {

    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
        .then(response => response.json())
        .then(data => displayResult(data.data))
};

const displayResult = results => {
    results.forEach(result => {
        console.log(result)
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
            <div class="card border-0">
                <img src="${result.image}" class="card-img-top w-50 mx-auto mt-3" alt="${result.phone_name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${result.phone_name}</h5>
                    <p class="card-text mb-2">Band: ${result.brand}</p>
                    <button onclick="getDetails('${result.slug}')" class="btn btn-info">See Details</button>
                </div>
            </div>
         `;   
        searchResult.appendChild(div); 
    });
};


const getDetails = id => {
    console.log(id);

};


/*
{brand: 'Apple ', phone_name: 'iPhone 13 mini', slug: 'apple_iphone_13_mini-11104', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg'}
brand: "Apple "
image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
phone_name: "iPhone 13 mini"
slug: "apple_iphone_13_mini-11104"
*/