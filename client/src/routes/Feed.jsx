import FeedNavbar from '../components/FeedNavbar';
import PropTypes from 'prop-types'

export default function Feed ({ token }) {
    try {
        if(token) {

            return (
                <>
                    <FeedNavbar />
                </>           
            )
        }
    } catch (error) {
        return (
            <h1>Oops, something went wrong</h1>
        )
    }
}

Feed.propTypes = {
    token: PropTypes.string,
};