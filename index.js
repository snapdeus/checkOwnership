const fetch = require('node-fetch');
const axios = require('axios');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;


const submitters = require('./addresses')

async function fetchNFTs(address) {
    const response = await fetch(`https://api.opensea.io/api/v1/assets?limit=50&offset=0&order_direction=desc&owner=${ address }`)
    const listOfNFTs = await response.json();

    return listOfNFTs

}

const csvWriter = createCsvWriter({
    header: ['NAME', 'LANGUAGE'],
    path: '/home/snapdeus/Documents/records2.csv'
});

let records = []
async function getResults() {
    for (let address of submitters) {

        await sleep(2000)
        fetchNFTs(address)
            .then(listOfNFTs => {

                const assets = listOfNFTs.assets
                // console.log(assets)
                let namesArr = [];
                let collArr = [];
                // console.log(listOfNFTs)
                //CHECK FOR BOT
                // if (assets.length === 0) {

                // }
                // CREATE ARRAY OF NAMES & COLLECTIONS
                for (let i = 0; i < assets.length; i++) {
                    if (assets[i].name) {
                        namesArr.push(assets[i].name);
                    }
                    if (assets[i].collection) {
                        collArr.push(assets[i].collection.name)
                    }
                }
                // console.log(collArr)
                // console.log(namesArr)
                if (namesArr.length === 0) {
                    let array = []
                    array.push('error')
                    records.push(array)


                }
                else if (namesArr.filter(x => x.includes('I Saw It')) || namesArr.filter(x => x.includes('Fake Internet')) || namesArr.filter(x => x.includes('CryptoGodKing'))) {
                    let array = []
                    array.push(`${ address }, TRUE`);
                    records.push(array)
                } else if (collArr.filter(x => x.includes('Subway Jesus Pamphlets'))) {
                    let array = []
                    array.push(`${ address }, TRUE`);
                    records.push(array)

                }
            })
            .catch((error) => {
                console.log(error)


            })
    }
    await csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
        });

}

getResults();



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



// const submitters = ['0x118058f3B8afD5B6A93c89C0c29dF17119044a42'];

// const config = {
//     params: {
//         order_direction: 'desc',
//         offset: '0',
//         limit: '50'
//     }
// }

// async function getNFT() {
//     for (let address of submitters) {
//         try {
//             const res = await axios.get(`https://api.opensea.io/api/v1/assets?owner=${ address }`, config)
//             const assets = res.data.assets
//             console.log(assets);
//             let namesArr = [];
//             let collArr = [];

//             //CHECK FOR BOT
//             if (res.data.assets.length === 0) {
//                 throw 'error - asset length is 0, check for bot'
//             }
//             // CREATE ARRAY OF NAMES & COLLECTIONS
//             for (let i = 0; i < assets.length; i++) {
//                 if (assets[i].name) {
//                     namesArr.push(assets[i].name);
//                 }
//                 if (assets[i].collection) {
//                     collArr.push(assets[i].collection.name)
//                 }
//             }
//             // console.log(namesArr)
//             // console.log(collArr)

//             //FILTER
//             if (namesArr.filter(x => x.includes('I Saw It')) || namesArr.filter(x => x.includes('Fake Internet')) || namesArr.filter(x => x.includes('CryptoGodKing'))) {
//                 console.log("TRUE");
//                 await sleep(3000);
//             } else if (collArr.filter(x => x.includes('Subway Jesus Pamphlets'))) {
//                 console.log("TRUE");
//                 await sleep(3000);
//             } else {
//                 console.log("FALSE");
//                 await sleep(3000);
//             }
//         } catch (e) {
//             console.log(e);
//             await sleep(3000)
//         }
//     }
// };

// getNFT();