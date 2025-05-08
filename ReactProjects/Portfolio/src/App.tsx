import { Outlet } from 'react-router-dom';
import LinkRoutes from './components/LinkRoutes.tsx';

function App() {

  return (
      <div>
        <LinkRoutes />
        <Outlet />
      </div>
  )
}
export default App;


