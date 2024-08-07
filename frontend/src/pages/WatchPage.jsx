import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { useContentStore } from "../store/content";
import axios from "axios";
import NavBar from "../components/NavBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";


const WatchPage = () => {
    const { id } = useParams();
    const [ trailers, setTrailers ] = useState([]);
    const [ currentTrailerIdx, setCurrentTrailerIdx ] = useState(0);
    const [ loading, SetLoading ] = useState(true);
    const [ content, setContent ] = useState({});
    const [similarContent, setSimilarContent] = useState([]);
    const { contentType } = useContentStore();

    const sliderRef = useRef(null);

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/trailers`);
                setTrailers(res.data.trailers);
            } catch (error) {
                if(error.message.includes('404')) {
                    setTrailers([]);
                }
            }
        }
        getTrailers();
    },[contentType, id]);

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/similar`);
                setSimilarContent(res.data.similar);
            } catch (error) {
                if(error.message.includes('404')) {
                    setSimilarContent([]);
                }
            }
        }
        getSimilarContent();
    },[contentType, id]);

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/details`);
                setContent(res.data.content);
            } catch (error) {
                if(error.message.includes('404')) {
                    setContent([]);
                }
            } finally {
                SetLoading(false);
            }
        }
        getContentDetails();
    },[contentType, id]);

    const handleNext = () => {
		if (currentTrailerIdx < trailers.length - 1) setCurrentTrailerIdx(currentTrailerIdx + 1);
	};
	const handlePrev = () => {
		if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
	};

	const scrollLeft = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
	};
	const scrollRight = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

  return (
    <div className="bg-black min-h-screen text-white">
        <div className="mx-auto container px-4 py-8 h-full">
            <NavBar />

            {trailers.length > 0 && (
                <div className='flex justify-between items-center mb-4'>
                    <button
                        className={`
                        bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                            currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""
                        }}
                        `}
                        disabled={currentTrailerIdx === 0}
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        className={`
                        bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                            currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed " : ""
                        }}
                        `}
                        disabled={currentTrailerIdx === trailers.length - 1}
                        onClick={handleNext}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}

            <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
                {trailers.length > 0 && (
                    <ReactPlayer
                        controls={true}
                        width={"100%"}
                        height={"70vh"}
                        className='mx-auto overflow-hidden rounded-lg'
                        url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                    />
                )}

                {trailers?.length === 0 && (
                    <h2 className='text-xl text-center mt-5'>
                        No trailers available for{" "}
                        <span className='font-bold text-red-600'>{content?.title || content?.name}</span> 😥
                    </h2>
                )}
            </div>
        </div>
    </div>
  )
}

export default WatchPage
