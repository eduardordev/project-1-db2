# db_connection.py
from pymongo import MongoClient
from gridfs import GridFS
from django.conf import settings

MONGO_URI = settings.MONGO_URI
client = MongoClient(MONGO_URI)
db = client.get_database()

user_profile_collection = db['UserProfile']
invoice_collection = db['Invoices']
fs = GridFS(db)
