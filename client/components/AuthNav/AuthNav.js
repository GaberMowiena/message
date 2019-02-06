import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

import NavStyles from '../Nav/styles/NavStyles';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const AuthNav = () => (
  <div>
    <div className="bar" />
    <NavStyles>
      <Link href="/">
        <a>home</a>
      </Link>
      <Link href="/pair">
        <a>pair</a>
      </Link>
      <Link href="/messages">
        <a>messages</a>
      </Link>
    </NavStyles>
  </div>
);

export default AuthNav;
