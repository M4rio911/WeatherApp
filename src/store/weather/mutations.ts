export default{
    addToWeather(state:any, payload: any){
        state.cities.push(payload.city);
    }
}