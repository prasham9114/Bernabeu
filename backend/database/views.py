from rest_framework import viewsets
from .models import Kits, Football, Footwear, ShinGuards, Socks, Pump, Gloves, Customer, Order,CartItem
from .serializers import KitSerializer, FootballSerializer, FootwearSerializer, ShinGuardSerializer
from .serializers import  SockSerializer, PumpSerializer, GloveSerializer, CustomerSerializer, OrderSerializer, CartItemSerializer

# Create your views here.

class KitViewSet(viewsets.ModelViewSet):
    queryset = Kits.objects.all()
    serializer_class = KitSerializer

class FootwearViewSet(viewsets.ModelViewSet):
    queryset = Footwear.objects.all()
    serializer_class = FootwearSerializer

class FootballViewSet(viewsets.ModelViewSet):
    queryset = Football.objects.all()
    serializer_class = FootballSerializer

class ShinGuardViewSet(viewsets.ModelViewSet):
    queryset = ShinGuards.objects.all()
    serializer_class = ShinGuardSerializer

class SockViewSet(viewsets.ModelViewSet):
    queryset = Socks.objects.all()
    serializer_class = SockSerializer

class PumpViewSet(viewsets.ModelViewSet):
    queryset = Pump.objects.all()
    serializer_class = PumpSerializer

class GloveViewSet(viewsets.ModelViewSet):
    queryset = Gloves.objects.all()
    serializer_class = GloveSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

