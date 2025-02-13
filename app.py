from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:8000", "http://localhost:8000"],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class ChatMessage(BaseModel):
    text: str

@app.get("/init")
async def init_chat():
    return {"response": "Hello! I'm your map assistant. How can I help you today?"}

@app.post("/chat")
async def chat(message: ChatMessage):
    # Your existing chat logic here
    return {"response": f"I received your message: {message.text}"} 