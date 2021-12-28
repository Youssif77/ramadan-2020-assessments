class formView {
  _newRequestForm = document.querySelector("form");
  _formInputs = document.querySelectorAll(".form-control");

  addHandlerNewRequest(handler) {
    this._newRequestForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  addHandlerValidateInput(handler) {
    this._formInputs.forEach((formInput) => {
      formInput.addEventListener("input", handler);
    });
  }
}

export default new formView();
