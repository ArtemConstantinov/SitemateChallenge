from pydantic import BaseModel


class IssuePayload(BaseModel):
    title: str
    description: str


class Issue(IssuePayload):
    id: str
