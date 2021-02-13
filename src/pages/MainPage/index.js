import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import style from './MainPage.module.scss';
import FinancialAidModal from '../../components/modals/FinancialAidModal';

const MainPage = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const hideModal = () => {
    setModalVisible(false);
  };
  const showModal = () => {
    setModalVisible(true);
  };

  const [resQuery, setResQuery] = useState('');
  return (
    <div className={style.mainPage}>
      <FinancialAidModal
        modalVisible={modalVisible}
        hideModal={hideModal}
        setResQuery={setResQuery}
      />
      <div className={`${style.center} d-flex flex-column align-items-center`}>
        <div className={style.outputArea}>
          <pre>{JSON.stringify(resQuery, null, 4)}</pre>
        </div>
        <Button variant="colorful" onClick={showModal} className="mt-4">
          Open modal
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
