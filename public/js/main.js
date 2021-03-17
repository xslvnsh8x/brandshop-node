import ProductsComponent from './productComp';
import CartComponent from "./cartComp";
import FilterComponent from "./filterComp";
import ErrorComponent from "./errorComp";
import '../css/main.css';

new Vue({
  el: "#app",
  data: {
    userSearch: '',
  },
  components: {
    'products': ProductsComponent,
    'cart': CartComponent,
    'search': FilterComponent,
    'error': ErrorComponent
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          // console.log(error)
          this.$refs.error.text = error;
        })
    },
    postJson(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => {
          // console.log(error)
          this.$refs.error.text = error;
        })
    },
    putJson(url, data) {
      return fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => {
          // console.log(error)
          this.$refs.error.text = error;
        })
    },
    deleteJson(url, data) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => {
          // console.log(error);
          this.$refs.error.text = error;
        })
    }
  },
  mounted() {
  }
});
