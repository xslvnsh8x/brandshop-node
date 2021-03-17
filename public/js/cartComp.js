const cartItem = {
  props: ['cartItem', 'img'],
  template: `
    <div class="basket__item">
    <div class="basket__item-image">
      <img :src="cartItem.img" alt="product-image" class="basket__item-imagePic"/>
    </div>
    <div class="basket__item-desc">
      <h3 class="basket__item-descTitle">{{ cartItem.product_name }}</h3>
      <div class="basket__item-desc-qty">
        <div class="basket__item-desc-qtyControl" @click="$emit('minus', cartItem)">
          <i class="basket__item-desc-qtyIcon fas fa-minus"></i>
        </div>
        <span class="basket__item-desc-qtyText">{{ cartItem.quantity }} шт.</span>
        <div class="basket__item-desc-qtyControl" @click="$emit('add', cartItem)">
          <i class="basket__item-desc-qtyIcon fas fa-plus"></i>
        </div>
      </div>
      <p class="basket__item-descPrice">
        &dollar; {{ cartItem.price }} / &dollar; {{ cartItem.quantity * cartItem.price }}
      </p>
    </div>
    <button
        type="button"
        class="basket__item-action"
        @click="$emit('remove', cartItem)"
    ><i class="basket__item-actionIcon far fa-times-circle"></i>
    </button>
    </div>
  `
};

const CartComponent = {
  components: {cartItem},
  props: ['cart'],
  data() {
    return {
      cartUrl: '/getBasket.json',
      cartItems: [],
      showCart: false
    }
  },
  mounted() {
    this.$parent.getJson(`/api/cart`)
      .then(data => {
        for (let el of data.contents) {
          this.$data.cartItems.push(el);
        }
      });
  },
  methods: {
    addProduct(item) {
      let find = this.cartItems.find(el => el.id_product === item.id_product);
      if (find) {
        this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
          .then(data => {
            if (data.result === 1) {
              find.quantity++
            }
          })
      } else {
        const prod = Object.assign({quantity: 1}, item);
        this.$parent.postJson(`/api/cart`, prod)
          .then(data => {
            if (data.result === 1) {
              this.cartItems.push(prod)
            }
          })
      }
    },
    decreaseProduct(item) {
      if (item !== undefined) {
        if (item.quantity > 1) {
          this.$root.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
            .then(data => {
              if (data.result === 1) {
                item.quantity--;
              }
            })
        } else {
          this.$root.deleteJson(`/api/cart/${item.id_product}`)
            .then(data => {
              if (data.result === 1) {
                this.cartItems.splice(this.cartItems.indexOf(item), 1);
              }
            })
        }
      } else {
        this.$root.deleteJson(`/api/cart/99999999`)
          .then(data => {
            if (data.result === 1) {
              this.cartItems = [];
            }
          })
      }
    },
    removeProduct(item) {
      this.$root.putJson(`/api/cart/${item.id_product}`, {quantity: - item.quantity + 1})
        .then(data => {
          if (data.result === 1) {
            item.quantity = 0;
          }

          this.$root.deleteJson(`/api/cart/${item.id_product}`)
            .then(data => {
              if (data.result === 1) {
                this.cartItems.splice(this.cartItems.indexOf(item), 1);
              }
            })
        })
    }
  },
  template: `
    <div class="header__cart">
    <button class="header__cart-btn" type="button" @click="showCart = !showCart">
      <i class="header__cart-icon fas fa-shopping-cart"></i>
    </button>
    <div class="basket" v-show="showCart">
      <cartItem
          v-for="item of cartItems"
          :key="item.id_product"
          :cart-item="item"
          @add="addProduct"
          @remove="removeProduct"
          @minus="decreaseProduct"
      ></cartItem>
      <span v-if="!cartItems.length" class="basket__empty">No products. Add something</span>
    </div>
    </div>
  `
};

export default CartComponent;