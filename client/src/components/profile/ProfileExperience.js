import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate'; 

const ProfileExperience = ({ experience: { company, title, location, current, from, to, description }}) => 
            <div>
                <h3 className='text-dark'>{company}</h3>
                <p>{formatDate(from)} - {!to ? ' Now': formatDate(to)}</p>
                <p><strong>Position: </strong>{title}</p>
                <p>
                    <strong>Description: </strong>
                    {description}
                </p>
            </div>

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
}

export default ProfileExperience
