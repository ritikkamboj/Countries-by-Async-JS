'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;


}

const renderCountry = function (data, className = '') {
  const languages = data.languages;
  console.log(languages)
  const languageName = Object.values(languages)[0];

  const currencyKey = Object.keys(data.currencies)[0]; // Gets the first key from the currencies object
  const currency = data.currencies[currencyKey];
  console.log(data);
  console.log(data.currencies);
  console.log(Object.keys(data.currencies)[0])



  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫${(+data.population / 1000000).toFixed(
    1
  )}</span></p>
      <p class="country__row"><span>🗣️</span>${languageName}</p>
      <p class="country__row"><span>💰</span>${currencyKey}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

//  const getCountryAndNeighbour=function(country){
//     const request = new XMLHttpRequest();
// request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
// request.send();

// request.addEventListener('load', function(){
//     console.log(this.responseText);

//     // we can covert this text to JSON format

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     renderCountry(data);

//     // console.log(data.borders);

//  const [neighbour] = data.borders;

//  if(!neighbour)
//     return;
//  const request2 = new XMLHttpRequest();
//  request2.open('GET',`https://restcountries.com/v3.1/alpha/${neighbour}`);
//  request2.send();

//  request2.addEventListener('load', function(){
//     console.log(this.responseText);
//     const [data2] = JSON.parse(this.responseText);
//     console.log(data2);
//     // console.log()
//     renderCountry(data2,'neighbour');
// })
// });

// };

// getCountryAndNeighbour('portugal');
// // fetchCountry('india');

// const request = fetch('https://restcountries.com/v3.1/name/portugal');

// console.log(request);

// const getCountryData = function(country){

//         fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response){
//             console.log(response);

//             return(response.json())  ; // this also return a promise

//         }).then(function(data){
//             console.log(data);
//             renderCountry(data[0]);

//         })
// }

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then((data) =>{
//         console.log(data[0])
//         renderCountry(data[0]);
//         const neighbour = data[0].borders[0];
//         console.log(neighbour);
//         if(!neighbour)
//             return;


//         //country 2 
//         return(`https://restcountries.com/v3.1/name/${neighbour}`)


//     }).then(response => response.json()).then(data1 => renderCountry(data1 ,'neighbour'));
// };
// getCountryData('portugal');

const getJSON = function (url, errorMsg = "something went wrong") {
  return fetch(url).then(response => { if (!response.ok) throw new Error(`${errorMsg} (${response.status})`); return response.json()});
}

const getCountryData = function (country) {
  console.log("jai maata di ");
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country Not Found`)
  
    .then((data) => {
      console.log(data[0]);
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      // const neighbour = '';
      console.log(neighbour);
      if (!neighbour) throw new Error (`No neighbour found`);

      // Make a second fetch request
      console.log('jai ho ')
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`,`Country Not Fouund`);
    })
    
    .then(([data1]) => {
      console.log(data1)
      renderCountry(data1, 'neighbour')
    }).catch((err) => {
      console.log(`${err}`);
      renderError(`something went wrong ${err.message}.Try again`);


    })
    .finally(() => countriesContainer.style.opacity = 1);
  //   .catch(error => console.error('Error:', error));
};

const x =prompt("enter the country ")
btn.addEventListener('click', function () {
  getCountryData(x);


});



// const getCountryData = function (country) {
//   console.log("jai maata di ");
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//       .then(response => {
//         console.log(response);

//         if(!response.ok)
//             throw new Error(`Country not found as we getting ${response.status}`);

//         return response.json()})
//       .then((data) => {
//         console.log(data[0]);
//         renderCountry(data[0]);
//         const neighbour = data[0].borders[0];
//         // const neighbour = 'jvjvjh';
//         console.log(neighbour);
//         if (!neighbour) return;

//         // Make a second fetch request
//         console.log('jai ho ')
//         return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//       })
//       .then((response1) => {
//         console.log(response1)

//         if(!response1.ok)
//             throw new Error('neighbour country not found ');
//         return response1.json()})
//       .then(([data1]) => {
//         console.log(data1)
//         renderCountry(data1, 'neighbour')
//     }).catch((err) => {
//         console.log(`${err}`);
//         renderError(`something went wrong ${err.message}.Try again`);


//     })
//     .finally(()=> countriesContainer.style.opacity = 1);
//     //   .catch(error => console.error('Error:', error));
//   };





// <!-- Coding Challenge -->
 /* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/ 
