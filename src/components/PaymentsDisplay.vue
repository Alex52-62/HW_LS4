<template>
  <div class="payments-list">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>date</th>
          <th>
            category
            <select v-model="selected">
              <option
                v-for="(category, sl) in getCategoryList"
                @submit="getSelected()"
                :key="sl"
              >
                {{ category }}
              </option>
            </select>
          </th>
          <th>
            <input 
            class="i" 
            v-model.trim="category"
             @keyup.enter="addCat(category)" 
            placeholder="add category" 
            />
          </th>
          <th>value</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, idx) in list" :key="idx">
          <td>{{ idx + 1 }}</td>
          <td>{{ item.date }}</td>
          <td align="center">{{ item.category }}</td>
          <td></td>
          <td align="center">{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PaymentsDisplay",
  methods: {
    addCat(category) {
      this.$emit("addNewCategory",category);
      console.log("addNewCategory",category);
    },
  },
  watch: {
    selected() {
      const sl = this.selected;
      this.$emit("sendSelected", sl);
    },
  },
  computed: {
    getCategoryList() {
      return this.$store.getters.getCategoryList;
    },
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: "",
      category: "",
    };
  },
};
</script>

<style scoped>
.payments-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid grey;
  width: 60%;
  margin: auto;
  padding-bottom: 30px;
}

td {
  border-bottom: 1px solid grey;
}

th {
  padding: 20px;
}

.i {
  width: 120px;
  background-color: #fff3ce;
}
</style>