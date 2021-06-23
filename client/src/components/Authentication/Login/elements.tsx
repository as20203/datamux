import React, { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { Button, ButtonProps, Container, ContainerProps } from '@material-ui/core';
interface LoginButtonProps {
  backgroundColor?: string;
  textColor?: string;
}
export const LoginButton = withStyles<string, {}, LoginButtonProps>({
  root: {
    display: 'block',
    margin: '5px auto',
    background: ({ backgroundColor }) => backgroundColor || 'green',
    color: ({ textColor }) => textColor || 'red',
    '&:hover': {
      backgroundColor: ({ backgroundColor }) => backgroundColor || 'green'
    }
  }
})(({ classes, ...other }: WithStyles & ButtonProps) => (
  <Button className={classes.root} {...other} />
));

export const LoginMain = withStyles({
  root: {
    width: '100%',
    height: '100%',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgb(130,180,231)',
    fontFamily: 'Roboto',
    '@media (min-width: 1280px)': {
      maxWidth: 'none'
    }
  }
})(({ classes, ...other }: WithStyles & ContainerProps) => (
  <Container className={classes.root} {...other} />
));

interface LoginContainer {
  loading: boolean;
}
export const LoginContainer = withStyles<string, {}, LoginContainer>({
  root: {
    margin: '0px',
    justifyContent: 'center',
    height: '500px',
    display: ({ loading }) => (loading ? 'none' : 'flex')
  }
})(({ classes, ...other }: WithStyles & ContainerProps) => (
  <Container className={classes.root} {...other} />
));

interface LoginImageContainer {
  display: boolean;
}
export const LoginImageContainer = withStyles<string, {}, LoginImageContainer>({
  root: {
    margin: '0px',
    padding: '0px',
    height: '100%',
    width: '450px',
    boxShadow: '-3px 3px 5px 2px rgba(0,47,52,.5)',
    display: ({ display }) => (display ? 'none' : 'flex')
  }
})(({ classes, ...other }: WithStyles & ContainerProps) => (
  <Container className={classes.root} {...other} />
));

export const LoginImage = withStyles({
  root: {
    width: '100%',
    height: '100%'
  }
})(
  ({
    classes,
    ...other
  }: WithStyles &
    DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => (
    <img className={classes.root} {...other} />
  )
);

interface LoginForm {
  width: number;
}
export const LoginForm = withStyles<string, {}, LoginForm>({
  root: {
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '8px 16px',
    borderLeft: '1px solid rgba(0,47,52,.2)',
    boxShadow: '3px 3px 5px 2px rgba(0,47,52,.5)',
    width: ({ width }) => `${width}px`
  }
})(
  ({
    classes,
    ...other
  }: WithStyles & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) => (
    <form className={classes.root} {...other} />
  )
);
