import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Education = ({ education , deleteEducation }) => {
    const educations = education.map( edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>{formatDate(edu.from)} -{' '}
            {edu.to === null ? (' Now'): formatDate(edu.to)}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
};

export default connect(null, { deleteEducation })(Education);