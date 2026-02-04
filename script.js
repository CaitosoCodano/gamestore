// Contador para ofertas
function updateTimer() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    
    let days = parseInt(daysElement.textContent);
    let hours = parseInt(hoursElement.textContent);
    let minutes = parseInt(minutesElement.textContent);
    
    minutes--;
    
    if (minutes < 0) {
        minutes = 59;
        hours--;
        
        if (hours < 0) {
            hours = 23;
            days--;
            
            if (days < 0) {
                days = 0;
                hours = 0;
                minutes = 0;
            }
        }
    }
    
    // Atualiza os elementos com dois dígitos
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
}

// Inicia o contador
setInterval(updateTimer, 60000);

// Sistema de carrinho de compras
let cartCount = 0;

// Adiciona funcionalidade aos botões de carrinho
document.querySelectorAll('.btn-cart').forEach(button => {
    button.addEventListener('click', function() {
        const gameTitle = this.closest('.game-card').querySelector('h3').textContent;
        const cartCountElement = document.querySelector('.cart-count');
        
        // Atualiza contador do carrinho
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Feedback visual
        const originalHTML = this.innerHTML;
        const originalBg = this.style.background;
        
        this.innerHTML = 'Adicionado <i class="fas fa-check"></i>';
        this.style.background = '#4CAF50';
        this.style.cursor = 'default';
        
        // Reverte após 2 segundos
        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = originalBg;
            this.style.cursor = 'pointer';
        }, 2000);
        
        // Mensagem de confirmação
        showNotification(`${gameTitle} foi adicionado ao carrinho!`);
    });
});

// Suaviza rolagem para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if(this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Função para mostrar notificações
function showNotification(message) {
    // Remove notificação existente
    const existingNotification = document.querySelector('.notification');
    if(existingNotification) {
        existingNotification.remove();
    }
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos para a notificação
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(to right, #6a11cb, #2575fc);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Estilos para o conteúdo da notificação
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // Adiciona ao body
    document.body.appendChild(notification);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if(notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Adiciona estilos CSS para animações da notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicialização do site
document.addEventListener('DOMContentLoaded', function() {
    console.log('GameStore carregado com sucesso!');
    
    // Adiciona classe de carregamento ao body
    document.body.classList.add('loaded');
});