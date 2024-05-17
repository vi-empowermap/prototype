import { angeboteBP, sprachunterstutzungBP, themenschwerpunktBP, zielgruppeBP } from "./blueprintOptionData"
import { RANDOMCOLOR_LIST } from "./colors"
import { RANDOM_FONT_LIST } from "./fontList"

export const category = ['banana', 'blabal', 'car', 'daon', 'df', 'xasdflj']
const randomColorList = RANDOMCOLOR_LIST

export const fakeData = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    const dataList = [
        {
            id: 0,
            name: "orga1",
            organame: "visvis",
            location : {
                lat: parseFloat("52.5429"),
                lon: parseFloat("13.3593"),
                city: "Berlin",
                country: "daf",
                countryCode: "de",
                osm: "23123"

            },
            zielgruppe: [Object.keys(zielgruppeBP)[Math.floor(Math.random() * Object.keys(zielgruppeBP).length)]],
            font:RANDOM_FONT_LIST[Math.floor(Math.random() * RANDOM_FONT_LIST.length)],
            lokalorga: "false",
            visible: true,
            filterVisible: true,
            aboutorga: "Hi! I'm Dain Orga", 
            categories: ["car"],
            artderorganisation: ["a"],
            archivoraktiv: "aktive",
            themenschwerpunkt:["a", "b"],
            angebote:["a"],
            sprachunterstutzung:["a"],
            bgColor: randomColorList[Math.floor(Math.random() * randomColorList.length)]
        },
       
    ]
    for (let i = 0; i < 100; i++){
        const data = {
            id: i + 1 ,
            name: "orga user" + (i + 1),
            organame: "orga" + (i + 1),
            location : {
                lat: 51.1657 + ((Math.random() - 0.5) * (Math.random() * 8)),
                lon: 10.4515 + ((Math.random() - 0.5) * (Math.random() * 8)),
                city: "Berlin",
                country: "daf",
                countryCode: "de",
                osm: "23123"

            },
            angebote:[Object.keys(angeboteBP)[Math.floor(Math.random() * Object.keys(angeboteBP).length)]],
            zielgruppe: [Object.keys(zielgruppeBP)[Math.floor(Math.random() * Object.keys(zielgruppeBP).length)]],
            sprachunterstutzung: [[...Object.keys(sprachunterstutzungBP)][Math.floor(Math.random() * Object.values(sprachunterstutzungBP).length)]],
            font:RANDOM_FONT_LIST[Math.floor(Math.random() * RANDOM_FONT_LIST.length)],
            filterVisible: true,
            lokalorga: Math.random() > 0.4 ? "false" : "true",
            bgColor: randomColorList[Math.floor(Math.random() * randomColorList.length)],
            visible: false,
            aboutorga: "Hi! I'm Sein Orga" + ((Math.random() > 0.5) ? " Vis" : " Udk"),
            categories: [category[Math.floor(Math.random() * category.length)]],
            artderorganisation: ["a", "b", "c", "d", "e", "f"][Math.floor(Math.random() * 6)],
            archivoraktiv: Math.random() > 0.5 ? "aktive" : "archiv",
            themenschwerpunkt: [Object.keys(themenschwerpunktBP)[Math.floor(Math.random() * Object.keys(themenschwerpunktBP).length)]],
        }
        dataList.push(data)
    }


    return dataList;
}