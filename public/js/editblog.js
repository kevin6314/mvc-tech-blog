
const editBlogPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogpost-title').value.trim();
    const content = document.querySelector('#blogpost-content').value.trim();
    //const user_id = JSON.stringify(req.session.user_id);

    // Extract blog post ID from the URL
    const blogPostId = window.location.pathname.split('/').pop();

    if (title && content) {
      const response = await fetch(`/api/blogposts/${blogPostId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        //document.location.replace('/dashboard');
        window.location.replace(`/blogposts/${blogPostId}`);
      } else {
        alert('Failed to edit blogpost');
      }
    }
  };
  

document
  .querySelector('.edit-blogpost')
  .addEventListener('submit', editBlogPostHandler);


const loadBlogPostHandler = async (event) => {
  event.preventDefault();

  const titleInput = document.querySelector('#blogpost-title');
  const contentTextarea = document.querySelector('#blogpost-content');

  // Extract blog post ID from the URL
  const blogPostId = window.location.pathname.split('/').pop();

  const response = await fetch(`/api/blogposts/${blogPostId}`);

  console.log(response);

  if (response.ok) {
    const blogPostData = await response.json();
    const { title, content } = blogPostData;

    titleInput.value = title;
    contentTextarea.value = content;

  } else {
    console.error('Failed to load blog post');
  }
};

document.addEventListener('DOMContentLoaded', loadBlogPostHandler);