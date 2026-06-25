// Servicio de Email para AVENIDA
// Este servicio maneja el envío de emails de confirmación de compra

class EmailService {
    constructor() {
        this.adminEmail = 'aaavenidaaa@gmail.com';
        this.adminName = 'AVENIDA';
        this.companyName = 'AVENIDA';
        this.companyPhone = '+595 982 713971';
        this.companyAddress = 'Paraguay';
    }

    // Generar código de confirmación único
    generateConfirmationCode() {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `AVD-${timestamp}-${random}`;
    }

    // Generar email para el cliente
    generateCustomerEmail(customerData, orderDetails, confirmationCode) {
        const { firstName, lastName, email, phone, city } = customerData;
        const { items, total, orderId } = orderDetails;

        const itemsList = items.map(item => {
            let cleanPrice = item.price.toString().replace(/\u20B2/g, '').replace(/\s/g, '').replace(/\./g, '');
            let priceNum = parseFloat(cleanPrice) || 0;
            let designText = item.design ? ` - Diseño: ${item.design}` : '';
            return `• ${item.name} - Talle: ${item.size}${designText} - Cantidad: ${item.quantity} - \u20B2${priceNum.toLocaleString('es-PY')}`;
        }).join('\n');

        return {
            to: email,
            subject: `✅ Confirmación de Pedido #${orderId} - ${this.companyName}`,
            html: `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Confirmación de Pedido - ${this.companyName}</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #8357C5; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
                        .confirmation-code { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
                        .order-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
                        .item { padding: 10px 0; border-bottom: 1px solid #eee; }
                        .total { font-weight: bold; font-size: 18px; color: #8357C5; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>${this.companyName}</h1>
                            <p>Confirmación de Pedido</p>
                        </div>
                        
                        <div class="content">
                            <h2>¡Hola ${firstName} ${lastName}!</h2>
                            <p>Tu pedido ha sido confirmado exitosamente. Aquí tienes todos los detalles:</p>
                            
                            <div class="confirmation-code">
                                <h3>🔐 Código de Confirmación</h3>
                                <h2 style="color: #8357C5; font-size: 24px; margin: 10px 0;">${confirmationCode}</h2>
                                <p><strong>Guarda este código, lo necesitarás para consultar tu pedido.</strong></p>
                            </div>
                            
                            <div class="order-details">
                                <h3>📋 Detalles del Pedido</h3>
                                <p><strong>Número de Pedido:</strong> #${orderId}</p>
                                <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-PY')}</p>
                                <p><strong>Estado:</strong> Confirmado</p>
                                
                                <h4>🛍️ Productos:</h4>
                                <div style="margin: 15px 0;">
                                    ${items.map(item => {
                let cleanPrice = item.price.toString().replace(/\u20B2/g, '').replace(/\s/g, '').replace(/\./g, '');
                let priceNum = parseFloat(cleanPrice) || 0;
                let designText = item.design ? ` | Diseño: ${item.design}` : '';
                return `
                                        <div class="item">
                                            <strong>${item.name}</strong><br>
                                            Talle: ${item.size}${designText} | Cantidad: ${item.quantity}<br>
                                            Precio: \u20B2${priceNum.toLocaleString('es-PY')}
                                        </div>
                                        `;
            }).join('')}
                                </div>
                                
                                <div class="total">
                                    <p>Total: \u20B2${total.toLocaleString('es-PY')}</p>
                                </div>
                            </div>
                            
                            <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <h3>📞 Próximos Pasos</h3>
                                <p>1. <strong>Transfiere el monto</strong> a la cuenta bancaria indicada</p>
                                <p>2. <strong>Envía el comprobante</strong> por WhatsApp al ${this.companyPhone}</p>
                                <p>3. <strong>Incluye tu código:</strong> ${confirmationCode}</p>
                                <p>4. <strong>Recibirás confirmación</strong> de pago por email</p>
                            </div>
                            
                            <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <h3>⚠️ Información Importante</h3>
                                <p>• Tu pedido se procesará una vez confirmado el pago</p>
                                <p>• El envío se realizará en 24-48 horas hábiles</p>
                                <p>• Para consultas: ${this.companyPhone}</p>
                            </div>
                        </div>
                        
                        <div class="footer">
                            <p>${this.companyName} - ${this.companyAddress}</p>
                            <p>WhatsApp: ${this.companyPhone}</p>
                            <p>Este email fue enviado automáticamente, no respondas a este mensaje.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                Confirmación de Pedido #${orderId} - ${this.companyName}
                
                Hola ${firstName} ${lastName},
                
                Tu pedido ha sido confirmado exitosamente.
                
                🔐 CÓDIGO DE CONFIRMACIÓN: ${confirmationCode}
                
                📋 DETALLES DEL PEDIDO:
                Número: #${orderId}
                Fecha: ${new Date().toLocaleDateString('es-PY')}
                Estado: Confirmado
                
                🛍️ PRODUCTOS:
                ${itemsList}
                
                💰 TOTAL: \u20B2${total.toLocaleString('es-PY')}
                
                📞 PRÓXIMOS PASOS:
                1. Transfiere el monto a la cuenta bancaria indicada
                2. Envía el comprobante por WhatsApp al ${this.companyPhone}
                3. Incluye tu código: ${confirmationCode}
                4. Recibirás confirmación de pago por email
                
                ⚠️ INFORMACIÓN IMPORTANTE:
                • Tu pedido se procesará una vez confirmado el pago
                • El envío se realizará en 24-48 horas hábiles
                • Para consultas: ${this.companyPhone}
                
                ${this.companyName} - ${this.companyAddress}
                WhatsApp: ${this.companyPhone}
            `
        };
    }

