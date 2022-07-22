import jwt from "jsonwebtoken";

//Checks for a jwt token and whether it has expired
export function CheckAuth() {
    const authorisationStatus = (localStorage.getItem("token") != null) &&
        (jwt.decode(localStorage.getItem("token")).exp >
            new Date().getTime() / 1000);

    return authorisationStatus;
}

//Puts JWT in storage (unsafe)
export function SetAuth(token) {
    localStorage.setItem("token", token);
}

//Clears the JWT token by clearing storage
export function RemoveAuth() {
    localStorage.clear();
}