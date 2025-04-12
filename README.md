# 🎯 Background Hatao

<div align="center">

![Background Hatao](https://img.shields.io/badge/Background-Hatao-blue?style=for-the-badge)
![Made with Love](https://img.shields.io/badge/Made%20with-Love-red?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

A sleek and modern background removal tool with a desi twist! 🚀
</div>

## 🌟 Features

- 🎯 Quick and accurate background removal
- 🖼️ Support for multiple image formats (PNG, JPG, JPEG)
- 📱 Responsive design for all devices
- ⚡ Real-time processing with progress indicators
- 🎨 Beautiful UI with smooth animations
- 📦 Batch processing with ZIP download
- 🌈 Modern glassmorphism design

## 🛠️ Tech Stack

- **Frontend:**
  - React.js
  - Material-UI (MUI)
  - Axios for API calls
  - JSZip for batch downloads

- **Backend:**
  - Python
  - Flask
  - rembg for background removal
  - PIL for image processing
  - PyTorch for ML operations

## 🚀 Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn
- Git

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dhruvmarathe18/background-remover.git
   cd background-remover
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
   This will install all required packages including:
   - Flask and Flask-CORS for the API
   - rembg for background removal
   - Pillow for image processing
   - PyTorch and torchvision for ML operations
   - Other supporting libraries

4. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend will run on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to the project root:
   ```bash
   cd background-remover
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will open in your browser at http://localhost:3000

## 🎮 Usage

1. Drop your images in the upload area or click to select files
2. Click "Background ko Goal karo! ⚽" to start processing
3. Wait for the magic to happen ✨
4. Download your processed images individually or as a ZIP

## 💡 Pro Tips

- For best results, use images with clear subjects
- Maximum 5 images can be processed at once
- Supported formats: PNG, JPG, JPEG
- The clearer the subject-background contrast, the better the result
- Make sure both backend and frontend servers are running
- First time startup might be slower as the ML models are downloaded

## 🤝 Contributing

Feel free to contribute to this project! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👩‍💻 Author

**Srushti Tambe**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/srushti-tambe)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/srushti-tambe)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [rembg](https://github.com/danielgatis/rembg) for the amazing background removal tool
- Material-UI team for the beautiful components
- All the chai ☕ that kept me going during development

---

<div align="center">
Made with ❤️ by Srushti Tambe | The developer who spends more time removing backgrounds than writing actual code 😅
</div>
