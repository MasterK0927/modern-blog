'use client'
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import { FaPlus } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { RiFolderAddFill } from "react-icons/ri";
import { BiSolidVideoPlus } from "react-icons/bi";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import styles from "./writePage.module.css";

const WritePage = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  const quillRef = useRef(null);

  useEffect(() => {
    const uploadImage = async () => {
      if (!file) return;

      try {
        const storage = getStorage(app);
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break; // Added default case to satisfy ESLint
            }
          },
          (error) => {
            console.error("Error uploading image:", error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(
                uploadTask.snapshot.ref
              );
              setMedia(downloadURL);

              // Insert the image into the editor
              const quill = quillRef.current.getEditor();
              const range = quill.getSelection(true);
              quill.insertEmbed(range.index, "image", downloadURL);
            } catch (error) {
              console.error("Error getting download URL:", error);
            }
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    uploadImage();
  }, [file]);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc: value,
          img: media,
          slug: slugify(title),
          catSlug: catSlug || "style",
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  if (session === undefined) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <FaPlus className={styles.plus} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <MdAddPhotoAlternate className={styles.plus} />
              </label>
            </button>
            <button className={styles.addButton}>
              <RiFolderAddFill className={styles.plus} />
            </button>
            <button className={styles.addButton}>
              <BiSolidVideoPlus className={styles.plus} />
            </button>
          </div>
        )}
        <ReactQuill
          ref={quillRef}
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
          modules={quillModules}
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

const quillModules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ]
};

export default WritePage;
