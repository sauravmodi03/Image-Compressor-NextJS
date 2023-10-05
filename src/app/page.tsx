"use client";

import Image from 'next/image';
import Input from './components/Input/Input';
import { useEffect, useState } from 'react';
import { CompressFile } from './components/Helper';
import ImagePreview from './components/Preview/ImagePreview';
import DragInput from './components/DragAndDrop/DragInput';
import { Circles } from 'react-loader-spinner';
import JSZip from 'jszip';
import logo from './assets/img/logo.png';

import './global.scss';
import Loader from './components/Loader/Loader';


export default function Home() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState<any>();
  const [isCompressing, setCompressing] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [compressedFiles, setCompressedFiles] = useState<any>([]);

  const setInputFiles = (file : any) => {
    setFiles((prevState: any) => [...prevState, file]);
    console.log(files);
  }

  function removeInputFiles(i: any) {
    setFiles(((prev:any) => [...prev.slice(0,i),...prev.slice(i+1)]))
    console.log(files);
  }

  function isEmpty() {
    return files.length == 0;
  }

  function isEmptyCompressed() {
    return compressedFiles.length == 0;
  }

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  const compressFile = async () => {
 
          setCompressing(true);
          setCompressedFiles([]);
          await delay(2000);

          Promise.all( 
            files.map(async (file: File) => {
              const compressedFile = await CompressFile(file);
              setCompressedFiles((prevState:any) => [...prevState, compressedFile])
            })
          ).then((res) =>{
            console.log(res);
          }).catch((err) => {
            console.log(err);
          }) .finally(() => {
              setCompressing(false);
          });
      }
  

  async function downloadFile(file : File) {

    var FileSaver = require('file-saver');
    FileSaver.saveAs(file);

    const zip = new  JSZip();

    zip.file(file.name, file);
  }

  async function downloadAll() {
    
    var FileSaver = require('file-saver');
    const zip = new  JSZip();

    compressedFiles.forEach((file : File) => {
      zip.file(`compressed_${file.name}`, file);
    });

    zip.file('readme.txt', 'Compressed via https://image-compressor.codecrafted.in');

    const zipFile = await zip.generateAsync({type: 'blob'});

    FileSaver.saveAs(zipFile);
  }





  useEffect(() => {
    setTimeout
  }, [setInputFiles, setFiles]);

  return (
    <>
    <header className='fixed w-screen border-box p-5 justify-center border-solid border-black bg-[white]'>
        <aside className='flex flex-row text-xl5 items-center text-black'>ImageCompressor<Image className="ml-2 w-6" src={logo} alt='Logo'/> </aside>
    </header>
    <main className="Home flex flex-col items-center justify-center pt-28">
     <h1 className='text-3xl text-white'>Image Compressor</h1>
     <p className='text-white mt-1'>Best tool Compressor to compress all types of images for free.</p>
      <DragInput setInputFiles={setInputFiles} removeInputFiles={removeInputFiles}/>

        {/* Compress Button */}
        { !isEmpty() ? <button disabled={isCompressing} className="w-48 h-12 m-2 bg-red-600 rounded-xl font-bold flex justify-center items-center hover:scale-110 duration-500" onClick={compressFile}>Compress</button> : null }

        {/* Loader */}
        { isCompressing ? <Loader label={"Compressing..."}/> : null }

        <article className="flex flex-col pt-10 w-1/2 justify-center items-center bg-gray-400 rounded-xl m-5 p-2">
          { !isEmptyCompressed() && !isCompressing ? <label className="font-light text-white">Compressed Images:</label> : null }
            <aside className="w-full flex flex-row flex-wrap p-5 justify-center items-center">
            {
              !isCompressing ? compressedFiles.map((file : any, i : number) => {
                                          return <>
                                              <aside className='flex flex-col justify-center items-center border-2 rounded-xl'>
                                                  <ImagePreview imageFile={file} key={i}/>
                                                  <button className='cursor-pointer' onClick={ () => downloadFile(file)}>Download</button>
                                              </aside>
                                          </>
                                        })
                                      : null
            }
            
            </aside>
            { !isEmptyCompressed() && !isCompressing ? <button className="font-light text-white bg-[green] rounded-xl p-2" onClick={downloadAll}>Download All</button> : null }
        </article>
    </main>
    </>
  )
}
