const form = document.querySelector('#searchForm');
const currentTemp = document.querySelector('#temp');
const feelingTemp = document.querySelector('#feelingTemp');
const button = document.querySelector('button');
const img = document.createElement('img');
const searchCity = document.querySelector('#searchingCity');
const sky = document.querySelector('#skyStatus');
const bg_image = document.querySelector('.left-container');
const moreInfo = document.querySelector('.right-container');


const getWeather = async () => {

    try{
        const searchTerm = form.elements.query.value
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=3861eeae573a8188b76a2d6c0ceccfb9`)

        let getTemp = res.data.main.temp,
            getFeelsTemp = res.data.main.feels_like,
            getTempMin = res.data.main.temp_min,
            getTempMax = res.data.main.temp_max,
            getPressure = res.data.main.pressure,
            getHumidity = res.data.main.humidity;
            getSkyIcon = res.data.weather[0].main

        searchCity.innerHTML = ''
        searchCity.append(searchTerm)
        form.elements.query.value = '';

        return [getTemp, getFeelsTemp, getTempMin, getTempMax, getPressure, getHumidity, getSkyIcon]

        

    } catch (e){
        return "WEATHER SERVICE IS DOWN :("
    }
}

const runApp = async () => {
    
    form.addEventListener('submit', async function (e) {
        e.preventDefault()

        const [resTemp, resFeelsTemp, resTempMin, resTempMax, resPressure, resHumidity, resSkyIcon] = await getWeather()

        // Głowny kontener informacyjny
        currentTemp.innerHTML = '';
        currentTemp.append(`${Math.floor(resTemp)}°C`) 
        

        if(resSkyIcon === 'Clear'){
            img.src = "./img/sun.png"
            let finalImg = document.querySelector('#skyStatus')
            finalImg.appendChild(img)

            bg_image.style.backgroundImage = "url('img/sunny_bg.jpg')"

        }else if(resSkyIcon  === 'Clouds'){
            img.src = "./img/cloud.png"
            let finalImg = document.querySelector('#skyStatus')
            finalImg.appendChild(img)

            bg_image.style.backgroundImage = "url('img/cloud_bg.jpg')"
        }else{
            img.src = "./img/rain.png"
            let finalImg = document.querySelector('#skyStatus')
            finalImg.appendChild(img)

            bg_image.style.backgroundImage = "url('img/rain_bg.jpg')"
        }


        
        // Prawy kontener

        const array = [
            `Temp odczywalna ${Math.floor(resFeelsTemp)}°C`,
            `Temp min ${Math.floor(resTempMin)}°C`,
            `Temp max ${Math.floor(resTempMax)}°C`, 
            `Ciśnienie ${resPressure}HPa`, 
            `Wilgotność ${resHumidity}%` 
        ]

        const ul = document.querySelector('ul');
        ul.innerHTML = ''
        array.forEach((value) =>{
            const li = document.createElement('li');
            li.innerText = value
            ul.appendChild(li)
        })

    })

    

}

runApp();