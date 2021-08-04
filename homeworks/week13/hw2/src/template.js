export const cssTemplate = `.card, button{ margin-top:20px }
                            .card-created-at{ margin-left: 10px; color: #787878; font-size: 0.8rem }`
export function getFormTemplate(variableSiteKey) {
  return `
    <div>
      <div class="row">
      <div class="col-12">
        <div class="alert alert-primary" role="alert">
          Message Board For practice
        </div>
      </div>
      </div>
      <div class="row form-${variableSiteKey}">
      <div class="col">
        <div class="input-group mb-3">
          <input class="form-control" type="text" placeholder="pls enter your Nickname ..." name="nickname">
        </div>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
        <label for="floatingTextarea2">Comments</label>
      </div>
      <div class="d-grid">
        <button class="btn btn-primary submit">Submit</button>
      </div>
      </div>
      <div class="discussions-${variableSiteKey}"></div>
      <button class="btn btn-primary load-more-${variableSiteKey}">Load More</button>
    </div>
  `
} 
