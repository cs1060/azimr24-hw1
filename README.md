# azimr24-hw1 - Recipe Finder

Full-stack recipe search application using React and Flask with Spoonacular API integration.

## Setup

### API
Go to [spoonacular.com](https://spoonacular.com/food-api/console#Dashboard) and create an account. Get the api key and place it into a
.env file with the following structure: 

SPOONACULAR_API_KEY=your-api-key
FLASK_ENV=development

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate    # Windows
pip install -r requirements.txt
python app.py
```

Run backend test suite with

```bash
cd backend
python -m pytest tests/
```



### Frontend
```bash
cd frontend
npm install
npm start
```

Run frontend test suite with

```bash
npm test
```

Running the above code for backend and frontend in your terminal should run the website on localhost:3000.

### Project Reflection
I did my project alone and it took me about 6 hours. Some issues I had was with the routes and Flask backend, particularly port issues and CORS policy. Creating tests was also very diffiuclt because of library issues and deprecations in javascript.

Google Drive Link [here.](https://drive.google.com/file/d/1Y0CCqrlM88_bmGcjUVo-07DuEYV9FyRl/view?usp=sharing)
