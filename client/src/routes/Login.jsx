import useLoginForm from '../hooks/useLoginForm';
import { useEffect, useState, useContext } from 'react'
// import AppContext from '../contexts/AppContext';
import Cookies from 'js-cookie'
import '../assets/styles.css';
import '../assets/index.css';
import LoginDisplayer from '../components/LoginDisplayer'

export default function Login(){
    // const { data, setData } = useContext(AppContext);
    const cookieToken = Cookies.get('token');
    const { handleInputChange, sendForm, handleClose, loginData, tokenState, userInfo, open, formData } = useLoginForm({
        username: '',
        password: '',
    });

    const preHandleClose = (event, reason) => {
        handleClose(event, reason);
    }

    useEffect(() => {
        try {
            if (tokenState) {
                //if there's cookie token, it means that the user is already logged in
                if (cookieToken) {
                    window.location.href = '/feed'; //must have to find out the way to use useNavigate instead of window.location.href
                } else {
                    Cookies.set('token', tokenState, { expires: 7, secure: true, sameSite: 'Strict' }); // useSetExpiryTimeServerSide(tokenState); just to make sure that i will develop this in the future
                    window.location.href = '/feed'; //must have to find out the way to use useNavigate instead of window.location.href
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [tokenState, cookieToken]);

    return (
        <>
            {!cookieToken && <LoginDisplayer handleInputChange={handleInputChange} formData={formData} sendForm={sendForm} userInfo={userInfo} open={open} preHandleClose={preHandleClose} loginData={loginData} />}
        </>
    );
};
