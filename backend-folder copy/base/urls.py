from django.urls import path, include
from users import views as user_views
from artpiece import views as artpiece_views


urlpatterns = [
    # Define your URL patterns here
    path('users/', include('users.urls')),
    path('artpieces/', include('artpiece.urls')),
    path('cart/', include('cart.urls')),
    path('purchase_order/', include('purchase_order.urls')),
]
