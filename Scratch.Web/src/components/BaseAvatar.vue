<template>
  <img :src="imageSrc" alt="">
</template>

<script>
import michaeal from '@/assets/img/users/michael.jpg';

export default {
  name: 'BaseAvatar',
  props: {
    src: {
      type: String,
      default: ''
    },
  },
  computed: {
    imageSrc() {
      return this.src ? `${this.src}` : michaeal;
    }
  }
};
</script>

<style lang="scss">
</style>
