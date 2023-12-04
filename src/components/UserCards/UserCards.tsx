import { useSelector } from 'react-redux';
import styles from './UserCards.module.scss';
import { RootState } from '../App/appReduxStore/store';
import { UserCard } from '../UserCard/UserCard';

export function UserCards() {
  const userCards = useSelector((state: RootState) => state.app.userCards);
  return userCards.length > 0 ? (
    <div className={styles.cardsContainer}>
      {userCards.map((userCard, idx) => {
        return (
          <div className={styles.CardContainer} key={`${userCard.name + idx}`}>
            <UserCard userCard={userCard} />
          </div>
        );
      })}
    </div>
  ) : (
    <p>No Cards found</p>
  );
}
