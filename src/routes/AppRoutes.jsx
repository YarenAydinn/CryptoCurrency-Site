import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  HomePage,CryptoListPage ,LoginPage, RegisterPage, MarketPage,UserProfile, BlogPage } from '@/pages'
import { MainLayout,PublicLayout } from '@/layouts'
import RequireAuth from './RequireAuth'
import CryptoDetailPage from '@/pages/CryptoDetailPage';
import KronoPage from '@/pages/KronoPage';
import ConvertPage from '@/pages/ConvertPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage/>} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            <Route path='/cryptolistpage' element={<CryptoListPage/>}/>
            <Route path='/marketpage' element={<MarketPage/>}/>
            <Route path='/userprofile' element={<UserProfile/>}/>
            <Route path='/cryptodetailpage/:id' element={<CryptoDetailPage/>}/>
            <Route path='/kronopage' element={<KronoPage/>}/>
            <Route path='/convert' element={<ConvertPage/>}/>
            <Route path='/blog' element={<BlogPage/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
