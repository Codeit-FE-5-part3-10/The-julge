import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NoticeDetail.module.scss';
import formatDateTime from '@/src/utils/formatDateTime';
import addHoursToTime from '@/src/utils/addHoursToTime';
import { Button } from '../../common/ui-button/Button';
import { postNoticeApplication, putShopNoticeApplicationStatus } from '@/src/apis/applications';
import { fetchUserApplications } from '../feature-noticeDetail-page/fetchUserApplications';
import { useToken } from '@/src/utils/TokenProvider';
import Modal from '../../common/modal/Modal';
import UpIcon from './UpIcon';
import TimeIcon from './TimeIcon';
import LocationIcon from './LocationIcon';

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
    closed,
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
  const [isApply, setIsApply] = useState<boolean>(); // 지원한 공고인가
  const [applicationId, setApplicationId] = useState<string>(); // 지원ID
  const [isCanceled, setIsCanceled] = useState<boolean>(false); // 취소한 공고인가
  const [isModalOpen, setModalOpen] = useState<ModalItems | null>(null);

  const isPastDate = new Date(date) < new Date();
  const [primaryIconColor, setPrimaryIconColor] = useState('#ff8d72');

  useEffect(() => {
    fetchUserApplications({ userInfo, token, noticeId, setApplicationId, setIsApply });
  }, [userInfo, token, noticeId, shopId, setApplicationId, setIsApply]);

  useEffect(() => {
    if (closed || isPastDate) {
      setPrimaryIconColor('#cbc9cf');
    }
    //업 아이콘 색상변경
    const updateColors = () => {
      if (window.matchMedia('(min-width:768px)').matches) {
        if (closed || isPastDate) {
          setIconColor('#cbc9cf');
          setTextColor('#cbc9cf');
        } else {
          setIconColor('white');
          setTextColor('white');
        }
      } else if (closed || isPastDate) {
        setIconColor('#cbc9cf');
        setTextColor('#cbc9cf');
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
  }, [closed, isPastDate]);

  const handleApplication = async () => {
    if (!token) {
      setModalOpen({
        content: '로그인 후 사용해주세요!',
        modalType: 'success',
        link: '/loginTest',
        btnText: 'question에서 메인컬러 버튼 Text',
      });
    } else if (token && userInfo?.type === 'employer') {
      setModalOpen({
        content: '사장님은 사용할 수 없습니다!',
        modalType: 'warning',
        link: '',
        btnText: 'question에서 메인컬러 버튼 Text',
      });
    } else if (token && !userInfo?.name) {
      setModalOpen({
        content: '프로필 등록 후 사용해주세요!',
        modalType: 'success',
        link: `${userInfo?.id}'/profile'`,
        btnText: 'question에서 메인컬러 버튼 Text',
      });
    } else {
      try {
        const response = await postNoticeApplication(shopId, noticeId, token);
        setApplicationId(response.item.id);
        setIsApply(true);
        setIsCanceled(false);
        setModalOpen({
          content: '신청되었습니다.',
          modalType: 'warning',
          link: '',
          btnText: 'question에서 메인컬러 버튼 Text',
        });
        console.log('신청하기 완료');
      } catch (error) {
        console.error('신청 오류:', error);
      }
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
        setModalOpen({
          content: '취소되었습니다.',
          modalType: 'warning',
          link: '',
          btnText: 'question에서 메인컬러 버튼 Text',
        });
      } catch (error) {
        console.error('취소 오류: ', error);
      }
    } else {
      console.error('토큰 혹은 신청 ID가 없습니다.');
    }
  };

  interface ModalItems {
    content: string;
    modalType: 'warning' | 'success' | 'question';
    link: string;
    btnText: string;
  }

  return (
    <div className={cx('wrapper', { 'is-end': closed || isPastDate })}>
      <div className={cx('container_top')}>
        {isPastDate ? (
          <div className={cx('closed-container')}>
            <span className={cx('closed-text')}>지난 공고</span>
          </div>
        ) : (
          closed && (
            <div className={cx('closed-container')}>
              <span className={cx('closed-text')}>마감 완료</span>
            </div>
          )
        )}
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
            <TimeIcon color={primaryIconColor} />
            <p className={cx('description', 'gray')}>{formattedDate}</p>
            <p className={cx('description', 'gray')}>
              {formattedTime}~{newFormattedTime}({time}시간)
            </p>
          </div>
          <div className={cx('box')}>
            <LocationIcon color={primaryIconColor} />
            <p className={cx('description', 'gray')}>{location}</p>
          </div>
          <p className={cx('description')}>{shopDescription}</p>
        </div>
        <div className={cx('buttons')}>
          {isPastDate ? (
            <Button color="gray" disabled cursor="none">
              지난 공고
            </Button>
          ) : closed ? (
            <Button color="gray" disabled cursor="none">
              마감 완료
            </Button>
          ) : isApply && !isCanceled ? (
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
  );
};
