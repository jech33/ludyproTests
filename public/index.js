const loginToken = async () => {
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    const data = { user, password }

    const response = await fetch(
        "http://192.168.2.105:8080/api/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'username': user,
            'password': password
        },
        body: JSON.stringify(data)
    }
    )
        .then((resp) => resp.json())
        .catch(console.warn);

    console.log(user, password);
    console.log(response)

    const logInfo = response.token || response.msg;
    document.getElementById("token").innerHTML = logInfo;
    return response.json
}

const getUsers = async (e) => {
    e.preventDefault();
    const token = document.getElementById("token").innerHTML;
    console.log(token)

    const redirect = await fetch(
        "http://192.168.2.105:8080/api/users", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ludy-token': token
        }
    },
    )
        .then((resp) => resp.json())
        .catch(console.warn);
    
        document.getElementById("result").textContent = JSON.stringify(redirect, undefined, 2);

}

const getUsersCompany = async (e) => {
    e.preventDefault();
    const token = document.getElementById("token").innerHTML;
    console.log(token)

    const redirect = await fetch(
        "http://192.168.2.105:8080/api/users?company=7000", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ludy-token': token
        }
    },
    )
        .then((resp) => resp.json())
        .catch(console.warn);
    
        document.getElementById("result").textContent = JSON.stringify(redirect, undefined, 2);

}