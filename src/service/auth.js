import axois from 'axios';
import { apiUrl } from '../context/usercontext';

class Auth {
    constructor() {
        this.apiUrl = apiUrl;
        this.isAuthenticatedUser = false;
        this.isUserLoggedIn();
    }

    signInUser = async (userCredentials) => {

        try {
            let res = await axois.post(`${this.apiUrl}/user/login`, userCredentials);
            if (res.data) {
                localStorage.setItem('token', res.data.token);
                this.isAuthenticatedUser = true
            }
            console.log(res.data)
            return res.data;
        } catch (err) {
            console.log(err)
        }
    }

    isUserLoggedIn = async () => {
        try {
            if (!this.isAuthenticatedUser) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
                let res = await axois.get(`${this.apiUrl}/user/ping`, {
                    headers
                });
                this.isAuthenticatedUser = (res.data) ? true : false
                return res.data;
            }

        } catch (err) {
            return this.isAuthenticatedUser;
        }

    }

    isUserAuthenticated = () => {
        return this.isAuthenticatedUser || localStorage.getItem('token') !== null;
    }

    signUpUser = async (userDetails) => {
        try {
            const headers = {
                "Content-type": "application/json",
            }
            let res = await axois.post(`${this.apiUrl}/user/register`, userDetails, {
                headers
            })
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    forgotPassword = async (userDetails) => {
        try {
            const headers = {
                "Content-type": "application/json",
            }
            let res = await axois.post(`${this.apiUrl}/user/forgot-password`, userDetails, {
                headers
            })
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    resetPassword = async (userDetails) => {
        try {
            const headers = {
                "Content-type": "application/json",
            }
            let res = await axois.put(`${this.apiUrl}/user/reset`, userDetails, {
                headers
            })
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    logoutUser = () => {
        localStorage.removeItem('token');
    }
}

export default new Auth();