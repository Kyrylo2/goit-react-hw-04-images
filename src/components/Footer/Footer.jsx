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
        <a href="https://github.com/Kyrylo2">
          <GitHubIcon />
        </a>
        <a href="https://www.linkedin.com/in/savchenko-kyrylo/">
          <LinkedInIcon />
        </a>
      </div>
    </FooterDiv>
  );
};

export default Footer;
