const request = require('request') //npm module for making https request

const forecast = (address,callback) => {
const url = "http://api.openweathermap.org/data/2.5/weather?q="+address+"&appid=e7639561b986e61dd2ba6a9240804d4f&units=metric"

request({url},(error,response,body) => { //using object shorthand syntax.
   
    if(body === undefined){
        callback("Unable to connect to weather service!",undefined);
      } else if(JSON.parse(body).main === undefined){
        callback("Unable to find city.Try another search!")
      }
      else {
        const data=JSON.parse(body)
        callback(undefined, data.main);
      }
})
}

module.exports=forecast