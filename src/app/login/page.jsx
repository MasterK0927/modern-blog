'use client';
import { signIn, useSession } from 'next-auth/react';
import styles from './loginPage.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <div className={styles.body}>
      <div className={styles.main}>
        {[...Array(150)].map((_, index) => (
          <span key={index} className={styles.mainBg}></span>
        ))}
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.heading}>SIGN IN</div>
            <div
              className={styles.socialButton1}
              onClick={() => signIn('google')}
            >
              <Image
                src="/google.png"
                alt="google"
                className={styles.img}
                width={40}
                height={40}
              />
              <div className={styles.logGoogle}>Sign in with Google</div>
            </div>
            <div className={styles.socialButton2}>
              <Image
                src="/github.png"
                className={styles.img}
                alt="github"
                width={40}
                height={40}
                style={{ background: 'white', borderRadius: '100%' }}
              />
              <div className={styles.logGoogle}>Sign in with Github</div>
            </div>
            <div className={styles.socialButton3}>
              <Image
                src="/facebook.png"
                className={styles.img}
                alt="facebook"
                width={40}
                height={40}
              />
              <div className={styles.logGoogle}>Sign in with Facebook</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
