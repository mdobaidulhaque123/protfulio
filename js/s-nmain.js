document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');
    const serviceContents = document.querySelectorAll('.service-content');
    
    // Create service navigation if it doesn't exist
    if (!document.querySelector('.service-nav')) {
        createServiceNavigation();
    }
    
    // Highlight active nav item
    if (serviceId) {
        highlightActiveService(serviceId);
    } else {
        // If no specific service requested, show first one by default
        if (serviceContents.length > 0) {
            serviceContents[0].style.display = 'block';
            updatePageTitle(serviceContents[0].querySelector('h2').textContent);
            history.replaceState(null, null, window.location.pathname + '?service=' + serviceContents[0].id);
            highlightActiveService(serviceContents[0].id);
        }
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Create service navigation function
    function createServiceNavigation() {
        const servicesContainer = document.querySelector('.container.py-5');
        const services = document.querySelectorAll('.service-content');
        
        if (services.length > 0) {
            const navHtml = `
                <div class="service-nav wow fadeIn" data-wow-delay="0.1s">
                    <h3><i class="fas fa-list-ul me-2"></i>Our Services</h3>
                    <ul>
                        ${Array.from(services).map(service => `
                            <li>
                                <a href="?service=${service.id}" data-service="${service.id}">
                                    <i class="fas fa-chevron-right me-2"></i>
                                    ${service.querySelector('h2').textContent}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
            
            servicesContainer.insertAdjacentHTML('afterbegin', navHtml);
            
            // Add click handlers for nav items
            document.querySelectorAll('.service-nav a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const serviceId = this.getAttribute('data-service');
                    showService(serviceId);
                    history.pushState(null, null, window.location.pathname + '?service=' + serviceId);
                });
            });
        }
    }
    
    // Show specific service function
    function showService(serviceId) {
        serviceContents.forEach(content => {
            content.style.display = 'none';
        });
        
        const targetService = document.getElementById(serviceId);
        if (targetService) {
            targetService.style.display = 'block';
            updatePageTitle(targetService.querySelector('h2').textContent);
            highlightActiveService(serviceId);
            
            // Smooth scroll to the service
            window.scrollTo({
                top: targetService.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
    
    // Highlight active service in nav
    function highlightActiveService(serviceId) {
        document.querySelectorAll('.service-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-service') === serviceId) {
                link.classList.add('active');
            }
        });
    }
    
    // Update page title and breadcrumb
    function updatePageTitle(title) {
        const headerTitle = document.querySelector('.bg-breadcrumb h4');
        const breadcrumbActive = document.querySelector('.breadcrumb-item.active');
        
        if (headerTitle) {
            headerTitle.textContent = title;
        }
        if (breadcrumbActive) {
            breadcrumbActive.textContent = title;
        }
        
        // Update browser tab title
        document.title = title + ' | Cental';
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const params = new URLSearchParams(window.location.search);
        const service = params.get('service');
        if (service) {
            showService(service);
        } else if (serviceContents.length > 0) {
            showService(serviceContents[0].id);
        }
    });
    
    // Add animation to service content when displayed
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, {
        threshold: 0.1
    });
    
    serviceContents.forEach(content => {
        observer.observe(content);
    });
    
    // Initialize Wow.js animations
    new WOW().init();
});