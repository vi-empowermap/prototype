import { angeboteBP, bundeslandBP, sprachunterstutzungBP, themenschwerpunktBP, zielgruppeBP } from "./blueprintOptionData"
import { RANDOMCOLOR_LIST } from "./colors"
import { RANDOM_FONT_LIST } from "./fontList"

export const category = ['banana', 'blabal', 'car', 'daon', 'df', 'xasdflj']
const randomColorList = RANDOMCOLOR_LIST

export const fakeData = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    const dataList = [
        {
            id: 0,
            name: "example0",
            organame: "exmaple0",
            location : {
                lat: parseFloat("52.5429"),
                lon: parseFloat("13.3593"),
                city: "Berlin",
                country: "daf",
                countryCode: "de",
                osm: "23123"

            },
            orgaimage: '',
            zielgruppe: [Object.keys(zielgruppeBP)[Math.floor(Math.random() * Object.keys(zielgruppeBP).length)]],
            font:RANDOM_FONT_LIST[Math.floor(Math.random() * RANDOM_FONT_LIST.length)],
            lokalorga: "false",
            visible: true,
            filterVisible: true,
            aboutorga: "Brachte dus gerbers stickig die. Sprach heimat und ruhmte zeitig eck wichse. So da frei ob brot da alte sage dran. Eia zog darin mir genie der dahin denen. Um erschrak gelandes ja la arbeiter he. Zu leuchtete es ja flanierte kraftiger.", 
            categories: ["car"],
            artderorganisation: ["a"],
            archivoraktiv: "aktive",
            themenschwerpunkt:["a", "b"],
            angebote:["a"],
            sprachunterstutzung:["a"],
            bundesland: Object.keys(bundeslandBP)[Math.floor(Math.random() * Object.values(bundeslandBP).length)],
            bgColor: randomColorList[Math.floor(Math.random() * randomColorList.length)]
        },
       
    ]
    for (let i = 0; i < 100; i++){
        const data = {
            id: i + 1 ,
            name: "example" + (i + 1),
            organame: "example" + (i + 1),
            location : {
                lat: 51.1657 + ((Math.random() - 0.5) * (Math.random() * 8)),
                lon: 10.4515 + ((Math.random() - 0.5) * (Math.random() * 8)),
                city: "Berlin",
                country: "daf",
                countryCode: "de",
                osm: "23123"

            },
            orgaimage: '',
            angebote:[Object.keys(angeboteBP)[Math.floor(Math.random() * Object.keys(angeboteBP).length)]],
            zielgruppe: [Object.keys(zielgruppeBP)[Math.floor(Math.random() * Object.keys(zielgruppeBP).length)]],
            sprachunterstutzung: [[...Object.keys(sprachunterstutzungBP)][Math.floor(Math.random() * Object.values(sprachunterstutzungBP).length)]],
            font:RANDOM_FONT_LIST[Math.floor(Math.random() * RANDOM_FONT_LIST.length)],
            filterVisible: true,
            lokalorga: Math.random() > 0.4 ? "false" : "true",
            bgColor: randomColorList[Math.floor(Math.random() * randomColorList.length)],
            visible: false,
            aboutorga: ((Math.random() > 0.5) ? "Erstaunt unbeirrt schonste fu neustadt zunachst zu feinsten ab ri. Gehts empor wuchs du wu. Gut wir auf ruhmte kammer nur dessen. He halboffene mu scherzwort nachtessen er aneinander um. Gedacht schonen antwort wo so gewogen anderen ri kleines. Kommt mir her ruhig meine. Lernt damit da pa schen du nobel da gluck. Wu es marktplatz ri pa stockwerke nachmittag bangigkeit. Ruh herauf lassen angeht kinder der als gab." : "Wachsam wer schones barbele gewogen ein eigenes. Pa en so bist ja eile hals sein euer. Bett und sage weg mirs gelt fur dort. Kartoffeln halboffene ob ungerechte vertreiben lehrlingen te. Brotkugeln vorpfeifen neidgefuhl zu erhaltenen so es nachtessen geheiratet. Wollen herauf leisen rothfu freude aus nah. Gerbers unrecht te in zwiebel an."),
            categories: [category[Math.floor(Math.random() * category.length)]],
            artderorganisation: ["a", "b", "c", "d", "e", "f"][Math.floor(Math.random() * 6)],
            archivoraktiv: Math.random() > 0.5 ? "aktive" : "archiv",
            bundesland: Object.keys(bundeslandBP)[Math.floor(Math.random() * Object.values(bundeslandBP).length)],
            themenschwerpunkt: [Object.keys(themenschwerpunktBP)[Math.floor(Math.random() * Object.keys(themenschwerpunktBP).length)]],
        }
        dataList.push(data)
    }


    return dataList;
}