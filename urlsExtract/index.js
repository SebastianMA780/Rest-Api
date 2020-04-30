var osmosis = require('osmosis');

function getInformation(url) {

    return new Promise((resolve, reject) => {

        osmosis
            .get(url)
            .set({
                title: 'h1',
                date: './/*[contains(concat(" ",normalize-space(@class)," ")," category-eyebrow__date ")]',
                url: './/link[@rel="canonical"]/@href',
                description:
                    osmosis
                        .find('.//*[contains(concat(" ",normalize-space(@class)," ")," pagebody-copy ")]')

            })
            .then( (context, data) => {
                let objProperty = data.description;
                let compare = toType(objProperty);
                if ( compare === 'array' ) {

                    let reducerArray = objProperty.reduce((a, b) => a + b);
                    data.description = reducerArray;
                }
                resolve(data);
            })
            .error(err => reject(err))

    })
}


function dataBasePost(information) {

        var request = require('request');
        request({
                url: "http://localhost:3000/News",
                method: "POST",
                json: true,
                body: information
            },
            function (error, response, body) {
                console.log(body);
            });
}



function onError(url) {

    console.log(`Error ${url}`)

}


async function fillDataBase() {
    let urlRequest = require('./appleUrls');
    const length = urlRequest.length;
    let i = 0;

    for ( i ; i < length ; i++ ) {

        try {

            let urlMapping = await getInformation(urlRequest[i]);
            await dataBasePost(urlMapping)

        } catch (url) {
            onError(url)
        }

    }
}


var toType = function (obj) {

    if (typeof obj === "undefined") {
        return "undefined";
    }
    if (obj === null) {
        return "null";
    }

    var type = Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1] || '';

    switch (type) {
        case 'Number':
            if (isNaN(obj)) {
                return "nan";
            } else {
                return "number";
            }
        case 'String':
        case 'Boolean':
        case 'Array':
        case 'Date':
        case 'RegExp':
        case 'Function':
            return type.toLowerCase();
    }
    if (typeof obj === "object") {
        return "object";
    }
    return undefined;
};

fillDataBase();


