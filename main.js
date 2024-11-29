const submitBtn=document.querySelector('#submit')
const itemName=document.querySelector('#itemName')
const qty=document.querySelector('#quantity')
const price=document.querySelector('#price')
const category=document.querySelector('#category')
const form=document.querySelector('#inventoryForm')
const inventoryTableBody=document.querySelector('#inventoryTableBody')
const totalValue=document.querySelector('#totalValue')


let inventory=JSON.parse(localStorage.getItem("inventory"))||[]
let editIdx=-1

function renderLists(){
    inventoryTableBody.innerHTML = '';
    let totalVal=0
    inventory.forEach((val,idx)=>{
        const row=document.createElement('tr')
        row.innerHTML=`
        <td>${val.name}</td>
        <td>${val.quantity}</td>
        <td>${val.pricing.toFixed(2)}</td>
        <td>${val.cat}</td>
        <td><button class="del-btn" data-index="${idx}">Delete</button></td>
        <td><button class="edit-btn" data-index="${idx}">Edit</button></td>
        `
        inventoryTableBody.appendChild(row)
        totalVal+=val.quantity*val.pricing
    })
    totalValue.textContent=`$${totalVal.toFixed(2)}`
}
submitBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if(!itemName.value.trim()||!qty.value.trim()||!price.value.trim()||!category.value.trim()||qty.value<=0||price.value<=0){
        alert("Please fill out form")
        return
    }
    const input={
        name:itemName.value.trim(),
        quantity:parseInt(qty.value,10),
        pricing:parseFloat(price.value),
        cat:category.value.trim()
    }
    if(editIdx=-1){
        inventory.push(input)
    }
    else{
        inventory[editIdx]=input
    }
    localStorage.setItem("inventory",JSON.stringify(inventory))
    renderLists()
    itemName.value=''
    qty.value=''
    price.value=''
    category.value=''

})
inventoryTableBody.addEventListener('click', (e) => {
    const index=e.target.getAttribute('data-index')
    if (e.target.classList.contains('del-btn')) {
      inventory.splice(index, 1); // Remove item from inventory array
      localStorage.setItem("inventory", JSON.stringify(inventory)); // Update localStorage
      renderLists()
    }
    if(e.target.classList.contains('edit-btn')){
        const item=inventory[index]
        itemName.value=item.name
        qty.value=item.quantity
        price.value=item.pricing
        category.value=item.cat
        submitBtn.textContent='Update Item'
        editIdx=index
    }
  });
  
  renderLists()





    inventoryTableBody.addEventListener('click',(e)=>{
        const index=e.target.getAttribute('data-index')
        if(e.target.classList.contains('del-btn')){
            inventory.splice(index,1)
            localStorage.setItem("inventory",JSON.stringify("inventory"))
            renderLists()
        }
        if(e.target.classList.contains('edit-btn')){
            const val=inventory[index]
            itemName.value=val.name
            qty.value=val.quantity
            price.value=val.price
            category.value=val.cat
            submitBtn.textContent='Update item'
            editIdx=index
        }
    })
    renderLists()

    inventoryTableBody.addEventListener('click',(e)=>{
        let index=e.target.getAttribute('data-index')
        if(e.target.classList.contains('delete-btn')){
            inventory.splice(index,1)
            localStorage.setItem("inventory",JSON.stringify("inventory"))
            renderLists()
        }
        if(e.target.classList.contains('edit-btn')){
            const val=inventory[index]
            itemName.value=val.item
            qty.value=val.quantity
            submitBtn.textContent='Update'
            editIdx=index
        }
    })