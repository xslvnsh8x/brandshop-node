const FilterComponent = {
  data() {
    return {
      userSearch: ''
    }
  },
  template: `
    <form
        action="#"
        class="header__search"
        @submit.prevent="$parent.$refs.products.filter(userSearch)"
    >
      <input
          type="text"
          class="header__search-input"
          v-model="userSearch"
      />
      <button type="submit" class="header__search-btn">
        <i class="header__search-icon fas fa-search"></i>
      </button>
    </form>
  `
};

export default FilterComponent;