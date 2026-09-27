from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path


# ==========================================
# APP
# ==========================================

app = FastAPI(
    title="Sweet Scoop API",
    description="Backend API for Sweet Scoop Ice Cream Parlor",
    version="1.0.0"
)


# ==========================================
# PATHS
# ==========================================

BASE_DIR = Path(__file__).resolve().parent.parent

PUBLIC_DIR = BASE_DIR / "public"

INDEX_FILE = PUBLIC_DIR / "index.html"


# ==========================================
# STATIC FILES
# ==========================================

app.mount(
    "/static",
    StaticFiles(directory=PUBLIC_DIR),
    name="static"
)


# ==========================================
# ICE CREAM DATA
# ==========================================

ice_creams = [
    {
        "id": 1,
        "name": "Vanilla Dream",
        "description": "Classic creamy vanilla ice cream.",
        "price": 99
    },
    {
        "id": 2,
        "name": "Strawberry Bliss",
        "description": "Fresh strawberry flavored ice cream.",
        "price": 119
    },
    {
        "id": 3,
        "name": "Chocolate Heaven",
        "description": "Rich chocolate ice cream for chocolate lovers.",
        "price": 129
    },
    {
        "id": 4,
        "name": "Mango Magic",
        "description": "Sweet and refreshing mango ice cream.",
        "price": 109
    }
]


# ==========================================
# FRONTEND ROUTE
# ==========================================

@app.get("/")
def serve_frontend():
    return FileResponse(INDEX_FILE)


# ==========================================
# API ROUTES
# ==========================================

@app.get("/api")
def home():
    return {
        "message": "Welcome to Sweet Scoop Ice Cream Parlor!",
        "status": "API is running"
    }


@app.get("/api/menu")
def get_menu():
    return {
        "items": ice_creams
    }


@app.get("/api/menu/{item_id}")
def get_menu_item(item_id: int):

    for item in ice_creams:

        if item["id"] == item_id:
            return item

    return {
        "error": "Ice cream not found"
    }