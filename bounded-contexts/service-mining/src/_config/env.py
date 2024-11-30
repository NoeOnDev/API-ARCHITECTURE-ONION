from pydantic_settings import BaseSettings
from pydantic import Field, ValidationError
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PORT: int = Field(..., env='PORT')
    RABBITMQ_URL: str = Field(..., env='RABBITMQ_URL')

    class Config:
        env_file = '.env'

try:
    settings = Settings()
except ValidationError as e:
    raise RuntimeError(f"Config validation error: {e}")