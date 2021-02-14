<template>
  <div class="card my">
    <div class="ticket">
      <div class="ticket__heading">
        <div class="ticket__price">{{ ticket.price }} Р</div>
        <div class="ticket__logo">
          <img
            :src="`//pics.avs.io/99/36/${ticket.carrier}.png`"
            alt="company name"
          />
        </div>
      </div>
      <TicketRow
        v-for="(segment, i) in ticket.segments"
        :key="i"
        :segment="segment"
      />
    </div>
  </div>
</template>

<script>
import TicketRow from "./TicketRow.vue";
export default {
  name: "Ticket",
  components: { TicketRow },
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>