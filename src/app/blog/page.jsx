import CardListCategory from '@/components/cardLIstCategory/CardListCategory';
import styles from './blogPage.module.css';
// import Menu from "@/components/Menu/Menu";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat ? `${cat} Blog` : 'Blog'}</h1>
      <div className={styles.content}>
        <CardListCategory page={page} cat={cat} />
        {/* <Menu /> */}
      </div>
    </div>
  );
};

export default BlogPage;
