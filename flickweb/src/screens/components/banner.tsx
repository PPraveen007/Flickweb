import { AiFillStar } from 'react-icons/ai'
import PrimaryButton from './primaryButton'
import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export default function Banner(props: any) {

    const mediaRef = projectFirestore.collection('mediaBanners');
    const history = useHistory()

    const [bannerMedia, setBannerMedia] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => { getBannerMedia() }, [])

    const getBannerMedia = () => {
        let pack: any = [];
        mediaRef.doc(`${props.mode !== "home" ? props.mode === "Show" ? "showBanner" : "movieBanner" : "homeBanner"}`).onSnapshot((doc: any) => {
            pack.push(doc.data())
            setBannerMedia(pack)
            setIsLoading(false)
        })
    }

    const cardTap = (cardData: any) => {
        const routeData = { docId: `${cardData.showRedirect}` }
        history.push({ pathname: '/watch', search: `?${cardData.showName.replace(" ", '-')}/`, hash: `${cardData.showId.replace(" ", "-")}`, state: routeData });
    }

    return (
        !isLoading ?
            <div className="base-flex banner">
                <div className="banner-img-holder">
                    <img className="banner-img" src={bannerMedia[0].showPic} alt="Banner Show or Movie Poster " />
                </div>

                <div className="base-flex banner-content-holder">
                    <div className="base-flex banner-content">
                        <h1 className="banner-show-name">{bannerMedia[0].showName}</h1>
                        <div className="base-flex banner-show-stats">
                            <span className="base-flex"><AiFillStar size={20} /><span>{bannerMedia[0].showStars}/5</span></span>
                            <span className="base-flex">2018</span>
                            <span className="base-flex">{bannerMedia[0].showSeason} Seasons</span>
                        </div>
                        <p className="banner-show-bio">
                            {bannerMedia[0].showBio}
                        </p>
                        <PrimaryButton type={"Play"} title={"Watch Now"} onClick={() => cardTap(bannerMedia[0])} />
                    </div>
                </div>
            </div>
            :
            <></>
    )
}