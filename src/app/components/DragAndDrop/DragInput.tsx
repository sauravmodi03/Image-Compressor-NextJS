import { Key, useRef, useState } from "react";
import ImagePreview from "../Preview/ImagePreview";
import cross from '../../assets/img/cross.png';
import Image from "next/image";
import upload from '../../assets/img/upload.png';

import './DragInput.scss';
import { Circles } from "react-loader-spinner";
import Loader from "../Loader/Loader";

export default function DragInput({setInputFiles, removeInputFiles} : {setInputFiles:any, removeInputFiles:any}) {

    const [isDragActive, setIsDragActive] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const [files, setFiles] = useState<any>([]);
    const [isUploading, setUploading] = useState(false);


    function deleteAllFiles() {
        setFiles([]);
    }

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async function fileUpload(data : any) {
        setUploading(true);
        await delay(2000);
        if (data && data[0]) {
            for (let i = 0; i < data["length"]; i++) {
              setFiles((prevState: any) => [...prevState, data[i]]);
              setInputFiles(data[i]);
            }
          }
        setUploading(false);
        //   setInputFiles(files);
        console.log("Files uploaded");
    }

    function isEmpty() {
        return files.length == 0;
    }


    const handleSelect = (e : any) => {
        e.preventDefault();
        fileUpload(e.target.files);
    }

    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        fileUpload(e.dataTransfer.files);
      }

      const handleDelete = (i : any) => {
        console.log("delete");
        setFiles(((prev:any) => [...prev.slice(0,i),...prev.slice(i+1)]))
        removeInputFiles(i);
      }
    
      function submitFiles() {
        setInputFiles(files);
      }


      function handleEnter(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
      }

      function handleLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
      }
    
      function handleOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
      }
    
      function openFileExplorer() {
        inputRef.current.value = "";
        inputRef.current.click();
      }
    

  return (
    <div className="drag-container w-screen flex flex-col items-center pt-10">
      <form
        className={`${isDragActive ? "bg-[lightgreen]" : "bg-gray-400"} p-4 w-1/2 h-min-64 rounded-2xl text-center flex flex-col items-center justify-center text-black`}
        onDragEnter={handleEnter}
        onSubmit={ (e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleLeave}
        onDragOver={handleOver}>
        
        <Image id="upload-img" className="w-10 cursor-pointer hover:scale-110 duration-500" src={upload} onClick={openFileExplorer} alt="Upload Image"/>
        <label htmlFor="upload-img" className="font-light cursor-pointer" onClick={openFileExplorer}>Upload Images</label> 
        <input
            className=""
            type="file"
            id="input-file"
            accept="image/*"
            ref={inputRef}
            onChange={handleSelect}
            style={{ display: "none" }}
        />

        <p className="font-bold mt-5 ">
            Or Drag & Drop files Here
        </p>

        <article className="flex flex-col pt-10 w-full ">
        <aside className=" flex flex-row flex-wrap p-1 items-center justify-center">
            {
                files.map((file: any, i: Key | null | undefined) => {
                    return <>
                            <article key={i} className="border-2 rounded-xl flex flex-col p-0.125 m-1 items-center hover:scale-110 duration-500 text-white">
                                <ImagePreview imageFile={file} key={i}/>
                                <label className="font-light cursor-pointer" onClick={() => handleDelete(i)}><Image className="w-8" src={require('../../assets/img/delete.png')} alt="Delete"/></label>
                            </article>
                            
                            </>
                })
            }
        </aside>

        { !isEmpty() && files.length > 1 ?  <button onClick={deleteAllFiles}>Remove All</button> : null}
      </article>

      <label className="text-xs mt-2">Supported Types: JPEG, PNG, HEIC, GIF, TIFF, EPS</label>
      </form>
      

      { isUploading ? 
            <Loader label={"Uploading File..."}/>
       : null }

    </div>
  )
}
