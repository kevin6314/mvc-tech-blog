const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-content').value.trim();
    const blogpost_id = window.location.pathname.split('/').pop();

    if (content) {
      
      const requestBody = {
        content,
        blogpost_id
      };
  
      console.log('Request Body:', requestBody); // Log the request body
        
        const response = await fetch('/api/blogposts/comments', {
          method: 'POST',
          body: JSON.stringify({ content, blogpost_id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          //const newComment = await response.json();
          location.reload();
          //window.location.replace(`/blogposts/${blogpost_id}`);
        } else {
          alert('Failed to create comment');
        }
    }
  };
  

document
  .querySelector('.create-comment')
  .addEventListener('submit', newCommentHandler);