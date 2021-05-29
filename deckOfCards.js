const BASE_URL = 'https://deckofcardsapi.com/api/deck/';
let deckId = '';
$btnDrawCard = $('#btn-draw-card');
$cards = $('#cards');
//1
axios.get(`${BASE_URL}new/draw/`)
    .then(response => {
        console.log(`${response.data['cards'][0]['value']} of ${response.data['cards'][0]['suit']}`)
    })

//2
axios.get(`${BASE_URL}new/draw/`)
    .then(response => {
        console.log(`${response.data['cards'][0]['value']} of ${response.data['cards'][0]['suit']}`)
        return axios.get(`${BASE_URL}${response.data['deck_id']}/draw`)
    })
    .then(response => {
        console.log(`${response.data['cards'][0]['value']} of ${response.data['cards'][0]['suit']}`)
    })

//3
// get a new shuffled deck
axios.get(`${BASE_URL}new/shuffle`)
    .then(response => {
        deckId = response.data['deck_id']
    })

// hanlde user clicks on the Draw a Card button
$btnDrawCard.on('click', () => {
    // ask the API for a new card from the deck
    axios.get(`${BASE_URL}${deckId}/draw/`)
    .then(response => {
        if(response.status === 200) {       // api responds with a success status
            if(response.data['cards'].length === 0) {       // check the cards array to see if it is empty
                $btnDrawCard.off('click');                  // remove the click handler that asked for a new card
                $btnDrawCard.on('click', () => {            // create a new click handler that reloads the page, effectively getting a new deck
                    location.reload();
                })
                $btnDrawCard.text('New Deck')               // change the button text to reflect the new button action
                alert('That was the last card');            // let the user know they have drawn the last card from the deck
            } else {
                $cards.prepend($(`<img src="${response.data['cards'][0]['image']}">`))      // add the card to the beggining of the card area
            }
        } else {
            console.log('API error');
        }
    })
    .catch(response => {
        console.log('API error');
    })
})