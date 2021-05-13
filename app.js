const form = document.querySelector('#searchForm');
const currentTemp = document.querySelector('#temp');
const feelingTemp = document.querySelector('#feelingTemp');
const button = document.querySelector('button');
const img = document.createElement('img');
const searchCity = document.querySelector('#searchingCity');
const sky = document.querySelector('#skyStatus');
const bg_image = document.querySelector('.left-container');


const getWeather = async () => {

    try{

        const searchTerm = form.elements.query.value
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=3861eeae573a8188b76a2d6c0ceccfb9`)

        searchCity.append(searchTerm)
        return res.data.main.temp;


    } catch (e){
        return "WEATHER SERVICE IS DOWN :("
    }
}


const getFeelTemp = async () => {

    try{
        const searchTerm = form.elements.query.value
        const resFeel = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=3861eeae573a8188b76a2d6c0ceccfb9`)
        return resFeel.data.main.feels_like;
    } catch (e){
        return "WEATHER SERVICE IS DOWN V2 :("
    }

}

const getSkyStatus = async () => {
    
    try{
        const searchTerm = form.elements.query.value
        const skyStatus = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=3861eeae573a8188b76a2d6c0ceccfb9`)

        return skyStatus.data.weather[0].main
    } catch (e){
        return "WEATHER SERVICE IS DOWN V3 :("
    }
}



const listener = () => {
    form.addEventListener('submit', async function (e) {
        e.preventDefault()

        const temp = await getWeather()
        currentTemp.append(`${Math.floor(temp)}°C`);
        
        

        const feelTemp = await getFeelTemp()
        // feelingTemp.append(`Temp odczuwalna wynosi ${Math.floor(feelTemp)}°C`);

        const status = await getSkyStatus()

        if(status === 'Clear'){
            img.src = "./img/sun.png"
            let finalImg = document.querySelector('#skyStatus')
            finalImg.appendChild(img)

            bg_image.style.backgroundImage = "url('img/sunny_bg.jpg')"

        }else if(status === 'Clouds'){
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

        form.elements.query.value = '';
})}


listener()


