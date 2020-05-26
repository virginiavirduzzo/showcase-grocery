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
})();