// Simple script with dark mode toggle

// Animation Utilities
const splitText = (element) => {
    if (!element) return [];
    
    // Check if already split
    if (element.querySelector('.char')) return Array.from(element.querySelectorAll('.char'));
    
    const text = element.textContent;
    element.textContent = '';
    
    // Handle spaces properly
    return [...text].map(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? ' ' : char; // Preserve spaces
        element.appendChild(span);
        return span;
    });
};

const animateText = (element, delay = 60) => {
    if (!element) return;
    
    const chars = splitText(element);
    if (!chars.length) return;
    
    // Calculate delays for the elegant fade-in animation
    chars.forEach((char, i) => {
        // Use wave-like pattern for more interesting appearance
        const adjustedDelay = i * delay + Math.sin(i * 0.5) * 50;
        
        setTimeout(() => {
            // Add visible class to start the elegant animation
            char.classList.add('visible');
        }, adjustedDelay);
    });
};

// Scroll and Animation Handler
const ScrollHandler = {
    init() {
        this.header = document.querySelector('header');
        this.mainHeading = document.querySelector('#animated-heading');
        this.sections = document.querySelectorAll('section');
        this.lastScroll = 0;
        
        // Initialize animations
        this.initializeAnimations();
        
        // Add scroll listener
        window.addEventListener('scroll', () => this.handleScroll());
    },
    
    initializeAnimations() {
        // Add a small delay to ensure DOM is fully processed
        setTimeout(() => {
            // Animate main heading on load
            if (this.mainHeading) {
                console.log('Animating main heading:', this.mainHeading);
                animateText(this.mainHeading, 100);
            }
            
            // Prepare section headings
            this.sections.forEach(section => {
                const heading = section.querySelector('h2');
                if (heading) {
                    splitText(heading);
                }
            });
        }, 500);
    },
    
    handleScroll() {
        const scrollPos = window.scrollY;
        
        // Handle section animations only (no header animation)
        this.sections.forEach(section => {
            const heading = section.querySelector('h2');
            if (heading) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    heading.classList.add('visible');
                    
                    const chars = heading.querySelectorAll('.char');
                    chars.forEach((char, i) => {
                        // Create wave-like appearance effect
                        const adjustedDelay = i * 60 + Math.sin(i * 0.5) * 40;
                        
                        setTimeout(() => {
                            // Add visible class to trigger the elegant animation
                            char.classList.add('visible');
                        }, adjustedDelay);
                    });
                }
            }
        });
        
        this.lastScroll = scrollPos;
    }
};

// Dark Mode Toggle Implementation
const DarkMode = {
    init() {
        this.body = document.body;
        this.toggle = document.getElementById('theme-toggle');
        this.icon = this.toggle ? this.toggle.querySelector('i') : null;
        
        // Apply saved theme
        this.applyTheme();
        
        // Set up event listener
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
    },
    
    applyTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.body.className = savedTheme === 'dark' ? 'dark-theme' : 'light-theme';
        this.updateIcon();
    },
    
    toggleTheme() {
        const isDark = this.body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';
        
        this.body.className = newTheme === 'dark' ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', newTheme);
        
        this.updateIcon();
    },
    
    updateIcon() {
        if (this.icon) {
            const isDark = this.body.classList.contains('dark-theme');
            this.icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
};

// Initialize all handlers
document.addEventListener('DOMContentLoaded', () => {
    DarkMode.init();
    ScrollHandler.init();
    UserTracker.init(); // Initialize user tracking
    fixSmoothScrolling(); // Fix navigation links
    BackgroundSlideshow.init(); // Initialize background slideshow
    initTextAnalysis(); // Initialize text analysis functionality
    
    // Print confirmation message
    console.log('Is this working? Yes, user tracking is active!');
});

// Background Slideshow Controller
const BackgroundSlideshow = {
    slides: [],
    currentSlide: 0,
    slideInterval: null,
    
    init() {
        // Get all slides
        this.slides = document.querySelectorAll('.background-slideshow .slide');
        
        if (this.slides.length === 0) return;
        
        // Set backgrounds for slides
        this.setBackgroundImages();
        
        // Start slideshow
        this.start();
        
        console.log('Background slideshow initialized');
    },
    
    setBackgroundImages() {
        // Nature background images with cherry blossoms and dried trees
        const bgImages = [
            'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', // Cherry blossoms
            'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', // Dried tree in sunset
            'https://images.unsplash.com/photo-1478397453044-17bb5f994100?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', // Autumn dried trees
            'https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', // Cherry blossoms trees path
            'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'  // Tall trees path
        ];
        
        // Apply background images to slides
        this.slides.forEach((slide, index) => {
            if (index < bgImages.length) {
                slide.style.backgroundImage = `url(${bgImages[index]})`;
            }
        });
        
        // Set the first slide as active
        if (this.slides.length > 0) {
            this.slides[0].classList.add('active');
        }
    },
    
    start() {
        // Change slide every 8 seconds
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 8000);
    },
    
    nextSlide() {
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        
        // Go to next slide or back to first slide
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        
        // Add active class to new current slide
        this.slides[this.currentSlide].classList.add('active');
    }
};

