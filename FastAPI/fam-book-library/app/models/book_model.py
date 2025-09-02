from pydantic import BaseModel, Field, ConfigDict
from app.helper.py_objectid import PyObjectId
from app.schemas.book_schema import GenreEnum

class BookInDb(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    description: str | None = None
    author: str | None = None
    price: float
    genre: GenreEnum

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={PyObjectId:str}
    )