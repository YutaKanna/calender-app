<template>
  <div>
    <h1>カレンダー</h1>
    <div>
      <input v-model="title" placeholder="タイトル" />
      <input type="datetime-local" v-model="start" />
      <input type="datetime-local" v-model="end" />
      <button @click="saveEvent">イベントを保存</button>
    </div>
    <ul>
      <li v-for="event in events" :key="event.id">
        <span>{{ event.title }}</span>
        <button @click="deleteEvent(event.id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Event from "~/models/Event";
import firebase from "~/plugins/firebase.js";

export default {
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