// User Interaction Tracking
const UserTracker = {
    init() {
        this.pageViewCount = 0;
        this.clickCount = 0;
        this.interactionData = [];
        
        // Track page view
        this.trackPageView();
        
        // Set up click tracking
        document.addEventListener('click', (e) => this.trackClick(e));
        
        console.log('User tracking initialized');
        console.log('Format: timestamp_of_click, type of event (click/view), event object');
    },
    
    determineObjectType(element) {
        if (!element) return 'unknown';
        
        const tagName = element.tagName.toLowerCase();
        const role = element.getAttribute('role');
        const ariaExpanded = element.getAttribute('aria-expanded');
        
        // Check for specific elements
        if (tagName === 'img' || element.classList.contains('image') || 
            element.parentElement?.classList.contains('image')) {
            return 'image';
        }
        
        if (tagName === 'button' || element.classList.contains('button') || 
            role === 'button') {
            return 'button';
        }
        
        if (tagName === 'a' || element.classList.contains('link')) {
            return 'link';
        }
        
        if (tagName === 'input') {
            const type = element.getAttribute('type');
            if (type === 'text' || type === 'email' || type === 'password') {
                return 'text-input';
            }
            if (type === 'checkbox') return 'checkbox';
            if (type === 'radio') return 'radio-button';
            return 'input';
        }
        
        if (tagName === 'select' || role === 'listbox' || 
            ariaExpanded === 'true' || element.classList.contains('dropdown')) {
            return 'dropdown';
        }
        
        if (tagName === 'textarea') {
            return 'text-area';
        }
        
        if (element.id === 'theme-toggle') {
            return 'theme-toggle';
        }
        
        // Check for text content
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
            return 'text';
        }
        
        // Default based on tag name
        return tagName;
    },
    
    trackPageView() {
        this.pageViewCount++;
        const timestamp = new Date().toISOString();
        const path = window.location.pathname;
        const pageData = {
            type: 'view',
            timestamp,
            path,
            title: document.title,
            viewCount: this.pageViewCount
        };
        
        this.interactionData.push(pageData);
        
        // Log in the requested format: timestamp, event type, event object
        console.log(`${timestamp}, view, page`);
    },
    
    trackClick(event) {
        this.clickCount++;
        const timestamp = new Date().toISOString();
        
        // Get element details
        const target = event.target;
        const tagName = target.tagName.toLowerCase();
        const id = target.id || 'no-id';
        const classes = Array.from(target.classList).join(' ') || 'no-class';
        const text = target.innerText?.substring(0, 30) || 'no-text';
        
        // Determine the object type based on element characteristics
        let objectType = this.determineObjectType(target);
        
        // Get CSS selector
        let selector = this.getSelector(target);
        
        // Create event data
        const clickData = {
            type: 'click',
            timestamp,
            element: {
                tagName,
                id,
                classes,
                text: text.trim(),
                objectType
            },
            selector,
            position: {
                x: event.clientX,
                y: event.clientY
            },
            clickCount: this.clickCount
        };
        
        this.interactionData.push(clickData);
        
        // Log in the requested format: timestamp, event type, event object
        console.log(`${timestamp}, click, ${objectType}`);
    },
    
    getSelector(element) {
        if (!element) return '';
        if (element.id) return `#${element.id}`;
        
        let selector = element.tagName.toLowerCase();
        if (element.className) {
            const classes = element.className.split(' ').filter(c => c);
            selector += classes.map(c => `.${c}`).join('');
        }
        
        // Add parent context if needed
        if (element.parentElement && element.parentElement !== document.body) {
            const parentSelector = this.getSelector(element.parentElement);
            if (parentSelector) {
                selector = `${parentSelector} > ${selector}`;
            }
        }
        
        return selector;
    },
    
    exportData() {
        console.log('User Interaction Summary:');
        console.log(`Total Page Views: ${this.pageViewCount}`);
        console.log(`Total Clicks: ${this.clickCount}`);
        console.log('Full Interaction Data:', this.interactionData);
        return this.interactionData;
    }
};

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize the heading animation
    animateHeading();
    
    // Initialize other functionality
    initSmoothScrolling();
    initEventTracking();
    initTextAnalysis();
    
    // Set up the dark mode toggle button with a direct onclick attribute
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        console.log('Found theme toggle button');
        
        // Update the icon based on current theme
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
        
        // Add direct click handler (even though we also have the onclick attribute)
        themeToggle.addEventListener('click', function() {
            console.log('Theme toggle clicked');
            toggleDarkMode();
        });
    }
});

