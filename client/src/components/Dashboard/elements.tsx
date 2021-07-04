import React, { DetailedHTMLProps, HTMLAttributes, LiHTMLAttributes } from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { Link, LinkProps } from 'react-router-dom';
interface DashboardContainerProps {}
export const DashboardContainer = withStyles<string, {}, DashboardContainerProps>({
  root: {
    overflowY: 'scroll',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '250px',
    background: '#0b0704',
    height: '100%',
    '@media only screen and (max-width: 980px)': {
      margin: '-250px'
    }
  }
})(
  ({
    classes,
    ...other
  }: WithStyles & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
    <div className={classes.root} {...other} />
  )
);

interface DashboardListProps {
  color?: string;
  listStyleType?: string;
  display?: 'flex' | 'grid';
  flexDirection?: 'row' | 'column';
  padding?: number;
}
export const DashboardList = withStyles<string, {}, DashboardListProps>({
  root: {
    color: ({ color }) => color || 'white',
    listStyleType: ({ listStyleType }) => listStyleType || 'none',
    display: ({ display }) => display || 'initial',
    flexDirection: ({ flexDirection }) => flexDirection || 'column',
    padding: ({ padding }) => `${padding}px` || '0px'
  }
})(
  ({
    classes,
    ...other
  }: WithStyles & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
    <div className={classes.root} {...other} />
  )
);

interface DashboardListElementProps {
  padding?: number;
  display?: 'flex' | 'grid';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  hoverBackground?: string;
  fontSize?: number;
  height?: number;
}
export const DashboardListElement = withStyles<string, {}, DashboardListElementProps>({
  root: {
    height: ({ height }) => (height ? `${height}px` : 'auto'),
    fontSize: ({ fontSize }) => (fontSize ? `${fontSize}px` : '16px'),
    display: ({ display }) => display || 'initial',
    padding: ({ padding }) => (padding ? `${padding}px` : 'none'),
    justifyContent: ({ justifyContent }) => justifyContent || 'flex-start',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: 'white',
      textDecoration: 'none',
      background: ({ hoverBackground }) => hoverBackground || '#4d4b50'
    }
  }
})(({ classes, ...other }: WithStyles & LinkProps & React.RefAttributes<HTMLAnchorElement>) => (
  <Link className={classes.root} {...other} />
));

interface IconElementProps {
  marginLeft?: number;
  marginRight?: number;
}
export const IconElement = withStyles<string, {}, IconElementProps>({
  root: {
    marginLeft: ({ marginLeft }) => (marginLeft ? `${marginLeft}px` : 'none'),
    marginRight: ({ marginRight }) => (marginRight ? `${marginRight}px` : 'none')
  }
})(
  ({
    classes,
    children,
    ...other
  }: WithStyles & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
    <span className={classes.root} {...other}>
      {children}
    </span>
  )
);
