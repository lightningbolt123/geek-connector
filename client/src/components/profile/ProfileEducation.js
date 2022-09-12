import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';

const ProfileEducation = ({ education: { school, degree, fieldOfStudy, current, from, to, description }}) => 
            <div>
                <h3 class='text-dark'>{school}</h3>
                <p>{formatDate(from)} - {!to ? ' Now': formatDate(to)}</p>
                <p><strong>Degree: </strong>{degree}</p>
                <p><strong>Field Of Study: </strong>{fieldOfStudy}</p>
                <p>
                    <strong>Description: </strong>
                    {description}
                </p>
            </div>

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired
}

export default ProfileEducation;
