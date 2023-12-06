document.addEventListener("DOMContentLoaded", () => {
    // Select all delete buttons
    const deleteBtns = document.querySelectorAll(".deleteBtn");

    // Add a click event listener to each delete button
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", async function(event) {
            // Find the closest ancestor with class 'profile'
            const profileElement = this.closest(".profile");

            if (profileElement) {
                try {
                    // Extract post ID from the profileElement dataset or other method based on your implementation
                    const postId = profileElement.dataset.postId;

                    // Send a DELETE request to the server to delete the post
                    const response = await fetch(`/api/posts/${postId}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        // Remove the profileElement from the DOM if the deletion is successful
                        profileElement.remove();
                    } else {
                        console.log("Error deleting post");
                    }
                } catch (error) {
                    console.error('Error during delete operation', error);
                }
            }
        });
    });
});
