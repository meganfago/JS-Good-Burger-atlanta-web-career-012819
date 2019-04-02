const burgerURL = 'http://localhost:3000/burgers';

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener('submit', handleSubmitButton)
  renderAllBurgers()
})

function renderAllBurgers(){
  fetch(burgerURL)
  .then(resp => resp.json())
  .then(data => data.forEach(burger => renderBurger(burger)))
}

function renderBurger(burger){
  const menuDiv = document.getElementById("burger-menu")
  const burgerCard = document.createElement('div')
  burgerCard.setAttribute('class', 'burger')
  const h3 = document.createElement('h3')
  h3.setAttribute('class', 'burger-title')
  h3.textContent = burger.name
  const img = document.createElement('img')
  img.src = burger.image
  const p = document.createElement('p')
  p.setAttribute('class', 'burger-description')
  p.textContent = burger.description
  const button = document.createElement('button')
  button.setAttribute('class', 'button')
  button.dataset.id = burger.id
  button.textContent = "Add to Order"
  button.addEventListener('click', handleAddToOrder)


  menuDiv.appendChild(burgerCard)
  burgerCard.appendChild(h3)
  burgerCard.appendChild(img)
  burgerCard.appendChild(p)
  burgerCard.appendChild(button)
}

function handleAddToOrder(e){
  const burgerTitle = e.target.previousSibling.previousSibling.previousSibling.innerText
  const yourOrder = document.getElementById("order-list")
  const li = document.createElement('li')
  li.append(burgerTitle)
  yourOrder.appendChild(li)
}

function handleSubmitButton(e){
  e.preventDefault();
  console.log(e.target)
let name = e.target.elements["name"].value
let description = e.target.elements["description"].value
let url = e.target.elements['url'].value

fetch(burgerURL, {
  method: "POST",
  headers: {'Accept': 'application/json',
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    description: description,
    image: url
  })
})
.then(resp => resp.json())
.then(burger => renderBurger(burger))
e.target.reset();
}
