from django.db import models
from django.db.models import Sum

class Order(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE, related_name='orders')
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"Order {self.id} for {self.customer.name}"
    
    class Meta:
        ordering = ['-order_date']  # Orders by latest date first


class Customer(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=20)
    phone_number = models.IntegerField()
    address = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.name}"
    
    @property
    def previous_orders(self):
        return self.orders.order_by('-order_date')
    
    @property
    def total_orders_amount(self):
        return self.orders.aggregate(total=Sum('total_amount'))['total'] or 0

class Kits(models.Model):
    name = models.CharField(max_length=100)
    size = models.CharField(max_length=3)  
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField()
    image = models.ImageField(upload_to='./images/kits', null=True)
    
    def __str__(self):
        return f"{self.name} - {self.size}"


class Footwear(models.Model):
    name = models.CharField(max_length=100)
    size = models.IntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField()
    image = models.ImageField(upload_to='./images/footwear', null=True)
    
    def __str__(self):
        return f"{self.name} - {self.size}"


class Football(models.Model):
    name = models.CharField(max_length=100)
    size = models.CharField(max_length=1)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField()
    image = models.ImageField(upload_to='./images/football', null=True)

    def __str__(self):
        return f"{self.name} - {self.size}"


class Socks(models.Model):
    name = models.CharField(max_length=100)
    size = models.CharField(max_length=1)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField()
    image = models.ImageField(upload_to='./images/socks', null=True)
    
    def __str__(self):
        return f"{self.name} - {self.size}"


class ShinGuards(models.Model):
    name = models.CharField(max_length=100)
    size = models.CharField(max_length=1)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField()
    image = models.ImageField(upload_to='./images/shinguards', null=True)
    
    def __str__(self):
        return f"{self.name} - {self.size}"


class Gloves(models.Model):
    name = models.CharField(max_length=100)
    size = models.CharField(max_length=1)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField()
    image = models.ImageField(upload_to='./images/gloves', null=True)
    
    def __str__(self):
        return f"{self.name} - {self.size}"

class Pump(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8,decimal_places=2, default=0)
    quantity = models.IntegerField()
    image = models.ImageField(upload_to='./images/pump', null=True)
    
    def __str__(self):
        return f"{self.name}"
    
class CartItem(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='carts')
    name = models.CharField(max_length=100)
    size = models.CharField(max_length=3)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    image = models.ImageField(upload_to='./images/cartItem', null=True)

    def __str__(self):
        return f"{self.customer.name}'s cart"
