import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 75vh;
  overflow: hidden;
  background-color: #1a1a1a;
`;

const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 1.2s ease-in-out;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  z-index: ${props => (props.active ? 1 : 0)};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4));
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  font-size: 2.5rem;
  padding: 1rem;
  cursor: pointer;
  z-index: 10;
  opacity: 0.5;
  transition: opacity 0.3s;
  font-family: serif;

  &:hover {
    opacity: 1;
  }

  ${props => (props.direction === 'left' ? 'left: 20px;' : 'right: 20px;')}
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 10;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => (props.active ? '#B89E78' : 'rgba(255,255,255,0.3)')};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #B89E78;
  }
`;

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <CarouselContainer>
      {images.map((img, index) => (
        <Slide 
          key={index} 
          image={img} 
          active={index === currentIndex} 
        />
      ))}

      <NavButton direction="left" onClick={prevSlide}>&#8249;</NavButton>
      <NavButton direction="right" onClick={nextSlide}>&#8250;</NavButton>

      <Indicators>
        {images.map((_, index) => (
          <Dot 
            key={index} 
            active={index === currentIndex} 
            onClick={() => setCurrentIndex(index)} 
          />
        ))}
      </Indicators>
    </CarouselContainer>
  );
};

export default Carousel;