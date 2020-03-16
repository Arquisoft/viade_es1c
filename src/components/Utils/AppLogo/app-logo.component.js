import React from 'react';

import { Image } from './app-logo.style';
import LogoApp from '../../../images/logoViaDe.svg';

type Props = {
  children: React.Node,
  className: String
};

const AppLogo = ({ children, className }: Props) => (
  <Image className={className} image = {LogoApp} >{children}</Image>
);

export default AppLogo;