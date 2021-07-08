import React,{useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import ReactStars from "react-rating-stars-component";

const StarRating = ({state}) => {

    const [rate, setRate] = useState(1.5)
    // const [hover, setHover] = useState(null)

    const dispatch = useDispatch()

    // useEffect(()=>{
    //     dispatch({type: state, payload: hover})
    // },[hover])

    const rating = {
        size: 20,
        count: 5,
        color: "white",
        activeColor: "yellow",
        value: rate,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="fa fa-star" />,
        halfIcon: <i className="fa fa-star-half-o" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: newValue => {
            setRate(newValue)
            dispatch({type: state, payload: newValue})
        }
    };

    return(
        <div className='star-rating flex'>
            <ReactStars {...rating} />
        </div>
    )
}

export default StarRating