<template>
  <div id="app">
    <div class="container">
      <div class="logo">
        <img src="@/assets/img/logo.svg" alt="aviasales" />
      </div>
      <div class="row">
        <div class="left-block">
          <FilterComponent
            :checkboxes="checkboxes"
            @changeCheckboxes="changeCheckboxes"
          />
        </div>
        <div class="right-block">
          <ButtonGroup @sortBy="sortBy" :sort="sort" />
          <Ticket
            v-for="(ticket, id) in getTickets"
            :key="id"
            :ticket="ticket"
          />
          <button class="btn btn_primary btn_block" @click="loadMore">
            Показать еще 5 билетов!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterComponent from "./components/Filter.vue";
import ButtonGroup from "./components/ButtonGroup.vue";
import Ticket from "./components/Ticket.vue";
import axios from "axios";
import sortTicketsBy from "./utils/sortType";
export default {
  name: "App",
  components: { FilterComponent, ButtonGroup, Ticket },
  data() {
    return {
      tickets: [],
      checkboxes: [
        {
          id: 1,
          name: "without",
          transfer: 0,
          checked: true,
          title: "Без пересадок",
        },
        {
          id: 2,
          name: "one",
          transfer: 1,
          checked: true,
          title: "1 пересадка",
        },
        {
          id: 3,
          name: "two",
          transfer: 2,
          checked: false,
          title: "2 пересадка",
        },
        {
          id: 4,
          name: "tree",
          transfer: 3,
          checked: false,
          title: "3 пересадка",
        },
      ],
      amountTickets: 5,
      filterKeys: [0, 1, 2, 3],
      sort: 1,
    };
  },
  computed: {
    getTickets() {
      // sort tickets by price or time
      const value = [...this.tickets].sort((a, b) => {
        if (this.sort === sortTicketsBy.byPrice) return a.price - b.price;
        if (this.sort === sortTicketsBy.byTime) {
          const durationA = a.segments.reduce((acc, s) => acc + s.duration, 0);
          const durationB = b.segments.reduce((acc, s) => acc + s.duration, 0);
          return durationA < durationB ? -1 : 1;
        }
      });

      // filtered by transfers
      const filtered = value.filter((item) => {
        let result = true;
        const lengths = this.filterKeys.filter(
          (key) => this.checkboxes[key].checked
        );
        result =
          result &&
          item.segments.reduce(
            (acc, s) => acc || lengths.indexOf(s.stops.length) >= 0,
            false
          );
        return result;
      });

      // slice tickets
      const res = filtered.slice(0, this.amountTickets);
      return res;
    },
  },
  methods: {
    loadMore() {
      this.amountTickets += 5;
    },
    sortBy(sort) {
      this.sort = sort;
    },
    changeCheckboxes(checkboxes) {
      this.checkboxes = checkboxes;
    },
  },
  async mounted() {
    try {
      const { data } = await axios.get(
        "https://front-test.beta.aviasales.ru/search"
      );
      const {
        data: { tickets },
      } = await axios.get(
        `https://front-test.beta.aviasales.ru/tickets?searchId=${data.searchId}`
      );
      this.tickets = tickets;
    } catch (e) {
      throw new Error(`Error occured ${e}`);
    }
  },
};
</script>

<style lang="sass">
@import "@/styles/main"
</style>
