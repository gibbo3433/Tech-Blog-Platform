const newPostHandler = async (event) => {
    event.preventDefault();
  
    const post_title = document.querySelector('#post-name').value.trim();
    const post_content = document.querySelector('#post-desc').value.trim();
    console.log(post_title, post_content)

    if (post_title && post_content) {
      const response = await fetch("/api/posts", {
        method: 'POST',
        body: JSON.stringify({ post_title, post_content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);
  
