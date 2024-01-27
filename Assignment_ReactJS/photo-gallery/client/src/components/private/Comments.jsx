import React, { useEffect, useState } from 'react'
const Comments = ({ item }) => {
    const [star, setStar] = useState([])
    useEffect(() => {
        const starsArray = Array.from(
            { length: item.rating },
            (_, index) => <img src="\assets\icons8-star-filled-48.png" alt="" key={index} />);
        setStar(starsArray);
    }, []);
    return (
        <>
            <div className='comment-div'>
                <h3>{item.name}</h3>
                <span>{star}</span>
                <p>{item.comment}</p>
            </div>
        </>
    )
}

export default Comments
