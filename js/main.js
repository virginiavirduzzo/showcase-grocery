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

    // Define drag events
    function dragStart(event){
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.dropEffect = "move"
        var target = event.target || event.srcElement
        var success = event.dataTransfer.setData('Text', target.id)
    }

    function dragOver(event){
        if(event.preventDefault) event.preventDefault()
        if (event.stopPropagation) event.stopPropagation()
        else event.cancelBubble = true
        return false;
    }
    
    function dropProduct(event){            
        if(event.preventDefault) event.preventDefault()
        if (event.stopPropagation) event.stopPropagation()
        else event.cancelBubble = true
        
        const id = event.dataTransfer.getData("Text");
        const item = document.querySelector('#'+id);        
                    
        addToCart(item, id)
        
        return false
    }

    // Start cart related events
    function addToCart(item, id) {
        let exists = document.querySelectorAll(".cart-list .product[data-id='" + id + "']")
        
        if(exists.length > 0){
            updateCartItem(exists[0])
        } else {
          addCartItem(item, id)
        }
        updateCart()
        deleteCartItems()
      }

    function addToCartButton(id) {
        let item = document.querySelector('#'+id)
        addToCart(item, id)
    }

    function addCartItem(item, id) {
        const clone = item.cloneNode(true)
        let quantityInput = +clone.querySelector('.quantity').value
        clone.setAttribute('data-id', id)
        clone.setAttribute('data-quantity', quantityInput)
        clone.removeAttribute('id')

        const actions = clone.querySelector('.actions')
        const info = clone.querySelector('.product-info') 
        actions.parentNode.removeChild(actions)
        info.parentNode.removeChild(info)
        
        var fragment = document.createElement('span')
        fragment.setAttribute('class', 'quantity')
        fragment.innerHTML = ' x '+quantityInput
        clone.appendChild(fragment)
        
        fragment = document.createElement('span')
        fragment.setAttribute('class', 'sub-total')
        clone.appendChild(fragment)

        var deleteIcon = document.createElement('i')  
        deleteIcon.setAttribute('class', 'far fa-trash-alt delete-item')     
        clone.appendChild(deleteIcon)

        deleteIcon.addEventListener('click', function(){
            let itemToDelete = this.parentElement
            itemToDelete.parentNode.removeChild(itemToDelete)
            updateCart()
            hideDeleteAll()
        })

        cartList.appendChild(clone)
    }

    function updateCartItem(item){
        let productId = item.getAttribute('data-id')
        let quantity = item.getAttribute('data-quantity')
        let quantityInput = +document.querySelector('#'+productId+' .quantity').value
        quantity = parseInt(quantity)
        quantity = quantity + quantityInput
        item.setAttribute('data-quantity', quantity)
        let span = item.querySelectorAll('span.quantity')
        span[0].innerHTML = ' x ' + quantity
    }

    function updateCart(){
        var total = 0.0;
        var totalQuantity = 0
        var cart_items = document.querySelectorAll(".cart-list .product")
        
        for (var i = 0; i < cart_items.length; i++) {
            var cart_item = cart_items[i]
            var quantity = cart_item.getAttribute('data-quantity')
            var price = cart_item.querySelector('.price').textContent
            var sub_total = parseFloat(Number(quantity) * parseFloat(price))
            cart_item.querySelectorAll("span.sub-total")[0].innerHTML = " = " + sub_total.toFixed(2);
            
            total += sub_total

            var allQuantity = cart_item.getAttribute('data-quantity')
            totalQuantity += parseInt(allQuantity)
        }

        document.querySelectorAll(".cart-price")[0].innerHTML = "Tot: " + total.toFixed(2) + "€"
        document.querySelectorAll(".tot-products")[0].innerHTML = totalQuantity

        resetQuantityInput()
    }
    
    function resetQuantityInput() {
        for (let i = 0; i < products.length; i++) {
        let product = products[i];
        product.querySelector('.quantity').value = 1
    }
    }

})();