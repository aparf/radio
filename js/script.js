const id = '1BVEnnaaom6MnhKgIVLfi3ajHO4itX9DPrRflTdtpy7c';
const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Sheet1?alt=json&key=AIzaSyAw0GSHKq8OcdMCSj64zsWu8mGww5jACMs`;

var messages = [];
var message = "";

function fetchData() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var newMessages = [];
      var newMessage = "";

      for (var i = 1; i < data.values.length; i++) {
        if (newMessages.includes(data.values[i][1]) == false){
          newMessage += data.values[i][1] + "        ";
          newMessages.push(data.values[i][1]);
        }

      }

      if (newMessage !== message) {
        message = newMessage;
        messages = newMessages;
        console.log(message);

        var div = document.getElementById('container');
        div.innerHTML = message;
      }
    })
    .catch(error => console.error('Error:', error));
}

// Fetch data initially
fetchData();

// Polling interval in milliseconds (e.g., fetch data every 5 seconds)
const pollingInterval = 6000;
setInterval(fetchData, pollingInterval);