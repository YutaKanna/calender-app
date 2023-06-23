import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // カスタムカラーパレットの設定
    themes: {
      light: {
        primary: '#2196f3',
        secondary: '#ff4081',
        accent: '#9c27b0',
      },
    },
  },
});