import React from 'react';
import { motion } from 'framer-motion';
import { Memory, MemoryType } from '../../types/Memory';
import { Music, Video, MessageSquare, Image as ImageIcon } from 'lucide-react';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onClick }) => {
  // Get random rotation between -5 and 5 degrees
  const getRandomRotation = () => Math.random() * 10 - 5;
  const rotation = getRandomRotation();

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotate: 0,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const getTypeIcon = () => {
    switch (memory.type) {
      case MemoryType.MESSAGE:
        return <MessageSquare size={20} className="text-purple-500" />;
      case MemoryType.IMAGE:
        return <ImageIcon size={20} className="text-blue-500" />;
      case MemoryType.AUDIO:
        return <Music size={20} className="text-pink-500" />;
      case MemoryType.VIDEO:
        return <Video size={20} className="text-indigo-500" />;
      default:
        return null;
    }
  };

  const renderThumbnail = () => {
    switch (memory.type) {
      case MemoryType.MESSAGE:
        return (
          <div 
            className="p-6 h-48 flex items-center justify-center text-center overflow-hidden" 
            style={{ backgroundColor: memory.color || '#f3f4f6' }}
          >
            <p className="text-lg overflow-hidden line-clamp-6 font-medium italic">"{memory.content}"</p>
          </div>
        );
      case MemoryType.IMAGE:
        return (
          <div className="h-48 bg-gray-200 overflow-hidden">
            {memory.media?.url && (
              <img 
                src={memory.media.url} 
                alt={memory.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        );
      case MemoryType.AUDIO:
        return (
          <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-6">
            <Music size={60} className="text-pink-500 opacity-50" />
          </div>
        );
      case MemoryType.VIDEO:
        return (
          <div className="h-48 bg-gray-200 overflow-hidden relative">
            {memory.media?.thumbnail ? (
              <img 
                src={memory.media.thumbnail} 
                alt={memory.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                <Video size={60} className="text-indigo-500 opacity-50" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-70 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <div className="ml-1 border-t-8 border-b-8 border-b-transparent border-t-transparent border-l-8 border-l-white" />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="h-48 bg-gray-200" />;
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
      style={{ rotate: `${rotation}deg` }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
    >
      {renderThumbnail()}
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg text-gray-800 truncate">{memory.title}</h3>
          {getTypeIcon()}
        </div>
        <p className="text-gray-500 text-sm">{memory.date}</p>
      </div>
      
      {/* Decorative border */}
      <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
    </motion.div>
  );
};

export default MemoryCard;