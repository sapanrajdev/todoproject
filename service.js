import { todos, domains } from "./constants/constants";

export function getUsers() {
  return fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
    response.json()
  );
}

// implement a getTodos function
export function getTodos(users) {
  for(let i=0; i<users.length; i++){
    users[i].todos = todos[users[i].id]
  }
  return users;
}

export async function filterUsers(domain) {
  const users = await getUsers();
  if(domain === domains.ALL)
    return users;
  else
    return users.filter(user =>{
      const splitEmail = user.email.split('.');
      const userEmailDomain = splitEmail[splitEmail.length - 1];
      if(domain === '.'+userEmailDomain) {
        return user;
      }
    })
}
