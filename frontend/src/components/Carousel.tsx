import React from "react";
import { CarouselItem } from "../types";

interface CarouselProps {
  title: string;
  registered: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ title, registered }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const visibleItems = 4;
  const totalItems = registered.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    );
  };

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < visibleItems; i++) {
      visible.push({
        ...registered[(currentIndex + i) % totalItems],
        isVisible: i === 1,
      });
    }
    return visible;
  };

  if (registered.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-accent-500">Nenhum ajudante encontrado.</p>
      </div>
    );
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
        {title}
      </h2>
      
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Carousel Container */}
        <div className="flex items-center justify-center space-x-8">
          
          {/* Previous Button */}
          <button 
            className="flex-shrink-0 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-primary-50 hover:shadow-xl transition-all duration-300 group"
            onClick={handlePrev}
            disabled={totalItems <= 1}
          >
            <svg className="w-6 h-6 text-primary-600 group-hover:text-primary-700 transform group-hover:-translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel Items */}
          <div className="flex space-x-6 overflow-hidden">
            {getVisibleItems().map((item, index) => (
              <div
                key={index}
                className={`
                  flex-shrink-0 transition-all duration-500 transform
                  ${item.isVisible 
                    ? "scale-110 opacity-100 z-10" 
                    : "scale-90 opacity-60 hover:opacity-80"
                  }
                `}
              >
                <div className="card p-6 w-80 text-center space-y-4 group hover:scale-105 transition-all duration-300">
                  <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <img 
                      src={item.img} 
                      alt={`Foto de ${item.name}`}
                      className="relative z-10 w-24 h-24 object-cover rounded-full shadow-lg"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/96/96';
                      }}
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
                    {`${item.name}, ${item.age} anos`}
                  </h3>
                  
                  <p className="text-accent-600 leading-relaxed group-hover:text-accent-700 transition-colors duration-300 text-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button 
            className="flex-shrink-0 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-primary-50 hover:shadow-xl transition-all duration-300 group"
            onClick={handleNext}
            disabled={totalItems <= 1}
          >
            <svg className="w-6 h-6 text-primary-600 group-hover:text-primary-700 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.min(totalItems, 5) }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex % Math.min(totalItems, 5)
                  ? "bg-primary-600 scale-125"
                  : "bg-primary-200 hover:bg-primary-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
