// Datos de ejemplo para el carrito
const sampleCartData = [
    {
        id: 1,
        name: 'JEANS HOLGADOS',
        size: 'M',
        quantity: 1,
        price: 300000,
        image: 'catalogo/jeans holgados/portada baggy.png',
        total: 300000,
    }
];

// Datos de ejemplo para el historial de pedidos
const sampleOrderHistory = [
    {
        orderId: 'AVD-001',
        date: '2024-12-15',
        status: 'Completado',
        items: [
            { name: 'JEANS HOLGADOS', size: 'P', quantity: 1, price: 300000 },
            { name: 'JEANS RECTOS', size: 'M', quantity: 1, price: 300000 }
        ],
        totalSpent: 600000,
        deliveryAddress: 'Av. España 123, Asunción'
    },
    {
        orderId: 'AVD-002',
        date: '2024-12-10',
        status: 'En proceso',
        items: [
            { name: 'JEANS HOLGADOS', size: 'G', quantity: 1, price: 300000 }
        ],
        totalSpent: 300000,
        deliveryAddress: 'Calle Palma 456, Asunción'
    }
];

// Datos de ejemplo para productos favoritos
const sampleFavorites = [
    {
        id: 1,
        name: 'JEANS HOLGADOS',
        price: 300000,
        image: 'catalogo/jeans holgados/portada baggy.png',
        isFavorite: true
    },
    {
        id: 2,
        name: 'JEANS RECTOS',
        price: 300000,
        image: 'catalogo/jeans rectos/portada straight.png',
        isFavorite: true
    }
];

// Datos de ejemplo para notificaciones
const sampleNotifications = [
    {
        id: 1,
        title: '¡Nuevo producto disponible!',
        message: 'El nuevo JEANS HOLGADOS ya está disponible en todos los talles.',
        date: '2024-12-15',
        isRead: false,
        type: 'product'
    },
    {
        id: 2,
        title: 'Pedido confirmado',
        message: 'Tu pedido AVD-001 ha sido confirmado y está siendo procesado.',
        date: '2024-12-14',
        isRead: true,
        type: 'order'
    }
];

// Datos de ejemplo para configuración del usuario
const sampleUserSettings = {
    notifications: {
        email: true,
        push: true,
        sms: false
    },
    privacy: {
        profileVisible: true,
        orderHistoryVisible: false,
        shareData: false
    },
    preferences: {
        language: 'es',
        currency: 'PYG',
        theme: 'light'
    }
};

// Exportar los datos de ejemplo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sampleCartData,
        sampleOrderHistory,
        sampleFavorites,
        sampleNotifications,
        sampleUserSettings
    };
}
