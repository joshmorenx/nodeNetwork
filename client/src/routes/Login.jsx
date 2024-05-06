import useLoginForm from '../hooks/useLoginForm';
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import '../assets/styles.css';
import '../assets/index.css';
import LoginDisplayer from '../components/LoginDisplayer'

export default function Login(){
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
                    window.location.href = '/dashboard';
                } else {
                    Cookies.set('token', tokenState, { expires: 7, secure: true, sameSite: 'Strict' }); // useSetExpiryTimeServerSide(tokenState); just to make sure that i will develop this in the future
                    window.location.href = '/dashboard';
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
