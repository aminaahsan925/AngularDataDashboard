# 📊 DataWhisper Analytics Dashboard

Professional CSV data analysis tool built with Angular 22. Upload any CSV file and get instant insights with beautiful visualizations

**🔗 Live Demo:** https://aminaahsan925.github.io/AngularDataDashboard/
---

## ✨ Features

- **📤 Drag & Drop Upload** - Upload CSV files instantly
- **📊 Auto Statistics** - Get rows, columns, data types automatically
- **📈 Interactive Charts** - Beautiful bar charts for visualization
- **🔍 Search & Filter** - Search across all data instantly
- **📥 Export Results** - Download analyzed data as CSV
- **🎨 Dark/Light Mode** - Choose your preferred theme
- **⚡ Lightning Fast** - Works 100% in browser, no server needed
- **📱 Responsive** - Works on desktop, tablet, mobile

---

## 🛠️ Tech Stack

- **Frontend:** Angular 22
- **Charts:** Chart.js + ng2-charts
- **CSV Parsing:** PapaParse
- **Styling:** CSS3 (Dark/Light themes)
- **Deployment:** GitHub Pages
- **Language:** TypeScript

---

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npx ng serve

# Open browser
http://localhost:4200
```

### Build for Production

```bash
npx ng build --configuration production
```

---

## 📖 How to Use

1. **Upload CSV** - Drag and drop or click to select
2. **View Statistics** - See rows, columns, data types
3. **Analyze Data** - Switch between columns to view different charts
4. **Search Data** - Use search box to filter rows
5. **Export** - Click download button to get CSV results

---

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/aminaahsan925/AngularDataDashboard.git

# Navigate to project
cd AngularDataDashboard

# Install dependencies
npm install

# Install additional packages
npm install chart.js ng2-charts papaparse
npm install --save-dev @types/papaparse

# Start server
npx ng serve
```

---

## 🎨 Features Explained

### Data Statistics
Automatically calculates:
- Total rows and columns
- Missing values count
- Data type detection (number, text, date)
- Unique values per column
- Min, Max, Average for numbers

### Interactive Charts
- Bar charts showing top values
- Customizable by selecting any column
- Dark/Light mode compatible
- Real-time updates

### Search & Filter
- Full-text search across all data
- Instant results
- Works on all columns
- Reset functionality

### Export
- Download analyzed results as CSV
- Preserves formatting
- Ready for further analysis

---

## 🔧 Configuration

### Theme Settings
Stored in `localStorage` — automatically saves your preference

### Chart Options
Configured in `dashboard.component.ts`:
- Chart type: Bar (can be extended to Pie, Line)
- Colors: Purple/Cyan gradient theme
- Responsive sizing

---

## 📊 File Structure
src/

├── app/

│   ├── components/

│   │   ├── upload/          # File upload component

│   │   └── dashboard/       # Statistics & charts

│   ├── services/

│   │   └── csv.service.ts   # CSV parsing & analysis

│   ├── app.ts               # Main component

│   ├── app.html             # Main template

│   └── app.css              # Global styles

└── main.ts
---

## 🎯 Use Cases

- **Students:** Learn data analysis
- **Businesses:** Quick data insights
- **Analysts:** CSV data exploration
- **Freelancers:** Client deliverables
- **Researchers:** Data visualization

---

## 🚀 Deployment

Deployed on **GitHub Pages** — automatically updates when you push to `main` branch.

To deploy:
```bash
npx ng build --configuration production --base-href="/AngularDataDashboard/"
npx ngh --dir=dist/angular-data-dashboard/browser
```

---

## 💡 Future Features

- [ ] Multi-file analysis
- [ ] Advanced statistical analysis
- [ ] PDF export
- [ ] Real-time collaboration
- [ ] AI insights with Claude API
- [ ] Database integration

---

## 📄 License

MIT License - Free to use and modify

---

## 👨‍💻 Author

**Amina Ahsan**
- GitHub: [@aminaahsan925](https://github.com/aminaahsan925)
- Email:  aminaahsan5678@gmail.com
- Location: Lahore, Pakistan

---

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Chart.js for visualization
- PapaParse for CSV handling
- Community for feedback

---

## 📞 Contact & Feedback

Found a bug? Have a suggestion?
Open an issue on GitHub or reach out directly!

---

**⭐ If you find this useful, please star the repository!**
