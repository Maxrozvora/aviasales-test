<template>
  <div class="btn-group">
    <button
      class="btn"
      :class="sort === 1 ? 'btn_primary' : ''"
      @click="sortBy(1)"
    >
      Самый дешевый
    </button>
    <button
      class="btn"
      :class="sort === 2 ? 'btn_primary' : ''"
      @click="sortBy(2)"
    >
      Самый быстрый
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonGroup",
  props: {
    sort: { type: Number },
  },
  methods: {
    sortBy(order) {
      this.$emit("sortBy", order);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>