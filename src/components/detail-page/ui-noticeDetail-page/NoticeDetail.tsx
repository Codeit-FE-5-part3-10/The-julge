import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './NoticeDetail.module.scss';
import formatDateTime from '@/src/utils/formatDateTime';
import addHoursToTime from '@/src/utils/addHoursToTime';
import UpIcon from '../../common/cardItem/UpIcon';
import watchIcon from '@/public/images/card-time-red.svg';
import { Button } from '../../common/ui-button/Button';
import locationIcon from '@/public/images/card-location-red.svg';
import { postNoticeApplication, putShopNoticeApplicationStatus } from '@/src/apis/applications';
import { fetchUserApplications } from '../feature-noticeDetail-page/fetchUserApplications';
import { useToken } from '@/src/utils/TokenProvider';

const cx = classNames.bind(styles);

interface DetailNoticeProps {
  params: {
    wage: number;
    originalWage: number;
    date: string;
    time: number;
    noticeDescription: string;
    shopDescription: string;
    location: string;
    imageUrl: string;
    closed: boolean;
  };
}

export const NoticeDetail: React.FC<{
  noticeId: string;
  shopId: string;
  params: DetailNoticeProps['params'];
}> = ({
  noticeId,
  shopId,
  params: {
    wage,
    originalWage,
    date,
    time,
    noticeDescription,
    shopDescription,
    location,
    imageUrl,
    // closed,
  },
}) => {
  const difference = wage - originalWage;
  const n = Math.ceil((difference / originalWage) * 100); // 최저 임금과 시급 비교해서 나온 %값
  const upIcon = n <= 49 ? '#ff8d72' : '#ff4040';
  const [iconColor, setIconColor] = useState('#ff4040');
  const [textColor, setTextColor] = useState('#ff8d72');
  const formattedWage = wage.toLocaleString();
  const { formattedDate, formattedTime } = formatDateTime(date);
  const newFormattedTime = addHoursToTime(formattedTime, time);
  const { token, userInfo } = useToken();
  const [isApply, setIsApply] = useState<boolean>();
  const [applicationId, setApplicationId] = useState<string>(); // 지원ID
  const [isCanceled, setIsCanceled] = useState<boolean>(false);

  useEffect(() => {
    fetchUserApplications({ userInfo, token, noticeId, setApplicationId, setIsApply });
  }, [userInfo, token, noticeId, shopId, setApplicationId, setIsApply]);

  useEffect(() => {
    //업 아이콘 색상변경
    const updateColors = () => {
      if (window.matchMedia('(min-width:768px)').matches) {
        setIconColor('white');
        setTextColor('white');
      } else {
        setIconColor(upIcon);
        setTextColor(n >= 50 ? '#ff4040' : '#ff8d72');
      }
    };
    updateColors();

    // 창 크기 변경 이벤트 리스너 추가
    window.addEventListener('resize', updateColors);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', updateColors);
    };
  }, []);

  const handleApplication = async () => {
    if (token) {
      try {
        const response = await postNoticeApplication(shopId, noticeId, token);
        setApplicationId(response.item.id);
        setIsApply(true);
        setIsCanceled(false);
        console.log('신청하기 완료');
      } catch (error) {
        console.error('신청 오류:', error);
      }
    } else {
      console.error('토큰이 없습니다.');
    }
  };

  const handleCancel = async () => {
    if (token && applicationId) {
      try {
        await putShopNoticeApplicationStatus(shopId, noticeId, applicationId, 'canceled', token);
        setIsApply(false);
        setIsCanceled(true);
        setApplicationId(''); // 취소 후에 applicationId 초기화
        console.log('취소 성공');
      } catch (error) {
        console.error('취소 오류: ', error);
      }
    } else {
      console.error('토큰 혹은 신청 ID가 없습니다.');
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container_top')}>
        <div className={cx('image')} style={{ backgroundImage: `url(${imageUrl})` }}></div>
        <div className={cx('info')}>
          <p className={cx('label')}>시급</p>
          <div className={cx('box')}>
            <p className={cx('name')}>{formattedWage}원</p>
            <div className={cx('container_compare')}>
              <p className={cx('compare')} style={{ color: textColor }}>
                기존 시급보다 {n}%
              </p>
              <UpIcon color={iconColor} />
            </div>
          </div>
          <div className={cx('box')}>
            <Image className={cx('icon')} src={watchIcon} alt="시계 아이콘" />
            <p className={cx('description', 'gray')}>{formattedDate}</p>
            <p className={cx('description', 'gray')}>
              {formattedTime}~{newFormattedTime}({time}시간)
            </p>
          </div>
          <div className={cx('box')}>
            <Image className={cx('icon')} src={locationIcon} alt="주소 아이콘" />
            <p className={cx('description', 'gray')}>{location}</p>
          </div>
          <p className={cx('description')}>{shopDescription}</p>
        </div>
        <div className={cx('buttons')}>
          {isApply && !isCanceled ? (
            <Button color="white" onClick={handleCancel}>
              취소하기
            </Button>
          ) : (
            <Button color="primary" onClick={handleApplication}>
              신청하기
            </Button>
          )}
        </div>
      </div>
      <div className={cx('container_bottom')}>
        <h1 className={cx('description', 'head')}>공고 설명</h1>
        <p className={cx('description')}>{noticeDescription}</p>
      </div>
    </div>
  );
};
