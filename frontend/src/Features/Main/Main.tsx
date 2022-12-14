
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState} from '../../store';
import { AntiWish } from '../AntiWishList/types/state';
import { Wish } from '../WishList/types/state';
import '../Main/Main.css'


export default function Main():JSX.Element {
  const { wishes } = useSelector((state:RootState) => state.wishes);
  const { antiwishes } = useSelector((state:RootState) => state.antiwishes);

  return (
    <div className='mainText'>
      <h1>Привет!</h1>
      <p>Это - простой сервис для ведения списка своих желаний и просмотра вишлистов твоих друзей!</p>
      <p>Ты можешь <a href="/auth/login">войти</a> или <a href="/auth/registration">зарегистрироваться</a> для начала работы.</p>
      <p>Мы собрали для тебя список самых желанных подарков, по мнению других пользователей.</p>
        <div className='flex'><ul className='randomWishes'>
        <div>
          {wishes.length && wishes.map((wish:Wish, idx, arr) => idx < 5 ?
          <li key={wish.id}>{arr[Math.floor(Math.random() * arr.length)].title}</li> : null)}
            </div>
             </ul>

      А то, чего люди совсем не хотят видеть, собрано <a href="/antiwishlist">здесь</a>{' '}
      <div>
        <ul className='randomAnti'>

        {antiwishes.length && antiwishes.map((antiWish: AntiWish, idx, arr) => idx < 5 ?
          <li key={antiWish.id}>{arr[Math.floor(Math.random() * arr.length)].title}</li> : null)}

        </ul>
      </div>
          



          <h3>А пока, мы отобрали для тебя <a href="/wishlist">лучшие</a> и <a href="/antiwishlist">худшие</a>  идеи для подарков</h3>

            </div>
        </div>
      );
    }

