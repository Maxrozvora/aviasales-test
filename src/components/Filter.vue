<template>
  <div class="card">
    <div class="card__title">Количество пересадок</div>
    <CheckBox @toggleCheckbox="toggleAllCheckbox" :checkbox="allCheckbox" />
    <CheckBox
      v-for="item in checkboxes"
      @toggleCheckbox="toggleCheckbox(item)"
      :key="item.id"
      :checkbox="item"
    />
  </div>
</template>

<script>
import CheckBox from "./CheckBox";
export default {
  components: { CheckBox },
  name: "FilterComponent",
  comments: { CheckBox },
  props: {
    checkboxes: { type: Array, required: true },
  },
  data() {
    return {
      allCheckbox: {
        id: 1,
        name: "all",
        transfer: "all",
        checked: false,
        title: "Все",
      },
    };
  },
  methods: {
    toggleCheckbox({ id }) {
      const checkboxes = this.checkboxes.map((item) => {
        if (id === item.id) item.checked = !item.checked;
        return item;
      });

      this.$emit("changeCheckboxes", checkboxes);

      const checkedAll = checkboxes.every((item) => item.checked);
      this.allCheckbox.checked = checkedAll;
    },
    toggleAllCheckbox() {
      const all = this.allCheckbox;
      all.checked = !all.checked;
      const checkboxes = this.checkboxes.map((item) => {
        item.checked = all.checked;
        return item;
      });

      this.$emit("changeCheckboxes", checkboxes);
    },
  },
};
</script>

