import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import * as api from '../../Api/api';
import { emailValidation, nickNameValidation, passwordValidation } from './validation';

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

  console.log(errors);

  const onSubmit:SubmitHandler<IRegistrationForm > = (data):void => {
    console.log(data);
    if (data.password !== data.repeatPassword) {
      console.log('ia v if');
      setError('repeatPassword', {
        type: 'onSubmit',
        message: 'пароли не совпадают'
      });
      return;
    }
    console.log('ia posle if');
    api.registration(data).then((res) => console.log(res));
  };
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="nickName"
                  rules={nickNameValidation}
                  render={({ field }) => (
                    <TextField
                      // autoComplete="given-name"
                      name="nickName"
                      fullWidth
                      label="Nick Name"
                      // autoFocus
                      // required
                      onChange={(event) => field.onChange(event)}
                      value={field.value || ''}
                      error={!!errors.nickName?.message}
                      helperText={errors.nickName?.message}
                    />
)}
                />
              </Grid>
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
                      type="password"
                      autoComplete="new-password"
                      onChange={(event) => field.onChange(event)}
                      value={field.value || ''}
                      error={!!errors.password?.message}
                      helperText={errors.password?.message}
                    />
)}
              />
              </Grid>
              <Grid item xs={12}>
              <Controller
                control={control}
                name="repeatPassword"
                render={({ field }) => (
                    <TextField
                      // required
                      fullWidth
                      name="repeatPassword"
                      label="Repeat Password"
                      type="password"
                      autoComplete="new-password"
                      onChange={(event) => field.onChange(event)}
                      value={field.value || ''}
                      error={!!errors.repeatPassword?.message}
                      helperText={errors.repeatPassword?.message}
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
