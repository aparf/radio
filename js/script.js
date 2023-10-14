const id = '1BVEnnaaom6MnhKgIVLfi3ajHO4itX9DPrRflTdtpy7c';
const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Sheet1?alt=json&key=AIzaSyAw0GSHKq8OcdMCSj64zsWu8mGww5jACMs`;

var messages = [];
var links =[];
var message = "";


// the vanila implementation of arr1 != arr2 does not work
function arraysMatch(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function fetchData() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var newMessages = [];
      var newMessage = "";
      var newLinks =[];

      for (var i = 1; i < data.values.length; i++) {
        // condition required to check for repeated suggestions
        if (!newMessages.includes(data.values[i][1]) && (data.values[i][1] != undefined)) {
          console.log(data.values[i][1])
          newMessages.push(data.values[i][1]);
          newLinks.push(data.values[i][3]);
        }
      }
      console.log(newLinks)

      // check wether it is required to add new messags
      if (!arraysMatch(newMessages, messages)) {
        message = newMessage;
        messages = newMessages;
        links = newLinks;

        for (var i = 0; i < messages.length; i++) {
          var link = document.createElement('a');
          if (links[i]){
            link.setAttribute('href', links[i]);
          }
          link.classList.add('suggestions');
          link.textContent = messages[i];

          var parentElement = document.getElementById('container');
          parentElement.appendChild(link);
        }
      }
    })
    .catch(error => console.error('Error:', error));
}



// Fetch data initially
fetchData();

// Polling interval in milliseconds (e.g., fetch data every 5 seconds)
const pollingInterval = 3000;
setInterval(fetchData, pollingInterval);