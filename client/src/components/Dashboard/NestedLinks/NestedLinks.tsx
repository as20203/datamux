import React, { FC, useEffect, useState } from 'react';
import { DashboardList, DashboardListElement, IconElement } from '../elements';
import { Collapse } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
interface CollapseElements {
  text: string;
  muiIcon: JSX.Element;
  navigation: string;
}
interface NestedLinksDashboardProps {
  collapseElements: CollapseElements[];
  mainText: string;
  dashboardLink: string;
}
const isNestedLinkActive = (collapseElements: CollapseElements[], dashboardLink: string) => {
  return collapseElements.some(({ navigation }) => navigation === dashboardLink);
};
export const NestedLinks: FC<NestedLinksDashboardProps> = ({
  collapseElements,
  mainText,
  dashboardLink
}) => {
  const [open, setOpen] = useState(isNestedLinkActive(collapseElements, dashboardLink));
  return (
    <>
      <DashboardListElement
        to='#'
        display='flex'
        padding={10}
        justifyContent={'space-between'}
        onClick={() => setOpen(open => !open)}
      >
        {mainText}
        {open ? (
          <IconElement>
            <ExpandMore />
          </IconElement>
        ) : (
          <IconElement>
            <ExpandLess />
          </IconElement>
        )}
      </DashboardListElement>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <DashboardList display='flex' flexDirection='column' padding={15} listStyleType='none'>
          {collapseElements.map(({ text, muiIcon, navigation }) => {
            return (
              <DashboardListElement
                active={dashboardLink === navigation}
                activeBackground='#34414e'
                to={navigation}
                display='flex'
                padding={15}
              >
                <IconElement marginRight={15}>{muiIcon}</IconElement>
                {text}
              </DashboardListElement>
            );
          })}
        </DashboardList>{' '}
      </Collapse>
    </>
  );
};
