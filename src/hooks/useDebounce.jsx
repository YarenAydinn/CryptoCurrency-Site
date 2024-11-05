const useDebounce = (callback,delay)=>{
    let timer;
    console.log(delay);
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { 
            callback(args) 
            console.log("DEbounce");
        }, delay);
    };
}
export default useDebounce;

const useDebouncecopy=(callback,delay)=>{
    
}