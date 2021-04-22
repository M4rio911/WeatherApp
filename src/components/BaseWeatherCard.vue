<template>
<div class="p-3">

    <div class="card pb-3">
      <div class="card-body">
        <h5 class="card-title display-4">{{city}}</h5>
        <hr>
        <p class="card-text text-center fs-4">
          {{weather}} <span><img class="ms-3" :src="require('../img/weather/'+ weather.toLowerCase() +'.png')" alt="pic"></span>
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Temperature: <span>{{temp + "°C"}}</span></li>
        <li class="list-group-item">Pressure: <span>{{pressure + "hPa"}}</span></li>
        <li class="list-group-item">Humidity: <span>{{humidity + "%"}} </span></li>
      </ul>
      <!-- <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div> -->
    </div>
</div>
</template>

<script>
export default {
    props: ["city","pressure","temp","humidity","weather"],
    
}
</script>

<style scoped>
p, li{
  font-family: 'Montserrat', sans-serif;
}

li{
  display: flex;
  justify-content: space-between
};

.card{
  box-sizing: border-box;
  border: transparent !important;
}

img{
  max-width: 2.5vw;
}

</style>