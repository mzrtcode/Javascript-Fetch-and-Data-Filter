const input = document.querySelector('#searchInput')
const listUsers = document.querySelector('#usersData')
let users = []

window.addEventListener('DOMContentLoaded', async () =>{
    const data = await loadUsers();
    users = data.data
    renderUsers(users);
    
})

async function loadUsers(){

    listUsers.innerHTML = '<h1> Loading... </h1>'

    const response = await fetch('https://fakerapi.it/api/v1/users?_quantity=1000')
    const data = await response.json()
    return data
}

input.addEventListener('keyup', e =>{
    const filteredUsers = users.filter(user => `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.toLowerCase().includes(input.value.toLowerCase()))
    renderUsers(filteredUsers)
})

const createUserItem = arrUsers => arrUsers.map(
    user => `<li class="bg-zinc-800 hover:bg-sky-700 hover:cursor-pointer">${user.firstname} ${user.lastname}</li>`).join(' ')

function renderUsers(arrUsers){
    const itemsString = createUserItem(arrUsers);
    listUsers.innerHTML = itemsString   
}