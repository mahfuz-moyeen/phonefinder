// html section id 
const searchResult = document.getElementById('search-result');
const phoneDetails = document.getElementById('phone-details');
phoneDetails.className ='row align-items-center';


// get data by search
const getSearch = () => {
    document.getElementById('not-found').style.display = "none";
    document.getElementById('spinner-section').style.display='block';
    searchResult.innerHTML = '';
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.toLowerCase();
    
    if (searchValue === '') {
        searchResult.innerHTML = '';
        document.getElementById('not-found').style.display = "none";
        document.getElementById('spinner-section').style.display='none';
        alert('You did not search anything');
    }
    else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
        .then(response => response.json())
        .then(data => displayResult(data.data))
    };
};

// display search result
const displayResult = results => {
    if (results.length !== 0) {
        document.getElementById('not-found').style.display = "none";
        //search result
        results.forEach(result => {
            if (results.indexOf(result) < 20) {
                const div = document.createElement('div');
                div.className = 'col';
                div.innerHTML = `
                <div class="card border-0">
                    <img src="${result.image}" class="card-img-top w-50 mx-auto mt-3" alt="${result.phone_name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${result.phone_name}</h5>
                        <p class="card-text mb-2">Band: ${result.brand}</p>
                        <button class="btn btn-info details-button" onclick="getDetails('${result.slug}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See Details</button>
                    </div>
                </div>
                 `;
                searchResult.appendChild(div);
            }
        });
        document.getElementById('spinner-section').style.display='none';
    }
    else {
        document.getElementById('not-found').style.display = "block";
        document.getElementById('spinner-section').style.display='none';
    }
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
    phoneDetails.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'details-photo col-sm-6'
    div.innerHTML = `
        <div class="d-flex justify-content-center"><img class="w-50" src="${data.image}"></div>
        <h1 class="text-center my-2">${data.name}</h1>
        <h3 class="text-center fs-4 my-2">Band: ${data.brand}</h3>
    `;
    phoneDetails.appendChild(div);

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'container-fluid details-text col-sm-6 my-3';
    detailsDiv.innerHTML = `
    <div class="row">
        <div class="row">
            <div class="col-sm-4 col-4">
                <h4>Release Date:</h4>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data?.releaseDate || 'No release Date found'}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h4>Display Size:</h4>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data.mainFeatures.displaySize}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h4>chipSet:</h4>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data.mainFeatures.chipSet}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h4>Memory:</h4>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data.mainFeatures.memory}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h4>Sensors:</h4>
            </div>
            <div class="col-sm-8 col-8" id="sensors-div">
                <p>${data.mainFeatures?.sensors.join(", ") || ''}</p>
                 
            </div>
        </div>
    </div>
    `;
    phoneDetails.appendChild(detailsDiv);

    // display others details 
    const othersDiv = document.createElement('div');
    if(data.others !== undefined){
        othersDiv.innerHTML=`
        <div class="row">
        </div>`
        for (const prop in data.others) {
            const div = document.createElement('div');
            div.className = 'row';
            div.innerHTML = `
                    <div class="row">
                        <div class="col-sm-4 col-4">
                            <h4 class="text-end">${prop}:</h4>
                        </div>
                        <div class="col-sm-8 col-8">
                             <p>${data.others[prop]}</p>
                        </div>
                `;
            othersDiv.appendChild(div);
            detailsDiv.appendChild(othersDiv);
        };
    }
    else{
        othersDiv.innerHTML ='';
        detailsDiv.appendChild(othersDiv);
    }
    phoneDetails.appendChild(detailsDiv);
};

const dropDown = text =>{
    searchResult.innerHTML = '';
    fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`)
    .then(response => response.json())
    .then(data => displayResult(data.data))
};