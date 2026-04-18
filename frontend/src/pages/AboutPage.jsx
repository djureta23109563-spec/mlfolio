// frontend/src/pages/AboutPage.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/AboutPage.module.css';

const AboutPage = () => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeGallery, setActiveGallery] = useState('scuaa2026');

  // SCUAA 2026 Images (scuaa2_2026.png removed)
  const scuaa2026Images = [
    { 
      id: 1, 
      src: '/assets/scuaa2026/scuaa1_2026.png', 
      title: 'SCUAA 2026 Champions', 
      description: 'DON MARIANO - MOBILE LEGENDS GAMES 2026 CHAMPION! Feb 23-27, 2026' 
    },
    { 
      id: 3, 
      src: '/assets/scuaa2026/scuaa3_2026.png', 
      title: 'SCUAA 2026 Battle', 
      description: 'Intense competition at the state university level' 
    },
    { 
      id: 4, 
      src: '/assets/scuaa2026/scuaa4_2026.png', 
      title: 'SCUAA 2026 Victory', 
      description: 'Celebrating the championship win' 
    },
    { 
      id: 5, 
      src: '/assets/scuaa2026/scuaa5_2026.png', 
      title: 'SCUAA 2026 Team Photo', 
      description: 'DMMMSU MLBB Team after the historic win' 
    },
  ];

  // SCUAA 2025 Images
  const scuaa2025Images = [
    { 
      id: 1, 
      src: '/assets/scuaa2025/scuaa1_2025.png', 
      title: 'SCUAA 2025 Champions', 
      description: 'SCUAA-1 2025 Champion - Mobile Legends Men! DMMMSU STINGER' 
    },
  ];

  // University Meet 2025 Images
  const universityMeetImages = [
    { 
      id: 1, 
      src: '/assets/university/universityMeet_2025.png', 
      title: 'University Sports Meet 2025 Champion', 
      description: 'CHAMPION - Mobile Legends Men | December 15-17, 2025 at SLUC, Agno, La Union' 
    },
  ];

  const achievements = [
    { icon: "🏆", title: "SCUAA 2026 Champion", description: "Mobile Legends Men Champion - Feb 23-27, 2026" },
    { icon: "🏅", title: "SCUAA 2025 Champion", description: "SCUAA-1 & PASUC-1 Olympics 2025 Champion" },
    { icon: "⭐", title: "University Meet 2025", description: "University Sports Meet Champion - Dec 15-17, 2025" },
    { icon: "👑", title: "Team Captain", description: "Leading DMMMSU MLBB Team to victory" },
    { icon: "🎯", title: "Undefeated Run", description: "Perfect record in SCUAA 2026 tournament" },
    { icon: "🛡️", title: "Defending Champion", description: "Back-to-back SCUAA Championships" },
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.aboutPage}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.titleIcon}>⚔️</span>
          My MLBB Journey
          <span className={styles.titleIcon}>🏆</span>
        </h1>
        <p className={styles.subtitle}>
          SCUAA Champion 2025 & 2026 | University Sports Meet Champion
        </p>
      </div>

      <div className={styles.container}>
        {/* Stats Section */}
        <section className={styles.section}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>2</div>
              <div className={styles.statLabel}>SCUAA Championships</div>
              <div className={styles.statYear}>2025 • 2026</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>1</div>
              <div className={styles.statLabel}>University Meet Title</div>
              <div className={styles.statYear}>2025 Champion</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Win Rate in SCUAA</div>
              <div className={styles.statYear}>Undefeated Champion</div>
            </div>
          </div>
        </section>

        {/* Gallery Navigation */}
        <section className={styles.section}>
          <div className={styles.galleryNav}>
            <button 
              className={`${styles.galleryBtn} ${activeGallery === 'scuaa2026' ? styles.activeGalleryBtn : ''}`}
              onClick={() => setActiveGallery('scuaa2026')}
            >
              🏆 SCUAA 2026
            </button>
            <button 
              className={`${styles.galleryBtn} ${activeGallery === 'scuaa2025' ? styles.activeGalleryBtn : ''}`}
              onClick={() => setActiveGallery('scuaa2025')}
            >
              🏅 SCUAA 2025
            </button>
            <button 
              className={`${styles.galleryBtn} ${activeGallery === 'university' ? styles.activeGalleryBtn : ''}`}
              onClick={() => setActiveGallery('university')}
            >
              ⭐ University Meet 2025
            </button>
          </div>
        </section>

        {/* SCUAA 2026 Gallery */}
        {activeGallery === 'scuaa2026' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              SCUAA 2026 Championship 🏆
            </h2>
            <p className={styles.galleryDescription}>
              February 23-27, 2026 - DMMMSU MLBB Team makes history as SCUAA Champions!
            </p>
            <div className={styles.galleryGrid}>
              {scuaa2026Images.map((image) => (
                <div 
                  key={image.id} 
                  className={styles.galleryCard}
                  onClick={() => openLightbox(image)}
                >
                  <img src={image.src} alt={image.title} className={styles.galleryImage} />
                  <div className={styles.galleryOverlay}>
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                    <span className={styles.viewBtn}>Click to view 🔍</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SCUAA 2025 Gallery */}
        {activeGallery === 'scuaa2025' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              SCUAA 2025 Championship 🏅
            </h2>
            <p className={styles.galleryDescription}>
              SCUAA-1 & PASUC-1 Olympics 2025 - DMMMSU STINGER Claims Victory!
            </p>
            <div className={styles.galleryGrid}>
              {scuaa2025Images.map((image) => (
                <div 
                  key={image.id} 
                  className={styles.galleryCard}
                  onClick={() => openLightbox(image)}
                >
                  <img src={image.src} alt={image.title} className={styles.galleryImage} />
                  <div className={styles.galleryOverlay}>
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                    <span className={styles.viewBtn}>Click to view 🔍</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* University Meet 2025 Gallery */}
        {activeGallery === 'university' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              University Sports Meet 2025 ⭐
            </h2>
            <p className={styles.galleryDescription}>
              December 15-17, 2025 at SLUC, Agno, La Union - University Champion!
            </p>
            <div className={styles.galleryGrid}>
              {universityMeetImages.map((image) => (
                <div 
                  key={image.id} 
                  className={styles.galleryCard}
                  onClick={() => openLightbox(image)}
                >
                  <img src={image.src} alt={image.title} className={styles.galleryImage} />
                  <div className={styles.galleryOverlay}>
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                    <span className={styles.viewBtn}>Click to view 🔍</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Key Achievements 🏆</h2>
          <div className={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <div key={index} className={styles.achievementCard}>
                <div className={styles.achievementIcon}>{achievement.icon}</div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* My Story Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>My Story</h2>
          <div className={styles.storyBox}>
            <p>
              Representing DMMMSU in Mobile Legends competitions has been an incredible journey. 
              From winning the University Sports Meet in December 2025 to claiming back-to-back 
              SCUAA championships in 2025 and 2026, every match has been a testament to our 
              team's dedication, strategy, and passion for the game.
            </p>
            <p>
              These victories aren't just about the trophies - they represent countless hours 
              of practice, team coordination, and the unwavering support from our university 
              and fellow students. Being part of DMMMSU's esports journey is an honor, and 
              I'm excited to continue representing our school in future competitions.
            </p>
            {user && (
              <div className={styles.welcomeBack}>
                <span>🎮</span>
                <p>Thanks for visiting, {user.name}! Let's keep the winning spirit alive!</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeLightbox}>✕</button>
            <img src={selectedImage.src} alt={selectedImage.title} className={styles.lightboxImage} />
            <h3 className={styles.lightboxTitle}>{selectedImage.title}</h3>
            <p className={styles.lightboxDescription}>{selectedImage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;