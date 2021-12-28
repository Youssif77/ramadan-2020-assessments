class SearchInputView {
  _searchInput = document.querySelector(".search");
  _msgContainer = document.querySelector(".msg");

  addHendlerSearchRequests(handler) {
    this._searchInput.addEventListener("input", (e) => {
      handler(e.target.value);
      if (!e.target.value) {
        this._msgContainer.innerHTML = "";
      }
    });
  }

  rederMsg(requestsNumber) {
    if (requestsNumber == 0) {
      this._msgContainer.innerHTML = "no requests matchs";
    } else {
      this._msgContainer.innerHTML = `${requestsNumber} requests `;
    }
  }
}
export default new SearchInputView();
