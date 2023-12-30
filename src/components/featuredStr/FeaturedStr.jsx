'use client'
import React from "react";
import useSWR from "swr";
import Featured from "../featured/Featured";
import styles from "../featured/featured.module.css";

const fetcher = async (url) => {
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const FeaturedStr = ({ cat }) => {
  const { data, error, isValidating } = useSWR(
    `http://keshavwrites.netlify.app/api/posts?page=1&cat=${cat || ""}`,
    fetcher
  );

  React.useEffect(() => {
    console.log("Data received:", data);
    console.log("Data type:", typeof data);
  }, [data]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Keshav here!</b> Discover Stories and creative ideas
      </h1>
      <div>
        {isValidating && <p>Loading...</p>}
        {data && Array.isArray(data.posts) && data.posts.length > 0 && (
          <Featured item={data.posts[1]} key={data.posts[1]._id} />
        )}
        {!isValidating && (!data || data.posts.length === 0) && (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedStr;
