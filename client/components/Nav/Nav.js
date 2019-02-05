import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

import NavStyles from './styles/NavStyles';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Nav = () => (
  <div>
    <div className="bar" />
    <NavStyles>
      <Link href="/register">
        <a>register</a>
      </Link>
      <Link href="/">
        <a>home</a>
      </Link>
      <Link href="/signin">
        <a>sign in</a>
      </Link>
    </NavStyles>
  </div>
);

export default Nav;
