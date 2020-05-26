(function () {
    // Make work product increment/decrement inputs
    const inputGroups = document.querySelectorAll('.input-group')
    let currentValue = 0

    for (let i = 0; i < inputGroups.length; i++) {
      const inputGroup = inputGroups[i]
      const addInput = inputGroup.querySelector('.add')
      const removeInput = inputGroup.querySelector('.remove')
      inputGroup.querySelector('.quantity').value = 1
      let currentValue = 0
      
      
      addInput.addEventListener('click', function increment(event){
        if (currentValue < 10) {
          let value = inputGroup.querySelector('.quantity').value
          currentValue = Number(value) + 1
          inputGroup.querySelector('.quantity').value = currentValue
        }
      })

      removeInput.addEventListener('click', function decrement(event){
        if (currentValue > 0) {
          let value = inputGroup.querySelector('.quantity').value
          currentValue = Number(value) - 1
          inputGroup.querySelector('.quantity').value = currentValue
        }
      })
    }

    // Start drag and drop events & vars
    const cart = document.querySelector('.cart-wrapper')
    const cartList = document.querySelector('.cart-list')
    const itemsCount = document.querySelector('.tot-products')
    const totPrice = document.querySelector('.cart-price')
    const products = document.querySelectorAll('.product')
    
    for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.setAttribute("draggable", "true")
    product.addEventListener('dragstart', dragStart)
    }

    cart.addEventListener('drop', dropProduct)
    cart.addEventListener('dragover', dragOver)

})();