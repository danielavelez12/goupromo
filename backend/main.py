from typing import List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
DB_URL = os.getenv("DB_URL")

class Item(BaseModel):
    item_type: str
    description: str
    item_number: str
    original_price: int
    offer_price: int
    quantity: int
    start_time: datetime
    end_time: datetime
    image_url: str
    unit_weight: int
    delivery_included: bool
    delivery_fee: int
    status: str


class Restaurant(BaseModel):
    name: str
    address: str
    phone: str
    email: str


def get_db_connection():
    try:
        conn = psycopg2.connect(DB_URL, cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        raise Exception(f"Database connection error: {str(e)}")


async def get_all_items() -> List[dict]:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM public.item")
            items = cur.fetchall()
            return [dict(item) for item in items]
    finally:
        conn.close()


async def get_all_restaurants() -> List[dict]:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM public.restaurants")
            restaurants = cur.fetchall()
            return [dict(restaurant) for restaurant in restaurants]
    finally:
        conn.close()


async def add_item(item: Item) -> dict:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            query = """
                INSERT INTO public.item (
                    item_type, description, item_number, original_price,
                    offer_price, quantity, start_time, end_time, image_url,
                    unit_weight, delivery_included, delivery_fee, status
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *
            """
            values = (
                item.item_type,
                item.description,
                item.item_number,
                item.original_price,
                item.offer_price,
                item.quantity,
                item.start_time,
                item.end_time,
                item.image_url,
                item.unit_weight,
                item.delivery_included,
                item.delivery_fee,
                item.status,
            )
            cur.execute(query, values)
            conn.commit()
            return dict(cur.fetchone())
    finally:
        conn.close()


# FastAPI app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API routes
@app.get("/")
async def root():
    return {"message": "API is running"}


@app.get("/items", response_model=List[dict])
async def get_items():
    try:
        return await get_all_items()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/restaurants", response_model=List[dict])
async def get_restaurants():
    try:
        return await get_all_restaurants()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/items", response_model=dict)
async def create_item(item: Item):
    try:
        return await add_item(item)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
