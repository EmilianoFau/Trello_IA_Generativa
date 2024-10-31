from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum
from uuid import uuid4

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# uvicorn main:app --reload
# http://127.0.0.1:8000/docs


class ListModel(BaseModel):
    idList: Optional[str] = ""
    title: str
    description: str


class CardModel(BaseModel):
    idCard: Optional[str] = ""
    description: str
    idList: str
    title: str


lists: List[ListModel] = []
cards: List[CardModel] = []


@app.get("/list", response_model=List[ListModel])
async def getLists():
    print(lists)
    return lists


@app.get("/card", response_model=List[CardModel])
async def getCards():
    return cards


@app.post("/list")
async def createList(listData: ListModel):
    newList = ListModel(idList=str(uuid4()), title=listData.title, description=listData.description)
    lists.append(newList)
    return {"detail": "List created"}


@app.post("/card")
async def createCard(cardData: CardModel):
    newCard = CardModel(
        idCard=str(uuid4()),
        description=cardData.description,
        idList=cardData.idList,
        title=cardData.title
    )
    cards.append(newCard)
    return {"detail": "Card created"}


@app.put("/list/{idList}")
async def updateList(idList: str, listData: ListModel):
    for i, item in enumerate(lists):
        if item.idList == idList:
            updatedList = ListModel(idList=idList, title=listData.title, description=listData.description)
            lists[i] = updatedList
            return {"detail": "List updated"}
    raise HTTPException(status_code=404, detail="List not found")


@app.put("/card/{idCard}")
async def updateCard(idCard: str, cardData: CardModel):
    for i, item in enumerate(cards):
        if item.idCard == idCard:
            updatedCard = CardModel(
                idCard=idCard,
                description=cardData.description,
                idList=cardData.idList,
                title=cardData.title
            )
            cards[i] = updatedCard
            return {"detail": "Card updated"}
    raise HTTPException(status_code=404, detail="Card not found")


@app.delete("/list/{idList}")
async def deleteList(idList: str):
    isFinded = False
    for i, item in enumerate(lists):
        if item.idList == idList:
            del lists[i]
            isFinded = True
    for i, item in enumerate(cards):
        if item.idList == idList:
            del cards[i]
    if isFinded:
        return {"detail": "List deleted"}
    raise HTTPException(status_code=404, detail="List not found")


@app.delete("/card/{idCard}")
async def deleteCard(idCard: str):
    print(1)
    for i, item in enumerate(cards):
        if item.idCard == idCard:
            del cards[i]
            return {"detail": "Card deleted"}
    raise HTTPException(status_code=404, detail="Card not found")
