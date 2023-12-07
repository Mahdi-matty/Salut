
document.querySelectorAll(".commentForm").forEach(function (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const commentText = this.querySelector("input").value;

    try {
      const tweetsDiv = this.closest('.tweets');
        const postId = tweetsDiv.dataset.postId;
        const userId = tweetsDiv.dataset.userId;

      const commentObj = {
        text: commentText,
        user_id: userId,
        post_id: postId,
      };

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentObj),
      });

      localStorage.setItem('scrollPosition', window.scrollY);

      location.reload(true);

    } catch (error) {
      console.error('Error fetching comment count:', error);

    }
  });
});
