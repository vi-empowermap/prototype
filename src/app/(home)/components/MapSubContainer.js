const MapSubContainer = ({children, search, turnOnMap, orgaMapSize, ready}) => {
    return (
        <div id="mapCotainer" style={{ width: Boolean(search) ? (turnOnMap ? `${orgaMapSize}px` : "100%") : "100%" }} className={`flex-1 bg-white flex overflow-hidden relative ${!ready ? "opacity-0" : "opacity-100"} font-jetBrainsMono font-medium`}>
            {children}
        </div>
    )
}

export default MapSubContainer;