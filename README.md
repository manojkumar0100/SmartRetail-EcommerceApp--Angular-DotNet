# 🛍️ SmartRetail – Full Stack E-Commerce Application

SmartRetail is a comprehensive, full-stack **E-Commerce platform** built using **Angular** for the frontend and **ASP.NET Web API** with **Entity Framework** for the backend. It supports authentication, product browsing, invoice generation, and admin panel features.

---

## 📁 Project Folder Structure

```
SmartRetail/
│
├── SmartRetailClient/                    # Angular frontend
│   ├── src/
│   ├── angular.json
│   └── ...
│
└── SmartRetailServer/                    # ASP.NET Web API backend
    ├── SmartRetailServer/               # API project
    │   ├── Controllers/
    │   ├── Models/
    │   ├── Properties/
    │   └── Program.cs, Startup.cs, ...
    │
    └── SmartRetailsDAL/                 # Entity Framework DAL project
        ├── Context/
        ├── Migrations/
        ├── Repositories/
        └── SmartRetailDbContext.cs
```

---

## ✅ Tech Stack

### Frontend (SmartRetailClient)
- Angular 15+
- TypeScript, HTML, SCSS/CSS
- Angular Routing & Guards
- Angular Services & Interceptors
- JWT Authentication
- Bootstrap / Tailwind CSS

### Backend (SmartRetailServer)
- .NET 6 / ASP.NET Web API
- Entity Framework Core (Code First)
- MS SQL Server
- RESTful API architecture
- CORS configuration

### DAL (SmartRetailsDAL)
- Repository pattern
- DbContext, Code First migrations
- Layered architecture (Separation of Concerns)

### Tools & DevOps
- Swagger & Postman for testing
- Git & GitHub for version control
- Visual Studio & VS Code

---

## 🚀 Features

- 👤 JWT-based user authentication
- 🛒 Shopping cart functionality
- 🧾 Dynamic invoice generation (PDF)
- 🔐 Role-based access (Admin/User)
- 📦 Admin CRUD operations for products
- 🔍 Product search and filtering
- 📈 Responsive design for mobile & desktop

---

## 🔧 How to Run the Project

### 🧱 Backend Setup (SmartRetailServer + SmartRetailsDAL)

1. Open `SmartRetailServer/SmartRetailServer.sln` in **Visual Studio**
2. Configure the connection string in `appsettings.json`:

```
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SQL_SERVER;Database=SmartRetailDb;Trusted_Connection=True;"
}
```

3. Run migrations:

```bash
Update-Database
```

4. Run the API:

```bash
dotnet run
```

The Web API will be hosted at: `https://localhost:5001/api`

You can test APIs using **Swagger** at `https://localhost:5001/swagger/index.html`

---

### 🌐 Frontend Setup (SmartRetailClient)

1. Navigate to frontend folder:

```bash
cd SmartRetailClient
```

2. Install dependencies:

```bash
npm install
```

3. Start the Angular development server:

```bash
ng serve
```

Frontend available at: `http://localhost:4200`

---

## 🧾 Invoice Generation

- Orders generate a downloadable PDF invoice using `jspdf` or similar Angular libraries.

---

## 🧑‍💼 Admin Panel

- Role-based admin access using Angular route guards
- Admin functionalities:
  - Product management (Create, Edit, Delete)
  - Order tracking
  - User role verification

---

## 🔐 Authentication Flow

- JWT Tokens issued on login and stored in `localStorage`
- API endpoints protected using token middleware
- Angular interceptors add JWT to HTTP headers automatically

---

## 📄 Database Schema

Entities:
- `Users` (Id, Name, Email, Password, Role)
- `Products` (Id, Name, Description, Price, Stock)
- `Orders` (Id, UserId, Date, Total)
- `OrderItems` (Id, OrderId, ProductId, Quantity, Price)

---

## 💻 Developer Notes

- Use `Swagger` or `Postman` to test backend APIs
- DAL project uses Repository pattern for clean code separation
- Ensure DB connection and EF migration before running server

---

## 📸 Screenshots (Optional)

```
client/src/assets/screenshots/login.png
client/src/assets/screenshots/products.png
client/src/assets/screenshots/invoice.png
```

Use markdown to show screenshots on GitHub page.

---

## 📬 Contact

**Tanguturi Manoj Kumar Reddy**  
📧 20bcs225@iiitdmj.ac.in  
📱 +91 7989411075  

---

## 📄 License

MIT License

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📌 Deployment Tips

- Host Angular app on Vercel, Netlify, or Azure Static Web Apps
- Host Web API on Azure App Services or Render
- Use Azure SQL or hosted SQL Server for the database
