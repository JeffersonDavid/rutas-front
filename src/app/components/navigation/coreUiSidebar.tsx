'use client'
import React from 'react';
import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CNavGroup,
  CIcon,
  CBadge,
  CSidebarToggler
} from '@coreui/react';

const CustomSidebar = ({ narrow = '', unfoldable ='' }) => {
  return (
    <CSidebar className="border-end">
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>CoreUI</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Nav Title</CNavTitle>
        <CNavItem href="#"><CIcon customClassName="nav-icon" icon={'cilSpeedometer'} /> Nav item</CNavItem>
        <CNavItem href="#"><CIcon customClassName="nav-icon" icon={'cilSpeedometer'} /> With badge <CBadge color="primary ms-auto">NEW</CBadge></CNavItem>
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={'cilPuzzle'} /> Nav dropdown
            </>
          }
        >
          <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
          <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
        </CNavGroup>
        <CNavItem href="https://coreui.io"><CIcon customClassName="nav-icon" icon={'cilCloudDownload'} /> Download CoreUI</CNavItem>
        <CNavItem href="https://coreui.io/pro/"><CIcon customClassName="nav-icon" icon={'cilLayers'} /> Try CoreUI PRO</CNavItem>
      </CSidebarNav>
      <CSidebarHeader className="border-top">
        <CSidebarToggler />
      </CSidebarHeader>
    </CSidebar>
  );
};

export default CustomSidebar;
