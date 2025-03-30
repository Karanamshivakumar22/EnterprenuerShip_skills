import React, { useState, useEffect, useCallback } from 'react';
import { Play, BookOpen } from 'lucide-react';
import YouTube from 'react-youtube';
import axios from 'axios';

const modules = [
  {
    title: 'Business Planning and Strategy',
    playlistUrl: 'https://youtube.com/playlist?list=PL18rl3KEg0oIdg5pB2aX6KFaBjtN3V3OA',
    thumbnail: '/src/assests/Business Planning and Strategy.jpg',
  },
  {
    title: 'Financial Literacy & Management',
    playlistUrl: 'https://youtube.com/playlist?list=PLIS94dmuRf9MaTTKwkE979KrhZhZEq6mY',
    thumbnail: '/src/assests/Financial.jpg',
  },
  {
    title: 'Digital Marketing & Outreach',
    playlistUrl: 'https://youtube.com/playlist?list=PLEiEAq2VkUULa5aOQmO_al2VVmhC-eqeI',
    thumbnail: '/src/assests/Digital marketing.jpg',
  },
  {
    title: 'E-commerce Essentials',
    playlistUrl: 'https://youtube.com/watch?v=ay6RKzh3QSg',
    thumbnail: '/src/assests/E_commerce.jpg',
  },
  {
    title: 'Effective Communication Skills',
    playlistUrl: 'https://youtube.com/playlist?list=PLm_MSClsnwm-AIEbpyIxoTT8t7UzkHSYC',
    thumbnail: '/src/assests/Effective Communication.jpg',
  },
  {
    title: 'Leadership & Team Management',
    playlistUrl: 'https://youtube.com/playlist?list=PL26pr4T7OzVMIqLz61IxO1CAAjzSY1-mS',
    thumbnail: '/src/assests/Leadership and Team Management.jpg',
  },
];

const API_KEY = 'AIzaSyB-l_D92ECCObDby9zbnKVpu7Mqjqaj_GY';

const extractPlaylistId = (url) => {
  const match = url.match(/[?&]list=([^&]+)/);
  return match ? match[1] : null;
};

const Courses = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const fetchVideos = useCallback(async (playlistUrl) => {
    const playlistId = extractPlaylistId(playlistUrl);
    if (!playlistId) return;

    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/playlistItems',
        {
          params: {
            part: 'snippet',
            maxResults: 50,
            playlistId: playlistId,
            key: API_KEY,
          },
        }
      );

      const fetchedVideos = response.data.items.map((video) => ({
        id: video.snippet.resourceId.videoId,
        title: video.snippet.title,
      }));

      setVideos(fetchedVideos);
      if (fetchedVideos.length > 0) {
        setCurrentVideo(fetchedVideos[0].id);
      }
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
    }
  }, []);

  useEffect(() => {
    if (selectedModule) {
      fetchVideos(selectedModule.playlistUrl);
    }
  }, [selectedModule, fetchVideos]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <BookOpen className="text-indigo-600 dark:text-indigo-400" /> Explore Courses
        </h1>

        {!selectedModule ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer p-4"
                onClick={() => setSelectedModule(module)}
              >
                <img
                  src={module.thumbnail}
                  alt={module.title}
                  className="w-full h-60 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {module.title}
                </h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-black rounded-lg overflow-hidden mb-6">
                {currentVideo && (
                  <YouTube
                    videoId={currentVideo}
                    className="w-full h-96"
                    opts={{
                      playerVars: { autoplay: 1 },
                    }}
                  />
                )}
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Back to Courses
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-fit">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedModule.title}
              </h3>
              <div
                className="space-y-4 max-h-80 overflow-y-auto"
                style={{ overscrollBehavior: 'contain' }}
              >
                {videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setCurrentVideo(video.id)}
                    className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                      currentVideo === video.id
                        ? 'bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {video.title}
                      </h4>
                      <Play className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
