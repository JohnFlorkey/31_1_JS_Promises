// Part 1 Number Facts

const BASE_URL = 'http://numbersapi.com/';
const number = 42;
const numbers = [45,46,14,16,18];
let url = '';
const numFacts = 4;
$content1 = $('#content-1');
$content2 = $('#content-2');
$content3 = $('#content-3');

// 1
url = `${BASE_URL}${number}?json`;
const singleResponse = axios.get(url);
singleResponse
    .then((data) => {
        $content1.empty();
        $content1.text(data.data.text);
    })
    .catch(() => {
        console.log("Something went wrong")
    })

// 2
url = `${BASE_URL}${numbers.join()}?json`;
const multipleNumberResponse = axios.get(url);
multipleNumberResponse
    .then((data) => {
        $content2.empty();
        for (const fact in data.data) {
            console.log(data.data[fact]);
            $content2.append($('<p>').text(data.data[fact]));
        }
    })
    .catch(() => {
        console.log("Something went wrong")
    })

// 3
const oneNumberMultipleFactsResponse = [];
url = `${BASE_URL}${number}?json`;
for (let i = 0; i < numFacts; i++) {
    oneNumberMultipleFactsResponse.push(axios.get(url));
}
Promise.all(oneNumberMultipleFactsResponse)
    .then((data) => {
        $content3.empty();
        for (const fact in data) {
            console.log(data[fact]);
            $content3.append($('<p>').text(data[fact].data['text']));
        }
    })
    .catch(() => {
        console.log("Something went wrong")
    });