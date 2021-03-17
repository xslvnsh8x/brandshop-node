const ProductComponent = {
  props: ['product', 'img'],
  template: `
    <div class="catalog__products-item">
      <div class="catalog__products-item-image">
        <img :src="product.img" alt="product-image" class="catalog__products-item-imagePic"/>
      </div>
      <div class="catalog__products-item-info">
        <h3 class="catalog__products-item-infoTitle">
          {{ product.product_name }}
        </h3>
        <p class="catalog__products-item-infoPrice">
          &dollar; {{ product.price }}
        </p>
        <button
            class="catalog__products-item-infoButton"
            @click="$emit('add-product', product)"
        >Add to cart
        </button>
      </div>
    </div>
  `
};

const ProductsComponent = {
  data() {
    return {
      catalogUrl: '/catalogData.json',
      filtered: [],
      products: [],
    }
  },
  components: {
    'product': ProductComponent
  },
  mounted() {
    this.$parent.getJson(`/api/products`)
      .then(data => {
        for (let el of data) {
          this.$data.products.push(el);
          this.$data.filtered.push(el);
        }
      });
  },
  methods: {
    filter(userSearch) {
      let regexp = new RegExp(userSearch, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    }
  },
  template: `
    <div>
      <p class="catalog__nodata" v-show="!filtered.length">No data</p>
      <div class="catalog__products">
        <product
            v-for="item of filtered"
            :key="item.id_product"
            :product="item"
            @add-product="$parent.$refs.cart.addProduct"
        ></product>
      </div>
    </div>
  `
};

export default ProductsComponent