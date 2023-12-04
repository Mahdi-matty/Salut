const deletBtns = document.querySelector(".deleteBtn");
//  const classINeed = document.querySelector(".classINeed");

 deletBtns.addEventListener("click", async function(event) {
    const deleteBtn = event.target.closest(".deleteBtn");
    if (!deleteBtn) {
        return; 
    }
    const listItem = this.closest('ul');
    console.log('Found list item:', listItem);

    if (!listItem) {
        console.error('Error: Could not find list item');
        return;
    }
    const idInNeed = document.querySelector(".idInNeed").textContent;
    try {
        const response = await fetch(`/api/posts/${idInNeed}`, {
            method: 'DELETE',
            
        });
        if (response.ok){
            listItem.remove();
        }else {
            console.log("error")
        }
} catch (error) {
    console.error('Error during delete operation', error);
}})