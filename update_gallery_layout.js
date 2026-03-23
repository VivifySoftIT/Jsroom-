const fs = require('fs');

const path = 'c:/Users/hp/Jsroom-/src/Screens/GalleryScreen.js';
let content = fs.readFileSync(path, 'utf8');

// The new JSX for grouping
const newGalleryJSX = `      {/* Main Gallery Grid */}
      <section style={styles.gallerySection}>
        <div style={styles.galleryContainer}>
          {selectedCategory === 'all' ? (
            categories.filter(c => c.id !== 'all').map(category => {
              const categoryImages = galleryImages.filter(img => img.category === category.id && (
                img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                img.description.toLowerCase().includes(searchTerm.toLowerCase())
              ));
              
              if (categoryImages.length === 0) return null;
              
              return (
                <div key={category.id} style={{ marginBottom: '4rem' }}>
                  <div style={styles.galleryHeader}>
                    <h2 style={{...styles.galleryTitle, fontSize: '1.8rem', color: '#1A1A1A'}}>
                      {category.name}
                    </h2>
                    <span style={styles.imageCount}>{categoryImages.length} photos</span>
                  </div>
                  <div style={styles.galleryGrid}>
                    {categoryImages.map(image => (
                      <div 
                        key={image.id} 
                        style={styles.galleryItem}
                        onClick={() => openLightbox(image)}
                      >
                          {image.type === 'video' ? (
                            <div style={styles.videoThumbnailContainer}>
                              <video src={image.url} style={styles.galleryImage} muted autoPlay loop playsInline />
                              <div style={styles.videoOverlay}>
                                <FaPlay style={styles.playIconSmall} />
                              </div>
                            </div>
                          ) : (
                            <img src={encodeURI(image.url)} alt={image.title} style={styles.galleryImage} />
                          )}
                        <div style={styles.galleryOverlay}>
                          <div style={styles.galleryContent}>
                            <h4 style={styles.galleryImageTitle}>{image.title}</h4>
                            <p style={styles.galleryImageDesc}>{image.description}</p>
                            {image.featured && (
                              <span style={styles.featuredBadge}>Featured</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div style={styles.galleryHeader}>
                <h2 style={styles.galleryTitle}>
                  {categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <span style={styles.imageCount}>{filteredImages.length} photos</span>
              </div>
    
              <div style={styles.galleryGrid}>
                {filteredImages.map(image => (
                  <div 
                    key={image.id} 
                    style={styles.galleryItem}
                    onClick={() => openLightbox(image)}
                  >
                      {image.type === 'video' ? (
                        <div style={styles.videoThumbnailContainer}>
                          <video src={image.url} style={styles.galleryImage} muted autoPlay loop playsInline />
                          <div style={styles.videoOverlay}>
                            <FaPlay style={styles.playIconSmall} />
                          </div>
                        </div>
                      ) : (
                        <img src={encodeURI(image.url)} alt={image.title} style={styles.galleryImage} />
                      )}
                    <div style={styles.galleryOverlay}>
                      <div style={styles.galleryContent}>
                        <h4 style={styles.galleryImageTitle}>{image.title}</h4>
                        <p style={styles.galleryImageDesc}>{image.description}</p>
                        {image.featured && (
                          <span style={styles.featuredBadge}>Featured</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {filteredImages.length === 0 && (
            <div style={styles.noResults}>
              <FaImages style={styles.noResultsIcon} />
              <h3>No photos found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>`;

// Find the section by its comment or tags
const startIndex = content.indexOf('{/* Main Gallery Grid */}');
const endIndex = content.indexOf('{/* Lightbox Modal */}');

if (startIndex !== -1 && endIndex !== -1) {
    const updatedContent = content.substring(0, startIndex) + newGalleryJSX + '\n\n      ' + content.substring(endIndex);
    fs.writeFileSync(path, updatedContent, 'utf8');
    console.log('Successfully updated gallery grid to grouped layout.');
} else {
    console.log('Could not find start or end markers for replacement.');
    console.log('StartIndex:', startIndex, 'EndIndex:', endIndex);
}
