import React, { useEffect, useState } from 'react';
import useKeyDown from '../../Hooks/useKeyDown';
import { IImageOverlay, IMiniImage } from './image-overlay-full-screen.props';
import './image-overlay-full-screen.scss';

const iconwhitecancel = require("../../Icons/iconwhitecancel.svg").default;
const iconwhitedownload = require("../../Icons/iconwhitedownload.svg").default;
const iconleftarrow = require("../../Icons/iconleftarrow2.svg").default;
const iconrightarrow = require("../../Icons/iconrightarrow2.svg").default;


function ImageOverlayScreen(props : IImageOverlay) {
    const [amountOfMiniImages , setAmountOfMiniImages] = useState<number>(15);
    const [numPage , setNumPage] = useState<number>(1);
    const [mainImage , setMainImage] = useState<IMiniImage>({
        index:-1,
        author:"",
        srcImage:"",
    })

    const { miniImageList , mainMiniImage } = props;


    useEffect(() =>{
        setMainImage(mainMiniImage);
    },[mainMiniImage])

    useEffect(() =>{
        setAmountMiniImagesByScreen();
    },[])

    useEffect(() =>{
        const windowWidth = window.innerWidth;
        if(windowWidth <= 1024){
            mainMiniImage.index > amountOfMiniImages && setNumPage(Math.floor(mainMiniImage.index / amountOfMiniImages) + 1)
        } else{
            mainMiniImage.index > amountOfMiniImages && setNumPage(Math.floor(mainMiniImage.index / amountOfMiniImages) + 1)
        }
    },[setAmountOfMiniImages , amountOfMiniImages , setNumPage , mainMiniImage])

    useEffect(() =>{
        window.addEventListener('resize', setAmountMiniImagesByScreen);

        return () => window.removeEventListener('resize', setAmountMiniImagesByScreen);
    },[])

    // useEffect(() =>{
    //     window.addEventListener('keydown', setMiniImageByKeyBoardEvent);

    //     return () => window.removeEventListener('keydown', setMiniImageByKeyBoardEvent);
    // })

    const setAmountMiniImagesByScreen = () =>{
        const windowWidth = window.innerWidth;
        if(windowWidth <= 1024){
            setAmountOfMiniImages(5)
        } else{
            setAmountOfMiniImages(15)
        }
    }

    const setMiniImageByKeyBoardEvent = (e: KeyboardEvent) =>{
        if(e.keyCode === 37){
            setMiniImage(true)
        }else if(e.keyCode === 39){
            setMiniImage(false)
        }
    } 

    useKeyDown(setMiniImageByKeyBoardEvent)

    const setMiniImage = (isPrev : boolean) =>{
        if(mainImage.index){
            let tempindex = 0;
            if(isPrev){
                tempindex = mainImage.index - 1;
                (tempindex > 0 && tempindex <= (numPage - 1) * amountOfMiniImages) && setNumPage(prev => prev - 1);
            } else{
                tempindex = mainImage.index + 1;
                tempindex > numPage * amountOfMiniImages && setNumPage(prev => prev + 1);
            }

            const tempMiniImage: IMiniImage = miniImageList.find((miniImage: IMiniImage) => miniImage.index === tempindex) || {
                index:-1,
                author:"",
                srcImage:"",
            };
            
            tempMiniImage.index !== -1 && setMainImage(tempMiniImage)
        }
    }

    const downloadImage = () =>{
        // var link = document.createElement("a");
        // // If you don't know the name or want to use
        // // the webserver default set name = ''
        // link.setAttribute('download', "123");
        // link.href = mainImage.srcImage;
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
    }
                                                                                                                                                                                                            
    return (
        <div className="imageoverlay-container">
            <h4 className="imageoverlay-nameauthor">
                {
                    mainImage.author && mainImage.author
                }
            </h4>
            <img src={ iconwhitecancel } alt="" className="imageoverlay-cancel" onClick={ props.close }/>
            <img src={ iconwhitedownload } alt="" className="imageoverlay-download" onClick={ downloadImage }/>
            {
                mainImage.index > 1 && (
                    <div className="imageoverlay-leftarrow imageoverlay-arrow" onClick={ () =>{ setMiniImage(true) } }>
                        <img src={ iconleftarrow } alt="" />
                        <div></div>
                    </div>
                )
            }
            {
                mainImage.index < miniImageList[miniImageList.length - 1].index && (
                    <div className="imageoverlay-rightarrow imageoverlay-arrow"  onClick={ () =>{ setMiniImage(false) } }>
                        <img src={ iconrightarrow } alt="" />
                        <div></div>
                    </div>
                )
            }

            <img alt="" className="imageoverlay-mainimage" src={ mainImage.srcImage && mainImage.srcImage }></img>
            
            <div className="imageoverlay-miniimages">
                {
                    miniImageList.map((miniImage:IMiniImage , index:number) =>(
                        (index + 1 > (numPage - 1) * amountOfMiniImages && index + 1 <= numPage * amountOfMiniImages) && <img alt="" src={ miniImage.srcImage } key={ index } onClick={ () =>{ setMainImage(miniImage) }} className={ mainImage.index === miniImage.index ? "imageoverlay-miniimage--active" : ""}></img>
                    ))
                }
            </div>
        </div>
  );
}

export default ImageOverlayScreen;
