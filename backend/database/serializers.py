from rest_framework import serializers
from .models import Kits, Football, Footwear, ShinGuards, Socks, Pump, Gloves, Customer, Order, CartItem

class KitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kits
        fields = '__all__'

class FootwearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footwear
        fields = '__all__'

class FootballSerializer(serializers.ModelSerializer):
    class Meta:
        model = Football
        fields = '__all__'

class ShinGuardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShinGuards
        fields = '__all__'

class SockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Socks
        fields = '__all__'

class PumpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pump
        fields = '__all__'

class GloveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gloves
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'
