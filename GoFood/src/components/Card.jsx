import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useCart } from './Contextreducer';
const Card = (props) => {
    let dispatch = useDispatch();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let optionKey = Object.keys(options);
    const [qtn, setqtn] = useState(1);
    const [size, setsize] = useState("");
    const handleAddToCart = async () => {
        let food = [];
        
        for (const item of data) {
            if (item.id === props.fooditem._id) {
                food = item;
                break;
            }
        }
        console.log(food);
        console.log(new Date());
    
        if (food.size !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.fooditem._id, price: finaPrice, qtn: qtn });
                return;
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finaPrice, qtn: qtn, size: size, img: props.fooditem.img });
                console.log("Size different so simply ADD one more to the list");
                return;
            }
            return;
        }
    
        await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finaPrice, qtn: qtn, size: size });
        console.log(data);
    };
    
    let finaPrice = qtn * parseInt(options[size]);
    useEffect(() => {
        setsize(priceRef.current.value)
    }, [])
    return (
        <div> <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
            <img src={props.fooditem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title">{props.fooditem.name}</h5>
                <div className='container w-100'>
                    <select className='m-2 h-100  bg-info rounded' onChange={(e) => setqtn(e.target.value)} >
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className='m-2 h-100 bg-info rounded' ref={priceRef} onChange={(e) => setsize(e.target.value)}>
                        {optionKey.map((data) => {
                            return <option key={data} value={data}>{data}</option>
                        })}
                    </select>
                    <div className='d-inline h-100 fs-9'>
                    {isNaN(finaPrice) ? "Invalid Price" : finaPrice}
                    </div>
                </div>
                <hr></hr>
                <button className='btn btn-info justify-center ms-2' onClick={handleAddToCart}>Add to cart</button>


            </div></div></div>
    )
}

export default Card