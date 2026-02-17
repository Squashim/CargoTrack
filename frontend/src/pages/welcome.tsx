import { ROUTES } from '@/lib/constants';
import { Link } from 'react-router';

const WelcomePage = () => {
  // TODO: Remove this
  const allRoutes = Object.values(ROUTES).flatMap((route) => {
    if (typeof route === 'string') {
      return route;
    }

    return Object.entries(route)
      .filter(([key]) => key !== 'BASE')
      .map(([, path]) => path);
  });

  return (
    <nav>
      {allRoutes.map((route) => (
        <div key={route}>
          <Link to={route}>{route}</Link>
        </div>
      ))}
    </nav>
  );
};

export { WelcomePage };
