import styles from './homepage.module.css';
import CategoryList from '@/components/categoryList/CategoryList';
import CardList from '@/components/cardList/CardList';
// import Menu from '@/components/Menu/Menu';
import FeaturedStr from '@/components/featuredStr/FeaturedStr';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <FeaturedStr />
      <CategoryList />
      <div className={styles.content}>
        <ErrorBoundary>
          <CardList page={page} />
        </ErrorBoundary>
        {/* <Menu /> */}
      </div>
    </div>
  );
}
