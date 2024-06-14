import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Filter.module.scss';
import { regions } from './Regions';
import RegionButton from './RegionButton';
import StartAt from './ui-filter-startAt/StartAt';
import Wage from './ui-filter-wage/Wage';
import ResetButton from './ui-filter-reset/ResetButton';
import ApplyButton from './ui-filter-applyButton/ApplyButton';
import Modal from '../../common/modal/Modal';

const cx = classNames.bind(styles);

interface ModalItems {
  content: string;
  modalType: 'warning' | 'success' | 'question';
  link: string;
  btnText: string;
}

interface FilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filterData: FilterData) => void;
}

export interface FilterData {
  selectedRegions: string[];
  selectedDate: string;
  wage?: number;
}

export default function Filter({ isOpen, onClose, onApply }: FilterProps) {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [wage, setWage] = useState<number>(0);
  const [isModalOpen, setModalOpen] = useState<ModalItems | null>(null);

  const handleRegionSelect = (regionName: string) => {
    if (!selectedRegions.includes(regionName)) {
      setSelectedRegions([...selectedRegions, regionName]);
    }
  };

  const handleRegionDeselect = (regionName: string) => {
    setSelectedRegions(selectedRegions.filter((region) => region !== regionName));
  };

  const handleDateChage = (date: string) => {
    setSelectedDate(date);
  };

  const handleWageChage = (waged: number) => {
    setWage(waged);
  };

  const handleReset = () => {
    setSelectedRegions([]); // 선택된 지역 초기화
    setSelectedDate(''); // 선택된 날짜 초기화
    setWage(0); // 시급 초기화
  };

  const handleApply = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜 가져오기
    const filterData: FilterData = {
      selectedRegions,
      selectedDate,
      wage,
    };
    if (selectedDate <= currentDate) {
      setModalOpen({
        content: '현재 날짜 이후 시간을 선택해주세요!',
        modalType: 'warning',
        link: '',
        btnText: 'question에서 메인컬러 버튼 Text',
      });
    } else {
      onApply(filterData);
      onClose();
    }
  };

  return (
    <>
      <div className={cx('filter-container', { open: isOpen })}>
        <div className={cx('title-container')}>
          <h1 className={cx('title')}>상세 필터</h1>
          <button type="button" className={cx('close-button')} onClick={onClose}>
            x
          </button>
        </div>
        <div className={cx('location-container')}>
          <p className={cx('location-title')}>위치</p>
          <div className={cx('location-select-container')}>
            {regions.map((region) => (
              <RegionButton
                key={region.id}
                region={region}
                isSelected={selectedRegions.includes(region.name)}
                onSelectRegion={handleRegionSelect}
                onDeselectRegion={handleRegionDeselect}
              />
            ))}
          </div>
          <div className={cx('location-selected')}>
            {selectedRegions.map((region) => (
              <button
                key={region}
                type="button"
                className={cx('selected-region')}
                onClick={() => handleRegionDeselect(region)}
              >
                {region} x
              </button>
            ))}
          </div>
        </div>
        <div className={cx('line')}></div>
        <StartAt onDateChage={handleDateChage} selectedDate={selectedDate} />
        <div className={cx('line')}></div>
        <Wage wage={wage} onWageChange={handleWageChage} />
        <div className={cx('line')}></div>
        <ResetButton onClick={handleReset} />
        <ApplyButton onClick={handleApply} />
        {isModalOpen && (
          <Modal
            setModal={setModalOpen}
            modalItems={isModalOpen}
            content={isModalOpen.content}
            link={isModalOpen.link}
            btnText={isModalOpen.btnText}
          />
        )}
      </div>
    </>
  );
}
