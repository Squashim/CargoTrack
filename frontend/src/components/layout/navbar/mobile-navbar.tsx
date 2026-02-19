import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@/features/auth/hooks/use-auth';
import type { NavMenuItem } from '@/types/common';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';
import { MobileActionButtons } from './action-buttons';
import { ListItem } from './list-item';

interface MobileNavbarProps {
  menuItems: NavMenuItem[];
}

function MobileNavbar({ menuItems }: MobileNavbarProps) {
  const { t } = useTranslation(['nav']);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  const handleAccordionClose = () => {
    setAccordionValue([]);
  };

  return (
    <nav className="grid lg:hidden container w-full h-[calc(100%-1rem)] items-center mx-auto backdrop-blur-lg bg-background/90 rounded-2xl px-4 shadow-md inset-shadow-foreground/10 inset-shadow-xs">
      <div className="flex items-center justify-between">
        <Logo redirect />
        <div className="flex items-center gap-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger
              render={
                <Button
                  size="icon"
                  variant="outline"
                  title={t('nav:hamburgerMenu.open')}
                  aria-label={t('nav:hamburgerMenu.open')}
                >
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent showCloseButton={false}>
              <SheetHeader className="p-4">
                <SheetTitle className="sr-only">{t('nav:hamburgerMenu.title')}</SheetTitle>
                <div className="flex items-center justify-between">
                  <Logo redirect className="h-16" />
                  <SheetClose
                    render={
                      <Button
                        size="icon"
                        variant="outline"
                        title={t('nav:hamburgerMenu.close')}
                        aria-label={t('nav:hamburgerMenu.close')}
                      >
                        <X className="size-5" />
                      </Button>
                    }
                  />
                </div>
                <SheetDescription>{t('nav:hamburgerMenu.description')}</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-8 p-4 flex-1">
                <Accordion value={accordionValue} onValueChange={setAccordionValue}>
                  {menuItems.map((item) => (
                    <MobileMenuItem
                      key={item.title}
                      item={item}
                      onSheetClose={handleSheetClose}
                      onAccordionClose={handleAccordionClose}
                    />
                  ))}
                </Accordion>

                <MobileActionButtons />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

interface MobileMenuItemProps {
  item: NavMenuItem;
  onSheetClose: () => void;
  onAccordionClose: () => void;
}

function MobileMenuItem({ item, onSheetClose, onAccordionClose }: MobileMenuItemProps) {
  const { t } = useTranslation(['nav']);
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const handleSheetCloseWithAccordion = () => {
    onAccordionClose();
    onSheetClose();
  };

  if (item.items) {
    const isAnyActive = item.items.some((subItem) => pathname === subItem.url);
    const visibleSubItems = item.items.filter((subItem) => subItem.allow !== 'authenticated' || isAuthenticated);

    return (
      <AccordionItem value={item.title}>
        <AccordionTrigger
          data-active={isAnyActive}
          className="p-3 h-13 items-center bg-background hover:no-underline hover:bg-muted focus:bg-muted rounded-t-2xl border-[3px] focus-visible:border-ring/50 data-[active=true]:focus:bg-muted data-[active=true]:hover:bg-muted data-[active=true]:bg-muted/50 data-panel-open:bg-muted/50"
        >
          {t(item.title)}
        </AccordionTrigger>
        <AccordionContent className="[&_a]:no-underline">
          <ul className="grid gap-2">
            {visibleSubItems.map((subItem) => (
              <ListItem
                key={subItem.title}
                title={t(subItem.title)}
                href={subItem.url}
                icon={subItem.icon}
                onClose={onSheetClose}
                isMobile
                isActive={pathname === subItem.url}
              >
                {t(subItem.description)}
              </ListItem>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      data-active={pathname === item.url}
      to={item.url}
      key={item.title}
      onClick={handleSheetCloseWithAccordion}
      className="p-3 h-13 data-[active=true]:focus:bg-muted data-[active=true]:hover:bg-muted data-[active=true]:bg-muted/50 focus-visible:border-ring/50 border-[3px] border-transparent hover:bg-muted focus:bg-muted flex items-center gap-4 rounded-b-2xl not-last:rounded-b-none text-sm transition-all outline-none"
    >
      {t(item.title)}
    </Link>
  );
}

export { MobileNavbar };
