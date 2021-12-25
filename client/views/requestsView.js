import moment from "../node_modules/moment/dist/moment.js";

class requsetsView {
  requestsContainer = document.querySelector("#listOfRequests");

  addHandlerRender(handler) {
    document.addEventListener("DOMContentLoaded", handler);
  }

  addHandlerUpdateVote(handler) {
    const listOfRequests = document.querySelector("#listOfRequests");
    listOfRequests.addEventListener("click", function TODO(e) {
      if (!e.target.dataset.votetype) return;

      const requestElem = e.target.closest(".request");

      const id = requestElem.dataset.id;
      const voteType = e.target.dataset.votetype;
      handler(id, voteType);
    });
  }

  renderRequests(data) {
    let template = "";
    data.forEach((item) => {
      template += `<div class='card mb-3 request' data-id=${item._id}>
          <div class='card-body d-flex justify-content-between flex-row'>
            <div class='d-flex flex-column'>
              <h3>${item.topic_title}</h3>
              <p class='text-muted mb-2'>${item.topic_details}</p>
              <p class='mb-0 text-muted'>
            ${
              item.expected_result &&
              `<strong>Expected results:</strong>${item.expected_result} </p>
            </div>`
            }
            <div class='d-flex flex-column text-center'>
              <a class='btn btn-link vote_up' data-voteType="ups">🔺</a>
              <h3 class="vote">
                 ${item.votes.ups - item.votes.downs}
                           </h3>
              <a class='btn btn-link vote_down' data-voteType="downs">🔻</a>
            </div>
          </div>
          <div class='card-footer d-flex flex-row justify-content-between'>
            <div>
              <span class='text-info'>NEW</span>
              &bullet; added by
              <strong>${item.author_name}</strong>
              on
              <strong>${moment(item.submit_date).format("ddd MMM M y")}</strong>
            </div>
            <div class='d-flex justify-content-center flex-column 408ml-auto mr-2'>
              <div class='badge badge-success'>${item.target_level}</div>
            </div>
          </div>
        </div>`;
    });

    this.requestsContainer.innerHTML = template;
  }
}

export default new requsetsView();
