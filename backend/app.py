from flask import Flask, request, send_file
from flask_cors import CORS
from rembg import remove
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/remove-background', methods=['POST'])
def remove_background():
    if 'file' not in request.files:
        return {'error': 'No file provided'}, 400
    
    file = request.files['file']
    if file.filename == '':
        return {'error': 'No file selected'}, 400
    
    # Read the image
    input_image = Image.open(file.stream)
    
    # Remove background
    output_image = remove(input_image)
    
    # Convert to bytes
    img_byte_arr = io.BytesIO()
    output_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    
    return send_file(
        img_byte_arr,
        mimetype='image/png',
        as_attachment=True,
        download_name=f"{os.path.splitext(file.filename)[0]}_nobg.png"
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000) 