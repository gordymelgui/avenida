# 🚀 CONFIGURACIÓN COMPLETA DE FIREBASE PARA AVENIDA

## 📋 **RESUMEN DE LO IMPLEMENTADO:**

✅ **Sistema de usuarios completo** (registro, login, logout)
✅ **Base de datos de pedidos** en Firestore
✅ **Sistema de DOBLE EMAIL automático** con Firebase Functions
✅ **Checkout completo** integrado con Firebase
✅ **Manejo de estado** de autenticación en tiempo real

## 🔥 **PASOS PARA CONFIGURAR FIREBASE FUNCTIONS:**

### **Paso 1: Instalar Firebase CLI**
```bash
npm install -g firebase-tools
```

### **Paso 2: Iniciar sesión en Firebase**
```bash
firebase login
```

### **Paso 3: Inicializar proyecto en tu carpeta**
```bash
firebase init functions
```

### **Paso 4: Configurar Firebase Functions**
En la carpeta `functions/`, instalar dependencias:
```bash
cd functions
npm install nodemailer
```

### **Paso 5: Crear función de DOBLE EMAIL**
Crear archivo `functions/index.js`:

```javascript
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configurar transportador de email (Gmail)
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'aaavenidaaa@gmail.com',
        pass: 'TU_APP_PASSWORD_DE_GMAIL' // No tu contraseña normal
    }
});

// Función para enviar DOBLE EMAIL de confirmación
exports.sendOrderConfirmationEmails = functions.https.onCall(async (data, context) => {
    try {
        const { orderId, customerEmail, customerName, orderDetails } = data;
        
        // ======================= EMAIL 1: PARA EL CLIENTE =======================
        const customerEmailOptions = {
            from: 'aaavenidaaa@gmail.com',
            to: customerEmail, // Email del cliente
            subject: `¡Pedido Confirmado! - AVENIDA #${orderId}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
                    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #8357C5; margin: 0; font-size: 28px;">🎉 ¡Pedido Confirmado!</h1>
                            <p style="color: #666; margin: 10px 0 0 0;">Tu pedido ha sido recibido exitosamente</p>
                        </div>
                        
                        <!-- Código del Pedido -->
                        <div style="background: linear-gradient(135deg, #8357C5, #6e48a9); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                            <h2 style="margin: 0; font-size: 24px;">Código de Pedido</h2>
                            <p style="margin: 10px 0 0 0; font-size: 32px; font-weight: bold; letter-spacing: 2px;">${orderId}</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Guarda este código para seguimiento</p>
                        </div>
                        
                        <!-- Resumen del Pedido -->
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                            <h3 style="color: #333; margin: 0 0 15px 0;">📋 Resumen de tu Pedido</h3>
                            ${orderDetails.items.map(item => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                                    <div>
                                        <p style="margin: 0; font-weight: bold; color: #333;">${item.name}</p>
                                        <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Talle: ${item.size} | Cantidad: ${item.quantity}</p>
                                    </div>
                                    <div style="text-align: right;">
                                        <p style="margin: 0; font-weight: bold; color: #8357C5;">₲${item.price.toLocaleString('es-PY')}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Total -->
                        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <span style="color: #333;">Subtotal:</span>
                                <span style="font-weight: bold; color: #2d5a2d;">₲${orderDetails.subtotal.toLocaleString('es-PY')}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <span style="color: #333;">Delivery (Bolt):</span>
                                <span style="font-weight: bold; color: #2d5a2d;">Consultar por el precio</span>
                            </div>
                            <div style="border-top: 2px solid #2d5a2d; padding-top: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="color: #333; font-weight: bold;">Total:</span>
                                    <span style="font-weight: bold; color: #2d5a2d; font-size: 18px;">₲${orderDetails.subtotal.toLocaleString('es-PY')} + delivery</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Próximos Pasos -->
                        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                            <h3 style="color: #856404; margin: 0 0 15px 0;">📝 Próximos Pasos</h3>
                            <div style="margin-bottom: 10px;">
                                <p style="margin: 0; color: #856404;"><strong>1.</strong> Envía el comprobante de pago por WhatsApp</p>
                            </div>
                            <div style="margin-bottom: 10px;">
                                <p style="margin: 0; color: #856404;"><strong>2.</strong> Tu pedido será procesado en 7-15 días hábiles</p>
                            </div>
                            <div>
                                <p style="margin: 0; color: #856404;"><strong>3.</strong> Recibirás notificaciones del estado de tu pedido</p>
                            </div>
                        </div>
                        
                        <!-- Botón WhatsApp -->
                        <div style="text-align: center; margin-bottom: 25px;">
                            <a href="https://wa.me/595982713971" style="background: #25d366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                                📱 Enviar Comprobante por WhatsApp
                            </a>
                        </div>
                        
                        <!-- Footer -->
                        <div style="text-align: center; color: #666; font-size: 14px;">
                            <p style="margin: 0;">Este email fue enviado automáticamente por AVENIDA</p>
                            <p style="margin: 5px 0 0 0;">¿Tienes preguntas? Contacta: aaavenidaaa@gmail.com</p>
                        </div>
                    </div>
                </div>
            `
        };
        
        // ======================= EMAIL 2: PARA LA EMPRESA =======================
        const companyEmailOptions = {
            from: 'aaavenidaaa@gmail.com',
            to: 'aaavenidaaa@gmail.com', // Tu Gmail de empresa
            subject: `🚨 NUEVO PEDIDO - AVENIDA #${orderId}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
                    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <!-- Header de Alerta -->
                        <div style="background: #dc3545; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                            <h1 style="margin: 0; font-size: 28px;">🚨 NUEVO PEDIDO RECIBIDO</h1>
                            <p style="margin: 10px 0 0 0; font-size: 18px;">¡Hay un nuevo pedido esperando tu atención!</p>
                        </div>
                        
                        <!-- Código del Pedido -->
                        <div style="background: linear-gradient(135deg, #8357C5, #6e48a9); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                            <h2 style="margin: 0; font-size: 24px;">Código de Pedido</h2>
                            <p style="margin: 10px 0 0 0; font-size: 32px; font-weight: bold; letter-spacing: 2px;">${orderId}</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Usa este código para seguimiento interno</p>
                        </div>
                        
                        <!-- Información del Cliente -->
                        <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                            <h3 style="color: #1565c0; margin: 0 0 15px 0;">👤 Información del Cliente</h3>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="margin: 0; color: #1565c0;"><strong>Nombre:</strong></p>
                                    <p style="margin: 5px 0 0 0; color: #333; font-size: 16px;">${customerName}</p>
                                </div>
                                <div>
                                    <p style="margin: 0; color: #1565c0;"><strong>Email:</strong></p>
                                    <p style="margin: 5px 0 0 0; color: #333; font-size: 16px;">${customerEmail}</p>
                                </div>
                                <div>
                                    <p style="margin: 0; color: #1565c0;"><strong>Teléfono:</strong></p>
                                    <p style="margin: 5px 0 0 0; color: #333; font-size: 16px;">${orderDetails.customer.phone}</p>
                                </div>
                                <div>
                                    <p style="margin: 0; color: #1565c0;"><strong>Dirección:</strong></p>
                                    <p style="margin: 5px 0 0 0; color: #333; font-size: 16px;">${orderDetails.customer.address}, ${orderDetails.customer.city}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Productos del Pedido -->
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                            <h3 style="color: #333; margin: 0 0 15px 0;">🛍️ Productos del Pedido</h3>
                            ${orderDetails.items.map(item => `
                                <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #8357C5;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <p style="margin: 0; font-weight: bold; color: #333; font-size: 16px;">${item.name}</p>
                                            <p style="margin: 5px 0 0 0; color: #666;">Talle: ${item.size} | Cantidad: ${item.quantity}</p>
                                        </div>
                                        <div style="text-align: right;">
                                            <p style="margin: 0; font-weight: bold; color: #8357C5; font-size: 18px;">₲${item.price.toLocaleString('es-PY')}</p>
                                            <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Subtotal: ₲${(item.price * item.quantity).toLocaleString('es-PY')}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Resumen Financiero -->
                        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                            <h3 style="color: #2d5a2d; margin: 0 0 15px 0;">💰 Resumen Financiero</h3>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <span style="color: #2d5a2d;">Subtotal:</span>
                                <span style="font-weight: bold; color: #2d5a2d;">₲${orderDetails.subtotal.toLocaleString('es-PY')}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <span style="color: #2d5a2d;">Delivery (Bolt):</span>
                                <span style="font-weight: bold; color: #2d5a2d;">Consultar por el precio</span>
                            </div>
                            <div style="border-top: 2px solid #2d5a2d; padding-top: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="color: #2d5a2d; font-weight: bold; font-size: 18px;">Total:</span>
                                    <span style="font-weight: bold; color: #2d5a2d; font-size: 20px;">₲${orderDetails.subtotal.toLocaleString('es-PY')} + delivery</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Acciones Requeridas -->
                        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                            <h3 style="color: #856404; margin: 0 0 15px 0;">⚡ Acciones Requeridas</h3>
                            <div style="margin-bottom: 10px;">
                                <p style="margin: 0; color: #856404;"><strong>1.</strong> Esperar comprobante de pago por WhatsApp</p>
                            </div>
                            <div style="margin-bottom: 10px;">
                                <p style="margin: 0; color: #856404;"><strong>2.</strong> Verificar stock disponible de productos</p>
                            </div>
                            <div style="margin-bottom: 10px;">
                                <p style="margin: 0; color: #856404;"><strong>3.</strong> Preparar pedido para envío</p>
                            </div>
                            <div>
                                <p style="margin: 0; color: #856404;"><strong>4.</strong> Actualizar estado del pedido en sistema</p>
                            </div>
                        </div>
                        
                        <!-- Información Adicional -->
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                            <h3 style="color: #333; margin: 0 0 15px 0;">📊 Información Adicional</h3>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="margin: 0; color: #666;"><strong>Fecha del Pedido:</strong></p>
                                    <p style="margin: 5px 0 0 0; color: #333;">${new Date().toLocaleDateString('es-PY')}</p>
                                </div>
                                <div>
                                    <p style="margin: 0; color: #666;"><strong>Hora del Pedido:</strong></p>
                                    <p style="margin: 5px 0 0 0; color: #333;">${new Date().toLocaleTimeString('es-PY')}</p>
                                </div>
                                <div>
                                    <p style="margin: 0; color: #666;"><strong>Estado:</strong></p>
                                    <p style="margin: 5px 0 0 0; color: #dc3545; font-weight: bold;">PENDIENTE DE PAGO</p>
                                </div>
                                <div>
                                    <p style="margin: 0; color: #666;"><strong>Prioridad:</strong></p>
                                    <p style="margin: 5px 0 0 0; color: #333;">ALTA</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div style="text-align: center; color: #666; font-size: 14px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
                            <p style="margin: 0;">Este email fue enviado automáticamente por el sistema de AVENIDA</p>
                            <p style="margin: 5px 0 0 0;">Código de Pedido: <strong>${orderId}</strong></p>
                        </div>
                    </div>
                </div>
            `
        };
        
        // ======================= ENVIAR AMBOS EMAILES =======================
        console.log('📧 Enviando emails de confirmación...');
        
        // Enviar email al cliente
        const customerResult = await transporter.sendMail(customerEmailOptions);
        console.log('✅ Email al cliente enviado:', customerResult.messageId);
        
        // Enviar email a la empresa
        const companyResult = await transporter.sendMail(companyEmailOptions);
        console.log('✅ Email a la empresa enviado:', companyResult.messageId);
        
        return { 
            success: true, 
            customerEmailId: customerResult.messageId,
            companyEmailId: companyResult.messageId,
            message: 'Ambos emails enviados exitosamente'
        };
        
    } catch (error) {
        console.error('❌ Error al enviar emails:', error);
        throw new functions.https.HttpsError('internal', 'Error al enviar emails');
    }
});
```

### **Paso 6: Desplegar funciones**
```bash
firebase deploy --only functions
```

## 📧 **CONFIGURAR GMAIL PARA ENVÍO AUTOMÁTICO:**

### **1. Activar verificación en 2 pasos**
- Ve a tu cuenta de Google
- Seguridad → Verificación en 2 pasos → Activar

### **2. Generar contraseña de aplicación**
- Seguridad → Contraseñas de aplicación
- Selecciona "Correo" y "Windows"
- Copia la contraseña generada (16 caracteres)

### **3. Usar en Firebase Functions**
- Reemplaza `TU_APP_PASSWORD_DE_GMAIL` con la contraseña generada

## 🎯 **VENTAJAS DEL SISTEMA DE DOBLE EMAIL:**

### **✅ EMAIL AL CLIENTE:**
- **Confirmación profesional** del pedido
- **Código único** para seguimiento
- **Resumen completo** de productos
- **Próximos pasos** claros
- **Botón directo** a WhatsApp

### **✅ EMAIL A LA EMPRESA:**
- **Notificación inmediata** de nuevo pedido
- **Mismo código** para seguimiento
- **Datos completos** del cliente
- **Detalles de productos** pedidos
- **Información de contacto** para seguimiento
- **Estado del pedido** y prioridad

## 🚀 **CÓMO FUNCIONA AHORA:**

1. **Cliente completa pedido** → Se guarda en Firebase
2. **Automáticamente se envían 2 emails:**
   - 📧 **Email al cliente** con confirmación y código
   - 🚨 **Email a la empresa** con notificación y detalles
3. **Ambos emails tienen el mismo código** de pedido
4. **Pedido se almacena** en base de datos
5. **Tú tienes toda la información** para procesar el pedido

## 📊 **RESULTADO FINAL:**

- **Cliente recibe:** Confirmación profesional con código
- **Empresa recibe:** Notificación completa con mismo código
- **Seguimiento:** Ambos pueden usar el código para consultas
- **Profesionalismo:** Sistema automático y bien diseñado

**¿Te gusta esta implementación de doble email?** Ahora tanto el cliente como tú tendrán toda la información necesaria con el mismo código de seguimiento.
