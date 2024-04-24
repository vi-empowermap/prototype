
export const category = ["car", "bike", "bus", "train"]
const randomColorList = ["#8C0B23", "#D971AA", "#5D5ABF", "#0468BF", "#A66A21"]

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
            visible: true,
            aboutorga: "Hi! I'm Dain Orga", 
            categories: [],
            artderorganisation: "xx",
            bgColor: randomColorList[Math.floor(Math.random() * randomColorList.length)]
        },
       
    ]
    for (let i = 0; i < 10; i++){
        const data = {
            id: i + 1 ,
            name: "orga user" + (i + 1),
            organame: "orga" + (i + 1),
            location : {
                lat: 52.5429 + ((Math.random() - 0.5) * Math.random()),
                lon: 13.3593 + ((Math.random() - 0.5) * Math.random()),
                city: "Berlin",
                country: "daf",
                countryCode: "de",
                osm: "23123"

            },
            bgColor: randomColorList[Math.floor(Math.random() * randomColorList.length)],
            visible: false,
            aboutorga: "Hi! I'm Sein Orga" + ((Math.random() > 0.5) ? " Vis" : " Udk"),
            categories: [category[Math.floor(Math.random() * category.length)]],
            artderorganisation: Math.floor(Math.random() * 3) === 0 ? "xx" : Math.floor(Math.random() * 3) === 1 ? "yy" : "zz"
        }
        dataList.push(data)
    }


    return dataList;
}