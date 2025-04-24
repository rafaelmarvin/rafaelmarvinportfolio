// Image swapping functionality for landing page
const rafaelImg = document.getElementById("rafael-img");
const marvinImg = document.getElementById("marvin-img");

if (rafaelImg) {
  rafaelImg.addEventListener("mouseenter", () => {
    rafaelImg.src = "Assets/marvin3.jpg";
  });
  rafaelImg.addEventListener("mouseleave", () => {
    rafaelImg.src = "Assets/marvin1.jpg";
  });
}

if (marvinImg) {
  marvinImg.addEventListener("mouseenter", () => {
    marvinImg.src = "Assets/marvin4.jpg";
  });
  marvinImg.addEventListener("mouseleave", () => {
    marvinImg.src = "Assets/marvin2.jpg";
  });
}

// Mark that the script has loaded
window.scriptLoaded = true;

// Main functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Contact page functionality
    const contactItems = document.querySelectorAll('.contact-item');
    
    if (contactItems.length > 0) {
        console.log('Contact items found:', contactItems.length);
        
        // Add event listeners to each item
        contactItems.forEach(item => {
            const info = item.querySelector('.contact-info');
            
            if (!info) {
                console.error('Contact info element not found in', item);
                return;
            }
            
            // Initially hide the info with inline styles
            info.style.opacity = '0';
            info.style.visibility = 'hidden';
            
            // Show on hover
            item.addEventListener('mouseenter', function() {
                console.log('Mouse enter:', item.id);
                info.style.opacity = '1';
                info.style.visibility = 'visible';
            });
            
            // Hide on mouse leave if not active
            item.addEventListener('mouseleave', function() {
                console.log('Mouse leave:', item.id);
                if (!item.classList.contains('active')) {
                    info.style.opacity = '0';
                    info.style.visibility = 'hidden';
                }
            });
            
            // Toggle on click
            item.addEventListener('click', function() {
                console.log('Click:', item.id);
                
                // Check if this item is already active
                const isActive = item.classList.contains('active');
                
                // Remove active class from all items
                contactItems.forEach(el => {
                    el.classList.remove('active');
                    const elInfo = el.querySelector('.contact-info');
                    if (elInfo) {
                        elInfo.style.opacity = '0';
                        elInfo.style.visibility = 'hidden';
                    }
                });
                
                // If this wasn't the active item, make it active
                if (!isActive) {
                    item.classList.add('active');
                    info.style.opacity = '1';
                    info.style.visibility = 'visible';
                }
            });
        });
    }
    
    // Image Slider functionality - FIXED
    const slider = document.getElementById('imageSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    if (slider && prevBtn && nextBtn) {
        console.log('Initializing image slider');
        
        const slides = slider.querySelectorAll('.slider-slide');
        let currentIndex = 0;
        
        // Function to update slider position
        function updateSliderPosition() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            if (dots.length > 0) {
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
        }
        
        // Initialize slider position
        updateSliderPosition();
        
        // Next button click handler
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSliderPosition();
        });
        
        // Previous button click handler
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = slides.length - 1;
            }
            updateSliderPosition();
        });
        
        // Dot click handlers
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateSliderPosition();
                });
            });
        }
        
        // Auto-slide functionality
        let autoSlideInterval;
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                if (currentIndex < slides.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSliderPosition();
            }, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Start auto-sliding
        startAutoSlide();
        
        // Pause auto-sliding when hovering over the slider
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, {passive: true});
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, {passive: true});
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                nextBtn.click();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                prevBtn.click();
            }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        });
        
        // Preload images for smoother transitions
        function preloadImages() {
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                if (img) {
                    const preloadImg = new Image();
                    preloadImg.src = img.src;
                }
            });
        }
        
        // Call preload function
        preloadImages();
    }
});