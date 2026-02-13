import { Outlet } from 'react-router';

export function App() {
  return (
    <div className="w-full min-h-dvh">
      <Outlet />
    </div>
  );
}

export default App;
