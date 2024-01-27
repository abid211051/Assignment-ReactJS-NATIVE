import React from 'react'

const FilterButton = ({filtertogle, filter}) => {
  return (
    <div className='filter-btn'>
      <button 
      onClick={()=>filtertogle('all')}
      className={`${filter.all? 'focus':null}`}>
        All
      </button>
      <button 
      onClick={()=>filtertogle('nature')}
      className={`${filter.nature? 'focus':null}`}>
        Nature
      </button>
      <button 
      onClick={()=>filtertogle('night')}
      className={`${filter.night? 'focus':null}`}>
        Night
      </button>
      <button 
      onClick={()=>filtertogle('water')}
      className={`${filter.water? 'focus':null}`}>
        Under Water
      </button>
    </div>
  )
}

export default FilterButton
