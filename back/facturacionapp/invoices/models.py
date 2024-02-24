from django.db import models
from db_connection import invoice_collection

# Create your models here.
class Invoices(models.Model):
    nit = models.PositiveIntegerField()
    name  = models.CharField(max_length=100)
    date = models.DateField()
    infile_detail = models.JSONField()
    producto =  models.CharField(max_length = 100),
    descripcion = models.TextField(),
    detail_name  =  models.TextField()
    quantity = models.PositiveIntegerField()
    price = models.DecimalField()
    total = models.DecimalField()
  

    def createInvoice(self):
        invoice_collection.insert_one({
            'username': self.nit,
            'name': self.name,
            'date':self.date,
            'infile_detail': [
                {
                 "producto": self.producto,
                 "descripcion": self.descripcion,
                 "detail_name" : self.detail_name,
                 "quantity": self.quantity,
                 "price": self.price,
                }
            ],
            'total': self.total
        })

        