// Simple function to toggle between light and dark themes
function toggleTheme() {
    console.log('Toggling theme');
    
    if (document.body.classList.contains('dark-theme')) {
        // Switch to light theme
        document.body.className = 'light-theme';
        localStorage.setItem('theme', 'light');
        console.log('Switched to light theme');
    } else {
        // Switch to dark theme
        document.body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark');
        console.log('Switched to dark theme');
    }
    
    // Update the icon
    updateThemeIcon();
}

// Update the theme icon based on current theme
function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    
    // Set the icon based on the current theme
    if (document.body.classList.contains('dark-theme')) {
        // In dark mode, show sun icon (to switch to light)
        icon.className = 'fas fa-sun';
    } else {
        // In light mode, show moon icon (to switch to dark)
        icon.className = 'fas fa-moon';
    }
}

// Animate the heading with a slot machine effect
function animateHeading() {
    const headingElement = document.getElementById('animated-heading');
    
    if (!headingElement) {
        console.error('Heading element not found');
        return;
    }
    
    // Get the heading text
    const headingText = headingElement.textContent.trim();
    
    // Clear the heading
    headingElement.innerHTML = '';
    
    // Create spans for each letter
    for (let i = 0; i < headingText.length; i++) {
        const span = document.createElement('span');
        span.textContent = headingText[i];
        span.style.animationDelay = `${i * 0.1}s`;
        span.className = 'animated-letter';
        headingElement.appendChild(span);
    }
}

