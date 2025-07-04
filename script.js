// Menu mobile toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature, .highlight-item, .info-card, .contato-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Lazy loading para imagens
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    imageObserver.observe(img);
});

// Contador de horários de funcionamento
function updateBusinessHours() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Domingo, 1 = Segunda, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    const businessHours = {
        1: { open: 9 * 60, close: 18.5 * 60 }, // Segunda
        2: { open: 9 * 60, close: 18.5 * 60 }, // Terça
        3: { open: 9 * 60, close: 18.5 * 60 }, // Quarta
        4: { open: 9 * 60, close: 18.5 * 60 }, // Quinta
        5: { open: 9 * 60, close: 18.5 * 60 }, // Sexta
        6: { open: 9 * 60, close: 18 * 60 },   // Sábado
        0: null // Domingo - fechado
    };
    
    const todayHours = businessHours[currentDay];
    const statusElement = document.querySelector('.business-status');
    
    if (!statusElement) {
        // Criar elemento de status se não existir
        const heroSection = document.querySelector('.hero-buttons');
        if (heroSection) {
            const statusDiv = document.createElement('div');
            statusDiv.className = 'business-status';
            statusDiv.style.cssText = `
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-weight: 600;
                font-size: 0.9rem;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            `;
            heroSection.appendChild(statusDiv);
        }
    }
    
    if (statusElement) {
        if (!todayHours) {
            statusElement.innerHTML = '<i class="fas fa-times-circle"></i> Fechado hoje';
            statusElement.style.background = '#fee2e2';
            statusElement.style.color = '#dc2626';
        } else if (currentTime >= todayHours.open && currentTime <= todayHours.close) {
            const closeTime = new Date();
            closeTime.setHours(Math.floor(todayHours.close / 60), todayHours.close % 60, 0);
            const timeLeft = closeTime - now;
            const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            statusElement.innerHTML = `<i class="fas fa-check-circle"></i> Aberto • Fecha em ${hoursLeft}h ${minutesLeft}m`;
            statusElement.style.background = '#dcfce7';
            statusElement.style.color = '#16a34a';
        } else {
            statusElement.innerHTML = '<i class="fas fa-clock"></i> Fechado agora';
            statusElement.style.background = '#fef3c7';
            statusElement.style.color = '#d97706';
        }
    }
}

// Atualizar status a cada minuto
updateBusinessHours();
setInterval(updateBusinessHours, 60000);

// Corrigir endereço do Google Maps para o endereço correto do Luma Café
document.addEventListener('DOMContentLoaded', () => {
    const mapIframe = document.querySelector('.contato-map iframe');
    if (mapIframe) {
        // Endereço correto: Av. João Gualberto, 1795 - Juvevê, Curitiba - PR
        mapIframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.5!2d-49.2582046!3d-25.412391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce4240e2d78f1:0xa45a563b65f523c4!2sAv.%20Jo%C3%A3o%20Gualberto%2C%201795%20-%20Juvev%C3%AA%2C%20Curitiba%20-%20PR%2C%2080030-001%2C%20Brazil!5e0!3m2!1spt-BR!2sbr!4v1234567890';
        mapIframe.height = '500';
    }
});

// Efeito de parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-img');
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Tooltip para horários
document.querySelectorAll('.horario-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const dia = item.querySelector('.dia').textContent;
        const horario = item.querySelector('.horario').textContent;
        
        // Criar tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = `${dia}: ${horario}`;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--primary-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        // Posicionar tooltip
        const rect = item.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        // Mostrar tooltip
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 100);
        
        item.tooltip = tooltip;
    });
    
    item.addEventListener('mouseleave', () => {
        if (item.tooltip) {
            item.tooltip.remove();
            item.tooltip = null;
        }
    });
});

// Efeito de digitação no título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação ao título principal
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Formulário de contato (se implementado no futuro)
function handleContactForm(event) {
    event.preventDefault();
    
    // Aqui você pode adicionar lógica para enviar o formulário
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Exemplo de validação
    if (!data.name || !data.email || !data.message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Simular envio
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    event.target.reset();
}

// Adicionar listener para formulário de contato (se existir)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
}

// Scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(button);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top ao clicar
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
}

// Inicializar scroll to top button
createScrollToTopButton();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos eventos de scroll
const debouncedScrollHandler = debounce(() => {
    // Re-executar lógica de scroll aqui se necessário
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Mobile App optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Prevent double-tap zoom on buttons
    const buttons = document.querySelectorAll('.btn, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            button.click();
        });
    });

    // Add touch feedback
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', () => {
            button.style.transform = '';
        });
    });

    // Prevent pull-to-refresh on mobile
    let startY = 0;
    let currentY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
        currentY = e.touches[0].clientY;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop === 0 && currentY > startY) {
            e.preventDefault();
        }
    }, { passive: false });

    // Add haptic feedback for iOS
    if ('vibrate' in navigator) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                navigator.vibrate(10);
            });
        });
    }

    // WhatsApp button optimizations
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        // Add haptic feedback for WhatsApp button
        if ('vibrate' in navigator) {
            whatsappBtn.addEventListener('click', () => {
                navigator.vibrate(20);
            });
        }

        // Add touch feedback for WhatsApp button
        whatsappBtn.addEventListener('touchstart', () => {
            whatsappBtn.style.transform = 'scale(0.9)';
        });
        
        whatsappBtn.addEventListener('touchend', () => {
            whatsappBtn.style.transform = '';
        });

        // Hide WhatsApp button when menu is open
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    whatsappBtn.style.opacity = '0';
                    whatsappBtn.style.pointerEvents = 'none';
                } else {
                    whatsappBtn.style.opacity = '1';
                    whatsappBtn.style.pointerEvents = 'auto';
                }
            });
        }
    }
}); 