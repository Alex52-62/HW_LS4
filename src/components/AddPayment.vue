<template>
  <div class="Hi">
    <button class="green" @click="toggleElement">
      ADD NEW COST &nbsp; &nbsp; &nbsp;+
    </button>
    <br />
    <div class="paymentForm" v-if="isElVisible">
      <input
        v-model.trim="category"
        id="myInp"
        placeholder="Payment description"
      />
      <input
        v-model.number="value"
        type="number"
        placeholder="Payment ammount"
      />
      <input v-model="date" placeholder="Payment date" />

      <button class="green" @click="onClick">ADD &nbsp; &nbsp; &nbsp; +</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPayment",
  props: {
    catSl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      date: "",
      category: "",
      value: null,
      isElVisible: false,
    };
  },
  methods: {
    onClick() {
      const { category, value } = this;
      const data = {
        date: this.date || this.getCurrentDate,
        category,
        value,
      };
      console.log("add", data);
      //Вызов события, название события и аргументы
      this.$emit("addNewPayment", data);
    },
    toggleElement() {
      this.isElVisible = !this.isElVisible;
    },
  },
  watch: {
    catSl: {
      handler(catSL) {
        this.category = catSL
      },
      immediate: true
    }
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
};
</script>

<style scoped>
.paymentForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.green {
  background-color: rgb(0, 168, 155);
  color: white;
  padding: 5px 20px;
}

input {
  font-size: small;
  opacity: 0.6;
  padding: 10px;
}

.Hi {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>