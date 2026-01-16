class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    transition: all 0.3s ease;
                }
                
                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 2rem;
                    transition: all 0.3s ease;
                }
                
                .navbar.scrolled {
                    background-color: rgba(15, 23, 42, 0.95);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    padding: 1rem 2rem;
                }
                
                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: blue;
                    text-decoration: none;
                }
                
                .logo span {
                    color: #d97706;
                }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                }
                
                .nav-link {
                    color: blue;
                    text-decoration: none;
                    font-weight: 500;
                    position: relative;
                    padding: 0.5rem 0;
                    transition: color 0.3s ease;
                }
                
                .nav-link:hover {
                    color: #d97706;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #d97706;
                    transition: width 0.3s ease;
                }
                
                .nav-link:hover::after {
                    width: 100%;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                }
                
                @media (max-width: 768px) {
                    .nav-links {
                        position: fixed;
                        top: 80px;
                        left: 0;
                        right: 0;
                        background-color: rgba(15, 23, 42, 0.98);
                        flex-direction: column;
                        align-items: center;
                        padding: 2rem 0;
                        gap: 1.5rem;
                        clip-path: circle(0px at 90% -10%);
                        transition: clip-path 0.5s ease-in-out;
                    }
                    
                    .nav-links.open {
                        clip-path: circle(1000px at 90% -10%);
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                    }
                }
            </style>
            
            <nav class="navbar">
                <a href="index.html" class="logo">Savory <span>Scrolls</span></a>
                
                <button class="mobile-menu-btn">
                    <i data-feather="menu"></i>
                </button>
                
                <div class="nav-links">
                    <a href="index.html" class="nav-link">Home</a>
                    <a href="menu.html" class="nav-link">Menu</a>
                    <a href="about.html" class="nav-link">About</a>
                    <a href="gallery.html" class="nav-link">Gallery</a>
                    <a href="reservation.html" class="nav-link">Reservations</a>
                    <a href="contact.html" class="nav-link">Contact</a>
                </div>
            </nav>
        `;

        // Initialize mobile menu
        const mobileMenuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const navLinks = this.shadowRoot.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('open')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        });

        // Scroll effect
        window.addEventListener('scroll', () => {
            const navbar = this.shadowRoot.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Close mobile menu when clicking a link
        const links = this.shadowRoot.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.setAttribute('data-feather', 'menu');
                    feather.replace();
                }
            });
        });

        // Initialize feather icons
        feather.replace();
    }
}

customElements.define('custom-navbar', CustomNavbar);