// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Icon, Menu } from 'semantic-ui-react';

// const NestedLinks = props => {
//   const handleNestedClick = (_, titleProps) => {
//     props.setNestedActiveIndex(_ => {
//       const { index } = titleProps;
//       sessionStorage.setItem('nestedActiveIndex', index);
//       return index;
//     });
//   };

//   const nestedLinks = props.links.map(link => {
//     return (
//       <Menu.Item
//         key={link.index}
//         as={Link}
//         active={props.nestedActiveIndex === link.index}
//         index={link.index}
//         onClick={handleNestedClick}
//         to={link.to}
//       >
//         <Icon name={link.name} />
//         {link.title}
//       </Menu.Item>
//     );
//   });

//   return <React.Fragment> {nestedLinks}</React.Fragment>;
// };

// export { NestedLinks };