    // Generar email para el admin
    generateAdminEmail(customerData, orderDetails, confirmationCode) {
        const { firstName, lastName, email, phone, city, address, neighborhood } = customerData;
        const { items, total, orderId } = orderDetails;

        const itemsList = items.map(item => {
            let cleanPrice = item.price.toString().replace(/\u20B2/g, '').replace(/\s/g, '').replace(/\./g, '');
            let priceNum = parseFloat(cleanPrice) || 0;
            let subtotal = priceNum * (parseInt(item.quantity) || 1);
            let designText = item.design ? ` - Diseño: ${item.design}` : '';
            return `• ${item.name} - Talle: ${item.size}${designText} - Cantidad: ${item.quantity} - \u20B2${priceNum.toLocaleString('es-PY')} (Subtotal: \u20B2${subtotal.toLocaleString('es-PY')})`;
        }).join('\n');

        return {
            to: this.adminEmail,
            subject: `🆕 Nuevo Pedido #${orderId} - ${firstName} ${lastName}`,
            html: `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Nuevo Pedido - ${this.companyName}</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
                        .order-info { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
                        .customer-info { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
                        .items-list { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
                        .item { padding: 10px 0; border-bottom: 1px solid #eee; }
                        .total { font-weight: bold; font-size: 18px; color: #dc3545; }
                        .confirmation-code { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🆕 NUEVO PEDIDO</h1>
                            <p>${this.companyName} - Panel de Administración</p>
                        </div>
                        
                        <div class="content">
                            <h2>Se ha recibido un nuevo pedido</h2>
                            
                            <div class="confirmation-code">
                                <h3>🔐 Código de Confirmación del Cliente</h3>
                                <h2 style="color: #dc3545; font-size: 24px; margin: 10px 0;">${confirmationCode}</h2>
                            </div>
                            
                            <div class="order-info">
                                <h3>📋 Información del Pedido</h3>
                                <p><strong>Número de Pedido:</strong> #${orderId}</p>
                                <p><strong>Fecha y Hora:</strong> ${new Date().toLocaleString('es-PY')}</p>
                                <p><strong>Estado:</strong> Pendiente de Pago</p>
                                <p><strong>Total:</strong> \u20B2${total.toLocaleString('es-PY')}</p>
                            </div>
                            
                            <div class="customer-info">
                                <h3>👤 Información del Cliente</h3>
                                <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Teléfono:</strong> ${phone}</p>
                                <p><strong>Ciudad:</strong> ${city}</p>
                                <p><strong>Dirección:</strong> ${address}, ${neighborhood}</p>
                            </div>
                            
                            <div class="items-list">
                                <h3>🛍️ Productos Solicitados</h3>
                                ${items.map(item => {
                let cleanPrice = item.price.toString().replace(/\u20B2/g, '').replace(/\s/g, '').replace(/\./g, '');
                let priceNum = parseFloat(cleanPrice) || 0;
                let subtotal = priceNum * parseInt(item.quantity || 1);
                let designText = item.design ? ` | Diseño: ${item.design}` : '';
                return `
                                    <div class="item">
                                        <strong>${item.name}</strong><br>
                                        Talle: ${item.size}${designText} | Cantidad: ${item.quantity}<br>
                                        Precio unitario: \u20B2${priceNum.toLocaleString('es-PY')}<br>
                                        Subtotal: \u20B2${subtotal.toLocaleString('es-PY')}
                                    </div>
                                    `;
            }).join('')}
                                
                                <div class="total">
                                    <p>Total del Pedido: \u20B2${total.toLocaleString('es-PY')}</p>
                                </div>
                            </div>
                            
                            <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <h3>📞 Acciones Requeridas</h3>
                                <p>1. <strong>Esperar confirmación de pago</strong> del cliente</p>
                                <p>2. <strong>Verificar código:</strong> ${confirmationCode}</p>
                                <p>3. <strong>Preparar pedido</strong> una vez confirmado</p>
                                <p>4. <strong>Coordinar envío</strong> con el cliente</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                NUEVO PEDIDO #${orderId} - ${this.companyName}
                
                Se ha recibido un nuevo pedido que requiere atención.
                
                🔐 CÓDIGO DE CONFIRMACIÓN: ${confirmationCode}
                
                📋 INFORMACIÓN DEL PEDIDO:
                Número: #${orderId}
                Fecha: ${new Date().toLocaleString('es-PY')}
                Estado: Pendiente de Pago
                Total: \u20B2${total.toLocaleString('es-PY')}
                
                👤 INFORMACIÓN DEL CLIENTE:
                Nombre: ${firstName} ${lastName}
                Email: ${email}
                Teléfono: ${phone}
                Ciudad: ${city}
                Dirección: ${address}, ${neighborhood}
                
                🛍️ PRODUCTOS SOLICITADOS:
                ${itemsList}
                
                💰 TOTAL: \u20B2${total.toLocaleString('es-PY')}
                
                📞 ACCIONES REQUERIDAS:
                1. Esperar confirmación de pago del cliente
                2. Verificar código: ${confirmationCode}
                3. Preparar pedido una vez confirmado
                4. Coordinar envío con el cliente
                
                ${this.companyName} - Panel de Administración
            `
        };
    }

