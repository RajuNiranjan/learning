from bson import ObjectId
from pydantic_core import core_schema
from pydantic.json_schema import JsonSchemaValue


class PyObjectId(ObjectId):

    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return v
        if isinstance(v, str) and ObjectId.is_valid(v):
            return ObjectId(v)
        raise ValueError("Invalid ObjectId")
    
    @classmethod
    def __get_pydantic_core_schema__(cls, _source_type, _handler):
        return core_schema.no_info_after_validator_function(
            cls.validate,
            core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.str_schema()
            ])
        )
    
    @classmethod
    def __get_pydantic_json_schema__(cls, schema: core_schema.CoreSchema, handler) -> JsonSchemaValue:
        json_schema = handler(schema)
        json_schema.update(type='string')
        return json_schema