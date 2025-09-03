from pydantic import BaseModel, Field, ConfigDict
from app.helpers.py_objectid import PyObjectId

class TodoInDB(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    task: str = Field(..., min_length=1, max_length=50)
    completed: bool = False

    model_config=ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={PyObjectId:str}
    )