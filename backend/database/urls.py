from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import KitViewSet, FootwearViewSet, FootballViewSet, ShinGuardViewSet, SockViewSet
from .views import  PumpViewSet, GloveViewSet,CustomerViewSet, OrderViewSet, CartItemViewSet

# Create a router object
router = DefaultRouter()

# Register each ViewSet with the router
router.register(r'kits', KitViewSet)
router.register(r'footwear', FootwearViewSet)
router.register(r'football', FootballViewSet)
router.register(r'shinguards', ShinGuardViewSet)
router.register(r'socks', SockViewSet)
router.register(r'pump', PumpViewSet)
router.register(r'gloves', GloveViewSet)
router.register(r'customer', CustomerViewSet)
router.register(r'order', OrderViewSet)
router.register(r'cart', CartItemViewSet)

# Define the URL patterns
urlpatterns = [
    path('api/', include(router.urls)),  # Include the router-generated URLs
]
