import { IUserCard } from '../../types/types';
import styles from './UserCard.module.scss';

export function UserCard(props: { userCard: IUserCard }) {
  const { userCard } = props;

  return (
    <>
      <div className={styles.CardBlock}>
        <div className={styles.cardLabel}>Name:</div>
        <div className={styles.cardText}>{userCard.name}</div>
      </div>
      <div className={styles.CardBlock}>
        <div className={styles.cardLabel}>Age:</div>
        <div className={styles.cardText}>{userCard.age}</div>
      </div>
      <div className={styles.CardBlock}>
        <div className={styles.cardLabel}>Email:</div>
        <div className={styles.cardText}>{userCard.email}</div>
      </div>
      <div className={styles.CardBlock}>
        <div className={styles.cardLabel}>Password:</div>
        <div className={styles.cardText}>{userCard.password}</div>
      </div>
      <div className={styles.CardBlock}>
        <div className={styles.cardLabel}>Gender:</div>
        <div className={styles.cardText}>{userCard.gender}</div>
      </div>
      <div className={styles.CardBlock}>
        <div className={styles.cardLabel}>Country:</div>
        <div className={styles.cardText}>{userCard.country}</div>
      </div>
      <div className={styles.ImgBlock}>
        <div className={styles.cardLabel}>Image:</div>
        <img className={styles.cardImage} src={userCard.image}></img>
      </div>
    </>
  );
}
