import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import friendFindSlice from './Features/FindFriend/findFriendSlice';
import friendSlice from './Features/FriendsList/friendSlice';
// Слайсы - это отдельные модули нашего приложения. У каждого слайса - свой редьюсер.
const store = configureStore({
// теперь функция combineReducers не нужна
reducer: {
myFriends: friendSlice,
findFriends: friendFindSlice
},
});
// для правильной типизации будем использовать useAppDispatch вместо
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
