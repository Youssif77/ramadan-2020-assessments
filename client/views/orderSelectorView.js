class OrderSelectorView {
  _orderSelector = document.querySelector("#ordered_by");

  addHandlerOrderRequests(handler) {
    this._orderSelector.addEventListener("change", (e) => {
      console.log(this._orderSelector.value);
      handler(this._orderSelector.value);
    });
  }
}
export default new OrderSelectorView();