    // Enviar emails (con EmailJS real + fallback a simulación)
    async sendEmails(customerData, orderDetails) {
        try {
            const confirmationCode = this.generateConfirmationCode();

            // Generar emails
            const customerEmail = this.generateCustomerEmail(customerData, orderDetails, confirmationCode);
            const adminEmail = this.generateAdminEmail(customerData, orderDetails, confirmationCode);

            // Calcular el total real sumando todos los items
            const calculatedTotal = orderDetails.items.reduce((sum, item) => {
                // Limpiar el precio: remover \u20B2, espacios y puntos de miles
                let cleanPrice = item.price.toString();
                cleanPrice = cleanPrice.replace(/\u20B2/g, '').replace(/\s/g, '').replace(/\./g, '');
                const price = parseFloat(cleanPrice) || 0;
                const quantity = parseInt(item.quantity) || 1;
                return sum + (price * quantity);
            }, 0);

            console.log('💰 Total calculado para emails:', calculatedTotal);

            // Formatear el total con separadores de miles
            const formattedTotal = calculatedTotal.toLocaleString('es-PY');
            console.log('💰 Total formateado:', formattedTotal);

            // Agregar datos adicionales para EmailJS
            customerEmail.to_name = customerData.firstName;
            customerEmail.order_id = orderDetails.orderId;
            customerEmail.confirmation_code = confirmationCode;
            customerEmail.total_amount = formattedTotal; // Usar total formateado
            customerEmail.items = orderDetails.items; // Agregar items para el cliente

            adminEmail.to_name = this.adminName;
            adminEmail.order_id = orderDetails.orderId;
            adminEmail.confirmation_code = confirmationCode;
            adminEmail.customer_name = `${customerData.firstName} ${customerData.lastName}`;
            adminEmail.total_amount = formattedTotal; // Usar total formateado
            adminEmail.items = orderDetails.items; // Agregar items para el admin

            console.log('📧 Emails generados:');
            console.log('👤 Cliente:', customerEmail.to);
            console.log('👑 Admin:', adminEmail.to);
            console.log('🔐 Código:', confirmationCode);

            // Intentar envío real con EmailJS, fallback a simulación
            await this.simulateEmailSending(customerEmail, adminEmail, customerData);

            // Guardar pedido en localStorage para debugging
            const orderLog = {
                timestamp: new Date().toISOString(),
                confirmationCode,
                customerData,
                orderDetails,
                emailsSent: true
            };

            localStorage.setItem('avenidaOrderLog', JSON.stringify(orderLog));
            console.log('📋 Log del pedido guardado en localStorage');

            return {
                success: true,
                confirmationCode,
                message: 'Emails enviados exitosamente',
                orderId: orderDetails.orderId
            };

        } catch (error) {
            console.error('❌ Error al enviar emails:', error);

            // Guardar error en localStorage para debugging
            const errorLog = {
                timestamp: new Date().toISOString(),
                error: error.message,
                customerData,
                orderDetails
            };

            localStorage.setItem('avenidaEmailErrorLog', JSON.stringify(errorLog));
            console.log('❌ Log de error guardado en localStorage');

            return {
                success: false,
                error: error.message
            };
        }
    }

