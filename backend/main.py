from typing import List, Optional
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime, timedelta
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
import json  # Add this import at the top

load_dotenv()
DB_URL = os.getenv("DB_URL")

# Security configurations
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


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
    restaurant_id: Optional[str] = None


class Restaurant(BaseModel):
    name: str
    nit: str
    address: str
    contact_person: str
    phone: str
    email: str
    city: str
    plan: str = "goupromo"


class UserCreate(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    email: str
    phone_number: str
    city: str
    user_type: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserLogin(BaseModel):
    username: str
    password: str


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
            cur.execute(
                """
                SELECT 
                    i.*,
                    r.name as restaurant_name,
                    r.website_url,
                    r.primary_address,
                    r.primary_contact,
                    r.phone_number as restaurant_phone,
                    r.email as restaurant_email,
                    r.city,
                    r.logo_url
                FROM public.items i
                LEFT JOIN public.restaurants r ON i.restaurant_id = r.id
            """
            )
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
                INSERT INTO public.items (
                    item_type, description, item_number, original_price,
                    offer_price, quantity, start_time, end_time, image_url,
                    unit_weight, delivery_included, delivery_fee, status, restaurant_id
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                item.restaurant_id,
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
    print("Received item data:", item.model_dump_json(indent=2))
    try:
        return await add_item(item)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/items/restaurant/{restaurant_id}")
async def get_items_by_restaurant(restaurant_id: str):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT 
                    i.*,
                    r.name as restaurant_name,
                    r.website_url,
                    r.primary_address,
                    r.primary_contact,
                    r.phone_number as restaurant_phone,
                    r.email as restaurant_email,
                    r.city,
                    r.logo_url
                FROM public.items i
                LEFT JOIN public.restaurants r ON i.restaurant_id = r.id
                WHERE i.restaurant_id = %s
                """,
                (restaurant_id,),
            )
            items = cur.fetchall()
            return [dict(item) for item in items]
    finally:
        conn.close()


# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def authenticate_user(username: str, password: str):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE username = %s", (username,))
            user = cur.fetchone()
            if not user:
                return False
            if not verify_password(password, user["password"]):
                return False
            return user
    finally:
        conn.close()


# New API endpoints
@app.post("/signup", response_model=dict)
async def signup(user: UserCreate):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            # Check if username already exists
            cur.execute("SELECT id FROM users WHERE username = %s", (user.username,))
            if cur.fetchone():
                raise HTTPException(status_code=400, detail="El usuario ya existe")

            hashed_password = get_password_hash(user.password)
            query = """
                INSERT INTO users (username, password, first_name, last_name, 
                                 email, phone_number, city, user_type)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, username, first_name, last_name, email, phone_number, city, user_type
            """
            values = (
                user.username,
                hashed_password,
                user.first_name,
                user.last_name,
                user.email,
                user.phone_number,
                user.city,
                user.user_type,
            )
            cur.execute(query, values)
            conn.commit()
            new_user = dict(cur.fetchone())
            return new_user
    finally:
        conn.close()


@app.post("/login")
async def login(user_credentials: UserLogin):
    user = await authenticate_user(user_credentials.username, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user["username"]})

    # Return both token and user data
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user["username"],
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "email": user["email"],
        "phone_number": user["phone_number"],
        "city": user["city"],
        "user_type": user["user_type"],
        "id": user["id"],
    }


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE username = %s", (username,))
            user = cur.fetchone()
            if user is None:
                raise credentials_exception
            return user
    finally:
        conn.close()


@app.post("/restaurant/register/{user_id}", response_model=dict)
async def register_restaurant(user_id: str, restaurant: Restaurant):
    print("Received restaurant data:", restaurant.model_dump_json(indent=2))
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            # First check if user exists
            cur.execute("SELECT id FROM users WHERE id = %s", (user_id,))
            user = cur.fetchone()
            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            # Insert restaurant data
            query = """
                INSERT INTO restaurants (
                    name, primary_address, primary_contact, phone_number,
                    email, city, user_id
                ) VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING *
            """
            # Transform the flat data into the required JSONB structure and convert to JSON strings
            address_json = json.dumps({"address": restaurant.address})
            contact_json = json.dumps(
                {"name": restaurant.contact_person, "nit": restaurant.nit}
            )

            values = (
                restaurant.name,
                address_json,
                contact_json,
                restaurant.phone,
                restaurant.email,
                restaurant.city,
                user_id,
            )
            cur.execute(query, values)
            conn.commit()
            new_restaurant = dict(cur.fetchone())
            return new_restaurant
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


@app.get("/restaurant/user/{user_id}")
async def get_restaurant_by_user_id(user_id: str):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM restaurants WHERE user_id = %s", (user_id,))
            restaurant = cur.fetchone()
            if not restaurant:
                raise HTTPException(status_code=404, detail="Restaurant not found")
            return dict(restaurant)
    finally:
        conn.close()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
