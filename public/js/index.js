const commentSection = document.querySelectorAll("#comment-section");
const viewCommentBtns = document.querySelectorAll(".view-comment-btn");
const editButton = document.querySelectorAll("#edit-post-btn")
let commentsVisible = false;

function showHideComments(e) {

    const postID = e.target.id;
    
    if(commentsVisible) {
        commentSection[postID -1].style.display = "none";
        e.target.textContent = "View Comments";
        commentsVisible = false;
    } else {
        commentSection[postID -1].style.display = "block";
        e.target.textContent = "Hide Comments";
        commentsVisible = true;
    }}

viewCommentBtns.forEach(function(button) {
    button.addEventListener("click", showHideComments);
});

editButton.forEach(function(button){
    button.addEventListener("click", function() {
        const postID = this.dataset.id;
        window.location.href= "/post/" + postID + "/edit"
    })
});