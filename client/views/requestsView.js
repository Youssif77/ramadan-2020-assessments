import moment from "../node_modules/moment/dist/moment.js";

class requsetsView {
  requestsContainer = document.querySelector("#listOfRequests");

  addHandlerRender(handler) {
    document.addEventListener("DOMContentLoaded", handler);
  }

  addHandlerUpdateVote(handler) {
    const listOfRequests = document.querySelector("#listOfRequests");
    listOfRequests.addEventListener("click", function handleVote(e) {
      if (!e.target.dataset.votetype) return;

      const requestElem = e.target.closest(".request");

      const id = requestElem.dataset.id;
      const voteType = e.target.dataset.votetype;
      handler(id, voteType);
    });
  }
  addHandlerDeleteRequest(handler) {
    const listOfRequests = document.querySelector("#listOfRequests");
    listOfRequests.addEventListener("click", function deleteRequest(e) {
      if (!e.target.classList.contains("delete")) return;
      const requestElem = e.target.closest(".request");
      const id = requestElem.dataset.id;
      handler(id);
    });
  }
  addHandlerUpdateRequestStatus(handler) {
    const listOfRequests = document.querySelector("#listOfRequests");

    listOfRequests.addEventListener("click", function handleVote(e) {
      e.preventDefault();
      if (!e.target.classList.contains("update_request")) return;
      const requestElem = e.target.closest(".request");
      const status = requestElem.querySelector(".status");
      const id = requestElem.dataset.id;
      const videoUrl = requestElem.querySelector(".resVideo");
      handler(id, status.value, videoUrl.value);
    });
  }
  renderRequests(data, role) {
    let template = "";
    data.forEach((item) => {
      template += `<div class='card mb-3 request' data-id=${item._id}>
      <div class="d-flex justify-content-between w-100">
      ${
        role === "admin"
          ? ` <svg
          
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill='currentColor'
            class='m-2 bi bi-file-x-fill delete'
            viewBox='0 0 16 16'>
            <path class="delete" d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6.854 6.146 8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 1 1 .708-.708z' />
          </svg> `
          : ""
      }
     ${
       role === "admin" && data.status !== "done"
         ? ` <div>  <form>
         <select class="bg-dark text-light rounded p-1  m-2 status" style="width:100px">
         <option selected disabled hidden value=${item.status} >status</option>
                <option value="new">new</option>
                <option value="planned">planned</option>
                 <option value="done">done</option>
              </select>
          <input type="text" class=" rounded resVideo">
          <button class="btn btn-dark text-light p-1  m-2 update_request"> submit</button></form>
              </div>`
         : ""
     }</div>
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


            ${
              item.video_ref.link
                ? `<img class = "w-25" src="https://img.youtube.com/vi/${
                    item.video_ref.link.split("=")[1]
                  }/0.jpg"/>`
                : ""
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
              <span class='text-info'>${item.status.toUpperCase()}</span>
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
