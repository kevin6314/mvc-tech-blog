
const newBlogPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogpost-title').value.trim();
    const content = document.querySelector('#blogpost-content').value.trim();
    //const user_id = JSON.stringify(req.session.user_id);

    if (title && content) {
      
      const requestBody = {
        title,
        content,
      };
  
      console.log('Request Body:', requestBody); // Log the request body
        
        const response = await fetch('/api/blogposts', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const newBlogPost = await response.json();
          window.location.replace(`/blogposts/${newBlogPost.id}`);
        } else {
          alert('Failed to create blogpost');
        }
    }
  };
  

document
  .querySelector('.create-blogpost')
  .addEventListener('submit', newBlogPostHandler);