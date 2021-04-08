<template>
<div class="t-place" >
  <div class="t" :class="{off:signal}">
    <div class="t-head">
        <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#0fcc28"></rect></svg>
      <span class="text-center display-5 fs-5 ">SUCCESFULLY ADDED</span>
      
    </div>
  </div>
</div>
</template>

<script>

export default {
props: ["signal"]    
}
</script>

<style scoped>
.t-head {
  display: flex;
  align-items: center;
  padding: 1.5rem 1.75rem;
  color: black;
  background-color: rgba(255, 255, 255, 0.85);
  background-clip: padding-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
}

.t {
    width: 350px;
    max-width: 100%;
    font-size: .875rem;
    pointer-events: auto;
    background-color: rgba(255,255,255,.85);
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.1);
    box-shadow: 0 0.5rem 3rem rgb(0 0 0 / 15%);
    border-radius: .25rem;
    transition: 0.7s;
    transition-timing-function: cubic-bezier(0, 0.03, 0.24, 1.55);
    
}

.t-place{
    z-index: 5;
    padding: 1rem !important;
    display: flex;
    right: 0 !important;
    bottom: 0 !important;
    position: fixed !important;
    justify-content: flex-end;
    
}

.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
}
.me-2 {
    border-radius: .25rem!important;
    margin-right: .5rem!important;
    vertical-align: middle;
}

.off{
    margin-right: -452px;
    transition: 0.7s;
    
}
</style>
