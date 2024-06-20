import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentCard from '../../components/comments/CommentCard';
import CommentForm from '../../components/comments/CommentForm';
import { getComments, deleteComment } from '../../utils/data/commentData';

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { postId } = router.query;
  const postIdNumber = parseInt(postId, 10);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments(postId.toString());
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentAdded = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <h1>Comments</h1>
      <CommentForm postId={postIdNumber} onCommentAdded={handleCommentAdded} />
      <hr />
      <div id="comments">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDelete={handleDeleteComment}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentsPage;
