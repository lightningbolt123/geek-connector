import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../dashboard/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ post: { post, loading }, getPost, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);
    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to='/posts' className='btn'>Back To Posts</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className='comments'>
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </Fragment>
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired  
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})
export default connect(mapStateToProps, { getPost })(Post);
