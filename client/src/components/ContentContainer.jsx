import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import PermissionManager from "../components/PermissionManager";

export default function ContentContainer({ token, allAccess, selectedSection }) {
    const [choosenSection, setChoosenSection] = useState('');

    useEffect(() => {
        setChoosenSection(selectedSection)
    }, [selectedSection])

    return (
        <div className="content-container">
            { choosenSection === 'feed' && (<div className='feed-container' id='feed-container'><p>Feed</p></div>) }
            { allAccess && (choosenSection === 'assign' && <PermissionManager token={token} /> ) }
            { choosenSection === 'pages' && (<div className='pages-container' id='pages-container'><p>Pages</p></div>) }
        </div>
    )
}

ContentContainer.propTypes = {
    token: PropTypes.string.isRequired,
    allAccess: PropTypes.bool.isRequired,
    selectedSection: PropTypes.string.isRequired
}