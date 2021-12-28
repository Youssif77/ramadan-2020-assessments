class SearchInputView {
  _searchInput = document.querySelector(".search");
  msgContainer = document.querySelector(".Msg");

  addHendlerSearchRequests(handler) {
    this._searchInput.addEventListener("input", (e) => {
      handler(e.target.value);
      if (!e.target.value) {
        this.msgContainer.innerHTML = "";
      }
    });
  }

  rederMsg(requestsNumber) {
    if (requestsNumber == 0) {
      this.msgContainer.innerHTML = "no requests matchs";
    } else {
      this.msgContainer.innerHTML = `${requestsNumber} requests `;
    }
  }
}
export default new SearchInputView();
