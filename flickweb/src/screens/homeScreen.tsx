import Banner from './components/banner'
import NavBar from './components/navbar';
import ShowGrid from './components/Grid';
import { projectFirestore } from '../firebase/config';
import LoadingScreen from './components/loadingScreen';
import { useEffect, useState } from 'react';

export default function HomeScreen(props: any) {

    const mediaRef = projectFirestore.collection('mediaList');
    const [mediaPack, setMediaPack] = useState<any>([]);
    const [trendingMedia, setTrendingMedia] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const genres = ['Action', 'Comedy', "Sci-fi", "Horror", "Crime", "Drama"];

    useEffect(() => { getMedia(); }, [])

    const getMedia = () => {
        let pack: any = [];
        mediaRef.get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => pack.push(doc.data()))
            const trendPack = pack.filter((item: any) => item.trending === true);
            setTrendingMedia(trendPack)
            if (props.mediaPage !== 'home') {
                setMediaPack(pack.filter((item: any) => item.mediaType === props.mediaPage));
            } else (setMediaPack(pack))
            setIsLoading(false)
        }).catch((error) => { alert("Error" + error) })
    }

    return (
        !isLoading ?
            <>
                <div className="base-flex main-body">
                    <NavBar mode={props.mediaPage} />
                    <Banner mode={props.mediaPage} />
                    {trendingMedia && props.mediaPage === 'home' &&
                        <>
                            <ShowGrid title={"Trending Shows"} data={trendingMedia.filter((item: any) => item.mediaType === "Show")} />
                            <ShowGrid title={"Trending Movies"} data={trendingMedia.filter((item: any) => item.mediaType === "Movie")} />
                        </>
                    }

                    {mediaPack && trendingMedia && props.mediaPage !== 'home' &&
                        <>
                            <ShowGrid title={`Trending ${props.mediaPage}s`} data={trendingMedia.filter((item: any) => item.mediaType === `${props.mediaPage}`)} />
                            {genres.map((item: any, index: any) =>
                                <ShowGrid
                                    title={`${item} ${props.mediaPage}s`}
                                    gridKey={index + index}
                                    data={mediaPack.filter((media: any) =>
                                        media.mediaGenre.replace(/ /g, "").split("|").includes(item)
                                    )} />
                            )
                            }
                        </>
                    }
                </div>
            </>
            :
            <LoadingScreen />



    )
}