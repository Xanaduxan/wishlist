import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import ModalUpdate from '../ModalUpdate/ModalUpdate';
import { Wish } from '../WishList/types/state';
import { deleteAsyncWish } from '../WishList/wishSlice';
import './WishCard.css';

export default function WishCard({ id, booking, wish, userId, category, title, shop, description, holiday, image }: Wish): JSX.Element {
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState(false);
    const [titles, setTitle] = useState(title);
    const [images, setImage] = useState(image);
    const [shops, setShop] = useState(shop);
    const [descriptions, setDescription] = useState(description);
    const [holidays, setHoliday] = useState(holiday);
    const [categorys, setCategory] = useState(category);
    const userState = useAppSelector((state) => state.user);
    const useModal = () => {
        setModalActive(false);
    };
    return (
        <div>
        <div className="wish wishCard">
         <img className="fotoWish" src={image} alt="foto" onClick={() => setModalActive(true)} />
         <div className="title&desc">
            <div>{title}</div>
            {description ? (<div className='desc'>{description}</div>) : <></>}
        </div>
            {userId === userState.id && (
<><ModalUpdate id={id} booking={booking} wish={wish} userId={userId} category={category} title={title} shop={shop} description={description} holiday={holiday} image={image} />
            <img src="img/delete.png" alt="" className='updateWish' onClick={() => dispatch(deleteAsyncWish({ id }))} />
</>
)}

        </div>
                  <div className={modalActive ? 'modal active' : 'modal'} onClick={() => setModalActive(false)}>
                <div className={modalActive ? 'modal__content active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
                   <div><img className="fotoWish" style={{ width: '200px', height: '150px' }} src={image} alt="foto" /></div>
                   <div>{title}</div>
                   <div>{description}</div>
                   <div>{holiday}</div>
                   <div>{shop}</div>
    <button onClick={useModal}>??????????</button>
                </div>
                  </div>
        </div>
  );
}
