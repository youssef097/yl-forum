const { default: axios } = require("axios");

export function whoami(){
    axios.get("http://localhost:3001/api/user/whoami")
        .then(({ data }) => {
            return data.user;
            console.log(data.user);
        }).catch((err) => {
            return null;
        })
}