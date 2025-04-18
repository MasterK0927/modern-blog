import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import styles from './singlePage.module.css';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';

const getData = async (slug) => {
  const res = await fetch(
    `https://keshavwrites.netlify.app/api/posts/${slug}`,
    {
      cache: 'no-store',
    },
  );
  if (!res.ok) {
    throw new Error('Failed');
  }
  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;
  const data = await getData(slug);
  const { title, user, img, desc, createdAt } = data;

  const sanitizedDesc = desc ? DOMPurify.sanitize(desc) : '';
  const parsedDesc = sanitizedDesc ? parse(sanitizedDesc) : null;
  
  const extractDatePart = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };
  const datePart = extractDatePart(createdAt);
  
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.user}>
            {user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{user?.name}</span>
              <span className={styles.date}>{datePart}</span>
            </div>
          </div>
        </div>
        {img && (
          <div className={styles.imageContainer}>
            <Image src={img} alt="Post Image" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            {parsedDesc}
          </div>
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;