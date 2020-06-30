console.log("Client side javascript file is loaded")

fetch("http://puzzle.mead.io/puzzle").then((response) => {  //api to make http requests
    response.json().then((data) => {
        console.log(data)
    })
})