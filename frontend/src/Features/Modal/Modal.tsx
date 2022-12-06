import React, { useEffect, useState } from 'react';
import './modal.css'
import { RootState, useAppDispatch } from '../../store';
import { addAsyncWish } from '../WishList/wishSlice';

export default function Modal(): JSX.Element {
    const [modalActive, setModalActive] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [shop, setShop] = useState('');
    const [description, setDescription] = useState('');
    const [holiday, setHoliday] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useAppDispatch();
    return (
        <>
            <button className='addWish open-btn' onClick={() => setModalActive(true)}>add wish</button>
            <div className={modalActive ? 'modal active' : 'modal'} onClick={()=>setModalActive(false)}>
                <div className={modalActive ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
    <input id="input" 
    type="text" 
    placeholder='title обязательное поле' 
    value={title} 
    onChange={(e) => setTitle(e.target.value)}/>
    <input id="input" 
    type="text" 
    placeholder='image'
    value={image} 
    onChange={(e) => setImage(e.target.value)}/>
    <input id="input" 
    type="text" 
    placeholder='shop'
    value={shop} 
    onChange={(e) => setShop(e.target.value)}/>
    <input id="input" 
    type="text" 
    placeholder='description'
    value={description} 
    onChange={(e) => setDescription(e.target.value)}/>
    <input id="input" 
    type="text" 
    placeholder='holiday'
    value={holiday} 
    onChange={(e) => setHoliday(e.target.value)}/>
    <select value={category} id="select" onChange={(e) => setCategory(e.target.value)}>
        <option value="для себя">для себя</option>
        <option value="малому">малому</option>
    </select>
    <button onClick={()=>dispatch(addAsyncWish({title, image, shop, description, holiday, category}))}>Добавить</button>
                </div>
            </div>
        </>
    )
}