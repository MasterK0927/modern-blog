"use client"
import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const imageLoader = () => {
  return `https://lh3.googleusercontent.com/drive-viewer/AEYmBYQuXCbmGMePiC1IjnSLOYaoSPHVJMYvX-klefC2gcTo-sSaJ9m-zXpbuQtN0zydSL2LDjPmpMPSLtELcan1IDHOAJVeCQ=s1600`
}

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image loader={imageLoader} src="maskerk.png" alt="keshav agarwal" width={50} height={50} className={styles.img}/>
          <h1 className={styles.logoText}>Keshav Writes</h1>
        </div>
        <p className={styles.desc}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
          necessitatibus similique aspernatur obcaecati veritatis. Aperiam cum
          porro sequi, totam minima consequuntur, aspernatur deleniti vero
          repellendus dorales.
        </p>
        <div className={styles.icons}>
          <Link href="https://www.linkedin.com/in/keshavagarwal0927/" target="_blank"><Image className={styles.listLinks} src="/linkedin.png" alt="" width={22} height={22} /></Link>
          <Link href="https://www.instagram.com/masterk0927/" target="_blank"><Image className={styles.listLink} src="/instagram.png" alt="" width={22} height={22} /></Link>
          <Link href="https://twitter.com/MasterK0927" target="_blank"><Image className={styles.listLink} src="/x.png" alt="" width={22} height={22} /></Link>
          <Link href="#"><Image className={styles.listLink} src="/youtube.png" alt="" width={22} height={22} /></Link>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link className={styles.link} href="/">Homepage</Link>
          <Link className={styles.link} href="/">Blog</Link>
          <Link className={styles.link} href="/">About</Link>
          <Link className={styles.link} href="/">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link className={styles.link} href="/">Style</Link>
          <Link className={styles.link} href="/">Fashion</Link>
          <Link className={styles.link} href="/">Coding</Link>
          <Link className={styles.link} href="/">Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link className={styles.link} href="https://www.linkedin.com/in/keshavagarwal0927/">Linkedin</Link>
          <Link className={styles.link} href="https://www.instagram.com/masterk0927/">Instagram</Link>
          <Link className={styles.link} href="https://twitter.com/MasterK0927">X (Twitter)</Link>
          <Link className={styles.link} href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
