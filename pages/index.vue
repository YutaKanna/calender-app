<template>
  <div>
    <Calendar />
  </div>
</template>

<script>
import Event from "~/models/Event";
import firebase from "~/plugins/firebase.js";
import Calendar from "~/components/Calendar.vue";

export default {
  components: {
    Calendar,
  },
  data() {
    return {
      title: "",
      start: "",
      end: "",
      events: [],
    };
  },
  async mounted() {
    this.events = await Event.getAll();
  },
  methods: {
    async saveEvent() {
      const event = new Event({
        title: this.title,
        start: this.start,
        end: this.end,
      });
      await event.save();
      this.events.push(event);
      this.title = "";
      this.start = "";
      this.end = "";
    },
    async deleteEvent(eventId) {
      const index = this.events.findIndex((event) => event.id === eventId);
      if (index !== -1) {
        const event = this.events[index];
        await event.delete();
        this.events.splice(index, 1);
      }
    },
  },
};
</script>
