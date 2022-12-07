import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store';
import { postAsyncReq } from '../Applications/ReqSlice';


function FindFriend(): JSX.Element {
   const [loginUser, setLoginUser] = useState('');
   const dispatch = useAppDispatch();
   const { newFriends } = useSelector((state: RootState) => state.findFriends);
   const { myfriendsAll } = useSelector((state: RootState) => state.myFriends);
   // const {login} = useSelector((state: RootState) => state.user)
   const navigate = useNavigate();
   const users = newFriends.filter((user) => user.login.includes(loginUser));
   const friendList = myfriendsAll.map((el) => el.id);
  
   return (
      <div>
         <div className="button-friend-list">
         <button className="button-friend" onClick={() => navigate('/myfriends')} type="button">Мои друзья</button>
         <button className="button-friend" type="button" onClick={() => navigate('/myfriends/find')}>Поиск пользователей</button>
         <button className="button-friend" type="button" onClick={() => navigate('/myfriends/applications')}>Заявки в друзья</button><br />
         </div>
         <input value={loginUser} type="text" placeholder="Name Friend" onChange={(e) => setLoginUser(e.target.value)} />

         {/* {newFriends.map((newFriend) => (
            <div key={newFriend?.id}>
               <img className="fotoFriend" src={newFriend?.image} alt="" />
               <p>{newFriend?.login}</p>
            </div>

         ))} */}
         {users.map((user) => (
            <div>
               <img className="fotoFriend" src={user.image} alt="" />
               <p>{user.login}</p>
               <p>{user.gender}</p>
               {friendList.includes(user.id) ? null : <button type="button" onClick={() => dispatch(postAsyncReq(user.id))}>Добавить в друзья</button>}
            </div>
         ))}

      </div>
   );
}

export default FindFriend;
