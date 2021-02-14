<template>
  <div class="row">
    <div class="col">
      <div class="ticket__title">
        {{ segment.origin }} – {{ segment.destination }}
      </div>
      <div class="ticket__info">{{ getStartEndTime }}</div>
    </div>
    <div class="col">
      <div class="ticket__title">В пути</div>
      <div class="ticket__info">{{ getTimeInFly }}</div>
    </div>
    <div class="col">
      <div class="ticket__title">{{ getTransferTitle }}</div>
      <div class="ticket__info">{{ segment.stops.toString() }}</div>
    </div>
  </div>
</template>

<script>
import formatTime from "./../utils/timeFormatter";
export default {
  name: "TicketRow",
  props: {
    segment: { type: Object },
  },
  computed: {
    getStartEndTime() {
      const dateStart = new Date(Date.parse(this.segment.date));
      const dateFinish = new Date(dateStart.getTime());
      dateFinish.setMinutes(dateFinish.getMinutes() + this.segment.duration);
      return `${formatTime(dateStart)} - ${formatTime(dateFinish)}`;
    },
    getTimeInFly() {
      const mins = this.segment.duration;
      let hours = Math.trunc(mins / 60);
      let minutes = mins % 60;
      return `${hours}ч ${minutes}м`;
    },
    getTransferTitle() {
      const amount = this.segment.stops.length;
      let string = `${amount} пересад`;
      if (
        (amount > 10 && amount < 20) ||
        [0, 5, 6, 7, 8, 9].indexOf(amount) >= 0
      ) {
        string += "ок";
      } else if (amount === 1) {
        string += "ка";
      } else {
        string += "ки";
      }

      if (!amount) string = "Без пересадок";

      return string;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>