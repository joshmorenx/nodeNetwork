import { useState, useEffect } from "react"
export default function FollowTabs({ handleSelectedTab, selectedTab }) {
    // const [selectedTab, setSelectedTab] = useState(0)
    const unselected = 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300'
    const selected = 'inline-block p-4 dark:bg-gray-800 text-blue-600 rounded-t-lg dark:text-blue-500'

    const handledSelectedTab = (selectedTab) => {
        // setSelectedTab(selectedTab)
        handleSelectedTab(selectedTab)
    }

    return (
        <>
            <ul className={'permission-tabs flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'}>
                <li className="me-2">
                    <a href="#followers" onClick={() => handledSelectedTab(1)} className={selectedTab == 1 ? selected : unselected}> Seguidores </a>
                </li>
                <li className="me-2">
                    <a href="#following" onClick={() => handledSelectedTab(2)} className={selectedTab == 2 ? selected : unselected}> Siguiendo </a>
                </li>
            </ul>
        </>
    )
}