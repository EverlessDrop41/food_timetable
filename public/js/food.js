var list = new Vue({
  el: "#foodListVue",
  data: {
    food: [{
      name: "pasta",
      price: 79
    },{
      name: "pasta + cheese",
      price: 120
    }]
  },
  methods: {
    parseCost: utils.poundStr
  }
});
