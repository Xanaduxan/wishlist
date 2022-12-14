/* eslint-disable max-len */
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import { Button, MenuItem, Select, IconButton, Grid, Avatar, InputLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import { simpleValidations } from './validations';
import { userProfileAsyncUpdate, userProfileInitAsync, userProfileWishesAsyncInit, userProfileAntiWishesAsyncInit, userProfileAvatarUpdataAsync } from './userProfileSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import * as api from '../../Api/api';
import WishCard from '../WishCard/WishCard';
import WishList from '../WishList/WishList';
import { Wish } from '../WishList/types/state';
import { AntiWish } from '../AntiWishList/types/state';
import AntiWishItem from '../AntiWishList/AntiWishItem';

interface ChangeForm {
  surname: string
  name: string
  gender: string
  image: string
}

function Profile():JSX.Element {
  const { handleSubmit, control, setError, resetField } = useForm<ChangeForm>({ mode: 'onChange' });
  const { errors } = useFormState({ control });
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(userProfileInitAsync(id!));
    dispatch(userProfileWishesAsyncInit(id!));
    dispatch(userProfileAntiWishesAsyncInit(id!));
  }, []);

  const userProfileState = useAppSelector((state) => state.userProfile);

  const userState = useAppSelector((state) => state.user);
  // console.log(userState);

  const onSubmit:SubmitHandler<ChangeForm> = (data):void => {
  const newData = { ...data, currentUserId: id };
   dispatch(userProfileAsyncUpdate(newData));
   resetField('gender');
   resetField('surname');
   resetField('name');
   resetField('image');
  };

  function handlePhoto(e:any):void {
    const pictures = [...e.target.files];
    const files = new FormData();
    pictures.forEach((picture) => files.append('avatar', picture));
    // files.append('avatar', pictures[0]);
    dispatch(userProfileAvatarUpdataAsync({ files, id: id! }));
  }

  return (
<Grid className="wishlist-profile profile-edit" container columnSpacing={{ xs: 1, sm: 2, md: 10 }}>
<Grid xs={4} item>
    <h4 className="pro">??????????????</h4>
    <Avatar
      sx={{ width: 200, height: 200, margin: 10, padding: 10, }}
      alt={userProfileState.name}
      src={userProfileState.image}
    /><div className="antiwish-cell">
      <p className="p">??????: {userProfileState.gender}</p>
      <p className="p">??????: {userProfileState.name}</p>
      <p className="p">??????????????: {userProfileState.surname}</p>
      </div>
</Grid>
{Number(id) === userState.id && (
  <Grid xs={4} item>
     <h4 className="prof">???????????????? ??????????????</h4>
    <Box component="form" action="/upload" method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>

    <Controller
      control={control}
      name="surname"
      rules={simpleValidations}
      render={({ field }) => (
                    <TextField
                      name="surname"
                      fullWidth
                      label="??????????????"
                      onChange={(event) => field.onChange(event)}
                      value={field.value || ''}
                      error={!!errors.surname?.message}
                      helperText={errors.surname?.message}
                      className="firstInput"
                    />
)}
    />
    <Controller
      control={control}
      name="name"
      rules={simpleValidations}
      render={({ field }) => (
                    <TextField
                      name="name"
                      fullWidth
                      label="??????"
                      onChange={(event) => field.onChange(event)}
                      value={field.value || ''}
                      error={!!errors.name?.message}
                      helperText={errors.name?.message}
                    />
)}
    />

      {/* <Controller
        control={control}
        name="image"
        rules={simpleValidations}
        render={({ field }) => (
                    <TextField
                      name="image"
                      fullWidth
                      label="Image"
                      onChange={(event) => field.onChange(event)}
                      value={field.value || ''}
                      error={!!errors.image?.message}
                      helperText={errors.image?.message}
                    />
)}
      /> */}

    <Controller
      control={control}
      name="gender"
      rules={simpleValidations}
      render={({ field }) => (
        <>
        <h5 className="pol">?????????????? ??????</h5>
        <Select
          autoWidth
          className="sel"
          name="gender"
          label="Gender"
          value={field.value || ''}
          onChange={(event) => field.onChange(event)}
          error={!!errors.gender?.message}
        >
         <MenuItem value="male">??????????????</MenuItem>
         <MenuItem value="female">??????????????</MenuItem>
        </Select>
        </>
)}
    />
    <h5 className="adF">???????????????? ????????????????????</h5>
       <input
         type="file"
         name="image"
         className="fotoInput"
         onChange={handlePhoto}
       />
    <Button
      className="button-add shine-button"
      type="submit"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      value="Upload!"
    >
      ????????????????
    </Button>
    </Box>
  </Grid>
)}
{Number(id) !== userState.id && (
  <>
  <Grid xs={4} item>
  {userProfileState.wishes!.map((wish:Wish) => <WishCard id={wish.id} booking={wish.booking} wish={wish.wish} userId={wish.userId} category={wish.category} title={wish.title} shop={wish.shop} description={wish.description} holiday={wish.holiday} image={wish.image} />)}
  </Grid>
  <Grid xs={4} item>
  {userProfileState.antiWishes!.map((antiWish:AntiWish) => <AntiWishItem anti={antiWish} />)}
  </Grid>
  </>
)}

</Grid>

  );
}

// ds
export default Profile;
