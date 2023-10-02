from __future__ import annotations
import json
from pathlib import Path
from uuid import uuid4
from .models import Issue, IssuePayload


class DataStorage:
    def __init__(self, storage_path: Path, seed_path: Path) -> None:
        self.storage_path = storage_path
        self.__seed_path = seed_path
        self.data: dict[str, Issue] = self._load_data()
        if not self.storage_path.is_file():
            self.commit()

    def _load_data(self) -> dict[str, Issue]:
        load_path = self.storage_path if self.storage_path.is_file() else self.__seed_path
        with load_path.open("r") as f:
            raw_data = json.loads(f.read())
            return {obj["id"]: Issue(**obj) for obj in raw_data}

    def commit(self) -> None:
        with self.storage_path.open("w") as f:
            data = [issue.model_dump() for issue in self.data.values()]
            f.write(json.dumps(data))

    def all(self) -> list[Issue]:
        return list(self.data.values())

    def add(self, issue: IssuePayload) -> Issue | None:
        id = str(uuid4())
        try:
            new_issue = Issue(
                id=id,
                title=issue.title,
                description=issue.description
            )
        except Exception:
            return None
        else:
            self.data[id] = new_issue
            self.commit()
            return new_issue

    def get(self, id: str) -> Issue | None:
        return self.data.get(id, None)

    def update(self, id: str, issue: IssuePayload) -> bool:
        if id not in self.data:
            return False
        obj = self.data[id]
        obj.title = issue.title
        obj.description = issue.description
        self.data[id] = obj
        self.commit()
        return True

    def delete(self, id: str) -> bool:
        if id not in self.data:
            return False
        del self.data[id]
        self.commit()
        return True
