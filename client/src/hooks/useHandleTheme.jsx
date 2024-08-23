import axios from "axios";
import { useState } from "react";

export default function useHandleTheme({token}) {
    const [newTheme, setNewTheme] = useState(null)
    const [themeMsg, setThemeMsg] = useState(null)
    const [themeSuccess, setThemeSuccess] = useState(false)
    const [themeLoading, setThemeLoading] = useState(false)
    const [themeError, setThemeError] = useState(null)

    const updateHandleTheme = async (theme) => {
        setThemeLoading(true)
        await axios.put('https://nodenetwork-backend.onrender.com/api/handleTheme/',{theme:theme},{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }).then((response)=>{
            setNewTheme(response.data.theme)
            setThemeMsg(response.data.message)
            setThemeSuccess(response.data.success)
            setThemeLoading(false)
        }).catch((error)=>{
            setThemeError(error.data.error)
            setThemeLoading(false)
        })
    }
    
    const getUserTheme = async() =>{
        setThemeLoading(true)
        await axios.get('https://nodenetwork-backend.onrender.com/api/getUserTheme/',{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }).then((response)=>{
            setNewTheme(response.data.theme)
            setThemeLoading(false)
        }).catch((error)=>{
            setThemeError(error.data.error)
            setThemeLoading(false)
        })
    }
    return { newTheme, themeMsg, themeSuccess, themeLoading, themeError, updateHandleTheme, getUserTheme }
}