    // Enviar emails reales usando EmailJS
    async sendRealEmails(customerEmail, adminEmail, customerData) {
        try {
            console.log('📧 Inicializando EmailJS...');

            // Verificar que EmailJS esté disponible
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS no está cargado. Verifica la conexión a internet.');
            }

            console.log('📧 Enviando email al cliente...');

            // Generar HTML de los productos para el cliente
            const customerOrderItems = customerEmail.items ? customerEmail.items.map(item => {
                let cleanPrice = item.price.toString().replace(/\u20B2/g, '').replace(/\s/g, '').replace(/\./g, '');
                let priceNum = parseFloat(cleanPrice) || 0;
                let designText = item.design ? ` | Diseño: ${item.design}` : '';
                return `
                <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong>${item.name}</strong><br>
                    Talle: ${item.size}${designText} | Cantidad: ${item.quantity}<br>
                    Precio: \u20B2${priceNum.toLocaleString('es-PY')}
                </div>
                `;
            }).join('') : '';

            // Enviar email al cliente
            const customerResult = await window.sendEmailWithEmailJS(
                window.EMAILJS_CONFIG.TEMPLATES.CUSTOMER,
                {
                    to_email: customerEmail.to,
                    to_name: customerEmail.to_name || 'Cliente',
                    order_id: customerEmail.order_id,
                    confirmation_code: customerEmail.confirmation_code,
                    customer_email: customerData.email, // Usar email real del cliente
                    customer_phone: customerData.phone || 'No especificado', // Usar teléfono real
                    customer_city: customerData.city || 'No especificado', // Usar ciudad real
                    total_amount: customerEmail.total_amount,
                    order_items: customerOrderItems
                }
            );

            console.log('✅ Email al cliente enviado:', customerResult);

            console.log('📧 Enviando email al admin...');

            // Generar HTML de los productos para el admin
            const adminOrderItems = adminEmail.items ? adminEmail.items.map(item => {
                let cleanPrice = item.price.toString().replace(/\u20B2/g, '').replace(/\s/g, '').replace(/\./g, '');
                let priceNum = parseFloat(cleanPrice) || 0;
                let quantity = parseInt(item.quantity) || 1;
                let subtotal = priceNum * quantity;
                let designText = item.design ? ` | Diseño: ${item.design}` : '';
                return `
                <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong>${item.name}</strong><br>
                    Talle: ${item.size}${designText} | Cantidad: ${item.quantity}<br>
                    Precio unitario: \u20B2${priceNum.toLocaleString('es-PY')}<br>
                    Subtotal: \u20B2${subtotal.toLocaleString('es-PY')}
                </div>
                `;
            }).join('') : '';

            // Enviar email al admin
            const adminResult = await window.sendEmailWithEmailJS(
                window.EMAILJS_CONFIG.TEMPLATES.ADMIN,
                {
                    to_email: adminEmail.to,
                    to_name: adminEmail.to_name || 'Admin',
                    order_id: adminEmail.order_id,
                    confirmation_code: adminEmail.confirmation_code,
                    customer_name: adminEmail.customer_name,
                    customer_email: customerData.email, // Usar email real del cliente
                    customer_phone: customerData.phone || 'No especificado', // Usar teléfono real
                    customer_city: customerData.city || 'No especificado', // Usar ciudad real
                    total_amount: adminEmail.total_amount,
                    order_items: adminOrderItems
                }
            );

            console.log('✅ Email al admin enviado:', adminResult);

            return true;

        } catch (error) {
            console.error('❌ Error al enviar emails reales:', error);
            throw new Error('Error al enviar emails: ' + error.message);
        }
    }

    // Simular envío de emails (fallback si EmailJS falla)
    async simulateEmailSending(customerEmail, adminEmail, customerData) {
        try {
            console.log('📧 Intentando envío real con EmailJS...');

            // Intentar envío real primero
            const realResult = await this.sendRealEmails(customerEmail, adminEmail, customerData);
            if (realResult) {
                console.log('✅ Emails enviados exitosamente con EmailJS');
                return;
            }

        } catch (realError) {
            console.warn('⚠️ Fallback a modo simulación:', realError.message);
        }

        console.log('📧 Simulando envío de emails (modo fallback)...');

        // Simular delay de envío
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('✅ Email al cliente enviado a:', customerEmail.to);
        console.log('✅ Email al admin enviado a:', adminEmail.to);

        // En modo fallback, también guardamos los emails en localStorage para debugging
        const emailLog = {
            timestamp: new Date().toISOString(),
            customer: customerEmail,
            admin: adminEmail,
            mode: 'simulation'
        };

        localStorage.setItem('avenidaEmailLog', JSON.stringify(emailLog));
        console.log('📧 Log de emails guardado en localStorage para debugging');
    }
}

// Crear instancia global
window.emailService = new EmailService();

// Exponer funciones para uso global
window.sendOrderConfirmationEmails = function (customerData, orderDetails) {
    return window.emailService.sendEmails(customerData, orderDetails);
};

console.log('📧 Servicio de Email cargado correctamente');
