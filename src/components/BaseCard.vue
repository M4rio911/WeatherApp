<template>
  <div class="">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component
          :is="Component"
          class="my-4 p-3 border bg-light border-primary border-2 rounded-3"
        />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-enter-to {
  position: absolute;
  right: 8%;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 8%;
}
</style>
