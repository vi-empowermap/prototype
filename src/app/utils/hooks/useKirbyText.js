const useKirbyText = ({text}) => {
    return `${String(text).slice(0,1).toUpperCase()}${String(text).slice(1)}`
}   
export default useKirbyText