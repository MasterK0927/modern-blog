"use client"
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/compat/router";
import "react-quill/dist/quill.bubble.css";
import { FaPlus } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { RiFolderAddFill } from "react-icons/ri";
import { BiSolidVideoPlus } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import styles from "./writePage.module.css";
import Image from "next/image";

const WritePage = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("style");
  const [autosaving, setAutosaving] = useState(false);
  const [autosaved, setAutosaved] = useState(false);
  const quillRef = useRef(null);
  const router = useRouter();
  const fileInputRef = useRef(null);
  const ImageName = useRef(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/');
  }, [session, status, router]);

  useEffect(() => {
    const draft = localStorage.getItem("draft");
    if (draft) {
      const { title, value, catSlug, media, thumbnail } = JSON.parse(draft);
      setTitle(title);
      setValue(value);
      setCatSlug(catSlug);
      setMedia(media);
      setThumbnail(thumbnail);
      setAutosaved(true);
    }
  }, []);

  useEffect(() => {
    const handleUnload = (event) => {
      event.preventDefault();
      return (
        event.returnValue ='Are you sure you want to leave? Changes you made may not be saved.' 
      );
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const draft = JSON.parse(localStorage.getItem("draft")) || {};
      if (
        title !== draft.title ||
        value !== draft.value ||
        catSlug !== draft.catSlug ||
        media !== draft.media ||
        thumbnail !== draft.thumbnail
      ) {
        setAutosaving(true);
        setTimeout(() => {
          setAutosaving(false);
          setAutosaved(true);
          localStorage.setItem(
            "draft",
            JSON.stringify({ title, value, catSlug, media, thumbnail })
          );
        }, 3000); // Autosaved after 3 seconds
      }
    }, 20000); // Check every 20 seconds

    return () => clearInterval(timer);
  }, [title, value, catSlug, media, thumbnail]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = async () => {
    try {
      await deleteObject(ref(getStorage(app), ImageName.current));
      setValue("");
      setMedia("");
      setThumbnail("");
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  const handleSubmit = async () => {
    const toastId = toast.info('Publishing post...', { autoClose: false });
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
          thumbnail,
          slug: slugify(title),
          catSlug: catSlug || "style",
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        toast.success(toastId, { render: "Post published successfully", autoClose: 5000 });
        router.push(`/posts/${data.slug}`);
      } else {
        toast.error(toastId, { render: "Error publishing post", autoClose: 5000 });
      }
    } catch (error) {
      toast.error(toastId, { render: "Error submitting post", autoClose: 5000 });
      console.error("Error submitting post:", error);
    }
  };

  const slugify = (str) => str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className={styles.select}
        value={catSlug}
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
        <div className={styles.addContainer}>
          <button className={styles.button} onClick={() => setOpen(!open)}>
            <FaPlus className={styles.plus} />
          </button>
          {open && (
            <div className={styles.add}>
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button className={styles.addButton} onClick={handleAddImageClick}>
                <label htmlFor="image">
                  <MdAddPhotoAlternate className={styles.plus} />
                </label>
              </button>
              {thumbnail && (
                <button className={styles.addButton} onClick={handleDeleteImage}>
                  Delete Image
                </button>
              )}
              <button className={styles.addButton}>
                <RiFolderAddFill className={styles.plus} />
              </button>
              <button className={styles.addButton}>
               
              <BiSolidVideoPlus className={styles.plus} />
          </button>
        </div>
      )}
    </div>
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
  {autosaving && <div className={styles.autosaveIndicatorSaving}>Autosaving...</div>}
  {autosaved && <div className={styles.autosaveIndicator} >Autosaved</div>}
  {thumbnail && (
    <div className={styles.thumbnailContainer}>
      <Image
        src={thumbnail}
        alt="Thumbnail"
        className={styles.thumbnail}
        width={200}
        height={200}
      />
    </div>
  )}
  <button className={styles.publish} onClick={handleSubmit}>
    Publish
  </button>
</div>
);
};

const quillModules = {
toolbar: [
  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
  [{ size: [] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' },
  { 'indent': '-1' }, { 'indent': '+1' }],
  ['link', 'image', 'video'],
  ['clean']
]
};

export default WritePage;
