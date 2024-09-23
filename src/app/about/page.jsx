import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Keshav Agarwal</h1>
        <p className={styles.subtitle}>Full Stack Programmer | C++ Developer</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.h2}>About</h2>
        <pre className={styles.codeBlock}>
          {`struct Developer {
    std::string name;
    std::vector<std::string> skills;
    int yearsOfExperience;

    void introduce() {
        std::cout << "Hello, I'm " << Keshav << ". "
                  << "I am transitioning towards low-level programming "
                  << "and have been coding for " 
                  << " years." << std::endl;
    }
};

int main() {
    Developer me{"Keshav Agarwal", {"C++", "Assembly", "OS Development"}, 10};
    me.introduce();
    return 0;
}`}
          <br />
          <br />
          <center>
            <a
              target="_blank"
              rel="no-opener"
              href="https://devkeshav.netlify.app/"
              style={{ color: 'red', textDecoration: 'underline' }}
            >
              Portfolio
            </a>
          </center>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Core Competencies</h2>
        <ul className={styles.list}>
          <li className={styles.li}>Low Level Programming</li>
          <li className={styles.li}>LLM Inferencing</li>
          <li className={styles.li}>Memory Management</li>
          <li className={styles.li}>Multithreading and Concurrency</li>
          <li className={styles.li}>Holochain Development</li>
          <li className={styles.li}>Core ML</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Projects</h2>
        <ul className={styles.list}>
          <li className={styles.li}>Custom OS for smartphones</li>
          <li className={styles.li}>Custom GPT from Scratch</li>
          <li className={styles.li}>NeuraC</li>
          <li className={styles.li}>Memory Allocator Optimization</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p>
          Contact:{' '}
          <a
            href="mailto:keshav.agarwal.12325@gmail.com"
            style={{ color: 'burlywood', textDecoration: 'underline' }}
          >
            keshav@devkeshav.app
          </a>{' '}
          | GitHub:
          <a
            href="https://www.github.com/MasterK0927"
            style={{ color: 'burlywood', textDecoration: 'underline' }}
          >
            github.com/masterK0927
          </a>
        </p>
      </footer>
    </div>
  );
};

export default About;
