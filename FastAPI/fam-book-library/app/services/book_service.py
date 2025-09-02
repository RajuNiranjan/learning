from typing import List, Optional, Dict
from bson import ObjectId
from app.schemas.book_schema import BookCreate, BookUpdate
from app.models.book_model import BookInDb
from fastapi import HTTPException, status
from app.core.db import book_collection

async def create_book(book: BookCreate) -> BookInDb:
    try:
        new_book = book.model_dump()
        result = await book_collection.insert_one(new_book)
        if not result.inserted_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to insert book"
            )
        created_book = await book_collection.find_one({"_id": result.inserted_id})
        if not created_book:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Book not found after creation"
            )
        return BookInDb(**created_book)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )

async def get_books() -> List[BookInDb]:
    try:
        cursor = book_collection.find()
        books_list = await cursor.to_list(length=None)
        return [BookInDb(**b) for b in books_list]

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )

async def get_book(book_id:str) -> BookInDb:
    try:
        if not ObjectId.is_valid(book_id):
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid book ID"
        )

        book = await book_collection.find_one({"_id": ObjectId(book_id)})

        if not book:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Todo not found"
            )

        return BookInDb(**book)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}")
    
async def update_book(book_id: str, book: BookUpdate) -> BookInDb:
    try:
        update_data: Dict = {k: v for k, v in book.model_dump().items() if v is not None}

        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No data provided for update"
            )

        await book_collection.update_one(
            {"_id": ObjectId(book_id)},
            {"$set": update_data}
        )

        updated_book = await book_collection.find_one({"_id": ObjectId(book_id)})
        return BookInDb(**updated_book)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )
    
async def delete_book(book_id: str):
    try:
        if not ObjectId.is_valid(book_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid book ID"
            )

        result = await book_collection.delete_one({"_id": ObjectId(book_id)})

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Book not found"
            )

        return {"message": "Book deleted successfully"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )