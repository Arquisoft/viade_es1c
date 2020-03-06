/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'welcome',
    icon: '/img/icon/welcome-icon.png',
    label: 'navBar.welcome',
    to: '/welcome'
  },
  {
    id: 'profile',
    icon: '/img/icon/user-icon.png',
    label: 'navBar.profile',
    to: '/profile'
  },
  {
    id: 'maps',
    icon: '/img/icon/maps-icon.png',
    label: 'navBar.maps',
    to: '/tictactoe'
  },
];

export const ProfileOptions = [
  {
    label: 'navBar.profile',
    onClick: 'profileRedirect',
    icon: 'cog'
  },
  {
    label: 'navBar.formModelConvert',
    onClick: 'formModelConvertRedirect'
  },
  {
    label: 'navBar.formModelRender',
    onClick: 'formModelRenderRedirect'
  },
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
