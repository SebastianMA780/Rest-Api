//Turn on for parse csv to Json

/*

const createReadStream = require('fs').createReadStream;
const createWriteStream = require('fs').createWriteStream;
const csvjson = require('csvjson');

const toObject = csvjson.stream.toObject();
const stringify = csvjson.stream.stringify();

createReadStream('./dataStockPrice.csv', 'utf-8')
    .pipe(toObject)
    .pipe(stringify)
    .pipe(createWriteStream('./stockPrices.json'));

*/


async function pushStockPrices() {

    const jsonPrices = await require('./stockPrices.json');
    const longArray = jsonPrices.length;
    let i = 0;

    //console.log(longArray)

    for ( i ; i < longArray ; i++ ) {

        try {

            let response = await doingPostRequest( jsonPrices[i] );
            console.log(response)

        } catch {}
    }

}

function doingPostRequest( jsonPrices ) {

    return new Promise((resolve, reject) => {

        const axios = require('axios').default;

        axios.post('http://localhost:3000/StockPrices', jsonPrices
        )
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    })
}

pushStockPrices();