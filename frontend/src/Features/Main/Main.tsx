import React from 'react';

export default function Main():JSX.Element {
  return (
    <div>
      <h1>Привет!</h1>
      <p>Это - простой сервис для ведения списка своих желаний и просмотра вишлистов твоих друзей!</p>
      <p>Ты можешь <a href="/auth/registration">войти</a> или <a href="/auth/registration">зарегистрироваться</a> для начала работы.</p>
      <p>Также, мы собрали для тебя список самых желанных подарков, по мнению других пользователей.</p>
        <div>
          <ul>
            <li>Колбаса</li>
            <li>Тортик</li>
            <li>Фен Dyson</li>
          </ul>
          <a href="">Смотреть подробнее...</a>
        </div>
    </div>
  );
}
