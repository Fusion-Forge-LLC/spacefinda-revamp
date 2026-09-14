"use client"

import React from 'react'
import Hero from './Hero'
import HomeHeader from './HomeHeader'

function HeroHeader() {
    const [isPastHero, setIsPastHero] = React.useState(false);

    const heroRef = React.useRef<HTMLDivElement | null>(null);
    
      React.useEffect(() => {
        
        const handleScroll = () => {
          if (heroRef.current) {
            const heroHeight = heroRef.current.offsetHeight;
            if (window.scrollY > (heroHeight * 4)) {
              setIsPastHero(true);
            } else {
              setIsPastHero(false);
            }
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);


    return (
        <>
            <HomeHeader isPastHero={isPastHero} heroRef={heroRef} />
            <Hero heroRef={heroRef} />
        </>
    )
}

export default HeroHeader