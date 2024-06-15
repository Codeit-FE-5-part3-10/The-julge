// RegionButton.tsx

import React from 'react';
import classNames from 'classnames/bind';
import styles from './RegionButton.module.scss';
import { Region } from './Regions';

const cx = classNames.bind(styles);

interface RegionButtonProps {
  region: Region;
  isSelected: boolean;
  onSelectRegion: (regionName: string) => void;
  onDeselectRegion: (regionName: string) => void;
}

const RegionButton: React.FC<RegionButtonProps> = ({
  region,
  isSelected,
  onSelectRegion,
  onDeselectRegion,
}) => {
  const handleClick = () => {
    if (isSelected) {
      onDeselectRegion(region.name);
    } else {
      onSelectRegion(region.name);
    }
  };

  return (
    <button
      type="button"
      className={cx('region-button', { selected: isSelected })}
      onClick={handleClick}
    >
      {region.name}
    </button>
  );
};

export default RegionButton;
