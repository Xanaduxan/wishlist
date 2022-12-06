import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store';
import { initAsyncGroups } from './groupSlice';
import './GroupList.css'

function GroupsList(): JSX.Element {
   const { groups } = useSelector((state: RootState) => state.groups);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   // const flattedGroups = groups.flat();
   // console.log(flattedGroups);
   console.log(groups);
   
   

   useEffect(() => {
      dispatch(initAsyncGroups())
    }, [])

   return (
      <div className='groupList'>
      
      <h1>Вы состоите в группах:</h1>
         {groups.length ? groups.map((group) => 
      <div className='groupCard'>
         <div key={group.id}>
            <div>{group.name}</div>
            <img className="groupimg" src={group.picture} alt="Groopimg"/>
            <div>{group.description}</div>
            <button>Выйти из группы</button>
            </div>
         </div>
      ) : <div>Loading</ div>}
      </div>
   )
}

export default GroupsList