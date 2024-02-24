from django.db import models
from db_connection import invoice_collection

# Create your models here.
class Invoices(models.Model):
    nit = models.PositiveIntegerField()
    name  = models.CharField(max_length=100)
    date = models.DateField()
    detail_name  =  models.CharField(max_length = 100)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField()
    total = models.DecimalField()

    def createInvoice(self):
        invoice_collection.insert_one({
            'username': self.nit,
            'name': self.name,
            'date':self.date,
            'detail_name' : self.detail_name,
            'quantity' : self.quantity,
            'price' : self.price,
            'total': self.total,
        })