const cardText = document.getElementById("testimonial");
const image = document.getElementById("clientImage");

document.addEventListener('DOMContentLoaded', (event) => {
    
    const button = document.getElementById("button");

    button.addEventListener('click', function() {
        updateClient();
    });

    image.src = "images/client.jpg";
})





function getRandomInt() {
    return Math.ceil(Math.random() * 8);
}

function clearText() {
    cardText.innerHTML = "";
}

function processText(text) {
    const regex = /([\.])/g;
    return text.replace(regex, "!!!\n");
}

function textToArray(text) {
    return text.split('\n');
}

function appendText(textArray) {
    for(let line of textArray) {
        cardText.innerHTML += `<span>${line}</span><br>`;
    }
}


function updateClient() {

    let userID = getRandomInt();

    fetch(`https://64486933e7eb3378ca2e0f51.mockapi.io/api/users?id=${userID}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        clearText();
        let text = processText(data[0].message);
        let textArray = textToArray(text);
        appendText(textArray);
        image.src = data[0].avatar;
    })
    .catch(error => {
        console.log("Error finding testimonial: ", error);
        cardText.innerHTML = "Error retrieving testimonial";
    })

}