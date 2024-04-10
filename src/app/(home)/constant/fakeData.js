
export const category = ["car", "bike", "bus", "train"]

export const fakeData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
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
            categories: []
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
          
            visible: false,
            description: "Hi! I'm Sein Orga" + ((Math.random() > 0.5) ? " Vis" : " Udk"),
            categories: [category[Math.floor(Math.random() * category.length)]]
        }
        dataList.push(data)
    }


    return dataList;
}