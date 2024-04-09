export const fakeData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const dataList = [
        {
            id: 0,
            name: "orga1",
            pos: {
                lat: 52.5429,
                lng: 13.3593
            },
            visible: true,
            description: "Hi! I'm Dain Orga"
        },
        {
            id: 1,
            name: "orga2",
            pos: {
                lat: 52.6429,
                lng: 13.4593
            },
            visible: false,
            description: "Hi! I'm Dain Orga"
        },
        {
            id: 2,
            name: "orga3",
            pos: {
                lat: 52.2429,
                lng: 13.2593
            },
            visible: false,
            description: "Hi! I'm Dain Orga"
        },
    ]
    for (let i = 0; i < 50; i++){
        const data = {
            id: i + 3,
            name: "orga" + (i + 4),
            pos: {
                lat: 52.5429 + ((Math.random() - 0.5) * Math.random()),
                lng: 13.3593 + ((Math.random() - 0.5) * Math.random())
            },
            visible: false,
            description: "Hi! I'm Sein Orga" + ((Math.random() > 0.5) ? " Vis" : " Udk")
        }
        dataList.push(data)
    }


    return dataList;
}