import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const PageBlank = () => {
  return (
    <div className='d-flex'>
      <Sidebar />
      <Outlet />
    </div>
  );
}
export default PageBlank;
