// index.js

//* Declaring my variables from DOM + the ramen url
const htmlBody = document.querySelector('body')
const ramenImgContainer = htmlBody.querySelector('#ramen-menu')
const clickedRamenContainer = htmlBody.querySelector('#ramen-detail')
const updateRamen = htmlBody.querySelector('#edit-ramen')
const ramensURL = 'http://localhost:3000/ramens'

const imgDisplayed = clickedRamenContainer.querySelector('img')
const ramenName = clickedRamenContainer.querySelector('h2')
const ramenRestaurantName = clickedRamenContainer.querySelector('h3')
const ratingDisplay = document.querySelector('#rating-display')
const commentDisplay = document.querySelector('#comment-display')




//? Function to display what ramen is clicked on
const handleClick = (ramen) => {

  imgDisplayed.src = ramen.image
  imgDisplayed.id = ramen.id
  ramenName.textContent = ramen.name
  ramenRestaurantName.textContent = ramen.restaurant
  ratingDisplay.textContent = ramen.rating
  commentDisplay.textContent = ramen.comment

}

//? Function to add a submit event listener to ONLY the Ramen that is being 
//? displayed for updating rating/comments
function addUpdateListener(ramen) {

  if (imgDisplayed.id = ramen.id) {
    updateRamen.addEventListener('submit', e => {
      e.preventDefault()
      const commentRatingPATCHObj = {
        rating: e.target.rating.value,
        comment: htmlBody.querySelector('#new-comment').value
      }

      fetch('http://localhost:3000/ramens/' + imgDisplayed.id, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(commentRatingPATCHObj)
      })
        .then(res => res.json())
        .then(data => console.log(data))
    })

  } else {
    updateRamen.removeEventListener('submit', addSubmitListener())
  }}



//? Function to add a submit event listener to the new ramen form that updates db.json 
//? and adds the new ramen to the top of the page
const addSubmitListener = () => {
  const newRamenForm = htmlBody.querySelector('#new-ramen')
  newRamenForm.addEventListener('submit', e => {
    e.preventDefault()

    const newRamenObj = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: newRamenForm.querySelector('#comment').value
    }

    fetch(ramensURL, {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newRamenObj)
    })
      .then(res => res.json())
      .then(data => displayRamens(data))
  })
}

//? Function to display ramens that are pulled from the db.json
const displayRamens = () => {
  fetch(ramensURL)
    .then(res => res.json())
    .then(data => {
      handleClick(data[0])           //displays first ramen on page load
      addUpdateListener(data[0])     //adds event listener for update to first ramen on page load
      data.forEach(ramen => {
        const imgEl = document.createElement('img')
        imgEl.id = ramen.id
        imgEl.src = ramen.image
        imgEl.ariaPlaceholder = ramen.name + "image"
        ramenImgContainer.appendChild(imgEl)
        imgEl.addEventListener('click', e => {
          handleClick(ramen)
          addUpdateListener(ramen)
        })
      })
    })
}





const main = () => {
  displayRamens()
  addSubmitListener()
}
//displays ramen and adds a new ramen form submit event listener on page load
main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
