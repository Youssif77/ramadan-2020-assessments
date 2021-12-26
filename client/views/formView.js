class formView {
  _newRequestForm = document.querySelector("form");

  addHandlerNewRequest(handler) {
    this._newRequestForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new formView();
