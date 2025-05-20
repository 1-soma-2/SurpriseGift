import React from 'react';
import { motion } from 'framer-motion';
import { Memory, MemoryType } from '../types/Memory';
import { X, Trash2 } from 'lucide-react';

interface MemoryDetailModalProps {
  memory: Memory;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({ 
  memory, 
  onClose,
  onDelete
}) => {
  const renderContent = () => {
    switch (memory.type) {
      case MemoryType.MESSAGE:
        return (
          <div 
            className="w-full p-8 rounded-xl shadow-inner my-6"
            style={{ backgroundColor: memory.color || '#f3f4f6' }}
          >
            <p className="text-xl md:text-2xl italic leading-relaxed whitespace-pre-wrap">"{memory.content}"</p>
          </div>
        );
      case MemoryType.IMAGE:
        return (
          <div className="my-6 rounded-xl overflow-hidden shadow-lg max-h-[60vh]">
            {memory.media?.url && (
              <img 
                src={memory.media.url} 
                alt={memory.title}
                className="w-full object-contain"
              />
            )}
          </div>
        );
      case MemoryType.AUDIO:
        return (
          <div className="my-6 p-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl shadow-md">
            {memory.media?.url && (
              <audio controls className="w-full">
                <source src={memory.media.url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        );
      case MemoryType.VIDEO:
        return (
          <div className="my-6 rounded-xl overflow-hidden shadow-lg">
            {memory.media?.url && (
              <video 
                controls 
                className="w-full max-h-[60vh]"
                poster={memory.media.thumbnail}
              >
                <source src={memory.media.url} type="video/mp4" />
                Your browser does not support the video element.
              </video>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">{memory.title}</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onDelete(memory.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Delete memory"
            >
              <Trash2 size={20} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-500 mb-6">{memory.date}</p>
          
          {renderContent()}
          
          {memory.type === MemoryType.MESSAGE && (
            <div className="mt-8 text-right">
              <p className="text-gray-500 italic">— With love</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemoryDetailModal;