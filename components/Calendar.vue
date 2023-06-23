<template>
  <div>
    <v-app>
      <v-sheet tile color="grey lighten-3" class="d-flex align-center">
        <v-btn outlined small class="ma-4" @click="setToday"> 今日 </v-btn>
        <v-btn icon @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-sheet>
      <v-sheet height="93vh">
        <v-calendar
          ref="calendar"
          v-model="value"
          :events="events"
          :event-color="getEventColor"
          locale="ja-jp"
          :day-format="(timestamp) => new Date(timestamp.date).getDate()"
          :month-format="
            (timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'
          "
          @change="getEvents"
          @click:event="showEvent"
          @click:date="openDialog"
        ></v-calendar>

        <v-dialog
          persistent
          max-width="600px"
          v-model="dialogOpen"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Open Dialog
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="Legal first name*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="Legal middle name"
                      hint="example of helper text only on focus"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="Legal last name*"
                      hint="example of persistent helper text"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Password*"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-select
                      :items="['0-17', '18-29', '30-54', '54+']"
                      label="Age*"
                      required
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-autocomplete
                      :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                      label="Interests"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closeDialog"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="closeDialog"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-app>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      events: [], // カレンダーに表示するイベントの配列
      value: moment().format("yyyy-MM-DD"),
      dialogOpen: false, // ダイアログの開閉状態
      selectedDate: null, // 選択された日付
      dialog: false,
    };
  },
  computed: {
    title() {
      return moment(this.value).format("yyyy年 M月");
    },
  },
  methods: {
    setToday() {
      this.value = moment().format("yyyy-MM-DD");
    },
    showEvent({ event }) {
      alert(`clicked ${event.name}`);
    },
    viewDay({ date }) {
      alert(`date: ${date}`);
    },
    getEvents() {
      const events = [
        // new Dateからmomentに変更
        {
          name: "会議",
          start: moment("2023-06-23 10:00:00").toDate(),
          end: moment("2023-06-23 11:00:00").toDate(),
          color: "blue",
          timed: true,
        },
        // イベントを追加
        {
          name: "休暇",
          start: moment("2023-06-24").toDate(),
          end: moment("2023-06-24").toDate(),
          color: "green",
          timed: false,
        },
        {
          name: "出張",
          start: moment("2023-06-25").toDate(),
          end: moment("2023-06-27").toDate(),
          color: "cyan",
          timed: false,
        },
        {
          name: "飲み会",
          start: moment("2023-06-25").toDate(),
          end: moment("2023-06-25").toDate(),
          color: "orange",
          timed: false,
        },
        {
          name: "打ち合わせ",
          start: moment("2023-06-29 10:00").toDate(),
          end: moment("2023-06-29 11:00").toDate(),
          color: "cyan",
          timed: true,
        },
        {
          name: "振り返り",
          start: moment("2023-06-26 11:00:00").toDate(),
          end: moment("2023-06-26 12:00").toDate(),
          color: "cyan",
          timed: true,
        },
        {
          name: "休暇",
          start: moment("2023-07-07").toDate(),
          end: moment("2023-07-11").toDate(),
          color: "green",
          timed: false,
        },
      ];
      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    openDialog(date) {
      this.selectedDate = date;
      this.dialogOpen = true;
    },
    closeDialog() {
      this.dialogOpen = false;
      this.selectedDate = null;
    }
  },
};
</script>
