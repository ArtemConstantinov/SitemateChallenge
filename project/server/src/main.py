from __future__ import annotations
from typing import Union, Generator
from uuid import UUID
from loguru import logger
from fastapi import Depends, FastAPI

from .components.models import Issue, IssuePayload
from .components import reader
from . import const

app = FastAPI()

## Not very good sollution


def get_storage() -> Generator[reader.DataStorage, None, None]:
    storage = reader.DataStorage(
        storage_path=const.STORAGE_PATH,
        seed_path=const.DATA_SEED_PATH
    )
    try:
        yield storage
    finally:
        pass


@app.get("/issues")
def issues_list(storage: reader.DataStorage = Depends(get_storage)) -> list[Issue]:
    return storage.all()


@app.post("/issues/{item_id}", response_model=Union[Issue, None])
def issue_create(item_id: UUID, issue: IssuePayload, storage: reader.DataStorage = Depends(get_storage)):
    # Create: accepts a JSON object & prints/logs the object
    obj = storage.add(issue)
    if obj:
        logger.info(f"Added new Issue {obj}")
    return obj


@app.get("/issues/{item_id}", response_model=Union[Issue, None])
def issue_retreave(item_id: UUID, storage: reader.DataStorage = Depends(get_storage)):
    # Read: returns a static JSON object
    return storage.get(str(item_id))


@app.put("/issues/{item_id}")
def issue_update(item_id: UUID, issue: IssuePayload, storage: reader.DataStorage = Depends(get_storage)):
    # Update: accepts a JSON object & prints/logs the object
    state = storage.update(str(item_id), issue)
    if state:
        logger.info(f"Issue <{item_id}> was updated to values {issue}")
    return {
        "item_id": item_id,
        "success": state
    }


@app.delete("/issues/{item_id}")
def issue_delete(item_id: UUID, storage: reader.DataStorage = Depends(get_storage)):
    # Delete: prints/logs out the object or id to delete
    state = storage.delete(str(item_id))
    if state:
        logger.info(f"Issue <{item_id}> was deleted.")
    return {
        "item_id": item_id,
        "success": state
    }
