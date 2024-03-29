from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from flask import jsonify
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import cv2
from keras.utils import img_to_array
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = tf.keras.models.load_model("dementia.h5")

CLASS_NAMES = ["MildDemented", "ModerateDemented", "NonDemented", "VeryMildDemented"]

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    image = cv2.resize(image, (256, 256))
    # add the following line to ensure that the image has 3 channels
    image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB) if len(image.shape) < 3 else cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    return image


@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
     # Check if the uploaded file is a JPG image
    if file.content_type != "image/jpeg":
        raise HTTPException(status_code = 400, detail = "Only JPEG images (MRI) are allowed.")
    
    image = read_file_as_image(await file.read())
    
    predictions = MODEL.predict(image)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)