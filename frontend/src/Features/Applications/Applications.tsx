import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store';
import { upDateReq, deleteAsyncReq } from './ReqSlice';

function Application(): JSX.Element {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { requests } = useSelector((state: RootState) => state.friendRequest);


    return (
      <div>
         <div className="button-friend-list">
          <button className="button-friend" onClick={() => navigate('/myfriends')} type="button">Мои друзья</button>
         <button className="button-friend" type="button" onClick={() => navigate('/myfriends/find')}>Поиск пользователей</button>
         <button className="button-friend" type="button" onClick={() => navigate('/myfriends/applications')}>Заявки в друзья</button><br />
         </div>
         {requests.length === 0 && <div>Applications in friend NET!!!</div>}
         {requests.map((req) => (
            <div key={req?.login}>
            <img className="fotoFriend" src={req?.image} alt="foto" />
            <p>{req?.login}</p>
            <p>{req?.gender}</p>
            <button type="button" onClick={() => dispatch(upDateReq(req.id))}>Добавить</button>
            <button type="button" onClick={() => dispatch(deleteAsyncReq(req.id))}>Удалить</button>

            </div>
         ))}
      </div>
   );
}

export default Application;
