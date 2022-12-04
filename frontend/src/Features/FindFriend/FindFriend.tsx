import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { findAsyncFriends } from './findFriendSlice';

function FindFriend(): JSX.Element {
   const [login, setLogin] = useState('');
   const dispatch = useAppDispatch();
   const { friends } = useSelector((state: RootState) => state.findFriends);
   console.log(friends);
   return (
      <div>
         <input value={login} type="text" placeholder="Name Friend" onChange={(e) => setLogin(e.target.value)} />
         <button type="button" onClick={() => dispatch(findAsyncFriends(login))}>Search</button>

         {friends.map((el) => (
         <div>
         <img className="fotoFriend" src={el.image} alt="" />
         <p>{el.name}</p>
         </div>

         ))}
       
      </div>
   );
}

export default FindFriend;