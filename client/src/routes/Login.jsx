import useLoginForm from '../hooks/useLoginForm';
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import '../assets/styles.css';
import '../assets/index.css';
import LoginDisplayer from '../components/LoginDisplayer'

const Login = () => {
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
                Cookies.set('token', tokenState, { expires: 7, secure: true, sameSite: 'Strict' }); // useSetExpiryTimeServerSide(tokenState); just to make sure that i will develop this in the future
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    }, [tokenState, loginData, userInfo]);

    return (
        <LoginDisplayer handleInputChange={handleInputChange} formData={formData} sendForm={sendForm} userInfo={userInfo} open={open} preHandleClose={preHandleClose} loginData={loginData} />  
    );
};

export default Login;
