import React from 'react';
import { FooterDiv } from './Footer.styled';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <FooterDiv>
      Created by Kyrylo Savchenko as part of the GoIT course. Let's keep in
      touch!
      <div>
        <a href="url">
          <GitHubIcon />
        </a>
        <a href="url">
          <LinkedInIcon />
        </a>
      </div>
    </FooterDiv>
  );
};

export default Footer;
