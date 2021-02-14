<template>
  <div class="checkbox">
    <div class="checkbox__item" @click="toggle">
      <input
        type="checkbox"
        class="checkbox__checkbox-item"
        :name="checkbox.name"
        :id="checkbox.id"
      />
      <div
        class="checkbox__checkbox-input"
        :class="checkbox.checked ? 'checkbox__checkbox-input_checked' : ''"
      ></div>
      <label class="checkbox__label" :for="checkbox.name">{{
        checkbox.title
      }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    checkbox: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggle() {
      this.$emit("toggleCheckbox");
    },
  },
};
</script>
