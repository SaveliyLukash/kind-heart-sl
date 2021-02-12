import React from 'react';
import style from './MainPage.module.scss';
import FinancialAidModal from '../../components/modals/FinancialAidModal';

const MainPage = () => {
  return (
    <div className={style.mainPage}>
      <FinancialAidModal />
    </div>
  );
};

export default MainPage;
