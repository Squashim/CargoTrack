import { LanguageSelect } from '../ui/language-select';
import { Typography } from '../ui/typography';

function Footer() {
  return (
    <footer className="w-full grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center bg-secondary/70 px-4 py-2 gap-2">
      <div className="hidden sm:block" aria-hidden></div>
      <Typography variant="small" className="text-center">
        &copy; {new Date().getFullYear()} CargoTrack
      </Typography>
      <div className="flex justify-center sm:justify-end">
        <LanguageSelect size="sm" className="max-w-30" />
      </div>
    </footer>
  );
}

export { Footer };
