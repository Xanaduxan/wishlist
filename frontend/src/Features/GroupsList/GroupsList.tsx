/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store';
import { initAsyncGroups, initAsyncReq, OutGroup } from './groupSlice';

import './GroupList.css';
import ModalAddGroup from './ModalAddGroup';

function GroupsList(): JSX.Element {

const { groups } = useSelector((state: RootState) => state.groups);
console.log(groups);

const dispatch = useAppDispatch();
const navigate = useNavigate();
const myGroups = JSON.parse(JSON.stringify(groups));

// гит душит
useEffect(() => {
dispatch(initAsyncGroups());
}, []);

   const { groups } = useSelector((state: RootState) => state.groups);
   const { req } = useSelector((state: RootState) => state.groups);
   const { id } = useSelector((state: RootState) => state.user);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   console.log(req);
   console.log(groups);

   const idReq = req.map((el) => el.groupId);

// гит душит
   useEffect(() => {
      dispatch(initAsyncGroups());
      dispatch(initAsyncReq());
    }, []);

return (


<div className="groupList">
<ModalAddGroup />
<h1>Вы состоите в группах:</h1>
{groups.length ? groups.map((group) => (
<div onClick={() => navigate(`/mygroups/${group.id}`)} className="groupCard">

<div key={group.id}>
<div>{group.name}</div>
<img className="groupimg" src={group.picture} alt="Groopimg" />
<div>{group.description}</div>
<button className="button-add shine-button">Выйти из группы</button>
</div>

</div>
)

)
: <></>}

</div>
);

      
}

export default GroupsList;
