class LoginView {
  _loginForm = document.querySelector(".login_form");
  _app = document.querySelector(".app");
  addHandlerLogin(handler) {
    this._loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const dataArr = [...new FormData(this._loginForm)];
      const data = Object.fromEntries(dataArr);
      handler(data);
      this._app.classList.remove("d-none");
      this._loginForm.closest(".login").classList.add("d-none");
    });
  }
}
export default new LoginView();
