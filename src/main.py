from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import json
import shutil
import hashlib
from fastapi.middleware.cors import CORSMiddleware



class Item(BaseModel):
    name: str
    desc: str
    price: int


class Signup(BaseModel):
    name: str
    password: str

class Login(BaseModel):
    id: str
    password: str

class Mynft(BaseModel):
    public_id: int

class Addblock(BaseModel):
    data: str
    price: str
    id:str

class Validatenft(BaseModel):
    index: str

    


app = FastAPI()


# origins = [
#     "http://localhost:3000",
#     "localhost:3000"
# ]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



@app.get('/items')
async def root(item: Item):
    return item

@app.post('/signup')
async def root(signup: Signup):
    noOfUsers = os.listdir(r'c:\blockchain\Users')
    publicId = len(noOfUsers)
    newUser = {'name': signup.name, 'Public Id': publicId, 'password': signup.password}
    os.mkdir(r'c:\blockchain\Users\{}'.format(publicId))
    path = r'c:\blockchain\Users\{}\credentials.txt'.format(publicId)
    ledgerPath = r'c:\blockchain\Users\{}\ledger'.format(publicId)
    os.mkdir(ledgerPath)
    src = r'c:\blockchain\Blockchain'
    files = os.listdir(src)
    dst = r"c:\blockchain\Users\{}\ledger".format(publicId)
    for file_name in files:
        shutil.copy(src+"\\"+file_name, dst+"\\"+file_name)
    print("Copied successfully")
    json.dump(newUser, open(path, 'w'))
    return newUser


@app.post('/login')
async def login(login: Login):
    usersAddress = r"c:\blockchain\Users"
    allUsersId = os.listdir(usersAddress)
    if str(login.id) in allUsersId:
        credentials = json.load(open(r"c:\blockchain\Users\{}\credentials.txt".format(login.id)))
        if login.password == credentials['password']:
            return login.password
        else:
            return "login failed"
    else:
        return "This public ID does not exist"
    

@app.get('/mynft')
async def root():
    allBlocks = os.listdir(r'c:\blockchain\Blockchain')
    validatedNft = []
    for fileAdd in allBlocks:
        block = json.load(open(r'c:\blockchain\Blockchain\{}'.format(fileAdd), "r"))
        
        validatedNft.append(block)
    return validatedNft


# @app.get('/mynft/[public_id]')
# async def root(public_id:int):
#     allBlocks = os.listdir(r"c:\blockchain\Blockchain")
#     myAsset = []
#     print(allBlocks)
#     for fileName in allBlocks:
#         block = json.load(open(r'c:\blockchain\Blockchain\{}'.format(fileName)))
#         # if str(block['public_id']) == str(mynft.public_id):
#         myAsset.append(block)
#     return (myAsset)

def hashGenerator( data):
    result = hashlib.sha256(data.encode())
    return result.hexdigest()

def createBlock( b_id, data, hash, prev_hash, id, price):
    singleBlock = {}
    count = os.listdir(r'c:\blockchain\Blockchain')
    singleBlock['index'] = len(count)
    singleBlock['block_id'] = b_id
    singleBlock['data'] = data
    singleBlock['hash'] = hash
    singleBlock['prev_hash'] = prev_hash
    singleBlock['public_id'] = id
    singleBlock['price'] = price
    singleBlock['isValidate'] = "False"
    return singleBlock

@app.post('/addblock')
async def root(addblock:Addblock):
    allBlocks = os.listdir(r'c:\blockchain\Blockchain')
    
    lastBlock = []
    for i in allBlocks:
        block = json.load(open(r'c:\blockchain\Blockchain\{}'.format(i)))
        if block['index'] == len(allBlocks) - 1:
            lastBlock.append(block)
    newBlock = createBlock(len(allBlocks),
        addblock.data, hashGenerator(addblock.data+str(len(allBlocks))), lastBlock[0]['hash'], addblock.id, addblock.price)
    json.dump(newBlock, open(r'c:\blockchain\Blockchain\{}.txt'.format(
        newBlock['hash']), 'w'))
    
    allUsers = os.listdir(r'c:\blockchain\Users')
    print(allUsers)
    for i in allUsers:
        json.dump(newBlock, open(r'c:\blockchain\Users\{}\ledger\{}.txt'.format(i, newBlock['hash']),'w'))
        
    return "Block added successfully at address {}".format(
        newBlock['hash'])

