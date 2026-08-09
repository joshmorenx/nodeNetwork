import { useSelector } from "react-redux"
export default function FollowTabs({ handleSelectedTab, selectedTab }) {
    const className = useSelector((state) => state.className);

    const handledSelectedTab = (selectedTab) => {
        handleSelectedTab(selectedTab)
    }

    return (
        <>
            <ul className={`follow-tabs ${className}`}>
                <li className="me-2" style={{ flex: 1 }}>
                    <a href="#followers" onClick={() => handledSelectedTab(1)} className={selectedTab == 1 ? "follow-tab follow-tab-active" : "follow-tab"}> Seguidores </a>
                </li>
                <li className="me-2" style={{ flex: 1 }}>
                    <a href="#following" onClick={() => handledSelectedTab(2)} className={selectedTab == 2 ? "follow-tab follow-tab-active" : "follow-tab"}> Siguiendo </a>
                </li>
            </ul>
        </>
    )
}