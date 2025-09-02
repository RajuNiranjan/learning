from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum


class GenreEnum(str, Enum):
    fiction = "Fiction"
    nonfiction = "Non-Fiction"
    fantasy = "Fantasy"
    science = "Science"
    biography = "Biography"
    history = "History"


class BookBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100, description="Title of the book")
    description: Optional[str] = Field(None, max_length=500, description="Short description of the book")
    author: Optional[str] = Field(None, max_length=100, description="Author of the book")
    price: float = Field(..., gt=0, description="Price of the book, must be greater than 0")
    genre: GenreEnum = Field(..., description="Genre/category of the book")

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    author: Optional[str]
    price: Optional[float]
    genre: Optional[GenreEnum]