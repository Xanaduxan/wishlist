import React from 'react';
import { useSelector } from 'react-redux';
import { RootState} from '../../store';

import { Wish } from '../WishList/types/state';
import '../Main/Main.css';


export default function Main():JSX.Element {
  const { wishes } = useSelector((state:RootState) => state.wishes);


  return (
    <div>
      <h1>Привет!</h1>
      <p>Это - простой сервис для ведения списка своих желаний и просмотра вишлистов твоих друзей!</p>
      <p>Ты можешь <a href="/auth/login">войти</a> или <a href="/auth/registration">зарегистрироваться</a> для начала работы.</p>
      <p>Мы собрали для тебя список самых желанных подарков, по мнению других пользователей.</p>
        <div><ul>
          {wishes.map((wish:Wish) =>
          <li>{wish.title}</li>)}
             </ul>
      <h3>А пока, мы отобрали для тебя лучшие и худшие идеи для подарков</h3>
        

        </div>
    </div>
  );
}