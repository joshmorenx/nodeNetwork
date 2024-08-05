import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useGetSearchResults({ token }) {
    const [loading, setLoading] = useState(true)
    const [searchResults, setSearchResults] = useState([])
    const [success, setSuccess] = useState(false)
    const [msg, setMsg] = useState('')
    const [errorQuery, setErrorQuery] = useState('')

    const sendQuery = async (querySearch) => {
        setLoading(true)
        await axios.get('https://nodenetwork-backend.onrender.com/api/search/',{
            headers: {
                Authorization: `Bearer ${token}`,
                query: querySearch
            }
        }).then((response)=>{
            setSuccess(response.data.success)
            setMsg(response.data.message)
            setSearchResults(response.data.results)
            setLoading(false)
        }).catch((error)=>{
            setErrorQuery(error)
            setLoading(false)
        })
    }

    return { setLoading, sendQuery, searchResults, success, msg, errorQuery, loading }
}