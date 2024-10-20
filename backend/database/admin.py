from django.contrib import admin
from .models import Customer
from .models import Order
from .models import Kits
from .models import Footwear
from .models import Football
from .models import Socks
from .models import ShinGuards
from .models import Gloves
from .models import Pump
from .models import CartItem

# Register your models here.

admin.site.register(Customer)
admin.site.register(Kits)
admin.site.register(Footwear)
admin.site.register(Football)
admin.site.register(Socks)
admin.site.register(ShinGuards)
admin.site.register(Gloves)
admin.site.register(Pump)
admin.site.register(Order)
admin.site.register(CartItem)