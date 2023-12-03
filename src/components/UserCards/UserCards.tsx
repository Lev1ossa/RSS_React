import { useSelector } from 'react-redux';
import styles from './UserCards.module.scss';
import { RootState } from '../App/appReduxStore/store';
import { UserCard } from '../UserCard/UserCard';

export function UserCards() {
  const userCards = useSelector((state: RootState) => state.app.userCards);
  return (
    <div className={styles.cardsContainer}>
      {userCards.map((userCard, idx) => {
        return <UserCard userCard={userCard} key={`${userCard.name + idx}`} />;
      })}
    </div>
  );
}
