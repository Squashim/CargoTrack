import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useLogout } from '@/features/auth/queries/use-logout';

const DashboardPage = () => {
  const { logout } = useLogout();
  const { user } = useAuth();

  return (
    <>
      <Button variant="outline" onClick={() => logout.mutate()}>
        Logout
      </Button>
      <p>{JSON.stringify(user)}</p>
    </>
  );
};

export { DashboardPage };
