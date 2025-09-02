from fastapi import APIRouter
from typing import List, Dict
from app.services.book_service import create_book, get_book, get_books, update_book, delete_book
from app.schemas.book_schema import BookCreate, BookUpdate
from app.models.book_model import BookInDb

book_route = APIRouter(
    prefix='/books',
    tags=["Books"]
)


@book_route.post('/')
async def Create_Book(book:BookCreate) -> BookInDb:
    return await create_book(book)


@book_route.get('/')
async def Get_Books() -> List[BookInDb]:
    return await get_books()


@book_route.get('/{book_id}')
async def Get_Book(book_id:str) -> BookInDb:
    return await get_book(book_id)


@book_route.patch('/{book_id}')
async def Update_Book(book_id:str, book:BookCreate) -> BookInDb:
    return await update_book(book_id, book)


@book_route.delete('/{book_id}')
async def Delete_Book(book_id:str):
    return await delete_book(book_id)

