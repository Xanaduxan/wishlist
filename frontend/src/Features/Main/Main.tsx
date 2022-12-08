    import React from 'react';
    import { useSelector } from 'react-redux';
    import { RootState } from '../../store';
    import { AntiWish } from '../AntiWishList/types/state';
    import { Wish } from '../WishList/types/state';

    export default function Main():JSX.Element {
      const { wishes } = useSelector((state:RootState) => state.wishes);
      const { antiwishes } = useSelector((state:RootState) => state.antiwishes);

      function arrayRandElementWish(wishes: Wish[]) {
        const array = [];
        let i = 5;
        while (i > 0) {
          const rand = Math.floor(Math.random() * wishes.length);
          array.push(wishes[rand]);
          i--;
        }
        return array;
    }
    const randAntiWishes = function (antiwishes: AntiWish[]) {
      const array = [];
      let i = 5;
      while (i > 0) {
        const rand = Math.floor(Math.random() * antiwishes.length);
          array.push(antiwishes[rand]);
          i--;
          console.log('123');
      }
      return array;
    };

      return (
        <div>
          <h1>Привет!</h1>
          <p>Это - простой сервис для ведения списка своих желаний и просмотра вишлистов твоих друзей!</p>
          <p>Ты можешь <a href="/auth/login">войти</a> или <a href="/auth/registration">зарегистрироваться</a> для начала работы.</p>
          <p>Мы собрали для тебя список самых желанных подарков, по мнению других пользователей.</p>
            <div><ul>
              {wishes.length && arrayRandElementWish(wishes).map((wish:Wish) =>
              <li key={wish.id}>{wish.title}</li>)}
                 </ul>

          А то, чего люди совсем не хотят видеть, собрано{' '}

              <a href="/antiwishlist">здесь</a>
          <div />

          <h3>А пока, мы отобрали для тебя <a href="/wishlist">лучшие</a> и <a href="/wishlist">худшие</a>  идеи для подарков</h3>

            </div>
        </div>
      );
    }
