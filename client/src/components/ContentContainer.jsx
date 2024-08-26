import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import PermissionManager from "../components/PermissionManager";
import ProfileSettings from "../components/ProfileSettings";
import { useDispatch, useSelector } from 'react-redux';
import { setClassName } from '../redux/actions';

export default function ContentContainer({ token, allAccess, selectedSection }) {
    const [choosenSection, setChoosenSection] = useState('');
    const className = useSelector((state) => state.className);

    useEffect(() => {
        setChoosenSection(selectedSection)
    }, [selectedSection])

    return (
        <div className={"content-container "+className}>
            {/* { choosenSection === 'feed' && (<div className='feed-container' id='feed-container'><p>Feed</p></div>) } */}
            { allAccess && (choosenSection === 'assign' && <PermissionManager token={token} /> ) }
            {/* { choosenSection === 'profile_settings' && (<div className='profile-settings-container' id='profile-settings-container'><p>profile settings</p></div>) } */}
            { choosenSection === 'profile_settings' && (<ProfileSettings token={token} />) }
        </div>
    )
}

ContentContainer.propTypes = {
    token: PropTypes.string.isRequired,
    allAccess: PropTypes.bool.isRequired,
    selectedSection: PropTypes.string.isRequired
}