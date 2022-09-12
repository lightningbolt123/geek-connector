import React from 'react';
import PropTypes from 'prop-types';
import { removeComment } from '../../actions/post';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';

const CommentItem = ({ comment: { _id, user, text, avatar, name, date }, postId, auth, removeComment }) => {
    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </a>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on {formatDate(date)}
            </p>
            {!auth.loading && auth.user._id === user && (
                <button className='btn btn-danger' onClick={e => removeComment(postId, _id)}>
                    <i className='fas fa-times'></i>
                </button>
            )}
          </div>
        </div>

    )
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    removeComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { removeComment })(CommentItem);