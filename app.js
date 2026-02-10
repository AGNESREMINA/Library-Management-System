// Library Management System - Main Application
class LibraryManagementSystem {
    constructor() {
        this.books = [];
        this.members = [];
        this.transactions = [];
        this.currentEditId = null;
        this.settings = {
            libraryName: 'Bibliotheca Central Library',
            maxBooks: 5,
            loanPeriod: 14,
            lateFee: 0.50
        };
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderDashboard();
        this.updateStats();
        
        // Initialize with sample data if empty
        if (this.books.length === 0) {
            this.initializeSampleData();
        }
    }

    // Initialize with sample data
    initializeSampleData() {
        // Sample Books
        this.books = [
            { id: 1, isbn: '978-0-7432-7356-5', title: '1984', author: 'George Orwell', category: 'Fiction', publisher: 'Penguin', year: 1949, status: 'available' },
            { id: 2, isbn: '978-0-06-112008-4', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', publisher: 'HarperCollins', year: 1960, status: 'borrowed' },
            { id: 3, isbn: '978-0-14-028329-5', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', publisher: 'Penguin', year: 1925, status: 'available' },
            { id: 4, isbn: '978-0-452-28423-4', title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', publisher: 'Harper', year: 2011, status: 'available' },
            { id: 5, isbn: '978-0-393-35457-0', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', publisher: 'Bantam', year: 1988, status: 'borrowed' },
            { id: 6, isbn: '978-0-7432-7357-2', title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Fiction', publisher: 'Little, Brown', year: 1951, status: 'available' },
            { id: 7, isbn: '978-0-307-27665-6', title: 'Steve Jobs', author: 'Walter Isaacson', category: 'Biography', publisher: 'Simon & Schuster', year: 2011, status: 'available' },
            { id: 8, isbn: '978-0-385-50420-3', title: 'The Clean Coder', author: 'Robert Martin', category: 'Technology', publisher: 'Prentice Hall', year: 2011, status: 'available' }
        ];

        // Sample Members
        this.members = [
            { id: 1, memberId: 'MEM001', name: 'Alice Johnson', email: 'alice@email.com', phone: '555-0101', address: '123 Main St', borrowedBooks: 1, status: 'active' },
            { id: 2, memberId: 'MEM002', name: 'Bob Smith', email: 'bob@email.com', phone: '555-0102', address: '456 Oak Ave', borrowedBooks: 2, status: 'active' },
            { id: 3, memberId: 'MEM003', name: 'Carol White', email: 'carol@email.com', phone: '555-0103', address: '789 Pine Rd', borrowedBooks: 0, status: 'active' },
            { id: 4, memberId: 'MEM004', name: 'David Brown', email: 'david@email.com', phone: '555-0104', address: '321 Elm St', borrowedBooks: 0, status: 'inactive' },
            { id: 5, memberId: 'MEM005', name: 'Emma Davis', email: 'emma@email.com', phone: '555-0105', address: '654 Maple Dr', borrowedBooks: 1, status: 'active' }
        ];

        // Sample Transactions
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setDate(pastDate.getDate() - 7);
        const dueDate = new Date(today);
        dueDate.setDate(dueDate.getDate() + 7);
        const overdue = new Date(today);
        overdue.setDate(overdue.getDate() - 2);

        this.transactions = [
            { id: 1, transactionId: 'TXN001', bookId: 2, memberId: 1, borrowDate: pastDate.toISOString(), dueDate: dueDate.toISOString(), returnDate: null, status: 'borrowed' },
            { id: 2, transactionId: 'TXN002', bookId: 5, memberId: 2, borrowDate: pastDate.toISOString(), dueDate: overdue.toISOString(), returnDate: null, status: 'overdue' },
            { id: 3, transactionId: 'TXN003', bookId: 1, memberId: 3, borrowDate: new Date('2024-01-15').toISOString(), dueDate: new Date('2024-01-29').toISOString(), returnDate: new Date('2024-01-28').toISOString(), status: 'returned' }
        ];

        this.saveData();
        this.updateStats();
    }

    // Setup Event Listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.switchView(e.target.closest('.nav-item').dataset.view));
        });

        // Book Events
        document.getElementById('addBookBtn')?.addEventListener('click', () => this.openBookModal());
        document.getElementById('quickAddBtn')?.addEventListener('click', () => this.openBookModal());
        document.getElementById('bookForm')?.addEventListener('submit', (e) => this.saveBook(e));
        document.getElementById('bookSearch')?.addEventListener('input', (e) => this.filterBooks(e.target.value));
        document.getElementById('bookCategoryFilter')?.addEventListener('change', () => this.renderBooks());
        document.getElementById('bookStatusFilter')?.addEventListener('change', () => this.renderBooks());

        // Member Events
        document.getElementById('addMemberBtn')?.addEventListener('click', () => this.openMemberModal());
        document.getElementById('memberForm')?.addEventListener('submit', (e) => this.saveMember(e));
        document.getElementById('memberSearch')?.addEventListener('input', (e) => this.filterMembers(e.target.value));
        document.getElementById('memberStatusFilter')?.addEventListener('change', () => this.renderMembers());

        // Transaction Events
        document.getElementById('newTransactionBtn')?.addEventListener('click', () => this.openTransactionModal());
        document.getElementById('transactionForm')?.addEventListener('submit', (e) => this.saveTransaction(e));
        document.getElementById('transactionSearch')?.addEventListener('input', (e) => this.filterTransactions(e.target.value));
        document.getElementById('transactionTypeFilter')?.addEventListener('change', () => this.renderTransactions());

        // Settings Events
        document.getElementById('saveSettingsBtn')?.addEventListener('click', () => this.saveSettings());
        document.getElementById('resetDataBtn')?.addEventListener('click', () => this.resetData());

        // Modal Events
        document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });

        // Close modal on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModals();
            });
        });
    }

    // View Management
    switchView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-view="${viewName}"]`)?.classList.add('active');

        // Update views
        document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
        document.getElementById(viewName)?.classList.add('active');

        // Render appropriate content
        switch(viewName) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'books':
                this.renderBooks();
                break;
            case 'members':
                this.renderMembers();
                break;
            case 'transactions':
                this.renderTransactions();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    // Dashboard Rendering
    renderDashboard() {
        this.updateStats();
        this.renderRecentActivities();
        this.renderPopularBooks();
    }

    updateStats() {
        document.getElementById('totalBooks').textContent = this.books.length;
        document.getElementById('totalMembers').textContent = this.members.filter(m => m.status === 'active').length;
        document.getElementById('borrowedBooks').textContent = this.transactions.filter(t => t.status === 'borrowed' || t.status === 'overdue').length;
        document.getElementById('overdueBooks').textContent = this.transactions.filter(t => t.status === 'overdue').length;
    }

    renderRecentActivities() {
        const container = document.getElementById('recentActivitiesList');
        const recentTransactions = [...this.transactions]
            .sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate))
            .slice(0, 5);

        if (recentTransactions.length === 0) {
            container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No recent activities</p>';
            return;
        }

        container.innerHTML = recentTransactions.map(transaction => {
            const book = this.books.find(b => b.id === transaction.bookId);
            const member = this.members.find(m => m.id === transaction.memberId);
            const date = new Date(transaction.borrowDate).toLocaleDateString();
            
            return `
                <div class="activity-item">
                    <div style="font-weight: 600;">${member?.name || 'Unknown'} ${transaction.status === 'returned' ? 'returned' : 'borrowed'} "${book?.title || 'Unknown'}"</div>
                    <div class="activity-time">${date}</div>
                </div>
            `;
        }).join('');
    }

    renderPopularBooks() {
        const container = document.getElementById('popularBooksList');
        
        // Calculate borrow count for each book
        const bookBorrowCount = {};
        this.transactions.forEach(t => {
            bookBorrowCount[t.bookId] = (bookBorrowCount[t.bookId] || 0) + 1;
        });

        const popularBooks = this.books
            .map(book => ({
                ...book,
                borrowCount: bookBorrowCount[book.id] || 0
            }))
            .sort((a, b) => b.borrowCount - a.borrowCount)
            .slice(0, 5);

        if (popularBooks.length === 0) {
            container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No books available</p>';
            return;
        }

        container.innerHTML = popularBooks.map(book => `
            <div class="popular-item">
                <div style="font-weight: 600;">${book.title}</div>
                <div style="color: var(--text-secondary); font-size: 0.9rem;">by ${book.author}</div>
                <div class="popular-count">Borrowed ${book.borrowCount} times</div>
            </div>
        `).join('');
    }

    // Books Management
    renderBooks() {
        const tbody = document.getElementById('booksTableBody');
        const categoryFilter = document.getElementById('bookCategoryFilter')?.value || '';
        const statusFilter = document.getElementById('bookStatusFilter')?.value || '';
        
        let filteredBooks = this.books.filter(book => {
            if (categoryFilter && book.category !== categoryFilter) return false;
            if (statusFilter && book.status !== statusFilter) return false;
            return true;
        });

        if (filteredBooks.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No books found</td></tr>';
            return;
        }

        tbody.innerHTML = filteredBooks.map(book => `
            <tr>
                <td><span style="font-family: 'Space Mono', monospace;">${book.isbn}</span></td>
                <td><strong>${book.title}</strong></td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td><span class="status-badge ${book.status}">${book.status}</span></td>
                <td>
                    <button class="action-btn edit" onclick="library.editBook(${book.id})">Edit</button>
                    <button class="action-btn delete" onclick="library.deleteBook(${book.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    filterBooks(searchTerm) {
        const tbody = document.getElementById('booksTableBody');
        const filtered = this.books.filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No books found</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(book => `
            <tr>
                <td><span style="font-family: 'Space Mono', monospace;">${book.isbn}</span></td>
                <td><strong>${book.title}</strong></td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td><span class="status-badge ${book.status}">${book.status}</span></td>
                <td>
                    <button class="action-btn edit" onclick="library.editBook(${book.id})">Edit</button>
                    <button class="action-btn delete" onclick="library.deleteBook(${book.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    openBookModal(book = null) {
        const modal = document.getElementById('bookModal');
        const form = document.getElementById('bookForm');
        const title = document.getElementById('bookModalTitle');

        if (book) {
            title.textContent = 'Edit Book';
            document.getElementById('bookISBN').value = book.isbn;
            document.getElementById('bookTitle').value = book.title;
            document.getElementById('bookAuthor').value = book.author;
            document.getElementById('bookCategory').value = book.category;
            document.getElementById('bookPublisher').value = book.publisher || '';
            document.getElementById('bookYear').value = book.year || '';
            this.currentEditId = book.id;
        } else {
            title.textContent = 'Add New Book';
            form.reset();
            this.currentEditId = null;
        }

        modal.classList.add('active');
    }

    saveBook(e) {
        e.preventDefault();
        
        const bookData = {
            isbn: document.getElementById('bookISBN').value,
            title: document.getElementById('bookTitle').value,
            author: document.getElementById('bookAuthor').value,
            category: document.getElementById('bookCategory').value,
            publisher: document.getElementById('bookPublisher').value,
            year: parseInt(document.getElementById('bookYear').value) || null,
            status: 'available'
        };

        if (this.currentEditId) {
            const index = this.books.findIndex(b => b.id === this.currentEditId);
            this.books[index] = { ...this.books[index], ...bookData };
            this.showToast('Book updated successfully', 'success');
        } else {
            const newBook = {
                id: this.books.length > 0 ? Math.max(...this.books.map(b => b.id)) + 1 : 1,
                ...bookData
            };
            this.books.push(newBook);
            this.showToast('Book added successfully', 'success');
        }

        this.saveData();
        this.renderBooks();
        this.updateStats();
        this.closeModals();
    }

    editBook(id) {
        const book = this.books.find(b => b.id === id);
        if (book) this.openBookModal(book);
    }

    deleteBook(id) {
        if (confirm('Are you sure you want to delete this book?')) {
            this.books = this.books.filter(b => b.id !== id);
            this.saveData();
            this.renderBooks();
            this.updateStats();
            this.showToast('Book deleted successfully', 'success');
        }
    }

    // Members Management
    renderMembers() {
        const tbody = document.getElementById('membersTableBody');
        const statusFilter = document.getElementById('memberStatusFilter')?.value || '';
        
        let filteredMembers = this.members.filter(member => {
            if (statusFilter && member.status !== statusFilter) return false;
            return true;
        });

        if (filteredMembers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No members found</td></tr>';
            return;
        }

        tbody.innerHTML = filteredMembers.map(member => `
            <tr>
                <td><span style="font-family: 'Space Mono', monospace;">${member.memberId}</span></td>
                <td><strong>${member.name}</strong></td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>${member.borrowedBooks}</td>
                <td><span class="status-badge ${member.status}">${member.status}</span></td>
                <td>
                    <button class="action-btn edit" onclick="library.editMember(${member.id})">Edit</button>
                    <button class="action-btn delete" onclick="library.deleteMember(${member.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    filterMembers(searchTerm) {
        const tbody = document.getElementById('membersTableBody');
        const filtered = this.members.filter(member => 
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.memberId.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No members found</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(member => `
            <tr>
                <td><span style="font-family: 'Space Mono', monospace;">${member.memberId}</span></td>
                <td><strong>${member.name}</strong></td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>${member.borrowedBooks}</td>
                <td><span class="status-badge ${member.status}">${member.status}</span></td>
                <td>
                    <button class="action-btn edit" onclick="library.editMember(${member.id})">Edit</button>
                    <button class="action-btn delete" onclick="library.deleteMember(${member.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    openMemberModal(member = null) {
        const modal = document.getElementById('memberModal');
        const form = document.getElementById('memberForm');
        const title = document.getElementById('memberModalTitle');

        if (member) {
            title.textContent = 'Edit Member';
            document.getElementById('memberName').value = member.name;
            document.getElementById('memberEmail').value = member.email;
            document.getElementById('memberPhone').value = member.phone;
            document.getElementById('memberAddress').value = member.address || '';
            this.currentEditId = member.id;
        } else {
            title.textContent = 'Add New Member';
            form.reset();
            this.currentEditId = null;
        }

        modal.classList.add('active');
    }

    saveMember(e) {
        e.preventDefault();
        
        const memberData = {
            name: document.getElementById('memberName').value,
            email: document.getElementById('memberEmail').value,
            phone: document.getElementById('memberPhone').value,
            address: document.getElementById('memberAddress').value,
            borrowedBooks: 0,
            status: 'active'
        };

        if (this.currentEditId) {
            const index = this.members.findIndex(m => m.id === this.currentEditId);
            this.members[index] = { ...this.members[index], ...memberData };
            this.showToast('Member updated successfully', 'success');
        } else {
            const newMember = {
                id: this.members.length > 0 ? Math.max(...this.members.map(m => m.id)) + 1 : 1,
                memberId: `MEM${String(this.members.length + 1).padStart(3, '0')}`,
                ...memberData
            };
            this.members.push(newMember);
            this.showToast('Member added successfully', 'success');
        }

        this.saveData();
        this.renderMembers();
        this.updateStats();
        this.closeModals();
    }

    editMember(id) {
        const member = this.members.find(m => m.id === id);
        if (member) this.openMemberModal(member);
    }

    deleteMember(id) {
        if (confirm('Are you sure you want to delete this member?')) {
            this.members = this.members.filter(m => m.id !== id);
            this.saveData();
            this.renderMembers();
            this.updateStats();
            this.showToast('Member deleted successfully', 'success');
        }
    }

    // Transactions Management
    renderTransactions() {
        const tbody = document.getElementById('transactionsTableBody');
        const typeFilter = document.getElementById('transactionTypeFilter')?.value || '';
        
        let filteredTransactions = this.transactions.filter(transaction => {
            if (typeFilter && transaction.status !== typeFilter) return false;
            return true;
        });

        // Check for overdue books
        this.updateOverdueStatus();

        if (filteredTransactions.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No transactions found</td></tr>';
            return;
        }

        tbody.innerHTML = filteredTransactions.map(transaction => {
            const book = this.books.find(b => b.id === transaction.bookId);
            const member = this.members.find(m => m.id === transaction.memberId);
            
            return `
                <tr>
                    <td><span style="font-family: 'Space Mono', monospace;">${transaction.transactionId}</span></td>
                    <td><strong>${book?.title || 'Unknown'}</strong></td>
                    <td>${member?.name || 'Unknown'}</td>
                    <td>${new Date(transaction.borrowDate).toLocaleDateString()}</td>
                    <td>${new Date(transaction.dueDate).toLocaleDateString()}</td>
                    <td>${transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : '-'}</td>
                    <td><span class="status-badge ${transaction.status}">${transaction.status}</span></td>
                    <td>
                        ${transaction.status !== 'returned' ? 
                            `<button class="action-btn return" onclick="library.returnBook(${transaction.id})">Return</button>` : 
                            '<span style="color: var(--text-secondary);">Completed</span>'
                        }
                    </td>
                </tr>
            `;
        }).join('');
    }

    filterTransactions(searchTerm) {
        const tbody = document.getElementById('transactionsTableBody');
        const filtered = this.transactions.filter(transaction => {
            const book = this.books.find(b => b.id === transaction.bookId);
            const member = this.members.find(m => m.id === transaction.memberId);
            return book?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   member?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No transactions found</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(transaction => {
            const book = this.books.find(b => b.id === transaction.bookId);
            const member = this.members.find(m => m.id === transaction.memberId);
            
            return `
                <tr>
                    <td><span style="font-family: 'Space Mono', monospace;">${transaction.transactionId}</span></td>
                    <td><strong>${book?.title || 'Unknown'}</strong></td>
                    <td>${member?.name || 'Unknown'}</td>
                    <td>${new Date(transaction.borrowDate).toLocaleDateString()}</td>
                    <td>${new Date(transaction.dueDate).toLocaleDateString()}</td>
                    <td>${transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : '-'}</td>
                    <td><span class="status-badge ${transaction.status}">${transaction.status}</span></td>
                    <td>
                        ${transaction.status !== 'returned' ? 
                            `<button class="action-btn return" onclick="library.returnBook(${transaction.id})">Return</button>` : 
                            '<span style="color: var(--text-secondary);">Completed</span>'
                        }
                    </td>
                </tr>
            `;
        }).join('');
    }

    updateOverdueStatus() {
        const today = new Date();
        this.transactions.forEach(transaction => {
            if (transaction.status === 'borrowed') {
                const dueDate = new Date(transaction.dueDate);
                if (today > dueDate) {
                    transaction.status = 'overdue';
                }
            }
        });
        this.saveData();
    }

    openTransactionModal() {
        const modal = document.getElementById('transactionModal');
        const bookSelect = document.getElementById('transactionBook');
        const memberSelect = document.getElementById('transactionMember');

        // Populate available books
        const availableBooks = this.books.filter(b => b.status === 'available');
        bookSelect.innerHTML = '<option value="">Choose a book</option>' + 
            availableBooks.map(book => `<option value="${book.id}">${book.title} - ${book.author}</option>`).join('');

        // Populate active members
        const activeMembers = this.members.filter(m => m.status === 'active');
        memberSelect.innerHTML = '<option value="">Choose a member</option>' + 
            activeMembers.map(member => `<option value="${member.id}">${member.name} (${member.memberId})</option>`).join('');

        // Set default due date (14 days from now)
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + this.settings.loanPeriod);
        document.getElementById('transactionDueDate').value = dueDate.toISOString().split('T')[0];

        modal.classList.add('active');
    }

    saveTransaction(e) {
        e.preventDefault();
        
        const bookId = parseInt(document.getElementById('transactionBook').value);
        const memberId = parseInt(document.getElementById('transactionMember').value);
        const dueDate = document.getElementById('transactionDueDate').value;

        if (!bookId || !memberId) {
            this.showToast('Please select both book and member', 'error');
            return;
        }

        const member = this.members.find(m => m.id === memberId);
        if (member.borrowedBooks >= this.settings.maxBooks) {
            this.showToast(`Member has reached maximum borrowing limit (${this.settings.maxBooks} books)`, 'error');
            return;
        }

        const newTransaction = {
            id: this.transactions.length > 0 ? Math.max(...this.transactions.map(t => t.id)) + 1 : 1,
            transactionId: `TXN${String(this.transactions.length + 1).padStart(3, '0')}`,
            bookId: bookId,
            memberId: memberId,
            borrowDate: new Date().toISOString(),
            dueDate: new Date(dueDate).toISOString(),
            returnDate: null,
            status: 'borrowed'
        };

        this.transactions.push(newTransaction);

        // Update book status
        const book = this.books.find(b => b.id === bookId);
        if (book) book.status = 'borrowed';

        // Update member's borrowed books count
        if (member) member.borrowedBooks++;

        this.saveData();
        this.renderTransactions();
        this.updateStats();
        this.closeModals();
        this.showToast('Book issued successfully', 'success');
    }

    returnBook(id) {
        const transaction = this.transactions.find(t => t.id === id);
        if (transaction) {
            transaction.returnDate = new Date().toISOString();
            transaction.status = 'returned';

            // Update book status
            const book = this.books.find(b => b.id === transaction.bookId);
            if (book) book.status = 'available';

            // Update member's borrowed books count
            const member = this.members.find(m => m.id === transaction.memberId);
            if (member && member.borrowedBooks > 0) member.borrowedBooks--;

            this.saveData();
            this.renderTransactions();
            this.updateStats();
            this.showToast('Book returned successfully', 'success');
        }
    }

    // Settings Management
    loadSettings() {
        document.getElementById('libraryName').value = this.settings.libraryName;
        document.getElementById('maxBooks').value = this.settings.maxBooks;
        document.getElementById('loanPeriod').value = this.settings.loanPeriod;
        document.getElementById('lateFee').value = this.settings.lateFee;
    }

    saveSettings() {
        this.settings = {
            libraryName: document.getElementById('libraryName').value,
            maxBooks: parseInt(document.getElementById('maxBooks').value),
            loanPeriod: parseInt(document.getElementById('loanPeriod').value),
            lateFee: parseFloat(document.getElementById('lateFee').value)
        };
        
        this.saveData();
        this.showToast('Settings saved successfully', 'success');
    }

    resetData() {
        if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
            localStorage.clear();
            this.books = [];
            this.members = [];
            this.transactions = [];
            this.initializeSampleData();
            this.renderDashboard();
            this.renderBooks();
            this.renderMembers();
            this.renderTransactions();
            this.showToast('Data has been reset to demo data', 'success');
        }
    }

    // Utility Functions
    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        this.currentEditId = null;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Data Persistence
    saveData() {
        localStorage.setItem('libraryBooks', JSON.stringify(this.books));
        localStorage.setItem('libraryMembers', JSON.stringify(this.members));
        localStorage.setItem('libraryTransactions', JSON.stringify(this.transactions));
        localStorage.setItem('librarySettings', JSON.stringify(this.settings));
    }

    loadData() {
        const books = localStorage.getItem('libraryBooks');
        const members = localStorage.getItem('libraryMembers');
        const transactions = localStorage.getItem('libraryTransactions');
        const settings = localStorage.getItem('librarySettings');

        if (books) this.books = JSON.parse(books);
        if (members) this.members = JSON.parse(members);
        if (transactions) this.transactions = JSON.parse(transactions);
        if (settings) this.settings = JSON.parse(settings);
    }
}

// Initialize the application
let library;
document.addEventListener('DOMContentLoaded', () => {
    library = new LibraryManagementSystem();
});
