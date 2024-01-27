import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImg } from '../../redux/features/imageSlice';
import FilterButton from './FilterButton';
const ImageData = () => {
  const [nextcnt, setNextcnt] = useState(9);
  const [filter, setFilter] = useState({
    all: true,
    nature: false,
    night: false,
    water: false
  })
  const [pic, setPic] = useState([]);
  const { imgData, error } = useSelector(state => state.image);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchImg());
  }, [])
  useEffect(() => {
    if (filter.all) {
      const mypic = imgData.slice(0, nextcnt);
      setPic(mypic);
    }
    else if (filter.nature) {
      const mypic = imgData.filter(item => item.category === 'nature').slice(0, nextcnt);
      setPic(mypic);
    }
    else if (filter.night) {
      const mypic = imgData.filter(item => item.category === 'night').slice(0, nextcnt);
      setPic(mypic);
    } else if (filter.water) {
      const mypic = imgData.filter(item => item.category === 'underwater').slice(0, nextcnt);
      setPic(mypic);
    }
  }, [imgData, nextcnt, filter])

  const filtertogle = (val) => {
    setFilter({
      all: false,
      nature: false,
      night: false,
      water: false,
      [val]: true
    })
  }
  return (
    <>
      <FilterButton filtertogle={filtertogle} filter={filter} />
      <div className='imgContainer'>
        {error ?
          <p className='error'>{error}</p>
          :
          pic.length > 0 && pic.map((item) => (
            <Link to={`/private/feedback/${item.id}`} key={item.id} className='imgdiv-link'>
              <div className='imgdiv'>
                <img src={item.img} alt={item.category} />
                <p>{item.category}</p>
              </div>
            </Link>
          ))
        }
      </div>
      <div className='show-more'>
        <button onClick={() => nextcnt <= 21 ? setNextcnt(prev => prev + 5) : null}>Show more</button>
      </div>
    </>
  )
}

export default ImageData;