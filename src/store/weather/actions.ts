export default {
  async sendData({ dispatch, commit }: any, payload: any) {
    // if exist
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${payload.city}&units=metric&appid=93d71fee8b9fabde47f81589d838ab02`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      commit("addToWeather", payload);
      dispatch("sendToBase", payload);
    } else {
      const err = new Error("City not found");
      throw err;
    }
  },
  async sendToBase(_: any, payload: any) {
    const response = await fetch(
      `https://weather-app-999-default-rtdb.firebaseio.com/${payload.userId}/cities.json?auth=${payload.userToken}`,
      {
        method: "POST",
        body: JSON.stringify({
          city: payload.city,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error("Couldnt send data to firebase");
      throw err;
    } else {
      console.log(responseData);
    }
  },
  async userDataOnLogin(context: any, payload: any){
    const response = await fetch(`https://weather-app-999-default-rtdb.firebaseio.com/${payload.userId}/cities.json?auth=${payload.userToken}`, {
      method: "GET"
    });

    const responseData = await response.json();

    if(!response.ok){
      console.log("ERROR WITH GET DATA");
    }else{
      for(const key in responseData){
        const city = responseData[key].city;
      context.commit("addToWeather", {city: city})
      }
    }
  }
};
