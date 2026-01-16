// Main script for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.dish-card, section > div');
        elements.forEach((el, index) => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                el.classList.add('animate-fade-in');
                el.style.animationDelay = `${index * 0.1}s`;
            }
        });
    };

    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});