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
    id: 'upload',
    icon: '/img/icon/upload-icon.png',
    label: 'navBar.upload',
    to: '/upload'
  },
  {
    id: 'download',
    icon: '/img/icon/download-icon.png',
    label: 'navBar.download',
    to: '/download'
  },
  {
    id: 'maps',
    icon: '/img/icon/maps-icon.png',
    label: 'navBar.maps',
    to: '/visualize'
  },
  {
    id: 'share-files',
    icon: '/img/icon/share-files.svg',
    label: 'navBar.share-files',
    to: '/share-files'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.profile',
    onClick: 'profileRedirect',
    icon: 'cog'
  },
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
