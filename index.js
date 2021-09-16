const fetch = require('node-fetch');
const axios = require('axios');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;


const submitters = ["0x00A839dE7922491683f547a67795204763ff8237",
    "0x0216a845EF1A7DB8767989cBf51f54fddddb7a1d",
    "0x02E67cad0E29FF8a5FB7abD28c219373cd787535",
    "0x0843BD59D0722b15Ff96A1829E93b6Caa943F260",
    "0x087ee66cc7914c20b49ab2a2de3cfe3b08fb18f2",
    "0x08f33dD442dc03b3E260B843210692aA354fF285",
    "0x09c37423e85fc4B8fb236082E22082982bE50eFA",
    "0x0DDde365cdFF6B4827D2f7d0c66F8C99B18f6E54",
    "0x0ef4db30F76bcbD1eE7DDBb056e699B69Dfb8eaE",
    "0x0efcec3ed57ac7b3f4442234c1e2fbda9f000d17",
    "0x106c22E1F51C52a034f5F957828e643Fe8Fd326a",
    "0x10a2DFb788a57587E6deAd219fb2829B8eAd9D7b",
    "0x118058f3B8afD5B6A93c89C0c29dF17119044a42",
    "0x1585c11207076b2303e2e5fa380b82b0f165cca5",
    "0x17fFe0B00ff5194827b69E469BD938be59c1B10c",
    "0x1853dc4fbFe3B29012Ac6dF6ca44B4fCa0aA1959",
    "0x1AFe0931155E612775637846a6BB606347EF58e7",
    "0x1c93F931D8A6a7AFF1808441fce152c8faB234a1",
    "0x1F8cB86C691a51F83Ab9ED18bea5C5e1D59Fa7b4",
    "0x207b3c1083a62e282d375a11f52730879cbfbbbb",
    "0x207f17204c721e0D5E4C390d0662d68e282556D1",
    "0x2161FF11d13F78Bd1e45459f6F5df3C31feF82BB",
    "0x2199ff19a308B1D03015627F3910dD0f54553fa4",
    "0x21a0B6Fd81ec697E326228DF279F9Add0D1B021A",
    "0x2272A50B1CC4A57611f53Fbc86775CC767625632",
    "0x234F4E58dF75cae6ef10C4635a22BA5b52DD561d",
    "0x23742726208FCe2Ff8941408e36c6607166B46e9",
    "0x23786758DB45546bF38b73E31f9C8F29d79b9618",
    "0x269af3f73fb34e5311bff558bb9d3e6fe2743a03",
    "0x26c1e466CE41070585d6876dC17B7bD9295C41d5",
    "0x2bc80F227d1a01264B55bdF9B1E76F0D1cEF4850",
    "0x2cab8a48851c3757f9d0a88800f5f1ab9f070234",
    "0x2cf9383b7caf390b9712d0847452907ebb22257c",
    "0x2DDAaB93127828F445f65c8d176B06081684683F",
    "0x2dE321329A3cE5A6871CeD3e6737b179e2Ce299C",
    "0x300f8dc5f910CC67abF287035F1A50cB80A3B3bF",
    "0x336F6BECa25Aed6bc4B4F9E6eF5B3Eb415aEcA67",
    "0x3469D08EEfE5546Ce09806BB2c68E03d2CA526ce",
    "0x3593DA86E66c7871108c4145d3A3038fEDc27241",
    "0x35f7f29F154A28674c8a50d435384744B02Cf42C",
    "0x37175de23651777f9611c37b2d8F4d420Fa67772",
    "0x37729c5948bb726a505B9633cAab02521c67d89a",
    "0x37Dd733885b76bEB617aBf2C790c1a75eAB6F82a",
    "0x3e8a6726f43e6a7470ff2c99db5b73a2f81afb3d",
    "0x3Ee14ae8DD7848A10b406710434bFCB73c06e46f",
    "0x4041E9d98f794EE7d952d266C1A10707A0Af5332",
    "0x4398193D60dd9237097880A798Dc16FD81802646",
    "0x4648BF25E78f20E3e7155bA5AA857d666926d209",
    "0x4869d40FA6d049a42aADD9eB1ADC4B583B364fCa",
    "0x49c08159de1ae3a8b2d5Cc7BAa9A23BA9E96910C",
    "0x4ad390872c7289316d898ab5d1691ee2786c5bb9",
    "0x4Bd0e5E2FBFb7b2d14Dc3515459CD9C61f671F64",
    "0x4c6D169C7f5d1849e53045B1Cf604d7630CeC9e2",
    "0x4ceB640Af5c94eE784eeFae244245e34b48ec4f6",
    "0x4d87de29c8cf1329227d0e3efdb8561cf81537b2",
    "0x4FC2Bb8bA0ab6095ebAFA5EBa65648b6724De821",
    "0x50c6c0DE6c8a8a27312DF7aDfd8DA74feb5124B9",
    "0x50c716D98898BDB512DD7c5bA0AadaF4a70Cc672",
    "0x50F27CdB650879A41fb07038bF2B818845c20e17",
    "0x5247e923FE289aFb514A5c6af22BAef435f3AC1C",
    "0x5293f1211b43fA3Ac221DC314d24e028358D6C90",
    "0x542a5651F84145EfAaf8dC470e2adC2922877807",
    "0x59bdfb381ca2080d0d042903e776d3dcb548050a",
    "0x5b1f432c86F0a277477c2fBB896eF81Ce39C3f59",
    "0x5b33e2768dcc139911cded71238c9933623885c1",
    "0x5bc6a9e3e5d29212ccc37391056e361a1831fa80",
    "0x5d0ed5eb34c3de684e6c720892201c11f11c7bb0",
    "0x5db4018c4130276D71a7e23edceEef3BB3E3b24c",
    "0x62175FF2A8DAC4716B1C07323f1Cfa97a335a4E7",
    "0x62a1e205ec2a24b7bdC42Def24D6B40863eF6f5C",
    "0x62e3587A73b7A2b26F541317ab7c9c17C304c08D",
    "0x632e92B6cf722C57bf7c03ef4944e0F3e909cB4b",
    "0x63a81A3C1E970246974D3A3d3a060FE0D599545d",
    "0x63AF473D0958c6CBAFB9Af61c06a6db1Fa2158B8",
    "0x642452Bd55591CD954B2987c70e7f2ccC71dE313",
    "0x64FD1a0aE45Df5daF03B1791FcDb5A423beA37D0",
    "0x65Ba4f92D7DFA813DdBd849D9Faf38a723Dd9b12",
    "0x6773A5a95863b257d37a1EDD168AaEb6276592DB",
    "0x6B5bbd4aAA860705A8674e1De639c3dffF734B0f",
    "0x6B6aE848F555f70944Bc99D736fe29fcAeCF8b23",
    "0x6c3E007377eFfd74afE237ce3B0Aeef969b63C91",
    "0x6F3E619eBB91007803Fa258589ceeaF2BE939881",
    "0x6ff56974BEBbd881261ACe70c414458843358b0D",
    "0x707502591380bCFa98175486A38C15cE90E82097",
    "0x717a578E4A157Ea52EE989be75f15957F294d1A9",
    "0x73e60cD967E957bC6e074F93320FfA1d52697D5b",
    "0x7772881A615cd2d326eBE0475A78f9D2963074b7",
    "0x786D7b6E95Ae60DE5d14d47a903EbD8B84bF9823",
    "0x7d2855c1472266601aF0F8206b0e12a87D934760",
    "0x7D551B4Aa5938d18be5C5e9FdE7fECE9566611ba",
    "0x7de871f520228b7A9b9FE2C718766f07A261C56C",
    "0x7F169908e60Cfeaa2816bF59Ba921e17Bc2edb36",
    "0x7f314be00306b7ce9b186f437574e52b5dfb384c",
    "0x809fd9c429ba301da0873879bd28c6809334a00a",
    "0x80cB01Fe8D4E5aCF333C2D3dbe0A42357a391A91",
    "0x819E2E15fE8DF14BaD0be5dfEcd9802F527573B3",
    "0x82397c3222c3797Aa8C01Eb05c316070281Cd779",
    "0x82483Ad317f5D3989eE6b4ff5418eA9DE7F54923",
    "0x83064E29B99076692ee89A80bA88e906DF5eB3F5",
    "0x84A7b031d90b7D50F1c49bB0b6379B4306Cd8A51",
    "0x872bE85aF2c05Fd78901A7556CD7200e2d2831ad",
    "0x87816ddFD2f9865CA3025E46022e17F4EBd2E0B1",
    "0x8ACbD16b7F82ccb219493dA3F17C0649B9A68ad4",
    "0x8C48b40dBa656187896147089545439E4fF4A01c",
    "0x8f1076Ad980585af2B207bF4f81eB2334f025f9b",
    "0x8FdD0CF22012a5FEcDbF77eF30d9e9834DC1bf0A",
    "0x9011B9bE2b067562B732E09a25f39A59871DA8Eb",
    "0x918453d249A22b6A8535c81e21F7530CD6Ab59F1",
    "0x91eBd60b4457A393F70779Ba20EbBA0550e473dE",
    "0x9303EA8dDAf762a3a1F9A8C82c4F16FB70733aC3",
    "0x941beced3e87a15ba22e1a3705b547f50cfd2eb1",
    "0x94Bd1bD3c8ABbC52b29668A65930D4575FA4cAac",
    "0x94ebCe2fCCA633ecf52BB17Bc9AbFC57D88E9AbA",
    "0x94ebCe2fCCA633ecf52BB17Bc9AbFC57D88E9AbA",
    "0x95298343ae03528a6b3c5d211005937f4987b51d",
    "0x994da0c3437a823F9e47dE448B62397D1bDfDdBa",
    "0x9A7c61f909f19b1b212ea45F3fddD173c13f2b64",
    "0x9ce0bdf15454704a0e599f8dcd5e9f547b590c54",
    "0x9d261eb4698D2A4457cd3fbc3592F82A6AFeBDda",
    "0x9e9c0431eafe5addf548bacfea974ccb550dad45",
    "0xa2bf81358783785029f78947a094036cd5208b34",
    "0xA446859f3e5953Fd61F3c94CEbAD5c3B4B0A9d98",
    "0xa4Ac3321fD639a7e2b53dA62897955D920c97012",
    "0xa4EF3F84a24EAfE6Bfae0DE4646D5917F972BdeC",
    "0xa5430730f12f1128bf10dfba38c8e00bc4d90eea",
    "0xa7d7ac8fe7e8693b5599c69cc7d4f6226677845b",
    "0xa9a251560396b595171e6f8dd75dbe9990b7121d",
    "0xaBb94DBdD360CC0eE92B59420A49019e760e32b3",
    "0xaCdc434144CE2f9DDf7836C82f4717e5929102F5",
    "0xaD442616B04CaC445eCF7873989f8a22c276B78B",
    "0xaf4bb08d7145234148492fb753915143cf8470a8",
    "0xaFE6520e39B77158e15b3377c1528B590a887800",
    "0xB3776C13ADA9cAe0b02961Fa40c94921A1FcE77e",
    "0xb63a5C5710F06e111fa14AC82dA2183C5102B504",
    "0xB6ac6964234cA4959b5CD157ad4D5fa59C354183",
    "0xbC07B76e4C63E7B91c6E0395312D88D20449b106",
    "0xbCa2CF5E09748e38abd5091559Ac95968D26b949",
    "0xbd23ba386baf796b6526e1670d9dddf1f7b15ebb",
    "0xbD42af7494714401422D321036c70B393542dc63",
    "0xbf95ef0358AF5d15EeF43DD1EbeE92D6b47B770d",
    "0xbff4021a901117a806AFA22EF0aa23f39CDa5B97",
    "0xc05806bec23760039e7421945538b1fd932d6279",
    "0xC12469b7Ad27706bbE9872A8a45fd9D461bA2342",
    "0xc229d7D3dD662A1b107E29AA84bb0C8Ff609CF3A",
    "0xc314f0F7561803D73D7492044DbCCD971afD472E",
    "0xc46BD7Db12E07d4B05fC612b920d670Ec739CCA3",
    "0xc4BafDC0a6b7C1339055Cea9DFD433B28815AE78",
    "0xC665A60F22dDa926B920DEB8FFAC0EF9D8a17460",
    "0xc70b0B44e47E8604B4234F2d2D8E79540B0CF64B",
    "0xcBca4b75FBfb5eC85fB8fCaB49AcBf75Ba4A3D46",
    "0xcBdbD461e91772612026a43DEF0Fb550bc142264",
    "0xcd6034eb0f8f5c8b0ea954ea64f5b1f10f4d9bde",
    "0xcd981D4402A3d88Fff43aFDc5926514BDb5824bd",
    "0xcfc96f5249d43deb404bb428861b151c93a16c13",
    "0xcfea3050daa3da81e0d38f6fe363e833767cd4e5",
    "0xd11Cd3532F270808bA67D3e810C66Be26b17E0e6",
    "0xD28bfaEa8C886ff6424141278a928f3CDe2741F1",
    "0xD8f6877aec57C3d70F458C54a1382dDc90522E7D",
    "0xD989de9710e7B38A3f58c31D8C738D301eD05ade",
    "0xDB0b4A343592C590f3262E72E1eFE2198ae82502",
    "0xDd4fCC98203f836242BBC19531Af345e17B3Fc98",
    "0xdD537C675Db2597A0ff2a51C382dD36Ba716D8Fb",
    "0xDd913f8cc3B66A5b6bE595516248C649C688e208",
    "0xDe89db35d4AaA281904FACcf48033A66003eA50d",
    "0xE28470253F0c9C7AfBAe7F61795d6b1ca4644b2f",
    "0xe436C6457debB8787e0F980A578Ea7236148e13A",
    "0xE4a7ecCE2a23147c5c6C9e4439584Cd8c16b718c",
    "0xE55c9840eb6Ba1c75160Ed611E3C72Bc438dCA54",
    "0xe8a1807534a6f5a6fdfc29e85c00db55f2e165fb",
    "0xe9308a788B772CbF07532F978c8b415Af8A1AAb0",
    "0xebBED82Aeb6b22EF0deC60dc17686597264E7A13",
    "0xeEAF61935C0c48f8F8cC28C381683d7fA2F75E1c",
    "0xEf8959fa57A0bB18CF9B8366EBd277d673f5cC5E",
    "0xEfF3554CeabeAFa42D92F539BF71C713F5dA5e06",
    "0xF16333855163507aC1Bd96D949D73a1A719E28ac",
    "0xf2565FD865648012da5b8c4c8a6B444E244ed250",
    "0xf3860788D1597cecF938424bAABe976FaC87dC26",
    "0xF602CA13051127ab710b6B2CD64DeDFcab19B8ad",
    "0xF80120de11Abc4faFbf22019244cca063245AD62",
    "0xF9C58eeA107f9eaa891F1bce730Bf4de902465A6",
    "0xfaa701a300d627942733Cc0B1e60BCF490cF25b1",
    "0xfD41bEf1Fd45D7db65fb8f4cD3804e4C8DAfF6b9",
    "0xfF3FA27B5d7b544f81e6E5987Eba3CCC62d2202D",
    '0x025186B043BE57cB9B4AdC04F1F83b8d49C66196'

];

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