class OrderSelectorView {
  _orderSelector = document.querySelector("#ordered_by");

  addHandlerOrderRequests(handler) {
    this._orderSelector.addEventListener("change", function excuteHandler(e) {
      handler(e.target.value);
    });
  }
}
export default new OrderSelectorView();
