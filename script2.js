//curl 'https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=your_api_key'



const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=178645821217565740501x35653`).
        then(response => {
            console.log(response)


            return response.json()
        }).
        then(data => {

            console.log(`your country name is ${data.country} and city name nis ${data.city}`)

            console.log(data);

            return fetch(`https://restcountries.com/v3.1/name/${data.country}`)

        }).then(res => {

            console.log(res)
            return res.json();
        }).then((data) => {
            console.log(data[0]);


        });


}


whereAmI(52.508, 13.381);