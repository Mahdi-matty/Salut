document.querySelectorAll('.commentForm').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const commentText = this.querySelector('input').value;
      const commentItem = document.createElement('li');
      commentItem.innerHTML = `<span>{{User.username}}:</span> ${commentText}
          <button type="button" class="btn btn-primary btn-sm replyBtn">Reply</button>
          <ul class="repliesList"></ul>
          <form class="replyForm" style="display: none;">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Add a reply..." />
              <button type="submit" class="btn btn-primary btn-sm">Reply</button>
            </div>
          </form>`;
      this.parentElement.querySelector('.commentsList').appendChild(commentItem);
      this.querySelector('input').value = '';
    });
  });
  document.querySelectorAll('.replyBtn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const replyForm = this.parentElement.querySelector('.replyForm');
      replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
    });
  });