import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchImg } from '../../redux/features/imageSlice';
import { postFeedback, getFeedback } from '../../redux/features/feedbackSlice';
import Comments from './Comments';
import useError from '../hooks/useError';
const Feedback = () => {
  const {message,setError} = useError();
  const dispatch = useDispatch();
  const params = useParams();
  const [cmnt, setCmnt] = useState([]);
  const { imgData } = useSelector(state => state.image);
  const { feedback } = useSelector(state => state.feedback);
  const imgsrc = imgData.length > 0 ? imgData.filter(item => item.id === parseInt(params.id)) : null;
  useEffect(() => {
    const imageId = parseInt(params.id);
    const userId = parseInt(localStorage.getItem('id'));
    dispatch(getFeedback({ imageId, userId }))
    dispatch(fetchImg());
  }, []);
  useEffect(() => {
    setCmnt([...feedback]);
  }, [feedback])

  const handlesubmit = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const rating = parseInt(e.target.rating.value);
    const imageId = parseInt(params.id);
    const userId = parseInt(localStorage.getItem('id'));
    const name = localStorage.getItem('name');
    try {
      const response = await dispatch(postFeedback({ rating, comment, imageId, userId, name }))
      if (response.meta.requestStatus === 'fulfilled') {
        setCmnt([...cmnt, response.payload]);
        e.target.comment.value = '';
        e.target.rating.value = null;
      }
      else{
        setError(response.error.message)
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className='feedback-main'>
      <div className='feedback-img'>
        <img src={imgsrc !== null ? imgsrc[0].img : '/assets/icons8-loading-48.png'} alt='' />
        <h2 >FEEDBACKS:</h2>
          {
            cmnt?.map((item) => (
              <Comments key={item.id} item={item} />
            ))
          }
      </div>
      <div className='feedback-msg'>
        <form action="" onSubmit={handlesubmit}>
          <div>
            <label htmlFor="">Rating:</label>
            <select name="rating" id="" required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Write your Feedback:</label>
            <textarea name="comment" id="" cols="30" rows="10" required></textarea>
          </div>
          <div>
            <button type='submit'>Send Feedback</button>
          </div>
        </form>
        <h3>Scroll Down to see Your Feedback </h3>
      </div>
    </div>
  )
}

export default Feedback
