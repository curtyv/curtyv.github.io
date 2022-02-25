// const BREEDS_URL = 'https://dog.ceo/api/breeds/image/random';

// function addDoggo() {
//     // show loading spinner
//     fetch(BREEDS_URL)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         const img = document.createElement('img');
//         img.src = data.message;
//         img.alt = 'Cute Dog';

//         document.querySelector('.doggos').appendChild(img);

//         //stop showing loading spinner
//     })
// }

// document.querySelector('.add-doggo').addEventListener("click", addDoggo);


const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.breeds');

//build select box with list of breeds from API
fetch(BREEDS_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const breedsObject = data.message;
        const breedsArray = Object.keys(breedsObject);

        for (let i = 0; i < breedsArray.length; i++) {
            const option = document.createElement('option');
            option.value = breedsArray[i];
            option.innerText = breedsArray[i];
            select.appendChild(option);
        }
    })

//fucntion to create new doggo image on first selection
function getNewDoggo(selectedUrl) {
    //show spinner
    document.querySelector('.spinner').style.display = 'block';

    //get URL from API, then create doggo img tag
    fetch(selectedUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const img = document.createElement('img');
            img.src = data.message
            img.alt = 'A cute dog'
            img.id = 'doggo'

            document.querySelector('.doggos').appendChild(img);
        })
        //hide spinner
        .then(function() {
            document.querySelector('.spinner').style.display = 'none';
        })
}

//function to update existing doggo img tag on following selections
function updateDoggo(selectedUrl) {
    //show spinner
    document.querySelector('.spinner').style.display = 'block';

    //get url from API, update src element of doggo img tag
    fetch(selectedUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            document.getElementById('doggo').src = data.message;
        })
        //hide spinner
        .then(function() {
            document.querySelector('.spinner').style.display = 'none';
        })
}

//event listener for select box
select.addEventListener("change", function(event) {
    //build URL for selected doggo to pass through to API
    let selectedUrl = `https://dog.ceo/api/breed/${event.target.value}/images/random`;

    //if doggo image does not exist, run function to create new doggo image
    if (document.getElementById('doggo') === null) {
        getNewDoggo(selectedUrl);
    //otherwise update the existing doggo image
    } else { updateDoggo(selectedUrl);
    }


});