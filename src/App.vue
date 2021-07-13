<template>
  <div id="app" :class="[$style.wrapper]">
    <header>
      <h1>My personal cost</h1>
    </header>
    <main>
      <PaymentsDisplay 
      :list="pageList" 
      :sl="catSl" @sendSelected="checkIn($event)" 
      @addNewCategory="addingCat($event)"/>
      <br />
      <AddPayment :cat-sl="catSl" @addNewPayment="addData" />
      <br />
      <CategorySelect  />
      <h4>Total: {{ getFPV }} units</h4>
      <Pagination :pd="paymentsList" @sendPage="getPage($event)" />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPayment from "./components/AddPayment.vue";
import Pagination from "./components/pagination.vue";
import CategorySelect from "./components/CategorySelect.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";
//import list from "@/data";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    CategorySelect,
    AddPayment,
    Pagination,
  },
  data: () => ({
    catSl: '',
    pageList: [],
    data: {
      form: "qw",
    },
  }),

  methods: {
    checkIn(category) {
      this.catSl = category
    },
    addingCat(category) {
      this.addCategory(category);
      console.log("push to state", category);

    },
    getPage(page) {
      this.pageList = page;
    },
    /*addData(data) {
      this.paymentsList = [...this.paymentsList, data];
    },*/
    ...mapMutations(["setPaymentListData", "addDataToPaymentsList","addCategory"]),
    ...mapActions(["fetchData", "fetchCategory"]),
    addData(data) {
      console.log("push to state", data);
      // this.paymentsList.push(data)
      // this.paymentsList = [...this.paymentsList, data]
      this.addDataToPaymentsList(data);
    },
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentList",
      categories: "getCategoryList",
    }),
    getFPV() {
      return this.$store.getters.getFullPyamentValue;
    },
    // paymentsList(){
    //   return this.$store.getters.getPaymentList
    // }
  },
  created() {
    //this.paymentsList = list();
    this.fetchData();
    if (!this.categories.length) {
      this.fetchCategory();
    }
  },
};
</script>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  display: flex;
  align-items: center;
  flex-direction: column;
}

h4 {
    color: red; 
    display: flex;
    justify-content: center;
    font-weight: 500;
    background: gainsboro;
}
</style>
