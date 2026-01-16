import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import heroBgImage from './assets/banner.png';
import drinkBgImage from './assets/drink_menu_bg.png';
import titleImage from './assets/hibari.png';
import about0Image from './assets/about0.jpg';
import about1Image from './assets/about1.jpg';
import about2Image from './assets/about2.jpg';
import c0 from './assets/carousel/0.jpg';
import c1 from './assets/carousel/1.jpg';
import c2 from './assets/carousel/2.jpg';
import c3 from './assets/carousel/3.jpg';
import c4 from './assets/carousel/4.jpg';
import c5 from './assets/carousel/5.jpg';
import c6 from './assets/carousel/6.jpg';
import c7 from './assets/carousel/7.jpg';
import c8 from './assets/carousel/8.jpg';
import c9 from './assets/carousel/9.jpg';
import c10 from './assets/carousel/10.jpg';
import Carousel from './components/Carousel';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Lato:wght@300;400;700&family=Noto+Serif+JP:wght@400;600&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
    background-color: #F4F1EA; /* 仿纸张米色背景 */
    color: #2C2C2C; /* 深炭色字体 */
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-family: 'Cinzel', serif; /* 高级感衬线标题 */
    font-weight: 400;
    letter-spacing: 0.1em;
  }

  .kanji {
    font-family: 'Noto Serif JP', serif;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  width: 100%;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 4rem;
  box-sizing: border-box;
  z-index: 1000;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  background: ${props => (props.isScrolled ? 'rgba(26, 26, 26, 0.85)' : 'transparent')};
  backdrop-filter: ${props => (props.isScrolled ? 'blur(10px)' : 'none')};
  
  transform: ${props => {
    if (props.scrollPos === 1) return 'translateY(-100%)';
    return 'translateY(0)';
  }};

  color: white;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem 4rem;
  }
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(26, 26, 26, 0.8); /* 深色半透明背景 */
  border: 1px solid #B89E78;
  color: #B89E78;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 999;
  transition: all 0.4s ease;
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  transform: translateY(${props => (props.visible ? '0' : '20px')});

  &:focus, &:active {
    outline: none;
  }
  
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: #B89E78;
    border: 1px solid #fff;
    color: #fff;
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
`;

const ArrowIcon = styled.span`
  border: solid currentcolor;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(-135deg);
  margin-top: 4px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  
  
  @media (max-width: 768px) {
    display: none;
  }

  a {
    color: white;
    &:hover { opacity: 0.7; }
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
  z-index: 101;
  position: absolute;
  right: 2rem;

  span {
    height: 2px;
    width: 25px;
    background: white;
    transition: all 0.3s ease;
  }

  &.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  &.open span:nth-child(2) { opacity: 0; }
  &.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const SideBar = styled.div`
  position: fixed;
  top: 0;
  left: ${props => (props.isOpen ? '0' : '-100%')};
  width: 280px;
  height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  padding: 8rem 2rem;
  gap: 2rem;
  transition: left 0.4s cubic-bezier(0.77, 0.2, 0.05, 1);
  z-index: 100;
  box-shadow: 2px 0 10px rgba(0,0,0,0.5);

  a {
    color: #F4F1EA;
    text-decoration: none;
    font-family: 'Cinzel', serif;
    font-size: 1.5rem;
    letter-spacing: 0.1em;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-bottom: 1rem;

    &:hover { color: #B89E78; }
  }
`;

const Overlay = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
`;

const DesktopNavLinks = styled(NavLinks)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoText = styled.h1`
  font-size: 2rem;
  margin: 0;
  letter-spacing: 0.3em;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), 
              url(${heroBgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const KanjiTitle = styled.div`
  animation: ${fadeIn} 1.5s ease-out;
`;

const LogoTitle = styled.img`
  width: 30%;
  margin-top: 3rem;
`;

const ReservationSection = styled.div`
  background: #222;
`

const InfoBar = styled.div`
  color: #F4F1EA;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3rem 10%;
  flex-wrap: wrap;
  gap: 2rem;
`;

const InfoBlock = styled.div`
  text-align: left;
  flex: 1;
  min-width: 250px;

  h3 {
    font-size: 1.5rem;
    color: #B89E78;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0.2rem 0;
    color: #ccc;
  }

  a {
    color: #ccc;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #B89E78;
  color: #B89E78;
  padding: 1rem 2rem;
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  &:hover {
    background-color: #B89E78;
    border: 1px solid #fff;
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

const Link = styled.a`
  color: #B89E78;

  &:hover {
    color: #B89E50;
  }
`;

const MenuSection = styled.section`
  padding: 2rem 10%;
  background-color: #F4F1EA;
`;

const DinnerSection = styled.section`
  // background: linear-gradient(
  //   to bottom, 
  //   rgb(33, 33, 33) 0%, 
  //   rgb(44, 44, 44) 100%
  // );
`

const DrinkSection = styled.section`
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), 
              url(${drinkBgImage});
  padding: 6rem 10%;
`

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: ##B89E78;
  margin-bottom: 1rem;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background-color: #B89E78;
    margin: 1rem auto;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionDesc = styled.h2`
  text-align: center;
  font-size: 1rem;
  color: ##B89E78;
  width: 80%;
  margin: 0 auto 4rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 4rem;
  border-bottom: 1px solid #e0e0e0;
  font-size: 1.25rem;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 1rem 2rem;
  font-family: 'Cinzel', serif;
  font-size: 1.2rem;
  letter-spacing: 0.2em;
  cursor: pointer;
  color: ${props => (props.active ? '#1a1a1a' : '#aaa')};
  position: relative;
  transition: color 0.3s ease;

  &:focus {
    outline: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #B89E78;
    transform: scaleX(${props => (props.active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #1a1a1a;
  }
`;

const MenuDesc = styled.p`
  text-align: center;
  max-width: 600px;
  margin: -3rem auto 3rem;
  font-style: italic;
  color: #666;
  line-height: 1.6;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const MenuItem = styled.div`
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1.5rem;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
`;

const ItemName = styled.h4`
  font-size: 1.25rem;
  margin: 0;
  color: #1a1a1a;
  font-weight: 500;
`;

const ItemPrice = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  color: #555;
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  width: max-content;
  max-width: 90%;
`;

const ItemDesc = styled.li`
  font-size: 1rem;
  color: #666;
  font-style: italic;
  line-height: 1.25;
  list-style: none;
`;

const Disclaimer = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #888;
  margin-top: 2rem;
  font-style: italic;
`;

const AboutSection = styled.section`
  background-color: #1A1A1A;
  color: #dcdcdc;
  padding: 2rem 10%;
`;

const AboutImg = styled.img`
  width: 80%;
`;

const SectionContent = styled.div`
  text-align: center;
  width: 65%;
  margin: 0 auto;
  font-size: large;
  line-height: 1.75rem;
  padding-bottom: 5rem;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const SectionText = styled.div`
  text-align: left;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutCol = styled.div`
  padding: 1rem;

  h3 {
    color: #B89E78;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.8;
    color: #aaa;
  }
`;

const Footer = styled.footer`
  background-color: #111;
  color: #555;
  text-align: center;
  padding: 2rem;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
`;


const HibariLanding = () => {

  const carouselImages = [
    c0,
    c1,
    c2,
    c3,
    c4,
    c5,
    c6,
    c7,
    c8,
    c9,
    c10,
  ];

  const lunchMenuData = [
    {
      name: "Tekka Don Set",
      price: "38",
      sub: "Bluefin Tuna Donburi",
      desc: "Akami, chutoro, ootoro, and toro-taku over rice. A premium assortment of tuna cuts."
    },
    {
      name: "Salmon Don Set",
      price: "22",
      sub: "Salmon Variety Donburi",
      desc: "Slices of salmon, salmon belly, salmon soboro, and ikura over rice."
    },
    {
      name: "Goma Kanpachi Don Set",
      price: "35",
      sub: "Sesame Amberjack Donburi",
      desc: "Kanpachi sashimi topped with sweet soy and sesame dressing."
    },
    {
      name: "Kaisen Don Set",
      price: "46",
      sub: "Assorted Seafood Donburi",
      desc: "Chef's selection of assorted sashimi over rice."
    },
    {
      name: "Hibari Don Set",
      price: "66",
      sub: "Luxury Seafood Donburi",
      desc: "A decadent bowl of premium sashimi with uni and ikura. Our signature special."
    },
    {
      name: "Grilled Salmon Kasuzuke Set",
      price: "22",
      sub: "Sake Lees Marinated Salmon",
      desc: "Grilled salmon marinated in sake lees."
    },
    {
      name: "Grilled Cod Saikyo Miso Set",
      price: "36",
      sub: "Miso-Marinated Black Cod",
      desc: "Tender cod marinated in sweet saikyo miso and carefully grilled."
    },
    {
      name: "Yurinchi Set",
      price: "18",
      sub: "Japanese Fried Chicken with Soy Vinaigrette",
      desc: "Lightly battered chicken with housemade yurinchi sauce. Juicy and savory."
    },
    {
      name: "Dashimaki Tamago Set (Niku Miso)",
      price: "18",
      sub: "Japanese Rolled Omelet with Ground Meat Miso",
      desc: "Served with rice, soup, and sides."
    },
    {
      name: "Dashimaki Tamago Set (Mentaiko)",
      price: "22",
      sub: "Japanese Rolled Omelet with Spicy Cod Roe",
      desc: "Served with rice, soup, and sides."
    },
    {
      name: "Dashimaki Tamago Set (Ikura)",
      price: "28",
      sub: "Japanese Rolled Omelet with Salmon Roe",
      desc: "Served with rice, soup, and sides."
    }
  ];

  const dinnerPetitList = [
    "Welcome Bite - Seasonal starter",
    "Nigiri Flight · First set",
    "Nigiri Flight · Second set",
    "Soup",
    "Dessert",
  ];

  const dinnerPrefixList = [
    "Welcome Bite - Seasonal starter",
    "Sashimi",
    "Tofu Course",
    "Nigiri Flight · First set",
    "Dobin Mushi",
    "Nigiri Flight · Second set",
    "Nimono",
    "Handroll",
    "Soup",
    "Dessert",
    "Enhancements(Optional)"
  ];

  const omakaseList = []

  const drinkMenuData = [
    {
      category: "Non-alcohol",
      items: [
        { name: "Hot Green Tea", price: "3", desc: "" },
        { name: "Ice Green Tea", price: "4", desc: "" },
        { name: "Mitsuya Cider", price: "4", desc: "" },
        { name: "Yuzu Sparkling", price: "7", desc: "" },
        { name: "Tahoe Artesian Still", price: "8/750ml", desc: "" },
        { name: "Tahoe Artesian Sparkling", price: "8/750ml", desc: "" },
      ]
    },
    {
      category: "Beer",
      items: [
        { name: "Draft Asahi", price: "8/glass 30/pitcher", desc: "" },
        { name: "Kawaba Snow Weizen", price: "12/bottle", desc: "" },
      ]
    },
    {
      category: "Sake",
      items: [
        { name: "Choryo Sawasawa Sparkling Sake", price: "15/250ml", desc: "Refreshing" },
        { name: "Keigetsu Cel24", price: "21/300ml", desc: "Fruity, Smooth" },
        { name: "Keigetsu Yuzu", price: "22/300ml", desc: "" },
        { name: "Sohomare Tokubetsu Kimoto", price: "28/carafe", desc: "Rich, Earthy" },
        { name: "Tomoshichi Nigori", price: "32/375ml", desc: "Unique, Light, Dry" },
        { name: "Denshu", price: "34/carafe", desc: "Umami Goodness and a clean finish" },
        { name: "Dassai Blue 35", price: "42/375ml", desc: "Fruity, Clean" },
        { name: "Dassai Blue 50 Junmai Daiginjo", price: "53/720ml", desc: "Light, Sweet" },
        { name: "Seiryu Zen Surf Toku Junmai", price: "63/720ml", desc: "Light refreshing and subtly complex profile" },
        { name: "Senkin Retro", price: "70/720ml", desc: "Sweet, Sour" },
        { name: "Harada Nama Arabashiri", price: "96/720ml", desc: "Light, Dry" },
        { name: "Daishichi Minowamon Junmai Daiginjo", price: "117/720ml", desc: "Elegant, Aromatic, Creamy" },
        { name: "Kagamiyama Junmai Wine Yeast", price: "136/720ml", desc: "Fruity, Crisp" },
        { name: "Akitabare Suirakuten Junmai Daiginjo", price: "150/720ml", desc: "Light, Sweet" },
        { name: "Kokuryu yu Junmai Daiginjo", price: "180/720ml", desc: "" },
        { name: "Dewazakura Yukimanman Junmai Daiginjo", price: "200/720ml", desc: "" },
        { name: "Akitabare Suirakuten Reserve aged 20yr", price: "226/720ml", desc: "Finest, Complex" },
        { name: "Tedorigawa Mangekyu", price: "340/720ml", desc: "" },
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState('lunch');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const Header = () => {
    const [scrollPos, setScrollPos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentPos = (window.scrollY / scrollHeight) * 100;

        setScrollPos(currentPos);

        if (currentPos > 5) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <>
        <Navbar scrollPos={scrollPos} isScrolled={isScrolled}>
          <Hamburger className={isOpen ? 'open' : ''} onClick={() => setIsOpen(!isOpen)}>
            <span /> <span /> <span />
          </Hamburger>

          <DesktopNavLinks>
            <a href="#reservations">Reservations</a>
            <a href="#menu">Menu</a>
          </DesktopNavLinks>

          <LogoText>HIBARI</LogoText>

          <DesktopNavLinks>
            <a href="#about">About</a>
            <a href="#info">Info</a>
          </DesktopNavLinks>
        </Navbar>

        <SideBar isOpen={isOpen}>
          <a href="#reservations" onClick={closeMenu}>Reservations</a>
          <a href="#menu" onClick={closeMenu}>Menu</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#info" onClick={closeMenu}>Info</a>
        </SideBar>

        <Overlay isOpen={isOpen} onClick={closeMenu} />

      </>
    );
  };

  const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const toggleVisibility = () => {
        if (window.scrollY > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    return (
      <BackToTopButton
        visible={isVisible}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowIcon />
      </BackToTopButton>
    );
  };


  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <HeroSection>
          <KanjiTitle>
            <LogoTitle src={titleImage}></LogoTitle>
          </KanjiTitle>
        </HeroSection>

        <ReservationSection id="reservations">
          <InfoBar>
            <SectionTitle>Online Reservation</SectionTitle>
          </InfoBar>
          <SectionContent>
            <a
              href="https://resy.com/cities/portola-valley-ca-ca/venues/hibari?date=2025-12-25&seats=2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button>Book a Table</Button>
            </a>
          </SectionContent>
          <SectionContent style={{ color: '#efefef' }}>
            <p style={{ marginBottom: '1rem' }}>You can also reserve kappo through Instagram DM at <Link href="https://www.instagram.com/hibari_portolavalley" target="_blank"
              rel="noopener noreferrer">hibari_portolavalley</Link> or E-mail <Link href="mailto:hibari3130@gmail.com">hibari3130@gmail.com</Link>.</p>
            <p style={{ marginBottom: '1rem' }}>If your plans change before your reservation time, please contact us promptly to modify your booking.</p>
          </SectionContent>
        </ReservationSection>

        <MenuSection id="menu">
          <SectionTitle> Menu</SectionTitle>
          <TabContainer>
            <TabButton
              active={activeTab === 'lunch'}
              onClick={() => setActiveTab('lunch')}
            >
              Lunch
            </TabButton>
            <TabButton
              active={activeTab === 'dinner'}
              onClick={() => setActiveTab('dinner')}
            >
              Dinner
            </TabButton>
          </TabContainer>
          {activeTab === 'lunch' && <>
            <SectionDesc>Inspired by "一汁三菜" (one soup, three dishes), a traditional Japanese balance of comfort and seasonality.</SectionDesc>
            <MenuGrid>
              {lunchMenuData.map((item, index) => (
                <MenuItem key={index}>
                  <ItemHeader>
                    <ItemName>{item.name}</ItemName>
                    {/* <ItemPrice>${item.price}</ItemPrice> */}
                  </ItemHeader>
                  <ItemDesc>
                    <strong style={{ display: 'block', color: '#B89E78', marginBottom: '0.3rem', fontStyle: 'italic' }}>
                      {item.sub}
                    </strong>
                    {item.desc}
                  </ItemDesc>
                </MenuItem>
              ))}
            </MenuGrid>
          </>}

          {activeTab === 'dinner' && <>
            <DinnerSection>
              <SectionDesc>Our dinner transforms into Kappo omakase at the counter and "Server Omakase" at tables</SectionDesc>
              <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <MenuItem style={{ borderBottom: 'none' }}>
                  <ItemHeader style={{ justifyContent: 'center', gap: '2rem' }}>
                    <ItemName style={{ fontSize: '1.5rem' }}>Kappo Omakase</ItemName>
                    {/* <ItemPrice style={{ fontSize: '1.5rem' }}>$250</ItemPrice> */}
                  </ItemHeader>
                  <strong style={{ display: 'block', color: '#B89E78', marginBottom: '0.3rem', fontStyle: 'italic' }}>
                    Bar Counter Experience
                  </strong>
                  <ItemDesc>Join us for a special Kappo Omakase at 6:00 PM.</ItemDesc>
                  <ItemDesc>Limited Bar Seats - advance reservation required.</ItemDesc>
                  <ItemList>
                    {omakaseList.map((item, index) => (
                      <ItemDesc style={{ marginTop: '0.75rem' }}>{item}</ItemDesc>
                    ))}
                  </ItemList>
                </MenuItem>

                <MenuItem style={{ borderBottom: 'none' }}>
                  <ItemHeader style={{ justifyContent: 'center', gap: '2rem' }}>
                    <ItemName style={{ fontSize: '1.5rem' }}>Dinner Prix Fixe</ItemName>
                    {/* <ItemPrice style={{ fontSize: '1.5rem' }}>$150</ItemPrice> */}
                  </ItemHeader>
                  <ItemList>
                    {dinnerPrefixList.map((item, index) => (
                      <ItemDesc style={{ marginTop: '0.75rem' }}>{item}</ItemDesc>
                    ))}
                  </ItemList>
                </MenuItem>

                <MenuItem style={{ borderBottom: 'none' }}>
                  <ItemHeader style={{ justifyContent: 'center', gap: '2rem' }}>
                    <ItemName style={{ fontSize: '1.4rem' }}>Hibari Petit Tasting</ItemName>
                    {/* <ItemPrice style={{ fontSize: '1.4rem' }}>$88</ItemPrice> */}
                  </ItemHeader>
                  <ItemList>
                    {dinnerPetitList.map((item, index) => (
                      <ItemDesc style={{ marginTop: '0.75rem' }}>{item}</ItemDesc>
                    ))}
                  </ItemList>
                </MenuItem>
              </div>

            </DinnerSection>
          </>}

          <Disclaimer>
            *Please inform your server of any allergies. Consuming raw or undercooked seafood may increase your risk of foodborne illness.
          </Disclaimer>
        </MenuSection>

        {/* <DrinkSection>
          <SectionTitle style={{ color: '#F4F1EA' }}>Drink Menu</SectionTitle>
          {drinkMenuData.map((section, index) => (
            <div key={index} style={{ marginBottom: '3rem' }}>
              <h3 style={{
                color: '#B89E78',
                textAlign: 'center',
                fontFamily: 'Cinzel, serif',
                fontSize: '1.5rem',
                marginBottom: '2rem',
                borderBottom: '1px solid rgba(184, 158, 120, 0.3)',
                paddingBottom: '0.5rem'
              }}>
                {section.category}
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: section.category === 'Sake' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr 1fr',
                gap: '2rem'
              }}>
                {section.items.map((item, itemIndex) => (
                  <MenuItem key={itemIndex}>
                    <ItemHeader>
                      <ItemName style={{ color: '#F4F1EA' }}>
                        {item.name}
                      </ItemName>
                      <ItemPrice style={{ color: '#F4F1EA' }}>
                        ${item.price}
                      </ItemPrice>
                    </ItemHeader>

                    {item.desc && (
                      <ItemDesc style={{ color: '#aaa' }}>
                        {item.desc}
                      </ItemDesc>
                    )}
                  </MenuItem>
                ))}
              </div>
            </div>
          ))}
        </DrinkSection> */}

        <AboutSection id="about">
          <SectionTitle style={{ color: '#F4F1EA' }}>About Hibari</SectionTitle>
          <SectionContent>
            <SectionText>
              <p>Hibari is a dining destination where time slows and the senses take the lead
                In an intimate and composed setting, each meal inuites guests to trauel beyond the familiar
                discouering flavors shaped by place, culture, and moment.
              </p>
              <p>Our Chef Taka - former Head Sushi Chef at Nobu Palo Alto, with experience at Michelin-starred experience.</p>
              <p>Through careful pacing and subtle expression, the experience is designed to be felt on the palate
                rather than explained.</p>
            </SectionText>
          </SectionContent>
          <AboutGrid>
            <AboutCol>
              <AboutImg src={about0Image}></AboutImg>
              <h3>Seasonal Omakase</h3>
              <SectionText>
                A menu that evolves with the four seasons, offering a curated omakase experience shaped by the best ingredients of the moment.
              </SectionText>
            </AboutCol>
            <AboutCol>
              <AboutImg src={about1Image}></AboutImg>
              <h3>Refined Craftsmanship</h3>
              <SectionText>
                Rooted in traditional Japanese sushi techniques, every dish reflects precision, restraint, and deep respect for culinary craft.
              </SectionText>
            </AboutCol>
            <AboutCol>
              <AboutImg src={about2Image}></AboutImg>
              <h3>Premium Ingredients</h3>
              <SectionText>
                Exceptional seafood and seasonal produce selected at peak quality, handled with care to preserve their natural character.
              </SectionText>
            </AboutCol>
          </AboutGrid>
        </AboutSection>

        <Carousel images={carouselImages} />

        <Footer id="info">
          <InfoBar>
            <InfoBlock>
              <h3>LOCATION</h3>
              <p><a href="https://share.google/VmfzWd4JycpimhWab" target="_blank"
                rel="noopener noreferrer">3130 Alpine Rd Suite 240</a></p>
              <p><a href="https://share.google/VmfzWd4JycpimhWab" target="_blank"
                rel="noopener noreferrer">Portola Valley</a></p>
              <p><a href="https://share.google/VmfzWd4JycpimhWab" target="_blank"
                rel="noopener noreferrer">CA 94028</a></p>
            </InfoBlock>


            <InfoBlock>
              <h3>HOURS</h3>
              <p style={{ color: '#888', fontSize: '0.8rem' }}>Tuesday-Sunday. Closed Mondays</p>
              <p>Lunch: 11:30 AM - 2:00 PM</p>
              <p>Dinner: 5:00 PM - 9:00 PM</p>
            </InfoBlock>

            <InfoBlock>
              <h3>CONTACT</h3>
              <p><i class="fas fa-phone-alt"></i>&nbsp;
                <a href="tel:6506569243">(650) 656-9243</a></p>
              <p><i class="fas fa-envelope"></i>&nbsp;
                <a href="mailto:hibari3130@gmail.com">hibari3130@gmail.com</a></p>
              <p><i class="fa-brands fa-instagram"></i>&nbsp;
                <a href="https://www.instagram.com/hibari_portolavalley" target="_blank"
                  rel="noopener noreferrer">hibari_portolavalley</a></p>
            </InfoBlock>
          </InfoBar>
          &copy; 2025 Hibari Portola Valley . All rights reserved.
        </Footer>

        <BackToTop />
      </Container>
    </>
  );
};

export default HibariLanding;