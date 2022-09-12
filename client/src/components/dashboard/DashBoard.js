import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile'
import { connect } from 'react-redux';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import DashBoardActions from './DashBoardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount } from '../../actions/profile';

const DashBoard = ({ getCurrentProfile, deleteAccount, profile: {profile, loading}, auth: {user} }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile])
    return loading && profile === null ? (<Spinner />) : (<Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i>Welcome {user && user.name}
        </p>
        {profile !== null ? (<Fragment>
            <DashBoardActions />
            <Experience experience={profile.experiences} />
            <Education education={profile.education} />
            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i>{' '}
                    Delete My Account
                </button>
            </div>
        </Fragment>) : (<Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>

        </Fragment>)}
    </Fragment>)
}

DashBoard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(DashBoard);