@app.post('/addgenesis')
async def root():
    count = os.listdir(r'c:\blockchain\Blockchain')
    if len(count) == 0:
        genHash = hashGenerator("genesis data")
        genesis = createBlock("genesis data", genHash, 0, id=0,prev_hash=0, price=100)
        json.dump(genesis, open(r'c:\blockchain\Blockchain\{}.txt'.format(genesis['hash']), 'w'))
        allUsers = os.listdir(r'c:\blockchain\Users')
        print(allUsers)
        for i in allUsers:
            json.dump(genesis, open(r'c:\blockchain\Users\{}\ledger\{}.txt'.format(i, genesis['hash']),'w'))
        return "genesis block created"
    else:
        return "Null"

@app.get('/viewvalidatednft')
async def root():
    allBlocks = os.listdir(r'c:\blockchain\Blockchain')
    validatedNft = []
    for fileAdd in allBlocks:
        block = json.load(open(r'c:\blockchain\Blockchain\{}'.format(fileAdd), "r"))
        if block['isValidate'] == "True":
            validatedNft.append(block)
    return validatedNft

@app.post('/validatenft')
async def root(validatenft:Validatenft):
    allBlocks = os.listdir(r'c:\blockchain\Blockchain')
    file = {}
    for fileAdd in allBlocks:
        block = json.load(open(r'c:\blockchain\Blockchain\{}'.format(fileAdd), "r"))
        if str(block['index']) == validatenft.index:
            file = block
    file['isValidate'] = "True"
    addValidatedBlock(file)

def addValidatedBlock (obj):
    allBlocks = os.listdir(r'c:\blockchain\Blockchain')
    lastBlock = []
    for i in allBlocks:
        block = json.load(open(r'c:\blockchain\Blockchain\{}'.format(i)))
        if block['index'] == len(allBlocks) - 1:
            lastBlock.append(block)
    newBlock = createBlock(obj['index'],obj['data'], hashGenerator(obj['data']+str(len(allBlocks))), lastBlock[0]['hash'], str(obj['public_id']), obj['price'])
    newBlock['isValidate'] = "True"
    json.dump(newBlock, open(r'c:\blockchain\Blockchain\{}.txt'.format(
    newBlock['hash']), 'w'))
    src = r'c:\blockchain\Blockchain'
    files = os.listdir(src)
    dst = r"c:\blockchain\Users\{}\ledger".format(obj['public_id'])
    for file_name in files:
        shutil.copy(src+"\\"+file_name, dst+"\\"+file_name)
    print("Copied successfully")
    return "Block added successfully at address {}".format(
        newBlock['hash'])

@app.get('/alltransactions')
async def root():
        allTransactions=[]
        allBlocks = os.listdir(r'c:\blockchain\Blockchain')
        for fileName in allBlocks:
            block = json.load(open(r'c:\blockchain\Blockchain\{}'.format(fileName)))
            allTransactions.append(block)
        return allTransactions

@app.get('/notvalidated')
async def root():
    notValidate =os.listdir(r'c:\blockchain\Blockchain')
    allnotValidated =[]
    notValidatedArray = []
    for fileName in notValidate:
        block = json.load(open(r'c:\blockchain\Blockchain\{}'.format(fileName)))
        if block['block_id'] not in notValidatedArray:
            notValidatedArray.append(block['block_id'])
            allnotValidated.append(block)
        else:
            del allnotValidated[block["index"]]
    return notValidatedArray




        # print(block)
        # if block['index'] == block['block_id']:
    # return allnotValidated