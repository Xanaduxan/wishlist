import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as api from '../../Api/api';
import { emailValidation, passwordValidation } from '../Registration/validation';
import Response from '../Registration/types/Response';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearEmailError, clearPasswordError, userLoginAsync } from '../Registration/userSlice';

const theme = createTheme();

interface IRegistrationForm {
   nickName: string
   email: string
   password: string
   repeatPassword: string
}

export default function SignUp():JSX.Element {
  const { handleSubmit, control, setError } = useForm<IRegistrationForm>({ mode: 'onChange' });
  const { errors } = useFormState({ control });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { emailError, passwordError, email } = useAppSelector((state) => state?.user);

  useEffect(() => {
    if (emailError) {
  setError('email', {
      type: 'server',
      message: emailError
    });
    dispatch(clearEmailError());
    }
  }, [emailError]);

  useEffect(() => {
    if (passwordError) {
      setError('password', {
        type: 'server',
        message: passwordError
      });
    dispatch(clearPasswordError());
    }
  }, [passwordError]);

  useEffect(() => {
    if (email) {
    dispatch(clearPasswordError());
    dispatch(clearEmailError());
    navigate('/mywishes');
    }
  }, [email]);

  const onSubmit:SubmitHandler<IRegistrationForm > = (data):void => {
    dispatch(userLoginAsync(data));
    // api.login(data).then((res:Response) => {
    //   if (res.status === 'user not found') {
    //     setError('email', {
    //       type: 'server',
    //       message: res.message
    //     });
    //   } else if (res.status === 'error') {
    //     setError('password', {
    //       type: 'server',
    //       message: res.message
    //     });
    //   }
    // });
    // navigate('/');
  };
const [isShow, setIsShow] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <Controller
                control={control}
                name="email"
                rules={emailValidation}
                render={({ field }) => (
                    <TextField
                      // required
                      fullWidth
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(event) => field.onChange(event)}
                      value={field.value || ''}
                      error={!!errors.email?.message}
                      helperText={errors.email?.message}
                    />
)}
              />
              </Grid>
              <Grid item xs={12}>
              <Controller
                control={control}
                name="password"
                rules={passwordValidation}
                render={({ field }) => (
                    <TextField
                      // required
                      fullWidth
                      name="password"
                      label="Password"
                      type={isShow ? 'text' : 'password'}
                      autoComplete="new-password"
                      onChange={(event) => field.onChange(event)}
                      value={field.value || ''}
                      error={!!errors.password?.message}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                          <IconButton onClick={() => setIsShow((prev) => !prev)}>
                            { isShow ? <VisibilityOff /> : <Visibility /> }
                          </IconButton>
                                      </InputAdornment>
                      }}
                    />
)}
              />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
