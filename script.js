// Données des produits
const products = [
    {
        id: 1,
        name: "Produit Premium 1",
        description: "Qualité supérieure, excellent rapport qualité-prix",
        price: 49.99,
        emoji: "🎁",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        id: 2,
        name: "Produit Deluxe 2",
        description: "Edition limitée, très populaire",
        price: 79.99,
        emoji: "💎",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        id: 3,
        name: "Produit Standard 3",
        description: "Classique, fiable et durable",
        price: 29.99,
        emoji: "🏆",
        rating: "⭐⭐⭐⭐"
    },
    {
        id: 4,
        name: "Produit Exclusive 4",
        description: "Unique et exclusif, collection limitée",
        price: 99.99,
        emoji: "👑",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        id: 5,
        name: "Produit Eco 5",
        description: "Écologique et respectueux de l'environnement",
        price: 39.99,
        emoji: "🌱",
        rating: "⭐⭐⭐⭐"
    },
    {
        id: 6,
        name: "Produit Ultra 6",
        description: "Technologie dernière génération",
        price: 129.99,
        emoji: "🚀",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        id: 7,
        name: "Produit Vintage 7",
        description: "Style rétro, tendance actuelle",
        price: 44.99,
        emoji: "🎨",
        rating: "⭐⭐⭐⭐"
    },
    {
        id: 8,
        name: "Produit Smart 8",
        description: "Intelligent et pratique pour tous",
        price: 59.99,
        emoji: "🔧",
        rating: "⭐⭐⭐⭐⭐"
    }
];

// Panier
let cart = [];

// Initialiser la page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    loadCart();
});

// Afficher les produits
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-rating">${product.rating}</div>
                <div class="product-price">${product.price.toFixed(2)}€</div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Ajouter au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showNotification(`${product.name} ajouté au panier! ✓`);
}

// Supprimer du panier
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Diminuer la quantité
function decreaseQuantity(productId) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            removeFromCart(productId);
        }
        saveCart();
        updateCartUI();
    }
}

// Augmenter la quantité
function increaseQuantity(productId) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity++;
        saveCart();
        updateCartUI();
    }
}

// Mettre à jour l'affichage du panier
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Votre panier est vide</p>';
        cartTotal.textContent = '0€';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${(item.price * item.quantity).toFixed(2)}€</div>
                <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span style="margin: 0 10px;">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Supprimer</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2) + '€';
}

// Toggler le panier
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Sauvegarder le panier dans localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Charger le panier depuis localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Passer la commande
function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderSummary = cart.map(item => `${item.name} x${item.quantity}`).join('\n');

    const message = `
Commande Confirmée! ✓

Produits:
${orderSummary}

Total: ${total.toFixed(2)}€

Merci pour votre achat!
Votre commande sera traitée très bientôt.
    `;

    alert(message);
    
    // Vider le panier
    cart = [];
    saveCart();
    updateCartUI();
    toggleCart();
}

// Envoyer un message de contact
function sendMessage(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const message = form.elements[2].value;

    alert(`Merci ${name}!\n\nVotre message a été envoyé avec succès.\nNous vous répondrons à ${email} dans les 24 heures.`);
    
    form.reset();
}

// Scroller vers la section produits
function scrollToProduits() {
    document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