// Improved smooth scrolling for navigation links
function fixSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only handle hash links on this page
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    e.preventDefault();
                    
                    // Get header height for proper offset
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const scrollPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without causing a scroll jump
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Fix navigation on page load if there's a hash in URL
    if (window.location.hash) {
        setTimeout(() => {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const scrollPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }
}

// Initialize event tracking
function initEventTracking() {
    // Simple event tracking
    document.addEventListener('click', function(e) {
        // Only track clicks on elements with data-track attribute
        if (e.target.dataset.track) {
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, ${e.target.dataset.track}`);
        }
    });
}

// Initialize text analysis functionality
function initTextAnalysis() {
    console.log('Initializing text analysis functionality...');
    const textInput = document.getElementById('text-input');
    const analyzeButton = document.getElementById('analyze-button');
    const resultsContainer = document.getElementById('analysis-results');
    
    if (!textInput || !analyzeButton || !resultsContainer) {
        console.error('Text analysis elements not found:', { 
            textInput: !!textInput, 
            analyzeButton: !!analyzeButton, 
            resultsContainer: !!resultsContainer 
        });
        return;
    }
    
    console.log('Text analysis elements found, adding click listener');
    
    analyzeButton.addEventListener('click', function() {
        console.log('Analyze button clicked');
        const text = textInput.value.trim();
        
        // Show loading indicator (no minimum character limit)
        resultsContainer.innerHTML = '<div class="analysis-loading">Analyzing... <span class="dot-loader"></span></div>';
        
        // Wrap in requestAnimationFrame to ensure the loading indicator gets rendered
        requestAnimationFrame(() => {
            // Use setTimeout to keep the UI responsive while processing
            setTimeout(() => {
                try {
                    if (text.length === 0) {
                        resultsContainer.innerHTML = 'Please enter some text for analysis.';
                        return;
                    }
                    
                    console.log('Starting text analysis...');
                    
                    // Basic statistics calculation
                    const words = text.split(/\s+/).filter(Boolean);
                    const wordCount = words.length;
                    const charCount = text.length;
                    
                    // Process text in smaller chunks for better performance
                    const sentences = text.split(/[.!?]+/).filter(Boolean);
                    const sentenceCount = sentences.length;
                    const paragraphs = text.split(/\n+/).filter(Boolean);
                    const paragraphCount = paragraphs.length;
                    
                    // Calculate reading time (average reading speed is 200-250 words per minute)
                    const readingTimeMinutes = Math.ceil(wordCount / 200);
                    
                    // Calculate average word length
                    let avgWordLength = 0;
                    if (wordCount > 0) {
                        let totalCharacters = 0;
                        for (let i = 0; i < words.length; i++) {
                            totalCharacters += words[i].length;
                        }
                        avgWordLength = (totalCharacters / wordCount).toFixed(1);
                    }
                    
                    console.log('Analysis complete, updating UI');
                    
                    // --- Additional Counts ---
                    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
                    const spaceCount = (text.match(/ /g) || []).length;
                    const newlineCount = (text.match(/\n/g) || []).length;
                    const specialSymbolCount = (text.match(/[^\w\s]/g) || []).length;

                    // --- Pronouns, Prepositions, Indefinite Articles ---
                    const pronouns = [
    'i','me','my','mine','myself','we','us','our','ours','ourselves',
    'you','your','yours','yourself','yourselves','he','him','his','himself',
    'she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves',
    'who','whom','whose','which','that'
];
                    const prepositions = [
    'about','above','across','after','against','along','among','around','at','before','behind',
    'below','beneath','beside','between','beyond','but','by','concerning','despite','down','during',
    'except','for','from','in','inside','into','like','near','of','off','on','onto','out','outside',
    'over','past','regarding','since','through','throughout','to','toward','under','underneath','until',
    'up','upon','with','within','without'
];
                    const indefiniteArticles = ['a','an','some','any','another'];
                    
                    // Robust tokenization: extract only words (allowing apostrophes for contractions)
const tokens = (text.toLowerCase().match(/[a-zA-Z']+/g) || []);

                    // Count each group, defensively
function countGroup(tokens, group) {
    const counts = {};
    group.forEach(item => counts[item] = 0);
    // Defensive: Only count exact matches
    tokens.forEach(t => { if (counts.hasOwnProperty(t)) counts[t]++; });
    return counts;
}
                    const pronounCounts = countGroup(tokens, pronouns);
                    const prepositionCounts = countGroup(tokens, prepositions);
                    const articleCounts = countGroup(tokens, indefiniteArticles);

                    // Display results
                    resultsContainer.innerHTML = `
                        <div class="analysis-results-container">
                            <div class="analysis-item"><span class="analysis-value">${letterCount}</span><span class="analysis-label">Letters</span></div>
                            <div class="analysis-item"><span class="analysis-value">${wordCount}</span><span class="analysis-label">Words</span></div>
                            <div class="analysis-item"><span class="analysis-value">${spaceCount}</span><span class="analysis-label">Spaces</span></div>
                            <div class="analysis-item"><span class="analysis-value">${newlineCount}</span><span class="analysis-label">Newlines</span></div>
                            <div class="analysis-item"><span class="analysis-value">${specialSymbolCount}</span><span class="analysis-label">Special Symbols</span></div>
                            <div class="analysis-item"><span class="analysis-value">${charCount}</span><span class="analysis-label">Characters</span></div>
                            <div class="analysis-item"><span class="analysis-value">${sentenceCount}</span><span class="analysis-label">Sentences</span></div>
                            <div class="analysis-item"><span class="analysis-value">${paragraphCount}</span><span class="analysis-label">Paragraphs</span></div>
                            <div class="analysis-item"><span class="analysis-value">${readingTimeMinutes}</span><span class="analysis-label">Min Read</span></div>
                            <div class="analysis-item"><span class="analysis-value">${avgWordLength}</span><span class="analysis-label">Avg Word Length</span></div>
                        </div>
                        <div class="result-section">
                            <h3>Pronouns Count</h3>
                            <div class="group-count-list">
                                ${Object.entries(pronounCounts).filter(([k,v])=>v>0).map(([k,v]) => `<span class='group-count'><b>${k}</b>: ${v}</span>`).join(', ') || '<span class="none-found">None found</span>'}
                            </div>
                        </div>
                        <div class="result-section">
                            <h3>Prepositions Count</h3>
                            <div class="group-count-list">
                                ${Object.entries(prepositionCounts).filter(([k,v])=>v>0).map(([k,v]) => `<span class='group-count'><b>${k}</b>: ${v}</span>`).join(', ') || '<span class="none-found">None found</span>'}
                            </div>
                        </div>
                        <div class="result-section">
                            <h3>Indefinite Articles Count</h3>
                            <div class="group-count-list">
                                ${Object.entries(articleCounts).filter(([k,v])=>v>0).map(([k,v]) => `<span class='group-count'><b>${k}</b>: ${v}</span>`).join(', ') || '<span class="none-found">None found</span>'}
                            </div>
                        </div>
                    `;
                } catch (error) {
                    // Handle any errors during text analysis
                    console.error('Text analysis error:', error);
                    resultsContainer.innerHTML = 'An error occurred during analysis. Please try again.';
                }
            }, 10); // Small timeout to let the UI update first
        });
    });
    
    console.log('Text analysis initialization complete');
}
