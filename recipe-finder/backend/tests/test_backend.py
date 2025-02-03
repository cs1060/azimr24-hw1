import pytest
from backend import app
import requests_mock

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_recipes_endpoint(client, requests_mock):
    # Mock Spoonacular response
    mock_response = {
        "results": [{"id": 1, "title": "Test Recipe"}],
        "totalResults": 1
    }
    requests_mock.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        json=mock_response
    )

    response = client.get('/api/recipes?query=pasta&number=2')
    assert response.status_code == 200
    assert b"Test Recipe" in response.data

def test_invalid_number_parameter(client):
    response = client.get('/api/recipes?number=not_a_number')
    assert response.status_code == 400
    assert b"Invalid number parameter" in response.data

def test_ingredients_endpoint(client, requests_mock):
    mock_ingredients = {
        "extendedIngredients": [{"original": "Test Ingredient"}]
    }
    requests_mock.get(
        "https://api.spoonacular.com/recipes/123/information",
        json=mock_ingredients
    )
    
    response = client.get('/api/recipes/123/ingredients')
    assert response.status_code == 200
    assert b"Test Ingredient" in response.data

def test_instructions_endpoint(client, requests_mock):
    mock_instructions = [{
        "steps": [{"number": 1, "step": "Test Step"}]
    }]
    requests_mock.get(
        "https://api.spoonacular.com/recipes/123/analyzedInstructions",
        json=mock_instructions
    )
    
    response = client.get('/api/recipes/123/instructions')
    assert response.status_code == 200
    assert b"Test Step" in response.data