// html section id 
const searchResult = document.getElementById('search-result');
const phoneDetails = document.getElementById('phone-details');

// get data by search
const getSearch = () => {

    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
        .then(response => response.json())
        .then(data => displayResult(data.data))
};

// display search result
const displayResult = results => {
    results.forEach(result => {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
            <div class="card border-0">
                <img src="${result.image}" class="card-img-top w-50 mx-auto mt-3" alt="${result.phone_name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${result.phone_name}</h5>
                    <p class="card-text mb-2">Band: ${result.brand}</p>
                    <button class="btn btn-info" onclick="getDetails('${result.slug}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See Details</button>
                </div>
            </div>
         `;
        searchResult.appendChild(div);
    });
};

// get phone details to api
const getDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`

    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data.data))

};

// display phone details 
const displayDetails = data => {
    console.log(data)
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="d-flex justify-content-center"><img class="w-50" src="${data.image}"></div>
        <h1 class="text-center my-2">${data.name}</h1>
        <h2 class="text-center my-2">${data.brand}</h2>
    `;
    phoneDetails.appendChild(div);

    const detailsDiv = document.createElement('div');
    detailsDiv.className ='container-fluid';
    detailsDiv.innerHTML =`
    <div class="row">
        <div class="row">
            <div class="col-sm-4 col-4">
                <h5>Release Date:</h5>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data.releaseDate}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h5>Display Size:</h5>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data.mainFeatures.displaySize}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h5>chipSet:</h5>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data.mainFeatures.chipSet}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h5>Memory:</h5>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data.mainFeatures.memory}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h5>Sensors:</h5>
            </div>
            <div class="col-sm-8 col-8" id="sensors-div">
                <p>${data.mainFeatures.sensors.join(", ")}</p>
                 
            </div>
        </div>
    </div>
    `;

        for(const prop in data.others){
            const othersDiv = document.createElement('div');
            othersDiv.className ='row';
            othersDiv.innerHTML =`
                <div class="row">
                    <div class="col-sm-4 col-4">
                        <h5>${prop}</h5>
                    </div>
                    <div class="col-sm-8 col-8">
                         <p>${data.others[prop]}</p>
                    </div>
            `;
            detailsDiv.appendChild(othersDiv);
        };
    phoneDetails.appendChild(detailsDiv);
};

