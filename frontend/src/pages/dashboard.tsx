import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DashboardPage = () => {
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast.success('test');
      }}
    >
      Dashboard
    </Button>
  );
};

export { DashboardPage };
