# app.py
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

SPOONACULAR_API_KEY = os.getenv('SPOONACULAR_API_KEY') # Replace with your actual key
BASE_API_URL = "https://api.spoonacular.com/recipes/complexSearch"

@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    try:
        params = request.args.to_dict()
        params['apiKey'] = SPOONACULAR_API_KEY
        
        # Convert number to integer
        if 'number' in params:
            params['number'] = int(params['number'])
            
        # Add default number if not specified
        params.setdefault('number', 4)
        
        response = requests.get(BASE_API_URL, params=params)
        response.raise_for_status()
        
        return jsonify(response.json())
    
    except ValueError:
        return jsonify({"error": "Invalid number parameter"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/recipes/<int:recipe_id>/ingredients', methods=['GET'])
def get_ingredients(recipe_id):
    try:
        # Make request to Spoonacular API for recipe information
        response = requests.get(
            f"https://api.spoonacular.com/recipes/{recipe_id}/information",
            params={
                'apiKey': SPOONACULAR_API_KEY,
                'includeNutrition': False
            }
        )
        response.raise_for_status()
        
        # Extract and format ingredients
        recipe_data = response.json()
        ingredients = [ingredient['original'] for ingredient in recipe_data.get('extendedIngredients', [])]
        
        return jsonify({
            "ingredients": ingredients
        })
    
    except requests.exceptions.RequestException as e:
        return jsonify({
            "error": "API request failed",
            "details": str(e)
        }), 500
    except Exception as e:
        return jsonify({
            "error": "Server error",
            "details": str(e)
        }), 500

@app.route('/api/recipes/<int:recipe_id>/instructions', methods=['GET'])
def get_instructions(recipe_id):
    try:
        response = requests.get(
            f"https://api.spoonacular.com/recipes/{recipe_id}/analyzedInstructions",
            params={
                'apiKey': SPOONACULAR_API_KEY,
                'stepBreakdown': request.args.get('stepBreakdown', 'true')
            }
        )
        response.raise_for_status()
        return jsonify(response.json())
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Server error"}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
