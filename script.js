let products = [];
let i = 0;

function addProduct(event){
    event.preventDefault();
    let Price = event.target.price.value; //document.getElementById('price');
    let Name = event.target.name.value;
    let Category = event.target.category.value;
    
    const Productobj = {
        Price,
        Name,
        Category
    }
    
    // document.getElementById('price').value = '';
    // document.getElementById('name').value = '';
    // document.getElementById('category').value = '';

//******Save data to local storage *******/
    products.push(Productobj)
    localStorage.setItem(Productobj.Name,JSON.stringify(products[i]));
    i++;   

// ********** post Data to Cloud using CrudCrud and POSTMAN **********//

    axios.post("https://crudcrud.com/api/a36838a111644db6ad6c13659f163eeb/data",Productobj)
        .then((response) => {
            showOnScreen(response.data);
            console.log(response.data)
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Ooops! Something Went wrong.</h4>"
            console.log(err)
        })
    }
//*********get the data from crudcrud *******//

window.addEventListener('DOMContentLoaded',() => {
    axios.get("https://crudcrud.com/api/a36838a111644db6ad6c13659f163eeb/data")
        .then((response) => {
            for(var i=0; i<response.data.length; i++){
                showOnScreen(response.data[i]) 
                
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

function showOnScreen(Productobj){
    
   
    if(document.getElementById('category').value === 'Electronics'){
        const ul = document.getElementById('electronics-lst');
        const li = `<li id="${Productobj._id}"> ${Productobj.Price} - ${Productobj.Name} - ${Productobj.Category}
                            <button onclick=deleteUser('${Productobj._id}')>Delete</button>    
                      </li>`
    ul.innerHTML = ul.innerHTML + li;
   }
    else if(document.getElementById('category').value === 'Food'){
        const ul = document.getElementById('food-lst');
        const li = `<li id="${Productobj._id}"> ${Productobj.Price} - ${Productobj.Name} - ${Productobj.Category}
                                <button onclick=deleteUser('${Productobj._id}')>Delete</button>    
                          </li>`
        ul.innerHTML = ul.innerHTML + li;   
    }
    else if(document.getElementById('category').value === 'Skincare'){
        const ul = document.getElementById('skincare-lst');
        const li = `<li id="${Productobj._id}"> ${Productobj.Price} - ${Productobj.Name} - ${Productobj.Category}
                                <button onclick=deleteUser('${Productobj._id}')>Delete</button>    
                          </li>`
        ul.innerHTML = ul.innerHTML + li;   }
    
}
// delete user
function deleteUser(itemId){
    axios.delete(`https://crudcrud.com/api/a36838a111644db6ad6c13659f163eeb/data/${itemId}`)
        .then((response) => {
            removeFromScreen(itemId)
        })
        .catch((err)=> {
            console.log(err)
        })
    }

function removeFromScreen(itemId){
    const ParentNode = document.getElementById('electronics-lst')
    const childNodeToBeDeleted = document.getElementById(itemId);
    if(childNodeToBeDeleted){ 
        ParentNode.removeChild(childNodeToBeDeleted)
    }
}

