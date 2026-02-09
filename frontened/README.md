## Bibliotheca - Library Management System

A beautiful, modern library management system built with vanilla HTML, CSS, and JavaScript. Features a sophisticated design with full CRUD operations for books, members, and transactions.

## Features

### Dashboard
- Real-time statistics (total books, active members, borrowed books, overdue items)
- Recent activity feed
- Popular books tracker
- Elegant data visualization

###  Book Management
- Add, edit, and delete books
- Search and filter by category, status, author, or ISBN
- Track book availability
- ISBN-based cataloging

###  Member Management
- Register and manage library members
- Track borrowing history
- Active/Inactive member status
- Member search and filtering

###  Transaction System
- Issue and return books
- Automatic overdue detection
- Transaction history
- Due date tracking
- Borrowing limits enforcement

###  Settings
- Configure library information
- Set borrowing rules (max books, loan period)
- Manage late fees
- Reset demo data

##  Design Features

- **Aesthetic Design**: Sophisticated library-themed color palette with gold accents
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Modern Typography**: Beautiful font combinations (Playfair Display + Space Mono + Inter)
- **Data Persistence**: Uses localStorage to save all data
- **Toast Notifications**: User-friendly feedback system

##  Project Structure

```
library-management-system/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── app.js             # Application logic and functionality
├── README.md          # Project documentation
├── SETUP.md           # Setup instructions
└── FILE_STRUCTURE.md  # Detailed file structure guide
```

##  Quick Start

1. **Download the project files**
   - Download all files to a folder on your computer

2. **Open in browser**
   - Simply open `index.html` in any modern web browser
   - No server or build process required!

3. **Start using**
   - The app comes pre-loaded with sample data
   - Navigate through different sections using the sidebar
   - Try adding books, members, and creating transactions

##  Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, animations
- **Vanilla JavaScript**: ES6+ features, no frameworks
- **LocalStorage**: Client-side data persistence

##  Usage Guide

### Adding a Book
1. Click "Books" in the sidebar
2. Click "+ Add Book" button
3. Fill in the book details (ISBN, title, author, category)
4. Click "Save Book"

### Registering a Member
1. Click "Members" in the sidebar
2. Click "+ Add Member" button
3. Enter member information
4. Click "Save Member"

### Issuing a Book
1. Click "Transactions" in the sidebar
2. Click "+ New Transaction" button
3. Select a book and member
4. Set the due date
5. Click "Issue Book"

### Returning a Book
1. Go to "Transactions"
2. Find the active transaction
3. Click "Return" button

## 🔧 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #2D3E50;
    --accent: #C9A961;
    /* ... more colors */
}
```

### Settings
Adjust library rules in the Settings page:
- Maximum books per member
- Loan period (days)
- Late fee amount

### Sample Data
Reset or modify sample data in `app.js`:
```javascript
initializeSampleData() {
    // Edit the sample books, members, and transactions
}
```

##  Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

##  Known Limitations

- Data is stored in browser localStorage (cleared when cache is cleared)
- No backend/database integration (client-side only)
- No authentication system
- Single-user application

##  Future Enhancements

- Export data to CSV/PDF
- Print book labels and member cards
- Advanced search with filters
- Book reservation system
- Email notifications for due dates
- Multi-language support
- Dark mode toggle

##  License

This project is open source and available for educational purposes.

##  Contributing

Feel free to fork, modify, and use this project for your own purposes!

##  Support

For questions or issues, please refer to the documentation files or modify the code to suit your needs.

---

**Built with ❤️ for library enthusiasts**

## Live Demo 
http://127.0.0.1:5500/frontened/index.html

