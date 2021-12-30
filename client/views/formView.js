class formView {
  _newRequestForm = document.querySelector(".requists_form");
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

  renderValidationMsg(inputState, input) {
    input.nextElementSibling.innerHTML = inputState.validate[1];
  }
}

export default new formView();
