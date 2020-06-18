const getUsers = (e) => {
    e.preventDefault()

    const usersNumber = document.querySelector('[name = "users-number"]').value;
    const usersGender = document.querySelector('[name = "gender"]').value;


    const url = `https://randomuser.me/api/?results=${usersNumber}&gender=${usersGender === "both" ? "male,female" : usersGender}`;


    fetch(url) //obietnica - oczekujący (pending)
        // obietnica - rozstrzygnięcie (spełnione || odrzucone)

        //gdy obietnica rozstrzygnęła się pozytywnie to wykonuje się .then
        .then(response => {
            // console.log(response)
            if (response.status !== 200) {
                throw Error("to nie jeste odpowiedź 200")
            } else {
                if (usersNumber > 0) {
                    return response.json() //fetch API = json() z body wyodrębnia json i zmienia (parsuje) na obiekt w JS
                }
            }

        })

        //każdy .then tworzy nową obietnicę, która moze być znowu rozstrzygnięta pozytywnie lub nie, jeżeli pozytywnie to można wykonac kolejne .then

        .then(json => showUsers(json.results))

        //gdy obietnica jest rozstrzygnięta negatywanie (odrzucona) to wykonuje się .catch
        .catch(err => console.log(err))
}

const showUsers = (users) => {
    const resultAreas = document.querySelector('.users-list');
    resultAreas.textContent = ""
    users.forEach(user => {
        const item = document.createElement('div');
        item.className = "user";
        item.innerHTML = `
        <div class="user__name">${user.name.title.toUpperCase()} ${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}</div>
        <img class="user__image" src="${user.picture.medium}">
        `
        resultAreas.appendChild(item);
    })
}

document.querySelector('.generator').addEventListener('submit', getUsers);