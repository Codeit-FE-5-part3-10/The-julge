import classNames from 'classnames/bind';
import { Layout } from '../feature-layout/Layout';
import styles from './ListLayout.module.scss';
import { ApplicationList } from '@/src/components/common/feature-list-applications/ListApplication';

const cx = classNames.bind(styles);

export default function ListLayout() {
  return (
    <>
      <div>맞춤공고</div>
      <div>전체 공고</div>
    </>
  );
}
