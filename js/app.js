// Main application JavaScript for Ghalbir Exchange
document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let currentUser = null;
    let isLoggedIn = false;
    let authToken = localStorage.getItem('authToken');
    
    // Initialize the application
    init();
    
    // Main initialization function
    function init() {
        // Check if user is logged in
        if (authToken) {
            validateToken(authToken);
        } else {
            showLoginModal();
        }
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize UI components
        initializeSidebar();
        initializeModals();
        
        // For demo purposes, initialize with mock data
        loadMockData();
    }
    
    // Validate stored auth token
    function validateToken(token) {
        // In a real implementation, this would make an API call to validate the token
        // For demo purposes, we'll simulate a successful validation
        
        // Simulate API call delay
        setTimeout(() => {
            // Mock user data
            currentUser = {
                id: 'user123',
                email: 'user@example.com',
                fullName: 'Demo User',
                kycStatus: 'pending',
                twoFactorEnabled: false
            };
            
            isLoggedIn = true;
            
            // Update UI for logged in user
            updateUserInterface();
            
            // Load user data
            loadUserData();
        }, 500);
    }
    
    // Update UI based on login state
    function updateUserInterface() {
        if (isLoggedIn) {
            // Update user name display
            document.getElementById('user-name').textContent = currentUser.fullName;
            
            // Hide login/register modals if open
            hideModal('login-modal');
            hideModal('register-modal');
            
            // Update KYC status if on settings page
            const kycStatusBadge = document.getElementById('kyc-status-badge');
            if (kycStatusBadge) {
                kycStatusBadge.textContent = currentUser.kycStatus === 'approved' ? 'Verified' : 'Not Verified';
                kycStatusBadge.className = currentUser.kycStatus === 'approved' ? 'status-badge verified' : 'status-badge';
            }
            
            // Update 2FA status if on settings page
            const twoFaStatus = document.getElementById('2fa-status');
            if (twoFaStatus) {
                twoFaStatus.textContent = currentUser.twoFactorEnabled ? 'Enabled' : 'Disabled';
                twoFaStatus.className = currentUser.twoFactorEnabled ? 'status-badge enabled' : 'status-badge';
            }
        } else {
            // Show login modal
            showLoginModal();
        }
    }
    
    // Load user data from API
    function loadUserData() {
        // In a real implementation, this would make API calls to load user data
        // For demo purposes, we'll use mock data
        
        // Load wallet data
        loadWalletData();
        
        // Load orders data
        loadOrdersData();
        
        // Load trade history
        loadTradeHistory();
    }
    
    // Setup all event listeners
    function setupEventListeners() {
        // Sidebar navigation
        const sidebarItems = document.querySelectorAll('.sidebar-menu li');
        sidebarItems.forEach(item => {
            item.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                navigateToPage(page);
            });
        });
        
        // Sidebar toggle for mobile
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', toggleSidebar);
        }
        
        // Login form submission
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
        
        // Register form submission
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', handleRegister);
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
        
        // Register link in login modal
        const registerLink = document.getElementById('register-link');
        if (registerLink) {
            registerLink.addEventListener('click', function(e) {
                e.preventDefault();
                hideModal('login-modal');
                showModal('register-modal');
            });
        }
        
        // Login link in register modal
        const loginLink = document.getElementById('login-link');
        if (loginLink) {
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                hideModal('register-modal');
                showModal('login-modal');
            });
        }
        
        // Close modal buttons
        const closeButtons = document.querySelectorAll('.close-modal');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                hideModal(modal.id);
            });
        });
        
        // Order form tabs
        const orderTabs = document.querySelectorAll('.order-tab');
        orderTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const formType = this.getAttribute('data-form');
                switchOrderForm(formType);
            });
        });
        
        // Order type tabs (buy/sell)
        const typeTabs = document.querySelectorAll('.type-tab');
        typeTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const orderType = this.getAttribute('data-type');
                switchOrderType(orderType);
            });
        });
        
        // Amount buttons in order form
        const amountButtons = document.querySelectorAll('.amount-btn');
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                const percent = this.getAttribute('data-percent');
                setAmountPercent(percent);
            });
        });
        
        // Price and amount inputs for calculating total
        const priceInput = document.getElementById('price-input');
        const amountInput = document.getElementById('amount-input');
        const totalInput = document.getElementById('total-input');
        
        if (priceInput && amountInput) {
            priceInput.addEventListener('input', calculateTotal);
            amountInput.addEventListener('input', calculateTotal);
        }
        
        // Buy and sell buttons
        const buyBtn = document.getElementById('buy-btn');
        const sellBtn = document.getElementById('sell-btn');
        
        if (buyBtn) {
            buyBtn.addEventListener('click', handleBuyOrder);
        }
        
        if (sellBtn) {
            sellBtn.addEventListener('click', handleSellOrder);
        }
        
        // Settings menu
        const settingsMenuItems = document.querySelectorAll('.settings-menu li');
        settingsMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                const settingsPage = this.getAttribute('data-settings');
                switchSettingsPage(settingsPage);
            });
        });
        
        // History tabs
        const historyTabs = document.querySelectorAll('.history-tab');
        historyTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const historyType = this.getAttribute('data-history');
                switchHistoryTab(historyType);
            });
        });
        
        // Change password button
        const changePasswordBtn = document.getElementById('change-password-btn');
        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', function() {
                showModal('change-password-modal');
            });
        }
        
        // Setup 2FA button
        const setup2faBtn = document.getElementById('setup-2fa-btn');
        if (setup2faBtn) {
            setup2faBtn.addEventListener('click', function() {
                showModal('2fa-modal');
            });
        }
        
        // 2FA form submission
        const twoFaForm = document.getElementById('2fa-form');
        if (twoFaForm) {
            twoFaForm.addEventListener('submit', handle2FASetup);
        }
        
        // Copy buttons
        const copySecretKeyBtn = document.getElementById('copy-secret-key');
        if (copySecretKeyBtn) {
            copySecretKeyBtn.addEventListener('click', function() {
                copyToClipboard('2fa-secret-key');
            });
        }
        
        const copyDepositAddressBtn = document.getElementById('copy-deposit-address');
        if (copyDepositAddressBtn) {
            copyDepositAddressBtn.addEventListener('click', function() {
                copyToClipboard('deposit-address-value');
            });
        }
    }
    
    // Initialize sidebar
    function initializeSidebar() {
        // Set first item as active by default
        const firstItem = document.querySelector('.sidebar-menu li');
        if (firstItem) {
            firstItem.classList.add('active');
        }
    }
    
    // Initialize modals
    function initializeModals() {
        // Close modals when clicking outside
        window.addEventListener('click', function(event) {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    hideModal(modal.id);
                }
            });
        });
    }
    
    // Navigate to a page
    function navigateToPage(page) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.remove('active'));
        
        // Show selected page
        const selectedPage = document.getElementById(`${page}-page`);
        if (selectedPage) {
            selectedPage.classList.add('active');
        }
        
        // Update sidebar active item
        const sidebarItems = document.querySelectorAll('.sidebar-menu li');
        sidebarItems.forEach(item => item.classList.remove('active'));
        
        const activeItem = document.querySelector(`.sidebar-menu li[data-page="${page}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        // Load page-specific data
        switch (page) {
            case 'dashboard':
                loadDashboardData();
                break;
            case 'markets':
                loadMarketsData();
                break;
            case 'trade':
                loadTradeData();
                break;
            case 'wallet':
                loadWalletData();
                break;
            case 'orders':
                loadOrdersData();
                break;
            case 'history':
                loadTradeHistory();
                break;
        }
    }
    
    // Toggle sidebar for mobile view
    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    }
    
    // Show a modal
    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }
    
    // Hide a modal
    function hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    // Handle login form submission
    function handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // In a real implementation, this would make an API call to authenticate
        // For demo purposes, we'll simulate a successful login
        
        // Simulate API call delay
        setTimeout(() => {
            // Mock successful login
            authToken = 'mock-auth-token-' + Date.now();
            localStorage.setItem('authToken', authToken);
            
            // Set current user
            currentUser = {
                id: 'user123',
                email: email,
                fullName: 'Demo User',
                kycStatus: 'pending',
                twoFactorEnabled: false
            };
            
            isLoggedIn = true;
            
            // Update UI
            updateUserInterface();
            
            // Load user data
            loadUserData();
            
            // Show success message
            showNotification('Login successful', 'success');
        }, 1000);
    }
    
    // Handle register form submission
    function handleRegister(e) {
        e.preventDefault();
        
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const fullName = document.getElementById('register-full-name').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        // In a real implementation, this would make an API call to register
        // For demo purposes, we'll simulate a successful registration
        
        // Simulate API call delay
        setTimeout(() => {
            // Mock successful registration
            authToken = 'mock-auth-token-' + Date.now();
            localStorage.setItem('authToken', authToken);
            
            // Set current user
            currentUser = {
                id: 'user123',
                email: email,
                fullName: fullName,
                kycStatus: 'pending',
                twoFactorEnabled: false
            };
            
            isLoggedIn = true;
            
            // Update UI
            updateUserInterface();
            
            // Load user data
            loadUserData();
            
            // Show success message
            showNotification('Registration successful', 'success');
        }, 1000);
    }
    
    // Handle logout
    function handleLogout() {
        // Clear auth token
        localStorage.removeItem('authToken');
        authToken = null;
        
        // Reset user data
        currentUser = null;
        isLoggedIn = false;
        
        // Update UI
        updateUserInterface();
        
        // Navigate to dashboard
        navigateToPage('dashboard');
        
        // Show success message
        showNotification('Logout successful', 'success');
    }
    
    // Switch order form type (limit, market, stop-limit)
    function switchOrderForm(formType) {
        // Update active tab
        const orderTabs = document.querySelectorAll('.order-tab');
        orderTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-form') === formType) {
                tab.classList.add('active');
            }
        });
        
        // Update form fields based on type
        const priceInput = document.getElementById('price-input');
        
        if (formType === 'market') {
            priceInput.disabled = true;
            priceInput.value = 'Market Price';
        } else {
            priceInput.disabled = false;
            priceInput.value = '';
        }
    }
    
    // Switch order type (buy/sell)
    function switchOrderType(orderType) {
        // Update active tab
        const typeTabs = document.querySelectorAll('.type-tab');
        typeTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-type') === orderType) {
                tab.classList.add('active');
            }
        });
        
        // Update button visibility
        const buyBtn = document.getElementById('buy-btn');
        const sellBtn = document.getElementById('sell-btn');
        
        if (orderType === 'buy') {
            buyBtn.style.display = 'block';
            sellBtn.style.display = 'none';
        } else {
            buyBtn.style.display = 'none';
            sellBtn.style.display = 'block';
        }
        
        // Update available balance display
        const balanceValue = document.querySelector('.balance-value');
        if (orderType === 'buy') {
            balanceValue.textContent = '1000.00 USDT';
        } else {
            balanceValue.textContent = '10.00 GBR';
        }
    }
    
    // Set amount as percentage of available balance
    function setAmountPercent(percent) {
        const amountInput = document.getElementById('amount-input');
        const activeOrderType = document.querySelector('.type-tab.active').getAttribute('data-type');
        
        // Mock available balances
        const availableGBR = 10;
        const availableUSDT = 1000;
        const currentPrice = parseFloat(document.getElementById('price-input').value) || 100;
        
        let amount;
        if (activeOrderType === 'buy') {
            // Calculate how much GBR can be bought with available USDT
            amount = (availableUSDT * (parseInt(percent) / 100)) / currentPrice;
        } else {
            // Calculate percentage of available GBR
            amount = availableGBR * (parseInt(percent) / 100);
        }
        
        amountInput.value = amount.toFixed(4);
        calculateTotal();
    }
    
    // Calculate total based on price and amount
    function calculateTotal() {
        const priceInput = document.getElementById('price-input');
        const amountInput = document.getElementById('amount-input');
        const totalInput = document.getElementById('total-input');
        
        if (priceInput.disabled) {
            // Market order
            totalInput.value = 'Market Price';
            return;
        }
        
        const price = parseFloat(priceInput.value) || 0;
        const amount = parseFloat(amountInput.value) || 0;
        
        const total = price * amount;
        totalInput.value = total.toFixed(4);
    }
    
    // Handle buy order submission
    function handleBuyOrder() {
        if (!isLoggedIn) {
            showLoginModal();
            return;
        }
        
        const price = document.getElementById('price-input').value;
        const amount = document.getElementById('amount-input').value;
        
        // Validate inputs
        if (!amount || parseFloat(amount) <= 0) {
            showNotification('Please enter a valid amount', 'error');
            return;
        }
        
        if (!price || (price !== 'Market Price' && parseFloat(price) <= 0)) {
            showNotification('Please enter a valid price', 'error');
            return;
        }
        
        // In a real implementation, this would make an API call to place the order
        // For demo purposes, we'll simulate a successful order
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            showNotification('Buy order placed successfully', 'success');
            
            // Clear form
            document.getElementById('amount-input').value = '';
            calculateTotal();
            
            // Refresh orders
            loadOrdersData();
        }, 1000);
    }
    
    // Handle sell order submission
    function handleSellOrder() {
        if (!isLoggedIn) {
            showLoginModal();
            return;
        }
        
        const price = document.getElementById('price-input').value;
        const amount = document.getElementById('amount-input').value;
        
        // Validate inputs
        if (!amount || parseFloat(amount) <= 0) {
            showNotification('Please enter a valid amount', 'error');
            return;
        }
        
        if (!price || (price !== 'Market Price' && parseFloat(price) <= 0)) {
            showNotification('Please enter a valid price', 'error');
            return;
        }
        
        // In a real implementation, this would make an API call to place the order
        // For demo purposes, we'll simulate a successful order
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            showNotification('Sell order placed successfully', 'success');
            
            // Clear form
            document.getElementById('amount-input').value = '';
            calculateTotal();
            
            // Refresh orders
            loadOrdersData();
        }, 1000);
    }
    
    // Switch settings page
    function switchSettingsPage(page) {
        // Update active menu item
        const menuItems = document.querySelectorAll('.settings-menu li');
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-settings') === page) {
                item.classList.add('active');
            }
        });
        
        // Update active section
        const sections = document.querySelectorAll('.settings-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const activeSection = document.getElementById(`${page}-settings`);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    }
    
    // Switch history tab
    function switchHistoryTab(tab) {
        // Update active tab
        const historyTabs = document.querySelectorAll('.history-tab');
        historyTabs.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-history') === tab) {
                item.classList.add('active');
            }
        });
        
        // Update active table
        const tables = document.querySelectorAll('.history-table');
        tables.forEach(table => {
            table.classList.remove('active');
        });
        
        const activeTable = document.getElementById(`${tab}-history`);
        if (activeTable) {
            activeTable.classList.add('active');
        }
    }
    
    // Handle 2FA setup
    function handle2FASetup(e) {
        e.preventDefault();
        
        const code = document.getElementById('2fa-code').value;
        
        // Validate code
        if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
            showNotification('Please enter a valid 6-digit code', 'error');
            return;
        }
        
        // In a real implementation, this would make an API call to verify and enable 2FA
        // For demo purposes, we'll simulate a successful setup
        
        // Simulate API call delay
        setTimeout(() => {
            // Update user data
            currentUser.twoFactorEnabled = true;
            
            // Update UI
            const twoFaStatus = document.getElementById('2fa-status');
            if (twoFaStatus) {
                twoFaStatus.textContent = 'Enabled';
                twoFaStatus.className = 'status-badge enabled';
            }
            
            // Update button text
            const setup2faBtn = document.getElementById('setup-2fa-btn');
            if (setup2faBtn) {
                setup2faBtn.textContent = 'Disable 2FA';
            }
            
            // Hide modal
            hideModal('2fa-modal');
            
            // Show success message
            showNotification('Two-factor authentication enabled successfully', 'success');
        }, 1000);
    }
    
    // Copy text to clipboard
    function copyToClipboard(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const text = element.textContent;
        
        // Create temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        
        // Select and copy
        tempInput.select();
        document.execCommand('copy');
        
        // Remove temporary element
        document.body.removeChild(tempInput);
        
        // Show notification
        showNotification('Copied to clipboard', 'success');
    }
    
    // Show login modal
    function showLoginModal() {
        if (!isLoggedIn) {
            showModal('login-modal');
        }
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
            </div>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Load mock data for demonstration
    function loadMockData() {
        loadDashboardData();
        loadMarketsData();
        loadTradeData();
    }
    
    // Load dashboard data
    function loadDashboardData() {
        // In a real implementation, this would make API calls to load dashboard data
        // For demo purposes, we'll use mock data
        
        // Update price chart
        // This would typically use a charting library like Chart.js or TradingView
        const priceChart = document.getElementById('price-chart');
        if (priceChart) {
            priceChart.innerHTML = `
                <div class="chart-placeholder">
                    <i class="fas fa-chart-line"></i>
                    <p>Price chart will be displayed here</p>
                </div>
            `;
        }
        
        // Update recent trades
        const recentTrades = document.getElementById('recent-trades');
        if (recentTrades) {
            recentTrades.innerHTML = `
                <tr>
                    <td>2025-04-17 18:15:32</td>
                    <td>GBR/USDT</td>
                    <td class="text-success">Buy</td>
                    <td>100.25</td>
                    <td>0.5000</td>
                    <td>50.13</td>
                </tr>
                <tr>
                    <td>2025-04-17 18:14:45</td>
                    <td>GBR/USDT</td>
                    <td class="text-danger">Sell</td>
                    <td>100.20</td>
                    <td>0.3500</td>
                    <td>35.07</td>
                </tr>
                <tr>
                    <td>2025-04-17 18:13:12</td>
                    <td>GBR/USDT</td>
                    <td class="text-success">Buy</td>
                    <td>100.15</td>
                    <td>0.2500</td>
                    <td>25.04</td>
                </tr>
            `;
        }
    }
    
    // Load markets data
    function loadMarketsData() {
        // In a real implementation, this would make API calls to load markets data
        // For demo purposes, we'll use mock data
        
        const marketsList = document.getElementById('markets-list');
        if (marketsList) {
            marketsList.innerHTML = `
                <tr>
                    <td><i class="far fa-star"></i></td>
                    <td>GBR/USDT</td>
                    <td>100.25</td>
                    <td class="text-success">+2.5%</td>
                    <td>102.50</td>
                    <td>98.75</td>
                    <td>15,432.50</td>
                    <td><button class="btn btn-primary btn-sm" onclick="navigateToPage('trade')">Trade</button></td>
                </tr>
                <tr>
                    <td><i class="far fa-star"></i></td>
                    <td>GBR/BTC</td>
                    <td>0.00325</td>
                    <td class="text-danger">-1.2%</td>
                    <td>0.00330</td>
                    <td>0.00320</td>
                    <td>5.43</td>
                    <td><button class="btn btn-primary btn-sm">Trade</button></td>
                </tr>
                <tr>
                    <td><i class="far fa-star"></i></td>
                    <td>GBR/ETH</td>
                    <td>0.0425</td>
                    <td class="text-success">+0.8%</td>
                    <td>0.0430</td>
                    <td>0.0420</td>
                    <td>12.75</td>
                    <td><button class="btn btn-primary btn-sm">Trade</button></td>
                </tr>
            `;
        }
    }
    
    // Load trade data
    function loadTradeData() {
        // In a real implementation, this would make API calls to load trade data
        // For demo purposes, we'll use mock data
        
        // Update order book
        const orderBookAsks = document.getElementById('order-book-asks');
        const orderBookBids = document.getElementById('order-book-bids');
        
        if (orderBookAsks) {
            let asksHtml = '';
            
            // Generate mock asks (sell orders)
            for (let i = 0; i < 10; i++) {
                const price = (100.50 + (i * 0.05)).toFixed(2);
                const amount = (Math.random() * 2 + 0.1).toFixed(4);
                const total = (price * amount).toFixed(2);
                const width = 100 - (i * 10); // For visualization
                
                asksHtml += `
                    <div class="order-row">
                        <div class="price">${price}</div>
                        <div class="amount">${amount}</div>
                        <div class="total">${total}</div>
                        <div class="depth-visualization" style="width: ${width}%"></div>
                    </div>
                `;
            }
            
            orderBookAsks.innerHTML = asksHtml;
        }
        
        if (orderBookBids) {
            let bidsHtml = '';
            
            // Generate mock bids (buy orders)
            for (let i = 0; i < 10; i++) {
                const price = (100.45 - (i * 0.05)).toFixed(2);
                const amount = (Math.random() * 2 + 0.1).toFixed(4);
                const total = (price * amount).toFixed(2);
                const width = 100 - (i * 10); // For visualization
                
                bidsHtml += `
                    <div class="order-row">
                        <div class="price">${price}</div>
                        <div class="amount">${amount}</div>
                        <div class="total">${total}</div>
                        <div class="depth-visualization" style="width: ${width}%"></div>
                    </div>
                `;
            }
            
            orderBookBids.innerHTML = bidsHtml;
        }
        
        // Update market trades
        const marketTrades = document.getElementById('market-trades');
        
        if (marketTrades) {
            let tradesHtml = '';
            
            // Generate mock trades
            for (let i = 0; i < 20; i++) {
                const isBuy = Math.random() > 0.5;
                const price = (100.25 + (Math.random() * 0.5 - 0.25)).toFixed(2);
                const amount = (Math.random() * 2 + 0.1).toFixed(4);
                const time = new Date(Date.now() - i * 30000).toLocaleTimeString();
                
                tradesHtml += `
                    <div class="trade-row ${isBuy ? 'buy' : 'sell'}">
                        <div class="price">${price}</div>
                        <div class="amount">${amount}</div>
                        <div class="time">${time}</div>
                    </div>
                `;
            }
            
            marketTrades.innerHTML = tradesHtml;
        }
        
        // Update trading chart
        const tradingChart = document.getElementById('trading-chart');
        if (tradingChart) {
            tradingChart.innerHTML = `
                <div class="chart-placeholder">
                    <i class="fas fa-chart-line"></i>
                    <p>Trading chart will be displayed here</p>
                </div>
            `;
        }
    }
    
    // Load wallet data
    function loadWalletData() {
        // In a real implementation, this would make API calls to load wallet data
        // For demo purposes, we'll use mock data
        
        const assetList = document.getElementById('asset-list');
        
        if (assetList) {
            assetList.innerHTML = `
                <tr>
                    <td>
                        <div class="asset-info">
                            <img src="img/gbr.png" alt="GBR" class="asset-icon">
                            <div>
                                <div class="asset-name">Ghalbir</div>
                                <div class="asset-symbol">GBR</div>
                            </div>
                        </div>
                    </td>
                    <td>10.0000</td>
                    <td>0.0000</td>
                    <td>10.0000</td>
                    <td>1,002.50</td>
                    <td>
                        <button class="btn btn-sm btn-primary">Deposit</button>
                        <button class="btn btn-sm btn-secondary">Withdraw</button>
                        <button class="btn btn-sm btn-info">Trade</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="asset-info">
                            <img src="img/usdt.png" alt="USDT" class="asset-icon">
                            <div>
                                <div class="asset-name">Tether</div>
                                <div class="asset-symbol">USDT</div>
                            </div>
                        </div>
                    </td>
                    <td>1,000.0000</td>
                    <td>0.0000</td>
                    <td>1,000.0000</td>
                    <td>1,000.00</td>
                    <td>
                        <button class="btn btn-sm btn-primary">Deposit</button>
                        <button class="btn btn-sm btn-secondary">Withdraw</button>
                        <button class="btn btn-sm btn-info">Trade</button>
                    </td>
                </tr>
            `;
        }
    }
    
    // Load orders data
    function loadOrdersData() {
        // In a real implementation, this would make API calls to load orders data
        // For demo purposes, we'll use mock data
        
        // Update open orders in trade page
        const openOrders = document.getElementById('open-orders');
        
        if (openOrders) {
            if (!isLoggedIn) {
                openOrders.innerHTML = `
                    <tr>
                        <td colspan="9" class="text-center">Please login to view your orders</td>
                    </tr>
                `;
                return;
            }
            
            openOrders.innerHTML = `
                <tr>
                    <td>2025-04-17 18:10:25</td>
                    <td>GBR/USDT</td>
                    <td>Limit</td>
                    <td class="text-success">Buy</td>
                    <td>99.50</td>
                    <td>1.0000</td>
                    <td>0.0000</td>
                    <td>99.50</td>
                    <td><button class="btn btn-sm btn-danger">Cancel</button></td>
                </tr>
                <tr>
                    <td>2025-04-17 18:05:12</td>
                    <td>GBR/USDT</td>
                    <td>Limit</td>
                    <td class="text-danger">Sell</td>
                    <td>101.50</td>
                    <td>0.5000</td>
                    <td>0.0000</td>
                    <td>50.75</td>
                    <td><button class="btn btn-sm btn-danger">Cancel</button></td>
                </tr>
            `;
        }
        
        // Update orders list in orders page
        const ordersList = document.getElementById('orders-list');
        
        if (ordersList) {
            if (!isLoggedIn) {
                ordersList.innerHTML = `
                    <tr>
                        <td colspan="10" class="text-center">Please login to view your orders</td>
                    </tr>
                `;
                return;
            }
            
            ordersList.innerHTML = `
                <tr>
                    <td>2025-04-17 18:10:25</td>
                    <td>GBR/USDT</td>
                    <td>Limit</td>
                    <td class="text-success">Buy</td>
                    <td>99.50</td>
                    <td>1.0000</td>
                    <td>0.0000</td>
                    <td>99.50</td>
                    <td>Open</td>
                    <td><button class="btn btn-sm btn-danger">Cancel</button></td>
                </tr>
                <tr>
                    <td>2025-04-17 18:05:12</td>
                    <td>GBR/USDT</td>
                    <td>Limit</td>
                    <td class="text-danger">Sell</td>
                    <td>101.50</td>
                    <td>0.5000</td>
                    <td>0.0000</td>
                    <td>50.75</td>
                    <td>Open</td>
                    <td><button class="btn btn-sm btn-danger">Cancel</button></td>
                </tr>
                <tr>
                    <td>2025-04-17 17:55:30</td>
                    <td>GBR/USDT</td>
                    <td>Market</td>
                    <td class="text-success">Buy</td>
                    <td>100.25</td>
                    <td>0.5000</td>
                    <td>0.5000</td>
                    <td>50.13</td>
                    <td>Filled</td>
                    <td><button class="btn btn-sm btn-info">Details</button></td>
                </tr>
            `;
        }
    }
    
    // Load trade history
    function loadTradeHistory() {
        // In a real implementation, this would make API calls to load trade history
        // For demo purposes, we'll use mock data
        
        const tradesHistoryList = document.getElementById('trades-history-list');
        const depositsHistoryList = document.getElementById('deposits-history-list');
        const withdrawalsHistoryList = document.getElementById('withdrawals-history-list');
        
        if (tradesHistoryList) {
            if (!isLoggedIn) {
                tradesHistoryList.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center">Please login to view your trade history</td>
                    </tr>
                `;
            } else {
                tradesHistoryList.innerHTML = `
                    <tr>
                        <td>2025-04-17 17:55:30</td>
                        <td>GBR/USDT</td>
                        <td class="text-success">Buy</td>
                        <td>100.25</td>
                        <td>0.5000</td>
                        <td>0.05</td>
                        <td>50.13</td>
                    </tr>
                    <tr>
                        <td>2025-04-17 17:45:12</td>
                        <td>GBR/USDT</td>
                        <td class="text-danger">Sell</td>
                        <td>100.50</td>
                        <td>0.3000</td>
                        <td>0.03</td>
                        <td>30.15</td>
                    </tr>
                    <tr>
                        <td>2025-04-17 17:30:45</td>
                        <td>GBR/USDT</td>
                        <td class="text-success">Buy</td>
                        <td>100.00</td>
                        <td>1.0000</td>
                        <td>0.10</td>
                        <td>100.00</td>
                    </tr>
                `;
            }
        }
        
        if (depositsHistoryList) {
            if (!isLoggedIn) {
                depositsHistoryList.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center">Please login to view your deposit history</td>
                    </tr>
                `;
            } else {
                depositsHistoryList.innerHTML = `
                    <tr>
                        <td>2025-04-17 16:30:15</td>
                        <td>GBR</td>
                        <td>10.0000</td>
                        <td>0x1234...5678</td>
                        <td>0xabcd...ef01</td>
                        <td><span class="status-badge">Completed</span></td>
                    </tr>
                    <tr>
                        <td>2025-04-17 15:45:30</td>
                        <td>USDT</td>
                        <td>1,000.0000</td>
                        <td>0x9876...5432</td>
                        <td>0xfedc...ba98</td>
                        <td><span class="status-badge">Completed</span></td>
                    </tr>
                `;
            }
        }
        
        if (withdrawalsHistoryList) {
            if (!isLoggedIn) {
                withdrawalsHistoryList.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center">Please login to view your withdrawal history</td>
                    </tr>
                `;
            } else {
                withdrawalsHistoryList.innerHTML = `
                    <tr>
                        <td>2025-04-16 14:20:45</td>
                        <td>GBR</td>
                        <td>5.0000</td>
                        <td>0.0050</td>
                        <td>0x5678...1234</td>
                        <td>0x2345...6789</td>
                        <td><span class="status-badge">Completed</span></td>
                    </tr>
                    <tr>
                        <td>2025-04-16 13:15:30</td>
                        <td>USDT</td>
                        <td>500.0000</td>
                        <td>1.0000</td>
                        <td>0x8765...4321</td>
                        <td>0x7654...3210</td>
                        <td><span class="status-badge">Completed</span></td>
                    </tr>
                `;
            }
        }
    }
    
    // Helper function to format numbers
    function formatNumber(num, decimals = 2) {
        return parseFloat(num).toFixed(decimals);
    }
    
    // Make navigateToPage function globally accessible
    window.navigateToPage = navigateToPage;
});

// Add CSS for notifications
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            background-color: #333;
            color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background-color: #00c853;
        }
        
        .notification.error {
            background-color: #ff1744;
        }
        
        .notification.info {
            background-color: #2196f3;
        }
        
        .notification.warning {
            background-color: #ffab00;
        }
    `;
    document.head.appendChild(style);
});
