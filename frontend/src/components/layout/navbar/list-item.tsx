import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

interface ListItemProps extends React.ComponentPropsWithoutRef<'li'> {
  href: string;
  isActive: boolean;
  icon?: LucideIcon;
  isMobile?: boolean;
  onClose?: () => void;
}

function ListItem({ title, href, children, icon: Icon, isActive, onClose, isMobile, ...props }: ListItemProps) {
  const content = (
    <>
      {Icon && <Icon className="size-5" />}
      <div className="flex flex-col gap-1 text-sm">
        <div className="leading-none font-medium">{title}</div>
        {children && <div className="text-muted-foreground line-clamp-2">{children}</div>}
      </div>
    </>
  );

  return (
    <li {...props}>
      {isMobile ? (
        <Link
          data-active={isActive}
          to={href}
          onClick={onClose}
          className="data-[active=true]:focus:bg-muted data-[active=true]:hover:bg-muted data-[active=true]:bg-muted/50 focus-visible:ring-ring/50 hover:bg-muted focus:bg-muted flex items-center gap-4 rounded-xl p-3 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4"
        >
          {content}
        </Link>
      ) : (
        <NavigationMenuLink
          data-active={isActive}
          closeOnClick
          render={
            <Link to={href} className="flex-row items-center gap-4">
              {content}
            </Link>
          }
        />
      )}
    </li>
  );
}

export { ListItem };
